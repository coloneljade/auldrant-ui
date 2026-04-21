# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.1.0] - 2026-04-21

### Changed

- Consolidate cross-cutting types and rename useTimer to named export ([#152](https://github.com/coloneljade/auldrant-ui/pull/152))
- Narrow target type to fragment identifier ([#152](https://github.com/coloneljade/auldrant-ui/pull/152))

### Fixed

- Tie arrow-key activation to eager mount mode ([#152](https://github.com/coloneljade/auldrant-ui/pull/152))
- Render disabled prev/next as non-navigable buttons ([#152](https://github.com/coloneljade/auldrant-ui/pull/152))
- Consolidate to a single persistent live region ([#152](https://github.com/coloneljade/auldrant-ui/pull/152))
- Make fallback wrapper keyboard-focusable ([#152](https://github.com/coloneljade/auldrant-ui/pull/152))
- Update useTimer import to named form ([#152](https://github.com/coloneljade/auldrant-ui/pull/152))

## [2.0.0] - 2026-03-26

### Added

- Add subpath exports: `./components`, `./signals`, `./hooks`, `./utils`, `./styles` ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))
- Replace vite-plugin-dts with tsc + tsc-alias for .d.ts generation ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))
- Fix alias leaks in emitted type declarations ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))
- Add CI smoke test workflow for subpath export resolution ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))
- **Breaking:** Remove single entry point — consumers must use subpath imports ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))
- **Breaking:** Remove `Dialog` and `Modal` from public exports — use `confirm()`/`dialog()` imperative API ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))
- **Breaking:** Remove internal signals from public barrel (`dismiss`, `queue`, `matchParams`, `remove`, `toasts`, `IToastItem`) ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))
- **Breaking:** Remove wildcard subpath exports (`./components/*`, `./signals/*`) ([#146](https://github.com/coloneljade/auldrant-ui/pull/146))

## [1.2.2] - 2026-03-25

### Fixed

- Add explicit type definitions for text CSS module properties (muted, primary, sm, lg) ([#144](https://github.com/coloneljade/auldrant-ui/pull/144))
- Remove unused ./styles export from package.json — CSS is already bundled via JS entry point ([#144](https://github.com/coloneljade/auldrant-ui/pull/144))

## [1.2.1] - 2026-03-25

### Fixed

- Remove tsconfig `include` to allow dts plugin's `entryRoot` option to work correctly ([#141](https://github.com/coloneljade/auldrant-ui/pull/141))
- Add `dev/tsconfig.json` for IDE scoping of dev page ([#141](https://github.com/coloneljade/auldrant-ui/pull/141))
- Add `tests` and `scripts` to tsconfig `exclude` (not shipped) ([#141](https://github.com/coloneljade/auldrant-ui/pull/141))

## [1.2.0] - 2026-03-25

### Added

- feat(routing): support wrapped Route/Page children via context-based claiming ([#139](https://github.com/coloneljade/auldrant-ui/pull/139))
- test(routing): add tests for wrapped and mixed Router children ([#139](https://github.com/coloneljade/auldrant-ui/pull/139))
- docs(routing): document self-contained pages and standalone Route ([#139](https://github.com/coloneljade/auldrant-ui/pull/139))

## [1.1.1] - 2026-03-24

### Changed

- chore(deps): update lucide-preact to 1.x ([#135](https://github.com/coloneljade/auldrant-ui/pull/135))

## [1.1.0] - 2026-03-24

### Added

- fix: apply base body styles in tokens.css ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- fix(a11y): make SkipLink target required instead of defaulting to #main ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- fix(#128): include Head in NotFound to set document title ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- feat(#129): add promise-based global dialog API (confirm/dialog + DialogHost) ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- feat(#130): add text CSS module for common text treatments ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- feat(#131): make Nav title required, render visually hidden, remove route ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- feat(#132): add Page + Router + pageTitle signal + simplify NotFound ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- fix: upgrade TypeScript 6 and Vite 8, clean up config ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- fix(tests): add signal resets and missing a11y tests for Page and Router ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- **DialogHost** — global dialog queue host; mount once in app root ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- **Page** — render-less page orchestrator (routing + document title + pageTitle signal) ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- **Router** — exclusive route matching wrapper (renders only first matching child) ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- `confirm()` / `dialog()` — promise-based imperative dialog functions ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- `pageTitle` signal — synced by Page, readable by consumers for headings ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- `text` CSS module — shared text utility classes (muted, primary, sm, lg) ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- **Nav**: `title` now required (visually hidden heading), `route` prop removed ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- **SkipLink**: `target` now required (no default `#main`) ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- **NotFound**: `heading` prop removed, changed from `<main>` to `<div>` (content-only, pair with Page) ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- TypeScript 5 → 6, Vite 8.0.0 → 8.0.2 ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- vite.config.ts simplified: `resolve.tsconfigPaths` replaces manual aliases ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))
- Removed `baseUrl` from tsconfig.json ([#133](https://github.com/coloneljade/auldrant-ui/pull/133))

## [1.0.1] - 2026-03-19

### Fixed

- fix(a11y): restore explicit id/for label association in FormField ([#121](https://github.com/coloneljade/auldrant-ui/pull/121))
- chore: add favicons and move script to head in dev page ([#121](https://github.com/coloneljade/auldrant-ui/pull/121))

## [1.0.0] - 2026-03-16

### Added

- Add Tooltip component with CSS Anchor Positioning and JS fallback (Firefox/older browsers use JS fallback via `useTooltipPosition`) ([#118](https://github.com/coloneljade/auldrant-ui/pull/118))
- Dogfood Tooltip on all icon-only buttons across the library (close, dismiss, remove, toggle, clear) ([#118](https://github.com/coloneljade/auldrant-ui/pull/118))
- Fix dialog drag transform to unblock `position:fixed` descendants from escaping dialog bounds ([#118](https://github.com/coloneljade/auldrant-ui/pull/118))
- Fix tooltip clipping — use `position:fixed` in CSS Anchor path so tooltips paint above dialog edges ([#118](https://github.com/coloneljade/auldrant-ui/pull/118))
- Widen dialog `max-width` from 32em to 40em for more comfortable content ([#118](https://github.com/coloneljade/auldrant-ui/pull/118))
- Add WCAG 2.5.8 touch target minimums to PasswordInput toggle and Toast dismiss buttons ([#118](https://github.com/coloneljade/auldrant-ui/pull/118))
- Extract shared CSS patterns to composable classes in `shared.css` ([#118](https://github.com/coloneljade/auldrant-ui/pull/118))

## [0.26.1] - 2026-03-16

### Fixed

- refactor(FormField): wrapping label + imperative error wiring (#115) ([#116](https://github.com/coloneljade/auldrant-ui/pull/116))
- feat(tokens): light-dark() color scheme + dev toggle ([#116](https://github.com/coloneljade/auldrant-ui/pull/116))
- feat(Textarea): soft character limit with overage indication ([#116](https://github.com/coloneljade/auldrant-ui/pull/116))
- chore(dev): add over-limit Textarea example ([#116](https://github.com/coloneljade/auldrant-ui/pull/116))

## [0.26.0] - 2026-03-16

### Added

- Single-file picker with button and drag-and-drop zone variants ([#114](https://github.com/coloneljade/auldrant-ui/pull/114))
- Multi-file support via `multiple` prop — append semantics, duplicate detection (name+size), per-file remove ([#114](https://github.com/coloneljade/auldrant-ui/pull/114))
- Optional `maxFiles` and `maxTotalSize` limits with aggregate error messages ([#114](https://github.com/coloneljade/auldrant-ui/pull/114))
- `onSelect` always returns `File[]`; `onRemove` callback for individual file removal ([#114](https://github.com/coloneljade/auldrant-ui/pull/114))
- Drag-and-drop zone with hover/dragover highlight, filename truncation for long names ([#114](https://github.com/coloneljade/auldrant-ui/pull/114))

## [0.25.0] - 2026-03-16

### Added

- Route param pattern matching (`:id`, `:orgId/:itemId`) via new `matchParams()` and param branch in Route ([#112](https://github.com/coloneljade/auldrant-ui/pull/112))
- Pagination component with URL-driven `/page/:n` convention, `usePage()` hook, and `page()` signal factory ([#112](https://github.com/coloneljade/auldrant-ui/pull/112))
- Extended Link with `aria-disabled` and `aria-label` support for accessible disabled states ([#112](https://github.com/coloneljade/auldrant-ui/pull/112))
- NotFound rendering for invalid/out-of-range pages, error thrown for `totalPages < 1` ([#112](https://github.com/coloneljade/auldrant-ui/pull/112))

## [0.24.0] - 2026-03-15

### Changed

- feat: CheckboxGroup component (#87) ([#109](https://github.com/coloneljade/auldrant-ui/pull/109))
- fix: add disabled visual state to Checkbox and RadioGroup tiles ([#109](https://github.com/coloneljade/auldrant-ui/pull/109))

## [0.23.0] - 2026-03-15

### Added

- feat(toggle): add Toggle component (#98) ([#108](https://github.com/coloneljade/auldrant-ui/pull/108))

## [0.22.1] - 2026-03-15

### Fixed

- Disabled items now keyboard-accessible via arrow keys (WAI-ARIA APG compliant) ([#104](https://github.com/coloneljade/auldrant-ui/pull/104))
- Replace native `disabled` attribute with `aria-disabled="true"` on menu items ([#104](https://github.com/coloneljade/auldrant-ui/pull/104))
- Arrow key navigation visits all items; Home/End jump to first/last enabled item ([#104](https://github.com/coloneljade/auldrant-ui/pull/104))
- Popover API stub extracted to `tests/preload.ts` (eliminates duplication) ([#104](https://github.com/coloneljade/auldrant-ui/pull/104))
- Test assertions updated for `aria-disabled` (removed `hidden:true` queries) ([#104](https://github.com/coloneljade/auldrant-ui/pull/104))
- New coverage: Fragment-wrapped items, disabled item interaction, open-state axe scan ([#104](https://github.com/coloneljade/auldrant-ui/pull/104))

## [0.22.0] - 2026-03-15

### Changed

- fix(form): add `submitDisabled` prop to block submission on app-level validation errors; wrap `onSubmit` in `Promise.resolve().catch()` so async handlers surface rejections ([#103](https://github.com/coloneljade/auldrant-ui/pull/103))
- feat(skeleton): pure CSS shimmer placeholder for loading states; `rounded` prop for avatar/pill shapes; `aria-hidden`, `prefers-reduced-motion` support ([#103](https://github.com/coloneljade/auldrant-ui/pull/103))
- feat(progress): determinate and indeterminate progress bar using native `<progress>` (CSP-safe, no inline styles); discriminated union enforces `value` xor `indeterminate`; CSS `:indeterminate` drives animation ([#103](https://github.com/coloneljade/auldrant-ui/pull/103))

## [0.21.0] - 2026-03-14

### Added

- feat(dropdown): add Dropdown and DropdownItem components ([#96](https://github.com/coloneljade/auldrant-ui/pull/96))
- test(dropdown): behavioral and a11y test suites ([#96](https://github.com/coloneljade/auldrant-ui/pull/96))
- feat(dropdown): wire into library, dev page, and README ([#96](https://github.com/coloneljade/auldrant-ui/pull/96))

## [0.20.0] - 2026-03-14

### Added

- feat(hooks): add useTimer pausable countdown hook ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))
- feat(Icon): add centralized icon wrapper with typed API ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))
- refactor: migrate existing components to Icon wrapper ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))
- feat(Alert): add variant icons with grid layout update ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))
- feat(Toast): add toast notification system with Toaster overlay ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))
- test(Toast): add behavioral and a11y tests ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))
- feat: wire Toast, Icon, useTimer into public API and dev page ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))
- chore(Alert): migrate useState to useSignal ([#94](https://github.com/coloneljade/auldrant-ui/pull/94))

## [0.19.0] - 2026-03-14

### Changed

- feat(SearchInput): add search input component — `<search>` landmark, `type="search"` input, decorative icon, conditional clear button, Enter-to-submit; extends `IFieldProps` via `FormField` ([#91](https://github.com/coloneljade/auldrant-ui/pull/91))
- test(SearchInput): behavioral and a11y tests (WCAG SC 4.1.2, SC 3.3.1) ([#91](https://github.com/coloneljade/auldrant-ui/pull/91))
- feat(Tabs,dev): add controlled `active` prop to `TabGroup` for URL-driven and back/forward tab state; dev page restructured with About at `/`, tests at `/tests/tab/:id`, and `SearchInput` dogfooded as a global cross-tab section filter ([#91](https://github.com/coloneljade/auldrant-ui/pull/91))

## [0.18.0] - 2026-03-14

### Added

- feat(CurrencyInput): add locale-aware currency input with `Intl.NumberFormat` for display/parse, `type="text"` + `inputMode="decimal"`, and focus/blur lifecycle via `useSignal` ([#88](https://github.com/coloneljade/auldrant-ui/pull/88))
- test(CurrencyInput): 7 behavioral tests + 6 a11y tests (axe, SC 4.1.2, SC 3.3.1) ([#88](https://github.com/coloneljade/auldrant-ui/pull/88))
- docs(CurrencyInput): dev section showcasing USD, JPY, EUR (de-DE), plain decimal, disabled, and error states; README entry ([#88](https://github.com/coloneljade/auldrant-ui/pull/88))
- chore: add component checklist rule to enforce dev section + README on all future components ([#88](https://github.com/coloneljade/auldrant-ui/pull/88))
- chore(dev): widen `.dev-row` grid minimum (12em → 20em) to prevent label/input cramping in form sections ([#88](https://github.com/coloneljade/auldrant-ui/pull/88))
- fix(RadioGroup,Checkbox): `inset: 0` + `appearance: none` on the hidden input — `width: 0; height: 0` only covered a zero-size point so clicks outside the label text missed; `appearance: none` suppresses OS-native widget rendering that bleeds through `opacity: 0` (especially on radio) ([#88](https://github.com/coloneljade/auldrant-ui/pull/88))

## [0.17.0] - 2026-03-14

### Added

- feat(Theme): convert Palette to enum and add palette signal (#83) ([#86](https://github.com/coloneljade/auldrant-ui/pull/86))
- feat(NotFound,Nav): add 404 page, /about route, routing demo, Nav titleHref (#78) ([#86](https://github.com/coloneljade/auldrant-ui/pull/86))
- feat(RadioGroup,Checkbox): add highlight tile variants with full click targets (#84) ([#86](https://github.com/coloneljade/auldrant-ui/pull/86))
- chore: drop default variants, consolidate to tile-only style, improve dev page layout ([#86](https://github.com/coloneljade/auldrant-ui/pull/86))

## [0.16.0] - 2026-03-14

### Changed

- Add `TabGroup` + `Tab` compound component with roving tabindex, keyboard nav (Arrow keys, Home, End), and lazy/eager panel mounting ([#85](https://github.com/coloneljade/auldrant-ui/pull/85))
- Refactor `Accordion` from `items` array prop to `<AccordionItem>` compound children ([#85](https://github.com/coloneljade/auldrant-ui/pull/85))
- Refactor `RadioGroup` from `options` array prop to `<RadioItem>` compound children ([#85](https://github.com/coloneljade/auldrant-ui/pull/85))
- Migrate dev test page from flat scroll layout to `TabGroup` navigation with a live `RadioGroup` palette switcher ([#85](https://github.com/coloneljade/auldrant-ui/pull/85))

## [0.15.0] - 2026-03-13

### Added

- Add `Accordion` component with ARIA state, keyboard navigation (Arrow keys, Home/End with wrapping), and smooth CSS animation ([#80](https://github.com/coloneljade/auldrant-ui/pull/80))
- Support multi-expand (default) and exclusive (single-open) modes via `exclusive` prop ([#80](https://github.com/coloneljade/auldrant-ui/pull/80))
- Add `headingLevel` prop using new `HeadingLevel` enum for configurable heading levels ([#80](https://github.com/coloneljade/auldrant-ui/pull/80))
- Add ID format validation (letters, digits, underscores, hyphens only) alongside duplicate check ([#80](https://github.com/coloneljade/auldrant-ui/pull/80))
- Migrate `Section` heading level prop from inline union type to shared `HeadingLevel` enum ([#80](https://github.com/coloneljade/auldrant-ui/pull/80))
- Fix collapsed panels incorrectly reserving bottom padding space ([#80](https://github.com/coloneljade/auldrant-ui/pull/80))

## [0.14.0] - 2026-03-13

### Added

- feat(Chip): add dismissible tag component with neutral/success/warning/error variants, optional X icon remove button (lucide-preact), and Backspace/Delete keyboard support ([#76](https://github.com/coloneljade/auldrant-ui/pull/76))
- docs(test-page): add Chip section covering static variants, dismissible chips, and interactive signal-driven tag list ([#76](https://github.com/coloneljade/auldrant-ui/pull/76))
- chore(test-page): split all test page sections into `dev/sections/` — one file per component, TestPage.tsx becomes a thin orchestrator ([#76](https://github.com/coloneljade/auldrant-ui/pull/76))
- fix(Alert): fade-in on mount, fade-out on dismiss before unmount; respects `prefers-reduced-motion`; fixes `styles[variant]` to exhaustive map ([#76](https://github.com/coloneljade/auldrant-ui/pull/76))
- fix(Chip): X button pinned to right edge via explicit `grid-template-columns`; remove button meets WCAG 2.5.8 24×24px touch target minimum ([#76](https://github.com/coloneljade/auldrant-ui/pull/76))

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
