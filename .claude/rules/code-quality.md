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

## Null Checks

**Use truthy checks (`if (value)`) — never `!== undefined` or `!== null`.**

Optional string and value props must be guarded with a plain truthy check. Explicit
null/undefined comparisons are forbidden for this pattern.

```ts
// Correct
if (value) sig.value = value;

// Wrong — never use these
if (value !== undefined) sig.value = value;
if (value != null) sig.value = value;
```

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

## CSS Units

**`em` for all spacing, sizing, and layout** — values scale with their context (the default).

**`rem` for WCAG touch target minimums only** (`min-width`/`min-height` on interactive elements).
Touch targets are accessibility floors, not relative measurements. `rem` is immune to local
font-size inheritance while still scaling with the user's root font size preference — which
`px` does not. This is the one exception to the em-only rule.

| Criterion | Minimum | `rem` value |
|-----------|---------|-------------|
| WCAG 2.5.5 (AAA, 44px) | Primary interactive targets | `2.75rem` |
| WCAG 2.5.8 (AA, 24px) | Constrained targets (e.g. chip remove) | `1.5rem` |

Always pair with a comment identifying the criterion:

```css
/* rem ensures 44px touch target (WCAG 2.5.5) regardless of inherited font-size */
min-width: 2.75rem;
min-height: 2.75rem;
```

Alternative when the container provides the target: an icon-only button set to
`align-self: stretch` inside a container guaranteed ≥ 44px tall needs no `min-*` —
the stretch handles it. See `.toast-dismiss` for an example.

**`px` is never correct** — it ignores user font size preferences entirely.

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

### Prefer natural TypeScript over utility-type aliases

Use the language's native syntax instead of verbose utility-type shorthands — it's more
readable and keeps type reasoning local. Example: `{ [key in MyEnum]: V }` over
`Record<MyEnum, V>`. Apply this principle broadly: if the native form is clear, prefer it.

### Enums

Prefer `enum` over string unions for any named set of values — enables find-all-references,
autocomplete, and exhaustive checks that raw strings cannot provide.

- **Name**: `PascalCase` type, `camelCase` members — e.g. `AlertVariant.info`.
- **Values**: match the member name — `info = 'info'`.
- **No `const enum`**: `isolatedModules: true` + esbuild make it unsafe for a published library.
- **Exhaustive maps**: `{ [key in MyEnum]: V }` — TypeScript errors on missing keys.

## State Management

**Signals own reactive state. Hooks own DOM access and lifecycle side effects.**

| Need | Use | Not |
|------|-----|-----|
| Reactive boolean/value | `useSignal` | `useState` |
| Derived/computed value | `useComputed` | `useMemo` |
| Module-level shared state | `signal()` | context or external store |
| Pausable countdown timer | `useTimer` (from `@scripts/hooks`) | raw `setTimeout` + `useEffect` |
| DOM ref | `useRef` | — |
| Event listeners, DOM side effects | `useEffect` | — |
| Stable IDs | `useId` | — |

Signals update only the parts of the VDOM that read them — no full component re-render. Hooks from `preact/hooks` (`useEffect`, `useRef`, `useId`, custom hooks) remain appropriate for their domains; don't replace them with signals.

`useState` has no place in new components. If you find yourself reaching for it, use `useSignal` instead.

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

### CSS Module Class Naming

Vite is configured with `localsConvention: 'camelCaseOnly'`. This means:

- **CSS source** uses kebab-case: `.alert-body`, `.dialog-title`, `.icon-button`
- **TSX access** uses camelCase: `styles.alertBody`, `styles.dialogTitle`, `styles.iconButton`
- The bundler converts automatically — never write camelCase in CSS source

**Sub-element names must be prefixed with the component name** for searchability:

| Good | Bad |
|------|-----|
| `.alert-body` | `.body` |
| `.dialog-title` | `.title` |
| `.password-input-wrapper` | `.wrapper` |

**Variant/modifier names** (e.g. `.success`, `.error`, `.warning`) are semantically
self-contained and don't need prefixing — they describe a state, not a sub-element.

**Root class** matches the component name in kebab-case: `.alert`, `.dialog`, `.nav`.

### File Structure

- No barrel files (`index.ts`) — import components directly
- No subdirectories per component — flat structure in `src/components/`
- CSS modules live in `src/styles/`, not alongside components
