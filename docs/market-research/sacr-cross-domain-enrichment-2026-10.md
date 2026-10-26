# SACR cross-domain market enrichment — reviewed source snapshot

**Captured:** 2026-10-14. **Status:** researched; human publication review required. **Owner:** Security Market Map. **Next editorial check:** 2026-11-14. **Rights:** original URLs and short independent paraphrases only; no report text, imagery or analyst diagrams reproduced. SACR opinions are analyst interpretations, not independently established product effectiveness.

## Category coverage and disposition

| Candidate | Existing Market Map anchor | Recommendation | Buyer decision / distinguishing test | SACR sources |
| --- | --- | --- | --- | --- |
| Security data pipeline platforms (SDPP) | `siem`, `soar` and security operations | Use the proposed id `security-data-pipelines` in PR #60. Do not add a second category. | Route, normalize, enrich, tier and monitor telemetry before detection; do not confuse with SIEM storage/analytics | S01, S02 |
| Detection engineering lifecycle and case-first decision runtimes | `siem`, `soar`, `threat-intelligence` | Use the proposed id `detection-engineering` in PR #60. This is not a new top-level domain. | Author, test, deploy, validate and continuously tune detections; measure case decision quality rather than rule count | S03 |
| Continuous human risk management (HRM) | `security-awareness`, `insider-risk`, `email-security` | **Refine** awareness and link adjacent categories | Continuous context-aware interventions vs annual training or phishing-simulation completion | S04 |
| Modern DLP: data truth, context, distributed enforcement | `dlp`, `dspm`, `insider-risk` | **Refine** existing; *do not* add duplicate DLP | Distinguish discovery/classification from browser/endpoint/API/inline blocking, remediation and verified evidence | S05 |
| Risk and exposure prioritization / CTEM | `it-vulnerability-management`, `external-attack-surface`, `aspm`, `cnapp` | **Cross-category relationship** and possible exposure program topic | Prioritize exploitability, ownership and impact across code/cloud/runtime, not just CVSS | S06 |
| Identity security posture / entitlement intelligence | `iga`, `ciem`, `itdr`, `nhi` | **Candidate subtype**, pending buyer separation | Discover effective access and toxic permission chains vs operate a certification campaign | S07 |
| Cloud-to-SOC convergence | `cnapp`, `cloud-detection`, `siem`, `xdr` | **Architectural trend / relationship**, not new product category | Which team detects, investigates and responds to cloud signals? | S08 |
| Software supply chain integrity | `software-supply-chain`, `sca` | **Refine** and link AppSec | Separate vulnerable dependencies, malicious packages, artifact integrity and remediation | S09 |
| Digital risk protection → external trust operations | `external-attack-surface`, `threat-intelligence` | **Candidate new subtype** | Discover impersonation networks; investigate campaign; take down; verify closure and recurrence | S10 |
| Cloud/AppSec ecosystem | `sast`, `dast`, `sca`, `cnapp`, `aspm` | **No duplicate**; enrich buyer and capability relations | Distinguish code vs workload vs runtime, cloud posture and production response | S11 |

## Original analyst source references

| ID | Publisher / author | Published; updated (when shown) | Original URL | Relevant insight | Evidence status |
| --- | --- | --- | --- | --- | --- |
| S01 | SACR / Aqsa Taylor | 2025-11-20; 2026-07-29 | https://softwareanalyst.io/reports/the-rise-of-security-data-pipeline-platforms-as-control-plane-in-soc | SDPP as telemetry normalization, routing, data health and cost/quality control plane; distinguishes pure-play from broader-platform deployments | analyst-reported |
| S02 | SACR / Francis Odum | 2025-04-21; 2026-07-29 | https://softwareanalyst.io/reports/market-guide-2025-the-rise-of-security-data-pipelines-how-siems-must-evolve | Pipeline vs SIEM architecture; storage and analytics separation | analyst-reported |
| S03 | SACR / Sean Sosnowski | 2026-03-17; 2026-07-29 | https://softwareanalyst.io/reports/the-future-of-detection-engineering-in-security-operations | Detectability, evidence integrity, tuning, case-first outputs and time-to-decision | analyst-reported |
| S04 | SACR / Sean Sosnowski | 2026-05-21; 2026-07-29 | https://softwareanalyst.io/reports/human-risk-management-in-the-age-of-ai | Continuous human/agent-linked exposure measurement, targeted response beyond awareness | analyst-reported |
| S05 | SACR / Lawrence Pingree | 2026-04-23; 2026-07-29 | https://softwareanalyst.io/reports/the-great-dlp-reset-securing-data | DLP truth, context and distributed enforcement planes; reduces tuning burden; vendor descriptions need corroboration | analyst-reported |
| S06 | SACR / Aqsa Taylor and Francis Odum | 2025-10-09; 2026-07-29 | https://softwareanalyst.io/reports/market-guide-2025-evolution-of-modern-risk-and-exposure-management-platforms | Prioritization with attack-path, code/cloud and runtime context | analyst-reported |
| S07 | SACR / author on report | Publication unknown; checked 2026-10-14 | https://softwareanalyst.io/reports/modernizing-the-identity-stack-from-visibility-to-governance-through-entitlement-intelligence | Entitlement intelligence, ISPM and light IGA; avoids assuming full governance parity | analyst-reported |
| S08 | SACR | 2025-04-08; 2026-07-29 | https://softwareanalyst.io/reports/the-future-of-cloud-and-security | Cloud and SOC convergence using Cortex Cloud as an architecture example | analyst-reported |
| S09 | SACR | 2024-03-28; 2026-07-29 | https://softwareanalyst.io/reports/a-deep-dive-into-the-cloud-application-security-ecosystem | Cloud/AppSec category boundaries and platform convergence | analyst-reported |
| S10 | SACR / Sean Sosnowski | 2026-07-29; 2026-08-20 | https://softwareanalyst.io/reports/the-future-of-digital-risk-protection | Campaign-oriented external trust operations and verified closure; Outtake discussed as example | analyst-reported |
| S11 | SACR / Francis Odum | 2024-03-28; 2026-07-29 | https://softwareanalyst.io/reports/a-deep-dive-into-the-cloud-application-security-ecosystem | Existing AppSec/CNAPP subcategories and historical vendor positioning | analyst-reported |

**Note:** S09/S11 deliberately reference the same source; they are different research questions, **not two independent corroborating sources**.

## Vendor research seeds — not capability evidence

| Candidate | Relevant investigation | Required original evidence |
| --- | --- | --- |
| Cribl | SDPP, telemetry services | Current Cribl Stream docs on transforms, routing, replay and supported deployment |
| Anvilogic | detection engineering vs SIEM integration | Current detection engineering docs and operator workflow |
| Hoxhunt | continuous HRM vs awareness | Official assessment/behavior-intervention materials and limitations |
| Microsoft Purview | modern DLP | Actual enforcement-plane matrix and licensing docs |
| Netskope | SSE/inline DLP | Current data-control and traffic-path documentation |
| Veza | identity entitlement intelligence | Effective permissions / entitlement docs; no assumption of IGA completeness |
| Palo Alto Cortex Cloud | cloud-to-SOC | Current deployment, detection/response docs |
| Outtake | external trust operations | Product docs on campaign-level remediation and verifiable closure |

Vendor examples are **leads**; this research brief does not assert independent capability verification, superiority or direct substitution.

## Review checks before typed publication

1. Match each candidate against `lib/data/ecosystem.ts`, `lib/data/categories.ts`, existing vendor aliases and `analyst-expansion.ts`; do not create duplicate stable IDs.
2. Resolve at least one vendor-original technical source per claimed `implements` edge and record published/observed/reviewed dates.
3. Review whether proposed subcategories truly have distinct buyer decisions, budget owners and measurable controls; otherwise use descriptive relationships.
4. Record disputed interpretations and Unknown in the typed evidence catalog.
5. Run `npm run test:research-integrity`, `npm test`, `npx next typegen`, `npm run typecheck`, `npm run lint`, `npm run build` when typed changes are implemented. This document alone does not claim those commands ran.
6. Keep source collection inside Research Hub and require human approval prior to public publication. No new collector or remote production writes.

**Review status:** research captured. This pull request does not add typed categories. PR #60 is the proposed home for `security-data-pipelines` and `detection-engineering`; those ids are not on `main` until that pull request merges. No vendor capability publication, independently reproduced evaluation, or deployment is included here.
