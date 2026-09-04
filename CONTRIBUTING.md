# Contributing to Nacre UI

Thank you for helping improve Nacre UI. Contributions should make the
collection more useful, understandable, accessible, or reliable without
weakening its visual direction.

## Before starting

- Search existing issues before opening a new one.
- Use the component-request form for a new component or substantial visual
  concept.
- Use the bug-report form for broken behavior, accessibility regressions, or
  rendering problems.
- Keep a pull request focused on one component or one closely related change.

For a large addition, wait for agreement on the issue before investing in the
implementation.

## Development setup

Requirements:

- Node.js 22.13 or newer
- npm

```bash
npm install
npm run dev
```

## Project structure

```text
app/                 Site routes, catalogue data, and documentation
components/ui/       Components and colocated CSS modules
hooks/               Shared hooks
lib/                 Shared utilities
packages/cli/        Registry builder, CLI package, and installation tests
public/              Static assets
```

## Adding or changing a component

1. Keep the public API small and typed.
2. Place the implementation in `components/ui` and colocate component-specific
   styles in a CSS module.
3. Add or update the catalogue entry, preview controls, usage example, props,
   accessibility notes, and searchable documentation.
4. Test light and dark appearances at desktop and narrow widths.
5. Verify keyboard operation, visible focus, reduced motion, and forced-color
   behavior when applicable.
6. Avoid starting animation loops for previews that are outside the viewport.
7. Add an entry under `Unreleased` in `CHANGELOG.md`.
8. Add a registry entry in `packages/cli/scripts/build-registry.mjs` when the
   component is new.

Use client-side rendering only when the component needs browser state,
measurement, pointer input, or animation APIs.

## Required checks

Before opening a pull request, run:

```bash
npm run check
```

This verifies formatting, lint rules, TypeScript, the CLI installation fixtures,
and the production build. Describe any additional manual interaction and browser
checks you performed in the pull request.

## Pull requests

1. Fork the repository and create a branch from `main`.
2. Make the smallest coherent change.
3. Run the required checks.
4. Push the branch and wait for its Vercel Preview deployment.
5. Review visible and behavioral changes using the Preview URL.
6. Complete the pull-request template with what changed, why, and how it was
   verified.
7. Include screenshots or a short recording for visible interaction changes.

Maintainers and AI-assisted sessions follow the complete
[Preview and Production delivery workflow](docs/DELIVERY_WORKFLOW.md).

By contributing, you agree that your contribution is licensed under the MIT
License used by this repository.
