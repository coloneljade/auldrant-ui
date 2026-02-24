# Import Aliases

## Rule

Always use `@<directory>` aliases for cross-directory imports. No `../` relative paths.

## Configured Aliases

| Alias | Resolves To |
|-------|-------------|
| `@components/*` | `src/components/*` |
| `@styles/*` | `src/styles/*` |

Aliases are defined in both `tsconfig.json` (paths) and `vite.config.ts` (resolve.alias).

## Allowed

- `'./'` for same-directory siblings (e.g., `'./Button.module.css'` from `Button.tsx`)
- External packages (e.g., `'preact'`, `'preact/hooks'`)
- `@<directory>/...` aliases for cross-directory imports

## Forbidden

- `'../styles/...'` or any `../` traversal — use `@styles/...` instead
- `'../../components/...'` — use `@components/...` instead

## Adding New Directories

When adding a new `src/` subdirectory, add a corresponding alias to:
1. `tsconfig.json` — `compilerOptions.paths`
2. `vite.config.ts` — `resolve.alias`
