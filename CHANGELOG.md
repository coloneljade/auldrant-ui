# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.13.0] - 2026-03-13

### Added

- Add \`--aui-color-warning\` and \`--aui-color-info\` color tokens (dark + light mode) ([#73](https://github.com/coloneljade/auldrant-ui/pull/73))
- Add \`Alert\` component with ARIA live region roles (\`role="alert"\` / \`role="status"\` by variant), optional title, action (link or button), dismiss button, and auto-dismiss via \`duration\` ([#73](https://github.com/coloneljade/auldrant-ui/pull/73))
- Add \`AlertVariant\` enum exported from the library public API ([#73](https://github.com/coloneljade/auldrant-ui/pull/73))
- Add behavioral tests (17 cases) and a11y tests (axe baseline + WCAG SC assertions) ([#73](https://github.com/coloneljade/auldrant-ui/pull/73))
- Add Alert section to dev test page with static and interactive demos ([#73](https://github.com/coloneljade/auldrant-ui/pull/73))
- Add library component and content API guidance to code-quality rules ([#73](https://github.com/coloneljade/auldrant-ui/pull/73))
- Enable \`localsConvention: 'camelCaseOnly'\` in Vite CSS modules config; rename all CSS module classes to kebab-case source with component-prefixed sub-element names (e.g. \`.alert-body\`, \`.dialog-title\`) ([#73](https://github.com/coloneljade/auldrant-ui/pull/73))

## [0.12.1] - 2026-03-08

### Fixed

- fix(ci): add workflow_dispatch trigger and update publish condition ([#71](https://github.com/coloneljade/auldrant-ui/pull/71))


## [0.12.0] - 2026-03-08

### Changed

- fix(table): narrow data cell type from `ComponentChildren` to `ComponentChild` ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))
- test(theme): add behavioral tests for Theme component ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))
- feat(button): add icon-only variant with enforced aria-label and aria-hidden ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))
- feat(spinner): add Spinner loading indicator component ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))
- feat(badge): add Badge status/count indicator component ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))
- feat(head): extend head signals with meta/OG tags and add Head component ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))
- chore(dev): add Spinner, Badge, and icon Button to TestPage ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))
- fix(ci): use exact string comparison for npm version check in publish step ([#68](https://github.com/coloneljade/auldrant-ui/pull/68))

## [0.11.2] - 2026-03-07

### Fixed

- Skip npm publish step when the package version is already published to avoid failed CI runs ([#63](https://github.com/coloneljade/auldrant-ui/pull/63))
- Use npm view to check if version exists before attempting publish ([#63](https://github.com/coloneljade/auldrant-ui/pull/63))
- Gate merge bot notification on successful publish, not just publish attempt ([#63](https://github.com/coloneljade/auldrant-ui/pull/63))

## [0.11.1] - 2026-03-07

### Fixed

- Use Lucide X SVG icon for pixel-perfect centering (replacing × text glyph) ([#61](https://github.com/coloneljade/auldrant-ui/pull/61))
- Apply rem-based min-width/min-height to guarantee 44px touch target regardless of inherited font-size ([#61](https://github.com/coloneljade/auldrant-ui/pull/61))

## [0.11.0] - 2026-03-06

### Added

- Fix dialog/modal centering with position: fixed + inset: 0 + margin: auto ([#60](https://github.com/coloneljade/auldrant-ui/pull/60))
- Improve close button: larger glyph (2em), grid alignment with header ([#60](https://github.com/coloneljade/auldrant-ui/pull/60))
- Add draggable support for Dialog (default), Modal stays fixed ([#60](https://github.com/coloneljade/auldrant-ui/pull/60))
- Use Pointer Events with viewport clamping for smooth drag-to-move ([#60](https://github.com/coloneljade/auldrant-ui/pull/60))
- Reset position on dialog close via CSS custom property removal ([#60](https://github.com/coloneljade/auldrant-ui/pull/60))

## [0.10.0] - 2026-03-05

### Added

- Add `rowHeader` prop to render first column as `<th scope="row">` for row identification ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Add `striped` prop for alternating row backgrounds for improved scanability ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Add `dense` prop to reduce cell padding for data-dense displays ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Add `captionHidden` prop to visually hide caption while keeping it accessible ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Refactor CSS to use class-based selectors (no raw element selectors) ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Add tests for new props and axe-core a11y verification ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Expand dev test page to showcase all Table variants ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Add CSS class-selector rule to style guide ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Update `/push` skill to return to main after pushing ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))
- Update `/pr` skill to resolve feature branch when called from main ([#57](https://github.com/coloneljade/auldrant-ui/pull/57))

## [0.9.0] - 2026-03-05

### Added

- Add Dialog (dismissible) and Modal (action-required alertdialog) components with native `<dialog>` element ([#56](https://github.com/coloneljade/auldrant-ui/pull/56))
- Export Palette constants for preset palette theme classes ([#56](https://github.com/coloneljade/auldrant-ui/pull/56))
- Add Dialog and Modal demos to dev test page with dismissible, confirmation, and destructive variants ([#56](https://github.com/coloneljade/auldrant-ui/pull/56))
- Update README with Overlay component category and `IDialogAction` type reference ([#56](https://github.com/coloneljade/auldrant-ui/pull/56))

## [0.8.0] - 2026-02-27

### Added

- feat(deps): add lucide-preact icon library ([#44](https://github.com/coloneljade/auldrant-ui/pull/44))
- feat(password-input): replace text toggle with icon overlay ([#44](https://github.com/coloneljade/auldrant-ui/pull/44))
- chore(dev): add missing error variants to test page ([#44](https://github.com/coloneljade/auldrant-ui/pull/44))

## [0.7.0] - 2026-02-27

### Added

- Change default primary from blue to green (hue 160) ([#40](https://github.com/coloneljade/auldrant-ui/pull/40))
- Ship 6 AAA-verified preset CSS classes (aui-blue, aui-purple, aui-teal, aui-red, aui-orange, aui-yellow) ([#40](https://github.com/coloneljade/auldrant-ui/pull/40))
- Expand contrast test coverage to all hues × all recommended pairs × both modes × raw + hover states ([#40](https://github.com/coloneljade/auldrant-ui/pull/40))
- Update README with green default and pre-built palette reference ([#40](https://github.com/coloneljade/auldrant-ui/pull/40))

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
