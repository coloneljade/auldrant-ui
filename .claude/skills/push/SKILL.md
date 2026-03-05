---
description: Finalize branch naming and safely push to remote. Use when ready to push code.
model: haiku
---

# Push Workflow

## Pre-Push Checks

Before pushing, verify:

```bash
git status
git log --oneline main..HEAD
```

- [ ] Working tree is clean (no uncommitted changes)
- [ ] All commits build successfully
- [ ] Branch name starts with `claude/` (ready for rename)

If the working tree is dirty, run `/stage` first (or `/pre-commit` + `/commit` for a one-off).

## Review Commits

Present the branch log and proposed branch rename, then proceed with the
rename and push. The user can interrupt to adjust if needed — don't gate
on explicit approval.

## Branch Rename

Rename from scratch branch to conventional name:

```bash
git branch -m claude/<description> <type>/<description>
```

### Type Prefixes

| Prefix | When |
|--------|------|
| `feature/` | New functionality |
| `fix/` | Bug fix |
| `refactor/` | Code restructuring |
| `docs/` | Documentation only |
| `chore/` | Maintenance, config |

Choose based on the **primary purpose** of the branch. If commits span multiple types, use the dominant one.

## Safe Push

### New Branch (No Remote Tracking)

```bash
git push -u origin <type>/<description>
```

### Existing Remote Branch (History Rewritten)

Only when history was rewritten (rebase, amend):

```bash
git push --force-with-lease origin <type>/<description>
```

**Pause for explicit approval before executing.** This overwrites remote history —
higher stakes than local commits. Present what will be force-pushed and wait for
the user to confirm.

**Never use bare `--force`.** `--force-with-lease` prevents overwriting others' work.

### Existing Remote Branch (No Rewrite)

```bash
git push origin <type>/<description>
```

## Return to Main

After a successful push, switch back to `main` so the working tree is ready for
the next task. The feature branch remains available locally if needed.

```bash
FEATURE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
git checkout main
git pull --ff-only origin main
```

If `git pull --ff-only` fails (local main has diverged from remote), report the
issue but don't force-reset — let the user resolve it.

The feature branch is NOT deleted here — it stays around for `/pr`, amendments,
or review follow-ups. Cleanup happens in `/pr` merge mode after the PR merges.

## Output

After pushing, report:

```
## Push Complete

### Branch
<type>/<description> (pushed) → returned to main

### Commits Pushed
[git log --oneline main..<feature-branch>]

### Remote
origin/<type>/<description>
```
