# Binary Tools Principle

## Core Principle

**Never do manually what a CLI tool can do more reliably.**

This applies to both **creating** content and **fixing** content. If a tool can detect
and auto-fix an issue, run the tool — do not hand-edit the fix.

## Why

Tools handle what raw edits miss:
- Lock file updates
- Dependency resolution
- Validation
- Side effects
- Edge cases
- Bulk fixes across multiple files in one pass

## Examples (Illustrative, Not Exhaustive)

| Task | Use This | Not This |
|------|----------|----------|
| Add npm package | `bun add package` | Edit package.json |
| Add dev dependency | `bun add --dev package` | Edit package.json |
| Remove package | `bun remove package` | Edit package.json |
| Git operations | `git` commands | Edit .git files |
| Fix lint/format errors | `bun run check --fix` | Hand-edit each violation |

## Applying the Principle

When encountering ANY task:
1. Is there a CLI tool that handles this?
2. Does the tool have a `--fix` or auto-correct mode?
3. Will hand-editing miss cases or introduce new errors?

If yes to any → use the tool.

**Lint and format violations are the canonical case.** When `bun run check` reports
errors, run `bun run check --fix` — do not manually edit files to match what the
formatter wants. The tool is faster, handles all files at once, and can't introduce
new formatting errors the way a hand-edit can.

## Exceptions

Raw edits are acceptable when:
- No tool exists for the operation
- Tool is broken/unavailable
- User explicitly requests raw edit
- Making a change tool doesn't support
