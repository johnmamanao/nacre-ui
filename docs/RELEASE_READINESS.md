# Release readiness

This document separates publishing the source repository, deploying the site,
and releasing the npm package. Nacre UI is public on GitHub and Vercel, and the
first CLI version is available on npm.

## Public repository

The repository includes the essentials needed to accept useful contributions:

- MIT license
- contribution and conduct guidance
- security reporting instructions
- component-request and bug-report forms
- a pull-request checklist
- automated formatting, lint, type, and production-build checks
- an unreleased changelog

After creating the GitHub repository:

- add its canonical URL to `package.json` and the website;
- create the `component request` label used by the issue form;
- enable private vulnerability reporting;
- protect `main` and require the `quality` workflow;
- set the repository description, topics, social image, and homepage URL;
- confirm that Discussions, Issues, and blank issues match the intended support
  flow.

## npm package

The documentation app is private and is not the npm package. The dedicated
`@nacre-ui/cli` workspace builds a source registry from the reviewed component
files and copies selected entries into consumer projects.

Before each later CLI release:

- run the complete repository checks;
- compile every generated registry component in the clean test fixture;
- inspect the npm tarball and confirm it contains only the CLI, registry,
  package documentation, and license;
- test the packed CLI against a clean React project;
- publish from a `v*` tag through the trusted release workflow;
- verify the public package by installing the published version in a fresh
  project.

## Site delivery

Pull requests and non-`main` branches receive Vercel Preview deployments.
Merges to `main` receive Production deployments. Follow
[DELIVERY_WORKFLOW.md](DELIVERY_WORKFLOW.md) so visible changes are reviewed at
their Preview URL before reaching production.

## Release rule

Do not publish because the catalogue looks complete. Publish when a clean
consumer project can run the packed CLI, import the copied source, load its CSS
modules, and pass its build without depending on the documentation app.
