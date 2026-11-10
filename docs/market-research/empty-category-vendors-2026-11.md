# Vendors for categories that had none

As of **2026-11-09**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-09**, or sooner if a product is acquired, renamed, or repackaged.

## Why

Nine categories had no vendor in the catalog. Call prep had nothing to show for "who else is in this space." This change adds vendor records for all nine. Seven are backed by publisher sources. The other two are backed by public analyst material and filled at the vendor level only, so the existing product gate stays in place.

Canonical records: [typed data](../../lib/data/category-fill.ts), composed by [catalog](../../lib/catalog.ts). There are 18 new vendors, 18 product records and 23 claims, plus one existing vendor (Recorded Future) newly linked to digital risk protection. Each claim has one original source. Analyst placements are vendor-reported unless the analyst's own public page is cited. No feature-parity cells, scores or direct-competitor edges are added.

## Placement (zoom out → zoom in)

| Category (zoom level: category) | Buyer question | Vendors added | How placed |
| --- | --- | --- | --- |
| Security data pipeline platforms | How do I get the right telemetry to the right tool at a cost I can afford? | Cribl, Tenzir, DataBahn (primary). Panther (adjacent) | Pipelines sit before the SIEM. Panther is a SIEM, so it is adjacent only. |
| Detection engineering lifecycle | How do we build, test and ship detections as code? | Anvilogic, SOC Prime (primary). Panther, Tenzir (adjacent) | Rule libraries and pipeline tools are not interchangeable. |
| Continuous threat exposure management | Which exposures matter first? | XM Cyber, Brinqa, Nucleus Security (all adjacent) | The catalog defines CTEM as a program, not a product. Its tests keep vendors and products off CTEM as a primary category. These tools support the program. |
| Identity orchestration and authorization | Who decides what an identity can do, outside the directory? | Strata Identity, Cerbos, AuthZed | Orchestration (Strata) and policy engines (Cerbos, AuthZed) are different jobs. Neither is IGA. |
| MCP and tool security | Which MCP servers and tools can agents reach, and under what policy? | Lasso Security, Operant AI | Both are gateway-style. A gateway sees traffic. It does not see why the agent acted. |
| Model and infrastructure security | Is the model artifact safe to deploy? | Protect AI Guardian, under the existing Palo Alto Networks record | Reuses the Palo Alto Networks vendor rather than making a duplicate Protect AI vendor. |
| AI governance | What AI do we run, and was it approved? | Credo AI, Holistic AI | Governance records the decision. It does not block a tool call. |

To zoom back out, open each category page, then its domain. Each vendor page links back to all of its categories.

## Digital risk protection and runtime-validated AppSec: analyst-backed, vendor level only

`lib/catalog.test.ts` blocks any product from listing either category as primary. That gate keeps analyst sentences off product cells, and I left it in place. Instead, these two categories are filled at the vendor level, using public analyst material:

| Category | Record | Analyst basis (public part only) | How placed |
| --- | --- | --- | --- |
| Digital risk protection | Forrester category claim | Forrester's public blog on its Q3 2026 External Threat Intelligence Wave says the Wave breaks DRP into brand protection, executive protection and fraud intelligence. The report itself is client-only. | Category claim, `needs_review`. No scores. |
| Digital risk protection | Recorded Future (existing vendor) | Recorded Future's press release says it was named a Leader in that Wave. | DRP added as adjacent. Vendor-reported. |
| Digital risk protection | ZeroFox (new vendor) | ZeroFox's own page says Gartner and Forrester recognize it in DRP. The analyst documents themselves were not reviewed. | Vendor-level primary. No product record. |
| Runtime-validated AppSec | Contrast Security (new vendor and product) | Contrast says Gartner's 2026 Hype Cycle for Application Security names it a Sample Vendor for application detection and response (ADR). | Product is primary in application runtime protection and adjacent to runtime-validated AppSec. |

Not added, because no SACR, Gartner or Forrester source was available to me: Doppel, BrandShield, Oligo and Miggo. I couldn't fetch the SACR DRP and RVAS reports from here, so any vendors those reports profile still need to be pulled by hand.

### Vendor-reported analyst mentions for the other fills (not separate claims)

- Nucleus Security: Gartner Exposure Assessment Platforms Magic Quadrant, Challenger (Nucleus site).
- Credo AI: Gartner Cool Vendor 2025, AI Cybersecurity Governance (Credo AI press release).
- Holistic AI: named in Gartner's first Magic Quadrant for AI Governance Platforms (Holistic AI blog).
- Operant AI: representative vendor in Gartner's AI TRiSM Market Guide (per Pure AI coverage).
- Lasso Security: Gartner Cool Vendor for AI Security, 2024 (Lasso press release).

## Limits and open questions

- All capability statements are vendor-reported and untested.
- Lasso's ownership was not re-checked. One third-party guide mentions Check Point. Confirm before quoting.
- Protect AI is now part of Palo Alto Networks, and Guardian is sold under Prisma AIRS. Confirm the current packaging.
- DataBahn's in-stream AI features were announced with early access. Core pipeline availability was not separately verified.
- None of these records makes two vendors direct competitors. Use the buyer's scenario and shortlist for that.
