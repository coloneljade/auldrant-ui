# Agent Output Standards

## Core Principle

**Sub-agents must return concise, actionable output that doesn't pollute context.**

## BLUF Format

Bottom Line Up Front: verdict/summary first, supporting details second.

## Standard Reviewer Output

```markdown
## [Domain] Review

**Verdict**: [PASS/CONCERNS/FAIL]
**Confidence**: [HIGH/MEDIUM/LOW]

### Issues
- [severity] path:line - description

### Escalation
[Only if confidence is MEDIUM/LOW or issues are complex]

### Opportunities
[Brief, non-blocking improvements - optional]
```

## Output Guidelines

| Do | Don't |
|----|-------|
| Bullets over prose | Lengthy explanations |
| File refs as `path:line` | Vague location descriptions |
| Single verdict summary | Step-by-step reasoning |
| Actionable findings | Minor caveats and hedging |
| Structured headers | Freeform narrative |

## Severity Levels

- **CRITICAL**: Must fix before merge
- **HIGH**: Should fix, significant impact
- **MEDIUM**: Recommended fix, moderate impact
- **LOW**: Consider fixing, minor impact

## Examples

**Good:**
```markdown
## Security Review

**Verdict**: CONCERNS
**Confidence**: HIGH

### Issues
- [HIGH] src/auth/login.ts:45 - SQL concatenation, use parameterized query
- [MEDIUM] src/api/users.ts:23 - Missing rate limiting on endpoint
```

**Bad:**
```markdown
I've reviewed the security aspects of your code. First, I looked at the
authentication module and found some interesting patterns. Let me walk
you through my analysis step by step...
```
