# @auldrant/ui

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
import { Button, Form, Theme } from '@auldrant/ui';
import '@auldrant/ui/styles';

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

## Components

### Form Controls

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Button` | Standard button with configurable type and click handler | `label`, `onClick?`, `type?` |
| `Checkbox` | Checkbox with label | `label`, `checked?`, `onChange?` |
| `Form` | Form with submit/reset buttons. Prevents default and provides FormData | `onSubmit`, `children`, `submitLabel?` |
| `Input` | Text input with label | `type?`, `value?`, `onInput?` |
| `NumberInput` | Numeric input with label | `min?`, `max?`, `onInput?` |
| `PasswordInput` | Password input with show/hide toggle | `purpose` (`'current'` \| `'new'`), `value?`, `onInput?` |
| `RadioGroup` | Radio button group inside a fieldset | `legend`, `name`, `options` |
| `Select` | Select dropdown with label | `options`, `value?`, `onChange?` |
| `Textarea` | Textarea with character counter | `maxChars`, `value?`, `onInput?` |

### Layout

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Card` | Visual surface container | `children` |
| `Section` | Semantic `<section>` with configurable heading level | `title`, `level?`, `children` |
| `Table` | Accessible data table with required headers | `headers`, `data` |
| `Theme` | Scopes `--aui-base-*` overrides to its subtree | `children` |
| `VisuallyHidden` | Screen-reader-only content | `children` |

### Navigation

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Link` | Auto-detects internal vs external URLs | `href`, `children`, `external?` |
| `DownloadLink` | Download link using `<a download>` | `href`, `fileName`, `label` |
| `Nav` | Semantic `<nav>` wrapper with optional title | `title?`, `children` |
| `Route` | Renders children when location matches path | `path`, `children` |
| `SkipLink` | Skip navigation link, hidden until focused | `target?`, `label?` |

All components extend `IBaseProps` which includes `class?` and `id?`. Form controls extend `IFieldProps` which adds `label`, `name?`, `required?`, and `disabled?`. Full prop types are available in the `.d.ts` files.

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
| `--aui-base-primary` | `oklch(0.78 0.18 260)` | Brand accent color (blue) |
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

Use oklch lightness **0.75–0.80** and chroma **0.15–0.22** for the primary color. Most hue families (blue, purple, teal, green, red) work well at these ranges.

Yellows and oranges (hue 60–110) are harder to guarantee at AAA because oklch lightness maps non-linearly to WCAG luminance for warm hues. Test these with a [contrast checker](https://webaim.org/resources/contrastchecker/).

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
import { location, hash, navigate, title, Route, Link } from '@auldrant/ui';

// Read current path
console.log(location.value); // "/about"
console.log(hash.value);     // "section-1"

// Navigate programmatically
navigate('/dashboard');
navigate('/login', { replace: true });

// Set document title reactively
title.value = 'My Page';

// Declarative routing
<Route path="/about">
  <AboutPage />
</Route>

<Link href="/about">About</Link>
```

## Utilities

### `cx(...classes)`

Combine CSS class names, filtering out falsy values:

```tsx
import { cx } from '@auldrant/ui';

cx('btn', isActive && 'active');          // "btn active" or "btn"
cx(styles.card, props.class);             // handles undefined class prop
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- Or use the included DevContainer

### Setup

```bash
bun install
```

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
| `bun run storybook` | Start Storybook dev server |
| `bun run build-storybook` | Build static Storybook |

## License

[MIT](LICENSE)
