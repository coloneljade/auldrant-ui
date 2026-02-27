# Third-Party License Attribution

## CRITICAL — This Is a Legal Obligation

This project distributes a bundled library. Every third-party dependency whose code
ends up in the published bundle **MUST** have its license and copyright notice
reproduced in the `NOTICES` file at the project root. This is not optional — it is a
legal requirement of MIT, ISC, Apache-2.0, BSD, and virtually every open-source license.

**Failure to attribute is a license violation.** Treat it with the same severity as
shipping broken code.

## When This Applies

**Every time a dependency is added, updated, or removed.** Specifically:

### Adding a Dependency (`bun add`)

1. **Before adding**: Check the package's license on npm or its repo. Confirm it is
   compatible with MIT (our license). Permissive licenses (MIT, ISC, BSD-2, BSD-3,
   Apache-2.0) are fine. Copyleft licenses (GPL, LGPL, MPL) require escalation to
   the user — do NOT add them without explicit approval.
2. **After adding**: Read the package's LICENSE file from `node_modules/<package>/`
   and append a new entry to the `NOTICES` file following the existing format.
3. **Verify**: Confirm the `NOTICES` file contains the complete license text and
   correct copyright holders.

### Removing a Dependency (`bun remove`)

1. Remove the corresponding entry from the `NOTICES` file.
2. Verify no stale entries remain.

### Updating a Dependency

1. Check if the license or copyright notice changed in the new version.
2. Update the `NOTICES` entry if anything changed.

## NOTICES File Format

```
================================================================================

<package-name> — <repository-url>
<brief description of what we use it for>

<full license text, verbatim from the package>
```

- One section per dependency, separated by the `===` divider
- Include the **complete** license text — do not summarize or abbreviate
- Include **all** copyright holders mentioned in the original
- Preserve the original license formatting

## What Goes in NOTICES

| Dependency Type | Included in Bundle? | Needs NOTICES Entry? |
|----------------|--------------------|--------------------|
| `dependencies` | Yes | **YES — always** |
| `peerDependencies` | No (consumer provides) | No |
| `devDependencies` | No (build-time only) | No |

Only runtime `dependencies` get bundled into `dist/`. These are the ones that require
attribution in the published package.

## Allowed License Types

Only three licenses are pre-approved. **Everything else requires escalation.**

| License | Allowed? | Action |
|---------|----------|--------|
| MIT | **Yes** | Add to NOTICES and proceed |
| ISC | **Yes** | Add to NOTICES and proceed |
| Apache-2.0 | **Yes** | Add to NOTICES and proceed (also check for a NOTICE file in the package — Apache-2.0 requires preserving it) |
| 0BSD / Unlicense / CC0 | **Yes** | No attribution legally required, but still add to NOTICES for completeness |
| **Anything else** | **No — escalate** | Stop and explain to the user (see below) |

### Escalation: What to Tell the User

When a package has any license other than MIT, ISC, or Apache-2.0, do NOT add it.
Stop and explain the situation in plain terms:

- **BSD-2-Clause / BSD-3-Clause**: "This package uses a BSD license. It's generally
  permissive, but it's outside our approved list. BSD-3 has a 'no endorsement' clause
  that restricts using the original authors' names in promotion. Want to approve it?"

- **MPL-2.0**: "This package uses the Mozilla Public License. It's a 'file-level
  copyleft' license — if we modify any of their source files, we'd have to publish
  those modifications under MPL-2.0. We can use it unmodified in our bundle, but it
  adds legal complexity. Recommend finding an alternative."

- **GPL / LGPL / AGPL**: "This package uses a copyleft license. If we bundle it into
  our library, it could require our entire library to be released under the same
  license — meaning we'd lose the ability to keep our code MIT-licensed. This is a
  serious legal risk. Do NOT use this. Find an alternative."

- **Unknown / No license**: "This package has no license, which legally means all
  rights are reserved by the author — we have no permission to use it at all. Do NOT
  use this. Find an alternative that has a proper license."

- **Custom / Proprietary**: "This package uses a custom or proprietary license. Read
  the full text and present it to the user — do not summarize or interpret legal terms.
  Let the user decide."

## Published Package Contents

The `files` field in `package.json` controls what ships in the npm package.
These files MUST always be included:

- `dist/` — built library output
- `LICENSE` — our MIT license
- `NOTICES` — third-party attribution
- `README.md` — package documentation
- `CHANGELOG.md` — version history

## Checklist (Use This Every Time)

When adding a package:

- [ ] License is compatible with MIT
- [ ] Complete license text added to `NOTICES`
- [ ] Copyright holders are correct
- [ ] `NOTICES` file is listed in `package.json` `files` array

When removing a package:

- [ ] Entry removed from `NOTICES`
- [ ] No stale entries remain
