# Contributing to @auldrant/ui

## Setup

1. Clone the repository
2. Open in DevContainer (recommended) or install [Bun](https://bun.sh/) locally
3. Run `bun install`

## Code Style

- **Formatter/Linter**: Biome (configured in `biome.json`)
- **Indentation**: 2 spaces
- **Quotes**: Single quotes (double for JSX)
- **Semicolons**: Always
- **Line endings**: LF

Run `bun run check` to verify, `bun run check:fix` to auto-fix.

## Component Guidelines

- Use semantic HTML elements before reaching for ARIA
- Use CSS modules (`.module.css`) for component styles
- Use CSS Grid for layout (no flexbox for page/component layout)
- Use `em` units for spacing and sizing
- Export all public components from `src/index.ts`
- Add a Storybook story for every component

## Pull Request Checklist

- [ ] `bun run check` passes (lint + format)
- [ ] `bun run typecheck` passes
- [ ] `bun run test` passes
- [ ] `bun run build` succeeds
- [ ] New components have Storybook stories
- [ ] Public APIs have JSDoc documentation
- [ ] CHANGELOG.md updated for user-facing changes

## Merge Strategy

- Squash merge to `main`
- PR title becomes the commit message
- Delete source branch after merge
