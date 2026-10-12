# Market Map implementation plan — Reusable Security & GTM Intelligence Foundation

> Status: review, subordinate plan · Owner: Kristen Aing / SMM · Version: 0.1 · Reviewed: 2026-10-11 · Classification: public-safe · No runtime changes

Existing [research vision](research-atlas-vision.md), [knowledge architecture](../security-intelligence/architecture.md), [knowledge-model proposal](../architecture/knowledge-model-proposal.md), [engineering adoption](../engineering-standards.md) and pending [product PRD PR #14](https://github.com/heyfunwhoa/security-market-map/pull/14) remain authoritative for the application. No competing product PRD is introduced here.

Shared [initiative PRD](https://github.com/heyfunwhoa/technical-docs-platform/blob/docs/security-gtm-intelligence-foundation-20261011/product/security-gtm-intelligence-foundation/prd.md), [architecture](https://github.com/heyfunwhoa/technical-docs-platform/blob/docs/security-gtm-intelligence-foundation-20261011/architecture/security-gtm-intelligence-foundation.md) and [roadmap](https://github.com/heyfunwhoa/technical-docs-platform/blob/docs/security-gtm-intelligence-foundation-20261011/product/security-gtm-intelligence-foundation/roadmap.md) own cross-project sequencing.

## Current state and next slice

Main sampled at 2872fda85c94a544c4292666824dad81aaf556c1 contains sources/claims, research review/monitor code, Inngest scheduling and memory/local JSON ledger persistence. Firecrawl/Exa adapters remain fixture/mock paths; live monitoring and production PostgreSQL ledger are not verified. docs/research-engine.md's in-memory-only statement is older than runtime-store.ts local JSON support; neither is distributed transactional storage.

SMM owns taxonomy/vendor/product/capability identity, market claims/relationships and approved knowledge revisions. ASE owns cross-project collection/source versions. Keep SMM fixture monitor as a teaching path; do not enable another live scraper.

## KRU-54 consumer task

Depends on KRU-53 offline producer and KRU-52 planning review. Reuse Technical Docs' existing staged SMM adapter and research-evidence-v1 reference; inspect compatibility rather than copying blindly.

- Approved synthetic package becomes a local reviewed projection; never auto-write lib/data/claims.ts.
- Preserve source version/hash, vendor-reported status, missing dates and unresolved mapping/Unknown.
- Replay produces one logical projection; invalid/private/unreviewed packages are denied.
- Superseded/invalidated evidence and expired validity prevent new activation; current catalog is not quietly rewritten.
- Use existing catalog/research/contract tests and repo checks; no API calls or new credentials.

Full schema validation and stricter publication/permission policy must be tested separately from current shared validator's sampled field checks. New KnowledgeRevision contract is design-only; do not mutate v1.

## Pilots and later work

KRU-58 repeats the same workflow/configuration for IGA, with 5–10 approved source pointers and 20 reviewed candidate statements. Secrets/NHI is first. Public source licensing/quotation/attribution remain per-source decisions. No feature-ranking or buying-intent inference.

KRU-57 coordinates later authenticated read-only evidence handoff; separate owning-repo PRs and security gates. PostgreSQL persistence for SMM knowledge is deferred until consumer need and additive migration design are reviewed; no shared DB credentials or direct ASE database reads.

**Cursor:** strong coding model / Sonnet-class or Auto/Balance where offered; medium effort for adapter, high for correction/schema/privacy review. No application suite ran for this planning doc. Runtime PRs must record exact checks and remain unmerged for review.

## Persona ownership in the connected sales flow

Reuse existing lib/data/personas.ts (including appsec, platform, ai-owner and iga-owner) and native category IDs. These role profiles remain generic starting guidance; do not infer an account stakeholder, champion/economic buyer or buying intent from them. The [shared sales-flow spec](https://github.com/heyfunwhoa/technical-docs-platform/blob/docs/security-gtm-intelligence-foundation-20261011/product/security-gtm-intelligence-foundation/sales-flow.md) defines role revision references and field authority. Company messaging overlays and actual stakeholders stay in company systems. Review existing buying-center/role PRs before schema expansion; no second persona catalog.
