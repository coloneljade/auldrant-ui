---
description: Create or update a pull request with issue links. Use when ready to submit work for review. Optionally merges, waits, and cleans up when user says "and merge", "ship it", or "land it".
---

# Pull Request Workflow

## Merge Mode Detection

Merge mode activates when the user's message includes any of:

- **"and merge"** / **"then merge"**
- **"ship it"** / **"land it"**
- **"merge it"** / **"merge this"**

When merge mode is detected, run Steps 0–5 as normal, then continue to Steps 6–10.
When merge mode is NOT detected, stop after Step 5 (default behavior).

### Merge Flags

Merge flags (`--minor`, `--patch`, `--no-bump`) can appear anywhere in the user's
message. Extract them and pass through to the `/merge` comment in Step 7.

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

## Step 1 — Resolve Feature Branch

`/push` returns to `main` after pushing, so `/pr` may be called from either `main`
or the feature branch. Resolve the target branch:

```bash
CURRENT=$(git rev-parse --abbrev-ref HEAD)
```

**If on a feature branch** (not `main`): use it directly.

**If on `main`**: find the most recently pushed feature branch:

```bash
git for-each-ref --sort=-committerdate refs/heads/ \
  --format='%(refname:short)' | grep -v '^main$' | head -1
```

Verify the resolved branch has a remote tracking ref:

```bash
git rev-parse --abbrev-ref --symbolic-full-name <branch>@{u}
```

If no suitable branch is found or it has no upstream, tell the user to run `/push` first.

Store the resolved branch name as `$BRANCH` for all subsequent steps.

## Step 2 — Pre-PR Checks

```bash
git status
```

- [ ] Working tree is clean
- [ ] `$BRANCH` has upstream tracking (verified in Step 1)

## Step 3 — Check for Existing PR

```bash
gh pr list --head $BRANCH --json number,url
```

- If a PR exists → note the number for `gh pr edit` later
- If no PR exists → will use `gh pr create`

## Step 4 — Check for Related Issues

```bash
gh issue list --state open --json number,title,labels
```

- If open issues exist, present them to the user and ask which (if any) this PR fixes
- If no open issues, skip this step

## Step 5 — Build PR

### PR Title

Derive the title from `$BRANCH`. The branch was already named deliberately
during `/push` as `type/description` — convert it to `type: description` (or
`type(scope): description` if scope is clear from context). Under 70 characters.

Do not independently recompose the type or summary — the branch name is the
single source of truth. If the branch name is wrong, fix it before creating the PR.

### PR Body

Build the body from commit history and issue links:

```bash
git log --format="- %s" main..$BRANCH
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

The `## Fixes` section is only included when the user selected issues in Step 4.
Each issue gets its own `Fixes #N` line for GitHub auto-close. The keyword `Fixes`
must be on the same line as the issue reference.

### Create or Update

**New PR:**
```bash
gh pr create --head $BRANCH --base main --title "<title>" --body "$(cat <<'EOF'
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

## Step 6 — Output

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

---

## Step 7 — Wait for CI (Merge Mode Only)

Wait for CI checks to complete before posting the merge comment:

```bash
gh pr checks <number> --watch --fail-fast
```

- **All checks pass**: continue to Step 8
- **Any check fails**: report the failure and stop — do not post `/merge`
- If `gh pr checks --watch` is not available or errors, fall back to polling:
  ```bash
  gh pr checks <number> --json name,state,conclusion
  ```
  Wait 30 seconds before the first poll (code scanning takes time to start), then
  poll every 10 seconds until all checks reach a terminal state.

## Step 8 — Post Merge Comment (Merge Mode Only)

Post the `/merge` command as a PR comment to trigger the merge bot:

```bash
gh pr comment <number> --body "/merge [flags]"
```

- `<number>` is the PR number from Step 5
- `[flags]` are any merge flags extracted from the user's message (omit if none)
- Examples: `/merge`, `/merge --minor`, `/merge --patch`, `/merge --no-bump`

## Step 9 — Wait for Merge (Merge Mode Only)

Poll the PR state until it merges or fails:

```bash
gh pr view <number> --json state,mergedAt
```

- Poll every 20 seconds
- **Merged**: `state` is `"MERGED"` — continue to Step 10
- **Timeout**: if not merged after 5 minutes, report the failure and stop
- **Closed without merge**: if `state` is `"CLOSED"` and `mergedAt` is empty, the
  merge bot rejected it — report the failure, suggest checking the PR for bot comments

While waiting, give the user a brief status update after the first poll so they know
you're watching.

## Step 10 — Local Cleanup (Merge Mode Only)

After successful merge, clean up local state. Since `/push` already returned to
`main`, we just need to fast-forward and delete the feature branch:

```bash
# Fast-forward main to include the merge
git pull --ff-only origin main

# Delete the local feature branch
git branch -d "$BRANCH"
```

If `git pull --ff-only` fails (local main has diverged), report the issue and
suggest the user resolve it manually. Do not force-reset main.

If not currently on `main` (edge case — `/pr` was called from the feature branch),
check out `main` first before the fast-forward.

## Step 11 — Merge Mode Output

Replace the Step 6 output with:

```
## PR Merged

### Pull Request
[PR URL] — merged

### Issues
[N issues linked and closed | No issues linked]

### Local
Branch `<type>/<description>` deleted
Now on `main` at [short SHA]
```

## Error Handling

- **`gh pr create` fails**: report the full error output for debugging
- **`gh pr edit` fails**: report the error with the existing PR URL
- **CI checks fail**: report which check(s) failed with URLs — do not post `/merge`
- **`gh pr comment` fails**: report the error — user can manually comment `/merge`
- **Merge timeout**: report that the bot hasn't merged within 5 minutes, link to the PR
  so the user can check bot status/comments
- **Merge rejected**: report the bot's likely reason (CI failure, conflicts) and link to PR
- **Any `gh` command fails unexpectedly**: report the full error output for debugging
