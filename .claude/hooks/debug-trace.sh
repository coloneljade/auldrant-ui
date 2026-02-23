#!/bin/bash
# Debug trace hook — logs ALL tool usage across ALL lifecycle events
# Fail-open: ALWAYS exits 0, never blocks Claude
# No external dependencies (grep/sed only)
#
# Usage: debug-trace.sh <event-type>
# Event types: PreToolUse, PostToolUse, PostToolUseFailure,
#              SessionStart, SessionEnd, SubagentStart, SubagentStop, Stop

# Opt-in: set CLAUDE_DEBUG=1 to enable trace logging
[ "${CLAUDE_DEBUG:-0}" != "1" ] && exit 0

LOG="$CLAUDE_PROJECT_DIR/.claude/debug-trace.jsonl"
MAX_SIZE=5242880 # 5MB
EVENT="${1:-unknown}"

# Rotate if over max size (keep one generation)
if [ -f "$LOG" ] && [ "$(stat -c%s "$LOG" 2>/dev/null || echo 0)" -gt "$MAX_SIZE" ]; then
  mv "$LOG" "$LOG.old" 2>/dev/null || true
fi

INPUT=$(cat)

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SESSION=$(printf '%s' "$INPUT" | grep -o '"session_id":"[^"]*"' | sed 's/"session_id":"//;s/"//' | head -1)

# Extract tool name (empty for non-tool events)
TOOL=$(printf '%s' "$INPUT" | grep -o '"tool_name":"[^"]*"' | sed 's/"tool_name":"//;s/"//' | head -1)

# Extract target based on tool type
TARGET=""
if [ -n "$TOOL" ]; then
  case "$TOOL" in
    Bash)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"command":"[^"]*"' | sed 's/"command":"//;s/"//' | head -1)
      TARGET="${TARGET:0:200}"
      ;;
    Edit|Write|Read)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"file_path":"[^"]*"' | sed 's/"file_path":"//;s/"//' | head -1)
      ;;
    Glob)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"pattern":"[^"]*"' | sed 's/"pattern":"//;s/"//' | head -1)
      ;;
    Grep)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"pattern":"[^"]*"' | sed 's/"pattern":"//;s/"//' | head -1)
      ;;
    WebFetch)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"url":"[^"]*"' | sed 's/"url":"//;s/"//' | head -1)
      ;;
    WebSearch)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"query":"[^"]*"' | sed 's/"query":"//;s/"//' | head -1)
      ;;
    Task)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"description":"[^"]*"' | sed 's/"description":"//;s/"//' | head -1)
      ;;
    Skill)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"skill":"[^"]*"' | sed 's/"skill":"//;s/"//' | head -1)
      ;;
    NotebookEdit)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"notebook_path":"[^"]*"' | sed 's/"notebook_path":"//;s/"//' | head -1)
      ;;
    TaskCreate)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"subject":"[^"]*"' | sed 's/"subject":"//;s/"//' | head -1)
      ;;
    TaskUpdate)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"taskId":"[^"]*"' | sed 's/"taskId":"//;s/"//' | head -1)
      ;;
  esac
else
  # Non-tool events: extract cwd for SessionStart
  case "$EVENT" in
    SessionStart)
      TARGET=$(printf '%s' "$INPUT" | grep -o '"cwd":"[^"]*"' | sed 's/"cwd":"//;s/"//' | head -1)
      ;;
  esac
fi

printf '{"ts":"%s","event":"%s","tool":"%s","target":"%s","sid":"%s"}\n' \
  "$TIMESTAMP" "$EVENT" "$TOOL" "$TARGET" "$SESSION" >> "$LOG" 2>/dev/null || true

exit 0
