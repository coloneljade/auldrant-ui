# Code Quality Rules

## Design Principle

**Make it easy to do the right thing and hard or impossible to do the wrong thing.**

- Use TypeScript's type system to enforce constraints at compile time (discriminated unions, required props)
- Derive values internally when only a few valid options exist (e.g., `purpose` → `autocomplete`)
- Prefer standard Web APIs over custom implementations (URL class, valueAsNumber, Intl.NumberFormat)
- Use native HTML semantics before ARIA — a `<button>` with descriptive text beats `aria-label` + `aria-pressed`
- Lean on native validation, input types, and browser behavior before building custom logic

## Use Library Components

When building a new component that needs navigation or linking, always use the library's
`Link` component — never a raw `<a>`. Before reaching for any raw HTML element, check
`src/index.ts` to see if the library already has a component for that purpose.

| Need | Use | Not |
|------|-----|-----|
| Navigation / linking | `<Link href="...">` | `<a href="...">` |
| Dismiss / action button | `<button type="button">` | raw `<a>` or `<div onClick>` |

Note: `<button>` is always appropriate for actions — the `Button` component is for
primary/secondary styled buttons, not every button in a component.

## Non-Negotiable Settings

### tsconfig.json

These strict flags are enabled and must not be disabled:

| Setting | Purpose |
|---------|---------|
| `strict: true` | All strict type checks |
| `noUnusedLocals: true` | No dead code |
| `noUnusedParameters: true` | No unused params |
| `noFallthroughCasesInSwitch: true` | Explicit switch cases |
| `noUncheckedIndexedAccess: true` | Safe index access |
| `exactOptionalPropertyTypes: true` | Strict optional props |
| `verbatimModuleSyntax: true` | Explicit import/export types |

### biome.json

Biome lint and format rules are the source of truth. Do not:
- Suppress lint rules without strong justification
- Override formatter settings per-file
- Add inline `// biome-ignore` without explanation

## Error Suppression

**Never suppress lint errors, type errors, or warnings without explicit user approval.**

This includes:
- `// biome-ignore` directives
- `// @ts-ignore` or `// @ts-expect-error`
- Adding `any` to bypass type errors

If a lint rule conflicts with project settings, escalate the conflict to the user rather than suppressing either side.

## Minimal Dependencies

Only add a package when:
- The functionality is genuinely needed NOW (not "might need later")
- No reasonable way to implement it in < 50 lines
- The package is well-maintained and actively used

Before `bun add`, ask:
1. Can native APIs handle this?
2. Is there a lighter alternative?
3. Will this add significant bundle size?
4. Is the license approved? (See the global licensing rules — **CRITICAL**)

After `bun add` to `dependencies`, you MUST update the `NOTICES` file with the
package's full license text. No exceptions.

## Code Style

Defined in `biome.json` and `.editorconfig`. Key conventions:
- 2-space indentation
- Single quotes (double for JSX)
- Trailing commas (ES5)
- Semicolons always
- LF line endings
- 100 char line width

## TypeScript Style

- `T[]` for arrays, never `Array<T>` or `ReadonlyArray<T>`. Use `readonly T[]` when needed.
- `{ [key: string]: V }` for index signatures, never `Record<K, V>`.
- Destructure props in the function body, never in the parameter list.
- Dot notation for property access (`styles.theme`), bracket notation only for dynamic keys.

## Component Conventions

### Declaration

Components are arrow functions typed with `FunctionComponent`, with a separate default export:

```tsx
import type { FunctionComponent } from 'preact';
import type { IBaseProps } from '@scripts/types';

interface IButtonProps extends IBaseProps {
  /** Visible button text. */
  label: string;
}

const Button: FunctionComponent<IButtonProps> = (props) => {
  const { label } = props;
  return <button>{label}</button>;
};

export default Button;
```

### Naming

- **Props interfaces**: `I` prefix, not exported (e.g., `interface IButtonProps`)
- **Exported data types**: `I` prefix, exported (e.g., `export interface IRadioOption`)
- **Component files**: `ComponentName.tsx` in flat `src/components/` directory
- **CSS modules**: `ComponentName.module.css` in `src/styles/`

### Content API: children vs. typed props

Choose based on whether the content has a fixed semantic role:

- **Explicit typed prop** (`message: string`, `label: string`) — when the content is a
  specific, named piece of data with predictable structure. Gives consistent rendering,
  type safety, and prevents consumers from injecting arbitrary markup into semantic regions
  (e.g., ARIA live regions, button labels).

- **`children: ComponentChildren`** — only when arbitrary composition is genuinely the
  intent: layout containers (Card, Section), dialog bodies, any component that is
  explicitly a slot for consumer content.

Rule of thumb: if you can name what the content *is* ("a message", "a label", "a heading"),
it should be a typed prop. If the component is a structural wrapper, use children.

### Props

- Use `?` for optional props; omit `| undefined` unless needed for prop forwarding
- Document every prop with JSDoc
- Extend `IBaseProps` (or `IFieldProps` for form fields) from `@scripts/types`

### Collection Keys

When rendering lists with `.map()`, choose keys carefully. Bad keys cause silent VDOM
bugs — stale state, mismatched DOM, broken animations.

**Key selection priority:**

1. **Stable unique ID from data** — best option when available (`item.id`, `option.value`)
2. **Composite string from data** — combine fields to create uniqueness (`${row.name}-${row.date}`)
3. **Composite with index** — when data alone isn't unique (`${header}-${i}`)
4. **Bare index** — last resort, only when items never reorder or filter

**Rules:**

- Keys must be unique among siblings (same parent element)
- Prefer globally unique keys even though only sibling uniqueness is required — avoids
  confusion and subtle bugs when refactoring
- If items can reorder (sorting, filtering, drag-and-drop), index-based keys will cause
  bugs — use stable data-derived keys instead
- When data has no unique identity (e.g., raw 2D arrays), a bare index is fine — don't
  add string prefixes that cost cycles without changing behavior
- When data has partial uniqueness (e.g., headers that might duplicate), use a composite
  like `${header}-${i}` to ensure uniqueness

**Examples:**

```tsx
// Good: stable ID from data
{options.map((opt) => <option key={opt.value}>{opt.label}</option>)}

// Good: composite when data alone might duplicate
{headers.map((header, i) => <th key={`${header}-${i}`}>{header}</th>)}

// Good: row + column identity for cells in a grid
{row.map((cell, j) => <td key={`${headers[j]}-${i}-${j}`}>{cell}</td>)}

// Fine: bare index when items have no identity and never reorder
{data.map((row, i) => <tr key={i}>...</tr>)}

// Bad: bare index when items CAN reorder
{sortedItems.map((item, i) => <li key={i}>{item.name}</li>)}

// Bad: non-unique data field
{users.map((user) => <li key={user.role}>{user.name}</li>)}
```

### File Structure

- No barrel files (`index.ts`) — import components directly
- No subdirectories per component — flat structure in `src/components/`
- CSS modules live in `src/styles/`, not alongside components
