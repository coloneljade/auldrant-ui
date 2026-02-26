# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.6.0] - 2026-02-26

### Changed

- feat(a11y): theme contrast system with color-mix() derivation ([#34](https://github.com/coloneljade/auldrant-ui/pull/34))
- test: automated WCAG contrast validation ([#34](https://github.com/coloneljade/auldrant-ui/pull/34))
- feat: dev test page for visual testing (#19) ([#34](https://github.com/coloneljade/auldrant-ui/pull/34))
- docs: rewrite theming section with contrast guidance ([#34](https://github.com/coloneljade/auldrant-ui/pull/34))
- chore: align PR template with /pr skill format ([#34](https://github.com/coloneljade/auldrant-ui/pull/34))
- docs: rewrite CONTRIBUTING.md with DCO, dev test page, and merge bot workflow ([#34](https://github.com/coloneljade/auldrant-ui/pull/34))

## [0.5.2] - 2026-02-26

### Fixed

- Add `homepage` and `bugs` fields to `package.json` ([#31](https://github.com/coloneljade/auldrant-ui/pull/31))
- npm renders these as links on the public package page ([#31](https://github.com/coloneljade/auldrant-ui/pull/31))

## [0.5.1] - 2026-02-26

### Fixed

- Add `repository` field to `package.json` with the GitHub repo URL ([#30](https://github.com/coloneljade/auldrant-ui/pull/30))
- Required by Sigstore provenance verification during `npm publish --provenance` ([#30](https://github.com/coloneljade/auldrant-ui/pull/30))
- Without it, publish fails with E422: `repository.url is "", expected to match` ([#30](https://github.com/coloneljade/auldrant-ui/pull/30))

## [0.5.0] - 2026-02-26

### Added

- Add `error` prop to all form field components with `aria-invalid`, `aria-describedby`, and `role="alert"` error messages ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Add required `caption` prop to Table for accessible name via `<caption>` ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Add `status` prop to Form rendered as `<output>` for submission feedback ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Add `aria-live` character limit announcements to Textarea at threshold breakpoints ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Add `describeBy()` utility and shared `field-error` CSS class ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Remove 11 duplicate behavioral tests already covered by a11y tests with better query patterns ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Replace `querySelector` calls with accessible queries (`getByRole`, `getByLabelText`) in behavioral tests ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Add AAA section comments (`// Arrange`, `// Act`, `// Assert`) to all behavioral tests ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Configure coverage to exclude test infrastructure (`coverageSkipTestFiles`, `coveragePathIgnorePatterns`) ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))
- Fix publishing config: correct CHANGELOG format, remove CHANGELOG from package files ([#28](https://github.com/coloneljade/auldrant-ui/pull/28))

## [0.4.0] - 2026-02-26

### Added

- **feat(test)**: add axe-core a11y test suite (19 files, setup helpers, 18 test files) ([#20](https://github.com/coloneljade/auldrant-ui/pull/20))
- **refactor(test)**: migrate a11y assertions out of behavioral tests (cleanup + deletions) ([#20](https://github.com/coloneljade/auldrant-ui/pull/20))
- **docs(rules)**: mandate AAA comments and WCAG SC references in tests ([#20](https://github.com/coloneljade/auldrant-ui/pull/20))

## [0.3.0] - 2026-02-25

### Added

- Configure Vite, TypeScript, Biome, devcontainer, and test setup ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Add routing and title signals for SPA navigation ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Shared types, utilities, and composable CSS classes ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Semantic HTML-first — native elements before ARIA ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- CSS Grid layout, em-based spacing, CSS modules ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Accessible form field management (`FormField` wrapper) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- SkipLink and Nav for keyboard navigation ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Type-safe component props (TypeScript strict mode) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Comprehensive test coverage (114 tests) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Pit of success design principle for component APIs ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Binary tools principle (Biome fixes, not manual edits) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Mandatory skills workflow (staging, pushing, PRs) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- Import aliases (`@components`, `@scripts`, `@signals`, `@styles`) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- **Head component** — meta/document head management (issue #18) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))
- **Form data typing** — generic type parameter for typed onSubmit (issue #8) ([#7](https://github.com/coloneljade/auldrant-ui/pull/7))

## [0.2.0] - 2026-02-24

### Added

- Remove CJS output and UMD name — ESM-only library ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Fix CI publish failure by skipping lefthook in CI environment ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Add `@components` and `@styles` import path aliases (tsconfig + vite) ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Add GitHub CLI feature and YAML extension to devcontainer ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Create VSCode tasks for all project scripts (test, build, check, typecheck, storybook) ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Add component base types (BaseProps, FieldProps) and cx() class utility ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))

## [0.1.0] - 2026-02-24

### Added

- Remove CJS output and UMD name — ESM-only library ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Fix CI publish failure by skipping lefthook in CI environment ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Add `@components` and `@styles` import path aliases (tsconfig + vite) ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Add GitHub CLI feature and YAML extension to devcontainer ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Create VSCode tasks for all project scripts (test, build, check, typecheck, storybook) ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))
- Add component base types (BaseProps, FieldProps) and cx() class utility ([#6](https://github.com/coloneljade/auldrant-ui/pull/6))

## [0.0.0]
