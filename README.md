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
    <Theme class="my-theme">
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
| `Theme` | Scopes `--aui-*` custom properties to its subtree | `children` |
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

Wrap your app in `<Theme>` and define `--aui-*` custom properties in your CSS:

```css
.my-theme {
  --aui-color-text: #1a1a1a;
  --aui-color-text-muted: #6b7280;
  --aui-color-background: #ffffff;
  --aui-color-surface: #f9fafb;
  --aui-color-border: #d1d5db;
  --aui-color-primary: #2563eb;
  --aui-color-primary-hover: #1d4ed8;
  --aui-color-focus-ring: #3b82f6;
  --aui-color-error: #dc2626;
}
```

```tsx
<Theme class="my-theme">
  <App />
</Theme>
```

| Token | Purpose |
|-------|---------|
| `--aui-color-text` | Body text |
| `--aui-color-text-muted` | Placeholder text, secondary content |
| `--aui-color-background` | Input and page backgrounds |
| `--aui-color-background-hover` | Hover state for interactive backgrounds |
| `--aui-color-surface` | Card and container backgrounds |
| `--aui-color-border` | Borders on inputs, cards, tables |
| `--aui-color-primary` | Buttons, links, accents |
| `--aui-color-primary-hover` | Hover state for buttons and links |
| `--aui-color-focus-ring` | Focus indicator outline |
| `--aui-color-error` | Validation error text |

Themes are nestable for sub-themes (e.g. dark mode sections).

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
