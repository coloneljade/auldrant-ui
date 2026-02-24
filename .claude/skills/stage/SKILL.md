---
description: Create clean commits from uncommitted changes after implementation. Use when finished implementing to batch-finalize all work into logical commits.
model: opus
---

# Stage Workflow

## Core Principle

**Implement freely, then create clean commits retroactively.** This is the default
finalization path after completing an implementation. All uncommitted changes are
analyzed, grouped into logical commits, and committed in one pass.

## When to Use

- Just finished implementing a plan — all changes are uncommitted (or have WIP checkpoints)
- Want to create multiple clean commits from a batch of changes
- Default finalization step before `/push`

## When NOT to Use

- **One-off atomic commit** outside a full implementation → use `/pre-commit` + `/commit`
- **Cleaning up already-committed history** → use `/rewrite`
- **Nothing to stage** → report "nothing to stage" and exit

## Prerequisites

- [ ] On a feature branch (not `main`, not detached HEAD)
- [ ] Changes exist (uncommitted changes or WIP checkpoint commits since merge-base)
- [ ] Implementation is complete and verified (builds, tests pass)

## Step 1 — Snapshot

Capture the complete final state for verification.

```bash
MERGE_BASE=$(git merge-base HEAD main)
git add -A && git commit -s -m "_stage-snapshot"
SNAPSHOT=$(git rev-parse HEAD)
git reset --soft $MERGE_BASE && git reset HEAD
```

After this:
- Working tree has ALL changes (nothing staged)
- HEAD is at merge-base
- `$SNAPSHOT` records the exact final tree for verification

If WIP checkpoint commits existed on the branch, their changes are now folded into the
working tree automatically by the soft reset.

## Step 2 — Analyze

Diff all changes from merge-base to understand the full scope.

```bash
git diff --stat
git diff --name-only
```

List every changed file with a summary of what changed. Identify logical groupings
with this ordering:

1. **Scaffolding/setup** — new project structure, build config, dependencies
2. **Core features** — primary implementation work
3. **Tests** — test additions or updates
4. **Config/CI** — CI/CD, devcontainer, tooling config
5. **Documentation** — CHANGELOG, README, docs

### Grouping Guidance

One coherent change that could be understood and reverted independently:

- A packaging or build fix (separate from feature work)
- Core scaffolding files for a new feature
- Configuration and tooling setup
- CI/CD and dev environment changes
- Test additions or updates
- Documentation updates

### Shared Files

Flag files that appear in multiple commit groups. These need intermediate states
(see Step 4 execution details).

## Step 3 — Propose

Present the staging plan and proceed to execution. The user can interrupt if
something looks wrong — don't gate on explicit approval. The user reviews commits
at `/push` and PR.

```
## Staging Plan

### Commit 1: type(scope): subject
Files: file1, file2, file3

### Commit 2: type(scope): subject
Files: file4, file5, file3 (shared — intermediate state)

[N commits total]
```

Show commit order, type/scope/subject, file lists, and flag any shared files.

### When to Pause for Approval

Stop and ask only when there is genuine uncertainty you cannot resolve yourself:

- Grouping has multiple reasonable splits and the "right" one depends on user intent
- Shared file intermediate states are ambiguous (unclear which changes belong to which concern)

If the grouping is obvious — even across many commits — just proceed.

## Step 4 — Execute

For each commit group, in order:

### Exclusive Files

Files that appear only in this commit — working tree already has the correct state:

```bash
git add <file1> <file2>
```

### Shared Files (Intermediate States)

Files that appear in this commit AND later commits need their intermediate state
written before staging:

1. Read the merge-base version: `git show $MERGE_BASE:<file>`
2. Understand which changes belong to THIS concern vs later concerns
3. Write the file with only this commit's changes applied to the base
4. `git add <file>`

After this commit, the working tree retains the file's final state (later commits
will stage the remaining changes).

### Binary Files

Assign each binary file to exactly one commit. Never split binary files.

### Commit

After staging files for the group:

```bash
git commit -s -m "type(scope): subject"
```

Use the message from the approved staging plan. No per-commit approval gates —
the plan approval in Step 3 covers grouping and messages. Ask questions if
something is unclear, but don't prompt for confirmation on each commit.

## Step 5 — Verify

After all commits are created, verify the final tree matches the snapshot:

```bash
git diff $SNAPSHOT --stat
```

### Pass (empty diff)

Final tree matches snapshot exactly. Stage is complete.

```bash
# Clean up snapshot tag if created
```

### Fail (non-empty diff)

Something went wrong. Rollback immediately:

```bash
git reset --hard $SNAPSHOT
```

Report what diverged and why. The working tree is restored to the verified final state
with a single `_stage-snapshot` commit that can be re-staged.

## Edge Cases

### Single Logical Change

If all changes are one concern, create one commit directly. Skip the full
analyze/propose ceremony — stage, commit with signoff, and verify. This is the
fast path for most `/stage` invocations.

### No Changes

Report "nothing to stage" and exit.

### WIP Checkpoints on Branch

Absorbed automatically during Step 1's soft reset. Their changes fold into the
working tree alongside any uncommitted work.

### Large Changeset

For 20+ files across many concerns, group aggressively — fewer well-scoped commits
are better than many granular ones. Aim for 3-7 commits.

## Output

After successful staging:

```
## Stage Complete

### Commits Created
1. abc1234 type(scope): subject (N files)
2. def5678 type(scope): subject (N files)
...

### Verification
Final tree matches snapshot: PASS

### Next
Run `/push` when ready.
```
