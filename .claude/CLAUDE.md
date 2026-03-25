# Auldrant UI

## Mission

Preact component library with strong accessibility, performance, and consistent design tokens.

## Quick Reference

**Reviewing code?** → `/code-review [domain]` or `/full-review`
**Need research first?** → `/research [topic]`
**Ready to finalize?** → `/stage`
**One-off commit?** → `/pre-commit` then `/commit`
**Rewriting history?** → `/rewrite`
**Ready to push?** → `/push`
**Creating a PR?** → `/pr`
**Presenting a decision?** → `/decision-brief`
**Updating config?** → `/config-update`

## Key Constraints

- **Bun only** — no npm/yarn/pnpm for package operations
- **Biome only** — no ESLint/Prettier
- **TypeScript only** — no `.js` or `.jsx` files in src
- **ESNext target** — no transpilation for older runtimes
- **CSS Grid only** — no flexbox for page/component layout
- **em units** — for spacing and sizing; `rem` only for WCAG touch target `min-width`/`min-height` (see `rules/code-quality.md`); never `px`
- **CSS modules** — for component-scoped styles
- **Semantic HTML first** — use native elements before ARIA
- **Minimal dependencies** — don't add packages until they're needed
- Never modify `.claude/` files unless user explicitly requests it

## File Conventions

### Source Structure

```
src/
  hooks.ts              # Public hooks (useTimer, usePage)
  utils.ts              # Public utilities (cx, HeadingLevel)
  styles.ts             # CSS entry point (tokens import)
  components/           # Flat — one .tsx per component, no subdirectories
    index.ts            # Component barrel (subpath export)
    Button.tsx
    Card.tsx
    ...
  internal/             # Non-exported components, types, and utilities
    types.ts            # IBaseProps, IFieldProps
    utils.ts            # flattenChildren, describeBy
    FormField.tsx
    DialogBase.tsx
    ...
  signals/              # Preact signal stores
    index.ts            # Signal barrel (subpath export)
    ...
  styles/               # All CSS — tokens and component modules
    shared.css          # Shared interactive element styles (composed)
    Button.module.css   # Component-scoped CSS modules
    ...
tests/
  *.test.tsx            # Component tests
  *.test.ts             # Signal/utility tests
```

### Required Files

- `package.json`, `tsconfig.json`, `vite.config.ts`
- `biome.json`, `.editorconfig`, `lefthook.yml`
- `.gitignore`, `.gitattributes`, `LICENSE`, `NOTICES`

## Search Exclusions

Never read/search: `node_modules/`, `dist/`, `bun.lock`

## Local Rules

| Topic | Rule File |
|-------|-----------|
| Component patterns, TypeScript style, code conventions | `rules/code-quality.md` |
| Import aliases and path resolution | `rules/imports.md` |
| New component checklist (required files, wiring, dev section) | `rules/component-checklist.md` |
