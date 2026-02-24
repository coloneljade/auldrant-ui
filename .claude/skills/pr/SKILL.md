---
description: Create or update a pull request with issue links. Use when ready to submit work for review.
---

# Pull Request Workflow

## Step 0 — GitHub CLI Prerequisite

Before anything else, verify `gh` is available and authenticated:

```bash
command -v gh
gh auth status
```

- **Not installed**: stop immediately.
  ```
  ## PR Failed — GitHub CLI Not Found

  The `/pr` skill requires the GitHub CLI (`gh`).
  The devcontainer includes it — rebuild the container if missing.
  Otherwise install from: https://cli.github.com/
  Then run: gh auth login
  ```
- **Not authenticated**: stop immediately.
  ```
  ## PR Failed — Not Authenticated

  Run `gh auth login` to authenticate with GitHub.
  ```

## Step 1 — Pre-PR Checks

```bash
git rev-parse --abbrev-ref --symbolic-full-name @{u}
git status
```

- [ ] Branch is pushed to remote (has upstream tracking)
- [ ] Working tree is clean

If either fails, tell the user to run `/push` first.

## Step 2 — Check for Existing PR

```bash
gh pr list --head <branch> --json number,url
```

- If a PR exists → note the number for `gh pr edit` later
- If no PR exists → will use `gh pr create`

## Step 3 — Check for Related Issues

```bash
gh issue list --state open --json number,title,labels
```

- If open issues exist, present them to the user and ask which (if any) this PR fixes
- If no open issues, skip this step

## Step 4 — Build PR

### PR Title

Derive the title from the branch name. The branch was already named deliberately
during `/push` as `type/description` — convert it to `type: description` (or
`type(scope): description` if scope is clear from context). Under 70 characters.

Do not independently recompose the type or summary — the branch name is the
single source of truth. If the branch name is wrong, fix it before creating the PR.

### PR Body

Build the body from commit history and issue links:

```bash
git log --format="- %s" main..HEAD
```

Structure:

```markdown
## Summary
[commit log summary as bullet points]

## Fixes
Fixes #N
Fixes #M

## Test Plan
- [ ] Verified item
```

The `## Fixes` section is only included when the user selected issues in Step 3.
Each issue gets its own `Fixes #N` line for GitHub auto-close. The keyword `Fixes`
must be on the same line as the issue reference.

### Create or Update

**New PR:**
```bash
gh pr create --base main --title "<title>" --body "$(cat <<'EOF'
...
EOF
)"
```

**Existing PR:**
```bash
gh pr edit <number> --title "<title>" --body "$(cat <<'EOF'
...
EOF
)"
```

## Step 5 — Output

```
## PR Complete

### Pull Request
[PR URL] — [created | updated]

### Issues
[N issues linked | No issues linked]
```

## CHANGELOG Note

CHANGELOG entries are handled automatically by the merge bot when `/merge` is
invoked on the PR. Do not manually create or modify CHANGELOG entries.

## Error Handling

- **`gh pr create` fails**: report the full error output for debugging
- **`gh pr edit` fails**: report the error with the existing PR URL
- **Any `gh` command fails unexpectedly**: report the full error output for debugging
