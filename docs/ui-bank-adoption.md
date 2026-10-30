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


## Market-map explorer slice · 2026-10-17

Status: implemented and merged into `main` on 2026-10-23 in PR #77 (merge commit `eb8e59e42e880c5dce35cb5450d821b504c0257f`). The merged preview review is not a production publication claim. Audit and full route-family plan: [UI/UX upgrade recommendation](https://github.com/heyfunwhoa/security-market-map/blob/review/ui-ux-map-upgrade-audit-20261017/docs/ui-bank-adoption.md#uiux-upgrade-audit-and-recommendation--2026-10-17).

- User task: orient in the broad security market, inspect an area, then open its detail page. Destinations: `/` and `/domains` through the shared `MarketMapExplorer`.
- Reuse/adapt: adapted the existing `MarketConstellation` and market-area copy; retained the existing data, detail links, page tokens and Next.js/React stack. Uses native buttons for selection and the existing Next link for navigation. No copied portfolio UI, new dependency, or additional primitive family.
- Design decision: removed manually authored circle positions/radii because no metric gave them meaning. All selectable market-area tiles use the same fixed height. Accent color is explicitly decorative; it does not signal ranking, evidence strength or capability. The illustrative four-stage path remains separate from the market-area picker and links to the existing five-step coding-agent scenario. No unsupported inter-area edges are drawn.
- Interaction/accessibility: native selection buttons expose `aria-pressed` and a full spoken name; the selected detail panel uses a polite live region and a separate “Open this area” link. Selection works through standard Enter/Space button behavior; focus styling remains visible. The layout stacks on narrow screens and uses two/three-column grids at wider breakpoints. Selection state changes immediately under reduced motion.
- Verification: `npm test` — 93 tests pass; `npm run lint` — pass; `npx next typegen && npm run typecheck` — pass; `npm run build` — pass; `npm run test:research-integrity` — 7 checks pass. Added three server-rendered explorer assertions. Vitest now resolves the app’s existing `@/` alias.
- Remaining QA: the cloud browser could not reach this workspace’s local preview (`127.0.0.1:36079`), so desktop/tablet/mobile visual review, 200% zoom and live keyboard interaction are not claimed. Before release, review 375/768/1280px, focus and selection announcements, long labels, no horizontal page overflow, reduced motion, and the detail links on a real preview.

Rollback: revert the explorer, data rename, route-copy, test/config and this record; no catalog records, persistence, migrations or external connections changed.

## UI/UX upgrade audit and recommendation · 2026-10-17

Status: review recommendation only; no runtime changes in this PR. Owner: repository maintainer. This historical audit was performed against `main` at `3d4cecda676d4b2cc2e9c4335eb16e66f277ab4c`, before PR #77; implementation status is updated below. The browser walkthrough is the evidence for observed interactions; source inspection establishes route/component presence. Mobile viewport, assistive technology and keyboard task testing were not completed in this audit, so they remain acceptance checks rather than compliance claims.

### Route inventory

The earlier inventory counted 19 route templates. Current `main` has **20 page templates**: the prior families below plus `/frameworks/incident-lab`, added in merged PR #72. That lab uses synthetic fixtures; its ATT&CK IDs are candidate-format fields, not claims mapped to an imported dataset. No dedicated `/products/[slug]` route exists; product context is reached through vendor/catalog and comparison surfaces. API routes are excluded.

| Route family and current routes | User task and main interaction | What works; friction to address | Shared local components |
| --- | --- | --- | --- |
| Overview and domain directory: `/`, `/domains` | Orient in the market; choose a domain or category. | Search, clear evidence boundary and linked domain cards work. The original homepage circle graphic mixed attack-path storytelling with domain overlap, crowded labels, hand-set unequal radii and a horizontally scrolling SVG. PR #77 replaced it with the equal-weight explorer on `/` and `/domains`; broader route-family improvements remain recommendations. | `MarketConstellation`, `DomainMap`, `CategoryMap`, `SearchPanel`, `PageIntro`, cards/buttons. |
| Domain/category/market detail: `/domains/[slug]`, `/categories/[slug]`, `/markets/[slug]` | Understand a buyer problem, category boundaries and adjacent areas. | Useful problem/buyer explanations, category groups, adjacent links and some evidence. Page patterns are content-rich and can repeat the same taxonomy; cross-domain relationships are harder to scan than the prose. | `PageIntro`, `AreaDiagram`, `CloudAppShortlist`, `DomainMap`, `CategoryMap`, `Claims`, `AcademyLinks`. |
| Vendor/product detail: `/vendors/[slug]` | Inspect a vendor’s positioning and supporting material. | Source/research panels and claim qualifications support traceability; long claim histories and research controls compete for attention. Product-level standalone routes are absent. | `Claims`, `ResearchPanelLive`, `PageIntro`, status/evidence components. |
| Use cases: `/use-cases`, `/use-cases/[slug]` | Find a buyer job, then follow its workflow, categories and vendors. | Twelve use-case journeys provide a useful entry point. Make the category/vendor/source handoffs and “candidate vs evidence-backed” status more scannable. | `PageIntro`, catalog links, `FlowStrip`/scenario patterns, cards. |
| Learning and attack scenario: `/learn`, `/attack-path` | Learn terms or step through the coding-agent scenario and associated controls. | The five-step scenario changes control rows and evidence; Learn adds scenarios and definitions. Horizontal step tabs and dense evidence tables need robust small-screen and keyboard behavior; keep the guided sequence distinct from the market taxonomy. | `AttackPath`, `ScenarioPlayer`, `Claims`, `PageIntro`, Tabs/buttons/tables. |
| Map/explanatory pages: `/control-map`, `/connections`, `/frameworks` | Understand control dimensions, category relationships, and named frameworks. | Control-map’s six dimensions are a useful legend. Connections has many static diagrams/tables with repeated circles and dense lists; make sections navigable and clarify what each connector asserts. | `AreaDiagram`, `CloudAppShortlist`, `PageIntro`, local diagram/card/table primitives. |
| Landscape and comparison: `/landscape`, `/compare` | Filter the catalog or compare a bounded set using evidence. | Landscape filters and Compare presets/source-linked matrix are valuable and preserve Unknown. The 280-product list and wide matrix are dense; improve filter summaries, reset/no-result feedback, sticky context and mobile row/column navigation without implying rank. | `LandscapeBrowser`, `CompareWorkbench`, `ComparisonEvidence`, `StatusPill`, filter inputs/tables. |
| Worksheets: `/budget`, `/territory` | Work through a local budget estimate or account hypothesis. | Budget explains price classes and keeps assumptions conservative. Territory’s local-storage workflow has a useful blank state and guards against scoring unknown incumbents; review disclosure of persistence, reset/export, and recoverable errors. No form fields were entered or saved in this audit. | `BudgetWorksheet`, `TerritoryWorkspace`, form primitives, buttons/cards. |
| Sources/research: `/sources` | Trace evidence, freshness, conflicts, review queue and intake status. | The ledger makes provenance and review states visible, but its large mixed table and intake controls create a high scanning burden. Separate overview/status from source rows and progressively reveal detailed metadata; keep review actions explicit. No source was entered. | `Claims`, `SourceIntake`, `ResearchPanelLive`, `StatusPill`, tables/forms. |
| Incident lab: `/frameworks/incident-lab` | Test fixture classification under missing/disputed/unreviewed evidence. | Resettable synthetic states and explicit “request reviewed status (not an approval)” protect the evidence boundary. Explain fixture-only scope near the result and ensure state changes are announced accessibly. | `IncidentLab`, buttons, labels, live region, cards. |
| Case study: `/case-studies/cyera-oasis` | Read a bounded company case and distinguish reported facts from interpretation. | The route and content exist in source; this route was not separately exercised in the live walkthrough. Preserve source/date and limitation visibility and align its editorial hierarchy with vendor and source pages. | `PageIntro`, `Claims`, catalog data, cards. |

**Shared system:** the app already has a coherent warm neutral palette, Source Sans/Fraunces typography, spacing/radius tokens, a local shadcn/Radix-style UI family, header/footer/skip link, focus-ring conventions, and cards, badges, tabs, tables, sheets, labels, inputs and buttons. Continue these rather than importing another component kit. Relevant workbench entries are summaries, disclosure, context, data, search and feedback; reuse/adapt local cards, Tabs, Sheet, filters, search and state feedback rather than copying portfolio components or branding. Existing `docs/ui-bank-adoption.md` and `docs/product/prd.md` are the design/requirements references; the PRD remains draft and should not be duplicated.

**Territory verification:** the prior walkthrough’s “New account” action showed “This page couldn’t load.” This audit independently opened deployed `/territory` and retried once; the same screen remained. We did not click New account or write local data. This reproduces a browser-visible route failure, but does not identify whether the cause is the app, deployment or browser transport. Track it as a verified symptom for the existing deployed-journey owner to diagnose, not as a proven application defect.

**Ownership/review context:** current open PRs include taxonomy/research work (#60, #59, #57, #42), study paths (#22), source/research work (#45, #61), incident-reference docs (#71), and other unrelated governance/security changes. PR #72, merged into the audited main SHA, added the incident-lab route; its PR description says candidate IDs are format-validated and no ATT&CK dataset is imported. Review those before changing graph inputs. PR #62 is merged; its diff added the Infisical/Vault/Akeyless comparison preset, URL selection and selection test only. KRU-69 is owned by Kristen Aing and is the Infisical public-evidence/privacy pilot; it was reopened In Progress and is not a map-redesign ticket. KRU-76 completed one local category-to-comparison-to-source slice; KRU-93 completed the deployed check and explicitly excluded a graph rewrite. This plan adds no issue and does not enlarge those scopes.

### Native market-map concept

Use the interaction lessons, not either application: [ATT&CK Navigator](https://github.com/mitre-attack/attack-navigator) supports matrix browsing and annotation; [Attack Flow](https://github.com/center-for-threat-informed-defense/attack-flow) models ordered actions/attack sequences. Both repository metadata records Apache-2.0 for their code. That does **not** clear rights or attribution for ATT&CK data or other framework content. Do not fork/embed either app or put ATT&CK techniques, IDs, coverage scores or claims in this market atlas without a sourced dataset and a separate terms/attribution review.

Replace the unequal overlapping circles with an app-native, equal-weight, labeled relationship map. Keep the market taxonomy and attack story as separate views:

- **Domain node:** equal size; domain name and one-line buyer question. Position nodes in labeled groups such as “environment” and “cross-cutting controls”; order within groups is alphabetical or stable taxonomy order. Position and color must not encode rank, spend, market share or capability.
- **Category node:** appears when a domain is expanded, connected with a labeled “contains” relationship from existing domain/category membership. Categories shared across domains may appear in each relevant expansion.
- **Use case:** connect only where the existing catalog explicitly associates it with a category/domain; label that relationship “used in” and provide a direct use-case link.
- **Attack step:** show as a separate ordered rail using the existing five-step scenario. A step may point to relevant categories/controls only when `attackSteps` or reviewed data contains that relationship; it is a scenario explanation, not ATT&CK coverage.
- **Vendor/product:** show in the selected category’s inspector/list, not as an unlabeled node cloud. Mark inclusion “research candidate” where applicable; category presence is not capability evidence.
- **Evidence state:** show text plus a distinct icon/pattern for reviewed/source-backed, vendor-reported, stale, conflicted, and Unknown. Unknown remains explicit. Do not make color the only cue; do not use opaque “coverage” shading.
- **Edges:** use thin neutral strokes with visible labels and a legend (“contains,” “used in,” “appears in step,” or a catalog-defined relationship). Do not draw proximity lines or infer competitor edges.

Selecting a node should highlight it and open an inspector with its definition, buyer question, categories/use cases, evidence limitations and an explicit **Open detail** link. Selection should not navigate unexpectedly; the detail link is the navigation action. Use the current local SVG/React stack and catalog relationships, with deterministic non-force-directed layout. At narrow widths, replace the full graph canvas with the same hierarchy as an expandable list/stepper; keep all details reachable without horizontal panning. Keyboard users need focusable native controls, visible focus, Enter/Space selection and an equivalent list; do not require hover. Use the existing Sheet only if it improves the inspector on mobile. Reduced-motion mode should retain the same information and state without animated movement.



### Status after the explorer slice

PR #77 delivered Phase 1: equal-weight selectable market-area tiles, a separate illustrative path, an inspector, and direct detail links. Hosted CI passed. The desktop preview and Enter/Space behavior were reviewed; narrow viewport, 200% zoom, reduced-motion preference, and long-label wrapping remain unverified, so the audit's responsive/accessibility acceptance is still open. Phases 2–5 remain recommendations and are not implied by #77.

### Ordered implementation plan

| Phase | Work and dependencies | Acceptance |
| --- | --- | --- |
| 0 — Resolve ownership and baselines | Keep the existing PRD/UI-bank and KRU-93 deployed QA context authoritative. Review graph-affecting PRs and confirm which catalog relationships are safe to render. Capture representative desktop/mobile sizes and keyboard tasks before code. | Route list reconciled; graph inputs/meaning documented; current preview/deployed SHA and non-goals recorded. |
| 1 — Small, high-value slice | **Implemented in merged PR #77** on `/` and `/domains` using the shared `MarketMapExplorer`, existing catalog and local stack. | Desktop preview and selection behavior were reviewed and documented in #77; the 375/768 px and 200% zoom visual checks remain unverified. This phase is delivered, with responsive QA still open. |
| 2 — Relationship and attack-story views | Add explicit category expansion and typed relationships from catalog data. Restyle the attack-step rail separately; only connect step-to-category links supported by data. Add an explanatory legend and evidence-state labels. | Every rendered edge maps to a declared source relationship; unknown/candidate/reviewed states remain explicit; no ATT&CK assertions are introduced. |
| 3 — Shared UI polish across route families | Align PageIntro, section headings, cards, StatusPill, evidence disclosures, filters, empty states, callouts and form guidance using current tokens/primitives. Add route breadcrumbs/context and consistent section anchors where needed. | No new primitive family/dependency; page-level hierarchy consistent; states and labels use text and icons in addition to color. |
| 4 — Dense research and decision pages | Landscape: compact filters, active-filter chips, result count, clear-all, sortable only when semantics are valid. Compare: persistent product/use-case context, evidence summary, keyboard-friendly horizontal matrix. Connections: contents/navigation and collapsible diagrams with labeled edges. Sources: separate health/review summary from source ledger; improve row scanning and disclosure. | Filters and no-result states recover cleanly; comparison stays evidence-linked; dense tables have captions/headers and mobile alternatives; source status/date never hidden behind color. |
| 5 — Remaining routes and release QA | Apply the shared patterns to details, use cases, Learn, worksheets, source/vendor details, incident lab and case study. Recheck Territory route failure separately without test data. Use existing test/lint/typecheck/build workflow and manual preview review. | Desktop/tablet/mobile and keyboard tasks pass for primary journeys; focus is visible; screen-reader labels/status announcements make sense; reduced motion preserves content; worksheet/account routes tested with synthetic local data only after explicit reset/cleanup plan; screenshots and SHA distinguish preview from production. |

**Cross-cutting acceptance criteria:** no dedicated product-detail route is implied unless separately approved; no unsourced vendor capability, ranking, market share or competitor relationship; all displayed relationships have a typed source in the existing catalog or are labeled explanatory; Unknown, candidate, vendor-reported, stale, conflicted and reviewed states remain distinct; WCAG 2.2 AA is the target in the existing PRD, to be tested rather than claimed; responsive behavior, keyboard/focus, reduced motion, empty/loading/error/no-match and table navigation are documented with observed results. Do not add dependencies unless the native React/SVG and existing primitives demonstrably cannot meet a requirement.

**Risks:** current visual circle radius is hand-authored (`marketCircles.r`) and has no documented metric; readers can read it as importance. The current opening text also blends attack-sequence direction with overlapping domain circles. Several open taxonomy PRs may change nodes/relationships during implementation. The source ledger is large, so progressive disclosure must not conceal evidence state. The existing territory failure must be diagnosed before design work assumes the route is healthy. The plan does not claim mobile/accessibility verification or a confirmed root cause for that failure.

**Review boundary:** recommendation only. No code, issue, PR, merge or deployment is included in this change.

## Detail-page breadcrumbs (2026-10-29)

Adapt the workbench case-study breadcrumb pattern (Home / collection / title) for
`/domains/[slug]`, `/categories/[slug]`, and `/vendors/[slug]`. Reuse local color
tokens and Next Link; add one small server-rendered breadcrumb component without
a dependency or motion. Domain pages return to Domains; category and vendor pages
return to Landscape. These are browsing destinations, not an assertion of a
single domain/category parent, and do not restore previous filter state. Existing
multi-domain links remain available.

Use a labeled navigation landmark, an ordered list, a non-linked current page,
hidden decorative separators, visible keyboard focus, 44px-high links, and
wrapping text. PR verification records automated checks and any responsive or
keyboard browser checks still requiring review.

## Landscape drilldown review (2026-10-29)

PR #106 adapts the bank's search/filter and state-feedback patterns in the existing
LandscapeBrowser, using native selects, Label, StatusPill and local tokens. No
third-party code, dependency, animation or new catalog record is introduced.
Domain/category/product controls appear once; category choices use the catalog's
actual domain membership. Product choices honor the same refinements as results.
Changing a filter clears product focus; changing domain also clears category.
Reset all filters clears every selection, including from the no-match state.
A polite status announces result/total counts and the number of active filters.

Controls wrap into one column on small screens and use 44px targets with visible
focus. Browser responsive verification remains required before merge; source
inspection is not device QA. Filter transitions and no-match recovery are covered
by regression tests. No new network, permission, loading or motion state exists.
Rollback is a revert of the UI/filter helper change; no data migration is needed.

Follow-up slices, separate from filtering: bring existing buyer/owner/category
context higher on detail pages; keep source-attribution and Unknown explanations
visible beside that context. Reuse existing data and claim labels rather than
inventing summaries or treating vendor reporting as independent verification.

### Shareable filters and product destinations (2026-10-30)

Use the URL as the landscape selection source, via Next useSearchParams and its
documented native History API integration. Each changed selection adds a history
entry without scrolling or a full reload; browser Back/Forward and copied URLs
restore the selection. Reset writes `/landscape`. Only known filter values are
accepted; stale IDs and incompatible category/product focus fall back to Any.
Product links point to stable product-ID anchors on the existing vendor page,
with scroll spacing and a visible target ring. Breadcrumbs still return to the
unfiltered collection; browser Back restores the shortlist.

Reuses the existing filter/state-feedback pattern and tokens; no new dependency,
research claim or animation. A Suspense loading status covers URL-state hydration.
Regression tests cover URL serialization/parsing, unknown values, reset and anchor
agreement. Browser history, direct-load, mobile/tablet/desktop, keyboard, target
scroll and no-match recovery remain required preview checks, not inferred from
unit tests. Preview authentication must remain enabled.

### Product quick view (2026-10-30)

Reuse the installed shadcn/Radix Sheet composition, documented at
https://ui.shadcn.com/docs/components/radix/sheet. Adapt the bank's contextual
progressive-disclosure pattern with existing app tokens and StatusPill. New
ProductInspector composition shows existing product metadata, filtered recorded
relationships with use-case labels, and an evidence-page link. No catalog claims,
dependencies, lockfile changes, or copied dashboard template are introduced.

The modal panel keeps the landscape mounted and leaves URL filters unchanged.
Radix owns dialog semantics, focus containment, Escape, and trigger focus return.
A full-width mobile sheet becomes a bounded desktop panel, scrolls internally,
and provides a 44px Close target. Reduced-motion overrides cover content and
backdrop. Missing metadata reads Unknown; missing relationships are explicitly
research gaps. Detail navigation preserves the existing product anchor.

Browser verification remains pending: 375/768/1280px, 200% zoom, keyboard open,
Tab containment, Escape/Close focus return, unchanged URL/scroll, reduced motion,
and empty relationships. Preview authentication is blocked after declined login;
do not bypass it. Keep this follow-up draft until those checks are completed.

### Shortlist and buyer context (2026-10-30)

Reuse local shadcn Table and Checkbox plus ProductInspector/Sheet for a selectable
landscape table, with detailed cards as an alternate view. Adapt the bank's
semantic comparison table and contextual disclosure patterns. Selection is local
to the mounted landscape page, capped at four, retained across filters/view changes,
and removable even when hidden by filters. The count explicitly reports hidden
selections. Clear shortlist is separate from Reset filters. Navigation to Compare
passes explicit product IDs and the selected use case to the existing parser;
with Any use case, Compare applies its existing default, which readers must confirm.
Selections are not saved across page reloads. No inferred parity or new claims.

Vendor product sections reuse authoritative category buyerOwner/buyerQuestion
fields, labeling primary/adjacent membership and category-level context. Existing
ClaimList stays immediately below with provenance, dates and uncertainty labels.
No new source registry, dependencies, lockfile changes or security-rule changes.

Table overflow is contained on narrow screens; cards remain available. Controls
have visible focus, selection labels and 44px hit areas. Empty results retain the
shortlist; selection limits allow deselection. Browser checks remain pending for
responsive layouts/zoom, keyboard selection and removal, panel focus, reduced
motion, filter persistence and comparison navigation. Preview auth remains blocked;
source inspection and unit tests are not browser verification. Rollback reverts
this composition without data migration. These are draft changes, not shipped UI.
### Diagram label readability

Replace the fixed SVG orbit/circle text in AreaDiagram, IdentityStructureDiagram,
and CredentialChainDiagram with semantic HTML groups and numbered flow cards.
Reuse local card tokens and the UI bank's progressive-disclosure/grouping pattern.
Full labels and credential problems wrap inside content-sized nodes, including
unbroken names. Auto-fit grids respect the containing card width; the credential
sequence stacks on mobile. Do not shrink text, truncate names, or invent graph
edges for area membership. Preserve every existing destination and show missing
seed detail explicitly. No dependency or data changes and no added animation.

This affects domain/category examples, Connections and the cloud/app shortlist.
Responsive/zoom, long-label and keyboard browser verification remain pending;
source-level layout changes do not establish visual acceptance. Revert this
component change to roll back. Keep draft until review and browser verification.

### Research-page interaction sequence

Reuse the bank's progressive disclosure and navigation patterns with a small
server-rendered PageJourney composition. Domain, category and Connections pages
begin with three descriptive jump links: understand, explore, and inspect the
appropriate evidence or next destination. Targets are keyboard-focusable and
scroll-spaced; controls wrap and have visible focus and 44px minimum height.

Connections presents the identity model and leaked-key walkthrough before research
history. Domains present owner/budget early and products before reference terms;
detailed category workflows use native details/summary so readers can choose depth.
Evidence labels remain visible and no claims are hidden in accordions. Existing
routes and catalog stay authoritative; no additional dependencies or client state.
Browser checks for anchor focus, Back navigation, disclosure keyboard operation,
mobile/zoom and full-label fit remain pending. No animation is introduced.

### Task-based site menu

Replace the crowded 12-link desktop row and separate mobile details menu with
three primary destinations (Explore domains, Browse products, Compare) and a
consistent grouped Menu using the existing shadcn/Radix Sheet. Preserve all 12
routes under Explore, Learn, Plan, and Research, with descriptive labels and helper
text. Home and Search remain explicit. Only exact routes receive aria-current;
parent sections may be highlighted without claiming to be the current page.

Reuse Sheet dialog/focus/Escape behavior and close-on-link navigation via
SheetClose. Remove the obsolete inline Escape listener and menu icon CSS. Header
wraps at constrained widths; the sheet scrolls and uses full width on mobile.
Menu, Close and Search have 44px minimum targets; search text is visible from sm.
No routing, catalog, dependency or security changes. Browser QA still pending:
375/768/1280px, zoom, menu focus/close/Escape, navigation, current-page indication,
search and reduced motion. Protected-preview sign-in remains declined.

### Accessibility follow-up (2026-10-30)

Reuse/adapt the existing Table, Dialog, search and shortlist compositions, following
the workbench's data, feedback and keyboard-focus patterns. No new dependency,
research data, lockfile or scanning changes. Remove the second identical seven-step
Connections list; retain all destinations in the semantic numbered diagram and
update obsolete circle descriptions. Add named shortlist announcements, stable
focus after removal/clear, row headers and an opt-in labeled keyboard-scroll region
for the landscape table. Existing filter announcements and product-specific quick
view names were already present. Comparison already has caption/row/column headers.

Make the skip target focusable; add a base visible-focus outline; strengthen input
border tokens; enlarge dialog Close to 44px and respect reduced motion in dialog
and table transitions. Dismissing search returns focus to its trigger; selecting a
result preserves route navigation focus behavior. Result-view controls wrap.

Calculated token contrast (linear sRGB from OKLCH): muted text/background 6.61:1,
muted text/muted surface 6.10:1, focus/background 6.77:1. Input/background improves
from 1.32:1 to 3.95:1; dark input/muted surface 3.83:1. These calculations cover
these opaque token pairs, not every rendered element or full WCAG conformance.

Prior-head desktop browser QA at 1363px passed menu focus wrapping, Escape and
trigger focus return, menu navigation and closure, GitGuardian keyboard search,
page jumps, and unclipped credential diagram labels. Protected-preview sign-in
succeeded; older declined-login notes above describe earlier attempts. Current
follow-up requires exact-head CI and preview validation. Phone/tablet viewports,
200–400% zoom, OS reduced-motion and actual screen-reader speech remain manual
acceptance checks where the cloud browser cannot emulate them. Do not infer them
from source or unit tests. Rollback: revert this follow-up; no migration needed.

### Search on short viewports

Bound the search dialog and command flex container to the dynamic viewport height
minus two rem. Keep the input/Close row from shrinking and let results shrink and
scroll inside that boundary. Long search titles can wrap without widening the
row. This addresses the source-level risk of the former 20rem results list
plus input extending beyond a short or heavily zoomed viewport. Reuses installed
Command/Dialog; no packages, catalog or security changes. Actual mobile keyboard
and 200–400% zoom verification remains pending; this is not device-test evidence.

### Dashboard-style filter workspace

Adapt the UI bank's filterable collection, disclosure and feedback patterns using
installed shadcn Button, lucide X, native select and details/summary. No external
template code or new dependency is imported. Keep domain/category/product as the
primary path; use case and buyer form a visible buying-context group. Deployment,
identity scope and relationship controls move into Advanced filters, whose summary
always reports active refinements. Every active filter remains visible as a named
removable chip, including when Advanced filters is collapsed.

Removal uses the existing URL reducer, including its documented downstream resets,
and moves focus to the persistent result status before the chip disappears. Chips
wrap, retain 44px targets, and disable button motion under reduced-motion settings.
No research claims, rankings, shortlist persistence or evidence labels change.
Browser acceptance: keyboard disclosure; copied advanced-filter URLs retain visible
chips; chip removal updates results and URL; focus survives removal; shortlist stays
intact; mobile wrapping/zoom still requires manual device testing. Rollback reverts
this filter composition without data or package changes.

### Mischief UI: return to the page introduction

Adapt the Scroll to Top Button from Tinkerers Labs' Mischief UI on the long
Connections page only. Source: https://github.com/Tinkerers-Labs/mischief-ui/blob/92c335bf6910007b95e282a6e0a1168555b86cf1/registry/default/scroll-to-top-button/scroll-to-top-button.tsx.
MIT notice retained in licenses/mischief-ui-MIT.txt. Reuse existing lucide-react
and app tokens; no package installation or lockfile change. PageIntro accepts an
optional heading ID for the focus destination.

The control appears after 320px of scrolling, has a 48px target and a descriptive
accessible name, moves focus to the introduction before hiding, respects reduced
motion, and stays below modal overlays. Safe-area spacing and end-of-page padding
provide clearance. Hidden state is removed from keyboard and accessibility trees.
The scope omits upstream container/custom-icon options that this page does not need.
Status: draft preview adoption, not production. Verify visibility, activation and
heading focus in the preview; mobile/zoom and actual screen-reader speech remain
manual checks. Rollback removes this call site/component and optional heading prop.
