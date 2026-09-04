# Nacre UI agent instructions

These instructions are the repository-level source of truth for AI-assisted
changes. Read them before editing, committing, publishing, or deploying.

## Project identity

- Repository: `https://github.com/johnmamanao/nacre-ui`
- Production site: `https://nacre-ui.vercel.app`
- Vercel project: `john-mamanaos-projects/nacre-ui`
- npm package: `@nacre-ui/cli`
- Protected production branch: `main`

## Required delivery flow

Do not push ordinary changes directly to `main`, even when the authenticated
account can bypass protection.

1. Start from an up-to-date, clean `main` branch.
2. Create a focused branch named `codex/<short-change-name>`.
3. Make the smallest coherent change and preserve unrelated user work.
4. Run `npm run check` before publishing the branch.
5. For deployment-adapter changes, also run a Vercel-target build:
   `$env:NITRO_PRESET='vercel'; npm exec vite -- build` on PowerShell.
6. Commit and push the branch, then open a pull request into `main`.
7. Wait for both the GitHub `quality` check and the Vercel Preview deployment.
8. Give the user the Preview URL and wait for explicit approval before merging
   a visible or behavioral change.
9. Merge the pull request without using an admin bypass unless the user
   explicitly requests it or repository recovery requires it.
10. Wait for the Vercel Production deployment created from `main`.
11. Verify `/` and `/components` on `https://nacre-ui.vercel.app` return a
    successful response before reporting completion.

Vercel maps non-production branches and pull requests to **Preview**. It maps
`main` to **Production**. Do not run a manual production deployment for an
ordinary change; use the Git-connected flow so GitHub retains both deployment
records.

## Package release boundary

A site-only change does not require an npm release. When component source or
the CLI registry changes, update documentation and `CHANGELOG.md`, run the full
checks, verify the packed CLI in a clean project, and only create a `v*` release
tag when the user explicitly requests a package release. Confirm npm trusted
publishing is configured for `.github/workflows/publish-cli.yml` before tagging.

## Safety and quality

- Never commit `.env*`, `.vercel/`, build output, registry output, or tarballs.
- Preserve both deployment adapters in `vite.config.ts`: Nitro for Vercel and
  the existing Sites/Cloudflare path for local and Sites builds.
- Keep component claims, install instructions, and compatibility notes factual.
- Do not claim a deployment succeeded until its provider reports ready and the
  public route responds successfully.

See `docs/DELIVERY_WORKFLOW.md` for the maintainer-facing version of this flow.
