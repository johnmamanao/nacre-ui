# Release readiness

This document separates opening the source repository from publishing a stable
npm package. The repository can be public while package work continues, as long
as the website and README describe that status accurately.

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

Before each CLI release:

- run the complete repository checks;
- compile every generated registry component in the clean test fixture;
- inspect the npm tarball and confirm it contains only the CLI, registry,
  package documentation, and license;
- test the packed CLI against a clean React project;
- publish from a `cli-v*` tag through the provenance-enabled release workflow;
- verify the public package by installing the published version in a fresh
  project.

## Release rule

Do not publish because the catalogue looks complete. Publish when a clean
consumer project can run the packed CLI, import the copied source, load its CSS
modules, and pass its build without depending on the documentation app.
