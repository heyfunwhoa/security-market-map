# Shared engineering standards adoption

**Canonical baseline:** [Technical Docs Platform — Engineering Baseline v1.0](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/baseline-v1.md)
**Adoption status:** partial — policy reference established; controls still require independent evidence
**Risk tier (provisional):** C
**Owner:** repository maintainer
**Initial review:** 2026-10-10

## Why tier C
The repository includes public research ingestion designs, evidence publication and PostgreSQL data integrity. Existing review/privacy design is not proof of deployed enforcement.

## Local requirements
- Existing repository-specific source of truth: [docs/security-intelligence/operations-and-integrity.md](../docs/security-intelligence/operations-and-integrity.md).
- Reusable secure-development and delivery expectations come from the linked canonical baseline. Do **not** copy the whole policy here.
- Existing app-specific domain integrity, private-data protections, brand/UX rules, Next.js agent instructions and published-content approval requirements continue to apply.

## Enforcement inventory
| Control | Current adoption assessment | Verification needed |
| --- | --- | --- |
| Linked shared standard | implemented | this document |
| CI / tests / build | not assessed | inspect `.github/workflows` and passing job results |
| Dependency audit / secret scans | not assessed | inspect CI and report-only vs blocking controls |
| Least-privilege GitHub and production access | not assessed | repository rules, tokens, database roles |
| Threat model / input validation | not assessed | inspect code paths and local security docs |
| Deployment verification and recovery | not assessed | deploy/runbook and actual preview/production evidence |
| Publication/data privacy | not assessed | domain-specific review and permissions tests |

**Important:** This is reference adoption, not certification or proof that controls are enforced. Record exceptions with owner, residual risk, mitigation and review date before marking any requirement as satisfied.

[Adoption procedure](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/adoption.md) · [Repository matrix](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/engineering/adoption-matrix.md)

## Dated implementation review

See [security release readiness](security/release-readiness.md) for the 2026-10-13 review of implemented scans, local checks and remaining enforcement/production gaps. The initial adoption matrix above is historical and does not supersede that evidence.
