# Required Processes

## Quality Gates

Before committing, ALL of these must pass:

| Command | What It Checks |
|---------|----------------|
| `bun run check` | Biome lint + format |
| `bun run typecheck` | TypeScript strict mode |
| `bun run test` | bun:test suite |
| `bun run build` | Vite library build |

The pre-commit hook (lefthook) runs `check` and `typecheck` automatically.

## Mandatory Skills

These skills are MANDATORY for their workflows. Do NOT perform these actions manually.

| Action | Required Skill | Why |
|--------|---------------|-----|
| Starting implementation | (see `implementation-workflow.md`) | Scratch branch + commit cadence |
| Committing code | `/pre-commit` then `/commit` | Ensures format/build checks and atomic commits |
| Pushing code | `/push` | Safe push + branch naming |
| Creating a pull request | `/pr` | Ensures PR links and review readiness |
| Non-trivial planning | `/research [topic]` | Ensures DD process and source quality |

**Do NOT** run `git commit` without first completing `/pre-commit`.
**Do NOT** create commits directly — use `/commit` to review, stage, and commit changes.
**Do NOT** run `git push` without using `/push`.
**Do NOT** create PRs manually — use `/pr` to ensure CHANGELOG entries and PR links.
**Do NOT** start implementing non-trivial changes without `/research`.

## Planning (Double Diamond)

Non-trivial changes — new features, enhancements, complex code changes, or anything
that benefits from design review — MUST use Double Diamond via `/research [topic]`.

**DD summary:** Discover broadly → Define the core problem → Develop options → Deliver best fit.

**When DD is NOT required:** Typo fixes, single-line changes, trivial renames, or tasks
where the user has given very specific detailed instructions.

## Escalation

### Escalate to User When

- Genuine tradeoffs exist (no clear "right" answer)
- Requirements are ambiguous
- Change impacts multiple concerns
- Breaking changes required

### Handle Autonomously When

- Clear best practice exists
- Pattern already established in codebase
- Single correct approach
