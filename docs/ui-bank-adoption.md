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
