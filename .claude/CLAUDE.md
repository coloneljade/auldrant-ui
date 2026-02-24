# Auldrant UI

## Mission

Preact component library with strong accessibility, performance, and consistent design tokens.

## Philosophy

### Be Curious, Not Assumptive

- When requirements are unclear, ASK
- Understand goals before implementation
- Check in on approach, not just when stuck

### Code Quality

- Clean, direct, modern code
- Follow established patterns in the codebase
- If a pattern seems wrong, ask before "fixing"

### Research First

- Research best practices before implementing
- Check existing patterns in the codebase
- Look for improvement opportunities in touched files

### Troubleshooting

- Look at actual errors, not just symptoms
- Check for known issues upstream before debugging locally
- Break problems down systematically

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

## Available Agents

**Reviewers:** security, architecture, performance, accessibility
**Experts:** frontend, troubleshooter, security, architecture, performance
**Design:** design-advisor (Double Diamond facilitation)

## Key Constraints

- **Bun only** — no npm/yarn/pnpm for package operations
- **Biome only** — no ESLint/Prettier
- **TypeScript only** — no `.js` or `.jsx` files in src
- **ESNext target** — no transpilation for older runtimes
- **CSS Grid only** — no flexbox for page/component layout
- **em units** — for spacing and sizing (not px or rem)
- **CSS modules** — for component-scoped styles
- **Semantic HTML first** — use native elements before ARIA
- **Minimal dependencies** — don't add packages until they're needed
- Never modify `.claude/` files unless user explicitly requests it

## File Conventions

### Source Structure

```
src/
  index.ts              # Library entry point (exports)
  components/           # Component source files
  styles/
    colors.css          # Color custom properties
    layout.css          # Base layout reset
tests/
  *.test.ts             # Test files
```

### Required Files

- `package.json`, `tsconfig.json`, `vite.config.ts`
- `biome.json`, `.editorconfig`, `lefthook.yml`
- `.gitignore`, `.gitattributes`, `LICENSE`

## Search Exclusions

Never read/search: `node_modules/`, `dist/`, `bun.lock`, `storybook-static/`

See `rules/` for detailed guidelines.
