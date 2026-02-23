# Tool Preferences Principle

## Core Principle

**Prefer small, fast, modern tools with good track records over bloated "standard" options.**

## Decision Framework

When choosing any tool, ask:

1. Is there a modern alternative with momentum?
2. Is it significantly faster or simpler?
3. Does it have a good track record (not experimental)?
4. Does it solve the same problem with less overhead?

If yes to all → prefer the modern option.

## Examples (Illustrative, Not Exhaustive)

| Domain | Prefer | Over | Why |
|--------|--------|------|-----|
| JS Runtime | Bun | Node + npm | Faster, simpler, batteries included |
| JS Linting | Biome | ESLint + Prettier | Single tool, much faster |
| JS Bundling | Vite | Webpack | Simpler config, faster builds |
| Package Mgmt | pnpm/Bun | npm/yarn | Faster, better disk usage |

## When to Use "Standard" Tools

- Project already uses them (consistency wins)
- Modern alternative is experimental
- Specific feature only in standard tool
- Team/org mandate requires it

## Applying to Novel Situations

This principle applies to ALL tool choices:
- Frameworks
- Libraries
- Build tools
- Testing tools
- Dev tools

Don't just reach for what's "popular" - evaluate what's actually better for the job.

## Skills vs MCP Hierarchy

Prefer in this order:

1. **Built-in tools** (Read, Grep, Bash) - fastest, no overhead
2. **Skills** (on-demand prompts) - context-efficient, loaded when needed
3. **MCP** (external servers) - only when necessary

### When Skills Are Better

- Task is self-contained workflow
- Can be expressed in markdown instructions
- Doesn't need persistent external state
- Reusable within this codebase

### When MCP Is Appropriate

- External service integration (APIs, databases, cloud services)
- Stateful operations requiring persistent connections
- Tools that benefit from caching or connection pooling
- Capabilities shared across multiple projects/repos
- Operations that require authentication to external systems

### Decision Checklist

Before adding MCP:

- [ ] Can a skill accomplish this with existing tools?
- [ ] Is external state/connection actually required?
- [ ] Will this be used frequently enough to justify overhead?
- [ ] Is security properly considered (credentials, permissions)?
