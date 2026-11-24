# SecOps product profiles (2026-11)

**Date checked:** 2026-11-24. **Status:** research candidates; vendor-reported only; human review pending. **Depends on:** PR #248 (products and the `uc-alert-investigation` use case).

## What this adds

Full product research pages for four products in the alert-investigation use case, in the same shape as the six CIAM profiles (#250): how it works, buyer and economics, limitations, evidence and pilot questions.

| Product | Role in the alert path | Customer story | What drives the bill |
| --- | --- | --- | --- |
| Stairwell | File history and re-analysis beside the EDR | FOX | Says no extra storage or ingestion fees; per-asset model not re-read |
| Google SecOps | SIEM and SOAR that open and work the case | Pasco Sheriff's Office | Packages priced on ingestion volume |
| Cortex XSOAR | SOAR playbooks | Sitecore | Yearly license per user |
| Tines | Workflow automation | R3 | Free Community Edition; paid editions; usage-based AI credits |

## Placement (zoom out → zoom in)

- **Domain:** Security operations → **use case:** `uc-alert-investigation` → **product pages** at `/products/<slug>`. The breadcrumb goes back to the use case, so it's easy to zoom out again.
- **Reused:** the CIAM profile shape (`MarketProfile`, now exported), `registerProductEvidence`, and the existing product page. The market-context card was split out into a generic `components/market-context.tsx`, and the CIAM card now wraps it. No new navigation.

## Evidence and uncertainty

- Every URL and vendor statement comes from a search excerpt, not a full page read.
- Buyer, trigger, control, evidence, limitation and pilot questions are editorial. They aren't vendor claims and haven't been tested.
- Stairwell's pricing page (per asset, billed annually) didn't come up in search, so the profile cites the storage page and says so.
- Customer stories are vendor-published. The figures in them aren't independently verified.
