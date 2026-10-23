# KRU-76 — Secrets Detection evidence explorer

Issue: https://linear.app/krusty/issue/KRU-76  
Owner: repository maintainer; human PR review pending.  
Baseline: `3ff1bc3c00e386d6104754f1641533909c08710c` (2026-10-13). PRs #49/#46/#50 merged; #48 closed superseded. Open #22 concerns domain lessons; #37 and Dependabot concern dependencies; #42/#45/#51 concern research documents. No open comparison implementation was found. This isolated branch changes category/comparison presentation and tests only. Catalog data remains unchanged.

## User task and reuse decision

Buyer question: find products for exposed-secret discovery, compare discovery separately from credential validity checks, and inspect the original dated statement before treating it as support.

Adapt `/categories/secrets-detection` and `/compare`; reuse `CompareWorkbench`, `ComparisonEvidence`, `StatusPill`, native select/details, and installed Button/Input/Label. Consulted local `docs/ui-bank-adoption.md` plus the portfolio design-lab comparison/filter/disclosure patterns. No upstream component copied, dependency added, graph rewrite or separate UI registry. Category diagram inputs now contain unique vendors because multiple products from the same vendor previously produced duplicate React keys; the graph component and catalog are unchanged.

The URL owns category, use case and selected product IDs. Category membership filters candidates but never creates capability evidence. Changing category clears selection. Products are deduplicated, validated and capped at four; `products=` explicitly means empty and survives reload. No mapped use case and no matching products have explicit recovery guidance. Transitions announce updating state; removal moves focus to the search field.

Evidence provenance, observed/retrieved/last-checked/published dates, source URL and scope qualifications remain attached to statements. Publisher-reported evidence stays publisher-reported. Existing `verified` records are labeled reviewed/independent-source records, not a new independent product test or named human approval. No review status is upgraded. Freshness is evaluated against the **catalog snapshot date**, not a live website refresh. No new review metadata or freshness pipeline is invented.

## Acceptance evidence

| Acceptance | Evidence |
| --- | --- |
| Category → relevant products → comparison | Category CTA presets TruffleHog, GitHub Secret Scanning, GitGuardian and Gitleaks; selection tests plus browser journey |
| Original-source handoff | Native source link retains the original claim URL; keyboard Enter navigated to TruffleHog README and received HTTP 200 at all four widths (test proxy caveat below) |
| Unknown vs supported | Discovery has existing statements; GitGuardian/Gitleaks validity-check cells remain Unknown; membership never fills cells |
| Vendor-reported / reviewed / stale | Visible evidence-state labels; synthetic rendering checks distinguish reviewed independent-source records from publisher-reported records and stale source warnings |
| Correction | Synthetic `fixture-claim` support → superseded support + `fixture-correction` denial yields `not_supported`; active result excludes the prior claim, history retains it and its URL. Without replacement the result is Unknown |
| Missing source | Registry entry missing → Unverified, visible warning, original claim URL retained; no fabricated publisher/freshness |
| Empty/recovery | No-match Clear search; removal of all products/reload; unmapped category; malformed/duplicate query values covered |
| Responsive/keyboard | Chromium 153, widths 375/768/1280/640, height 900, reduced motion: category entry via Tab/Enter, source disclosure Enter/Space, source-link Tab, visible focus, table ArrowRight scrolling, search/add/remove and focus recovery; no page overflow or app console errors |
| Zoom/reflow | 640 CSS-pixel reflow tested (equivalent available layout width of a 1280px viewport at 200% zoom); actual browser zoom and screen-reader testing not performed |
| Production | **Not deployed or verified.** All application browser evidence is local; a production build is not a deployed release |

Correction fixtures are synthetic and do not enter `lib/data` or a public demonstration route. This verifies display/selection behavior, **not** correction ingestion, durable audit storage or cache invalidation across services. KRU-54 remains the offline-importer owner.

## Commands

All passed on the final implementation tree: `npm run test:research-integrity` (7), `npm test` (76), `npx next typegen`, `npm run typecheck`, `npm run lint`, `npm run build` (330 generated pages). `git diff --check` passed. Browser acceptance passed against both local dev and the local optimized build served with `npm run start`. See PR for head and hosted check status.

Browser runner: start the app locally with `npm run dev` (or `npm run start` after building), then `node scripts/verify-comparison.mjs` with an independently installed Playwright. Optional environment variables:

- `PLAYWRIGHT_MODULE`: path to an installed Playwright module (default `playwright`).
- `CHROMIUM_EXECUTABLE_PATH`: existing Chromium binary (default Playwright's installed browser).
- `COMPARISON_BASE_URL`: default `http://localhost:43123`.
- `COMPARISON_ARTIFACTS`: output folder for screenshots (default `/tmp/kru76-comparison`).
- `COMPARISON_VERIFY_ORIGINAL_SOURCE=1`: also activate the original-source link and require HTTP 200.
- `COMPARISON_PROXY`: optional test-environment proxy, with localhost bypassed.
- `COMPARISON_TEST_PROXY_TLS=1`: only for an intercepting test proxy whose CA is unavailable to the browser. Allows that test context to navigate HTTPS; never changes application TLS behavior and does not verify publisher TLS security.

The default Playwright browser archive was truncated in this environment. Verification instead used a separately installed packaged Chromium binary, outside the repository. No app package or lockfile changes. The original TruffleHog README URL returned HTTP 200 through the environment HTTP client. Chromium also received HTTP 200 at the original URL when waiting for navigation commit, using the test proxy TLS option. Full publisher DOM loading stalled behind that proxy; publisher-page rendering and TLS security are not claimed verified. The local source URL, keyboard link access and provenance were verified. Human review, full publisher-page rendering in a normal browser, preview and production verification remain outstanding.

## Try it

1. Check out this PR branch; run `npm ci`, then `npm run dev`.
2. Open `http://localhost:43123/categories/secrets-detection`.
3. Select **Compare secrets detection products**.
4. Compare **Secret discovery** with **Secret validity check**. Unknown is not a claim of absence.
5. Expand **Supporting sources** under TruffleHog, read its dates and qualifications, then follow **TruffleHog README** to the publisher.
6. Remove one product, search for another, and add it. Search for `zz-no-such-product`, then Clear search. Remove all products and reload to confirm the empty state.
7. Keyboard: Tab to the category CTA and Enter; Tab to source disclosure, Enter/Space; Tab to its original-source link. On a narrow screen, focus the labeled comparison region and use arrow keys to scroll.
8. Run `npx vitest run lib/comparison-evidence.test.ts` for the synthetic correction, reviewed/stale and missing-source cases. These fixtures deliberately do not alter live catalog records.

Rollback: revert the focused PR. No migrations, ingestion jobs, external writes, new storage, catalog changes, private runtime dependencies, or deployed changes. Existing Academy links are preserved without editing Academy.
