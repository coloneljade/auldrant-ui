# Import Aliases

## Rule

Always use `@<directory>` aliases for cross-directory imports. No `../` relative paths.

## Configured Aliases

| Alias | Resolves To | Contains |
|-------|-------------|----------|
| `@components/*` | `src/components/*` | Component `.tsx` files (flat) |
| `@internal/*` | `src/internal/*` | Non-exported types, utilities, and components |
| `@signals/*` | `src/signals/*` | Preact signal stores |
| `@styles/*` | `src/styles/*` | All CSS — layout, tokens, component modules |
| `@hooks` | `src/hooks.ts` | Public hooks (useTimer, usePage) |
| `@utils` | `src/utils.ts` | Public utilities (cx, HeadingLevel) |

Aliases are defined in both `tsconfig.json` (paths) and `vite.config.ts` (resolve.alias).

## Allowed

- External packages (e.g., `'preact'`, `'preact/hooks'`)
- `@<directory>/...` aliases for all cross-directory imports

## Forbidden

- `'../'` traversal of any kind — always use aliases
- `'./'` relative imports — source is split across separate directories

## Adding New Directories

When adding a new `src/` subdirectory, add a corresponding alias to:
1. `tsconfig.json` — `compilerOptions.paths`
2. `vite.config.ts` — `resolve.alias`
