# AppSec analyst coverage

As of **2026-11-18**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2027-02-18**, or when a cited report is republished.

## Why

The AppSec domain had 9 analyst claims across 11 categories, most with a single source. This applies the same method used for identity (see [ISPM and WIM research](ispm-wim-categories-2026-11.md)): category-level framing from SACR, KuppingerCole and Forrester public pages, each passage checked against the saved page text, plus an independent re-check.

Canonical records: [typed data](../../lib/data/appsec-analyst.ts), composed by [catalog](../../lib/catalog.ts). There are 20 sources and 21 claims, all `analyst` / `needs_review` with `capabilityId: null`.

## Coverage added

| Category | Claims added | Sources |
| --- | --- | --- |
| SAST | 2 | Forrester (definition, Jan 2026); SACR (AI-generated code, Nov 2025) |
| SCA | 3 | Forrester ×2 (inventory and licenses; SBOM and reachability); SACR (Black Hat 2026) |
| ASPM | 1 | Forrester (context-based prioritization). Forrester's own label is agentic development security. **Weak:** no public ASPM definition was found from any of the three firms. |
| API security | 4 | Forrester ×2 (definition; eight components); KuppingerCole ×2 (lifecycle; APIs and AI) |
| WAF / WAAP | 3 | Forrester ×2 (web application protection platform definition; consolidation); KuppingerCole (WAAP vs WAF) |
| AI application security | 4 | KuppingerCole ×2 (generative AI defense); Forrester (AI red teaming); SACR (semantic risk) |
| Software supply chain | 4 | Forrester ×2 (pipeline scope; lifecycle roles); KuppingerCole (2023); SACR (agent components) |

**Gaps (nothing usable found):**
- **Application runtime protection (ADR, RASP):** the only Forrester page is from 2018 and is about one acquisition; SACR's mention is vague.
- **IAST:** no public page from any of the three firms.
- **DAST:** deliberately left without category claims. An existing test in `lib/catalog.test.ts` keeps DAST claim-free.

## What was excluded

- Sponsored or single-vendor pages: SACR "Deep Dive Into The Security for AI Ecosystem" (sponsors shout-out) and SACR "Beyond the Action" (mostly one vendor). KuppingerCole Executive View and Rising Star pages are single-vendor by design and were not used.
- KuppingerCole "Short Summary", "Interesting Facts" and "Notable Quotes" text, which looks machine-generated.
- KuppingerCole's 2026 software supply chain Leadership Compass (`lc81184`): the page served only German, and a translation would be ours, not the publisher's.
- Vendor names, satisfaction scores, savings figures, prices and breach-cost numbers in otherwise-cited posts.

## Seat targeting (blocked)

Vendor seat targeting for API security, WAF/WAAP, AI application security and software supply chain could not be done: every vendor host was refused by the research session's network policy. Ownership changes that the template (step 9) asks to confirm from vendor pages are **unverified**: Noname and Akamai, Robust Intelligence and Cisco, Imperva and Thales, Traceable and Harness, and possibly Lakera and Check Point.

## Research review record

- Topic / buyer decision: how analysts frame each AppSec category the map uses.
- Owner: repository maintainer. Reviewer / decision: pending.
- Changed IDs: 20 sources and 21 claims in `lib/data/appsec-analyst.ts`.
- Source type / evidence status: `analyst`; all claims `needs_review`.
- Published / observed / last checked: per source / 2026-11-18 / 2026-11-18.
- Rights: short paraphrases of copyrighted analyst pages; no full text reproduced.
- Unknowns: categories with no analyst framing (runtime protection, IAST); ASPM has only indirect framing.
- Consumer disposition: Security Market Map, update. Other consumers: no change.

## Acceptance evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Source review | Researcher check done; independent re-check recorded below; human review not run | Every passage matched against saved page text on 2026-11-18 |
| Integrity checks | Pass | `npm test`; `npm run test:research-integrity` 7/7 |
| Typecheck / lint / build | See PR | |
| Human review | Not run | Pending |
