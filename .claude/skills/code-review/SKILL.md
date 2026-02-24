---
description: Single-domain code review. Specify the domain to review (architecture, security, performance, accessibility).
---

# Code Review: $ARGUMENTS

Run a focused review using the appropriate specialist.

## Domain Selection

Based on arguments, select the appropriate reviewer:

| Argument | Reviewer | Expert (if escalated) |
|----------|----------|----------------------|
| architecture, arch, structure | architecture-reviewer | architecture-expert |
| security, sec | security-reviewer | security-expert |
| performance, perf | performance-reviewer | performance-expert |
| accessibility, a11y | accessibility-reviewer | (single tier) |
| frontend, ui | frontend-expert | (single tier) |

## Review Process

1. Run the appropriate reviewer
2. Check confidence level
3. If MEDIUM or LOW, escalate to expert
4. Compile findings

## Scope

If specific files mentioned, focus on those.
Otherwise, review recent changes (use `git diff`).

## Output Format

```
## Code Review: [Domain]

### Reviewer: [agent-name]
### Confidence: [HIGH/MEDIUM/LOW]
### Escalated: [Yes/No]

### Findings
[Prioritized findings from review]

### Recommendations
[Actionable recommendations]

### Opportunities
[Non-blocking improvements]
```
