# Delivery workflow

Nacre UI uses GitHub pull requests and Vercel deployments as one review flow.
Every proposed change gets a temporary Preview URL. Only reviewed work reaches
the production site.

## Environment mapping

| Git state                         | Vercel environment | Purpose                                      |
| --------------------------------- | ------------------ | -------------------------------------------- |
| Pull request or non-`main` branch | Preview            | Review the exact proposed change             |
| `main`                            | Production         | Public site at `https://nacre-ui.vercel.app` |

The GitHub repository and Vercel project are connected. Pushing a branch is
enough to start its Preview deployment; merging into `main` starts Production.

## Change lifecycle

1. Update local `main` and create a focused branch.
2. Implement one coherent change.
3. Run `npm run check`.
4. Push the branch and open a pull request.
5. Wait for the `quality` check and Vercel Preview to finish.
6. Review the Preview URL on desktop and at a narrow width when the layout
   changed. Check light and dark appearances for visual work.
7. Merge only after the Preview is accepted.
8. Wait for Production and verify the landing page and component catalogue.

This process applies to maintainers and AI-assisted sessions. A session should
not silently merge a visual or behavioral change before presenting its Preview
unless the user explicitly requested immediate production publication.

## Useful checks

```bash
npm run check
```

For a change to Vercel or Vinext deployment configuration, also build the
Vercel target before opening the pull request.

```powershell
$env:NITRO_PRESET = 'vercel'
npm exec vite -- build
```

## npm releases

The documentation site and the CLI have separate release boundaries. Website,
copy, and catalogue-layout changes deploy through Vercel without changing the
npm version.

When a release changes installable component source or CLI behavior:

1. Update `CHANGELOG.md` and the CLI version.
2. Run `npm run check`.
3. Inspect the package tarball and install it in a clean project.
4. Confirm npm trusted publishing targets `publish-cli.yml`.
5. Merge the release pull request.
6. Create the requested `v*` tag only after `main` is green.
7. Verify the published package from a clean project.
