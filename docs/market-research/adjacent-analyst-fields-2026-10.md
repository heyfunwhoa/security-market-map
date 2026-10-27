# Adjacent analyst fields — 26 Oct 2026

Status: researched. Owner: unassigned. Reviewer: unassigned. Next editorial review: 2026-11-26. Stage is researched. This note is not catalog truth; the typed claims in `lib/data` are the map.

Private Technical Docs baseline and the Research Evidence Boundary ADR were not available in this workspace. This brief follows the local playbook and contributing checklist. It does not claim those private documents were applied.

## Buyer decision

A buyer comparing vulnerability management, email security, the network edge, SIEM, telemetry pipelines, detection engineering, cloud detection, or CNAPP needs the field named before any product is treated as a substitute. Category membership is not a capability cell and not a direct-competitor edge.

## What was added

| Field | Catalog subject | Source retrieved 26 Oct 2026 | Bound |
| --- | --- | --- | --- |
| CNAPP life cycle | category `cnapp` | [Gartner Market Guide abstract, 5 Aug 2025](https://www.gartner.com/en/documents/6811634) | Life-cycle sentence only. Overlap notes and representative vendors were not retrieved. |
| Continuous threat exposure management | new category `ctem` | [Gartner roadmap abstract, 26 Aug 2025](https://www.gartner.com/en/documents/6884566) | Pivot away from traditional vulnerability management. No vendor named. No missing-patch cell. |
| Security service edge | existing category `network-edge` | [Gartner buyers' guide abstract, 28 Aug 2025](https://www.gartner.com/en/documents/6892266) | Procurement sentence only, low confidence. No new SSE category. Criteria and vendors not retrieved. |
| SIEM | category `siem` | [Gartner Critical Capabilities abstract, 13 Oct 2025](https://www.gartner.com/en/documents/7054698) | Detection, investigation, response, system of record, and compliance mandates. Inclusion list and scores not imported. |
| Email security selection | category `email-security` | [Gartner buyer's guide abstract, 3 Feb 2026](https://www.gartner.com/en/documents/7396830) | Questions about existing investments. No vendor, block, or quarantine. |
| Email security definition | category `email-security` | [SACR, 29 Jun 2026, updated 29 Jul 2026](https://softwareanalyst.io/reports/from-perimeter-to-proof-the-new-architecture) | Definition and four different parts. Vendor write-ups and detection rates are not cells. |
| Security data pipelines | category `security-data-pipelines` | [SACR, 20 Nov 2025, updated 29 Jul 2026](https://softwareanalyst.io/reports/the-rise-of-security-data-pipeline-platforms-as-control-plane-in-soc) | Ingest, normalize, enrich, filter, and route. Not a detection rule or a SIEM. Deal prices not adopted. |
| Detection engineering | category `detection-engineering` | [SACR, 17 Mar 2026, updated 29 Jul 2026](https://softwareanalyst.io/reports/the-future-of-detection-engineering-in-security-operations) | A detection is a hypothesis, not a finding or an alert. No detection-content cell. |
| Cloud security and the SOC | category `cloud-detection` | [SACR, 11 Dec 2025, updated 29 Jul 2026](https://softwareanalyst.io/reports/the-convergence-of-cloud-security-and-the-soc-into-2026) | Two jobs where the signals overlap. Alert volume and a named platform strategy are not measurements or a joint workflow. |

`ctem` has no primary product. The finding-ownership use case names it as a program above the patch, the library, and the bucket. IT vulnerability management lists it as adjacent.

## Rights and unknowns

Short paraphrase of retrieved public abstracts and definitional sentences only. Full Gartner and SACR report text, graphics, scores, inclusion rosters, and representative-vendor sections are not reproduced. Search snippets were not used as citations. Pages that were not fetched, including other Gartner Critical Capabilities and Magic Quadrant documents, are not sources.

All nine claims are `needs_review`, `sourceType: analyst`, and `capabilityId: null`. None is `verified`. Publication dates are the report dates on the retrieved pages. Observation and last check are 26 Oct 2026. Product-page publication dates for this pass are not applicable.

Unknown: which controls a licensed SSE report places inside SSE; the body of the Gartner note on nonpatchable exposures; scores and the products a licensed SIEM or email evaluation includes; whether any current product page would fill a capability cell in these fields. Those stay empty until a page that states them is retrieved and reviewed.

No direct-competitor edge was added. No price, growth figure, customer quotation, or analyst rank was adopted.

Consumer disposition: this map only. No other store is updated.
