---
paths:
  - "**/*.tsx"
  - "**/*.ts"
  - "**/*.html"
---

# Frontend & Accessibility

## First Rule of ARIA

> If you can use a native HTML element with the semantics and behavior you need, use it instead of adding ARIA.

## Semantic HTML First

| Use This | Not This |
|----------|----------|
| `<button>` | `<div role="button" tabindex="0">` |
| `<a href="...">` | `<span role="link" onclick="...">` |
| `<nav>` | `<div role="navigation">` |
| `<main>` | `<div role="main">` |
| `<header>` | `<div role="banner">` |
| `<footer>` | `<div role="contentinfo">` |
| `<section>` | `<div role="region">` |
| `<input type="checkbox">` | `<div role="checkbox">` |

## When ARIA Is Appropriate

Use ARIA only when HTML cannot express the semantics:

- **Custom widgets** without native equivalent (tabs, tree views)
- **Dynamic content** announcements (live regions)
- **Additional labels** when HTML structure can't provide them
- **State communication** for custom interactive elements

## ARIA Anti-Patterns

### Never Override Native Semantics

```html
<!-- Bad: Button acting as link -->
<button role="link">Click here</button>

<!-- Good: Use the right element -->
<a href="/page">Click here</a>
```

### Never Use Redundant Roles

```html
<!-- Bad: Role matches element -->
<nav role="navigation">
<button role="button">

<!-- Good: Native semantics sufficient -->
<nav>
<button>
```

### Never Use ARIA as First Solution

```html
<!-- Bad: ARIA before trying HTML -->
<div role="list">
  <div role="listitem">Item</div>
</div>

<!-- Good: Native HTML -->
<ul>
  <li>Item</li>
</ul>
```

## Why This Matters

Pages with ARIA have **2x the accessibility errors** on average (WebAIM Million report). Most ARIA errors come from:

1. Using ARIA when HTML would work
2. Incorrect ARIA attribute values
3. Missing required ARIA relationships
4. Conflicting ARIA and native semantics

## Interactive Element Checklist

For any interactive element, verify:

- [ ] Is there a native HTML element for this?
- [ ] Is it keyboard accessible?
- [ ] Does it have visible focus state?
- [ ] Is the purpose clear to screen readers?
- [ ] Are loading/error states announced?

## Trusted Sources

| Resource | When to Use |
|----------|-------------|
| [HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) | Choosing the right semantic element |
| [ARIA Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) | When native HTML can't express the semantics |
| [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS) | Property syntax, browser support, new features |
| [Can I Use](https://caniuse.com/) | Browser compatibility checks before using a feature |
