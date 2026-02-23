---
paths:
  - "**/.devcontainer/**"
  - "**/devcontainer.json"
---

# Container Rules

## Dev Containers

This is a library — only DevContainer config applies (no production Dockerfiles).

### Required

- Use features from `ghcr.io/devcontainers/features/`
- zsh as default shell
- Extensions defined in devcontainer.json

### Forbidden

- Manual apt/apk install in Dockerfile
- bash as default shell
- Installing extensions via Dockerfile

### Lifecycle Hook Simplicity

Keep hooks simple:

```json
{
  "postCreateCommand": "bun install"
}
```

**Forbidden:**
- Multi-step bash chains in lifecycle commands
- Complex logic that should be in a script
- Commands that aren't idempotent

## Trusted Sources

| Resource | When to Use |
|----------|-------------|
| [devcontainer.json Reference](https://containers.dev/implementors/json_reference/) | Schema, properties, lifecycle hooks |
| [Dev Container Features](https://containers.dev/features) | Available features registry, version lookup |
