# Nacre UI CLI

Add Nacre UI components to a React project as editable source files.

```bash
npx @nacre-ui/cli@latest add folio-arc-carousel
```

The CLI copies the selected component, its colocated styles, and shared Nacre
utilities into the current project. It also installs the runtime dependencies
required by that component.

## Commands

```bash
npx @nacre-ui/cli@latest list
npx @nacre-ui/cli@latest init
npx @nacre-ui/cli@latest add halo-dock facet-bloom-loader
```

Use `--skip-install` to copy files without changing dependencies, `--overwrite`
to replace a previously edited file, and `--cwd <path>` to target another
project directory.

Nacre UI requires a React project with TypeScript and support for CSS modules.
Components are copied to `components/ui` and may be edited after installation.

The project is licensed under the MIT License.
