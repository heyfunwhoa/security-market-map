# SecOps data infrastructure and detection engineering — evidence review

**Date checked:** 2026-10-14  
**Status:** Proposed typed taxonomy, awaiting human review.  
**Owner:** Security Market Map; supports issue #58.  
**October scope:** category definitions and buyer distinctions. The November guide below adds proposed product claims with their original documentation.
**Rights:** link to originals and paraphrase narrowly; do not replicate SACR's rankings, charts, tables, or report text.

## SecOps and its neighboring markets

SecOps is the work of detecting, investigating and responding to threats. The security operations center (SOC) is the team doing that work. A buying conversation often starts with a specific gap: a log never arrived, a rule missed an event, two teams opened separate cases, or nobody could approve containment after hours.

The application guide is at `/domains/secops#secops-buyer-guide`. Its named products use existing vendor IDs and the canonical source registry. Software Analyst Cyber Research describes cloud security teams owning preventive controls and SOC teams owning active detection and response. The market placements and evaluation questions below are editorial. Product capabilities are publisher-reported. [Analyst research on cloud security and SecOps](https://softwareanalyst.io/reports/the-convergence-of-cloud-security-and-the-soc-into-2026)

| Buying decision | Who typically owns it | Example and proof to request |
| --- | --- | --- |
| Threat intelligence and public monitoring | Threat intelligence, IAM or AppSec | SpyCloud can surface exposed workforce identities. GitGuardian Public Monitoring can surface secrets in public code. Ask for the link from the observation to an active employee or credential owner and the evidence of any use. [SpyCloud](https://docs.spycloud.com/public-sc/docs/workforce-threat-protection) · [GitGuardian](https://docs.gitguardian.com/public-monitoring/sources/overview) |
| Security data pipelines | SOC platform engineering | Cribl Stream routes incoming events through pipelines to destinations. Follow a sample sign-in across the route and compare source and destination fields and counts. [Cribl](https://docs.cribl.io/stream/routes/) |
| Detection engineering | Detection engineering lead | In Panther, test a custom detection with one synthetic event that should alert and one that should pass. Then confirm the deployed rule receives the necessary fields. [Panther](https://docs.panther.com/detections/testing) |
| Endpoint and cross-domain detection | Endpoint team and SOC | CrowdStrike Falcon Insight XDR brings endpoint and other telemetry together. AWS Security Hub can provide related cloud exposure context. Ask what evidence connects the device, user and cloud resource. No product-to-product integration is assumed. [CrowdStrike](https://www.crowdstrike.com/en-us/platform/endpoint-security/falcon-insight-xdr/) · [AWS](https://docs.aws.amazon.com/securityhub/latest/userguide/exposure-findings.html) |
| SIEM investigation and case management | SOC manager and analyst | Splunk Enterprise Security puts investigations into an analyst queue. Ask the analyst to show one case, its owner, the source evidence and the record of the decision. [Splunk](https://help.splunk.com/en/splunk-enterprise-security-8/administer/8.8/investigations/findings-and-finding-groups-in-splunk-enterprise-security) |
| SOAR and response automation | SOC automation and system owner | Microsoft Sentinel can run playbooks. AWS Security Hub can emit V2 events that EventBridge rules route to a configured target. Ask who can approve an action, who can undo it, and what proves the target changed. [Microsoft](https://learn.microsoft.com/en-us/azure/sentinel/automation/run-playbooks) · [AWS](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-v2-cwe-event-rules.html) |
| Managed detection and incident response | SOC director, provider and on-call owner | Rapid7 MDR offers optional Active Response for covered endpoints and accounts. AWS Security Incident Response with Proactive Response triages GuardDuty and Security Hub **CSPM** findings in enrolled accounts. Ask the provider to walk an after-hours incident through the contracted scope, escalation and authorized actions. [Rapid7](https://docs.rapid7.com/services/active-response/) · [AWS](https://docs.aws.amazon.com/security-ir/latest/userguide/detect-and-analyze.html) |

### Where the SOC hands off a leaked AWS key

AppSec identifies the publishing path. IAM identifies and retires the key. Cloud engineering verifies that the affected service still works. Data security uses available records to determine which data was accessed. Corporate IT can investigate an implicated device. GRC records decisions and residual risk. If service was interrupted, the recovery owner validates restoration with the business. The SOC ties the observations, decisions and outcomes into one incident record. These owner assignments are a discovery starting point and will vary by organization. [AWS buyer guide](aws-security-ecosystem-2026-11.md#where-aws-security-hub-fits-in-the-market-map) · [Credential containment guide](workforce-identity-and-credential-response.md#from-public-alert-to-confirmed-containment) · [AWS IAM key administration](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-keys-admin-managed.html) · [CloudTrail data events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html)

For an evaluation, use a synthetic finding and a known owner. Record elapsed time to assignment and target-system verification. A closed ticket, an automated action request and a confirmed fix are different observations. The buyer should agree which evidence will count before measuring improvement.

**Review record.** This addition was researched November 20, 2026. Product assertions use the original publisher, section, date checked and caveat in the shared claim registry. Rights remain with each publisher. Owner for editorial review is the Security Market Map maintainer. Recheck by February 20, 2027 or after a product, integration or service-scope change.

## Evidence and category distinctions

| ID | Source | Publisher; date | Supported scope | Evidence class and caveat |
| --- | --- | --- | --- | --- |
| SDPP-AN-1 | [The Rise of Security Data Pipeline Platforms as a Control Plane for the SOC](https://softwareanalyst.io/reports/the-rise-of-security-data-pipeline-platforms-as-control-plane-in-soc) | SACR / Aqsa Taylor, 2025-11-20, updated 2026-07-29 | Analyst framing: collection, normalization, enrichment, filtering, routing, telemetry health, and delivery to SIEM/data-lake/XDR tools | Analyst-reported; evaluation methods and vendor rankings are the publisher's conclusions, not independently reproduced |
| SDPP-AN-2 | [Market Guide 2025: The Rise of Security Data Pipelines](https://softwareanalyst.io/reports/market-guide-2025-the-rise-of-security-data-pipelines-how-siems-must-evolve) | SACR, 2025; exact publication date requires checking source | Pipeline vs analytics/storage separation and design tradeoffs | Analyst-reported; not standalone vendor product proof |
| DET-AN-1 | [The Future of Detection Engineering in Security Operations](https://softwareanalyst.io/reports/the-future-of-detection-engineering-in-security-operations) | SACR, 2026-03-17, updated 2026-07-29 | Detection content lifecycle, evidence integrity, tuning, and analyst case outputs | Analyst-reported; proposed category boundary, not a claimed standard |
| SDPP-ORG-1 | [Cribl Stream documentation](https://docs.cribl.io/stream/) | Cribl; publication unknown, checked 2026-10-14 | Primary documentation candidate to verify routes, sources, destinations and transformations | Candidate original documentation; do not publish feature claims before line-level review |
| DET-ORG-1 | [Anvilogic website](https://www.anvilogic.com/) | Anvilogic; publication unknown, checked 2026-10-14 | Primary product-evidence candidate for detection lifecycle and SIEM relationships | Candidate original documentation; full product capabilities and tier limits not verified |

**Additional vendor discovery leads from SACR (not new verified vendors):** Abstract Security, Axoflow, Beacon Security, CeTu, Databahn, Datadog Observability Pipelines, Realm Security, Tenzir, VirtualMetric. SACR also discusses Onum (CrowdStrike), Observo AI (SentinelOne), and Datable (Panther); verify legal entity and acquisition/closing status before adding or updating vendor IDs. Avoid treating historical acquired names as independent current competitors.

## Buyer-decision test

- **SDPP:** Security data arrives from many sources. The buyer needs reliable parsing, enrichment, cost-aware routing and verifiable delivery to detection and storage destinations. Compare native SIEM ingestion, third-party pipelines and self-built processing. Test schema-drift failure, destination outage, telemetry loss, replay and retention.
- **Detection engineering:** A SOC needs reproducible coverage of a defined behavior. The buyer evaluates version control, synthetic replay tests, rule CI, approvals, evidence and field-level quality. Compare SIEM-native rule authoring, dedicated detection lifecycle tooling and engineering-built CI.
- **Together:** A schema change can break otherwise correct detection logic. Test whether source data remains present and detections still fire after a transformation. **No performance improvement or ROI claim is proven by this taxonomy.**

## Publication guardrails

- Existing `siem`, `soar`, `cloud-detection`, `threat-intelligence`, `xdr` and `breach-simulation` remain canonical; the new categories model different jobs, not replacements.
- The original October research proposed only category/buyer/workflow metadata. There are no new vendor `implements` edges, benchmark rankings, scores, pricing statements or integration claims.
- Before future product-backed comparisons: original vendor evidence per feature, source type, date, edition, deployment boundary, rights, human review; unverified stays Unknown.
- The Security operations market-area label and domain charter name these jobs beside SIEM and SOAR. That label is taxonomy, not a vendor capability claim.
- **Checks:** `npm run test:research-integrity`, `npm test`, `npx next typegen`, `npm run typecheck`, and `npm run lint` were run locally after merging current `main`. Confirm the same commands on the pushed head in CI before treating the branch as reviewed. Human review still precedes merge.
- Human review and approval precede merge and deployment; no new crawler, schema store, or cross-repo write.
