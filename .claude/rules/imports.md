# Import Aliases

## Rule

Always use `@<directory>` aliases for cross-directory imports. No `../` relative paths.

## Configured Aliases

| Alias | Resolves To | Contains |
|-------|-------------|----------|
| `@components/*` | `src/components/*` | Component `.tsx` files (flat) |
| `@internal/*` | `src/internal/*` | Non-exported components used by other components |
| `@scripts/*` | `src/scripts/*` | Shared types and utilities |
| `@signals/*` | `src/signals/*` | Preact signal stores |
| `@styles/*` | `src/styles/*` | All CSS — layout, tokens, component modules |

Aliases are defined in both `tsconfig.json` (paths) and `vite.config.ts` (resolve.alias).

## Examples

```ts
// Component importing another component
import FormField from '@components/FormField';

// Component importing styles
import styles from '@styles/Button.module.css';

// Component importing shared types
import type { IBaseProps } from '@scripts/types';

// Component importing utilities
import { cx } from '@scripts/utils';

// Test importing a component
import Button from '@components/Button';
```

## Allowed

- External packages (e.g., `'preact'`, `'preact/hooks'`)
- `@<directory>/...` aliases for all cross-directory imports

## Forbidden

- `'../'` traversal of any kind — always use aliases
- `'./'` relative imports — components, styles, and scripts are in separate directories

## Adding New Directories

When adding a new `src/` subdirectory, add a corresponding alias to:
1. `tsconfig.json` — `compilerOptions.paths`
2. `vite.config.ts` — `resolve.alias`
