# Beyond SecOps: category explanations and authoritative guidepoints

**Date checked:** 2026-11-06. **Owner:** Security Market Map maintainer. **Status:** vendor-agnostic editorial expansion; human review pending. **Next review:** 2027-02-06, earlier for a revised standard. Start with the [industry foundation](industry-category-foundation.md); use the [explanation contract](../product/category-explanation-system.md) to extend individual categories. No vendor rankings or product-effectiveness claims are made.

## How to read the map

Use a business scenario first, then ask what needs protection, what action is needed and who does the work. A market category is one way to group solutions; it is not the same as a technical standard, organizational team or managed service. The following explanations are original editorial teaching aids. Reference codes point to guidance for the underlying security job, not official definitions of every commercial acronym.

NIST CSF 2.0 provides six concurrent functions: Govern, Identify, Protect, Detect, Respond and Recover [R1]. Use these as an outcome lens alongside domains. Do not turn them into a mandatory linear sequence or imply a category belongs to only one function. Product purchases alone do not establish that outcomes are achieved.

## 1. Identity and access: deciding who can do what

**Job:** give legitimate people and workloads appropriate access, and remove or constrain access when it is no longer justified.

**Categories:** `workforce-identity`, `ciam`, `iga`, `pam`, `ciem`, `nhi`, `identity-orchestration`; connect to `itdr` for threat investigation.

**Example/workflow:** a contractor joins a project → identity is established → access is approved → authentication and authorization are applied → activity is logged → access is reviewed and removed at departure. For a workload, investigate issuance, ownership, rotation and revocation rather than pretending it follows an employee onboarding process.

**Boundaries:** logging in is not the same as permission governance; PAM is not the entire IAM program. ITDR investigates identity misuse; it does not replace provisioning or entitlement governance. NIST 800-63-4 specifically addresses user identity proofing, authentication and federation; do not extend it to all machine-identity claims [R2]. Zero-trust architecture helps explain resource-focused access decisions [R3].

**Ownership/economics:** IAM, IT, security and application teams may share responsibility. Investigate licensed users/workloads, directories, integrations, review labor and migration costs. These are cost dimensions to examine, not asserted universal pricing meters.

**Evaluate:** revoke a test user's access and confirm effective loss of access, including sessions and downstream systems. Ask who owns exceptions and machine identities that have no obvious person attached.

## 2. Application and product security: making software safer to ship

**Job:** prevent, find and fix weaknesses in software and its development process.

**Categories:** `sast`, `dast`, `iast`, `sca`, `api-security`, `aspm`, `app-runtime`, `threat-modeling`, `product-security-program`, `vulnerability-disclosure`.

**Workflow:** define a security requirement → examine design/code/dependencies → test running behavior → triage a reproducible finding → assign a developer → fix → retest. Static, dynamic and interactive tests observe different things; none should be presented as complete coverage. ASPM organizes risk and work across sources; a unified backlog does not prove native scanning.

**Guidepoints:** NIST SSDF addresses secure-development practices [R4]. OWASP ASVS supplies application verification requirements [R5]. Use them to ask whether the process and application controls are adequate, not to declare a scanner effective from its category label.

**Ownership/economics:** AppSec/product security coordinate with engineering, which usually implements changes. Study repositories, contributors, applications, testing capacity and developer remediation time.

**Evaluate:** reproduce one finding, test a benign counterpart, fix it and rerun the relevant check. Distinguish finding count from reduced exploitable exposure. Ask whether deployment and regression testing remain the customer's responsibility.

## 3. Cloud, infrastructure and containers: controlling configuration and runtime

**Job:** keep cloud resources, workloads and infrastructure changes within acceptable risk boundaries.

**Categories:** `cspm`, `cwpp`, `cnapp`, `ciem`, `container-security`, `iac-security`, `cloud-vulnerability`, `cloud-detection`.

**Workflow:** discover accounts/resources → assess configuration, software and permissions → prioritize a risky path → route to its owner → remediate through controlled change → verify. Runtime evidence and response may require additional sensors, APIs or services.

**Boundaries:** CSPM configuration findings differ from runtime compromise; CWPP focuses on workloads; CIEM addresses cloud entitlements. CNAPP is a suite category, not proof that every component has equal depth. Infrastructure-as-code checks can prevent some bad changes but do not automatically cover drift after deployment.

**Guidepoint:** CSA's Cloud Controls Matrix supports control and shared-responsibility assessment [R6]. Our market-category breakdown is an editorial crosswalk, not CSA endorsement of products or exact category equivalence.

**Ownership/economics:** cloud security and platform engineering share work with service owners. Consider accounts, resources, workloads, data volume, permissions and engineering effort.

**Evaluate:** introduce a safe test misconfiguration, trace the finding to its owner, fix through the normal change path and verify closure. Separately test runtime detection if that is required. Ask what the cloud provider owns versus the customer.

## 4. Data security and privacy: understanding and controlling sensitive information

**Job:** understand where sensitive information exists and manage access, movement and processing risks.

**Categories:** `dspm`, `dlp`, `data-access-governance`, `database-security`, `data-encryption`, `privacy-governance`, `ai-data-security`.

**Workflow:** discover a dataset → classify it → inspect access and usage → identify exposure → decide a permitted action → enforce where supported → confirm remediation. Privacy also concerns the effects of data processing on people; it is not limited to stopping breaches [R7].

**Boundaries:** discovery is not enforcement; encryption does not determine whether an already-authorized user may misuse data. DSPM, DLP, access governance and privacy can require separate mechanisms and owners. AI data controls need to account for prompts, retrieved context and outputs where relevant.

**Ownership/economics:** data security, privacy/legal, IAM, database and business owners. Consider scanned stores, data volume, access connectors, enforcement channels, false positives and classification review.

**Evaluate:** use synthetic sensitive records; test discovery and incorrect classifications, then independently test whether an unauthorized transfer is detected or blocked. Record which systems are outside scope.

## 5. Network, access and browser controls: constraining connections and sessions

**Job:** allow necessary communication while limiting unwanted access and exposure.

**Categories:** `network-edge`, `microsegmentation`, `enterprise-browser`, `waf-waap`; `ndr` observes network activity from an operations perspective.

**Workflow:** identify a user/device/workload → identify the requested resource or traffic → evaluate policy/context → allow, restrict or block → log → handle exceptions. Zero trust is an architectural approach; a firewall, ZTNA product or browser is a possible component, not the whole architecture [R3].

**Boundaries:** network access is not application authorization. WAF/API protection sees particular traffic paths; it does not replace secure application design. NDR observation is distinct from enforcing access policy. Browser control only covers the sessions and devices actually managed.

**Ownership/economics:** network/IT/security teams and app owners. Consider users, sites, throughput, traffic inspection, deployment paths and policy operations.

**Evaluate:** attempt allowed and disallowed access, change device/user context and test alternate paths. Check policy exceptions and outages as carefully as the normal path.

## 6. Exposure and assets: deciding what to fix first

**Job:** discover relevant assets and weaknesses, establish ownership and prioritize action using real context.

**Categories:** `it-vulnerability-management`, `cloud-vulnerability`, `external-attack-surface`, `security-asset-management`, `ctem`, with `breach-simulation` and `pentest-program` for validation.

**Workflow:** find assets → identify weaknesses → relate exposure to business criticality and threats → validate where appropriate → remediate → verify. CTEM is a program framing; it should not become a synonym for a vulnerability scanner.

**Guidepoints:** CIS Controls offer a prioritized safeguard lens [R8]. FIRST describes EPSS as a probability estimate for exploitation within the next 30 days, not an organization-specific risk score [R9]. Use environmental context and impact alongside technical signals.

**Ownership/economics:** security prioritizes with IT, engineering and business service owners. Asset count, scanning scope, remediation effort and change windows matter.

**Evaluate:** follow one critical asset from discovery to confirmed fix; include an unowned asset and a false-positive finding. Ask whether “closed” means a ticket was resolved or the weakness was actually removed.

## 7. Governance, supplier risk and customer trust: accountable decisions

**Job:** translate objectives and obligations into owned controls, risk decisions and evidence.

**Categories:** `grc-controls`, `third-party-risk`, `security-ratings`, `customer-trust`, `privacy-governance`.

**Workflow:** identify requirement/risk → define scope → assign control owner → collect suitable evidence → assess gaps → approve treatment/exception → review. NIST CSF supplies an outcome lens [R1]; supply-chain guidance helps structure supplier risk across organizational levels [R10].

**Boundaries:** collecting evidence is not proving effectiveness. A certification, questionnaire or external rating has scope and limitations. Legal obligations depend on jurisdiction and facts; this guide does not provide a compliance determination.

**Ownership/economics:** CISO/GRC, legal, procurement, audit and business owners. Consider frameworks, entities, suppliers, assessment workload and time spent obtaining reliable evidence.

**Evaluate:** trace one requirement to an accountable owner and dated evidence, then test how a material supplier change or exception updates the decision. Customer trust shares evidence with buyers but does not substitute for operating the controls.

## 8. Software supply chain and secrets: trusting what is built and deployed

**Job:** protect the components, credentials and processes used to create and deliver software.

**Categories:** `software-supply-chain`, `sca`, `secrets-detection`, `secrets-management`, `nhi`, `iac-security`.

**Workflow:** identify dependency/build input → establish source and handling → apply checks → build/package/deploy → monitor changes → remediate affected components or exposed credentials. SSDF supports development lifecycle practices [R4]; OWASP's secrets guidance addresses credential lifecycle and handling [R11].

**Boundaries:** an SBOM is an inventory, not proof that software is safe. Detecting an exposed secret does not revoke it. Rotating a credential without updating consumers can break production. Signing an artifact does not guarantee its code lacks vulnerabilities.

**Ownership/economics:** platform/DevOps, AppSec and service owners. Consider builds, components, repositories, identities, rotation work and recovery from broken integrations.

**Evaluate:** use a test credential to demonstrate discovery, revocation, replacement and continued service operation. Follow one dependency to the deployed artifact and verify that a fixed version is actually running.

## 9. AI applications and agents: controlling authority and behavior

**Job:** manage the risks introduced by models, AI applications, tool access and autonomous workflows.

**Categories:** `ai-application-security`, `agent-identity`, `agentic-runtime`, `mcp-security`, `ai-data-security`, `model-security`, `ai-governance`.

**Workflow:** identify the AI use case and permitted actions → assess data/model/tool risks → test under representative and adversarial inputs → constrain authority → observe outcomes → change or stop the system when needed.

**Guidepoint:** NIST AI RMF provides Govern, Map, Measure and Manage as risk-management functions [R12]. SACR offers emerging market terminology [R15]. These are different kinds of references; neither automatically establishes a product's prompt-injection prevention or agent-control capability.

**Boundaries:** AI governance is not a runtime firewall. Agent authentication is not authorization for every tool call. A content filter does not establish that a high-impact action is safe. Use emerging terms with date and attribution.

**Ownership/economics:** AI/product engineering with AppSec, identity, data, governance and business owners. Model usage, evaluations, infrastructure and human review can all affect cost.

**Evaluate:** test a task that should succeed and an unauthorized action that should fail, including untrusted retrieved instructions and excess tool permissions. Inspect logs, approval paths and what happens when a dependency fails.

## 10. Recovery and resilience: proving that operations can resume

**Job:** restore important business services after disruption with acceptable data loss and downtime.

**Category:** `cyber-recovery`, connected to incident response, IT operations, identity and business continuity.

**Workflow:** establish business dependencies and objectives → prepare recovery resources → practice restoration → validate integrity and access → restore service → test failback and learn. NIST contingency-planning guidance supplies process context [R13].

**Boundaries:** backup availability is not demonstrated recovery. A restored database is not necessarily a functioning business service. Response containment and business recovery have different success criteria.

**Ownership/economics:** IT resilience, infrastructure, business service owners and security. Consider protected workloads, stored copies, recovery environments, testing time and dependency complexity.

**Evaluate:** restore a representative service in an isolated exercise and measure actual recovery time/data loss against agreed objectives. Include compromised credentials and missing dependencies in the exercise assumptions.

## 11. OT and connected devices: protecting physical operations

**Job:** reduce cyber risk while respecting operational safety, reliability and availability requirements.

**Category:** `ot-security`; connect to asset inventory, segmentation, monitoring and controlled maintenance.

**Workflow:** identify assets and physical processes → assess operational impact → select compatible controls → plan changes with operators → monitor → respond with engineering/safety involvement. NIST SP 800-82 Rev. 3 explicitly addresses OT-specific constraints [R14].

**Boundaries:** do not assume an IT patching schedule, scanner or automated isolation action is safe for every industrial process. IoT and industrial control systems are not identical environments despite sharing a broad catalog entry.

**Ownership/economics:** plant/operations engineering and safety teams with IT/security. Consider sites, devices, passive discovery, maintenance windows and integration with existing operations.

**Evaluate:** use an authorized test environment or carefully scoped passive assessment. Demonstrate operational compatibility and approved response handoffs before evaluating automation speed.

## 12. Validation: checking whether the controls work

**Job:** test a defined threat or weakness and produce evidence that supports remediation decisions.

**Categories:** `pentest-program`, `breach-simulation`, `threat-modeling`, `vulnerability-disclosure`.

**Workflow:** agree scope and safety → define attack/abuse scenario → test → document evidence → remediate → retest. MITRE ATT&CK provides a behavior vocabulary useful for threat-informed scenarios [R16]; it is not a product certification or a complete checklist of every possible attack.

**Boundaries:** a successful point-in-time test does not establish continuous protection. A technique mapping does not prove detection, prevention or response. Vulnerability disclosure is an intake/handling process, not automatic coverage of all software defects.

**Ownership/economics:** offensive/product security, assurance and system owners. Consider scope, frequency, specialist time and remediation validation.

**Evaluate:** require a reproducible result, clear affected scope, safe handling and a retest. Preserve differences between simulated behavior and an actual adversary campaign.

## Authoritative guidepoints and source limits

All links below were retrieved or surfaced through primary-source search on **2026-11-06**. Summaries use public landing pages, abstracts and project documentation; full controls were not exhaustively reviewed. These are reading/reference anchors, not one-to-one certified control mappings. Source IDs below are document-local, not new runtime catalog records.

| Ref | Primary source / version | Use here | Limit and publication date |
| --- | --- | --- | --- |
| R1 | [NIST CSF 2.0](https://csrc.nist.gov/pubs/cswp/29/the-nist-cybersecurity-framework-csf-20/final), [function FAQ](https://www.nist.gov/cyberframework/faqs) | Risk outcomes and program orientation | Does not prescribe products; 2024-02-26 |
| R2 | [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final) | User proofing, authentication and federation | Not all IAM or NHI; final July 2025 |
| R3 | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) | Resource-oriented zero-trust architecture | Architecture, not a product label; August 2020 |
| R4 | [NIST SP 800-218 SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) | Secure development practices | Process guidance, not scanner effectiveness; February 2022 |
| R5 | [OWASP ASVS 5.0.0](https://asvs.owasp.org/) | Application verification requirements | Select applicable requirements and scope; 2025-05-30 |
| R6 | [CSA CCM and CAIQ v4.1](https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1) | Cloud controls and responsibility questions | Not CNAPP certification; exact publication date not captured |
| R7 | [NIST Privacy Framework](https://www.nist.gov/privacy-framework/privacy-framework) | Privacy-risk orientation | Hub reference; do not infer legal compliance or a version-specific mapping; page date Unknown |
| R8 | [CIS Controls v8.1](https://www.cisecurity.org/controls/v8-1) | Prioritized safeguard discussions | Not proof a tool implements a safeguard; page date Unknown |
| R9 | [FIRST EPSS FAQ](https://www.first.org/epss/faq) | Exploitation probability versus risk | Needs environmental/impact context; live page date Unknown |
| R10 | [NIST SP 800-161 Rev. 1, update 1](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final) | Supplier and supply-chain risk | Scope-specific application required; May 2022, updated 2024-11-01 |
| R11 | [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet) | Secrets handling/lifecycle | Living technical guidance, not a vendor comparison; date Unknown |
| R12 | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | AI risk-management functions | Page describes RMF 1.0 and says revision is in progress; 2023 framework, page date Unknown |
| R13 | [NIST SP 800-34 Rev. 1 updated edition](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) | Recovery planning | Older federal-system guidance; use scope-aware adaptation, not a current commercial mandate; 2010 |
| R14 | [NIST SP 800-82 Rev. 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final) | OT security constraints | September 2023 final; page links to Rev. 4 initial public draft, not a replacement final |
| R15 | [SACR research](https://softwareanalyst.io/reports), [glossary](https://softwareanalyst.io/glossary) | Market language and emerging category names | Analyst framing, not universal standards or effectiveness evidence; live-page dates Unknown |
| R16 | [MITRE ATT&CK resources](https://attack.mitre.org/resources/) | Adversary-behavior vocabulary | Pin release/technique IDs when making exact mappings; live-page date Unknown |

Gartner and Forrester can inform subsequent category-definition and market-evolution research when their original public abstracts or appropriately licensed content can be inspected. This pass does not claim new access to their paid reports or copy their placements. NIST, OWASP, CIS, CSA and FIRST support the technical foundation independently of any analyst taxonomy.

## Worked exercise across categories

A fictional SaaS company discovers an exposed build credential. **Secrets detection** identifies it; **secrets management/identity** revoke and replace access; **cloud posture/entitlements** assess what it could reach; **SecOps** investigates whether it was used; **AppSec/platform** fix the delivery process; **data security** assesses potentially exposed information; **GRC** records decisions; **recovery** restores affected services if necessary. These are related jobs, not proof that one product covers the entire workflow.

Next learning step: take one real category and identify its input, output, owner, boundary and one test. Only then inspect vendor evidence against that category's job.

## Publication boundary

All examples and suggested evaluation tasks are editorial and illustrative. Ownership and economic factors are hypotheses for discovery, not measured budget distributions. No new product claims or category IDs are published. Link this guide from the existing foundation; reuse domain/category routes when the presentation contract is implemented. Human review remains pending.
