# Analyst-informed DSPM and secrets expansion

As of **2026-10-13**. Status: researched and proposed; human review pending. Owner: repository maintainer. Next review: **2026-11-13**, sooner for product retirement, acquisition or packaging changes. This is a manual review target, not a scheduled monitor.

## Start here: four different buying questions

| Layer | Plain-language question | Example |
| --- | --- | --- |
| DSPM | Where is sensitive data, who can reach it, and what is exposed? | Find an over-shared customer-data store and assign its owner a remediation task. |
| Secrets detection | Has a credential escaped into code, history, messages or artifacts? | Find an API key in a commit and route it for revocation. |
| Secrets management | How should applications obtain and use credentials? | Retrieve a scoped credential at runtime rather than commit it. |
| Platform add-on | Can an existing platform cover this particular task? | Evaluate SCM secret scanning or a PAM platform's DevOps vault capability. |

These are editorial explanations. A category label establishes neither product parity nor a direct competitive relationship. A DSPM sensitive-data classifier is not automatically a credential validator; storing a secret is not proof of detecting its leaked copies.

**This change adds seven vendor records and twelve product records:** seven DSPM offerings and five secrets-management offerings. Four DSPM vendors (Arexdata, AvePoint, DECE Software, Thales) and three secrets-management vendors (Bitwarden, 1Password, Keeper Security) are newly represented in the typed catalog. Five existing parents are reused: Proofpoint, Forcepoint, Google, Delinea and BeyondTrust.

Canonical records: [typed expansion](../../lib/data/analyst-expansion.ts), composed by [catalog](../../lib/catalog.ts). Twelve product claims link directly to twelve original publisher sources. Eleven are publisher-reported; Forcepoint remains needs_review because its accessible documentation contains a testing-purpose note. No detector coverage cells, superiority scores or direct-competitor edges are added.

## Analyst evidence: what was actually accessible

Only short paraphrases and original links are retained. Public access does not grant a right to republish full reports or figures.

| ID | Original publication | Publication / update | Access and appropriate use |
| --- | --- | --- | --- |
| A1 | [Gartner: Market Overview for Data Security Posture Management](https://www.gartner.com/en/documents/8105497) | 2026-07-07 | Public abstract and contents inspected. Supports discovery, classification and data-exposure framing. Example-vendor section is gated; no vendor inclusion is inferred. |
| A2 | [Gartner: Buyer's Guide for Data Security Posture Management](https://www.gartner.com/en/documents/7930209) | 2026-05-29 | Public abstract inspected. Warns that capabilities differ across offerings. Full selection guidance not accessed. |
| A3 | [Gartner: Innovation Insight: Secrets Management Tools](https://www.gartner.com/en/documents/5666155) | 2024-08-12 | Public abstract and visible findings inspected. Useful for secrets lifecycle, secretless alternatives and the distinction from broader machine identity management. Full vendor roster not accessed. Older category guidance, not evidence of current packaging. |
| A4 | [Gartner Peer Insights: DSPM directory](https://www.gartner.com/reviews/market/data-security-posture-management) | Living page; initial publication unknown | Directory discovery only: visible entries include Arexdata, AvePoint, GEODI and Proofpoint. Customer opinions/listings are not Gartner analyst evaluations or endorsements. Ratings are not imported. |
| A5 | [Forrester: The Sensitive Data Discovery And Classification Solutions Landscape, Q4 2025](https://www.forrester.com/report/the-sensitive-data-discovery-and-classification-solutions-landscape-q4-2025/RES187445) | 2025-10-29 | Public abstract says it covers 24 vendors; full roster is login-gated. Category context only, not a secrets-detection ranking. |
| A6 | [Forrester: School Is In Session, And Attackers Are Grading Your Software Supply Chain Security](https://www.forrester.com/blogs/school-is-in-session-and-attackers-are-grading-your-software-supply-chain-security/) | 2025-09-12 | Public analyst blog. Supports layered pipeline controls including secret scans, review-enforcing branch protection and access review. Does not compare scanner effectiveness. |
| A7 | [SACR: Data Security Platforms: The New Frontier in Cybersecurity & AI](https://softwareanalyst.io/reports/data-security-platforms-the-new-frontier-in-cybersecurity-ai) | 2024-12-19; updated 2026-07-29 | Public research discusses data-security convergence and names Proofpoint/Normalyze among acquisition examples. Author discloses collaboration with Cyera for the report's second half. Preserve that relationship; not a neutral performance benchmark. |
| A8 | [SACR: The Evolution of the Privileged Access Management Market & The New Competitive Landscape](https://softwareanalyst.io/reports/the-evolution-of-the-privileged-access-management-pam-market-the-new-competitive-landscape) | 2026-01-27; updated 2026-07-29 | Public research names CyberArk, Delinea, BeyondTrust and HashiCorp in the wider PAM/secrets ecosystem, plus access-control specialists. Analyst context, not proof that every named vendor scans repositories. |

All eight were observed and last checked 2026-10-13. Analyst coverage is uneven: A1–A3 and A5 do not expose full vendor lists. This research does **not** claim all twelve additions appear in Gartner, SACR or Forrester reports. A4 and A7 supplied named DSPM discovery leads; A8 supplied PAM/secrets leads. Other rows extend those category searches through original vendor documentation.

## DSPM and secrets-management additions

Every product link below is the original source for the narrow catalog statement. Publication dates are unknown; observed and last checked 2026-10-13. Source status is publisher-reported unless explicitly needs_review. Features have not been independently tested.

| Product / parent | Primary lane | Source-backed scope | Caveat / evaluation question |
| --- | --- | --- | --- |
| [Arexdata DSPM](https://www.arexdata.com/en/) / Arexdata | DSPM | Arexdata markets DSPM for centralized data, access and permissions visibility across local and cloud repositories. | Validate connectors, deployment and enforcement scope; the fetched English URL serves Spanish content. |
| [AvePoint DSPM](https://www.avepoint.com/solutions/security-posture-management) / AvePoint | DSPM | AvePoint markets DSPM with sensitive-data discovery, access visibility and governance across its platform. | Confirm which Confidence Platform components and licenses implement the required controls. |
| [GEODI DSPM](https://www.decesoftware.com/about-us) / DECE Software | DSPM | DECE Software identifies GEODI DSPM as its platform for sensitive-data visibility across cloud, on-premises and collaboration sources. | GEODI is the product; DECE Software is the vendor. Connector depth and enforcement are untested. |
| [CipherTrust DSPM](https://cpl.thalesgroup.com/encryption/data-security-posture-management) / Thales | DSPM | Thales markets CipherTrust DSPM with discovery, data-risk analytics and integrated data-protection workflows. | Do not adopt the vendor's competitive comparison table as independently established feature parity. |
| [Proofpoint DSPM](https://www.proofpoint.com/us/normalyze-is-now-proofpoint) / Proofpoint | DSPM | Proofpoint describes DSPM for discovery, classification and data-risk remediation, with Normalyze product lineage. | Normalyze is not counted as another independent vendor. Exact acquisition closing date is not established by this page. |
| [Forcepoint DSPM](https://help.forcepoint.com/dspm/en-us/onlinehelp/guid-e9e3ca45-4e27-490c-b6ce-822b57a8eaae.html) / Forcepoint | DSPM | Forcepoint documents DSPM for sensitive-data discovery, classification and risk assessment. | The documentation contains a testing-purpose note. Confirm production version and packaging; performance and enforcement claims are not adopted. |
| [Google Security Command Center DSPM](https://docs.cloud.google.com/security-command-center/docs/dspm-data-security) / Google | DSPM | Google documents Security Command Center DSPM and states that this DSPM offering will shut down on February 1, 2027. | Lifecycle warning as observed 2026-10-13. Some controls are preview or detective-only. Review the linked alternative detection capabilities before a new purchase; no general multi-cloud parity inferred. |
| [Delinea DevOps Secrets Vault](https://docs.delinea.com/online-help/devops-secrets-vault/start.htm) / Delinea | Secrets management | Delinea documents a cloud-based DevOps vault with access controls, CLI/API access and audit logging. | Separate product from Secret Server. Vaulting does not establish repository secret-scanning coverage. |
| [BeyondTrust Password Safe — Secrets Safe](https://www.beyondtrust.com/products/password-safe/features/secrets-management) / BeyondTrust | Secrets management | BeyondTrust describes Secrets Safe as a capability within Password Safe for DevOps credential storage and access. | Platform capability rather than a separate vendor. Confirm license and rotation support; no code-scanning claim. |
| [Bitwarden Secrets Manager](https://bitwarden.com/help/secrets-manager-overview/) / Bitwarden | Secrets management | Bitwarden documents Secrets Manager with machine accounts, access tokens, CLI/SDK access and secret injection. | Separate evaluation from its human password manager; rotation and dynamic issuance coverage remain unknown here. |
| [1Password Secrets Automation](https://www.1password.dev/secrets-automation) / 1Password | Secrets management | 1Password documents Secrets Automation through service accounts or Connect servers. | Service-account and Connect architectures have different rate limits and infrastructure requirements. A self-hosted Connect server does not imply the whole vault service is self-hosted. |
| [Keeper Secrets Manager](https://docs.keeper.io/keeperpam/secrets-manager/overview) / Keeper Security | Secrets management | Keeper documents Secrets Manager as a KeeperPAM component for infrastructure secrets and application or CI/CD access. | Validate target-specific rotation and packaging. Vendor superiority and certification statements are not adopted. |

### Ownership, lifecycle and duplicate handling

- **Proofpoint / Normalyze:** current Proofpoint page identifies the product lineage. Reuse parent `proofpoint`; do not add Normalyze as a newly independent company. This page does not establish the acquisition's exact closing date.
- **GEODI / DECE:** product and publisher are separate entities. GEODI is not entered as another vendor.
- **BeyondTrust Secrets Safe:** capability within Password Safe. Its inclusion does not establish a separately purchasable SKU.
- **Google SCC DSPM:** the inspected page explicitly states shutdown on **2027-02-01**. The catalog retains the offering with a lifecycle warning and limited availability. The page also distinguishes preview controls and detective-only baseline controls. Follow its alternative-detection links before evaluation; no claim is made that this notice retires every Google data-security service.
- **Forcepoint:** documentation identifies DSPM but contains a testing-purpose note; the clean product-page fetch timed out. Keep the claim needs_review until a production document/edition is confirmed.
- **1Password:** old developer URL redirects to `www.1password.dev`; use the inspected canonical URL. Self-hosted Connect does not mean the entire service is self-hosted.
- **IBM Guardium:** historical DSPM URL redirects to a broader Guardium page. Defer a new standalone product assertion until current packaging is evidenced.
- **TrustDSPM:** directory discovery alone is insufficient; defer pending original publisher/product verification.

Duplicate search covered current `lib/data` files and open PRs as of 2026-10-13. [PR #46](https://github.com/heyfunwhoa/security-market-map/pull/46) already proposes Cyera, BigID, Varonis, Sentra, Securiti, Symmetry, Rubrik, Tenable, Wiz, Microsoft, Palo Alto Networks and Metomic coverage. Those records are not duplicated here. [PR #45](https://github.com/heyfunwhoa/security-market-map/pull/45) contains the broader Infisical comparison; the three password-manager-derived secrets products here make selected research candidates visible as typed records, without changing that comparison.

## Secrets detection and platform add-ons already mapped

The [existing sweep](secrets-detection-sweep-2026-10-13.md) contains 60 reviewed product/project records. Reuse its original sources and IDs; these examples are not new vendor additions in this change.

| Buying motion | Existing examples to compare | What to verify |
| --- | --- | --- |
| Specialist secret scanning | TruffleHog, GitGuardian, Vault Radar | Actual connectors; full history versus new changes; provider-specific validation; owner routing and remediation evidence. |
| Source-control platform | GitHub secret scanning, GitLab Secret Detection | Repository visibility and plan eligibility; push protection versus post-push detection; bypass approval and auditing. |
| AppSec / ASPM feature | Semgrep Secrets, Snyk Secrets, Checkmarx, Apiiro, Cycode, Legit, Endor Labs | Native engine versus orchestration; CI enforcement; collaboration and artifact coverage; licensing. |
| Cloud-platform feature | Wiz, Orca, Defender for Cloud, Prisma/Cortex | Source code versus workload/image scanning; current product name and edition; whether findings block a delivery step. |
| Secrets manager with detection | Infisical scanning, Akeyless GitHub Scanner, Vault Radar alongside Vault | Separate scanner entitlement, egress and connector controls. Vault storage is not evidence that every leaked copy is found. |
| DLP/API detection | Nightfall | Sensitive-data or credential detection in supported content; do not infer Git-history coverage from an API scanner. |
| Integration-only | ArmorCode, Tenable connectors, CrowdStrike/Legit integration | Imported findings are not evidence of a native secret-detection engine. |

A6 is workflow evidence, not an endorsement of any vendor in this table. No accessible Forrester secrets-detection vendor ranking was established on this pass.

## Use this in the Academy workflow

Illustrative example: a developer puts an API key in a configuration file. A local pre-commit scanner may catch it, but a missing hook, skipped check, excluded file or undetected pattern can leave a gap. A scan in CI may find it only **after** it reached the remote repository.

1. Reduce exposure before writing code: scoped runtime credentials, approved vault access and short-lived credentials where supported.
2. Give fast feedback in the IDE and pre-commit stage; AI-generated code passes the same controls.
3. Enforce configured server-side push protection and required checks, with reviewed exceptions.
4. Scan repository history and relevant artifacts, logs and collaboration stores.
5. On an exposure, revoke or rotate at the issuer, investigate use, then clean retained copies. Deleting the current file is not revocation.
6. Use DSPM to understand exposed data and access around the affected service; this complements credential handling.

This is an editorial teaching example, not a claim that one product completes every step. The existing Academy deep dive is the detailed lesson; no separate Academy lesson or private learning record is created by this market update.

## Evaluation hypotheses and evidence still needed

| Hypothesis | Evidence that would disconfirm it |
| --- | --- |
| An incumbent platform can satisfy this buyer's DSPM need. | Its licensed connectors miss an in-scope store, access context is missing, or required remediation cannot be safely approved and reversed. |
| A secrets manager reduces reliance on hard-coded credentials. | The application still needs unmanaged bootstrap secrets, unsupported rotation breaks service, or developers bypass retrieval. |
| An existing AppSec scanner is adequate. | Controlled synthetic tests reveal missing history/artifact coverage, blocking controls can be bypassed without review, or incident ownership is absent. |

Unknown across offerings: negotiated price, total cost, support terms, regional availability, detection accuracy, actual integration effort and buyer-specific substitutability. Evaluate using synthetic credentials and authorized environments.

## Review and handoff

- Changed IDs: seven vendors, twelve products, twelve `src-expanded-*` sources and twelve `claim-expanded-*` claims in the typed file. Existing parent IDs are reused; DSPM adjacency is added for Proofpoint, Forcepoint and Google.
- Rights: short original paraphrases and links only; no report text, figures, scores or licensed tables copied.
- Source classification: public analyst context stays separate from vendor product evidence; Peer Insights remains a review directory.
- Human reviewer / decision / date: pending. Merge and deployment: not performed.
- Market Map: proposed typed catalog update. Joy Index: defer duplicate storage; consume this public reference after owner review. ASE / Revenue OS: no store updates or inferred account intent. Academy: workflow context only; existing lesson remains the home.
- Correction: revert affected typed records and sources through a reviewed PR; preserve the reason and superseded evidence in the review record.
- Validation results and exact command outcomes are recorded in the PR. Checks passing is not publication or independent product verification.

## Integration of overlapping discovery work

This change consolidates the proposed DSPM discovery from PR #48 at `adb4c924ff524ad49f652c23ff9bf486070900c4`. Arexdata and AvePoint each have one canonical vendor record in `lib/data/ecosystem.ts`; their product records and original publisher sources/claims in `analyst-expansion.ts` remain intact. TrustLogix and Lightbeam and all eight discovery sources/claims are retained, with the [original discovery brief](dspm-analyst-discovery.md). The two PRs must not be merged independently: review this consolidated PR instead; PR #48 remains open for maintainer disposition. No evidence status is upgraded by consolidation.
