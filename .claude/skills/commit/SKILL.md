---
description: Create well-structured git commits with clear, conventional messages. Use after completing a logical unit of work.
---

# Commit Workflow

## Atomic Commit Principles

**Each commit is one logical change that builds successfully and is understandable on its own.**

### Checklist

- [ ] Single logical change (not multiple unrelated changes)
- [ ] Builds successfully
- [ ] Pre-commit checks pass (`/pre-commit`)
- [ ] Tests pass (or tests updated appropriately)
- [ ] Amend/fixup analysis performed (Step 1b)
- [ ] Commit message explains the "why"
- [ ] Commit uses `--signoff` (`-s`)

### Bundling Judgment

**Bundle together:**
- Typo fix in file you're already editing
- Related cleanup directly connected to your change
- Test updates for the code you changed

**Separate commits:**
- Unrelated refactoring ("while I'm here...")
- Fixes for pre-existing issues you noticed
- Changes to different features/components

## 1. Review Changes

```bash
git status
git diff
git diff --cached
```

Understand what changed before committing.

## 1b. Amend & Fixup Analysis

After reviewing staged changes, determine whether they fix an existing commit on the branch.

### Gather Context

```bash
MERGE_BASE=$(git merge-base HEAD main)
git log --oneline --reverse $MERGE_BASE..HEAD   # all branch commits
git log -1 --format="%H %s" HEAD                # previous commit detail
git diff-tree --no-commit-id --name-only -r HEAD # previous commit files
```

### Decision Tree (Priority Order)

**1. Amend previous commit** — when staged changes fix the immediately previous commit:
- Previous commit is not a merge
- Staged changes overlap with previous commit's files or same scope
- Changes are a minor fixup (build fix, lint fix, forgotten file, small correction)

**2. Fixup an earlier branch commit** — when staged changes fix a specific earlier (non-adjacent) commit:
- Identify the target commit by file overlap and logical relationship
- Use `git commit --fixup=<target-hash> -s` to create a `fixup!` commit
- `/rewrite` will later absorb these automatically into their targets

**3. New standalone commit** — when changes are a different concern, substantial enough for their own commit, or the user overrides

### Output — Always Present as a Choice

```
## Commit Analysis

Staged changes appear to fix commit `abc1234`:
  `feat(portal): add web server scaffolding`

**Reason**: Fixes build error in same files

→ **Option A**: Amend (immediate previous only)
  `git add [files] && git commit --amend -s --no-edit`

→ **Option B**: Fixup commit (targets earlier commit)
  `git add [files] && git commit --fixup=abc1234 -s`

→ **Option C**: New standalone commit
  `git add [files] && git commit -s -m "fix(portal): ..."`
```

Only show relevant options (A only appears for previous-commit fixes, B only for earlier commits).
Never auto-execute — always present options and wait for user choice.

## 2. Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | When to Use |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation only |
| style | Formatting, no code change |
| refactor | Code change, no feature/fix |
| test | Adding/fixing tests |
| chore | Maintenance tasks |

### Scope

Component or area affected (e.g., `button`, `tokens`, `build`, `storybook`).

### Subject

- Imperative mood ("add" not "added")
- No period at end
- Under 50 characters

### Body

- Explain WHY, not what (the diff shows what)
- Wrap at 72 characters
- Can be multiple paragraphs

## 3. Sign-Off Requirement

**All commits MUST use `--signoff` (`-s`).** This adds a `Signed-off-by` trailer certifying
the contributor agrees to the project's terms (DCO).

```bash
git commit -s -m "feat(button): add primary variant"
```

Never omit `-s`. The checklist enforces this.

## 4. Examples

**Good:**
```
feat(button): add primary and secondary variants

Implements the two core button variants using design tokens
for consistent theming. Uses CSS modules for scoped styles.

Closes #12
```

**Bad:**
```
updated button stuff
```

```
fix bug
```

```
WIP
```

## 5. Before Committing

Run `/pre-commit` first. Do not create a commit until pre-commit checks pass.

## Output

After reviewing changes, suggest:

```
## Suggested Commit

### Message
[Formatted commit message]

### Files to Stage
[List of files]

### Command
git add [files] && git commit -s -m "..."
```
