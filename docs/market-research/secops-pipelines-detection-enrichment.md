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

### More SecOps tools and what to test

These research examples extend the existing SecOps categories. Sources were checked November 20, 2026. Product descriptions reflect publisher documentation. Evaluation questions are illustrative.

| Tool or project | Why a buyer would look at it | What to verify |
| --- | --- | --- |
| **Amazon Security Lake** | Centralize supported security data in an S3-based lake. Relevant when investigators need historical events across accounts or tools. [AWS documentation](https://docs.aws.amazon.com/security-lake/latest/userguide/what-is-security-lake.html) | Find a known event in the lake and confirm it falls within the enrolled account, Region, source and retention policy. |
| **Microsoft Sentinel** | Bring supported AWS service logs into the same SIEM used by a Microsoft-oriented SOC. [AWS connector documentation](https://learn.microsoft.com/en-us/azure/sentinel/connect-aws) | Follow a known CloudTrail event into the destination table and compare the account, identity and timestamp with the original. |
| **Google Security Operations** | Ingest and parse AWS CloudTrail data in an existing Google SecOps deployment. [CloudTrail parser documentation](https://docs.cloud.google.com/chronicle/docs/ingestion/default-parsers/aws-cloudtrail) | Use the same AWS example as the Sentinel evaluation. Check whether the analyst can find the principal and account using the parsed fields. |
| **LimaCharlie** | Test custom detection and response rules against sample events. Relevant to SOC engineers or managed providers maintaining their own detection content. [Rule testing documentation](https://docs.limacharlie.io/3-detection-response/tutorials/writing-testing-rules/) | Bring one approved synthetic rule test and one benign event. Demonstrate expected behavior and show who can review the rule change. |
| **Tines Stories** | Build a workflow from connected actions that pass structured events. Useful when enrichment and assignment span tools and teams. [Actions documentation](https://www.tines.com/stories/docs/actions/) | Send the same sample finding twice and simulate a destination timeout. Check whether the case stays coherent and who receives the failure. |
| **Microsoft Defender for Endpoint** | Investigate an onboarded device and use supported response actions, including isolation. [Device response documentation](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/respond-machine-alerts?view=o365-worldwide) | Demonstrate evidence and authorization on a test device. Verify action status and recovery ownership. Check OS and entitlement coverage. |
| **Zeek** | Record network connection metadata through logs such as `conn.log`. Useful when a SOC needs to establish which systems communicated during an incident. [Zeek connection log documentation](https://docs.zeek.org/en/current/reference/logs/conn.html) | Trace a known connection from a monitored segment and establish where sensor visibility ends. Connection records alone leave file contents and business intent unresolved. |
| **Velociraptor** | Collect endpoint artifacts for deeper investigation. Useful when responders need evidence beyond the original device alert. [Velociraptor artifact documentation](https://docs.velociraptor.app/docs/artifacts/) | Collect an approved artifact from a test host. Check provenance, timestamps, access controls and the ability to reproduce the collection. |
| **OpenCTI** | Bring external threat intelligence into a workspace with connectors for import or enrichment. Useful when several feeds need to inform an investigation. [Connector documentation](https://docs.opencti.io/latest/deployment/connectors/) | Show how an indicator keeps its origin, confidence and expiry through enrichment. Compare available feeds and connector maintenance requirements. |

### Three expansion conversations

1. **An alert exists but the relevant activity is missing.** Start with the SOC platform lead. Check AWS log generation, routing, parsing and destination retention with one known event. If delivery works, involve detection engineering to test rule behavior. A SIEM connector, a pipeline and a rule can fail at different points.
2. **Two tools alerted on the same employee.** Start with the incident analyst. Ask for the evidence linking the device, workforce identity and AWS session. Assign one case owner. If the logs leave a gap, consider endpoint artifact collection or network telemetry where available.
3. **The SOC can investigate but cannot act after hours.** Start with the SOC director and system owner. Compare an approved workflow, a managed responder and an internal on-call rotation. Ask each option to show who can take the action, where the result is recorded and who verifies recovery.

**AWS shortcut.** For the same sample incident, ask where the original CloudTrail event lives, where the Security Hub finding is reviewed and where the SOC keeps its case. Amazon Security Lake, AWS Security Hub and the SIEM can each serve a different step. Run the sample through the customer's actual configuration before drawing conclusions about coverage. [Security Lake](https://docs.aws.amazon.com/security-lake/latest/userguide/what-is-security-lake.html) · [Security Hub exposure findings](https://docs.aws.amazon.com/securityhub/latest/userguide/exposure-findings.html)

### From phishing to cloud and data investigation

A finance employee reports a suspicious message. Identity logs show a risky sign-in, and a cloud team sees unusual AWS activity. The SOC needs evidence connecting the message, person and cloud principal before treating them as one incident. These five evaluations extend the buyer guide. The linked publisher documentation was checked November 20, 2026.

| Buyer decision | Tool and documented role | Evidence to request in a pilot |
| --- | --- | --- |
| Find other recipients and determine delivery | **Microsoft Defender for Office 365 Threat Explorer** supports investigation of email using message and threat data. Confirm the required plan and permissions. [Microsoft](https://learn.microsoft.com/en-us/defender-office-365/threat-explorer-threat-hunting) | Show message identifiers, recipients, delivery location and the action taken. Distinguish delivery from user interaction. |
| Validate an unusual sign-in | **Microsoft Entra ID Protection** gives identity teams risky user, sign-in and detection reports. [Microsoft](https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-investigate-risk) | Identify the right person, event time and risk evidence. Ask which connected application sessions the identity team can account for separately. |
| Trace activity in AWS | **Amazon Detective** helps investigators analyze activity and relationships among AWS resources and identities using its behavior graph. [AWS](https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html) | Match the cloud principal and activity time to the case. Show the AWS accounts and data sources in scope and identify gaps that require retained logs. |
| Understand what data was at stake | **Amazon Macie** discovers sensitive data in supported Amazon S3 objects and produces findings. [AWS](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html) | Show why the bucket matters, then check which retained access events establish what the principal actually read. [CloudTrail data events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html) |
| Give multiple teams one case | **TheHive** organizes incident investigations into cases with tasks and observables. [StrangeBee](https://docs.strangebee.com/thehive/user-guides/analyst-corner/cases/about-cases/) | Assign separate email, identity and cloud tasks to named owners. Require source references, a decision and proof of closure before closing the case. |

#### Run the same case three ways

- **Microsoft-centered SOC.** Start with a sample message and risky sign-in. Check what the analyst can see in the existing investigation workflow and where AWS evidence must be added. Test the owned tools and licenses before pricing another case platform.
- **AWS-centered team.** Start with a known AWS finding and show the underlying activity and resource owner. Ask who provides the email and identity evidence and where their findings join the case.
- **Mixed stack or MDR provider.** Start with an alert that crosses three tools. Verify where the authoritative case lives, which team handles each task after hours and whether a handoff retains the original evidence link.

Use the same synthetic incident, expected evidence and scope for all three. Record time to a named owner, which conclusions the available evidence supports, and whether authorized containment can be verified at the affected system. Add a second benign scenario to check whether the workflow incorrectly merges unrelated events.

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
