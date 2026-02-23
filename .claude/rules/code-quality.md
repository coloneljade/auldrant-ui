# Code Quality Rules

## Non-Negotiable Settings

### tsconfig.json

These strict flags are enabled and must not be disabled:

| Setting | Purpose |
|---------|---------|
| `strict: true` | All strict type checks |
| `noUnusedLocals: true` | No dead code |
| `noUnusedParameters: true` | No unused params |
| `noFallthroughCasesInSwitch: true` | Explicit switch cases |
| `noUncheckedIndexedAccess: true` | Safe index access |
| `exactOptionalPropertyTypes: true` | Strict optional props |
| `verbatimModuleSyntax: true` | Explicit import/export types |

### biome.json

Biome lint and format rules are the source of truth. Do not:
- Suppress lint rules without strong justification
- Override formatter settings per-file
- Add inline `// biome-ignore` without explanation

## Minimal Dependencies

Only add a package when:
- The functionality is genuinely needed NOW (not "might need later")
- No reasonable way to implement it in < 50 lines
- The package is well-maintained and actively used

Before `bun add`, ask:
1. Can native APIs handle this?
2. Is there a lighter alternative?
3. Will this add significant bundle size?

## Code Style

Defined in `biome.json` and `.editorconfig`. Key conventions:
- 2-space indentation
- Single quotes (double for JSX)
- Trailing commas (ES5)
- Semicolons always
- LF line endings
- 100 char line width
