# SACR coverage crosswalk for Security Market Map

**Observed / last checked:** 2026-11-06. **Owner:** Security Market Map maintainer. **Human review:** pending. **Next check:** 2026-12-06. **Status:** proposed editorial mapping, not a deployed taxonomy migration.

Use SACR as a named category and research source. Preserve the map's buyer-led navigation and product evidence standards. This adapts coverage organization; it does not reproduce SACR's rankings, charts or proprietary evaluation methodology.

## Exact broad coverage areas and local mapping

SACR's [current research index](https://softwareanalyst.io/reports) exposes five areas. The existing `sacrLanes` entries in `lib/data/connections.ts` instead use four older groupings and Substack destinations. That is a concrete navigation-refresh candidate, separate from this research submission.

| Current SACR label | Existing local destination | Mapping choice |
| --- | --- | --- |
| Security Operations | `/domains/secops` | Preserve endpoint, detection, SIEM, automation and managed-service drill-downs |
| Data & AI Security | `/domains/data`, `/domains/ai` | One source area spans two local domains; do not collapse the local distinction |
| Identity Security | `/domains/identity` | Keep IAM, PAM, IGA, NHI, ITDR and agent identity separate |
| Cloud & App Security | `/domains/cloud`, `/domains/appsec` | One source area spans cloud runtime and software-development concerns |
| General Cybersecurity | `/landscape` | A research coverage area, not a single product capability |

Publication date of the live index is Unknown. The table is an editorial crosswalk, not a statement that SACR endorses the local hierarchy. Current Security Operations and Identity coverage pages were also inspected:

- https://softwareanalyst.io/reports/coverage/security-operations
- https://softwareanalyst.io/reports/coverage/identity-security

## Security operations: proposed drill-down

These are our practical subgroups using existing category IDs, **not a verbatim SACR hierarchy**.

| Local category IDs | Buyer problem | Important distinction |
| --- | --- | --- |
| `endpoint-security`, `endpoint-control` | Protect workstations and servers; investigate activity; control risky execution | EDR and SACR's ECP framing overlap but are not synonyms |
| `security-data-pipelines`, `siem` | Move, retain and analyze useful evidence at an acceptable cost | A pipeline is not itself a full detection/response program |
| `detection-engineering` | Build, validate, deploy and maintain detection logic | An engine and a maintained detection library are different deliverables |
| `xdr`, `ndr`, `itdr`, `cloud-detection` | Connect threat evidence across environments | Endpoint, network, identity and cloud coverage need separate proof |
| `soar` | Coordinate actions across tools with governance | AI investigation should be assessed by task and operating model, not assumed from SOAR membership |
| `mdr` | Buy operated detection and response | MDR is a service; MSSP is a provider type and may offer MDR |

The [SACR glossary](https://softwareanalyst.io/glossary) provides useful reference terms including EDR, ECP, ITDR, ISPM, NHI, CDR, CNAPP, ASPM and detection engineering. Its emerging terms should remain attributed and should not automatically create new categories or vendor capability cells.

## Identity expansion without category inflation

| Concept | Question to teach | Treatment in LimaCharlie research |
| --- | --- | --- |
| ITDR | Can we detect and respond to identity misuse? | Entity pivots and log ingestion alone are insufficient evidence |
| ISPM | Are identity configurations and permissions risky? | Keep separate from live attack detection |
| NHI | Who owns machine accounts, credentials and their lifecycle? | Not established merely by observing API tokens in logs |
| Agent runtime identity controls | Is this agent action authorized now? | Attribute SACR's ARISE framing; do not imply a shipped LimaCharlie capability |

These explanations are original paraphrases. They do not equate the presence of an identity integration with a complete identity-security product.

## How to make the map useful to a buyer

Keep four independent lenses:

1. **Security domain/category:** what problem the technology addresses.
2. **Operating model:** build a service, operate a platform, co-manage, or outsource.
3. **Commercial model:** unit/usage basis, commitments, included service and variability.
4. **Evidence state:** vendor claim, analyst framing, tested result, disagreement or Unknown.

At product depth, show detection-content ownership, response responsibility, tenancy, programmability, portability, AI costs and contract gaps. Keep multiple category memberships where supported. A provider can be a buyer, channel partner and competitor in different scenarios.

The [companion research](secops-mssp-economics-2026-11-06.md) applies this structure to Todyl, Stellar Cyber, Torq, Conifers, Blumira, Huntress, Sekoia, Microsoft, CrowdStrike and LimaCharlie. Its additional follow-up candidates are not newly verified products.

## Bounded implementation handoff

- Reuse `sacrLanes`, existing domain/category routes and `/compare`; no new top-level navigation or vendor registry.
- In a later reviewed UI/data PR, update the broad coverage labels to the five current labels; preserve both local destinations where one source area spans two domains. Verify source destinations rather than guessing URL slugs.
- Use the existing `/landscape` → domain → category → vendor flow. Provide a way back to the broader domain and preserve buyer context when comparing products.
- Existing source IDs such as `src-sacr-ecp`, `src-sacr-detection-20260317`, `src-sacr-itdr-20240501` and `src-sacr-arise-20260903` should be checked for reuse; do not re-create a source just because its topic has another label.
- Current typed-source/capability changes: none. Current UI changes: none. Human source review and normal CI precede publication; responsive, keyboard and reduced-motion checks are required if UI changes later.
- Public index/glossary dates are Unknown; source observation dates are recorded above. Use links and brief paraphrases only. Do not import analyst rankings as independently tested performance.
