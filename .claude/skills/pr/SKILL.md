---
description: Create or update a pull request with CHANGELOG entries and PR links. Use when ready to submit work for review.
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

  Install from: https://cli.github.com/
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

## Step 3 — Create PR (If New)

### PR Title

- **Single commit on branch**: use the commit subject verbatim
- **Multiple commits**: compose a `type(scope): summary` title, under 70 characters

### PR Body

Build the initial body from commit history (CHANGELOG comes next):

```bash
git log --format="- %s" main..HEAD
```

### Command

```bash
gh pr create --base main --title "<title>" --body "$(cat <<'EOF'
## Summary
[commit log summary]

## Test Plan
- [ ] Verified item
EOF
)"
```

Capture the PR number and URL from output.

## Step 4 — CHANGELOG Entry with PR Links

Determine which CHANGELOG state applies, then act accordingly.

### Detect Branch-Specific Entries

```bash
git diff main -- CHANGELOG.md | grep '^+- '
```

This finds list-item lines added by this branch (not already on main).

### Case A: Entries Exist Without PR Links

Lines found that do NOT contain `([#` — append the PR link to each within the `## [Unreleased]` section:

```
([#N](https://github.com/<owner>/<repo>/pull/N))
```

### Case B: Entries Exist With PR Links

All found lines already contain `([#` — skip to Step 6.

### Case C: No Entries

No branch-specific CHANGELOG lines found. Compose entries under `## [Unreleased]` with
the PR link baked in from the start:

1. Review the branch commits to determine user-facing changes
2. Draft entries under the appropriate categories (`### Added`, `### Changed`, etc.)
3. Include the PR link on each entry
4. **Present proposed entries to the user for approval before writing**

Only modify within the `## [Unreleased]` section. Do not touch released sections.

## Step 5 — Commit and Push CHANGELOG

If CHANGELOG was modified in Step 4:

### Pre-commit Exception

**Skip `/pre-commit` for this step.** Justification:
- Only CHANGELOG.md is modified (markdown, not code)
- `bun run check` and `bun run build` do not apply to markdown files
- This is a skill-internal housekeeping step with predictable, minimal changes

### Commit

**Use `/commit`** to stage, compose the message, and apply sign-off. This ensures any future
changes to commit conventions are automatically inherited.

### Push

```bash
git push
```

## Step 6 — Update PR Body from CHANGELOG

Extract the `[Unreleased]` section content and update the PR:

1. Read CHANGELOG.md
2. Extract everything between `## [Unreleased]` and the next `## [` heading
3. Update the PR body:

```bash
gh pr edit <number> --body "$(cat <<'EOF'
## Summary
[Extracted CHANGELOG content]

## Test Plan
- [ ] Verified item
EOF
)"
```

## Step 7 — Output

```
## PR Complete

### Pull Request
[PR URL] — [created | updated]

### CHANGELOG
[N entries created with PR links | N entries annotated with PR links | Already up to date]
```

## Error Handling

- **CHANGELOG commit/push fails**: report the error, note that the PR was already created successfully
- **`gh pr edit` fails**: report the error, note that the push and CHANGELOG succeeded
- **Any `gh` command fails unexpectedly**: report the full error output for debugging
