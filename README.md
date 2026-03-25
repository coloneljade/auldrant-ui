# @auldrant/ui

[![npm](https://img.shields.io/npm/v/@auldrant/ui?color=blue)](https://www.npmjs.com/package/@auldrant/ui)
[![CI](https://img.shields.io/github/actions/workflow/status/coloneljade/auldrant-ui/ci.yml?label=CI)](https://github.com/coloneljade/auldrant-ui/actions)
[![license](https://img.shields.io/github/license/coloneljade/auldrant-ui)](https://github.com/coloneljade/auldrant-ui/blob/main/LICENSE)

Accessible Preact component library with design tokens and CSS modules.

## Installation

```bash
bun add @auldrant/ui preact @preact/signals
```

Import the stylesheet in your app entry point:

```ts
import '@auldrant/ui/styles';
```

## Quick Start

```tsx
import '@auldrant/ui/styles';
import { Button, Form, Theme } from '@auldrant/ui/components';

function App() {
  return (
    <Theme>
      <Form onSubmit={(data) => console.log(data)}>
        <Button label="Submit" type="submit" />
      </Form>
    </Theme>
  );
}
```

### Available Subpaths

| Path | Description | Example |
|------|-------------|---------|
| `@auldrant/ui/styles` | CSS tokens + component styles (import once in app entry) | `import '@auldrant/ui/styles'` |
| `@auldrant/ui/components` | All components | `import { Button, Theme } from '@auldrant/ui/components'` |
| `@auldrant/ui/signals` | All signals | `import { navigate, toast } from '@auldrant/ui/signals'` |
| `@auldrant/ui/hooks` | Hooks (`useTimer`, `usePage`) | `import useTimer from '@auldrant/ui/hooks'` |
| `@auldrant/ui/utils` | Utilities (`cx`, `HeadingLevel`) | `import { cx } from '@auldrant/ui/utils'` |

> **Note:** Consumer tsconfig must use a `moduleResolution` mode that supports package `exports` (recommended: `"bundler"`).

## Components

### Disclosure

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Accordion` + `AccordionItem` | Collapsible disclosure sections with ARIA state and smooth animation | `exclusive?`, `headingLevel?` on Accordion; `id`, `label`, `defaultOpen?` on AccordionItem |
| `TabGroup` + `Tab` | Accessible tab interface with keyboard navigation and lazy panel mounting | `defaultActive?`, `onChange?`, `eager?` on TabGroup; `id`, `label`, `onActivate?`, `eager?` on Tab |

> **Note:** In multi-expand mode (`exclusive=false`), each open Accordion panel renders `role="region"`. Many simultaneously open panels can proliferate landmarks and degrade screen reader navigation — consider limiting item count or using `exclusive` mode in those cases.

### Feedback

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Alert` | Status message with live region role for screen readers | `message`, `variant?`, `title?`, `actionLabel?`, `actionHref?`, `onAction?`, `onDismiss?`, `dismissLabel?`, `duration?` |
| `Badge` | Read-only inline status or count indicator pill | `children`, `variant?` |
| `Chip` | Interactive dismissible tag for filters and selections | `label`, `variant?`, `onRemove?`, `removeLabel?`, `disabled?` |
| `Progress` | Determinate or indeterminate progress bar. Use `value` (0–100) for determinate; `indeterminate` for unknown duration | `label`, `value` (determinate) \| `indeterminate` (mutually exclusive) |
| `Skeleton` | Loading placeholder with shimmer animation. Size via the `class` prop | `rounded?` (pill/avatar shape) |
| `Toast` + `Toaster` | Transient notification with auto-dismiss and hover/focus pause. Mount `<Toaster />` once in app root; call `toast()` anywhere | `message`, `variant?`, `title?`, `duration?`, `dismissLabel?`, `onDismiss?` on Toast |

> **Note:** Toasts are intentionally transient — content must be safe to miss. For critical errors the user must act on, use `Alert`. All toasts use `role="status"` (polite) and do not interrupt screen reader focus.

### Form Controls

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Button` | Standard button with configurable type and click handler | `label`, `onClick?`, `type?` |
| `Checkbox` | Checkbox with label | `label`, `checked?`, `onChange?` |
| `CheckboxGroup` | Fieldset wrapper for grouping Checkbox components | `legend`, `error?` |
| `CurrencyInput` | Currency or plain-decimal input with locale-aware formatting | `value?`, `currency?` (ISO 4217), `locale?` (BCP 47), `onInput?` |
| `FileInput` | File picker with button or drag-and-drop zone variant. Single or multi-file with client-side type, size, count, and total-size validation | `accept`, `maxSize`, `onSelect`, `zone?`, `multiple?`, `maxFiles?`, `maxTotalSize?`, `onRemove?`, `onClear?` |
| `Form` | Form with submit/reset buttons. Prevents default and provides FormData | `onSubmit`, `children`, `submitLabel?`, `resetLabel?`, `submitDisabled?`, `status?` |
| `Input` | Text input with label | `type?`, `value?`, `onInput?` |
| `NumberInput` | Numeric input with label | `min?`, `max?`, `onInput?` |
| `PasswordInput` | Password input with show/hide toggle | `purpose` (`'current'` \| `'new'`), `value?`, `onInput?` |
| `RadioGroup` + `RadioItem` | Radio button group inside a fieldset | `legend`, `name`, `value?`, `onChange?`, `required?`, `disabled?`, `error?` on RadioGroup; `label`, `value` on RadioItem |
| `SearchInput` | Search input with icon, clear button, and Enter-to-submit | `value?`, `onInput?`, `onClear?`, `onSubmit?` |
| `Select` | Select dropdown with label | `options`, `value?`, `onChange?` |
| `Textarea` | Textarea with character counter | `maxChars`, `value?`, `onInput?` |
| `Toggle` | Immediate-action on/off switch (`role="switch"`). Not for form submission — fires effect on click | `label`, `checked`, `onChange?`, `disabled?` |

### Overlay

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `DialogHost` | Global dialog queue host. Mount once in app root; show dialogs via `confirm()` / `dialog()` | — |
| `Dropdown` + `DropdownItem` | Trigger button with a Popover API menu, full keyboard support, and type-ahead navigation | `trigger` on Dropdown; `onSelect?`, `disabled?` on DropdownItem |
| `Tooltip` | Hover/focus tooltip with CSS Anchor Positioning and accessible `aria-describedby` wiring | `content`, `delay?` |

### Layout

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Card` | Visual surface container | `children` |
| `Head` | Render-less component that syncs props to document head signals | `title?`, `description?`, `canonical?`, `ogTitle?`, `ogDescription?`, `ogImage?` |
| `Section` | Semantic `<section>` with configurable heading level | `title`, `level?`, `children` |
| `Table` | Accessible data table with required headers | `caption` (required), `headers`, `data`, `rowHeader?`, `striped?`, `dense?`, `captionHidden?`, `rowKey?` |
| `Theme` | Scopes `--aui-base-*` overrides to its subtree | `children` |
| `VisuallyHidden` | Screen-reader-only content | `children` |

### Navigation

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Link` | Auto-detects internal vs external URLs | `href`, `children`, `external?` |
| `DownloadLink` | Download link using `<a download>` | `href`, `fileName`, `label` |
| `Nav` | Semantic `<nav>` wrapper with visually hidden title | `title`, `children` |
| `SkipLink` | Skip navigation link, hidden until focused | `target?`, `label?` |

### Routing & Pagination

| Export | Description | Key Props / Signature |
|--------|-------------|----------------------|
| `Router` | Exclusive route matching via context. Only the first matching Route or Page renders — children can be direct elements or custom wrapper components. | `children` |
| `Page` | Render-less page orchestrator. Handles routing, document title, and page heading signal via `pageTitle`. Uses Route internally. | `path` (required), `title` (required), `description?`, `children` |
| `Route` | Renders children when location matches path. Supports exact, wildcard (`/*`), and param (`:id`) patterns | `path`, `children` |
| `Pagination` | URL-driven pagination wrapper. Renders children above a `<nav>`. Renders `<NotFound>` for invalid/out-of-range pages | `totalPages` (≥ 1), `children`, `prevLabel?`, `nextLabel?` |
| `usePage()` | Hook: returns the current page number from the URL. `undefined` at the base URL (treat as page 1) | `() => number \| undefined` |
| `page()` | Signal factory: same as `usePage` but as a `ReadonlySignal` for module-level use | `() => ReadonlySignal<number \| undefined>` |
| `navigate` | Navigate to a path using the History API | `(path: string, opts?) => void` |
| `location` | Signal holding the current pathname | `Signal<string>` |
| `pageTitle` | Signal that syncs the page title. Set by `Page`, readable by consumers to update headings | `Signal<string>` |
| `NotFound` | Content-only 404 component. Renders message and home link. Pair with `Page` for full routing. | `message?`, `href?`, `linkLabel?` |

#### Page, Router, and NotFound

Use `Router` to coordinate multiple pages with exclusive matching. `Page` handles routing, document title via `Head`, and signals the page title:

```tsx
import { Router, Page, NotFound } from '@auldrant/ui/components';
import { pageTitle } from '@auldrant/ui/signals';

export default function App() {
 return (
  <>
   <header>
    <h1>{pageTitle.value}</h1>
   </header>
   <main>
    <Router>
     <Page path="/" title="Auldrant UI">
      <HomePage />
     </Page>
     <Page path="/about" title="About">
      <AboutPage />
     </Page>
     <Page path="/items/:id" title="Item Details">
      <ItemPage />
     </Page>
     <Page path="/*" title="Page not found">
      <NotFound message="The page you were looking for doesn't exist." />
     </Page>
    </Router>
   </main>
  </>
 );
}
```

- **Router** provides exclusive matching via context — only the first matching Route or Page renders
- **Page** is render-less: it syncs the title signal and metadata, then renders children
- **NotFound** is content-only: pair it with a catch-all Page (`path="/*"`) as the last route

#### Self-contained pages

Route and Page children don't need to be direct Router children — they can be wrapped in custom components. This lets page components own their routing metadata:

```tsx
// Home.tsx — self-contained page
const Home = () => (
 <Page path="/" title="Home" description="Welcome to Auldrant UI">
  <Section title="Home">...</Section>
 </Page>
);

// NotFoundPage.tsx
const NotFoundPage = () => (
 <Page path="/*" title="Page not found">
  <NotFound message="The page you were looking for doesn't exist." />
 </Page>
);

// App.tsx — just lists pages
<Router>
 <Home />
 <AboutPage />
 <NotFoundPage />
</Router>
```

#### Standalone Route

A `Route` outside a `Router` renders based on location alone — no exclusive matching. This is useful for conditional sections that appear or disappear based on the URL without participating in full page routing:

```tsx
<div>
 <Nav />
 {/* Settings panel appears only on /settings/* URLs */}
 <Route path="/settings/*">
  <SettingsPanel />
 </Route>
 <Router>
  <Home />
  <AboutPage />
  <NotFoundPage />
 </Router>
</div>
```

### Icons

| Export | Description | Key Props |
|--------|-------------|-----------|
| `Icon` | Renders a library icon by semantic name. Always `aria-hidden="true"`. | `name` (`IconName`), `class?` |
| `IconName` | Enum of all icons exposed by the library | — |

Default size is `1em × 1em`. Override via `class`. Never import lucide-preact directly — use `Icon` so icon swaps require only one file change.

All components accept `class?` and `id?`. Form controls add `label`, `name?`, `required?`, and `disabled?`. Full prop types are available in the `.d.ts` files.

### Head component

Render `<Head>` on each page/route to declaratively manage document metadata. All props are optional — only set what the page needs:

```tsx
import { Head } from '@auldrant/ui/components';

function AboutPage() {
  return (
    <>
      <Head
        title="About us"
        description="Learn more about our team."
        canonical="https://example.com/about"
        ogTitle="About us"
        ogDescription="Learn more about our team."
        ogImage="https://example.com/og-about.png"
      />
      <main>…</main>
    </>
  );
}
```

For reactive title/meta updates without a component (e.g. in a signal effect or router), use the [head signals](#head-signals) directly.

### Progress: determinate vs indeterminate

`value` and `indeterminate` are mutually exclusive — TypeScript enforces this via a discriminated union:

```tsx
// Determinate — value required (0–100), indeterminate must be absent
<Progress label="Uploading" value={75} />

// Indeterminate — indeterminate required, value must be absent
<Progress label="Processing" indeterminate />
```

In indeterminate mode, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` are omitted from the DOM — these attributes are meaningless when progress is unknown.

### Imperative dialogs (`confirm` / `dialog`)

Mount `<DialogHost />` once in the app root alongside `<Toaster />`. Then call `confirm()` or `dialog()` from anywhere — no local state, no JSX at the call site.

**Confirmation (Modal behavior — action required, no backdrop dismiss):**

```ts
import { confirm, toast } from '@auldrant/ui/signals';

async function handleDelete(item: Item) {
  const confirmed = await confirm({
    title: 'Delete item?',
    message: `This will permanently remove ${item.name}.`,
    actionLabel: 'Delete',
    actionShortcut: 'd',
    focusCancel: true,
  });

  if (confirmed) {
    await deleteItem(item);
    toast('Item deleted.');
  }
}
```

**Dialog (dismissible, multi-action):**

```ts
import { dialog } from '@auldrant/ui/signals';

const choice = await dialog({
  title: 'Unsaved changes',
  message: 'You have unsaved changes. What would you like to do?',
  defaultAction: { label: 'Save', shortcut: 'Enter' },
  actions: [{ label: 'Discard', shortcut: 'd' }],
});

if (choice === 'Save') { await save(); }
else if (choice === 'Discard') { discard(); }
// null = dismissed via Escape/backdrop/X
```

**Setup:**

```tsx
import { DialogHost, Theme, Toaster } from '@auldrant/ui/components';

function App() {
  return (
    <Theme>
      <Main />
      <Toaster />
      <DialogHost />
    </Theme>
  );
}
```

Dialogs are queued — calling `confirm()` or `dialog()` while one is open shows the next dialog after the current one resolves. `confirm()` shows an action-required modal (`role="alertdialog"`). `dialog()` shows a dismissible dialog.

### Form field errors

Wire field-level errors by passing them directly to each field via the `error` prop:

```tsx
const [errors, setErrors] = useState<{ [key: string]: string }>({});

<Form onSubmit={(data) => {
  const name = data.get('name') as string;
  if (!name) { setErrors({ name: 'Name is required' }); return; }
  setErrors({});
  // handle submit...
}}>
  <Input label="Name" name="name" error={errors['name']} />
</Form>
```

### Routing & Pagination

#### Route patterns

`Route` supports three path forms:

```tsx
<Route path="/about">…</Route>              {/* exact */}
<Route path="/users/*">…</Route>            {/* wildcard — matches /users, /users/anything */}
<Route path="/users/:id">…</Route>          {/* param — exact segment count */}
<Route path="/org/:orgId/items/:itemId">…</Route>  {/* multi-param */}
```

#### Pagination

`Pagination` is a wrapper component. It renders its children above a pagination `<nav>`, and
automatically handles sub-routing — appending `/page/N` to the current URL. Page 1 is the base
URL (no suffix).

The parent route must use a wildcard to catch page sub-paths:

```tsx
<Route path="/results/*">
  <ResultsComponent />
</Route>
```

Invalid page URLs (non-numeric suffix, page number beyond `totalPages`) render `<NotFound>`
in place of the children and nav. `totalPages` must be ≥ 1 or Pagination throws.

```tsx
import { Pagination } from '@auldrant/ui/components';
import { usePage } from '@auldrant/ui/hooks';
import { useEffect } from 'preact/hooks';

const ResultsComponent: FunctionComponent = () => (
  <Pagination totalPages={20}>
    <ResultsContent />
  </Pagination>
);

const ResultsContent: FunctionComponent = () => {
  const p = usePage(); // undefined at /results (root = page 1), 3 at /results/page/3

  useEffect(() => {
    fetchResults(p ?? 1);
  }, [p]);

  return <Table />;
};
```

#### Why links, not callbacks?

The URL is the state. Browser back/forward work. Pages are bookmarkable and shareable.
Side effects belong in the component that owns the data, triggered naturally when the
URL param changes — not in an event handler that fires before navigation completes.

#### Module-level reactive state

For signals outside the component tree:

```tsx
import { page } from '@auldrant/ui/hooks';
import { computed } from '@preact/signals';

export const currentPage = page(); // ReadonlySignal<number | undefined>
export const results = computed(() => fetchResults(currentPage.value ?? 1));
```

> **Note:** Two independent `Pagination` components on the same route share the same `/page/:n`
> URL state. This is a v1 limitation — keep to one paginated list per route.

## Theming

The library ships with a built-in contrast system that derives all color tokens from a small set of base values. No theme class is required — the defaults work out of the box with WCAG AAA (7:1) text contrast.

### Zero-config (defaults)

```tsx
<Theme>
  <App />
</Theme>
```

### Custom primary color

Provide a single `--aui-base-primary` token. The library derives all other tokens automatically:

```css
.brand {
  --aui-base-primary: oklch(0.78 0.20 280);
}
```

```tsx
<Theme class="brand">
  <App />
</Theme>
```

### Full override

Override primary, white, and black for complete control:

```css
.custom {
  --aui-base-primary: oklch(0.78 0.19 150);
  --aui-base-white: #fafafa;
  --aui-base-black: #111111;
}
```

### Base tokens (consumer-provided)

| Token | Default | Description |
|-------|---------|-------------|
| `--aui-base-primary` | `oklch(0.78 0.18 160)` | Brand accent color (green) |
| `--aui-base-white` | `#f5f5f5` | Light endpoint (light-mode background, dark-mode text) |
| `--aui-base-black` | `#1a1a1a` | Dark endpoint (dark-mode background, light-mode text) |
| `--aui-base-error` | `oklch(0.78 0.22 27)` | Error/danger semantic color |
| `--aui-base-success` | `oklch(0.78 0.18 145)` | Success semantic color |

### Derived tokens (library-managed)

These are computed via `color-mix(in oklch, ...)` — do not set them manually.

| Token | Purpose |
|-------|---------|
| `--aui-color-text` | Body text |
| `--aui-color-text-muted` | Placeholder text, secondary content |
| `--aui-color-background` | Page and input backgrounds |
| `--aui-color-background-hover` | Hover state for interactive backgrounds |
| `--aui-color-surface` | Card and container backgrounds |
| `--aui-color-border` | Borders on inputs, cards, tables |
| `--aui-color-primary` | Buttons, links, accents |
| `--aui-color-primary-hover` | Hover state for buttons and links |
| `--aui-color-focus-ring` | Focus indicator outline |
| `--aui-color-error` | Validation error text and indicators |
| `--aui-color-success` | Success text and indicators |

### Dark-first design

The library defaults to dark mode. In light mode (`prefers-color-scheme: light`), the direction tokens swap and primary/semantic colors are automatically darkened for contrast on light backgrounds.

You provide ONE primary color optimized for dark backgrounds (oklch lightness ~0.75–0.80). The library handles light mode automatically.

### Contrast guarantees

With the recommended `--aui-base-white` / `--aui-base-black` pair (`#f5f5f5` / `#1a1a1a`):

- Text tokens meet **WCAG AAA (7:1)** in both dark and light modes
- Border and focus-ring meet **3:1** per WCAG 1.4.11 (non-text contrast)
- Primary, error, and success meet **AAA (7:1)** for text use

Custom white/black pairs with lower inherent contrast (e.g. `#e8e8e8` / `#2a2a2a`) may reduce guarantees to AA (4.5:1). Verify with a contrast checker when using non-default endpoints.

### Primary color guidance

Use oklch lightness **0.75–0.80** and chroma **0.15–0.22** for the primary color. All verified hue families are available as pre-built palettes (see below). Custom hues at these ranges generally pass AAA — verify with a [contrast checker](https://webaim.org/resources/contrastchecker/) if using untested values.

### Pre-built palettes

AAA-verified preset classes — apply directly on `<Theme>`:

| Class | Value | Notes |
|-------|-------|-------|
| *(default)* | `oklch(0.78 0.18 160)` | Green — no class needed |
| `aui-blue` | `oklch(0.78 0.18 260)` | |
| `aui-purple` | `oklch(0.78 0.18 300)` | |
| `aui-teal` | `oklch(0.78 0.15 195)` | Lower chroma for teal gamut |
| `aui-red` | `oklch(0.78 0.22 27)` | Higher chroma for red vibrancy |
| `aui-orange` | `oklch(0.78 0.18 55)` | |
| `aui-yellow` | `oklch(0.78 0.18 95)` | Light mode shifts toward olive/amber (expected) |

```tsx
<Theme class="aui-blue">   {/* override default green with blue */}
  <App />
</Theme>

<Theme>                     {/* green — the default, no class needed */}
  <App />
</Theme>
```

### Nestable themes

`<Theme>` is nestable for sub-themes. Inner overrides re-derive all tokens:

```tsx
<Theme>
  <App />
  <Theme class="accent-section">
    <Sidebar />
  </Theme>
</Theme>
```

## Routing & Signals

Built-in routing uses Preact signals and the History API:

```tsx
import { Route, Link } from '@auldrant/ui/components';
import { location, hash, navigate, title } from '@auldrant/ui/signals';

// Read current path
console.log(location.value); // "/about"
console.log(hash.value);     // "section-1"

// Navigate programmatically
navigate('/dashboard');
navigate('/login', { replace: true });

// Set document title reactively
title.value = 'My Page';

// Declarative routing — exact match
<Route path="/about">
  <AboutPage />
</Route>

// Wildcard — matches /users, /users/123, /users/settings
<Route path="/users/*">
  <UsersSection />
</Route>

<Link href="/about">About</Link>
```

### Palette signal

Switch the active palette imperatively from anywhere in the app:

```ts
import { palette } from '@auldrant/ui/signals';
import { Palette } from '@auldrant/ui/components';

palette.value = Palette.blue;   // switch to blue
palette.value = null;           // reset to default
```

`<Theme>` reads `palette.value` and applies the corresponding class to its root element. This enables runtime palette switching without re-rendering the entire tree.

### Head signals

All document head values are writable signals. They can be set from anywhere — route handlers, effects, or outside of components:

| Signal | Type | Effect |
|--------|------|--------|
| `title` | `Signal<string>` | Sets `document.title` |
| `description` | `Signal<string>` | Syncs `<meta name="description">` |
| `canonical` | `Signal<string>` | Syncs `<link rel="canonical">` |
| `ogTitle` | `Signal<string>` | Syncs `<meta property="og:title">` |
| `ogDescription` | `Signal<string>` | Syncs `<meta property="og:description">` |
| `ogImage` | `Signal<string>` | Syncs `<meta property="og:image">` |

Empty string removes the corresponding tag. These signals are SSR-compatible — the `<Head>` component syncs the same signals via `useEffect` on the client.

```ts
import { title, description, canonical } from '@auldrant/ui/signals';

// Set on navigation
title.value = 'Dashboard';
description.value = 'Your overview.';
canonical.value = 'https://example.com/dashboard';
```

## Utilities

### `cx(...classes)`

Combine CSS class names, filtering out falsy values:

```tsx
import { cx } from '@auldrant/ui/utils';

cx('btn', isActive && 'active');          // "btn active" or "btn"
cx(styles.card, props.class);             // handles undefined class prop
```

### `text`

CSS module with common text treatments. Classes use library color tokens, so they respect theming automatically:

```tsx
import { text } from '@auldrant/ui/components';
import { cx } from '@auldrant/ui/utils';

<p class={text.muted}>Secondary information</p>
<p class={text.primary}>Accented text</p>
<p class={cx(text.muted, text.sm)}>Fine print</p>
```

| Class | Effect |
|-------|--------|
| `text.muted` | `color: var(--aui-color-text-muted)` |
| `text.primary` | `color: var(--aui-color-primary)` |
| `text.sm` | `font-size: 0.875em` |
| `text.lg` | `font-size: 1.125em` |

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, code style, dev test page, and PR workflow.

### Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with test page |
| `bun run build` | Build the library |
| `bun run check` | Lint and format check (Biome) |
| `bun run check:fix` | Auto-fix lint and format issues |
| `bun run typecheck` | TypeScript type checking |
| `bun run test` | Run tests |
| `bun run test:watch` | Run tests in watch mode |

## License

[MIT](LICENSE)
