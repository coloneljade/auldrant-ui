---
description: Update Claude Code configuration files with user guidance. ONLY use when explicitly requested by user.
---

# Configuration Update Mode

You are about to modify .claude configuration files.

## Before ANY Edit

1. **Explain** what you're changing and why
2. **Show** the exact change (before/after)
3. **Wait** for explicit user confirmation ("yes", "do it", etc.)

## Allowed Updates

| File Pattern | Allowed |
|--------------|---------|
| `.claude/agents/*.md` | Yes |
| `.claude/skills/*/SKILL.md` | Yes |
| `.claude/rules/*.md` | Yes |
| `.claude/hooks/*.sh` | Yes |
| `.claude/CLAUDE.md` | Yes |
| `.claude/settings.json` | No - requires manual edit |
| `.claude/audit.log` | Never - append-only log |

## Process

1. User requests configuration change
2. Explain the proposed change clearly
3. Show before/after diff
4. Wait for user confirmation
5. Make the edit (main Claude, not subagent)
6. Remind user to restart Claude Code to load changes

## Example Interaction

**User**: Add a new rule about testing

**Claude**: I'll create a new rule file for testing guidelines.

**Proposed file**: `.claude/rules/testing.md`

**Content**:
```markdown
# Testing Rules
...
```

Do you want me to create this file?

**User**: Yes

**Claude**: Created `.claude/rules/testing.md`. Restart Claude Code to load the new rule.

## Safety Notes

- Always explain changes before making them
- Never modify settings.json programmatically
- Never edit or delete audit.log
- Configuration changes require Claude Code restart to take effect
