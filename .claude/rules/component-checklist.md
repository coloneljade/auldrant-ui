# New Component Checklist

Every new component implementation MUST include all of the following before staging:

## Required Files

| File | Location | Notes |
|------|----------|-------|
| Component | `src/components/ComponentName.tsx` | |
| CSS module | `src/styles/ComponentName.module.css` | |
| Behavioral tests | `tests/component-name.test.tsx` | |
| A11y tests | `tests/a11y/component-name.a11y.test.tsx` | |
| Dev section | `dev/sections/ComponentNameSection.tsx` | Show default, disabled, and error states at minimum |
| README entry | `README.md` — correct table under the right category | |

## Wiring

- `src/index.ts` — add export in alphabetical order
- `dev/TestPage.tsx` — import the section and place it in the correct `<Tab>`

## Dev Section Conventions

- Export as a named `const` (e.g. `export const CurrencyInputSection`)
- Show at least: default/working state, disabled, and error
- Use realistic values — not placeholder text
- Follow the pattern in existing sections (`dev/sections/*.tsx`)
