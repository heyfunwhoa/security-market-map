# Product Research Page Template v1

Status: reusable product onboarding contract, implemented baseline is Kingfisher + GitGuardian Developer Endpoint Protection + Aikido Device Protection. This document describes the existing routes; it does not claim all future product pages use the template automatically.

## Ownership
- Canonical vendor/product/category records and claims live in the Market Map catalog.
- `app/products/[slug]/page.tsx` currently owns presentation and an explicit supported-slug registry in `lib/product-research.ts`; do not insert unreviewed product names without a page review.
- Technical detector implementations and analyzer relationships live in Detector Coverage Atlas. Comparison is a secondary journey and cannot infer feature support from vendor or category membership.

## Intake decision
1. Search existing vendor/product IDs, aliases, issue, PR and source records first.
2. Select *new vendor + product*, *existing vendor/new product*, or *existing product enrichment*. Preserve canonical IDs and never clone entries for landing-page convenience.
3. Confirm correct existing category and buyer question. Creating a new category requires its own taxonomy review.
4. Collect primary official sources, edition/release, license, observed date, qualifiers and implementation scope. Missing documentation is Unknown; vendor statements are vendor-published, not verified tests.
5. Decide whether the product has genuine staged workflow data appropriate for `ProductFocus`. Avoid fake process steps.
6. Include technical atlas handoff only when target data exists or transparently says `not_evaluated`.

## Required product journey
- Category → vendor → individual product → how it works → risks and unknowns → evidence source → pilot questions → optional specialist Atlas / comparison.
- Canonical breadcrumb from `components/breadcrumbs.tsx`; anchored responsive section links from `ProductSectionNav`.
- General explanation and limitations must be readable without interaction. `ProductFocus` adds progressive inspection without pretending to run tools.
- `ProductEvidenceExplorer` keeps claim, source and date visible when collapsed; details show qualifiers and source type. Missing claims render Unknown.
- Mobile horizontal section nav must not obstruct content. Use `PRODUCT_ANCHOR_CLASS` for scroll clearance and focus affordances.
- No React Flow for a linear sequence. Consider real branching graph only when source-pinned relationships exist, with textual equivalent.

## Developer checklist for one addition
- [ ] One canonical vendor ID and product ID; valid category and source references
- [ ] Source registry and product-specific atomic claims, qualifiers, edition/version and review date
- [ ] Product overview in clear language, actual control boundaries and limitations
- [ ] Accurate breadcrumb and section links, direct original-source links
- [ ] Stage selector only if meaningful, including all/previous/next and remaining risk
- [ ] Empty/unknown/not_evaluated states and attribution remain honest
- [ ] Cross-repo ownership and link documented without copying rule-level data
- [ ] Unit + catalog integrity + lint + typecheck + build + security workflows
- [ ] Real browser at 320px, 375px, tablet, desktop and 200% zoom; keyboard/focus; source link checks
- [ ] Record tests passed / failed / not run; review PR, human approval before merge or deploy; smoke test after release

## Reuse constraints
Use already installed shadcn/Radix components; do not introduce a second primitive library. Borrow *patterns* from Portfolio breadcrumb, Detector Atlas evidence explorer, Account Signal Engine source reviews. Preserve existing local design tokens and licenses. A source link is not a license to duplicate code unreviewed.

## Definition of Done
The product's own page communicates its job, boundaries, source evidence and next evaluation action without the comparison table. All supported claims have source provenance; missing evidence stays Unknown. A reviewer can follow the page and its links by keyboard and at mobile widths. PR CI and deploy status must be verified independently.
