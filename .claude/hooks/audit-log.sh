#!/bin/bash
# Audit logging for all modifications (PreToolUse - fail-closed)
# Blocks tool execution if audit logging fails (exit 2)
# No external dependencies (grep/sed only)

LOG="$CLAUDE_PROJECT_DIR/.claude/audit.log"
MAX_SIZE=1048576 # 1MB

# Rotate if over max size (keep one generation)
if [ -f "$LOG" ] && [ "$(stat -c%s "$LOG" 2>/dev/null)" -gt "$MAX_SIZE" ]; then
  mv "$LOG" "$LOG.old" 2>/dev/null || {
    echo "Audit log rotation failed" >&2
    exit 2
  }
fi

INPUT=$(cat)

# Extract fields without jq — works in any bash environment
TOOL=$(printf '%s' "$INPUT" | grep -o '"tool_name":"[^"]*"' | sed 's/"tool_name":"//;s/"//' | head -1)

case "$TOOL" in
  Bash|Write|Edit|NotebookEdit|Skill)
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    SESSION=$(printf '%s' "$INPUT" | grep -o '"session_id":"[^"]*"' | sed 's/"session_id":"//;s/"//' | head -1)

    # Extract useful context per tool type
    case "$TOOL" in
      Bash)
        TARGET=$(printf '%s' "$INPUT" | grep -o '"command":"[^"]*"' | sed 's/"command":"//;s/"//' | head -1)
        ;;
      Write|Edit)
        TARGET=$(printf '%s' "$INPUT" | grep -o '"file_path":"[^"]*"' | sed 's/"file_path":"//;s/"//' | head -1)
        ;;
      Skill)
        TARGET=$(printf '%s' "$INPUT" | grep -o '"skill":"[^"]*"' | sed 's/"skill":"//;s/"//' | head -1)
        ;;
      NotebookEdit)
        TARGET=$(printf '%s' "$INPUT" | grep -o '"notebook_path":"[^"]*"' | sed 's/"notebook_path":"//;s/"//' | head -1)
        ;;
      *)
        TARGET=""
        ;;
    esac

    printf '{"timestamp":"%s","tool":"%s","target":"%s","session":"%s"}\n' \
      "$TIMESTAMP" "$TOOL" "$TARGET" "$SESSION" >> "$LOG" || {
      echo "Audit logging failed - blocking tool execution" >&2
      exit 2
    }
    ;;
esac

exit 0
