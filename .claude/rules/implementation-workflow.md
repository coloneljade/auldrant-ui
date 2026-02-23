# Implementation Workflow

## Core Principle

**Branch early, commit often, push when done.**

Every implementation follows: scratch branch → incremental commits → finalize and push.

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

## Commit Cadence

**After each logical step**, run `/pre-commit` then `/commit`. Do not batch everything at the end.

### Task–Commit Gate

**Do NOT mark a task as completed (TaskUpdate status=completed) unless all changes
for that task have been committed via `/pre-commit` then `/commit`.** This is the
enforcement mechanism — treat task completion as proof of commit, not proof of file creation.

### What's a "Logical Step"?

One coherent change that could be understood and reverted independently:

- A packaging or build fix (separate from feature work)
- Core scaffolding files for a new feature
- Configuration and tooling setup
- CI/CD and dev environment changes
- Test additions or updates
- Documentation updates (CHANGELOG, README)

### Signals You Should Commit

- You just finished a distinct piece of work
- The next thing you'll do is a different concern
- You've touched 5+ files on the same concern — commit before moving on
- You're about to change direction or approach

### Signals You Should NOT Commit Yet

- Current change doesn't build
- You're mid-way through a single concern
- Splitting here would leave broken or confusing state

## History Cleanup

Before pushing, assess whether branch history needs cleanup.

### When to Rewrite

- Branch has `fixup!` commits (created by `/commit` fixup detection)
- WIP commits that should be folded into complete units
- Wrong commit ordering (setup after features, tests before code)
- Implicit fixups (build fixes, forgotten files) as separate commits

### When NOT to Rewrite

- History is already clean (each commit is one logical change)
- Single commit on the branch
- Branch is shared with other contributors (coordinate first)

### Finalization Sequence

The full sequence from implementation to PR:

1. `/rewrite` (optional) — clean up history if needed
2. `/push` — rename branch and push to remote
3. `/pr` — create pull request

These are separate steps — you can `/push` multiple times during development
without creating a PR. Use `/pr` when ready to submit for review.

## CHANGELOG

Follow [Keep a Changelog](https://keepachangelog.com/) format.

### When to Update

**User-facing changes require a CHANGELOG entry:**
- New features or capabilities
- Bug fixes users might encounter
- Behavior changes
- Removed features
- Security fixes

**Skip CHANGELOG for:**
- Internal refactoring (no behavior change)
- Test-only changes
- Documentation-only changes (unless user-facing docs)
- Build/CI configuration changes

### Placement

- **Multi-commit work**: CHANGELOG goes in a final `docs` commit
- **Single-commit work**: bundle CHANGELOG in with the change

### Format

```markdown
## [Unreleased]

### Added
- Feature description ([#123](url))

### Changed
- Existing behavior that changed

### Fixed
- Bug that was fixed

### Removed
- Feature or capability removed

### Security
- Security-related changes
```

### Entry Guidelines

- One line per change
- Concise but complete
- Link to PR/issue when available
- Use imperative mood ("Add" not "Added")
- Group related changes under one entry

## Finalization

When all commits are done, use `/push` to rename the branch and push.
