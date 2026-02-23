---
paths:
  - "**/*.css"
  - "**/*.module.css"
---

# CSS Standards

## Plain CSS Over Preprocessors

Use vanilla CSS with CSS custom properties (variables) instead of Sass/SCSS/Less:

| Prefer | Avoid |
|--------|-------|
| `.css` files | `.scss`, `.sass`, `.less` |
| CSS custom properties | Sass variables |
| CSS nesting (native) | Sass nesting |
| `@layer` for organization | Preprocessor imports for structure |

Modern CSS provides the features that once required preprocessors:
- **Variables**: `--color-primary: #007acc;`
- **Nesting**: Native CSS nesting is now widely supported
- **Calculations**: `calc()`, `min()`, `max()`, `clamp()`

## CSS Modules for Components

All component styles MUST use CSS modules (`.module.css` files):

```
src/components/
  Button.tsx
  Button.module.css
```

```tsx
import styles from './Button.module.css';

export function Button({ children }) {
  return <button class={styles.button}>{children}</button>;
}
```

Global styles (colors.css, layout.css) are NOT modules — they define custom properties and resets.

## Grid-Only Layout

Use CSS Grid for all layout. Do not use flexbox for page or component layout:

| Use This | Not This |
|----------|----------|
| `display: grid` | `display: flex` |
| `grid-template-columns` | `flex-direction: row` |
| `grid-template-rows` | `flex-direction: column` |
| `place-items` | `align-items` + `justify-content` |
| `gap` (with grid) | `margin` for spacing between items |

Flexbox is acceptable only for inline-level alignment within a single element (e.g., icon + text inside a button).

## em Units for Spacing

Use `em` for all spacing and sizing. Do not use `px` or `rem`:

| Use This | Not This |
|----------|----------|
| `padding: 0.5em` | `padding: 8px` |
| `gap: 1em` | `gap: 16px` |
| `font-size: 1.25em` | `font-size: 20px` |
| `border-radius: 0.25em` | `border-radius: 4px` |

Exceptions: `1px` borders and `0` values are acceptable.

## No Nesting for Layout

Do not use CSS nesting for layout concerns. Keep selectors flat in module files:

```css
/* Good: flat selectors in a module */
.container {
  display: grid;
  gap: 1em;
}

.title {
  font-size: 1.5em;
}

/* Bad: nested layout */
.container {
  display: grid;

  .title {
    font-size: 1.5em;
  }
}
```

Nesting is acceptable for state modifiers and pseudo-elements:

```css
.button {
  background: var(--color-primary);

  &:hover {
    background: var(--color-primary-hover);
  }

  &:focus-visible {
    outline: 0.125em solid var(--color-focus-ring);
  }
}
```

## Color Organization

Keep colors in dedicated files, separate from layout styles:

```
styles/
  colors.css      # Color definitions only
  layout.css      # Structure and spacing
```

**colors.css example:**
```css
:root {
  /* Semantic colors */
  --color-text: #1a1a1a;
  --color-text-muted: #6b7280;
  --color-background: #ffffff;
  --color-surface: #f9fafb;

  /* Interactive states */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-focus-ring: #3b82f6;

  /* Feedback */
  --color-error: #dc2626;
  --color-success: #16a34a;
}
```
