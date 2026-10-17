# SecOps data infrastructure and detection engineering — evidence review

**Date checked:** 2026-10-14  
**Status:** Proposed typed taxonomy, awaiting human review.  
**Owner:** Security Market Map; supports issue #58.  
**Scope:** category definitions and buyer distinctions only. Vendor product capabilities remain **unknown** until original docs and review.  
**Rights:** link to originals and paraphrase narrowly; do not replicate SACR's rankings, charts, tables, or report text.

## Evidence and category distinctions

| ID | Source | Publisher; date | Supported scope | Evidence class and caveat |
| --- | --- | --- | --- | --- |
| SDPP-AN-1 | [The Rise of Security Data Pipeline Platforms as a Control Plane for the SOC](https://softwareanalyst.io/reports/the-rise-of-security-data-pipeline-platforms-as-control-plane-in-soc) | SACR / Aqsa Taylor, 2025-11-20, updated 2026-07-29 | Analyst framing: collection, normalization, enrichment, filtering, routing, telemetry health, and delivery to SIEM/data-lake/XDR tools | Analyst-reported; evaluation methods and vendor rankings are the publisher's conclusions, not independently reproduced |
| SDPP-AN-2 | [Market Guide 2025: The Rise of Security Data Pipelines](https://softwareanalyst.io/reports/market-guide-2025-the-rise-of-security-data-pipelines-how-siems-must-evolve) | SACR, 2025; exact publication date requires checking source | Pipeline vs analytics/storage separation and design tradeoffs | Analyst-reported; not standalone vendor product proof |
| DET-AN-1 | [The Future of Detection Engineering in Security Operations](https://softwareanalyst.io/reports/the-future-of-detection-engineering-in-security-operations) | SACR, 2026-03-17, updated 2026-07-29 | Detection content lifecycle, evidence integrity, tuning, and analyst case outputs | Analyst-reported; proposed category boundary, not a claimed standard |
| SDPP-ORG-1 | [Cribl Stream documentation](https://docs.cribl.io/stream/) | Cribl; publication unknown, checked 2026-10-14 | Primary documentation candidate to verify routes, sources, destinations and transformations | Candidate original documentation; do not publish feature claims before line-level review |
| DET-ORG-1 | [Anvilogic website](https://www.anvilogic.com/) | Anvilogic; publication unknown, checked 2026-10-14 | Primary product-evidence candidate for detection lifecycle and SIEM relationships | Candidate original documentation; full product capabilities and tier limits not verified |

**Additional vendor discovery leads from SACR (not new verified vendors):** Abstract Security, Axoflow, Beacon Security, CeTu, Databahn, Datadog Observability Pipelines, Realm Security, Tenzir, VirtualMetric. SACR also discusses Onum (CrowdStrike), Observo AI (SentinelOne), and Datable (Panther); verify legal entity and acquisition/closing status before adding or updating vendor IDs. Avoid treating historical acquired names as independent current competitors.

## Buyer-decision test

- **SDPP:** Security data arrives from many sources. The buyer needs reliable parsing, enrichment, cost-aware routing and verifiable delivery to detection and storage destinations. Compare native SIEM ingestion, third-party pipelines and self-built processing. Test schema-drift failure, destination outage, telemetry loss, replay and retention.
- **Detection engineering:** A SOC needs reproducible coverage of a defined behavior. The buyer evaluates version control, synthetic replay tests, rule CI, approvals, evidence and field-level quality. Compare SIEM-native rule authoring, dedicated detection lifecycle tooling and engineering-built CI.
- **Together:** A schema change can break otherwise correct detection logic. Test whether source data remains present and detections still fire after a transformation. **No performance improvement or ROI claim is proven by this taxonomy.**

## Publication guardrails

- Existing `siem`, `soar`, `cloud-detection`, `threat-intelligence`, `xdr` and `breach-simulation` remain canonical; the new categories model different jobs, not replacements.
- Only category/buyer/workflow metadata is proposed in this PR. There are no new vendor `implements` edges, benchmark rankings, scores, pricing statements or integration claims.
- Before future product-backed comparisons: original vendor evidence per feature, source type, date, edition, deployment boundary, rights, human review; unverified stays Unknown.
- **Checks requested:** `npm run test:research-integrity`, `npm test`, `npx next typegen`, `npm run typecheck`, `npm run lint`, `npm run build`. They have not been executed in this connector-only change. PR CI results must be inspected.
- Human review and approval precede merge and deployment; no new crawler, schema store, or cross-repo write.
