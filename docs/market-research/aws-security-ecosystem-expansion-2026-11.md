# AWS Security Ecosystem: 2026 expansion and cross-market learning index

**Status:** dated, public research candidate; **reviewed:** 2026-11-17; **owner:** Security Market Map editorial review pending.  
**Foundation:** [AWS core ecosystem](aws-security-ecosystem-2026-11.md) · [Cedar Ridge scenario](aws-security-learning-scenario-2026-11.md) · [AWS learning curriculum](aws-security-learning-curriculum-2026-11.md).

## Why this expansion exists

Use AWS as one reference implementation of security architecture, not as a universal replacement for specialist products. Every entry follows: **buyer problem → AWS native service and configuration → evidence/detection path → complementary or overlapping product category → commercial/operational choice**. The page is a *research index*, not newly verified product claims in `lib/data`. Public AWS statements are labeled **AWS-published**, and competitive overlap remains conditional on the buyer requirement.

## 2026 AWS Security Hub developments to teach explicitly

| Development | AWS public description, observed 2026-11-17 | Foundation concept | Market connection | Caveat |
| --- | --- | --- | --- | --- |
| Security Hub unified experience | Correlates GuardDuty, Inspector, Macie, CSPM and other findings and contextualizes priority | Aggregation versus detection; security operations | SIEM, SOAR, CNAPP, exposure management | Not synonymous with Security Hub CSPM, Security Lake, or an entire SOC |
| Unused IAM access (May 20) | AWS describes 90-day access analysis and unused-permission/role/credential findings | Least privilege and CIEM | Wiz/Prisma Cloud cloud entitlement analysis, identity governance | Validate permissions and supported regions/editions; measured access history is not proof permissions are unnecessary for rare events |
| Network Scanning (July 8) | AWS describes active internet reachability scanning of certain AWS and Azure assets | Attack surface versus possible network reachability | Exposure management, EASM, CNAPP | Actual scanning coverage, authorization and limits require current product docs |
| Microsoft Azure monitoring (July 7) | AWS describes Azure resource discovery, posture, vulnerability and risk correlation | Multicloud security | Microsoft Defender for Cloud, Wiz, Prisma Cloud | Don't imply full GCP/on-prem parity or that Azure credentials/data ingestion are automatic |
| AI asset inventory (July 14; Azure extension Sept 22) | AWS describes identifying managed and self-hosted models/agents through Config and Inspector-derived inventory | AI asset discovery versus runtime enforcement | AI-SPM, model security, Noma, Zenity, Oligo and other specialized AI tools | Finding assets is not testing prompt attacks, tool authorization, or runtime protection |
| Security Hub Extended (Aug 4) | 23 curated partner solutions in 10 security categories with OCSF findings and centralized procurement approach | Ecosystem and partner-led architecture | Endpoint, identity, email, cloud, data, browser, network, AI, SecOps, supply chain | Curated partner ≠ exclusive relationship, feature parity, automatic universal integration, or proven savings |
| Runtime overlap acknowledged (Aug 31) | AWS explicitly discusses partnering with Upwind while overlapping in some cloud security capabilities | Posture versus runtime workload behavior | CNAPP/CWPP, eBPF runtime, coexistence versus replacement | AWS marketing/customer story, not independently measured comparative superiority |

### Direct original sources (all AWS-published)

1. [Security Hub overview](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub-v2.html), live documentation, reviewed 2026-11-17.
2. [Security Hub and Security Hub CSPM distinction](https://docs.aws.amazon.com/securityhub/latest/userguide/), live documentation, reviewed 2026-11-17.
3. [Unused access finding launch](https://aws.amazon.com/about-aws/whats-new/2026/05/aws-security-hub-unused-access/), published May 20, 2026.
4. [Network Scanning](https://aws.amazon.com/about-aws/whats-new/2026/07/aws-security-hub-network-scanning/), published July 8, 2026.
5. [Azure monitoring launch](https://aws.amazon.com/about-aws/whats-new/2026/06/aws-security-hub-supports-monitoring-microsoft-azure/), posted July 7, 2026.
6. [AI inventory](https://aws.amazon.com/about-aws/whats-new/2026/07/aws-security-hub-ai/), published July 14, 2026.
7. [AI inventory on Azure self-hosted instances](https://aws.amazon.com/about-aws/whats-new/2026/09/security-hub-ai-inventory-azure-support/), published September 22, 2026.
8. [Extended 23-partner snapshot](https://aws.amazon.com/about-aws/whats-new/2026/08/aws-security-hub-extended-adds-supply-chain-security/), published August 4, 2026.
9. [AWS discussion of overlap and Upwind](https://aws.amazon.com/blogs/security/we-invited-a-direct-competitor-into-security-hub-extended-heres-why/), published August 31, 2026.
10. [Security Hub Extended plan documentation](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-extended-plan.html), live documentation, reviewed 2026-11-17.

## Buyer-led relationship map (candidate links, not feature claims)

| Buyer decision | AWS native starting point | Alternatives / adjacencies to evaluate | Relationship hypothesis to validate |
| --- | --- | --- | --- |
| Who can access cloud resources? | IAM, IAM Identity Center, STS, Access Analyzer, Security Hub unused access | CyberArk, SailPoint, Britive, Okta, Wiz, cloud CIEM vendors | Complementary for broader governance; partial overlap in entitlement analysis |
| Which infrastructure is vulnerable or exposed? | Inspector, Config, Security Hub CSPM, Network Scanning, Security Hub Exposures | Wiz, Prisma Cloud, CrowdStrike Falcon Cloud Security, Upwind | Partial overlap; runtime coverage and cloud scope must be tested |
| Is an attack underway? | GuardDuty, Security Hub, Detective | CrowdStrike, Prisma Cloud, Upwind, EDR, MDR | Different detection sources and response capabilities; not automatic substitutes |
| How do investigators use telemetry? | CloudTrail, Security Lake, EventBridge, Security Hub | Splunk Enterprise Security, Microsoft Sentinel, Google SecOps, LimaCharlie | AWS telemetry and triage may complement broader SIEM/SOAR/MDR workflows |
| Where is sensitive cloud data? | Macie, S3 access controls, KMS | Cyera, Varonis, enterprise DSPM/DLP | Partial overlap for S3-specific discovery; cross-platform scope may differ |
| How are service secrets handled? | Secrets Manager, IAM roles, KMS | Vault, Infisical, CyberArk, GitGuardian, TruffleHog | Distinguish secrets storage/rotation from exposed-secret detection and nonhuman governance |
| Are AI assets and agents secure? | Security Hub AI inventory, Bedrock, IAM, KMS, CloudTrail | Noma, Zenity, Oligo, AI security platforms | Discovery vs testing, policy, runtime monitoring are different jobs |
| Are application dependencies trusted? | AWS build controls, ECR/Inspector where applicable | Chainguard, Socket, SCA and supply-chain specialists | Complementary build-time prevention versus cloud workload findings |

**Source integrity rule:** Vendor names in this table are **research candidates** and may be neither current AWS partners nor proven direct competitors for a specific requirement. Exact integrations must be individually cited and verified.

## Architecture questions learners should answer

1. What runs the workload (EC2, ECS/EKS, Lambda, Bedrock), where does it store data (S3/RDS), and which IAM principal accesses it?
2. Which controls prevent the problem, which detect it, and which supply investigation evidence?
3. If a GuardDuty signal reaches Security Hub, does the customer also have object-level CloudTrail retention? What is missing?
4. What does Security Hub CSPM contribute that a threat detector does not? What does Security Lake contribute that finding correlation does not?
5. If Wiz, Prisma Cloud or a SIEM is already deployed, what genuinely remains to be measured rather than displaced automatically?
6. If the application is multicloud or runs agents, what can inventory reveal and what would require runtime control?
7. Which team owns remediation, and how do we avoid disrupting customer production?
8. What baseline measurement would demonstrate an outcome without inventing reduced risk or savings?

## Reusable learning and reference cards

Every AWS concept/product card should include:
- **Meaning:** one sentence for a novice, then deeper technical mechanics.
- **Layer:** foundational workload, prevention, detection, posture, telemetry, investigation, response, governance, procurement.
- **Required context:** account/region, supported service/edition, logging and enablement prerequisites, cost considerations.
- **Scenario:** a concrete observation or decision in the Cedar Ridge synthetic incident.
- **Connections:** existing market category ID, vendor/product ID, source, relation type and evidence status; Unknown until reviewed.
- **Commercial context:** who buys, why now, coexistence question and measurable proof-of-value criterion.
- **Practice:** one question, one plausible false assumption, one teach-back explanation.
- **Revision:** primary URL, publisher, published date if available, checked date, reviewer, review trigger.

## Where this should live

- **Security Market Map:** primary referenced, public cross-vendor ecosystem knowledge. Reuse `/landscape`, `/compare`, `/vendors/[slug]`, existing typed IDs and claim evidence rules. Avoid a separate AWS vendor database.
- **Current /learn route:** already supports Cedar Ridge guided/reference views. The references above can deepen it after editorial and schema review.
- **Builder Academy:** proposed future owner of sequenced lessons, exercises and progress; link canonical evidence, don't clone a vendor catalog. Repository connection/path still needs confirmation.
- **GTM Revenue OS:** proposed future owner of fictional CISO discovery, account plans, business-case exercises.
- **Detector Coverage Atlas:** only reviewed detector/analyzer behavior, not untested product marketing assertions.
- **Private interview prep:** recruiter-specific notes remain outside this public repo.

## Smallest next increments

1. Editorially verify the seven 2026 feature updates and link relevant current service docs. Preserve source dates.
2. Reconcile AWS's existing vendor/product IDs and open PRs (including email security candidate PR #136). No new duplicate records.
3. Expand Cedar Ridge to show IAM unused-access context and independently retained S3 audit evidence; do not alter the original exercise without scenario review.
4. Add a second synthetic multicloud AI agent scenario only after the first lesson meets its acceptance criteria.
5. In a later approved PR, add an AWS ecosystem lens using existing /landscape components, and test responsive, keyboard, citation, back-navigation and Unknown states.
6. Define a cross-repo interface to Builder Academy (stable IDs + links) once that repository's current standards and learning contract have been inspected.

**Not implemented here:** typed catalog claims, product integrations, new UI, learner-state persistence, AWS service deployment, CI changes, autonomous ingestion, or cross-repo writes. Human review and exact-head tests are needed before publishing claims or merging.
