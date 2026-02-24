# Implementation Workflow

## Core Principle

**Branch early, implement freely, stage cleanly, push when done.**

Every implementation follows: scratch branch → implement → verify → stage → push.

## Scratch Branch

Before implementing any plan, create a scratch branch:

```bash
git fetch origin main
git checkout main
git merge --ff-only origin/main
git checkout -b claude/<short-description>
```

- **Always branch from fresh `main`** — fetch + fast-forward before branching to avoid stale local state
- Use `claude/` prefix — this is a working branch, renamed before push
- One scratch branch per task/plan

## Implementation Phase

Work without committing — focus on getting the complete solution working.

- Run build/format checks as desired for your own feedback (not mandatory per-step)
- Keep focus on correctness and completeness
- One-off commits via `/pre-commit` + `/commit` are still available for standalone fixes
  unrelated to the current implementation

### Task–Verify Gate

**Do NOT mark a task as completed (TaskUpdate status=completed) unless changes are
verified** — the implementation builds, tests pass, and changes are present in the
working tree. Task completion means "verified working," not "files created."

## Session Boundaries

When implementation spans multiple sessions, use WIP checkpoints:

```bash
git add -A && git commit -s -m "wip: checkpoint"
```

- Not quality-gated — raw safety checkpoint only
- `/stage` absorbs these automatically during its reset step
- Resume work in the next session by continuing on the same branch

## Staging Phase

When implementation is complete and verified, run `/stage` to create all commits
in one pass from uncommitted changes.

`/stage` analyzes the full diff, proposes logical commit groups, and creates clean
commits with proper messages and signoff — no incremental commit noise to clean up.

## Finalization Sequence

The full sequence from implementation to PR:

1. `/stage` — create clean commits from uncommitted changes
2. `/push` — rename branch and push to remote
3. `/pr` — create pull request

These are separate steps — you can `/push` multiple times during development
without creating a PR. Use `/pr` when ready to submit for review.

**Note:** `/rewrite` is still available if you committed incrementally and need
to clean up already-committed history. `/stage` and `/rewrite` serve different
scenarios — `/stage` works from uncommitted changes, `/rewrite` works from
existing commits.

## CHANGELOG and Versioning

CHANGELOG entries and version bumps are handled automatically by the merge bot when
`/merge` is invoked on the PR. **Do NOT** manually edit CHANGELOG versions or bump
the version in `package.json` — the bot owns this entirely.
