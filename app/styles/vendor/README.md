# Vendored shadcn stylesheet

`shadcn-4.22.1.css` is an unmodified copy of `dist/tailwind.css` from the npm
`shadcn@4.22.1` package. Its MIT license is preserved in `shadcn-LICENSE.md`.

- Upstream: https://github.com/shadcn-ui/ui
- Package archive: https://registry.npmjs.org/shadcn/-/shadcn-4.22.1.tgz
- CSS SHA-256: `4c371f7a1ff5d219ae2f7ff28bd256b4346fd546fe46fbae22092e57db2f0fae`

The application needs these styles, not the shadcn CLI. Keeping the CSS here
removes the CLI's dependency tree, including the unresolved development-only
deepmerge advisory GHSA-gcqx-w48m-w2h4 (issue #113), from routine installs.
Existing components in `components/ui` and `components.json` remain available.

## Maintenance

This snapshot does not automatically receive upstream fixes. Review upstream CSS
changes when updating components. Replace it only from a specific reviewed
release, retain its license, update the version/hash here and its import in
`app/globals.css`, and compare the generated CSS and affected component behavior.
Run the repository's tests, lint, typecheck, build and dependency audits.

## Adding components

Reuse or edit the existing local components first. The local shadcn executable is
no longer installed. Do not add an unpinned `npx shadcn@latest` step to builds or CI.
For future CLI-assisted generation, first select and audit an explicit version
in a disposable workspace without production credentials, review the registry
inputs and generated diff, then bring only reviewed component changes here.
An ephemeral install of a vulnerable CLI remains vulnerable; this change does
not fix upstream deepmerge or authorize bypassing the advisory.
