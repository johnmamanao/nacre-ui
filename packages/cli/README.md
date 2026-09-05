# Nacre UI

Nacre UI is a source-based React component collection. Browse and preview the
components at [nacre-ui.johnmamanao.com](https://nacre-ui.johnmamanao.com/).

## What is `@nacre-ui/cli`?

`@nacre-ui/cli` is the installer for Nacre UI. It is not a component runtime
or a package you need to keep importing from. The CLI copies each selected
component, its colocated styles, and shared utilities directly into your
project, where the source remains yours to inspect and edit.

Add a component with:

```bash
npx @nacre-ui/cli@latest add folio-arc-carousel
```

The command also installs the runtime dependencies required by that component.

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

Read the [full documentation](https://nacre-ui.johnmamanao.com/components) or
[view the source on GitHub](https://github.com/johnmamanao/nacre-ui).

The project is licensed under the MIT License.
