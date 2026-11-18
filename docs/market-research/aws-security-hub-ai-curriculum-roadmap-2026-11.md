# AWS Security Hub + AI Security: complete product curriculum and delivery roadmap

**Status:** proposed research and learning plan, not published feature coverage | **As-of:** 2026-11-17 | **Owner:** Security Market Map for public reference; Builder Academy proposed as learner experience owner | **Start:** existing Cedar Ridge workload-identity scenario | **No live AWS provisioning or paid usage**

**Related:** [AWS core ecosystem](aws-security-ecosystem-2026-11.md), [2026 ecosystem expansion](aws-security-ecosystem-expansion-2026-11.md), [AWS learning curriculum](aws-security-learning-curriculum-2026-11.md), [Cedar Ridge learning scenario](aws-security-learning-scenario-2026-11.md), current app `/learn?scenario=cedar-ridge`.

## Scope and definitions

Build a comprehensive **learning and market reference map**, not a single vendor-feature checklist. Distinguish:
1. **AWS Security Hub Essentials**, bundled included capabilities, and *optional* Threat Analytics / Lambda Code Scanning add-ons.
2. **AWS-native security services** (GuardDuty, Inspector, Macie, IAM Access Analyzer, Config, Security Hub CSPM, Security Lake, Detective, Audit Manager, WAF, KMS, Secrets Manager etc.), which may be integrated, adjacent, included in a specific plan, or separately billed. Do not assume that all AWS security services are in Essentials.
3. **Security Hub Extended curated catalog:** **23 partners** and **10 categories** based on AWS's latest inspected August 2026 public roster; distinguish partners (companies) from individual product SKUs and verify category association and supported editions against current Security Hub pricing.
4. **Wider Security Hub / Security Hub CSPM integrations:** separate documented integration relationships from the curated Extended commercial program. A vendor may integrate with Hub without being an Extended partner.
5. **AWS AI application security and AI security vendors:** Bedrock, Guardrails, AgentCore, IAM/STS, KMS, CloudTrail, Secrets Manager, Security Hub AI inventory, and specialist products (not all curated/overlapping).
6. **Out-of-scope for this roadmap:** actual customer/account information, interviewing materials, private compensation, credential collection, deployment, real-world risk scoring, vendor rankings, automated imports to other repositories.

Official pages are **AWS-published claims**, not independently tested protection or comparative superiority. All new relationships remain research candidates pending human editorial review. Capture publication date, date checked, buyer scenario, product scope/edition, relationship type, and explicit Unknowns.

## Learning structure for each product

Each product has a reference card and one or more lessons, not a duplicated catalog record:
- **Foundation:** the security problem and what can go wrong before naming the vendor.
- **Technical mechanics:** inputs, outputs, architecture and trust boundary; prerequisites / covered and uncovered assets.
- **Operational workflow:** enablement concepts, findings/events, who investigates, false positives, response and failure handling.
- **Commercial lens:** buyer, use case, differentiation hypothesis, deployment cost dimensions, pricing model, proof-of-value and acceptance criteria.
- **Market links:** same-category alternative, partial overlap, complementary integration, procurement route or Unknown, with source and caveat.
- **Learning assessment:** scenario decision, explanation of *why*, model architecture, three-minute teach-back, measurable outcome.
- **Source record:** canonical vendor URL, published date (or Unknown), observed/reviewed time, evidence type, plan/region, and review trigger.
- **Mastery states:** not started → explain → apply → compare → teach back. Never equate learning progress with source verification.

## Phase A: AWS Security Hub core products and capabilities

**Learning goal:** explain what each component does and what is included or extra in a buyer's plan.

| Unit | Service or capability | Core concept | Applied exercise | Relation |
| --- | --- | --- | --- | --- |
| A1 | AWS account / Organizations / IAM / STS | Accounts, identities, access policy evaluation | Narrow Cedar Ridge ECS task role | Underlying architecture, not a Security Hub product |
| A2 | Security Hub Essentials | Inventory and unified exposure analysis | Explain what a resource unit represents, what risk is prioritized | Foundation, AWS pricing plan |
| A3 | Security Hub CSPM / AWS Config | Configuration and standards checks | Distinguish bad policy from suspicious behavior | Posture source, included scope by plan |
| A4 | Amazon Inspector | Workload/software vulnerability and container/code scanning | Decide which exposure or vulnerability merits remediation | Included capabilities vary with plan; some scan modes billed separately |
| A5 | GuardDuty + Threat Analytics | Finding versus proof, activity, DNS, S3, runtime | Triage synthetic anomalous S3 API access | Optional add-on to Essentials for specified capabilities |
| A6 | Macie | Sensitive S3 data discovery/classification | Determine business impact of exposed bucket | Distinct service, integrate findings; not claim bundled |
| A7 | IAM Access Analyzer + unused access findings | Permissions exposure and least privilege | Identify excess action/resource scopes | Distinguish service feature and Hub-based findings |
| A8 | Security Hub exposure findings, resource graph, network scanning | Path to exploitable risk; internet reachability | Trace reachable asset to sensitive data | Verify scope AWS/Azure and supported assets |
| A9 | Security Hub automation + EventBridge + incident workflow | Routing, ownership, approval, reversible containment | Write event-to-case flow | Automation is not automatic full remediation |
| A10 | Security Lake + CloudTrail + Detective + CloudWatch | Telemetry, normalized security lake, evidence, investigation | Reconstruct incident timeline | Adjacent and separately priced where applicable |
| A11 | Hub pricing, trial, editions and AWS security portfolio boundaries | Resource units, addon events/GB/vCPU, per-partner plans | Explain a hypothetical cost bill with assumptions | No live billing or surprise enablement |
| A12 | Azure multicloud and Security Hub AI inventory | Cloud exposure and inventory coverage | Compare Azure asset vs AWS coverage; inventory vs runtime | Verify current Region, supported inventory and exact service constraints |

**Important distinctions to teach:** Security Hub ≠ Security Hub CSPM ≠ Security Lake ≠ SIEM. Threat detection ≠ vulnerability assessment ≠ identity permission analysis ≠ data sensitivity. Resource inventory ≠ runtime prevention. Pricing varies by plan/capability and can change.

## Phase B: Security Hub Extended all 23 curated partners

**Completeness target:** one reviewed **vendor and currently offered SKU** profile for each of AWS's 23 curated partners; one category learning scenario for each of the 10 categories. Do not publish a product name or category assignment from memory without matching the live official AWS Extended catalog.

**Dated roster (August 2026):** 7AI, Britive, Chainguard, CrowdStrike, Cyera, Island, LayerX, Native Security, Noma, Okta, Oligo, Opti, Palo Alto Networks, Proofpoint, SailPoint, SentinelOne, Socket, Splunk, Sublime, Upwind, Varonis, Zenity, Zscaler. Source: [August AWS partner roster](https://aws.amazon.com/blogs/security/security-hub-extended-adds-supply-chain-security-as-its-tenth-category/).

| Category | Current roster candidates to reconcile to exact SKUs | Fundamental buyer question | Lab concept |
| --- | --- | --- | --- |
| Endpoint | CrowdStrike, SentinelOne | How are compromised hosts/workloads found and stopped? | Contrast host telemetry with AWS event-based findings |
| Identity | Britive, Okta, SailPoint, Opti; CyberArk/Idira identity naming needs current plan SKU verification | Who has access, standing privilege, identity lifecycle and machine identity? | Compare least-privilege IAM with workforce/privileged identity governance |
| Email | Proofpoint, Sublime | What blocks/triages phishing, malicious mail and account compromise? | Map inbound delivery, post-delivery remediation, user and identity context |
| Network | Zscaler, Palo Alto Networks | Which traffic, remote access and network edge controls are required? | Trace application attack surface and user access route |
| Data | Cyera, Varonis | Where is regulated data and who can access it? | Compare Macie S3 scope to cross-platform data inventory and entitlements |
| Browser | Island, LayerX | How are browser sessions/apps and user actions controlled? | Browser-to-SaaS exfiltration decision |
| Cloud | Native Security, Upwind; other providers may cross-category | What distinguishes CSPM, runtime/cloud detection and multicloud coverage? | Compare AWS exposures with application runtime signals |
| Artificial intelligence | Noma, Oligo, Zenity; exact product SKUs to verify | Discovery, red teaming, agent tool control or runtime protection? | Prompt injection versus unauthorized tool execution |
| Security operations | Splunk, 7AI, Opti where current category applies | Which system correlates findings, investigates and responds? | AWS finding to SIEM and investigation agent |
| Supply chain | Chainguard, Socket | How do malicious or untrusted packages enter a build? | Synthetic dependency and provenance review |

**Careful interpretation:** Table provides a learning grouping of vendors/categories, **not** a finalized AWS exact vendor-to-category crosswalk. Some vendors sell products in multiple categories and AWS can change SKUs. Count by **unique vendor identity** = 23 in the roster; additional named historical products (e.g., CyberArk/Idira) are not extra partners without source confirmation. Verify official SKU/product list at [Security Hub pricing page](https://aws.amazon.com/security-hub/pricing/) before moving into typed records.

### Sequence for all 23 profiles

- **Batch 1 (core-to-Cedar Ridge):** CrowdStrike, Upwind, Native Security, Cyera, Varonis, Splunk, 7AI, Britive, Opti.
- **Batch 2 (identity and SaaS perimeter):** Okta, SailPoint, Proofpoint, Sublime, Island, LayerX, Zscaler, Palo Alto Networks.
- **Batch 3 (AI and software supply chain):** Noma, Oligo, Zenity, Chainguard, Socket, SentinelOne.
- **Cross-cutting review:** confirm exact 23-vendor membership, category, SKU, source, launch/availability, integration path, and procurement terms. No unsourced feature check marks.

## Phase C: AWS AI application and security track

**Goal:** understand **the AI system first**, then its security controls, then compare specialist vendors by specific buyer job.

| Unit | Concept and AWS service | What learner must demonstrate | Compare against |
| --- | --- | --- | --- |
| C1 | Bedrock models, APIs, inference, knowledge bases, agents | Data path and who can invoke the model | In-house / other cloud LLM stacks |
| C2 | Shared responsibility for AI; IAM/STS, network isolation, KMS, Secrets Manager, CloudTrail | Secure principal/tool/data boundaries and audit assumptions | Third-party AI observability and access governance |
| C3 | Bedrock Guardrails: content, denied topics, sensitive info, prompt-attack filters | Distinguish content policy from application authorization | Noma, Zenity, other runtime filters, explicit coverage differences |
| C4 | Automated Reasoning checks | Distinguish validating policy-relevant assertions from prompt injection defense | Rule validation/guardrails, not full threat prevention |
| C5 | Bedrock AgentCore Runtime, Gateway, Identity | Trace tool calls, credentials, and authorization through agent boundary | Agent security and NHI/privileged access tools |
| C6 | AgentCore Policy + Guardrails integration | Explain deterministic action authorization, guardrail filtering, approval and audit | AI runtime controls; don't assert equivalence |
| C7 | Security Hub AI inventory and AI-SPM | Inventory AI assets vs discover vulnerable model/agent permissions | Noma, Oligo, Zenity; AI-SPM scope |
| C8 | AI red team / testing / runtime | Attack simulation, prompt injection, tool misuse, data leaks and limitations | Noma, Zenity, Oligo, other security options |
| C9 | AI security and SOC operations | How AI findings reach security workflows; quality, latency, privacy | 7AI, Splunk, SIEM/SOAR, human approval |
| C10 | AI economics + GTM | Per-token usage, policy checks, platform and vendor costs, evaluation quality | Buy vs build, defense in depth, production readiness |

**Architecture exercise:** fictional Bedrock assistant can read internal report objects and invoke a reporting API. A malicious retrieved document instructs the assistant to call an export tool. Learner diagrams trust boundaries, separates prompt injection from authorization decisions, applies least-privilege roles and Gateway/AgentCore Policy where relevant, evaluates Guardrails, traces logs, and decides whether a specialist product adds meaningful prevention or monitoring. No actual prompts used against live targets; no paid resources enabled.

**AWS-documented caveat:** Bedrock Automated Reasoning checks **do not themselves provide prompt injection protection**; they validate policy-scoped statements. See [AWS Automated Reasoning limitations](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html). AgentCore Policy integration with Guardrails is described in [AWS June 2026 announcement](https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-bedrock-agentcore-policy-guardrails-generally-available/).

## Phase D: additional ecosystem beyond Extended (separate lane)

Research the **wider Security Hub CSPM integration directory** and selected specialist vendors on a different list:
- Capture **direction**: sends findings, receives findings, or other integration, not just 'supports AWS'.
- Capture product-specific region/format (ASFF versus OCSF), required configuration, edition and source.
- Distinguish curated Extended, ordinary Marketplace listing, AWS Partner Network, native AWS integration, and no verified connection.
- Start with existing Market Map vendor entries (Wiz, Microsoft Defender for Cloud, Google SecOps, Prisma Cloud, GitGuardian, Infisical, HashiCorp Vault) and expand according to a concrete buyer scenario, not breadth for its own sake.
- Do **not** equate a named integration with formal partnership or reseller eligibility.

Sources: [AWS-native CSPM integrations](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html), [third-party CSPM integrations](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-partner-providers.html).

## Delivery roadmap (proposed relative weeks, not scheduled)

| Stage | Work package | Acceptance evidence | Priority |
| --- | --- | --- | --- |
| Weeks 1–2: foundation | Complete Cedar Ridge and A1–A7 core lessons, review source evidence and teach-backs | Can explain IAM, CloudTrail, GuardDuty, Inspector, Macie, CSPM, Security Hub | Now |
| Weeks 3–4: Security Hub full model | A8–A12, edition/cost table, alert → prioritization → incident flow | Can distinguish included vs add-ons vs separate services; example cost model | Now |
| Weeks 5–7: Extended ecosystem | 23 vendor/SKU reference records, 10 category lessons, batch-by-batch review | All 23 unique vendors checked against AWS pricing roster, explicit Unknowns, at least one buyer question per category | Next |
| Weeks 8–10: AI security | C1–C10, Bedrock agent synthetic incident and three specialist comparisons | Can design secure AI agent and explain inventory, IAM, Guardrails, policy, runtime and monitoring | Next |
| Weeks 11–12: market + commercial synthesis | Cross-market alternatives, 3 reference architectures, CISO discovery/evaluation, source quality audit | Buyer can choose coexistence vs replace based on requirements; measured evaluation criteria | Later |
| Later | Interactive Builder Academy progress, optional offline Python parser, more multicloud and integrations | Reviewed interface and explicit project approval | Later |

These weeks describe a **curriculum sequencing model**, not a commitment or asynchronous background job.

## Repository implementation plan

**Canonical knowledge owner: Security Market Map**
1. Preserve existing `lib/data` IDs and category taxonomy. Add researched source links and candidate positioning notes before typed records.
2. Build one **read-only AWS ecosystem learning lens** using existing `/landscape`, `/compare`, `/vendors/[slug]`, `/learn` if needed, not a new parallel platform.
3. Represent `Service→SecurityCapability`, `FindingSource→SecurityHub`, `Service→Workload`, `Partner→ExtendedCategory`, `Product→Integration`, `Product↔Product` (overlap/complement with buyer context), `Plan→IncludedCapability`, and `LearningModule→Concept` only through schema-approved relations. Keep Unknown by default.
4. In any product comparison, show **AWS-native / extended third party / independent alternative / incumbent/no-change** and evidence confidence.
5. Add source freshness and correction ownership; do not silently promote product-marketing claims to 'verified'.
6. Keep actual learner progress/assessment state outside public vendor catalog.

**Builder Academy** (future approved owner): lesson UI, practice mode, checkpoints, assessments, review schedule, labs; consume stable catalog IDs and source links after auditing its current conventions, with no automatic cross-repo writes in this phase.

**Detector Coverage Atlas:** only specific detector behavior measured/tested, not marketing equivalence; link to appropriate reviewed evidence.

**GTM Revenue OS:** fictional CISO discovery, sales play, competitive objection, proof-of-value and economics exercises; avoid private accounts here.

## Data contract for each service/product (proposal, no schema mutation)

```json
{
  "stable_id": "reuse-existing-id-or-propose-one",
  "vendor_id": "reviewed-catalog-id",
  "product_or_service": "canonical current name",
  "relationship_to_security_hub": "native-included | native-add-on | separate-aws-service | extended-curated | integration-only | no-confirmed-relationship",
  "security_category": "existing-canonical-category",
  "buyer_job": "one decision/outcome",
  "input_signals": ["documented source only"],
  "output_or_control": "source-backed description",
  "exercise_id": "existing-or-proposed-synthetic-id",
  "relationship_edges": [{"type": "complementary | partial-overlap | direct-substitute-for-defined-use-case | integration | unknown", "source_url": "original-url", "scenario": "buyer-job"}],
  "source": {"url": "canonical-original-url", "publisher": "publisher", "published_date": null, "checked_date": "2026-11-17", "evidence_type": "vendor_published", "reviewer": null},
  "plan_region_limitations": "Unknown until separately confirmed",
  "publish_status": "research_candidate"
}
```

## Quality and release gates

- [ ] Reconcile existing vendor IDs, product names, categories, claims and **open** PRs before any typed catalog change.
- [ ] Individually validate current editions, category and supported integration / commercial access for all 23 vendors; preserve August 2026 roster as historical snapshot.
- [ ] For AWS Essentials, distinguish included capabilities and non-included GuardDuty/Inspector/Macie/Security Lake features; label plan and pricing data as time-sensitive.
- [ ] Require per-product canonical evidence and Unknown state; never claim head-to-head detection superiority or aggregate savings from vendor assertions.
- [ ] Validate course questions for correct technical answers, progressive prerequisites, accessible interactions and working 'broaden scope' navigation.
- [ ] Run research integrity, tests, typecheck, lint, build and browser checks only on the exact code/PR head when application changes occur.
- [ ] Human editorial review and explicit approval prior to merge, deploy, AWS resource creation or cross-repo writes.

## Primary source register

| Source | Publisher | Date | Why |
| --- | --- | --- | --- |
| [Security Hub pricing, plan and 23-product list](https://aws.amazon.com/security-hub/pricing/) | AWS | live, reviewed 2026-11-17 | Essentials, Threat Analytics, Lambda Code Scanning, Extended plan, partners and billable metrics |
| [Unified Security Hub overview](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub-v2.html) | AWS | live, reviewed 2026-11-17 | OCSF and aggregation responsibilities |
| [CSPM overview](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html) | AWS | live, reviewed 2026-11-17 | Posture checks and ASFF distinction |
| [AWS Security Hub Extended roster](https://aws.amazon.com/blogs/security/security-hub-extended-adds-supply-chain-security-as-its-tenth-category/) | AWS | 2026-08-18 | Historical 23 names/10 category snapshot |
| [Extended supply chain addition](https://aws.amazon.com/about-aws/whats-new/2026/08/aws-security-hub-extended-adds-supply-chain-security/) | AWS | 2026-08-04 | Chainguard and Socket |
| [Native CSPM integrations](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html) | AWS | live, reviewed 2026-11-17 | Sends/receives findings |
| [Third-party CSPM integrations](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-partner-providers.html) | AWS | live, reviewed 2026-11-17 | Wider integration directory, distinct from Extended |
| [Bedrock guardrail Automated Reasoning limits](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html) | AWS | live, reviewed 2026-11-17 | Important anti-overclaim point |
| [AgentCore Policy + Guardrails](https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-bedrock-agentcore-policy-guardrails-generally-available/) | AWS | 2026-06-17 | AI agent authorization and content evaluation |
