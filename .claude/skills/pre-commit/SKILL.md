---
description: Pre-commit quality checks. Run before committing to catch issues early.
---

# Pre-Commit Checks

**Every commit must pass format, lint, type, and build checks locally before being created.**

These are the same checks CI runs — catch failures before push, not after.

## Mandatory Checks

| Check | Command | What It Catches |
|-------|---------|-----------------|
| Lint + Format | `bun run check` | Biome lint and format violations |
| Type Check | `bun run typecheck` | TypeScript strict mode errors |
| Tests | `bun run test` | Test regressions |
| Build | `bun run build` | Vite library build failures |

## Checks to Run

### 1. Lint and Format

```bash
bun run check
```

If this fails, run `bun run check:fix` to auto-fix, then re-verify.

### 2. Type Check

```bash
bun run typecheck
```

All code must pass TypeScript strict mode without errors.

### 3. Tests

```bash
bun run test
```

All tests must pass.

### 4. Build

```bash
bun run build
```

Vite library build must succeed without errors.

### 5. Security Scan

Quick security review of changed files:
- No hardcoded secrets
- No sensitive data in logs
- Input validation present

## Auto-Fix

If lint/format check fails, offer to fix:

```bash
bun run check:fix
```

Then re-run verification before committing.

## Scope

Check only staged/modified files for the security scan:
```bash
git diff --cached --name-only
git diff --name-only
```

## Output Format

```
## Pre-Commit Check Results

### Lint + Format: [PASS/FAIL]
[Output if failed]

### Type Check: [PASS/FAIL]
[Errors found]

### Tests: [PASS/FAIL]
[Failures found]

### Build: [PASS/FAIL]
[Output if failed]

### Security: [PASS/FAIL]
[Issues found]

### Overall: [READY TO COMMIT / ISSUES FOUND]

### Required Fixes
1. [Fix needed]

### Suggested Improvements (non-blocking)
- [Improvement]
```

## Quick Fixes

If issues found, offer to:
- Auto-format code (`bun run check:fix`)
- Fix simple type errors
- Stage additional files
