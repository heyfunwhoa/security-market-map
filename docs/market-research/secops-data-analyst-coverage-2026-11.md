# SecOps and data security analyst coverage

As of **2026-11-18**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2027-02-18**, or when a cited report is republished.

## Why

SecOps (10 categories) and data security (7) had mostly one analyst source per category, and four categories had none. This applies the same method used for identity and AppSec. Each claim is category-level framing from SACR, KuppingerCole and Forrester public pages, **preferring pages published in 2025–2026** at the owner's request, with every passage checked against the saved page text and then re-checked independently.

Canonical records: [typed data](../../lib/data/secops-data-analyst.ts). There are 27 sources and 28 claims, all `analyst` / `needs_review` with `capabilityId: null`.

## Coverage added

| Category | Claims | Sources (date) |
| --- | --- | --- |
| AI SOC investigation | 3 | KuppingerCole (May 2026); SACR (Aug 2025); Forrester (Jun 2026) |
| SIEM | 2 | SACR (Sep 2025); Forrester (Jun 2025) |
| XDR | 3 | KuppingerCole (Dec 2024, no newer KC page); Forrester ×2 (Feb and Jun 2026) |
| NDR | 3 | KuppingerCole (May 2026); Forrester ×2 (May and Oct 2025). Forrester's label is NAV. |
| Threat intelligence | 3 | KuppingerCole (Nov 2026); Forrester ×2 (Dec 2025, Jul 2026) |
| MDR | 3 | KuppingerCole (May 2026); Forrester ×2 (Feb 2025, Mar 2026) |
| SOAR | 1 | KuppingerCole (Apr 2026): "security automation, historically called SOAR" |
| Detection engineering | 1 | SACR (Jul 2026): market convergence, not a definition |
| Security data pipelines | 1 | Forrester (Nov 2024): the clearest definition found; no newer one |
| Privacy governance | 1 | Forrester (Jun 2025) |
| Database security | 1 | KuppingerCole (Apr 2026), framed as data-layer platforms, not database monitoring |
| DLP | 1 | Forrester (Jun 2025) |
| Encryption | 3 | Forrester ×2 (Sep 2025, Jan 2026); KuppingerCole (May 2026, crypto-agility) |
| Insider risk | 2 | Forrester ×2 (Jan and Sep 2026) |

**Gaps:**
- **Malware analysis:** no category-level page from any of the three firms.
- **Detection engineering:** no recent definition; the 2023 Forrester post was dropped for age.
- **Privacy governance, DLP and insider risk:** no recent KuppingerCole or SACR page.
- **Database security:** no database-specific recent page.
- **DSPM:** nothing added, because no strong KuppingerCole or Forrester DSPM page was found.

## What was excluded

- **Sponsored:** SACR "The SIEM Problem Has Become an Architecture Problem" (Datadog, Scanner), plus its companion Part II, which has vendor-level analysis; SACR "Building the Intelligence Layer for the Next Wave of DLP" (Cyera-supported); SACR "The New Data Security Maturity Model" (Cyera-sponsored).
- **Ranks vendors or is single-vendor:** SACR "AI SOC Market 2026 (Part 2)"; the Oracle AI World 2026 database recap; KuppingerCole Executive View, Rising Star and whitepaper pages.
- **Older pages, where recent ones exist:** 2020–2023 Forrester SOAR, NAV, DLP and insider-risk posts; 2021–2022 KuppingerCole privacy and database pages.
- KuppingerCole NDR Leadership Compass (lc80829), whose abstract has an apparent copy-paste error.
- Vendor names, placements, survey figures and breach costs in otherwise-cited pages.

## Research review record

- Topic: analyst framing of SecOps and data security categories.
- Owner: repository maintainer. Reviewer / decision: pending.
- Changed IDs: 27 sources and 28 claims in `lib/data/secops-data-analyst.ts`.
- Source type / evidence status: `analyst`; all claims `needs_review`.
- Published / observed / last checked: per source / 2026-11-18 / 2026-11-18.
- Rights: short paraphrases of copyrighted analyst pages.
- Unknowns: the gaps listed above.
- Consumer disposition: Security Market Map, update. Other consumers: no change.

## Acceptance evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Source review | Researcher check done; independent re-check pending; human review not run | Every passage matched against saved page text on 2026-11-18 |
| Integrity checks | Pass | `npm test` 714/714; `npm run test:research-integrity` 7/7 |
| Typecheck / lint / build | See PR | |
| Human review | Not run | Pending |
