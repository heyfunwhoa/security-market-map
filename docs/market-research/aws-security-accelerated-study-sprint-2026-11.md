# AWS Security Specialist accelerated study sprint and progress checklist

**Status: NOT STARTED.** This is a plan and a tracked checklist, not evidence of learning completion.  
**Prepared:** 2026-11-17. **First hiring manager interview:** scheduling pending; preferred November 20, 2026 is **not a confirmed interview date**.  
**Scope:** first 3 days of interview-critical technical concepts, 10 subsequent study sessions, then the larger Security Hub + AI product curriculum. This is personal learning guidance; no AWS resources or paid services are created.

## Track A: 3-day interview preparation (November 17–19)

### Day 1: AWS foundations and IAM
- [ ] Explain accounts, Regions, VPC, S3, ECS and AWS/customer shared responsibility in your own words.
- [ ] Identify ECS task role, temporary STS credentials and authorization path to S3.
- [ ] Compare a broadly scoped `s3:*` policy against a least-privilege `s3:GetObject` policy restricted to `arn:aws:s3:::cedar-ridge-reporting/approved/*`. Mention other applicable IAM and bucket policy controls.
- [ ] Write a 2–3 sentence remediation recommendation and a 3-minute teach-back.
- [ ] Compare Secrets Manager (storage/rotation), IAM (access), KMS (keys) and external exposed-secret detection without claiming equivalence.

### Day 2: detection and Security Hub
- [ ] Explain CloudTrail S3 data events, GuardDuty S3 Protection, Inspector, Macie.
- [ ] Distinguish Security Hub unified findings/exposure prioritization from Security Hub CSPM posture checks and Security Lake telemetry.
- [ ] Trace synthetic Cedar Ridge S3 investigation: signal → role → object evidence → context → reversible containment → verification.
- [ ] Identify what the finding does **not** prove, including confirmed exfiltration.
- [ ] Explain the finding pipeline in 3 minutes and list measurable investigative outcomes.

### Day 3: competitive, AI and enterprise selling
- [ ] Explain where AWS-native services may overlap with Wiz, Prisma Cloud, CrowdStrike and where Splunk or Sentinel may complement AWS telemetry.
- [ ] Distinguish Bedrock, Guardrails, AgentCore Identity/Policy, IAM, KMS and AI inventory.
- [ ] Explain why content guardrails do not substitute for tool action authorization.
- [ ] Present 7–10 account territory approach: baseline, security whitespace, CISO buyer map, SA/account manager cooperation, valid coexist/displace evaluation.
- [ ] Rehearse six verified STAR stories separately using the private job tracker; never commit them to this public repo.

**Daily schedule suggestion:** 60–90 min concepts/scenario, 30 min competitive architecture, 45 min STAR stories. Adapt to actual interview schedule.

## Track B: 10 deeper sessions after Track A

- [ ] Session 4: Security Hub Essentials, add-ons, pricing, source differences.
- [ ] Session 5: CNAPP/CSPM/cloud detection comparisons.
- [ ] Session 6: Security Lake, SIEM, SOAR, response lifecycle.
- [ ] Session 7: IAM, CIEM, PAM, secrets and NHI.
- [ ] Session 8: Macie/data protection and WAF/network protection.
- [ ] Session 9: Extended categories 1–5 and their confirmed product/SKU entries.
- [ ] Session 10: Extended categories 6–10; finish documented 23-partner review.
- [ ] Session 11: Secure Bedrock/AgentCore application scenario.
- [ ] Session 12: AI security specialist tools; discovery vs policy vs runtime distinctions.
- [ ] Session 13: Customer architecture workshop and evidence-backed CISO value case.

**Learning rhythm per session:** concept (15m) → architecture (15m) → synthetic decision (15m) → alternatives (10m) → teach-back (5m). Only mark complete after performing the exercise and discussing reasoning.

## Practical lesson 1 (start here)

**Fictional Cedar Ridge scenario:** an ECS application only needs read access to `s3://cedar-ridge-reporting/approved/` but its task-role policy grants `s3:*` on `*`.

**Prompt:** What is the first preventive improvement and why? Write 2–3 sentences naming IAM role scope, S3 action and resource, and what risk would remain. Then answer: what AWS service could produce a suspicious S3 finding, and what separate evidence would you seek before concluding data was stolen?

**Reference policy snippet for discussion (not deployment):**
```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": ["arn:aws:s3:::cedar-ridge-reporting/approved/*"]
}
```
An application might need separate scoped `s3:ListBucket` permission and other relevant access. This fragment is educational; additional policy conditions, bucket policies, boundaries, SCPs and explicit denies affect effective authorization.

**Success standard:** learner describes the workload → task role/STS → bucket/API authorization path; recommends least privilege; distinguishes GuardDuty detection from CloudTrail retained object-event evidence; does not confuse Security Hub and Security Lake. Record actual response and assessment in an appropriate private progress system only after completed.

## Evidence and boundaries

- Keep public concept/product/competitor sources in Security Market Map, with [core research](aws-security-ecosystem-2026-11.md), [Cedar Ridge scenario](aws-security-learning-scenario-2026-11.md), and [Security Hub + AI roadmap](aws-security-hub-ai-curriculum-roadmap-2026-11.md).
- The `/learn?scenario=cedar-ridge` route is an existing learning prototype. Builder Academy would later own formal progress and labs after separate repo inspection/approval.
- No assumptions about mastered content, actual customer infrastructure, interview outcomes, exact product parity, or paid AWS access.
- Review draft PR #191 independently; do not merge or deploy without approval.
