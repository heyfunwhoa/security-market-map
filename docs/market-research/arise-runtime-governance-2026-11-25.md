# ARISE: runtime identity governance research extension

Reviewed 2026-11-25. Source: [SACR, Paul Webber and Lawrence Pingree, September 3 2026, updated November 23](https://softwareanalyst.io/reports/arise-agentic-runtime-identity-security-enforcement-for-agents). Existing catalog keys: agentic-runtime, mcp-security; source src-sacr-arise-20260903 and claim claim-sacr-arise-20260903. Reuse these; do not create a parallel taxonomy. This editorial extension is not a typed catalog release.

## Analyst framework
ARISE (Agentic Runtime Identity Security Enforcement) evaluates whether an agent operation is authorized in its current context. AIAP (Agentic Identity Access Platforms) supplies authentication/access context; ARISE governs action execution; UADP (Unified Agentic Defense Platform) is the broader convergent architecture. See [UADP research](https://softwareanalyst.io/reports/the-rise-of-uadp-market-share-growth).

Three layers: baseline permission boundaries; behavioral/task alignment analysis; intervention before impact. SACR's ACD scale runs from 0 (unmanaged) through 1 (inventory), 2 (after-event alerts), 3 (fixed guardrails), 4 (contextual pre-impact control), 5 (adaptive autonomous governance). SACR recommends level 4 for sensitive production workloads. No vendor level assigned here.

Evaluation axes: intervention depth, delegated identity, tool governance, behavior, audit evidence, organizational context, policy intelligence, ecosystem coverage.

## Editorial buyer crosswalk (proposed)
| Workflow | Existing adjacent domain | Owner | Evidence test |
|---|---|---|---|
| Coding agent edits repo | AppSec / endpoint | DevSecOps | Deny protected branch write before mutation |
| Browser agent transfers data | DLP / SSE | Data security | Deny external destination while allowing approved flow |
| MCP invokes write tool | API / MCP security | AI platform | Read allowed, unauthorized write denied |
| Agent obtains cloud credential | PAM / NHI | IAM | Scoped credential expires or is revoked |
| SOC agent remediates | SecOps | SOC | Approval before isolation; preserve audit trail |
| Agent updates SaaS | SSPM / IAM | IT | Restrict records and operations |
| Multi-agent delegation | Identity / AI security | AI platform | Preserve authority lineage across handoff |
| Model choice and spend | FinOps | AI platform | Enforce approved models and budget; not proof of identity enforcement |

Vendor research queue (hypotheses only): Bay, Zenity, WitnessAI, Noma, Aembit, Silverfort, Akeyless, Britive, Operant AI, Straiker. Classify by insertion point (identity, credential broker, gateway, tool proxy, endpoint/runtime, lifecycle testing); require primary documentation and observed evidence before capability claims. Unknown is not absent. Bay is a candidate, not a SACR rating.

## Acceptance and reference architecture
Synthetic read-only research agent -> policy decision outside model -> scoped tool broker -> test resource -> audit log. Test allowed read, denied write, approval-gated action, expired delegation, indirect prompt injection, missing context and unavailable enforcement. Record pre/post resource state, identity, policy version, decision, latency and redacted evidence. Fail closed for high-impact writes. Do not use real customer information or activate live integrations.

## Downstream contract
Market Map owns definitions and provenance. Account Signal Engine consumes category links for hypotheses; GTM Revenue OS consumes use-case and proof criteria; Joy Index owns private learning and interview notes. No automatic sync, new dependencies or production activation. Follow-up: reconcile typed source freshness and UI navigation; validate schema and CI before publication.
