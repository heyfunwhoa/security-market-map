# Cybersecurity industry and category foundation

**Owner:** Security Market Map maintainer. **Prepared:** 2026-11-06. **Status:** editorial research foundation, human review pending. **Next review:** 2027-02-06 or a material taxonomy change. This document organizes existing repository knowledge; it does not publish new typed capabilities or claim a comprehensive industry census.

## Expanded research and explanation system

- [Current-state audit](category-audit-2026-11-06.md): all 74 categories, evidence counts, source gaps and implementation priorities.
- [Adjacent category guide](adjacent-category-guide.md): 12 worked explanations spanning identity, AppSec, cloud, data, network, exposure, governance, supply chain, AI, recovery, OT and validation.
- [Category explanation system](../product/category-explanation-system.md): a consistent orientation, workflow and evaluation structure with scoped source references.

## Start here: five different things a market map must distinguish

| Layer | What it tells you | Example |
| --- | --- | --- |
| Business outcome | Why the organization invests | Keep essential services operating and limit account compromise |
| Security domain | Which part of the security program owns the problem | Identity, application security, security operations |
| Category | A recognizable group of approaches/tools addressing a job | PAM, SAST, SIEM |
| Capability | A specific action that can be evidenced and tested | Revoke a session, scan a dependency, isolate an endpoint |
| Operating model | Who performs and maintains the work | Internal team, co-managed service, outsourced MDR |

A vendor is an organization. A product is an offering. A suite combines offerings. A category label is not proof that every product in it performs the same actions. The same product may span categories; the same business problem may require several products and people.

NIST's Cybersecurity Framework is a source for organizing risk outcomes, not a vendor ranking or purchasing catalog [F1]. Analyst category systems are additional viewpoints. SACR's broad coverage areas map onto this repository through the [attributed crosswalk](sacr-category-crosswalk-2026-11-06.md) [F2]. Neither determines a company's actual budget ownership.

## Industry participants and how money moves

| Participant | Role | What to learn before evaluating it |
| --- | --- | --- |
| Enterprise or smaller end customer | Pays to manage its business risk | Critical services, internal capacity, requirements and buying authority |
| Product vendor | Supplies software, appliances or infrastructure | Supported scope, pricing unit, maintenance and integration obligations |
| MSP | Operates customer IT services | Whether security is an attached service or a dedicated practice |
| MSSP | Operates security services across customers | Service catalog, SOC ownership, escalation and contractual responsibility |
| MDR provider | Delivers managed detection and response | Covered sources, investigation and response authority, hours and handoffs |
| Reseller / distributor | Supports product procurement and channel delivery | Commercial role versus actual operating responsibility |
| Integrator / consultancy | Implements, connects or advises | Project deliverables, knowledge transfer and ongoing support |
| Open-source project / community | Supplies code, rules or shared knowledge | License, maintenance, support and who bears operational costs |
| Standards body / analyst / researcher | Supplies frameworks, terminology or evidence | Methodology, attribution, scope, date and commercial interests |

Roles can coexist within one organization. A vendor may offer software and a managed service; an MSSP may build software and resell other tools. Map the specific offering and buyer relationship rather than assigning one permanent label to the company.

## Domain atlas: what each part of the program does

This is an editorial learning map using the existing catalog's domains. Buyers and budget homes below are discovery hypotheses, not survey findings or fixed organizational rules.

| Domain / existing ID | Plain-language question | Category families to learn | Likely owners / budget conversation |
| --- | --- | --- | --- |
| Identity / `identity` | Who or what can access resources, and should that access continue? | Workforce IAM, CIAM, IGA, PAM, secrets management, NHI, ITDR | IAM, security, IT; product engineering for customer authentication |
| Corporate / `corporate` | How do we protect the employee environment? | Endpoint, email, browser, network access, human risk | IT/security operations; device, collaboration and workforce controls |
| Application / `appsec` | Where can software be exploited, and how do developers fix it? | SAST, DAST, SCA, secrets detection, API security, ASPM | AppSec, engineering; development tooling and remediation workflow |
| Product / `product` | Are we designing, shipping and maintaining a trustworthy product? | Threat modeling, design review, disclosure and product assurance | Product security and engineering; a practice spanning tool categories |
| Cloud / `cloud` | Are cloud resources configured, accessed and operated safely? | CSPM, CWPP, CIEM, CNAPP, cloud detection | Cloud security, platform teams; infrastructure protection and posture |
| Data / `data` | Where is sensitive data, who accesses it and where can it go? | DSPM, DLP, access governance, encryption | Data security, privacy and platform owners |
| Operations / `secops` | Can we detect, investigate and respond effectively? | Pipelines, detection engineering, SIEM, XDR, SOAR, MDR | SOC and SecOps; telemetry, analysts, response and service coverage |
| Governance / `grc` | Which risks and obligations matter, and can we demonstrate control? | Risk management, compliance evidence, third-party risk | CISO, GRC, legal, procurement and audit |
| Validation / `offensive` | Do our controls actually withstand relevant attacks? | Pentesting, breach simulation, attack-path validation | Offensive security, assurance, product security |
| Infrastructure / `platform` | How do we secure reusable production foundations? | Workload identity, secrets delivery, containers, infrastructure as code | Platform engineering and infrastructure security |
| AI / `ai` | How do we constrain risks from models, applications and agents? | AI testing, agent permissions, runtime controls, data boundaries | Shared ownership across AI engineering, identity, AppSec, data and governance |

Network security, exposure management and recovery are useful cross-domain views. They need not become duplicate top-level domains: network controls span corporate/cloud, exposure spans assets and applications, and recovery spans operations, IT and business continuity. Preserve existing catalog memberships and investigate gaps before adding IDs.

## Category distinctions that prevent confusion

| Terms | Boundary to remember | Practical example |
| --- | --- | --- |
| IAM / IGA / PAM | Authentication/access, access lifecycle/governance, and privileged access solve related but different jobs | Logging in, reviewing access, and obtaining temporary admin rights |
| Secrets detection / secrets management | Find exposed credentials versus deliver and manage credentials | A repository scan finds a key; rotation and safe runtime delivery require additional work |
| ITDR / identity posture | Respond to identity threats versus reduce risky identity configurations | Investigate suspicious sessions versus fix excessive permissions |
| SAST / DAST / SCA | Examine code, test a running application, and assess third-party components | Different evidence sources and development stages |
| ASPM / scanners | Organize and prioritize application risk versus generate individual findings | A unified backlog does not prove every scanner is native |
| CSPM / CWPP / CNAPP | Configuration posture, workload protection, and a broader suite | A public storage finding is different from malicious runtime activity |
| DSPM / DLP | Understand sensitive-data exposure versus control prohibited data movement/use | Finding sensitive records does not prove an upload can be blocked |
| Vulnerability management / validation | Find and prioritize weaknesses versus test attack or control behavior | A CVE finding alone does not establish exploitability in this environment |
| EPP / EDR | Prevention and endpoint detection/investigation/response | Blocking execution differs from reconstructing what a process did |
| SIEM / data pipeline | Analyze security events versus prepare and deliver telemetry | Filtering logs can lower volume but also remove detection evidence |
| SOAR / AI SOC | Orchestrated workflows versus AI-assisted or agentic security work | An investigation agent still needs permissions and reliable execution paths |
| MDR / MSSP | A managed service versus the provider business | An MSSP can offer MDR alongside other services |

These concise definitions synthesize the existing catalog and are educational, not a mandatory standard. Exact scope varies by implementation. SACR provides additional terminology [F2]; its emerging frameworks remain attributed rather than universal categories.

## Deeper first slice: endpoint and security operations

Use this workflow to learn the work before looking at vendors:

| Step | Work performed | Output | Question that tests whether it works |
| --- | --- | --- | --- |
| Collect | Sensors and integrations obtain relevant activity | Events with timestamps and source context | What is missing, delayed or unsupported? |
| Prepare | Parse, normalize, enrich and route data | Usable evidence delivered to destinations | Can schema changes or filters break coverage? |
| Detect | Apply rules, analytics or other detection logic | Signals requiring attention | Who owns coverage, testing and maintenance? |
| Investigate | Establish scope, sequence and significance | Evidence-supported case and decision | Can someone reproduce the conclusion? |
| Respond | Contain, revoke, block or otherwise act | An authorized change and recorded result | Was the action allowed, successful and safely recoverable? |
| Recover / improve | Restore service and learn from incidents | Recovery evidence, updated controls and runbooks | Did the underlying weakness and coverage gap get addressed? |

The workflow is an original teaching aid, not a formal mapping to NIST controls. Real investigations loop between steps. EDR covers endpoint work; identity, network and cloud tools contribute different evidence. A SOC operates this workflow, and an MDR contract can outsource specified parts.

Use the existing [pipelines and detection-engineering review](secops-pipelines-detection-enrichment.md) for depth. The first three sections of the [SecOps/MSSP research](secops-mssp-economics-2026-11-06.md) add a glossary, delivery economics and an evaluation worksheet before any vendor profiles.

## How a security concern becomes a project and budget

Illustrative discovery sequence: identify the business impact → establish the current gap → assign an accountable owner → define outcomes → compare operational approaches → fund implementation and ongoing delivery → measure results.

A “better detection” project could use existing tools, buy software, improve data, hire specialists or outsource a service. Track those options before assuming a new product category creates a new budget line. Technical champion, economic buyer, procurement and operator may be different people.

For each project capture: trigger, affected business process, existing spend, budget owner, decision date, implementation owner, recurring labor, service costs and success criteria. No budget percentages, market growth rates or historical trends are asserted here; those need dated research with a stated sample and methodology.

## Reusable category-page structure

Every category should answer these questions before adding a vendor list:

1. What problem does it solve, in ordinary language?
2. What assets, users and environments are in scope?
3. What triggers a project, and who owns the decision and operation?
4. What workflow, inputs, outputs and dependencies are involved?
5. What does it not solve? Which adjacent categories help?
6. What capabilities can be demonstrated, and what remains Unknown?
7. How is the work delivered and paid for, including labor and implementation?
8. What outcomes and failure cases should an evaluation measure?
9. What neutral, technical and analyst sources support the explanation?
10. Which terms are stable, emerging, disputed or vendor-defined?

After that foundation, add individual vendor/product profiles: offering, intended buyer, documented scope, architecture, delivery model, pricing basis, evidence dates and unknowns. Short company-specific context is optional. Formal competitor comparisons require a defined buyer question; they are not the default next step.

## Learning and expansion order

| Stage | Material available in this repo | Next depth to add |
| --- | --- | --- |
| Industry orientation | This participant and domain atlas | More worked buyer/project examples |
| Endpoint / SecOps / MSSP | Linked glossary, workflow, economics and researched vendor profiles | Category-specific responsibility matrices and evidence-backed implementation examples |
| Identity | Existing evidenced identity catalog and secrets research | Neutral cross-category workflow lessons using those records |
| AppSec / cloud / data | Existing category catalog and research briefs | Apply the category template consistently, preserving coverage gaps |
| Governance / validation / AI | Existing mapped domains and attributed research | Clarify control ownership, emerging terminology and evidence maturity |

This is an initial foundation across the industry, with greater SecOps depth. It is not a claim that all category deep dives are finished. No monitor, publishing pipeline or cross-repository synchronization was enabled.

## Sources, placement and review

- **[F1] NIST Cybersecurity Framework:** https://www.nist.gov/cyberframework. Official framework hub, inspected 2026-11-06; page publication date Unknown. Supports the risk-outcome framing, not vendor categories or spending claims.
- **[F2] SACR:** https://softwareanalyst.io/reports and https://softwareanalyst.io/glossary. Analyst coverage and terminology, inspected 2026-11-06; live-page publication dates Unknown. Use brief paraphrases and attribution; no copied rankings or graphics.
- **Existing repository foundation:** `lib/data/ecosystem.ts`, `lib/data/categories.ts`, [security personas](security-org-personas.md) and the [research playbook](competitive-intelligence-playbook.md). The atlas is an editorial synthesis of these existing records, not independently measured market evidence.
- CISA's Zero Trust Maturity Model page returned HTTP 403 in this session; no new claim here depends on that inaccessible page.
- Placement: `/landscape` → existing domains → categories → vendor/product evidence. Existing IDs are reused; no schema or navigation changes.
- Publication state: research/documentation only, human review pending. No vendor capability cells or pairwise relationships added. Correct through a reviewed amendment with source/date attribution.
