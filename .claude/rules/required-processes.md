# Required Processes

## Planning (Double Diamond)

Non-trivial changes — new features, enhancements, complex code changes, or anything
that benefits from design review — MUST use Double Diamond via `/research [topic]`.

**DD summary:** Discover broadly → Define the core problem → Develop options → Deliver best fit.

**When DD is NOT required:** Typo fixes, single-line changes, trivial renames, or tasks
where the user has given very specific detailed instructions.

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
| Starting implementation | (see `implementation-workflow.md`) | Scratch branch + implement/verify/stage |
| Staging commits | `/stage` (or `/pre-commit` + `/commit` for one-offs) | Clean commits from implementation work |
| Pushing code | `/push` | Safe push + branch naming |
| Creating a pull request | `/pr` | Ensures PR links and review readiness |
| Non-trivial planning | `/research [topic]` | Ensures DD process and source quality |
| Code review | `/code-review` or `/full-review` | Ensures multi-domain analysis |
| Rewriting history | `/rewrite` | Safety backup, sign-off preservation, tree verification |
| Updating config | `/config-update` | User confirmation + restart reminder |

**Do NOT** create commits during implementation — use `/stage` at finalization (or `/pre-commit` + `/commit` for one-off standalone fixes).
**Do NOT** run `git push` without using `/push`.
**Do NOT** create PRs manually — use `/pr` to ensure PR links.
**Do NOT** start implementing non-trivial changes without `/research`.
**Do NOT** rewrite history manually — use `/rewrite` for safety and sign-off preservation.

## Deferred Work

When a design enhancement, improvement, or non-blocking issue is identified but is out
of scope for the current task:

1. **Create a GitHub issue** with `gh issue create` — include summary, proposal, and context
2. **Label it** appropriately (`enhancement`, `bug`, `design`, etc.)
3. **Reference the issue** in your response so the user has the link
4. **Do NOT** silently defer — always surface what was deferred and why

This ensures good ideas aren't lost and the backlog stays visible.

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

## Reviewer Escalation

Front-line reviewers (Haiku) self-assess confidence:
- **HIGH**: Proceed with findings
- **MEDIUM/LOW**: Recommend expert review

Experts (Sonnet) handle complex patterns, nuanced decisions, multi-domain interactions.
