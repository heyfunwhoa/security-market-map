# Category gaps, batch 2: trust, browser, pentest, ratings, awareness, plus Bay

As of **2026-11-23**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-23**, or sooner if a product is acquired, renamed, or repackaged.

## Why

Follow-up to the [AppSec category gaps](appsec-category-gaps-2026-11.md) batch. Five more categories had one to three vendors, and two newly launched companies (Bay and GhostEye) had no record.

Canonical records: [typed data](../../lib/data/category-gaps-batch2.ts), composed by [catalog](../../lib/catalog.ts). Three new vendors, five products, eight sources, eight claims. Bay and GhostEye have full profiles in [their own note](bay-ghosteye-profiles-2026-11.md) and [data file](../../lib/data/bay-ghosteye.ts). Existing records edited: Palo Alto Networks (adds `enterprise-browser` as adjacent) and Black Kite (positioning now sourced instead of "Unverified"). No feature-parity cells, scores or direct-competitor edges.

## Placement (zoom out → zoom in)

| Category | Buyer question | Added | How placed |
| --- | --- | --- | --- |
| Customer trust | How do prospects review our security without a questionnaire every time? | Drata, with its Trust Center built on SafeBase | Drata is primary in customer trust and adjacent to GRC and third-party risk. SafeBase is not a separate vendor; it is the acquired product. |
| Enterprise browser | How do we control work in the browser on managed and unmanaged devices? | Prisma Browser, under the existing Palo Alto Networks record | Formerly Prisma Access Browser, built on Talon. Not a separate Talon vendor. |
| Pentest program | How often can we test, and who does it? | Horizon3.ai (NodeZero), Cobalt | Horizon3.ai is autonomous; Cobalt is human-led PTaaS with an autonomous option. Both sit in the same category for different buying reasons. |
| Security ratings | What does the outside world see about our vendors? | Black Kite product record, under the existing vendor | Replaces an unsourced placeholder. |
| Security awareness | Would our people fall for a realistic attack? | GhostEye | Early-stage; adjacent to pentest programs because it runs live social engineering tests. |
| Agentic runtime enforcement | Can we stop a risky agent action on a laptop before it runs? | Bay | Endpoint-first agent security. Adjacent to endpoint security and AI governance. Pairs with the agent platforms in [MCP and agent security](mcp-security-scanners-2026-11.md). |

To zoom back out, open each category page, then its domain.

## Addendum, 2026-11-25: Strix and Tenzai in pentest programs

Two autonomous pentesting vendors were missing from the category. Both are added to the same [typed data file](../../lib/data/category-gaps-batch2.ts) as research candidates: two vendors, two products, five sources, five claims.

| Vendor | How placed | Evidence used |
| --- | --- | --- |
| Strix | Primary in pentest program; adjacent to DAST and SAST because it also reviews pull requests. Open-source first: Apache 2.0 agents, a GitHub Actions workflow, hosted Strix Cloud and a self-hosted enterprise option. | GitHub README and LICENSE (read directly), homepage |
| Tenzai | Primary in pentest program; adjacent to DAST. Enterprise-first, no open-source edition found. | Homepage, Nov 2025 seed press release, lead investor's launch post |

The two take different routes into the same budget. Strix starts with developers and CI. Tenzai starts with enterprise security teams. Horizon3.ai and Cobalt stay as they are. No ranking, parity cells or direct-competitor edges.

Not recorded as claims:

- Strix funding. Third-party trackers and blogs give different amounts, and no primary announcement was found.
- Strix usage counts. They come from the maker's own Product Hunt post.
- Strix homepage customer logos. The page says only "used by security teams at."
- Tenzai's HackerOne leaderboard and CTF ranking claims.
- Tenzai's deployment model, which the homepage doesn't state.

## Limits and open questions

- Bay and GhostEye limits are listed in [their profile note](bay-ghosteye-profiles-2026-11.md).
- The Black Kite product text comes from a review site; that claim is `needs_review`.
- Prisma Browser's rename date from Prisma Access Browser was not confirmed.
- Horizon3.ai list prices exist on AWS Marketplace but are not recorded as claims.
- SafeBase is still sold stand-alone per 2025 coverage; current packaging was not checked.
