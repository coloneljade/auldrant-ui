# Icon Conventions

## Rule

All icon usage in library components goes through `<Icon name={IconName.x} />` from `@components/Icon`.

Never import lucide-preact directly in feature components (`src/components/`, `src/internal/`, `src/signals/`).

Dev sections (`dev/`) may import lucide directly for demo-only icons not part of the library API.

## Why

Centralising through `Icon` means:
- Swapping the underlying library requires changing only `Icon.tsx`
- Consumers reference `IconName.dismiss`, not `X` from lucide — their code survives a library swap
- One place to audit which icons the library exposes

## All icons are aria-hidden

Icons are `aria-hidden="true"` by default via lucide. Adjacent visible text or an explicit `aria-label` on the parent element must provide accessible meaning — never rely on an icon alone.

## Sizing

`<Icon>` defaults to `1em × 1em` via its own CSS module. Override size via the `class` prop:

```tsx
// Default (1em)
<Icon name={IconName.dismiss} />

// Custom size via CSS
<Icon name={IconName.dismiss} class={styles.largeIcon} />
```

```css
.large-icon { width: 1.5em; height: 1.5em; }
```

Do NOT pass a `size` prop — the `size` prop from the underlying lucide library is intentionally not surfaced.

## Adding a new icon

1. Add the member to `IconName` enum in `src/components/Icon.tsx`
2. Add the import from `lucide-preact`
3. Add the entry to `iconMap` in `Icon.tsx`
4. Done — all consumers use the enum name

## IIconProps as base type

`IIconProps` (`{ name: IconName; class?: string }`) is the base type for icon props across all components. Future components that accept optional icons reference `IconName` for a typed, library-controlled API.
