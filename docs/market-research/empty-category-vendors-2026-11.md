# Vendors for categories that had none

As of **2026-11-09**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-09**, or sooner if a product is acquired, renamed, or repackaged.

## Why

Nine categories had no vendor in the catalog. Call prep had nothing to show for "who else is in this space." This change adds publisher-sourced vendor and product records for seven of them. The other two stay empty on purpose, because an existing editorial gate keeps them empty (see below).

Canonical records: [typed data](../../lib/data/category-fill.ts), composed by [catalog](../../lib/catalog.ts). There are 16 new vendors, 17 product records and 17 claims. Each claim has one original source. Sixteen claims are publisher-reported. One (Operant) is news coverage of a vendor launch. No feature-parity cells, scores or direct-competitor edges are added.

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

## Held back: digital risk protection and runtime-validated application security

`lib/catalog.test.ts` checks that no product lists either category as primary. Those tests were written to keep analyst sentences (SACR) off product cells. My vendor evidence comes from the vendors' own pages, not analyst rosters. Even so, lifting that gate is the owner's call, not mine. These candidates are research notes only and are not in typed data:

| Category | Candidate | Original source | What it says (paraphrased) |
| --- | --- | --- | --- |
| Digital risk protection | ZeroFox | https://www.zerofox.com/protection/ | DRP covering brand, domain, executive, social and dark web, plus EASM. |
| Digital risk protection | Doppel | https://www.doppel.com/doppel-pedia/what-impersonation-attack-protection | Detects cloned sites and fake profiles, correlates them and runs takedowns. |
| Digital risk protection | BrandShield | https://www.brandshield.com/ (comparison page) | Brand-focused DRP across web, social, marketplaces, ads and apps. |
| Runtime-validated AppSec | Oligo Security | https://www.oligo.security/blog/how-oligo-delivers-full-stack-runtime-security | Runtime inspection of which libraries execute, plus application detection and response. |
| Runtime-validated AppSec | Contrast Security | https://www.contrastsecurity.com/press/contrast-security-introduces-application-detection-and-response-adr-to-identify-and-block-attacks-and-zero-days-on-applications-in-production | ADR inside the app, announced 2024-08-06, with SIEM/XDR/CNAPP integrations. |
| Runtime-validated AppSec | Miggo Security | https://miggo.io/product/threat-response | Runtime detection and response for application-level attacks. |

To promote them, relax the three primary-category assertions for these two categories in `lib/catalog.test.ts`, then add the records in the same pattern.

## Limits and open questions

- All capability statements are vendor-reported and untested.
- Lasso's ownership was not re-checked. One third-party guide mentions Check Point. Confirm before quoting.
- Protect AI is now part of Palo Alto Networks, and Guardian is sold under Prisma AIRS. Confirm the current packaging.
- DataBahn's in-stream AI features were announced with early access. Core pipeline availability was not separately verified.
- None of these records makes two vendors direct competitors. Use the buyer's scenario and shortlist for that.
