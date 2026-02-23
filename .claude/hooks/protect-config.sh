#!/bin/bash
# Defense-in-depth protection for config files
# No external dependencies (grep/sed only)

INPUT=$(cat)
TOOL=$(printf '%s' "$INPUT" | grep -o '"tool_name":"[^"]*"' | sed 's/"tool_name":"//;s/"//' | head -1)

case "$TOOL" in
  Edit|Write)
    FILE_PATH=$(printf '%s' "$INPUT" | grep -o '"file_path":"[^"]*"' | sed 's/"file_path":"//;s/"//' | head -1)

    if [[ "$FILE_PATH" == *".claude/settings.json" ]] \
      || [[ "$FILE_PATH" == *".claude/audit.log" ]] \
      || [[ "$FILE_PATH" == *".claude/audit.log."* ]] \
      || [[ "$FILE_PATH" == *".claude/debug-trace.jsonl" ]] \
      || [[ "$FILE_PATH" == *".claude/debug-trace.jsonl."* ]]; then
      echo "Blocked: settings.json and log files are protected" >&2
      exit 2
    fi

    case "$FILE_PATH" in
      *"biome.json"|*"tsconfig.json"|*".editorconfig"|*"vite.config.ts")
        echo "Blocked: Core configuration files are protected. Discuss changes with user first." >&2
        exit 2
        ;;
    esac
    ;;

  Bash)
    COMMAND=$(printf '%s' "$INPUT" | grep -o '"command":"[^"]*"' | sed 's/"command":"//;s/"//' | head -1)

    if [[ "$COMMAND" == *".claude"* ]] && [[ "$COMMAND" =~ (rm|mv|cp|\>|\>\>|cat.*\|) ]]; then
      echo "Blocked: Cannot modify .claude directory via Bash" >&2
      exit 2
    fi
    ;;
esac

exit 0
