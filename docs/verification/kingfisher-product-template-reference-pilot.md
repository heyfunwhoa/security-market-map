# Kingfisher reference pilot: Product Research Page v1 acceptance

Status: review checklist, **not** a claim of technical detector completeness. Reviewed 2026-10-30.

This is the first worked example of [Product Research Page Template v1](../product/product-research-page-template-v1.md). Kingfisher is an **existing product enrichment** pilot, not a template-specific architecture. The same presentation standards must support new vendors, new products under established vendors and commercial products without forcing a Detect → Validate → Map → Triage → Revoke story.

## Canonical references
- Vendor: `mongodb`; product: `kingfisher`; category: `secrets-detection`.
- Product route: `/products/kingfisher`; vendor and category navigation should link there.
- Upstream: https://github.com/mongodb/kingfisher
- Technical owner: https://github.com/heyfunwhoa/detector-coverage-atlas
- Atlas first-party source intake: https://github.com/heyfunwhoa/detector-coverage-atlas/pull/69
- Market Map foundation: https://github.com/heyfunwhoa/security-market-map/pull/111
- Linear intake: https://linear.app/krusty/issue/KRU-188

## Acceptance matrix
| Gate | Testable acceptance | Evidence status |
| --- | --- | --- |
| Identity | Exactly one canonical MongoDB/Kingfisher record, valid category and URL | Existing catalog and tests; recheck on current main |
| Journey | Category → vendor → individual Kingfisher page → original source | Implemented; verify production browser |
| Concept | Explain each stage and distinguish candidate detection from validation, access mapping, triage and explicit revocation | Implemented as educational workflow, not a scanner test |
| Evidence | Claim has source and date; vendor-published distinct from verified; absent capability stays Unknown | Source-linked UI implemented; review claim coverage |
| Focus UX | Overview works without interaction; stage detail provides boundaries and clear controls | Component implemented; check keyboard, focus and responsive behavior |
| Specialist handoff | Atlas rule-level details remain separate and `not_evaluated` until complete validated ingestion | Initial bounded extraction merged; broader import remains outstanding |
| Licensing | Preserve upstream / imported Betterleaks license distinctions rather than calling whole bundle Apache-only | Detailed follow-up needed |
| Release | Typecheck, lint, tests, build, security and mobile/keyboard/zoom verification for current release | Record only exact run evidence; do not infer from historical green PR |
| Repeatability | Reapply core fields and page parts to commercial and new-vendor cases without inventing stages | Future separate pilots |

## What Kingfisher does NOT prove
- No full Kingfisher rule inventory or independently measured effectiveness.
- First-party rule ID extraction is not the larger imported Betterleaks bundle.
- No live validation or revocation is authorized by this page.
- This pilot alone does not validate the new-vendor or new-product workflows.

## Next review steps
1. Manually check the deployed Kingfisher page on desktop/phone, keyboard, at 200% zoom, source links and stage focus.
2. Review the Market Map canonical claim/source ledger and note unsupported gaps as Unknown.
3. Run the exact-current-head catalog and UI tests in the existing release process. Attach run URLs and actual results to KRU-188 or its follow-on.
4. Collect one UX friction observation and one evidence-provenance observation; revise the reusable template only for a demonstrated cross-product need.
5. Separately execute Atlas M2 for imported Betterleaks rules and optional analyzer mapping. Never block product-page template acceptance on full technical ingestion.
