---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Documentation Standards

## Non-Negotiable

**All public APIs MUST be documented.**

| Language | Format | Example |
|----------|--------|---------|
| TypeScript/JS | JSDoc | `/** @param {string} name */` |

## What to Document

### Always Document (Public API)

- Exported functions and constants
- Exported components and hooks
- Exported types and interfaces
- Module entry points

### Document When Non-Obvious (Internal)

- Complex algorithms (explain approach)
- Non-intuitive business logic
- Workarounds with external dependencies
- Performance-critical code paths

## Inline Comments

### Good Inline Comments

```typescript
// WAI-ARIA 1.2 Section 5.2.1 requires aria-expanded on disclosure triggers
const expanded = useSignal(false);

// Workaround: Preact signals batch updates differently than React state
// See: https://github.com/preactjs/signals/issues/XXX
batch(() => { ... });

// Why: sorted for binary search in hot path
const sortedIds = ids.toSorted((a, b) => a - b);
```

### Bad Inline Comments

```typescript
// Increment counter
counter++;

// Check if user is null
if (user == null)

// Loop through items
for (const item of items)
```

## Refactoring Signal

If you need extensive comments to explain a code block:
- Extract to a well-named function
- The function name becomes the documentation

```typescript
// Bad: Long comment explaining complex logic
// ... 10 lines of comments ...
const result = /* complex expression */;

// Good: Extract to named function
const result = calculateWeightedAverageWithDecay(values, decayFactor);
```

## TypeScript Example

```typescript
/**
 * Authenticates a user and returns a JWT token.
 * @param credentials - User login credentials
 * @returns JWT token if successful, null if authentication fails
 * @throws {ArgumentError} When credentials is null
 */
export function authenticate(credentials: LoginCredentials): string | null
```

## Trusted Sources

| Resource | When to Use |
|----------|-------------|
| [Preact docs](https://preactjs.com/guide/v10/getting-started) | Components, hooks, signals, Preact-specific patterns |
| [MDN Web Docs](https://developer.mozilla.org/) | HTML, CSS, Web APIs, accessibility |
| [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) | Type system, generics, utility types |
| [Bun docs](https://bun.sh/docs) | Runtime, bundler, test runner |
| [Biome docs](https://biomejs.dev/) | Linter rules, formatter config |
