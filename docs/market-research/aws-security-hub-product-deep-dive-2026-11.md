# AWS Security Hub: product deep dive

**Status:** research candidate, not published typed claims | **Observed:** 2026-11-22 | **Next review target:** 2026-12-16 (after re:Invent 2026) | **Owner/reviewer:** pending human editorial assignment

**Parent:** [AWS security ecosystem](aws-security-ecosystem-2026-11.md) owns buyer scenarios, the native-service map and the Extended partner table. This page owns the product itself: what it is, how it has changed, how it is packaged and priced, and what is still unknown. Catalog records already exist: `aws-security-hub` and `aws-security-hub-cspm` in `lib/data/market.ts`. This page adds no new vendor, product, category or source registry.

All product behavior below is **AWS-published**. Nothing here was hands-on tested. Placement notes and seller questions are editorial.

## 1. The product in plain English

**One sentence.** Security Hub pulls findings from AWS security services (and, through Extended, from partner tools) into one place. It then connects findings that affect the same resource and ranks the resulting exposures, so a central security team can see what to fix first.

**For an executive.** It is AWS's single console and single bill for cloud security risk. You turn it on across your AWS organization and it tells you which problems matter most.

**For a practitioner.** Two related services:

| Service | Job | Finding format | Notes |
| --- | --- | --- | --- |
| **AWS Security Hub** (the rebuilt product, GA December 2025) | Correlates signals from Inspector, GuardDuty, Security Hub CSPM, Macie and partners into prioritized exposure findings. Adds a resource inventory, risk analytics, trends and response routing. | OCSF | Billed through Essentials (per resource unit), add-ons and Extended. |
| **AWS Security Hub CSPM** (the original 2018–2019 product, renamed) | Runs configuration checks against standards and controls. Aggregates findings from AWS and integrated products. | ASFF (AWS Security Finding Format) | Still sold standalone, priced per check and per finding ingestion. Its control findings flow into Security Hub when both are enabled. |

**Migration note.** Because the formats differ, some CSPM automation rules can't be migrated automatically to Security Hub; AWS publishes a migration approach that reports the rules it skips. Existing ASFF-based automation needs review before a customer switches. [Automation rule migration](https://aws.amazon.com/blogs/security/security-hub-cspm-automation-rule-migration-to-security-hub) · [Security Hub and OCSF](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-ocsf.html)

[AWS service distinction](https://docs.aws.amazon.com/securityhub/latest/userguide/what-are-securityhub-services.html) · [GA announcement](https://aws.amazon.com/about-aws/whats-new/2025/12/security-hub-near-real-time-risk-analytics)

**Do not collapse:** Security Hub is not Security Lake (security data storage) and is not a SIEM, SOAR or MDR service. See the ecosystem page's "products that must not be collapsed" note.

## 2. Timeline

| Date | Event | Source |
| --- | --- | --- |
| 2018-11-28 | Security Hub announced in preview at re:Invent; free during preview. | [AWS](https://aws.amazon.com/about-aws/whats-new/2018/11/introducing-aws-security-hub) |
| 2019-06-24 | General availability, announced at the first re:Inforce. | [AWS](https://aws.amazon.com/about-aws/whats-new/2019/06/aws-security-hub-now-generally-available) |
| 2025-06 | Rebuilt, unified Security Hub previewed at re:Inforce 2025. The original becomes Security Hub CSPM. | [AWS News Blog](https://aws.amazon.com/blogs/aws/aws-security-hub-now-generally-available-with-near-real-time-analytics-and-risk-prioritization) |
| 2025-12-02 | New Security Hub GA: near real-time risk analytics, trends, unified enablement and consolidated pricing. | [AWS](https://aws.amazon.com/about-aws/whats-new/2025/12/security-hub-near-real-time-risk-analytics) |
| 2026-02-26 | Extended plan GA: curated partner products sold with AWS as seller of record. | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/02/sec-hub-extended) |
| 2026-05-20 | Unused-access identity findings added to Essentials. Extended grows to 21 partners in 9 categories. | [Unused access](https://aws.amazon.com/about-aws/whats-new/2026/05/aws-security-hub-unused-access/) · [Extended](https://aws.amazon.com/about-aws/whats-new/2026/05/aws-security-hub-extended/) |
| 2026-07-07 | Microsoft Azure monitoring (VMs, container images, Function Apps, identities; CIS Azure Foundations checks). | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/06/aws-security-hub-supports-monitoring-microsoft-azure/) |
| 2026-07-08 | Network Scanning: probes resources from the internet to confirm actual reachability, across AWS and Azure. | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/07/aws-security-hub-network-scanning/) |
| 2026-07-14 | AI inventory (included in Essentials), alongside GuardDuty AI Protection. | [AI inventory](https://aws.amazon.com/about-aws/whats-new/2026/07/aws-security-hub-ai/) · [AWS Security Blog](https://aws.amazon.com/blogs/security/security-hub-adds-ai-workload-protection-and-multicloud-support-for-microsoft-azure/) |
| 2026-08-04 | Extended adds Supply Chain Security as a 10th category (Chainguard, Socket): 23 partners. | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/08/aws-security-hub-extended-adds-supply-chain-security) |
| 2026-10-01 | Remediation plans group exposures that share a root cause; also available through the API. | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-remediation-plans/) |
| 2026-10-14 | Resource criticality used to rank exposures (set by automation rule or inferred from tags and names). | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/10/security-hub-resource-criticality/) |
| 2026-11-06 | SBOM inventory built from Inspector SBOMs for EC2, ECR images and Lambda. | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-sbom-inventory/) |
| 2026-11-17 | Google Cloud monitoring (VMs, Artifact Registry images, Cloud Run functions, identities; CIS GCP Foundations checks). Criticality can also be inferred from installed software and usage. | [GCP](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-gcp/) · [Criticality](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-resource-criticality/) |

**Reading the timeline (editorial).** Through 2025 the product was mainly an AWS posture-and-aggregation tool. In 2026 AWS moved it toward an exposure-management console: correlation, criticality, remediation grouping, inventories (AI, SBOM), multicloud coverage and a partner marketplace. That puts it in more buying conversations with CNAPP and exposure-management vendors. It does **not** establish feature parity with any named vendor. Check the vendor's own documentation before writing any comparison.

## 3. Capability-to-job map

| Capability | Buyer job | Mechanism (AWS-published) | Packaging | Source |
| --- | --- | --- | --- | --- |
| Exposure findings | Decide which cloud risks to fix first | Correlates supported signals for the same resource; needs sufficient signals | Essentials | [Docs](https://docs.aws.amazon.com/securityhub/latest/userguide/exposure-findings.html) |
| Resource criticality | Rank exposures by business importance | Automation rules; inferred from tags, names, installed software and usage | Essentials | [Oct](https://aws.amazon.com/about-aws/whats-new/2026/10/security-hub-resource-criticality/) · [Nov](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-resource-criticality/) |
| Remediation plans | Fix one root cause instead of many findings | Groups exposures that share a root cause; priority, impact and steps; API access | Essentials, no additional cost | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-remediation-plans/) |
| Network Scanning | Confirm what is actually reachable from the internet | Probes public IPs, VMs and load balancers; finds open ports and services | Listed on the pricing page among Essentials capabilities | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/07/aws-security-hub-network-scanning/) |
| Unused access | Reduce identity risk | Detects unused IAM permissions, roles and credentials across the organization | Essentials, no additional cost | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/05/aws-security-hub-unused-access/) |
| AI inventory | Know which AI assets exist and their posture | Discovers Bedrock, AgentCore and other AI workloads; links to findings | Essentials, no additional cost | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/07/aws-security-hub-ai/) |
| SBOM inventory | Find where a vulnerable package is installed | Built from Inspector SBOMs where Inspector is enabled | Essentials, no additional cost | [AWS](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-sbom-inventory/) |
| Posture checks | Prove controls are configured | CSPM controls and standards; CIS benchmarks for Azure and GCP | Essentials (or CSPM standalone) | [CSPM docs](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html) |
| Coverage findings | Catch accounts that are quiet because they are unmonitored | Flags accounts without a qualifying standard | Essentials | [Docs](https://docs.aws.amazon.com/securityhub/latest/userguide/coverage-findings.html) |
| Response routing | Get the finding to the person who can fix it | EventBridge rules; Jira Cloud and ServiceNow integrations | Essentials | [EventBridge](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-v2-cwe-event-rules.html) · [Ticketing](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-v2-integrations.html) |
| Multicloud | One prioritized view across AWS, Azure and GCP | Per-cloud integration; same finding format and workflows | Billed like equivalent AWS resources after a 30-day trial (GCP announcement) | [Azure](https://aws.amazon.com/about-aws/whats-new/2026/06/aws-security-hub-supports-monitoring-microsoft-azure/) · [GCP](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-gcp/) |
| Extended partners | Buy and connect non-AWS security tools in one place | Curated partners emit OCSF findings into Security Hub; AWS bills | Extended, per-partner pricing | [Docs](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-extended-plan.html) |

## 4. Packaging and pricing

| Plan | What it covers | Price unit | Source |
| --- | --- | --- | --- |
| **Essentials** (default) | Risk analytics, vulnerability management, posture management, response. Inspector and CSPM charges are folded in. | Monitored resource units per month. 1 EC2 instance (or Azure/GCP VM) = 1 unit. 12 Lambda functions (or equivalent) = 1 unit. 125 IAM users and roles = 1 unit. Charged on all monitored resources, regardless of which capabilities are used. | [Pricing](https://aws.amazon.com/security-hub/pricing/) |
| **Threat analytics** add-on | GuardDuty detections (CloudTrail, other logs) | Per million events and per GB analyzed | [Pricing](https://aws.amazon.com/security-hub/pricing/) |
| **Lambda code scanning** add-on | Inspector code scanning | Per Lambda function | [Pricing](https://aws.amazon.com/security-hub/pricing/) |
| **Extended** | Curated partner products | Each partner's own published pay-as-you-go or flat-rate price, on one AWS bill; EDP and private-pricing eligible; Level 1 support for Enterprise Support customers | [Extended GA](https://aws.amazon.com/about-aws/whats-new/2026/02/sec-hub-extended) · [May update](https://aws.amazon.com/about-aws/whats-new/2026/05/aws-security-hub-extended/) |
| **Security Hub CSPM** (standalone) | Posture checks and finding aggregation | $0.0010 per check for the first 100,000 per account per Region per month, then lower tiers; first 10,000 finding ingestion events free | [CSPM pricing](https://aws.amazon.com/security-hub/cspm/pricing) |

**Unknowns.** The pricing page's worked examples use $3.75 per resource unit, but the page does not present that as the official rate for every Region. Treat it as an example until confirmed. Extended partner prices vary widely (per user, per seat, per Region) and are set by each partner. AWS Config charges for CSPM checks are billed separately.

## 5. Extended: what it is and why it matters commercially

- **Model.** AWS is seller of record. The customer subscribes in the Security Hub console, gets one bill, can apply committed spend, and partner findings arrive in OCSF for correlation. [Extended GA](https://aws.amazon.com/about-aws/whats-new/2026/02/sec-hub-extended) · [Supply chain update](https://aws.amazon.com/about-aws/whats-new/2026/08/aws-security-hub-extended-adds-supply-chain-security)
- **Roster.** AWS's own count went from 14 partners in 9 categories at launch to 23 in 10 by August 2026. The ecosystem page holds the [dated partner table](aws-security-ecosystem-2026-11.md#4-aws-security-hub-extended-curated-partner-ecosystem). [AWS Security Blog](https://aws.amazon.com/blogs/security/security-hub-extended-adds-supply-chain-security-as-its-tenth-category/)
- **Roster change to review.** AWS's July 14 blog lists "Idira (CyberArk)" among 21 partners. The August blog's 23-name list omits it and includes Palo Alto Networks. The reason is not stated in either post. Do not infer an acquisition or a removal from the lists alone. [July](https://aws.amazon.com/blogs/security/security-hub-adds-ai-workload-protection-and-multicloud-support-for-microsoft-azure/) · [August](https://aws.amazon.com/blogs/security/security-hub-extended-adds-supply-chain-security-as-its-tenth-category/)
- **Overlap with AWS's own products.** AWS describes Upwind as "a direct competitor" it invited in because customers asked for it. AWS says it is closing multi-million dollar deals with Upwind through Extended and that one enterprise replaced its incumbent CNAPP through an Extended Private Offer. These are vendor statements with no figures or named customer for the deals. [AWS Security Blog, 2026-08-31](https://aws.amazon.com/blogs/security/we-invited-a-direct-competitor-into-security-hub-extended-heres-why/)
- **How partners use it.** Socket's own post highlights that customers can apply committed AWS spend and start with a free first month. That is the procurement argument partners make. [Socket](https://socket.dev/blog/aws-security-hub-socket)

## 6. Adoption and revenue: Unknown

- AWS does not report revenue or customer counts for Security Hub. Status: **Unknown**.
- AWS says GuardDuty, Inspector, Shield and Security Hub together are used by "tens of thousands" of customers. That is a combined figure, not a Security Hub count. [AWS Security Blog](https://aws.amazon.com/blogs/security/aws-security-hub-extended-why-enterprise-security-products-should-sell-themselves/)
- Third-party technology-install trackers publish company counts (for example [Enlyft](https://enlyft.com/tech/products/aws-security-hub)). Their methods are not disclosed. Treat them as low-reliability signals, not as adoption evidence.
- Measurement problem for any estimate: Essentials folds Inspector and CSPM charges into one price, and Extended bills partner products through AWS. "Security Hub revenue" is therefore not comparable over time or with standalone vendors.

## 7. Seller notes (editorial hypotheses)

| Situation | Discovery question | What to prove in a pilot |
| --- | --- | --- |
| Customer already runs CSPM only | Which findings get ignored today, and why? | Exposure findings and criticality change the top-ten fix list for one representative account. |
| Many security vendors, many contracts | Which tools are due for renewal, and is committed AWS spend going unused? | One partner subscribed through Extended, with findings visible in Security Hub and routed to the owning team. |
| AWS plus Azure or GCP | Who owns findings in each cloud today? | One finding per cloud traced to an owner through the same workflow. Record any resource types not covered. |
| AI rollout on Bedrock | Do you know every agent and model endpoint in use? | AI inventory matches the customer's own list; gaps recorded. |
| Leaked or overused credentials | Who retires a key, and how do you confirm it is unused? | Unused-access findings for one account, compared with the IAM owner's records. Secrets-detection tools supply the external observation; no direct integration is assumed. |

No ROI, displacement or parity claims. Use the customer's own baseline.

## 8. Proposed placement (not implemented)

- **Zoom out:** `/landscape` → cloud security → CNAPP (`/categories/cnapp#aws-security-hub`) and cloud posture management.
- **Zoom in:** existing `aws-security-hub` and `aws-security-hub-cspm` products → existing claims (`claim-aws-hub-*`) → this page's timeline and packaging for context.
- **Candidate typed claims for review** (not added): remediation plans, resource criticality, Network Scanning, AI inventory, SBOM inventory, unused access, GCP coverage. Each needs its own source record and reviewer before promotion.
- No navigation or UI change proposed.

## 9. Open questions

1. Is $3.75 per resource unit the list rate in US Regions, and are there volume tiers?
2. Why did the Extended roster change between July and August 2026 (Idira/CyberArk vs. Palo Alto Networks)?
3. Which resource types in Azure and GCP are not yet covered?
4. What will re:Invent 2026 (December) change in packaging or roster?

## 10. Source register

| Source | Publisher | Published | Checked | Reliability boundary |
| --- | --- | --- | --- | --- |
| [What are Security Hub and Security Hub CSPM?](https://docs.aws.amazon.com/securityhub/latest/userguide/what-are-securityhub-services.html) | AWS | undated/live | 2026-11-22 (via existing catalog source) | AWS documentation |
| [Security Hub pricing](https://aws.amazon.com/security-hub/pricing/) | AWS | undated/live | 2026-11-20 | Price examples are illustrative |
| [Security Hub CSPM pricing](https://aws.amazon.com/security-hub/cspm/pricing) | AWS | undated/live | 2026-11-20 | AWS-published |
| [2018 preview](https://aws.amazon.com/about-aws/whats-new/2018/11/introducing-aws-security-hub) · [2019 GA](https://aws.amazon.com/about-aws/whats-new/2019/06/aws-security-hub-now-generally-available) | AWS | 2018-11-28 · 2019-06-24 | 2026-11-20 | Historical announcements |
| [New Security Hub GA](https://aws.amazon.com/about-aws/whats-new/2025/12/security-hub-near-real-time-risk-analytics) | AWS | 2025-12-02 | 2026-11-20 | AWS-published |
| 2026 What's New posts linked in section 2 | AWS | as listed | 2026-11-22 | AWS-published; capability scope as announced |
| [Extended adds supply chain (blog)](https://aws.amazon.com/blogs/security/security-hub-extended-adds-supply-chain-security-as-its-tenth-category/) | AWS | 2026-08-18 (page date) | 2026-11-22 | Roster as published by AWS |
| [Invited a direct competitor (Upwind)](https://aws.amazon.com/blogs/security/we-invited-a-direct-competitor-into-security-hub-extended-heres-why/) | AWS | 2026-08-31 | 2026-11-22 | Vendor statements, no figures |
| [Why enterprise security products should sell themselves](https://aws.amazon.com/blogs/security/aws-security-hub-extended-why-enterprise-security-products-should-sell-themselves/) | AWS | Unknown | 2026-11-20 | Combined customer figure only |
| [Socket: AWS Security Hub adds Socket](https://socket.dev/blog/aws-security-hub-socket) | Socket | 2026-08-04 | 2026-11-22 | Partner-published |
| [Enlyft: AWS Security Hub](https://enlyft.com/tech/products/aws-security-hub) | Enlyft | undated/live | 2026-11-20 | Undisclosed method; low reliability |

**Rights.** Short paraphrase and links only. No excerpts beyond what the catalog already stores.

**Review trigger.** re:Invent 2026 launches, any Extended roster or category change, a pricing change, or a service rename.
