import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const cliRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const repositoryRoot = path.resolve(cliRoot, '..', '..');
const cliPath = path.join(cliRoot, 'bin', 'nacre-ui.js');
const fixtureRoot = path.join(cliRoot, '.test-output');

function runCli(arguments_) {
  return spawnSync(process.execPath, [cliPath, ...arguments_], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  });
}

async function createFixture() {
  await rm(fixtureRoot, { recursive: true, force: true });
  await mkdir(fixtureRoot, { recursive: true });
  await writeFile(
    path.join(fixtureRoot, 'package.json'),
    `${JSON.stringify({ name: 'nacre-cli-fixture', private: true, type: 'module' }, null, 2)}\n`,
  );
  await writeFile(
    path.join(fixtureRoot, 'tsconfig.json'),
    `${JSON.stringify(
      {
        compilerOptions: {
          allowSyntheticDefaultImports: true,
          baseUrl: '.',
          esModuleInterop: true,
          jsx: 'react-jsx',
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          moduleResolution: 'Bundler',
          noEmit: true,
          paths: { '@/*': ['./*'] },
          skipLibCheck: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['components/**/*.tsx', 'lib/**/*.ts', 'styles.d.ts'],
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    path.join(fixtureRoot, 'styles.d.ts'),
    "declare module '*.module.css' {\n  const classes: Record<string, string>;\n  export default classes;\n}\n",
  );
}

test('lists the complete public registry', () => {
  const result = runCli(['list', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const names = JSON.parse(result.stdout);
  assert.equal(names.length, 38);
  assert.ok(names.includes('folio-arc-carousel'));
  assert.ok(names.includes('facet-bloom-loader'));
  assert.ok(names.includes('nacre-field-shader'));
});

test('copies every component and produces type-safe source', async () => {
  await createFixture();
  const addResult = runCli([
    'add',
    'all',
    '--cwd',
    fixtureRoot,
    '--skip-install',
  ]);
  assert.equal(addResult.status, 0, addResult.stderr);
  assert.match(addResult.stdout, /Added 38 Nacre UI components/);

  const expectedFiles = [
    'components/ui/folio-arc-carousel.tsx',
    'components/ui/folio-arc-carousel.module.css',
    'components/ui/sculptural-loaders.tsx',
    'components/ui/text-motion-effects.tsx',
    'lib/utils.ts',
  ];
  for (const file of expectedFiles) {
    assert.ok(await readFile(path.join(fixtureRoot, file), 'utf8'));
  }

  const typecheck = spawnSync(
    process.execPath,
    [
      path.join(repositoryRoot, 'node_modules', 'typescript', 'bin', 'tsc'),
      '--project',
      path.join(fixtureRoot, 'tsconfig.json'),
    ],
    { cwd: fixtureRoot, encoding: 'utf8' },
  );
  assert.equal(typecheck.status, 0, typecheck.stdout + typecheck.stderr);
});

test('protects edited files unless overwrite is explicit', async () => {
  await createFixture();
  const first = runCli([
    'add',
    'magnetic-button',
    '--cwd',
    fixtureRoot,
    '--skip-install',
  ]);
  assert.equal(first.status, 0, first.stderr);

  const componentPath = path.join(
    fixtureRoot,
    'components',
    'ui',
    'magnetic-button.tsx',
  );
  await writeFile(componentPath, '// local edit\n');

  const protectedResult = runCli([
    'add',
    'magnetic-button',
    '--cwd',
    fixtureRoot,
    '--skip-install',
  ]);
  assert.equal(protectedResult.status, 1);
  assert.match(protectedResult.stderr, /Refusing to overwrite changed file/);

  const overwriteResult = runCli([
    'add',
    'magnetic-button',
    '--cwd',
    fixtureRoot,
    '--skip-install',
    '--overwrite',
  ]);
  assert.equal(overwriteResult.status, 0, overwriteResult.stderr);
  assert.match(await readFile(componentPath, 'utf8'), /MagneticButton/);
});
