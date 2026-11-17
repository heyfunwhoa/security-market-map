# AWS security learning curriculum and reference contract

**Status:** proposed curriculum for review | **Date:** 2026-11-17 | **Owner:** Security Market Map (reference), Builder Academy (future instructional consumer) | **No cloud resources created**

## Existing baseline, verified in repository

- [AWS ecosystem research](aws-security-ecosystem-2026-11.md): buyer-problem → native security control → adjacent product → sourced market relationship.
- [Cedar Ridge synthetic exercise](aws-security-learning-scenario-2026-11.md): fictional ECS workload identity accessing S3; GuardDuty S3 Protection, CloudTrail data events, Security Hub, posture, investigation, and response.
- [Existing /learn route](../../app/learn/page.tsx): actual Cedar Ridge guided and reference modes; reuse these and avoid a parallel app.
- Existing vendor, category and claim catalog: reference through stable IDs; never turn vendor category membership into feature parity.

## Teaching philosophy

For each topic: **fundamental risk → AWS architecture → control and evidence → synthetic decision exercise → relevant vendors/alternatives → customer business case → teach-back**. Teach architecture independently of brand names before introducing AWS nomenclature. Use 5-minute explanations, learner decisions and feedback, not memorized service lists. Do not store learning progress in the canonical market vendor data store.

### Eight-module roadmap

| Module | Core concepts | AWS services | Learning output | Market question |
| --- | --- | --- | --- | --- |
| 1. AWS foundations | Regions, accounts, shared responsibility, network and application trust boundaries | Organizations, VPC, EC2, ECS, Lambda, S3, CloudTrail | Diagram the Cedar Ridge application and identify AWS/customer responsibility | What must a cloud platform vendor provide versus the customer? |
| 2. Identity, workload roles, secrets | IAM policy evaluation, role trust, STS, least privilege, machine identity | IAM, STS, Secrets Manager, KMS, IAM Identity Center | Trace a workload role permission and limit the S3 blast radius | When do Vault, CyberArk, Infisical or external NHI tools add value? |
| 3. Cloud detection | Management versus data events, detection vs confirmation, vulnerability, sensitivity | CloudTrail, GuardDuty, Inspector, Macie | Triage synthetic GuardDuty finding; map evidence gaps | Where do Wiz, CrowdStrike and Prisma Cloud overlap or complement? |
| 4. Hub and posture | Finding format, correlated risk, posture findings vs threats | Security Hub, Security Hub CSPM, Config | Separate misconfiguration, detection, exposure, and response | What is a CNAPP, CSPM, or risk graph actually replacing? |
| 5. SOC and response | Event normalization, SIEM, SOAR, incident ownership, containment | Security Lake, EventBridge, Systems Manager, Security Incident Response | Assemble incident timeline and reversible containment plan | Where do Splunk, Sentinel, Google SecOps and MDR sit? |
| 6. Network and applications | Layer 3/4 vs HTTP, segmentation, DDoS, edge protection | VPC, WAF, Shield, Network Firewall, Route 53 | Map attack paths and security controls to application layers | How do Palo Alto, Zscaler and Cloudflare differ in scope? |
| 7. AI applications | Agent identity, scoped permissions, tools, prompt injection, data boundaries | Bedrock, IAM, Secrets Manager, KMS, API Gateway | Threat-model a fictional Bedrock agent with S3 access | What do specialist AI security products inspect and control? |
| 8. Enterprise security economics | Consumption, existing tool stack, migration risk, value measurement | Native services, AWS Marketplace, Security Hub Extended | Executive discovery, coexistence versus displacement, testable evaluation plan | What evidence justifies consolidation rather than adding controls? |

### Module structure and learner contract

Each module should contain: prior concept recall; 3–5 learning objectives; one annotated reference architecture; 3–6 compact concept lessons (what/why/how/limits); one synthetic scenario with learner choices and feedback; 1–3 cited comparisons limited to a defined buyer job; two CISO discovery questions; a measurable technical/business outcome; and a three-minute teach-back prompt. Sources record publisher, publication/observation date, product scope, Unknowns and review trigger.

Progress: **not started → explained → applied → teach-back demonstrated**. Keep scores separate from evidence confidence. Do not claim mastery based solely on selecting an answer.

## Module 1: begin here

**Learning goal:** explain how an application in ECS can access S3 using an IAM task role, why its policy matters, and what changes when someone misuses its credentials. Understand the distinction between 'AWS operates the infrastructure' and 'the customer configures access and data permissions.'

**Concept 1: shared responsibility.** AWS manages security *of* underlying cloud infrastructure. Customers remain responsible for identity permissions, data classification, workload configuration and applicable controls, with division varying by service.

**Concept 2: account and Region.** An AWS account is a principal administrative/billing/security boundary; Regions determine where regional resources run. Cross-account access is possible only with appropriately configured policies and trust.

**Concept 3: ECS task role.** The application workload can obtain temporary credentials for an IAM role; its permissions and resource policies determine permitted S3 actions. STS session duration does not itself prevent misuse.

**Concept 4: S3 authorization.** A successful request depends on the applicable IAM policies, bucket/resource policies and explicit denies. Example: allowing only `s3:GetObject` on an approved prefix is narrower than `s3:*` on all buckets. A single policy snippet does not prove a request will succeed because other controls can apply.

**Concept 5: evidence.** GuardDuty S3 Protection can analyze S3 data activity without requiring customers to separately enable CloudTrail S3 data-event logs; investigators need explicitly retained audit data when they want a history of object-level API calls. GuardDuty finding ≠ confirmed exfiltration.

### First teach-back exercise (synthetic)

Cedar Ridge has ECS tasks that must read from `s3://cedar-ridge-reporting/approved/`. An assumed task-role policy allows `s3:*` against `*`. A synthetic GuardDuty finding reports anomalous access outside the approved prefix. Explain:
1. Which component executes the application and which identity authorizes S3 API access?
2. Which permissions are unnecessarily broad, and what minimum scope is a starting point?
3. What evidence would you request before declaring data exfiltration?
4. Which AWS service detects suspicious S3 behavior, which retains object-event evidence if configured, and which correlates findings?
5. How would you explain the remediation to a CISO without claiming guaranteed detection or ROI?

**Expected reasoning:** ECS task → IAM task role/STS → S3; broad wildcard permissions enable unwanted potential actions; validate CloudTrail S3 data-event coverage, object access, activity origin and business context; distinguish GuardDuty, CloudTrail and Security Hub; propose least privilege, investigation, authorized change, measurement and rollback.

**Completion evidence:** architecture explanation in 3 minutes; correct role of IAM/STS/S3/CloudTrail/GuardDuty/Security Hub; clear detection vs proof distinction; 1–2 vendor coexistence decisions grounded in buyer criteria; no invented financial benefit.

## Work ownership and development gates

- **Security Market Map:** maintain canonical public concept/vendor/category relationships, sourced product research and reusable scenario architecture. Do not duplicate an AWS vendor record. Existing `/learn` is a **reference/prototype learning experience**, not proof of implemented cross-repo Builder Academy integration.
- **Builder Academy:** later own formal curricula, persistent learner progress, assessment and hands-on labs, referencing stable market-map IDs. No cross-repo write in this change.
- **GTM Revenue OS:** later own private commercial exercises; do not import private interviewer, employer or prospect notes to this public repository.
- **Detector Coverage Atlas:** later own actual testable detection details, not inference from this conceptual incident.
- **Next software slice:** validate current Cedar Ridge interaction and the eight-module data model, then choose a single reusable lesson structure and link to existing `/learn` rather than create a new application.

### Review checklist

- [x] Reuse merged AWS ecosystem + Cedar Ridge source documents and existing /learn route.
- [x] Explicit module objectives, first assessment and teach-back contract.
- [x] Separate learning competence from research claim confidence.
- [ ] Verify official current service docs and market claims before implementing new typed product links.
- [ ] Review with Builder Academy owner and decide whether interactivity remains here or moves to formal academy.
- [ ] Run tests, typecheck, lint, build and relevant browser checks if application code changes.
- [ ] Do not merge, deploy, provision AWS resources or enable cost-generating services without approval.

## Primary references for deepening

- [AWS shared responsibility](https://aws.amazon.com/compliance/shared-responsibility-model/)
- [ECS IAM task roles](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- [IAM policies and permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)
- [S3 authorization](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-overview.html)
- [GuardDuty S3 Protection](https://docs.aws.amazon.com/guardduty/latest/ug/s3-protection.html)
- [CloudTrail S3 data events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html)
- [Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/)
