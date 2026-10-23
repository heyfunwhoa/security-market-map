# Local UI bank adoption

Status: proposed in this PR; documentation adoption only when merged.
Owner: repository maintainer. Review date: 2026-10-12.

## References

- [Shared process v1.0, pinned proposal](https://github.com/heyfunwhoa/technical-docs-platform/blob/2c75afe4bcb2ef7dcd433df3a0566f6b2faa9cdb/engineering/ui-pattern-adoption-v1.md) — standards PR #28 must be reviewed before this adoption is finalized.
- [Portfolio workbench](https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/docs/design/design-lab.md) and [options catalog](https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/main/lib/component-options.ts).
- [Local engineering standards](engineering-standards.md).

Read the relevant bank entries before UI changes. Inspect and reuse this app's components first; adapt a bank pattern when it solves a missing user need. Preserve local tokens, component configuration, data boundaries and product rules. The portfolio's branding is not adopted.

## Initial task and source map

Task to validate: Compare vendors, find supporting sources, and distinguish unknown or stale coverage from verified claims.

The following paths were observed in the repository tree. Their internals, imports, rendering, accessibility and deployed usage were not audited in this documentation pass. They are inspection starting points, not verified adoption claims.

- [components/compare-workbench.tsx](../components/compare-workbench.tsx)
- [components/vendor-research-panel.tsx](../components/vendor-research-panel.tsx)
- [components/landscape-browser.tsx](../components/landscape-browser.tsx)
- Existing primitives: [components/ui](../components/ui).

Candidate bank patterns: search/filter controls, semantic comparison table, evidence detail panel and unknown/stale-state feedback. These are recommendations, not implemented changes.

## Local decision and evidence record

For the next relevant UI PR, record:
- User task and destination route/component.
- Local component inspected; bank pattern/source consulted; reuse/adapt/new decision and reason.
- Source revision and license/dependencies if copying.
- Responsible maintainer and real consuming call sites.
- Status: candidate, lab prototype, approved for named use, shipped with release evidence, or deprecated.
- Mobile/tablet/desktop behavior, keyboard/focus, reduced motion and applicable loading/empty/no-match/error/retry/stale/permission states.
- Tests and browser checks actually run, remaining checks and rollback.

Do not introduce a separate catalog here. Keep future decisions in this section or link to the app's existing authoritative design record. No component adoption is verified by this PR.

## Boundaries

Keep source provenance and reviewed-versus-inferred labels visible. A polished comparison must not imply unsupported equivalence, fresh data or verified coverage. Preserve the app's evidence review and publication rules.

Use synthetic examples for reusable demos. Progressive disclosure is not access control. Keep dense data stable; motion must explain a change and respect device reduced motion. Preserve meaningful content without animation.

## Rollout

1. Review shared standards PR #28 and this local pointer.
2. Apply the process to one real task using existing local components.
3. Record verification before labeling a pattern shipped.
4. Revisit the pinned standard deliberately when it changes; never auto-copy updates.

This documentation adds no runtime component, dependency, CI enforcement or deployment.


## First implementation pilot · 2026-10-12

Status: implemented on a feature branch; not merged, deployed, or browser-verified by this record. Owner: repository maintainer.

- Destination: `/compare`, `components/compare-workbench.tsx` → `components/comparison-evidence.tsx`.
- Bank patterns: `data`, `disclosure`, `context`. Reuses existing comparison engine, status pills and semantic table; native disclosure is sufficient, so no new overlay or dependency.
- Flow: visible comparison status → expandable supporting statements/source links/review dates → qualifications and always-visible general limitations. Unknown, conflict, limited and unverified warnings remain outside the disclosure.
- Table gains a caption, explicit row/column headers and a labeled keyboard-focusable horizontal scroll region. Comparison semantics and source records are unchanged.
- Verification: three Vitest rendering/evidence tests pass; scoped strict TypeScript passes for the new component/test; edited workbench transpiles. Full application typecheck remains required.

### Verification limits and remaining acceptance

Tests used the repository's Vitest configuration with an isolated install of its React 19.2.8 and Vitest 3.2.4 versions. This was a selected source snapshot, not a full checkout or lockfile install. Full lint, production build, complete test suite and deployment verification remain pending. No usability claim is made.

Browser checks could not run: no installed Chromium and the Playwright browser archive download failed. Before merge, verify the real destination at 375/768/1280px and 200% zoom, keyboard Enter/Space disclosure toggling, visible focus, no page overflow, long text/source wrapping and device reduced motion. No animation was added. Native disclosure keeps focus on its summary. Source details are optional; status and limitations stay visible. Loading/network failures are not newly introduced by these synchronous components.

For the account exercise, correct initiative evidence, revoke person evidence, and reset; verify latest source state, historical evidence and next action agree. For the comparison, inspect at least one supported, unknown and scoped/conflicting example; open the source and confirm its label/date/qualification matches the original record. Check horizontal scrolling stays inside the table region.

Rollback: revert the pilot component/test and this record; no migrations, data changes or package changes. These source paths are the consumer record for this pilot; no shared package or automatic update propagation was added.


## Component reference candidates — 2026-10-13

Status: proposed reference guidance, not installed, approved or shipped UI. Owner: repository maintainer.

Consult the [central adoption map](https://github.com/heyfunwhoa/technical-docs-platform/blob/e2467007171d3a4b9d121eb883ce36b586dce5eb/engineering/ui-reference-audit.md) and the [complete UI-bank source audit](https://github.com/heyfunwhoa/byjoyaing-portfolio/blob/7f48e7499255feb80879822fed2f87a99ba477ee/docs/design/component-source-audit.md) before selecting a new component. These immutable references are proposed in [Technical Docs PR #31](https://github.com/heyfunwhoa/technical-docs-platform/pull/31) and [Portfolio PR #137](https://github.com/heyfunwhoa/byjoyaing-portfolio/pull/137); a valid source link is not approval. The shared catalog holds the upstream inventory; keep local decisions here instead of copying the catalog.

Prioritize the existing Radix Tabs learning-scenario pilot (PR #36), semantic comparison Table, source disclosure/Sheet and filter state feedback. Preserve source dates, qualifications and Unknown labels. Optional dnd-kit comparison ordering is a later candidate, not a graph-layout replacement or a change to evidence ranking. Sandpack is not needed on research pages. This source audit does not merge/deploy PR #36 or alter comparison/evidence rules.

The shadcn index's Base UI examples are references; preserve this app's actual component family and tokens. Current dnd-kit React APIs differ from legacy core/sortable examples. Sandpack runtime/Nodebox terms and external data flow require separate review before any runnable lab. No dependencies, code execution, automatic refresh or automatic cross-repo synchronization are added by this note.

Before implementation, inspect actual call sites, record source/package version and license obligations, and verify responsive layout, keyboard/focus, reduced motion and relevant error/empty/denied states. Add non-drag controls for reordering and exact numeric inputs for financial sliders. Documentation inspection is not browser QA or security certification. Rollback: remove this section; no runtime or data changes.
