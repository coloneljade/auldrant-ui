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

## Public Contract Only

**Tests MUST verify public behavioral contracts, not implementation details.**

### What to Test

- Props produce the expected behavior (callbacks fire, content renders, attributes set)
- Semantic HTML contracts (label associations, form behavior, keyboard interaction)
- User-facing behavior (click handlers, form submission, input changes)

### What NOT to Test

- **Tag names** — don't assert `tagName === 'DIV'`; the wrapper element is an implementation detail
- **DOM structure** — don't assert child ordering, nesting depth, or element counts
- **CSS classes** — don't assert internal class names (CSS modules make these opaque anyway)
- **Internal state** — don't reach into component internals

### String Constants

Extract shared values to constants when the same string appears in both the render call
and the assertion. This prevents silent drift and makes intent explicit:

```typescript
// Good
const label = 'Submit';
const { getByText } = render(<Button label={label} />);
getByText(label); // getByText throws if not found — no expect wrapper needed

// Bad
render(<Button label="Submit" />);
expect(getByText('Submit')).toBeDefined(); // string duplicated, toBeDefined is tautological
```

### Assertion Hygiene

- `getByText` / `getByLabelText` throw if not found — calling them IS the assertion.
  Do NOT wrap in `expect(...).toBeDefined()` (tautological).
- `querySelector` returns `null` when not found. Use `not.toBeNull()` or `toBeTruthy()`,
  never `toBeDefined()` (null is defined).

## Component Testing

DOM testing infrastructure:
- `@happy-dom/global-registrator` for DOM globals
- `@testing-library/preact` for accessible queries
- `bunfig.toml` with test preload config

## Trusted Sources

| Resource | When to Use |
|----------|-------------|
| [Bun Test Runner](https://bun.sh/docs/cli/test) | Test API, matchers, lifecycle hooks |
| [Testing Library](https://testing-library.com/docs/) | Component testing queries and patterns (future) |
