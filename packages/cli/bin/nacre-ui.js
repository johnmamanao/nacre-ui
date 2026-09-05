#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { constants } from 'node:fs';
import { access, copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const cliRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const registryRoot = path.join(cliRoot, 'registry');
const manifest = JSON.parse(
  await readFile(path.join(registryRoot, 'registry.json'), 'utf8'),
);
const packageMetadata = JSON.parse(
  await readFile(path.join(cliRoot, 'package.json'), 'utf8'),
);

function printHelp() {
  console.log(`Nacre UI ${packageMetadata.version}

Usage:
  nacre-ui list [--json]
  nacre-ui init [--cwd <path>]
  nacre-ui add <component...|all> [--cwd <path>] [--overwrite] [--skip-install]

Options:
  --cwd <path>      Target project directory (default: current directory)
  --overwrite       Replace changed component files
  --skip-install    Do not install missing runtime dependencies
  --json            Print the component list as JSON
  --help            Show command help
  --version         Show the CLI version`);
}

function parseArguments(argv) {
  const options = {
    cwd: process.cwd(),
    help: false,
    json: false,
    overwrite: false,
    skipInstall: false,
    version: false,
  };
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--cwd') {
      const value = argv[index + 1];
      if (!value) throw new Error('--cwd requires a directory path.');
      options.cwd = path.resolve(value);
      index += 1;
    } else if (argument === '--overwrite') options.overwrite = true;
    else if (argument === '--skip-install') options.skipInstall = true;
    else if (argument === '--json') options.json = true;
    else if (argument === '--help' || argument === '-h') options.help = true;
    else if (argument === '--version' || argument === '-v')
      options.version = true;
    else if (argument.startsWith('-'))
      throw new Error(`Unknown option: ${argument}`);
    else positional.push(argument);
  }

  return { options, positional };
}

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureProject(projectRoot) {
  const packagePath = path.join(projectRoot, 'package.json');
  if (!(await exists(packagePath))) {
    throw new Error(
      `No package.json found in ${projectRoot}. Run the command from a React project or pass --cwd.`,
    );
  }
  return JSON.parse(await readFile(packagePath, 'utf8'));
}

function dependencyName(specifier) {
  if (specifier.startsWith('@'))
    return specifier.split('@').slice(0, 2).join('@');
  return specifier.split('@')[0];
}

async function detectPackageManager(projectRoot) {
  const managers = [
    ['pnpm-lock.yaml', 'pnpm'],
    ['bun.lockb', 'bun'],
    ['bun.lock', 'bun'],
    ['yarn.lock', 'yarn'],
    ['package-lock.json', 'npm'],
  ];
  for (const [lockfile, manager] of managers) {
    if (await exists(path.join(projectRoot, lockfile))) return manager;
  }
  return 'npm';
}

function installDependencies(manager, dependencies, projectRoot) {
  if (!dependencies.length) return;
  const args =
    manager === 'npm' ? ['install', ...dependencies] : ['add', ...dependencies];
  const isWindows = process.platform === 'win32';
  const command = isWindows ? process.env.ComSpec || 'cmd.exe' : manager;
  const commandArguments = isWindows
    ? ['/d', '/s', '/c', `${manager}.cmd`, ...args]
    : args;
  console.log(`Installing ${dependencies.join(', ')} with ${manager}…`);
  const result = spawnSync(command, commandArguments, {
    cwd: projectRoot,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    throw new Error(`${manager} could not install the component dependencies.`);
  }
}

async function addComponents(names, options) {
  const packageJson = await ensureProject(options.cwd);
  const available = Object.keys(manifest.components);
  const requested = names.includes('all') ? available : [...new Set(names)];

  if (!requested.length) {
    throw new Error('Provide at least one component name, or use `add all`.');
  }

  const unknown = requested.filter((name) => !manifest.components[name]);
  if (unknown.length) {
    throw new Error(
      `Unknown component${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}. Run \`nacre-ui list\` to see available names.`,
    );
  }

  const files = new Set();
  const dependencies = new Set();
  for (const name of requested) {
    const component = manifest.components[name];
    for (const file of component.files) files.add(file);
    for (const dependency of component.dependencies)
      dependencies.add(dependency);
  }

  const changedFiles = [];
  for (const file of files) {
    const source = path.join(registryRoot, 'files', file);
    const destination = path.join(options.cwd, file);
    if (!(await exists(destination))) continue;
    const [sourceContent, destinationContent] = await Promise.all([
      readFile(source),
      readFile(destination),
    ]);
    if (!sourceContent.equals(destinationContent)) changedFiles.push(file);
  }

  if (changedFiles.length && !options.overwrite) {
    throw new Error(
      `Refusing to overwrite changed ${changedFiles.length === 1 ? 'file' : 'files'}:\n${changedFiles.map((file) => `  - ${file}`).join('\n')}\nRun again with --overwrite if replacement is intentional.`,
    );
  }

  for (const file of files) {
    const source = path.join(registryRoot, 'files', file);
    const destination = path.join(options.cwd, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(source, destination);
  }

  const installed = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  };
  const missing = [...dependencies].filter(
    (dependency) => !installed[dependencyName(dependency)],
  );

  if (!options.skipInstall) {
    const manager = await detectPackageManager(options.cwd);
    installDependencies(manager, missing, options.cwd);
  }

  console.log(
    `Added ${requested.length} Nacre UI ${requested.length === 1 ? 'component' : 'components'} (${files.size} ${files.size === 1 ? 'file' : 'files'}).`,
  );
  if (options.skipInstall && missing.length) {
    console.log(`Install required dependencies: ${missing.join(' ')}`);
  }
}

try {
  const { options, positional } = parseArguments(process.argv.slice(2));
  const command = positional.shift();

  if (options.version) console.log(packageMetadata.version);
  else if (options.help || !command) printHelp();
  else if (command === 'list') {
    const names = Object.keys(manifest.components);
    console.log(
      options.json ? JSON.stringify(names, null, 2) : names.join('\n'),
    );
  } else if (command === 'init') {
    await ensureProject(options.cwd);
    await Promise.all([
      mkdir(path.join(options.cwd, 'components', 'ui'), { recursive: true }),
      mkdir(path.join(options.cwd, 'lib'), { recursive: true }),
    ]);
    console.log('Nacre UI source directories are ready.');
  } else if (command === 'add') {
    await addComponents(positional, options);
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(
    `Nacre UI: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}
