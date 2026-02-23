#!/bin/bash
# Status line: model, git branch, context usage
# No external dependencies (grep/sed only)

INPUT=$(cat)

# Extract fields without jq — works in any bash environment
MODEL=$(printf '%s' "$INPUT" | grep -o '"display_name":"[^"]*"' | sed 's/"display_name":"//;s/"//' | head -1)
CTX=$(printf '%s' "$INPUT" | grep -o '"used_percentage":[0-9.]*' | sed 's/.*://;s/\..*//' | head -1)

MODEL=${MODEL:-?}
CTX=${CTX:-0}

if BRANCH=$(git branch --show-current 2>/dev/null); then
  echo "[$MODEL] $BRANCH | ctx:${CTX}%"
else
  echo "[$MODEL] | ctx:${CTX}%"
fi
