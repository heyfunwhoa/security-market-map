# AWS Industries (AWSI) Security Specialist: Security + AI GTM Learning Curriculum

**Status:** proposed, reusable **public** role-aligned learning curriculum | **As of:** 2026-11-17 | **Owner:** Security Market Map research and reference | **User-specific interview stories, recruiter information and account data:** private Notion only | **No live AWS resources or paid services authorized**

**Source of role requirements:** [AWSI Security Sales Specialist, requisition 10425708](https://amazon.jobs/en/jobs/10425708/security-sales-specialist-aws-industries-awsi). AWS describes an independent **security pipeline hunter**, 1:1 collaboration with a Security Solutions Architect, coordination with incumbent AWS account managers, executive CISO engagements, **greenfield Bedrock AI security**, brownfield consolidation/cost optimization, and competitor positioning against Wiz, Splunk, Palo Alto and CrowdStrike. It does **not** establish which exact accounts, quota, compensation, AWSI internal structure, or product package a candidate will receive.

## Outcome and evaluation rubric

The learner must demonstrate **five connected abilities**, rather than memorize service names:

1. **Architecture fluency:** explain workload, identity, data, network, observability, and shared-responsibility boundaries; distinguish IAM/STS, detection, posture, investigation, response and policy.
2. **Native/partner market judgment:** select a defensible AWS-native, partner, incumbent, or mixed approach for a *specified* customer requirement, with original evidence and explicit Unknowns.
3. **AI-security reasoning:** trace Bedrock/AgentCore models, agents, tools, permissions and data paths; distinguish prompt filtering from deterministic authorization, red-team testing, AI inventory and runtime controls.
4. **Enterprise discovery and value:** engage a fictional CISO on risk, compliance, operational effort, TCO and business continuity; propose measurements and an ethical competitive evaluation, not an invented ROI.
5. **AWSI selling execution:** construct an independent pipeline hypothesis for a 7–10-account *fictional* strategic territory, coordinate seller/SA/AM ownership, create a testable outbound play and advance an opportunity using evidence.

### Assessment standard (proposed)

Each module uses **Explain → Diagram → Decide → Compare → Sell → Teach-back**. Score each of the five abilities on a 0–3 rubric:
- 0 = cannot explain / misclassifies services
- 1 = describes terminology but misses relationships or limitations
- 2 = makes a correct scoped decision with evidence
- 3 = makes, defends and communicates a trade-off including unknowns, alternatives and measurable criteria

Mark a module complete only when the learner reaches **at least 2/3 in both technical and commercial dimensions**, identifies at least one meaningful uncertainty, and delivers a short verbal teach-back. These are **future assessment criteria**, not an implemented grading system or recorded learner achievement.

## Track 1: Interview-critical sprint (3 sessions before the hiring-manager meeting)

### Session 1 — AWS architecture, identity, and data (60–90 min)
- **Learn:** account/Region/Organizations, VPC and networking, ECS task versus execution role, IAM policy vs trust, STS, S3, KMS, Secrets Manager, shared responsibility.
- **Use case:** Cedar Ridge ECS service reads protected S3 reports. Correct `s3:*` on `*` to appropriate scoped actions/resources while preserving legitimate workflow.
- **Decision exercise:** identify the principal, effective permissions, blast radius, and why credential lifetime is not least privilege.
- **Market comparison:** IAM versus CIEM/PAM/IGA, Secrets Manager versus Vault/Infisical, exposed-secret detection as complementary.
- **Seller output:** two CISO questions about workload identities and sensitive data; 60-second executive explanation.
- **Proof:** diagram, simplified policy, two controls, one limitation.

### Session 2 — Security Hub and SOC detection-to-response (75–90 min)
- **Learn:** GuardDuty, CloudTrail management/data events, Inspector, Macie, CSPM/Config, unified Security Hub, Security Lake, Detective, Security Incident Response, EventBridge.
- **Use case:** synthetic GuardDuty S3 exfiltration anomaly. Distinguish finding versus confirmed object access, retained audit evidence and incident determination.
- **Decision exercise:** choose what to investigate, route, prioritize and contain without claiming every supported signal reaches every destination.
- **Market comparison:** Wiz/Prisma Cloud/CrowdStrike cloud exposure; Splunk/Sentinel/Google SecOps as possible downstream investigation; no automatic displacement.
- **Seller output:** describe a SOC efficiency pilot with baseline alerts, coverage, analyst hours and time-to-decision (without made-up savings).

### Session 3 — AI workloads + strategic account motion (90 min)
- **Learn:** Bedrock foundation models and knowledge bases, AgentCore Runtime/Gateway/Identity/Policy, Guardrails, IAM/STS, KMS, Secrets Manager, CloudTrail, Security Hub AI inventory and AI CSPM controls.
- **Use case:** fictional agent reads approved reports but retrieved text instructs an unauthorized export tool call. The policy must enforce permissions independent of model output.
- **Decision exercise:** draw trust boundaries, identify prompt injection, apply scoped tool policy, content safeguards, audit and review.
- **Market comparison:** AI-SPM inventory, model security, red teaming, runtime enforcement; Noma, Zenity, Oligo and existing market-map IDs are **candidate research**, not automatic equivalents.
- **Seller output:** 30/60/90-day plan for fictional strategic accounts, account hypotheses, CISO entry points, SA/AM division of responsibility and success measures.

**Private interview task (not included in this public repository):** prepare six verified STAR stories from the individual's work. Do not copy personal recruiter correspondence, past-customer specifics, employment performance or actual territory/account information into public learning data.

## Track 2: Role mastery, 12 focused modules

| Priority | Module and key AWS services | Buyer problem | Technical deliverable | Commercial deliverable |
| --- | --- | --- | --- | --- |
| P0 | M01: cloud architecture and shared responsibility; VPC, S3, ECS, Lambda, Organizations | Secure workloads across accounts | One architecture diagram | Cloud-security discovery |
| P0 | M02: identity, credentials and secrets; IAM/STS, KMS, Secrets Manager | Privilege / nonhuman identity risk | Effective permission trace | Identity and secrets alternatives |
| P0 | M03: detection and evidence; GuardDuty, CloudTrail, Inspector, Macie | Detect, verify and respond | Cedar Ridge investigation | Outcome-based evaluation |
| P0 | M04: Security Hub ecosystem; Security Hub, CSPM, Config, exposures, Security Lake | Centralize and prioritize risk | Findings-to-response flow | AWS versus CNAPP/SIEM |
| P0 | M05: AI agents and security; Bedrock, Guardrails, AgentCore | Secure AI workloads and tool calls | Threat model + policy boundary | AI security CISO meeting |
| P1 | M06: network/app security; VPC, WAF, Shield, Network Firewall, Route 53 | Protect edge and lateral paths | Web app threat model | Consolidation versus specialist edge |
| P1 | M07: data governance; Macie, S3, KMS, IAM, Audit Manager | Discover and protect sensitive data | Sensitive-data path | Regulated-industry value |
| P1 | M08: AWS Security Hub Extended and AWS Marketplace | Native + curated partner choices | Dated partner/category catalog | Partner procurement and economics |
| P1 | M09: multicloud and CNAPP alternatives | Protect cross-cloud assets and runtime | AWS/Azure evidence map | Wiz/Prisma/Defender/CrowdStrike evaluation |
| P1 | M10: security operations integration | SOC analytics, detection engineering, automation | Security Lake → SIEM case | SOC operations pilot |
| P1 | M11: vertical buying models | Healthcare, financial services, manufacturing, energy | Controls and compliance hypothesis | Industry-specific discovery |
| P1 | M12: AWSI territory and GTM | Own proactive security pipeline with SA/AM | Account-security playbook | 30/60/90 plan, experiments, metrics |

**Learning contract for every module:** 3–5 objectives, prerequisites, definition, architecture/dataflow, what each service *does not* do, official primary documentation, verified ecosystem relationships, synthetic decision, CISO value questions, assessment and teach-back. Reuse the canonical Security Market Map IDs and links. Do not duplicate product records merely to create a lesson.

## Track 3: Deep AI specialization (after first five modules)

1. **AI system design:** Bedrock, SageMaker, models, inference, RAG, embeddings/vector retrieval, knowledge bases, agents and APIs.
2. **Secure AI data paths:** data classification, encryption, tenant isolation, network paths, privacy, model input and output controls.
3. **Agent identity and authorization:** AgentCore Identity, Gateway, Policy, tool/action scopes, temporary credentials, human approval, audit.
4. **Prompt injection and LLM risks:** retrieval/tool boundaries, jailbreaks, output handling, testing; OWASP LLM Top 10 and MITRE ATLAS as research frameworks.
5. **Bedrock Guardrails and Automated Reasoning:** distinguish configured content/prompt-attack filters from logical policy validation and action authorization; exact efficacy unverified without tests.
6. **AI visibility:** Security Hub AI inventory and 31 AI Security Best Practices CSPM controls (AWS-published as of June/July 2026); asset inventory is not runtime protection.
7. **AI supply-chain and workload runtime:** packages, models, containers, permissions, vulnerability and integrity.
8. **Specialist vendor comparison:** Noma, Zenity, Oligo, AI security platforms; scope, supported deployment and evidence, no assumed parity.
9. **CISO AI security economics:** security gate versus blocker, cost dimensions (tokens, guardrails, runtime, logging, SOC), latency, safe deployment and measurable pilot.
10. **Capstone:** fictional Bedrock assistant affected by untrusted retrieved text attempting an unauthorized export. Produce architecture, controls, incident evidence, competing approaches, and a CISO decision brief.

**2026 sources:** [Security Hub AI inventory](https://aws.amazon.com/about-aws/whats-new/2026/07/aws-security-hub-ai/), [CSPM 31 AI controls](https://aws.amazon.com/about-aws/whats-new/2026/06/aws-security-hub-cspm-ai-security/), [AgentCore policy and guardrails docs](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy-guardrails-in-policies.html), [AWS Agentic AI factory](https://docs.aws.amazon.com/solutions/building-an-agentic-ai-factory-on-amazon-bedrock-agentcore/).

## Track 4: 10 AWSI enterprise sales practice scenarios

Use fictional accounts only, with a consistent contract **Trigger → Hypothesis → Buying group → Required discovery → Architecture → Compete/coexist → Pilot → Metrics → Next step**.

| Scenario | Initial trigger | Technical focus | Buyer and proof |
| --- | --- | --- | --- |
| S01 Healthcare S3 incident | Suspicious cloud data access | IAM, GuardDuty, Hub, Macie, CloudTrail | CISO, cloud security; scoped evidence and response time |
| S02 Finance multicloud risk | Audit and cross-cloud ownership | CSPM, exposures, IAM, Azure monitoring | CISO, GRC; control coverage and exceptions |
| S03 Manufacturing exposure | New internet-facing services | VPC, WAF, Shield, Inspector | IT/OT security, application owner; exposure verification |
| S04 SOC consolidation | Many detections and high analyst effort | Hub, Security Lake, SIEM/SOAR | SOC leader; signal quality, analyst time, integration cost |
| S05 AI agent rollout | Business wants agent access to customer data | Bedrock, AgentCore, Guardrails, IAM | CISO, AI platform; policy coverage and violations blocked |
| S06 Cloud workload displacement | Existing CNAPP, renewal approaching | Hub, Inspector, GuardDuty, partner tools | CloudSec, procurement; side-by-side test and migration burden |
| S07 Secrets and machine identity | CI/CD secret leaks / service tokens | IAM, Secrets Manager, KMS, scanners | AppSec, platform; response time and permissions scope |
| S08 Secure developer pipeline | New containerized apps | ECR, Inspector, CodeBuild, partner supply-chain | DevSecOps; build guardrail coverage and developer effort |
| S09 Partner-led security | Customer needs specialist capability | Hub Extended, Marketplace and verified SKU | Procurement/CISO; verified terms, deploy effort, ownership |
| S10 Portfolio 7–10 accounts | Growth in existing strategic AWS customers | Cloud security architecture + sales | 30/60/90 prioritization, credible pipeline hypotheses |

## Role-specific selling operating playbook

**Account inputs (synthetic or authorized):** industry, workload portfolio, security baseline, key risk initiatives, stakeholders, incumbent solutions, procurement/renewal cycle, governance constraints, available SA capacity. Unknowns are explicit.

**Priority heuristic (educational, not a prediction):** rank accounts by identifiable security trigger, verified technical whitespace, urgency, executive access, evaluation feasibility and account-team alignment. Do not score unknowns as negative claims. Start with 2–3 account plays; test one message variant at a time.

**Seller / SA / AM handshake:**
- Seller: security hypotheses, new CISO engagement, qualification, owning security pipeline and deal strategy.
- Dedicated SA: technical discovery, security architecture, evaluation criteria, evidence/technical validation.
- AWS account manager: account orchestration, existing commercial context, executive introduction and account-wide coordination, consistent with public AWSI posting.
- Partners: source-backed capabilities and accurate commercial route. **No guaranteed commission-credit split inferred.**

**Weekly scorecard (proposed):** accounts with validated security hypotheses, introductions to security buying centers, discovery meetings, qualified opportunities, evaluated problem statements, pilot acceptance criteria, pipeline created, blocked technical decisions, opportunity stage movement. Guard against vanity activity; include actual pipeline outcomes and debriefs. No fabricated quota or win rates.

### CISO discovery template

- **Why now?** What threat, compliance finding, AI initiative or tool renewal triggered attention?
- **Risk and business impact?** Which customer-facing process, data, SLA or board concern is affected?
- **Existing architecture?** Where are native, partner, CNAPP/SIEM, IAM, AI security tools already embedded?
- **Buying criteria?** Coverage, multicloud, runtime, detection proof, migration cost, region, data handling, responsiveness?
- **Evidence?** How will both sides establish baseline, evaluate efficacy and verify results?
- **Decision?** Who owns budget, approves a pilot, integrates tools, and decides change versus coexistence?

## Recommended sequencing and schedule

**Interview runway:** do the three P0 sessions first; regardless of whether the interview happens on the preferred date, prioritize the first five modules and six factual personal stories over catalog breadth.

**Post-interview 4-week learning cycle** (suggestion, not scheduled work):
- Week 1: M01–M05 including Cedar Ridge and synthetic AI agent scenario.
- Week 2: M06–M08 plus five category snapshots from Extended.
- Week 3: M09–M11, remaining five Extended categories, five seller scenarios.
- Week 4: M12, remaining seller scenarios, independent market comparisons, teach-back capstone.

This four-week plan replaces a 12-week completion assumption. Deep product/vendor research can continue after the initial core competence milestones.

## Product connections and evidence boundary

Use existing [core AWS map](aws-security-ecosystem-2026-11.md), [2026 expansion](aws-security-ecosystem-expansion-2026-11.md), [Hub + AI roadmap](aws-security-hub-ai-curriculum-roadmap-2026-11.md) and current `/learn` as source material. Keep Security Hub Extended's 23 named partners and category/SKU data sourced and dated; a curated partner is **not** proof of feature parity, exclusive commercial relationship, full automatic integration or displacement win. Reconcile open PRs and existing typed IDs prior to app work. Link to `/landscape`, `/categories`, `/compare` and `/vendors` rather than duplicate records.

**Deliverable and repository boundaries:** This Markdown is a role-focused **curriculum specification**, not 12 finished interactive courses. The existing Cedar Ridge + AWS foundations interactive slice is a prototype. Builder Academy should own future assessments and persistent progress after its repository and data model are confirmed. GTM Revenue OS should own private account/deal simulations later. No automatic cross-repo writes.

## Acceptance checklist

- [x] Public AWSI job description mapped to technical and commercial curriculum outcomes.
- [x] Interview sprint, 12-module progression, AI specialization and 10 customer scenarios defined.
- [x] AWS-native and independent-vendor boundaries explicitly called out.
- [ ] Human/editorial review of details and current service pricing, source dates and availability.
- [ ] Validate technical knowledge checkpoints against current primary documentation.
- [ ] Implement interactive lessons beyond existing first foundations slice on a separate reviewed code scope.
- [ ] Connect Builder Academy progress once destination and privacy contract verified.
- [ ] Tests, browser/keyboard/responsive checks on any future code change; none claimed for this specification.
- [ ] No merge, deploy or paid cloud resources without explicit approval.
