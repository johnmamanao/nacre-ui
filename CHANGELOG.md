# Changelog

All notable changes to Nacre UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and releases will follow semantic versioning after the first public package is
published.

## [Unreleased]

## [0.2.3] - 2026-09-05

### Changed

- Refine Liquid Text with a readable base layer, a moving metallic caustic, configurable displacement, and adjustable cycle timing.

## [0.2.2] - 2026-09-05

### Changed

- Clarify that Nacre UI is a source-based component collection and `@nacre-ui/cli` is its installer.

## [0.2.1] - 2026-09-05

### Changed

- Point the npm package homepage to the Nacre UI production landing page.

## [0.2.0] - 2026-09-05

### Added

- Orbit Ledger, a configurable scroll-driven project showcase with contained autoplay, a curved card path, keyboard controls, and a reduced-motion grid.
- A Nacre-specific landing-page entry sequence that plays on each full page load.

### Changed

- Repository automation now uses Dependabot, CodeQL, administrator branch protection, and SHA-pinned GitHub Actions.
- Source examples now use theme-aware syntax highlighting.
- The components page now reads its release label from the CLI package version.
- Component catalogue previews now mount only near the viewport.
- Toolchain Marquee now uses three distinct, continuous technology stacks.
- Installation and React documentation now describe the source-copying workflow.

### Fixed

- Component dependencies now install correctly from the CLI on Windows.
- Search results retain scrolling without exposing clipped native scrollbar chrome.
- Facet Bloom Loader no longer renders a solid center dot or circular ambient haze.
- Mobile landing previews now use a compact live tray with consistent alignment and unclipped labels.
- The desktop live preview no longer sits beneath an opaque radial veil.
- Responsive landing, catalogue, documentation, and interactive preview layouts on phone and tablet widths.
- Editorial Mosaic sizing in catalogue cards.
- Compact catalogue framing for Folio Arc Carousel and Helix Reel.

## [0.1.0] - 2026-09-04

### Added

- The initial public source-copying CLI and generated component registry.
- Public repository documentation and contribution guidance.
- Structured forms for component requests and bug reports.
- Pull-request checks for formatting, linting, TypeScript, and production builds.
- AI-ready prompts on every component page, including the active preview configuration.
- Clean-project compilation and overwrite-protection tests for the CLI.

[Unreleased]: https://github.com/johnmamanao/nacre-ui/compare/v0.2.3...HEAD
[0.2.3]: https://github.com/johnmamanao/nacre-ui/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/johnmamanao/nacre-ui/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/johnmamanao/nacre-ui/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/johnmamanao/nacre-ui/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/johnmamanao/nacre-ui/releases/tag/v0.1.0
