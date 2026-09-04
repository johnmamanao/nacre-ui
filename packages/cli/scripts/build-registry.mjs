import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cliRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const repositoryRoot = path.resolve(cliRoot, '..', '..');
const registryRoot = path.join(cliRoot, 'registry');
const registryFilesRoot = path.join(registryRoot, 'files');

const entries = {
  button: 'components/ui/button.tsx',
  'magnetic-button': 'components/ui/magnetic-button.tsx',
  'liquid-metal-button': 'components/ui/liquid-metal-button.tsx',
  'gem-smoke-button': 'components/ui/gem-smoke-button.tsx',
  'lustre-button': 'components/ui/lustre-button.tsx',
  'social-profile-button': 'components/ui/social-profile-button.tsx',
  'pearl-aperture-loader': 'components/ui/pearl-aperture-loader.tsx',
  'horizon-page-loader': 'components/ui/horizon-page-loader.tsx',
  'mercury-rail-loader': 'components/ui/mercury-rail-loader.tsx',
  'facet-bloom-loader': 'components/ui/facet-bloom-loader.tsx',
  'ribbon-fold-loader': 'components/ui/ribbon-fold-loader.tsx',
  'pearl-matrix-loader': 'components/ui/pearl-matrix-loader.tsx',
  'fluid-cell-loader': 'components/ui/sculptural-loaders.tsx',
  'prism-stack-loader': 'components/ui/sculptural-loaders.tsx',
  'card-shuffle-loader': 'components/ui/sculptural-loaders.tsx',
  'signal-reveal-text': 'components/ui/signal-reveal-text.tsx',
  'tally-shift-number': 'components/ui/tally-shift-number.tsx',
  'tidal-type-text': 'components/ui/tidal-type-text.tsx',
  'swell-text': 'components/ui/swell-text.tsx',
  'aurora-text': 'components/ui/text-motion-effects.tsx',
  'liquid-text': 'components/ui/text-motion-effects.tsx',
  'gravity-text': 'components/ui/text-motion-effects.tsx',
  'slot-text': 'components/ui/text-motion-effects.tsx',
  'bloom-text': 'components/ui/text-motion-effects.tsx',
  'tilt-text': 'components/ui/text-motion-effects.tsx',
  'phase-weave-text': 'components/ui/phase-weave-text.tsx',
  'editorial-mosaic': 'components/ui/editorial-mosaic.tsx',
  'halo-dock': 'components/ui/halo-dock.tsx',
  'shutter-trail': 'components/ui/shutter-trail.tsx',
  'folio-arc-carousel': 'components/ui/folio-arc-carousel.tsx',
  'helix-reel': 'components/ui/helix-reel.tsx',
  'toolchain-marquee': 'components/ui/toolchain-marquee.tsx',
  'orbit-ledger': 'components/ui/orbit-ledger.tsx',
  'nacre-field-shader': 'components/ui/nacre-field-shader.tsx',
  'iridescent-weave-shader': 'components/ui/iridescent-weave-shader.tsx',
  'mesh-background': 'components/ui/mesh-background.tsx',
  'flux-background': 'components/ui/flux-background.tsx',
  'magnetic-warp-background': 'components/ui/magnetic-warp-background.tsx',
  'grain-current-background': 'components/ui/grain-current-background.tsx',
};

const dependencyVersions = {
  '@paper-design/shaders-react': '@paper-design/shaders-react@0.0.80',
  'framer-motion': 'framer-motion@^13.1.1',
};

function packageName(specifier) {
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

async function resolveLocalImport(importer, specifier) {
  const base = specifier.startsWith('@/')
    ? path.join(repositoryRoot, specifier.slice(2))
    : path.resolve(
        path.dirname(path.join(repositoryRoot, importer)),
        specifier,
      );
  const candidates = [base, `${base}.tsx`, `${base}.ts`, `${base}.css`];

  for (const candidate of candidates) {
    try {
      await readFile(candidate);
      return path.relative(repositoryRoot, candidate).replaceAll('\\', '/');
    } catch {
      // Try the next supported source extension.
    }
  }

  throw new Error(`Unable to resolve ${specifier} imported by ${importer}`);
}

async function collectFiles(sourcePath, files, dependencies) {
  if (files.has(sourcePath)) return;
  files.add(sourcePath);

  if (sourcePath.endsWith('.css')) return;

  const source = await readFile(path.join(repositoryRoot, sourcePath), 'utf8');
  const imports = source.matchAll(/(?:from\s+|import\s*)['"]([^'"]+)['"]/g);

  for (const match of imports) {
    const specifier = match[1];
    if (specifier.startsWith('.') || specifier.startsWith('@/')) {
      const resolved = await resolveLocalImport(sourcePath, specifier);
      await collectFiles(resolved, files, dependencies);
    } else {
      const dependency = packageName(specifier);
      if (dependency !== 'react') dependencies.add(dependency);
    }
  }
}

await rm(registryRoot, { recursive: true, force: true });
await mkdir(registryFilesRoot, { recursive: true });

const components = {};
const allFiles = new Set();

for (const [slug, entry] of Object.entries(entries)) {
  const files = new Set();
  const dependencies = new Set();
  await collectFiles(entry, files, dependencies);

  for (const file of files) allFiles.add(file);

  components[slug] = {
    entry,
    files: [...files].sort((left, right) => left.localeCompare(right)),
    dependencies: [...dependencies]
      .sort((left, right) => left.localeCompare(right))
      .map((dependency) => dependencyVersions[dependency] ?? dependency),
  };
}

for (const file of allFiles) {
  const destination = path.join(registryFilesRoot, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(repositoryRoot, file), destination);
}

await writeFile(
  path.join(registryRoot, 'registry.json'),
  `${JSON.stringify({ schemaVersion: 1, components }, null, 2)}\n`,
);

console.log(
  `Built ${Object.keys(components).length} components from ${allFiles.size} source files.`,
);
