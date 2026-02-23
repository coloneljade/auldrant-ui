---
description: Finalize branch naming and safely push to remote. Use when ready to push code.
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

If the working tree is dirty, run `/pre-commit` then `/commit` first.

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

**Never use bare `--force`.** `--force-with-lease` prevents overwriting others' work.

### Existing Remote Branch (No Rewrite)

```bash
git push origin <type>/<description>
```

## Output

After pushing, report:

```
## Push Complete

### Branch
<type>/<description>

### Commits Pushed
[git log --oneline main..HEAD]

### Remote
origin/<type>/<description>
```
