# KRU-78 public Academy links: verification and handoff

Verified 2026-10-13 against Market Map base `467cc6b2fd9e788aa376f983be880b37bdb33413` (includes merged comparison PR #52). Implementation is on a separate review branch; no merge or deployment performed.

## Change and reuse

Reuse `AcademyLinks`, its server-rendered summary cards, native anchors and existing ring/spacing tokens. Adapt only the anchor to a minimum 44px height and explicit focus ring. No new component, dependency, copied lesson body, catalog change, runtime fetch or progress synchronization. The consumer remains `app/categories/[slug]/page.tsx`. Owner: repository maintainer. Existing local UI-bank adoption and summary-card pattern informed this decision; no external component code copied.

## Acceptance evidence

| Acceptance | Evidence | Result |
| --- | --- | --- |
| Intended short previews | Unit contract checks all catalog categories, nine intended mappings, unique IDs and summaries under 240 characters | Pass locally |
| Unrelated/unknown categories omit cards | Unit checks every unrelated category and an unknown ID; browser checks PAM omission | Pass locally |
| Public destinations match lessons | All three URLs below returned HTTP 200 after apex-to-www redirects, with matching titles/headings and no login destination | Live HTTP/content smoke passed |
| Responsive and keyboard links | Production build at 375, 768 and 1280px: all nine categories, exact hrefs, link tab order, visible focus, 44px targets, no page overflow or browser errors | Pass locally |
| Keyboard activation | Enter follows exact destination using an explicitly synthetic intercepted target | Pass locally; not live Academy interaction verification |
| Reduced motion | Browser checks set reduced motion; links introduce no animation | Pass locally |
| Ownership and later work | See handoff below | Documented |
| Released Market Map → Academy flow | Market Map production URL and deployed SHA could not be established | Pending after authorized release |

Public destinations checked with curl (normal certificate validation):

- `https://byjoyaing.com/builder-academy/credential-risk`: “Credential to Identity Risk — Kristen Aing”; heading “A leaked secret is the beginning of the investigation.”
- `https://byjoyaing.com/builder-academy/identity-journey`: “Identity Journey Lab — Kristen Aing”; heading “Identity is more than a login.”
- `https://byjoyaing.com/ai-academy/journeys/source-verification`: “Source Verification Journey — Kristen Aing”; heading “Can you trust an AI-generated claim?”

The returned HTML identifies deployment `dpl_828zw1HEP59m3JDk7pzFkSZNC6ix`; its source commit was not established. Academy source routes were independently inspected at `ffeef14af8b61d2e0681611a4659f869da141bd2`. Source inspection and public HTML do not establish complete hydrated lesson usability. Earlier urllib requests returned 403; curl subsequently returned the expected public content for all three routes.

Checks passed: `npm run test:research-integrity` (7), `npm test` (79), `npx next typegen`, `npm run typecheck`, `npm run lint`, `npm run build` (330 generated pages), and `scripts/verify-academy-links.mjs` against the local production server. No new loading/retry state: links are static. Missing category mappings omit the section; destination outages remain ordinary external navigation failures, not a runtime dependency.

## Reproduce and release gate

Run `npm ci`, `npm run build`, then `npm run start -- --port 43123`. In another terminal with Playwright available, run `node scripts/verify-academy-links.mjs`. The optional `PLAYWRIGHT_MODULE` and `CHROMIUM_EXECUTABLE_PATH` variables support an externally installed test browser; no production dependency is added.

Manual check: open `/categories/secrets-management`, scroll to **Learn and practice**, Tab to **Follow a leaked credential**, confirm visible focus, and press Enter. Repeat with **Trace an identity through its lifecycle**. Open `/categories/aspm` for **Check the evidence behind a claim**; `/categories/pam` must omit the section. Repeat at mobile width.

After an approved release, record the real Market Map deployment URL and SHA, then repeat the flow without network interception on desktop/mobile with keyboard. Also run the existing `scripts/verify-comparison.mjs` against that deployment to finish KRU-76 production verification. Vercel project discovery in scope `krusty1` returned HTTP 403 (unauthorized); no Vercel CLI is installed. Repository metadata and inspected PR evidence did not supply a confirmed production URL. This blocks deployment verification, not the local checks or direct public Academy HTTP smoke. Do not mark this record production-complete.

## Evidence handoff and ownership

- Academy owns explanations, exercises and learner progress; Market Map owns reviewed market evidence and original source provenance. Technical Docs owns shared contracts/framework review metadata. Private Index stays private. None is queried privately by the Market Map runtime.
- [KRU-54](https://linear.app/krusty/issue/KRU-54) owns the future offline importer. Hand off a reviewed, versioned public-safe artifact with stable claim/source IDs, original URLs, observed/published/reviewed dates, review status, qualifications, rights constraints and correction/supersession relationships. Preserve Unknown, vendor-reported, stale and corrected states; importer contract review must precede implementation. This PR defines no replacement importer or schema.
- [KRU-61](https://linear.app/krusty/issue/KRU-61) owns later evidence exercises. Use explicitly synthetic fixtures or owner-reviewed public-safe projections, pin the artifact version and cite original sources. Academy owner reviews lesson interpretation; Market Map owner reviews claim/provenance meaning. No copied live catalog, automatic cross-repository writes or progress sync.
- Link metadata changes require Market Map review and a fresh public destination check. Framework mappings remain proposals until version/requirement/reviewer evidence is approved.

Rollback: revert this PR to remove the target-size adjustment and verification additions. Existing PR #50 links remain intact; no data migration or Academy change is required.
