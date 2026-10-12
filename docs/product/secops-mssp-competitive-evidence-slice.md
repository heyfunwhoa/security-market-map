# MSSP/MDR SecOps platform competition — LimaCharlie evidence slice

**Status:** Proposed editorial map, **not** approved catalog capability claims or a deployed comparison UI. **Compiled:** 2026-10-11. **Domain:** Security operations. **Audience:** learner, seller, marketer, engineer. **Source posture:** publicly published vendor/customer claims; no independent bake-off or competitor-specific lost-deal data.

## Why this slice

LimaCharlie sells programmable security operations infrastructure and an AI operations layer; competing categories differ depending on what a buyer wants to build, replace or keep. Treat **market overlap, workflow alternative, product replacement and verified displacement as different edges**. This document illustrates the Security Market Map's buyer/technology relationship model; it does not assign vendor feature checkmarks to unevidenced categories.

## Buyer decision → competing product category

| Buyer job | LimaCharlie position to investigate | Possible alternatives or complements | Caveat |
| --- | --- | --- | --- |
| MSSP runs SOC/MDR for many customers | Programmable SecOps Cloud Platform, API automation, tenant provisioning | [Stellar Cyber Open XDR MSSPs](https://stellarcyber.ai/mssps/); [Sekoia MSSPs](https://www.sekoia.com/solutions/mssp) | Both alternatives also **claim multitenancy and automation**; no unique capability or cost advantage established without workload tests. |
| Existing enterprise SOC stack | Ingest, respond and orchestrate across tools rather than necessarily replace them | Microsoft Sentinel/Defender, Palo Alto Cortex, Google SecOps, CrowdStrike and SentinelOne | Products may be competitors **or** integration/complement layers; validate buyer architecture and package. |
| Custom-built MDR / open architecture | Managed low-level security primitives and response vs self-maintained pipeline | Elastic, Wazuh, Security Onion, custom AWS/Linux/Kafka infrastructure | Recon is an example of displacement of a bespoke stack, not a measured victory over every OSS choice. |
| Security product builder | Embed endpoint data collection and actions vs implementing proprietary agent | Open telemetry shippers and self-built agents; endpoint OEM/licensing options | Blumira case supports a particular build/buy decision; doesn't prove SDK/API feature parity. |
| AI triage and autonomous SOC | Grid/agentic SecOps and programmable runtime controls | Dropzone AI, Prophet Security, 7AI, Tines, Torq | Some solve narrower investigation or orchestration jobs; do not collapse them into full platform substitutes. |

## Primary LimaCharlie cases: what is reported

| Evidence | Customer category | Published finding | Interpretation (separate) |
| --- | --- | --- | --- |
| [Recon Infosec, Aug 2023](https://limacharlie.io/blog/mdr-firm-saves-100k-per-year-with-limacharlie) | MDR/MSSP operator | Company reports ~$100K annual savings and ~98% improvement in detection/response timing after replacing a bespoke stack. | Potential TCO wedge; needs baselines, labor and architecture fit before generalizing. |
| [Soteria, Sep 2026](https://limacharlie.io/blog/soteria-mdr-case-study) | MDR and consultancy | Replaced a six-page **procedure** (not a measured elapsed-time baseline) with ~2-minute API provisioning; first spent two to three months with four people developing rules and learning telemetry. | Candidate operational-scale discovery: distinguish one-time engineering effort, later tenant provisioning and ongoing SOC work; no numeric speedup ratio can be computed from the published baseline. |
| [Blumira](https://limacharlie.io/blog/blumira-speeds-time-to-market-by-building-with-limacharlie) | Security product builder | Describes shipping an endpoint product to GA within five months on LimaCharlie technology. | Build-vs-buy/time-to-market wedge; no universal five-month launch promise. |
| [BLOKWORX, May 2025](https://limacharlie.io/blog/case-study-how-limacharlie-powers-blokworx-prevention-first-security-approach) | Layered MSP/MSSP | Describes tenant management, templated configurations and customized response automation. | Multi-level service-provider operating model; no externally verified cost-per-tenant metric. |
| [Thomas Murray, Jun 2025](https://limacharlie.io/blog/case-study-thomas-murray-saves-time-and-money-with-limacharlie-secops-cloud-platform) | Security services provider | Describes API-based customization and automation shortening selected development activities. | Technical operations/productization rather than solely analyst-seat cost. |
| [SECNAP, Aug 2026](https://limacharlie.io/webinars/inside-secnap-agentic-mdr-platform) | Agentic MDR builder | Webinar demonstrates/describes API-backed agent workflows with human review of response actions. | Agentic workflow evidence; not an independently benchmarked Grid competitive win. |

## Distinct market relationships (proposed vocabulary)

- `category_overlap`: MSSP Open XDR vs programmable SecOps platform may address the same workflow without product equivalence.
- `workflow_alternative`: DIY stack and hosted primitives can solve a similar operational job.
- `integration_or_complement`: A customer may retain Defender/CrowdStrike while operating parts of the pipeline on LimaCharlie.
- `customer_reported_outcome`: a dated statement, *linked to its case study and publisher*, not a seller guarantee.
- `direct_competitive_displacement`: **unknown** until a named evaluated alternative and actual decision evidence are present.

These are editorial proposals; do **not** add them as executable relationship enum values or SQL columns without schema and consumer review. Current core market taxonomy is in `lib/data`; current evidence/unknown requirements remain in `README.md`.

## Candidate entities and market learning paths

- Concepts: multi-tenancy, MDR, MSSP, SIEM, SOAR, Open XDR, telemetry storage, endpoint response, detection-as-code, build-vs-buy, agentic triage, human approval, cost per managed endpoint.
- Buyer roles are distinct from ICPs: SOC manager, MSSP founder/COO, detection engineer, platform architect, product engineering leader, economic buyer.
- ICP hypotheses (not inferred facts): (a) technically sophisticated MSSP scaling client count; (b) security-product builder needing an endpoint collection/action layer; (c) mixed-vendor enterprise team standardizing automation.
- Learning scenario: compare **build, buy, integrate** options for a *fictional* 50-customer MSSP. Unknown technical/per-user costs must stay Unknown until supplied by the learner.

## Source governance and consumption

The canonical research producer is [Account Signal Engine Research Hub](https://github.com/heyfunwhoa/account-signal-engine/tree/main/docs/research-hub); the shared versioned export contract is [Technical Docs research-evidence-v1](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/contracts/research-evidence-v1.schema.json). This Market Map document is a **manual interpretation**, not a persisted upstream evidence package or sync.

Before any catalog/UI feature: (1) source capture and rights, (2) version identity and content hash, (3) human claim review, (4) stable vendor/product/category IDs, (5) cross-reference integrity, (6) correction/retraction tests, (7) explicit status for unknown cells. Use [KRU-54](https://linear.app/krusty/issue/KRU-54/if-m1-consume-reviewed-evidence-offline-in-market-map-with-correction) and [KRU-57](https://linear.app/krusty/issue/KRU-57/if-m2-verify-authenticated-research-evidence-producer-and-smm-handoff); do not implement another collector in this repository.

**Limitations:** Public claims are mostly provider-published; no independently collected contract comparisons, gross-margin measurement, Grid cohort retention, win/loss logs, or representative buyer evaluation data. Do not infer market leadership or competitive wins from a published logo.
