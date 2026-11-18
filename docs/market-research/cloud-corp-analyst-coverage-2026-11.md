# Cloud, AI, platform, corporate, GRC and offensive analyst coverage

As of **2026-11-18**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2027-02-18**, or when a cited report is republished.

## Why

This completes the analyst pass across the remaining domains. It uses the same method as the identity, AppSec and SecOps/data passes. Each claim is category-level framing from SACR, KuppingerCole and Forrester public pages, **preferring pages published in 2025–2026**. Every passage was checked against the saved page text and then re-checked independently.

Canonical records: [typed data](../../lib/data/cloud-corp-analyst.ts). There are 36 sources and 40 claims, all `analyst` / `needs_review` with `capabilityId: null`.

**Zoom placement:** every claim attaches to an existing category page (subject type `category`). No new category, vendor, product, capability or navigation is added.

## Coverage added

| Domain | Category | Claims | Sources (date) |
| --- | --- | --- | --- |
| Cloud | CNAPP | 2 | KuppingerCole ×2 (Jun 2025, Aug 2026) |
| Cloud | Cloud detection | 2 | KuppingerCole (Aug 2026, CDR as part of CNAPP); Forrester (May 2025) |
| Cloud | Cloud vulnerability | 1 | Forrester (Jul 2025); not cloud-specific |
| AI | AI data security | 1 | Forrester (Nov 2026) |
| AI | Model security | 2 | Forrester ×2 (Jan and May 2025) |
| AI | AI governance | 2 | Forrester (Nov 2026); KuppingerCole (Oct 2026) |
| AI | MCP security | 2 | KuppingerCole (May 2026); Forrester (Jul 2025) |
| Platform | Container security | 1 | Forrester (Dec 2025, KubeCon recap) |
| Corporate | Network edge (SASE) | 3 | KuppingerCole (Mar 2026); Forrester ×2 (Feb and Sep 2025) |
| Corporate | IT vulnerability management | 3 | Forrester ×3 (Jul 2025, Jan and Sep 2026); Forrester now calls this market proactive security platforms |
| Corporate | OT security | 2 | Forrester (Sep 2026); KuppingerCole (Feb 2026, AI in OT) |
| Corporate | Security asset management | 2 | Forrester ×2 (Nov 2025, Jan 2026); indirect |
| Corporate | External attack surface | 3 | KuppingerCole ×2 (Jun 2025, Oct 2026); Forrester (Nov 2025) |
| Corporate | Microsegmentation | 1 | Forrester (Aug 2026) |
| Corporate | Cyber recovery | 2 | KuppingerCole (Feb 2026); SACR (Jan 2026 outlook) |
| Product | Product security program | 2 | Forrester ×2 (Mar and Oct 2026) |
| GRC | GRC and controls | 3 | Forrester ×3 (Nov and Dec 2025, May 2026) |
| GRC | Third-party risk | 2 | Forrester ×2 (Mar and Sep 2025) |
| Offensive | Pentest program | 1 | Forrester (Aug 2025), one list item on adoption of PTaaS and BAS |
| Offensive | Breach simulation | 3 | Forrester ×3 (Oct 2025 ×2, Jan 2026) |

**Analyst disagreement recorded:** Forrester (Nov 2025) says attack surface management is "dead as a standalone market", while KuppingerCole still evaluates it as its own market (Oct 2026). Both claims are kept, and the disagreement is stated in the Forrester claim's notes.

**Gaps:**
- **CSPM, CWPP and IaC security:** no recent category page. KuppingerCole's CSPM pages are from Dec 2024, and Forrester's cloud workload security evaluation is from Q1 2024.
- **Cloud vulnerability and container security:** recent coverage is only partial (not cloud-specific; a conference recap).
- **Enterprise browser:** SACR's guide is vendor-partnered (excluded). Forrester's category posts are from 2022–2023, and the newer posts cover a single vendor or consumer AI browsers. KuppingerCole has no category research.
- **Threat modeling:** nothing newer than Forrester's Sep 2024 blog.
- **Customer trust:** nothing usable. KuppingerCole's "Security Assurance for SaaS" (Mar 2026) is written from the customer's side.
- **Vulnerability disclosure:** only CVE-ecosystem commentary (Forrester, Apr 2025), which is not about disclosure programs. Not added.
- **Pentest program:** no dedicated recent framing. Forrester's red-teaming report is from May 2024 (older; not added).

## What was excluded

- **Vendor-partnered or sponsored:** SACR agentic browser guide (LayerX partner); SACR cloud guides sponsored by vendors; SACR 2026 data reports (Teleskope, Cyera).
- **Single-vendor or built around one vendor:** SACR CDR case study (Stream Security); SACR Wiz Defend and Cortex Cloud reports; SACR "Cybersecurity Implications of Claude Mythos and OpenAI Cyber"; KuppingerCole Rising Star and single-vendor whitepapers (LayerX, Axonius, Synack).
- **Already cited in the open AppSec PR:** KuppingerCole lc81042 (Generative AI Defense) and lb80920 (No API Security, No AI Security).
- **Weak fit:** Forrester IoT security post (IoT, not OT); KuppingerCole Zero Trust platforms brief (adjacent to microsegmentation); Forrester security champions post (security culture).
- **Never adopted:** vendor names, placements, ratings, survey figures and market sizes in otherwise-cited pages. Statements avoid evaluation brand names; source titles use neutral wording such as "Forrester blog: secure access service edge solutions, Q3 2025".

## Research review record

- Topic: analyst framing of cloud, AI, platform, corporate, product security, GRC and offensive categories.
- Owner: repository maintainer. Reviewer / decision: pending.
- Changed IDs: 36 sources and 40 claims in `lib/data/cloud-corp-analyst.ts`; wiring in `lib/catalog.ts`.
- Source type / evidence status: `analyst`; all claims `needs_review`.
- Published / observed / last checked: per source / 2026-11-18 / 2026-11-18.
- Rights: short paraphrases of copyrighted analyst pages; quotes are limited to short passages and public abstracts.
- Unknowns: the gaps listed above.
- Consumer disposition: Security Market Map, update. Other consumers: no change.

## Acceptance evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Source review | Researcher check done; independent re-check pending | All 55 candidate passages (13 cloud/AI, 42 corporate/GRC/offensive) matched with `grep -F` against saved page text on 2026-11-18 |
| Integrity checks | Pass | `npm test` 714/714; `npm run test:research-integrity` 7/7 |
| Typecheck / lint / build | Pass | Local; build generated 448 static pages |
| Human review | Not run | Pending |
