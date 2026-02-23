---
paths:
  - "tests/**"
---

# Test Writing

## Test Runner

This project uses `bun:test`. Import from `bun:test`:

```typescript
import { describe, expect, it } from 'bun:test';
```

## Naming Conventions

Use describe/it with natural language:

```typescript
describe('Button', () => {
  describe('when clicked', () => {
    it('calls the onClick handler', () => {
      // ...
    });
  });
});
```

## AAA Pattern

```typescript
it('returns null when user not found', () => {
  // Arrange
  const store = createUserStore();

  // Act
  const result = store.findById('nonexistent');

  // Assert
  expect(result).toBeNull();
});
```

## Test Guidelines

| Do | Don't |
|----|-------|
| One assertion focus per test | Multiple unrelated assertions |
| Test behavior, not implementation | Test private methods directly |
| Use descriptive names | Use test1, test2 naming |
| Keep tests fast and isolated | Depend on external services |
| Make tests deterministic | Use random values without seeds |

## Future: Component Testing

When components exist and need DOM testing, add:
- `@happy-dom/global-registrator` for DOM globals
- `@testing-library/preact` for accessible queries
- `bunfig.toml` with test preload config

These are intentionally deferred until components are built.

## Trusted Sources

| Resource | When to Use |
|----------|-------------|
| [Bun Test Runner](https://bun.sh/docs/cli/test) | Test API, matchers, lifecycle hooks |
| [Testing Library](https://testing-library.com/docs/) | Component testing queries and patterns (future) |
