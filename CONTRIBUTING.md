# Contributing to @auldrant/ui

Thank you for considering contributing to @auldrant/ui! To ensure that all contributions are legally sound and that the contributors have the necessary rights to submit their code, we use the [**Developer Certificate of Origin (DCO)**][dco].

By signing off on your commit, you confirm that you have the right to submit the code you are contributing and that it is compliant with the project's [license].

> Developer Certificate of Origin
> Version 1.1
>
> Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
>
> Everyone is permitted to copy and distribute verbatim copies of this
> license document, but changing it is not allowed.
>
> Developer's Certificate of Origin 1.1
>
> By making a contribution to this project, I certify that:
>
> (a) The contribution was created in whole or in part by me and I
> have the right to submit it under the open source license
> indicated in the file; or
>
> (b) The contribution is based upon previous work that, to the best
> of my knowledge, is covered under an appropriate open source
> license and I have the right under that license to submit that
> work with modifications, whether created in whole or in part
> by me, under the same open source license (unless I am
> permitted to submit under a different license), as indicated
> in the file; or
>
> (c) The contribution was provided directly to me by some other
> person who certified (a), (b) or (c) and I have not modified
> it.
>
> (d) I understand and agree that this project and the contribution
> are public and that a record of the contribution (including all
> personal information I submit with it, including my sign-off) is
> maintained indefinitely and may be redistributed consistent with
> this project or the open source license(s) involved.

## Signing your commit

Sign off with the `-s` flag:

```bash
git commit -s -m "Fix the fonon flow"
```

This adds the following to your commit message:

> Signed-off-by: Your Name <your.email@domain.com>

## Setup

1. Clone the repository
2. Open in DevContainer (recommended) or install [Bun](https://bun.sh/) locally
3. Run `bun install`

## Code Style

- **Formatter/Linter**: Biome (configured in `biome.json`)
- **Indentation**: 2 spaces (tabs in CSS)
- **Quotes**: Single quotes (double for JSX)
- **Semicolons**: Always
- **Line endings**: LF

Run `bun run check` to verify, `bun run check:fix` to auto-fix.

## Component Guidelines

- Use semantic HTML elements before reaching for ARIA
- Use CSS modules (`.module.css`) for component styles
- Use CSS Grid for layout (no flexbox for page/component layout)
- Use `em` units for spacing and sizing
- Export all public components from `src/index.ts`
- Test your component on the dev test page (`bun run dev`)

## Dev Test Page

A local development page renders all components for visual and functional testing:

```bash
bun run dev
```

This starts a Vite dev server at `http://localhost:5173/` with a page that exercises every component, token swatch, interactive state, and theme override. Use it for:

- Quick visual sanity checks without spinning up Storybook
- Verifying theme tokens look correct in both dark and light modes
- Testing keyboard navigation and focus ring visibility
- Checking component combinations and layout at different viewports

The test page is excluded from the library build — it's purely a dev tool.

## Pull Requests

### Quality Gates

Before submitting, all of these must pass:

| Command | What It Checks |
|---------|----------------|
| `bun run check` | Biome lint + format |
| `bun run typecheck` | TypeScript strict mode |
| `bun run test` | bun:test suite |
| `bun run build` | Vite library build |

### Review Process

1. Open a PR against `main`
2. A maintainer reviews and approves the PR
3. Once approved, a maintainer comments a merge command to trigger the merge bot

### Merging

PRs are merged by the merge bot. A maintainer comments one of:

- `/merge fix` — patch bump (bug fixes, `0.0.x`)
- `/merge feat` — minor bump (new features, `0.x.0`)
- `/merge feature` — minor bump (alias for feat)

The bot handles CHANGELOG entries and version bumps automatically. Do not edit these manually.

[dco]: https://wiki.linuxfoundation.org/dco
[license]: ./LICENSE
