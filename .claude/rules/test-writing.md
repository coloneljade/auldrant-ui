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

## AAA Comments (Required)

Every test body MUST have `// Arrange`, `// Act`, and `// Assert` section comments.

When phases merge, use combined labels:
- `// Act & Assert` — when a single call both performs the action and verifies the result
- `// Arrange & Act` — when setup and action are inseparable

When Arrange uses only parent-scope constants (defined in the enclosing `describe`),
omit it and start with `// Act`.

```typescript
it('returns null when user not found', () => {
  // Arrange
  const store = createUserStore();

  // Act
  const result = store.findById('nonexistent');

  // Assert
  expect(result).toBeNull();
});

it('renders as an accessible button', () => {
  // Act
  const { getByRole } = render(<Button label={label} />);

  // Assert
  getByRole('button', { name: label });
});

it('has no automated a11y violations', async () => {
  // Act & Assert
  await renderAndCheckA11y(<Button label={label} />);
});
```

## WCAG SC References (A11y Tests)

A11y tests group assertions under `describe('WCAG A')` / `describe('WCAG AA')` blocks.
Each block gets a comment linking to the WCAG level overview. Test names include the
SC number in parentheses:

```tsx
// https://www.w3.org/TR/WCAG22/#perceivable
describe('WCAG A', () => {
  it('is an accessible textbox with programmatic label (SC 4.1.2)', () => { ... });
  it('exposes the disabled state (SC 4.1.2)', () => { ... });
});

// https://www.w3.org/TR/WCAG22/#adaptable
describe('WCAG AA', () => {
  it('derives autocomplete from input type (SC 1.3.5)', () => { ... });
});
```

The axe scan stays outside level blocks (it covers multiple SCs across levels).

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

**Anti-patterns:**

```typescript
// Bad: querySelector counting ties test to DOM structure
const rows = container.querySelector('tbody')?.querySelectorAll('tr');
expect(rows?.length).toBe(2);

// Good: role query validates the same contract without assuming DOM structure
const rows = getAllByRole('row');
expect(rows.length).toBe(data.length + 1); // header + data rows

// Bad: asserting CSS class names
expect(wrapper.className).toContain('my-class');

// Bad: querySelector for ARIA roles (misses implicit roles)
expect(container.querySelector('[role="heading"]')).toBeNull();
// <h2> has implicit role="heading" but no explicit attribute — this always returns null

// Good: Testing Library resolves both implicit and explicit ARIA roles
expect(queryByRole('heading')).toBeNull();
```

### Visual Conventions vs Behavior

A visual convention (punctuation, decoration, layout text) is not a behavioral contract
unless it affects accessibility or user interaction. Don't write tests for formatting
choices like colon suffixes, trailing punctuation, or text decoration — these are styling
decisions that may change without affecting behavior.

```typescript
// Bad: testing a cosmetic convention
getByText(new RegExp(`${label}:`)); // colon is a visual convention, not a contract

// Good: testing that the label creates a programmatic association
getByRole('textbox', { name: /Username/ }); // this IS the behavioral contract
```

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

### Role Queries

Never use `querySelector('[role="..."]')` to check ARIA roles. CSS attribute selectors
only match **explicit** `role` attributes in the HTML — they miss the implicit roles
that native elements carry (e.g., `<h2>` is implicitly `role="heading"`, `<button>` is
implicitly `role="button"`).

Use Testing Library's `getByRole()` / `queryByRole()` instead — they correctly resolve
both implicit and explicit ARIA roles.

```typescript
// Wrong — always returns null for <h2> (no explicit role attribute)
expect(container.querySelector('[role="heading"]')).toBeNull();

// Correct — queryByRole resolves <h2>'s implicit heading role
expect(queryByRole('heading')).toBeNull();
```

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
