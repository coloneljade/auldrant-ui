# @auldrant/ui

Preact component library for Auldrant SPAs.

## Features

- Preact components with TypeScript
- CSS modules for scoped styles
- Design tokens via CSS custom properties
- Storybook for component preview
- Strict accessibility standards (semantic HTML first)

## Installation

```bash
bun add @auldrant/ui
```

Peer dependencies:

```bash
bun add preact @preact/signals
```

## Usage

```tsx
import { } from '@auldrant/ui';
```

Components will be added as the library grows.

## Development

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- Or use the included DevContainer (recommended)

### Setup

```bash
bun install
```

### Commands

| Command | Description |
|---------|-------------|
| `bun run build` | Build the library with Vite |
| `bun run check` | Lint and format check (Biome) |
| `bun run check:fix` | Auto-fix lint and format issues |
| `bun run typecheck` | TypeScript type checking |
| `bun run test` | Run tests |
| `bun run test:watch` | Run tests in watch mode |
| `bun run storybook` | Start Storybook dev server |
| `bun run build-storybook` | Build static Storybook |

### Project Structure

```
src/
  index.ts              # Library entry point
  components/           # Component source files
  styles/
    colors.css          # Color design tokens
    layout.css          # Base layout reset
tests/
  *.test.ts             # Test files
.storybook/             # Storybook configuration
```

## Design Principles

- **Semantic HTML first** — use native elements before ARIA
- **CSS Grid layout** — grid for all layout, no flexbox
- **em units** — for spacing and sizing
- **CSS modules** — component-scoped styles
- **Minimal dependencies** — only what's needed

## License

[MIT](LICENSE)
