# Binary Tools Principle

## Core Principle

**Use CLI tools designed for the job over raw file edits.**

## Why

Tools handle what raw edits miss:
- Lock file updates
- Dependency resolution
- Validation
- Side effects
- Edge cases

## Examples (Illustrative, Not Exhaustive)

| Task | Use This | Not This |
|------|----------|----------|
| Add npm package | `bun add package` | Edit package.json |
| Add dev dependency | `bun add --dev package` | Edit package.json |
| Remove package | `bun remove package` | Edit package.json |
| Git operations | `git` commands | Edit .git files |
| Run biome | `bunx biome check` | Manual lint fixes |

## Applying the Principle

When encountering ANY config file:
1. Is there a CLI tool for this?
2. Does the tool handle lock files?
3. Will raw edit miss side effects?

If yes to any → use the tool.

## Exceptions

Raw edits are acceptable when:
- No tool exists for the operation
- Tool is broken/unavailable
- User explicitly requests raw edit
- Making a change tool doesn't support
