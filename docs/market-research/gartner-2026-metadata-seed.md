# Gartner 2026 research — metadata-only seed (KRU-106)

**Status:** candidate research metadata; not an approved evidence package and not published vendor capabilities.
**Observed:** 2026-10-14. **Publisher:** Gartner. **Rights:** public bibliographic pages/short abstracts only; full research remains licensed/restricted. No full-text copies, Gartner artwork, quadrant placements, vendor ratings, automated crawl, or approved market claims.

## Confirmed source records

| Stable source ID | Title | Published | Authors (public listing) | Canonical landing page | Candidate canonical mapping |
| --- | --- | --- | --- | --- | --- |
| gartner-7694525 | Innovation Insights: Secrets Management | 2026-04-08 | Steve Wessels; Paul Mezzera; Michael Kelley | https://www.gartner.com/en/documents/7694525 | Secrets management (not secrets detection) |
| gartner-7561057 | Machines Can’t Keep a Secret: Use Managed Workload Identities | 2026-03-06 | Steve Wessels; Michael Kelley; Paul Mezzera | https://www.gartner.com/en/documents/7561057 | Machine/workload identity and credential lifecycle |
| gartner-8363949 | Market Guide for Managed Detection and Response | 2026-09-09 | Andrew Davies; Angel Berrios; Eric Ahlm; Darren Livingstone; Craig Lawson | https://www.gartner.com/en/documents/8363949 | Managed detection and response |

**Record semantics:** source key is Gartner document ID (per edition), publication date is publisher date, observed date is the research lookup date, access is `metadata_only`, review status is `candidate`, source confidence is `high` for bibliography and `unverified` for full report analysis. Content hash is **not available** without a permitted captured content version. Any date corrections should preserve previous metadata as source history.

## Candidate follow-up inventory — verify source dates/authors before registering

Gartner document IDs from research discovery; these are **not yet** individual confirmed source records in this initial slice:

- 7746321 — Reference Architecture Brief: IAM for AI Agents and Other Workloads
- 7913209 — Magic Quadrant for Endpoint Protection
- 7501853 — AI SOC Agents: Harnessing Innovation, Managing Expectations
- 7798553 — CIOs: Scale Security Operations With AI SOCs
- 7965673 — Innovation Insight for Agentic Application Security Testing
- 8219261 — How to Enhance Application Security by Deploying Application Detection and Response
- 7645929 — Reference Architecture Brief: Application Security
- 7683961 — Improve Remediation and Risk Outcomes in the Cloud With CTEM
- 8162429 — Autonomous Remediation Is the Next Frontier of Exposure Management
- 8426413 — Modernize Exposure Management to Counter AI-Augmented Vulnerability Discovery
- 7383030 — Redefining NDR
- 7290030 — AI-Driven SOC Solutions Destabilize Operational Norms

Preserve 2025 PAM/SIEM research as historical editions, **not** 2026 records. Never equate report inclusion or a vendor's promotional report mention to independently verified capability.

## Proposed crosswalk and decision rules

| Publisher concept | Canonical relationship | Gate |
| --- | --- | --- |
| Secrets management | Existing secrets-management category | Review before category aliasing |
| Secrets discovery / scanning | Separate AppSec detection capability | Must not be merged into secrets management |
| Machine/workload identity | Identity security and credential lifecycle | Distinguish PAM and human IAM |
| MDR | Managed security / detection-and-response | Keep service vs platform distinction |
| AI SOC | Cross-cutting detection automation candidate | Review; not automatic top-level category |
| SIEM, NDR, EDR | Distinct technical markets | No parity inferred |
| Agentic AST / ADR | Testing vs runtime detection | No category merge without evidence |
| CTEM/autonomous remediation | Exposure management vs action | Keep measurement and remediation separate |

Publisher original taxonomy is an attributed field, never overwritten by a Market Map category. Store mapping proposals with reviewer, decision, and evidence. If canonical taxonomy does not match, retain `unknown` and propose the change separately.

## Ingestion handoff and permissions

Reuse **Account Signal Engine Research Hub -> versioned source evidence -> human review -> approved evidence package -> Security Market Map**. Existing ASE feed catalog is for supported feeds, **not** proof that a Gartner PDF/report collector exists. Do not add Gartner as an enabled RSS endpoint.

Before any code import: reconcile canonical Notion PRD, review KRU-105 Latio source semantics, and inspect current research-evidence-v1 contract. Use `doc_id + edition` to deduplicate source registrations; canonical URL as alternate key. Keep no raw restricted text or derived content hashes from inaccessible reports. Reject revoked permissions and invalid versions. Never publish candidate claims or unapproved category mappings.

## Acceptance and execution record

- [x] Three bibliography entries verified from public Gartner source pages (2026-10-14).
- [x] Explicit rights restrictions and taxonomy proposal documented.
- [ ] Canonical Notion Market Map PRD location reconciled.
- [ ] Three entries materialized in approved shared source registry (this Markdown is a candidate catalog, **not** database ingestion).
- [ ] Synthetic test: idempotent metadata import, unchanged-content dedup, version/correction consistency, revoked-source rejection, approval gate and duplicate category/vendor prevention.
- [ ] Approved Research Hub evidence package produced.
- [ ] Any downstream typed catalog or public app update reviewed.
- [ ] Full suite/CI tested.

**Dependencies:** [KRU-106](https://linear.app/krusty/issue/KRU-106/mm-register-gartner-2026-security-research-metadata-and-taxonomy), KRU-105 (Latio), KRU-56 (review persistence), KRU-54 (SMM import), KRU-57 (handoff).

**Next smallest implementation:** once canonical PRD and typed evidence contract are confirmed, add these three source metadata entries to existing approved source metadata representation, using synthetic fixtures; no vendor-claim writes.
