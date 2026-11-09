# Evidence-linked market graph: low-cost pilot and cross-repository guardrails

> Status: proposed implementation requirements, not shipped. Reviewed: 2026-11-08. Owner: Security Market Map for market graph presentation and canonical published market entities. This document adds acceptance criteria to existing work; it does not supersede the product PRD, current catalog schemas, knowledge-model delivery plan, or the shared security-intelligence contracts.

## Purpose and outcome

Enable a reader to traverse **category → buyer problem → capability → vendor/product → exact dated evidence** and understand what is known, vendor-reported, hypothesized, contested, stale, or not evaluated. Prove utility on a small Secrets / NHI / Identity slice, then evaluate one read-only downstream use. A graph is an optional navigational view, not a replacement for existing category/comparison/evidence journeys.

## Existing foundations to reuse before implementing

- `lib/schema.ts`: domain, category, product, vendor, capability, persona, use case, source, claim and product-level competitive relationship types.
- `lib/catalog.ts`: validated canonical catalog and reference integrity. Reuse IDs and publication boundaries. Category membership does **not** prove capability.
- `docs/security-intelligence/relationship-vocabulary.md` and `docs/security-intelligence/information-architecture.md`: proposed typed, temporal edge and evidence contract, public graph/accessibility requirements. This is not an implemented shared graph database.
- KRU-211 and KRU-212: source-to-outcome knowledge model and schema/ownership reconciliation; existing PRs #137/#138. KRU-218: reviewed intake templates. Do not create a competing migration writer.
- Open PRs #148 and #123 both modify persona representation (including legal stakeholder alias overlap). Reconcile these before consuming their proposed persona graph APIs.
- KRU-247 and KRU-237: existing Design Lab evidence-review reuse decision and acceptance. A graph inspector should reuse proven local evidence components; the Design Lab does not own market facts.
- Existing research-evidence producer/consumer boundaries (KRU-54, KRU-57) and KRU-101 approved participation relationships are separate workflows.

## Seven delivery stages (gated)

1. **Audit:** inventory current relationship and source schemas, diagrams, filters, existing open PRs and CI checks. Record baseline and exact main/branch SHAs; do not install libraries before demonstrating a UI gap.
2. **Canonical projection:** derive typed versioned `GraphNode` and `GraphEdge` views from approved records. Reuse existing stable IDs; namespace IDs by entity kind and owner when cross-repo references are necessary. Keep inference, ontology/taxonomy membership, comparison, factual support, and security intelligence edges distinct. Don't mutate `lib/data` to render a graph.
3. **Read-only pilot:** render one bounded Identity / Secrets / NHI slice with Cytoscape.js if a library is necessary and bundle/performance/accessibility checks pass. The existing catalog remains source of truth. No Neo4j, graph server, scraping, or external model calls.
4. **Trustworthy exploration:** graph node and edge evidence inspector, accessible relationship list, search, category filters, typed legend, zoom, selected expansion with bounded depth, empty/unknown/stale/conflict states and mobile fallback. Graph links must never imply more certainty than the underlying claims.
5. **Meaningful views:** separate buyer/problem/JTBD and category-convergence views built from the *same* projections, not additional duplicate datasets. Clearly label illustrative mapping vs reviewed factual claims.
6. **Contract and exports:** schema validation, deterministic versioned JSON and optional CSV, source attribution, alias/deprecation map, per-consumer permission checks and compatibility tests. Validate one read-only downstream consumer offline before any live integration.
7. **Measure and decide:** compare baseline navigation with graph-based answers, time-to-evidence, reference accuracy and reader utility. Only benchmark Sigma.js, PostgreSQL relationship tables or Neo4j after real scale/query needs emerge; adopt/defer/reject with evidence and total ownership cost.

## Canonical identity and relationship rules

### Entity identity

- Distinguish company/legal entity, vendor brand, product, product version, category, domain, capability, problem, use case, buyer *role* (not real person), published source, claim, event and optional market signal. Not every type needs to be in the initial UI.
- Normalize alias/canonical crosswalks; handle renames, acquisitions, merges/splits, product-vendor changes and retired IDs without discarding historical attribution.
- Stable IDs are never silently reused for new meanings. An unresolved entity match remains an explicit review candidate.

### Publication and trust on every navigable edge

Proposed public projection fields: `id`, `subjectId`, `predicate`, `objectId`, `owner`, `claimId`/supporting source reference, `status`, `confidence`, `observedAt`, `reviewedAt`, `validFrom`, `validTo`, and source revision/version where available.

- Distinguish **reported** (including vendor-published), **observed**, **hypothesis**, **disputed**, **unknown** and **superseded/retracted**; confidence is a different dimension. Map to existing catalog enums carefully instead of replacing them in the visualization.
- For factual/published edges, source IDs and dated evidence are mandatory. Unreviewed suggestions remain outside public exports. If the source is unavailable, display an explicit limitation.
- Taxonomy adjacency and product category membership do not imply technical feature implementation, direct competition, efficacy, customer usage or buying intent.
- Preserve contradictory and historical claims and display appropriate qualifiers. Corrections and retractions must invalidate affected active projections without destroying their audit history.
- An absent edge means **Not evaluated**, not a negative capability verdict.
- For incidents/defense techniques, defer to Security Intelligence's distinct published claim and ATT&CK/dataset version semantics; avoid merging its relationship vocabulary into competitive taxonomy without a reviewed adapter.

## Evidence and relationship inspector acceptance

Selecting a node or edge should answer:
1. What is this entity and who owns the record?
2. What exactly is the relationship, its direction and scope?
3. Is it an observed fact, vendor claim, analytic comparison or unreviewed hypothesis?
4. What is the exact primary source/revision, publication date, retrieval/review date and permitted excerpt?
5. What contradicts, supersedes, limits, or weakens the claim?
6. What is *not* evaluated, and what next question could a researcher investigate?

Reuse existing source disclosure, comparison evidence, stale/Unknown labels, and keyboard tested components where possible. Give equal functionality via list/table, not a graph-only interface.

## Pilot benchmark questions (record expected and observed answers)

- Which reviewed products are associated with Secrets Detection, and which specific capability evidence supports or does not support the comparison?
- Which categories bridge Secrets Detection, NHI and IGA, and which are only taxonomically adjacent?
- Which buyer *roles* are mapped to credential exposure and how do stated jobs and evaluation criteria differ?
- Which claims changed or conflicted over time, with exact source revision and reviewer decision?
- Can a reader traverse vendor → product → use case → category → source without losing Unknown/vendor-reported qualifications?
- Does read-only exported data reproduce the same supported subgraph and respect exclusion of unreviewed/private/retracted material?

Pass targets (not achieved): zero dangling or duplicate IDs; zero unsupported capability inference in negative fixtures; 100% published pilot factual edges trace to an approved source revision, rationale, owner and review status. Measure reader comprehension on at least two journeys and record actual performance, accessibility and bundle cost. Never invent results.

## Cross-repository boundaries and responsibilities

| Owning project | Owns | Reuses / does not own |
| --- | --- | --- |
| Security Market Map | Public cybersecurity market taxonomy, vendor/product/capability claims, curated market relationships, first read-only graph UI | Does not copy account/CRM records or own private company signals |
| Technical Docs Platform / shared intelligence initiative | Versioned cross-repo contract vocabulary and documentation; interoperability standards | Does not take ownership of application catalogs |
| Portfolio Ops Runtime | Adoption decisions, dependency gates, accountable owners, review, privacy and cost governance | Does not become a second data lake |
| Design Lab | Reusable evidence inspector and accessible graph interaction patterns when measured useful | Does not publish market facts |
| Buyer & Persona Foundation | Generic role-to-JTBD and buyer frameworks according to existing owner and currently reconciled Market Map persona work | Does not infer an account's actual stakeholders |
| Account Signal Engine | Public account/source acquisition, change signals, entity matching proposals and approved exports | Does not write reviewed SMM claims directly |
| GTM Revenue OS | Private account qualification, decisions, action handoff and outcomes | Does not expose private deal context in public graph |
| Channel Marketing | Partner/event/campaign-specific relationships and authorized outcomes | No guessed attendees, intent or sponsorship |
| Detector Coverage Atlas | Detector/technique/control evidence and measured coverage claims | No automatic equivalence between vendor assertions and proven detection |

Use bounded read-only contracts and exact provenance across boundaries. Require per-consumer approval and access classification. Public market graph must never join confidential employer, customer, prospect, personal or CRM data into public search, autocomplete, analytics, AI context or exports.

## AI/automation permission model

- Research/collection may propose candidate entities, edges and sources only where connectors and permissions allow.
- A research agent cannot publish a claim, rewrite canonical IDs, reclassify evidence as verified or silently retract history.
- A separate action workflow may suggest next research or outbound activity, but company-controlled CRM writes, campaigns and external communications require explicit authorization, reviewed inputs and logged action owner.
- Apply source licensing, robots/terms, retention, least privilege and prompt-injection defenses. No autonomous bulk crawl, paid model loop or automatic live collection is required for the pilot.
- Record input version, model/tool if used, proposed output, reviewer, disposition, and rollback for any automated enrichment. Do not treat model confidence as evidence.

## Cost, performance and maintenance guardrails

- Prefer zero incremental licensing: current TypeScript/Zod + Next.js, Cytoscape.js only if needed, ECharts for complementary charts, Gephi Lite for optional exploration. Avoid a new database/service in pilot.
- Avoid automatic rendering of entire catalogs; bounded subgraphs, depth limits, pagination/lazy expansion, deterministic cached projections and measured bundle size.
- No new recurring graph SaaS, Neo4j, managed graph hosting, background refresh jobs, paid data APIs, or cross-repo sync unless later explicitly approved against a benchmark.
- Track hosting and CI cost separately from library license cost; open source is not zero total cost.
- Establish owner, last review, compatibility version, change process, rollback and a sunset/defer decision for unused views.

## Rollout and stop gates

**First:** reconcile KRU-212 and open persona branches, finish a source-to-outcome pilot under KRU-211, and document tested baseline queries.
**Second:** one small read-only graph and evidence inspector; owner review and visual/keyboard/mobile verification.
**Third:** one authorized read-only consumer, ideally Account Signal Engine's public intelligence view, without bidirectional sync.
**Later:** additional repo-specific graphs and advanced persistence only when measured questions cannot be answered cheaply with existing models.

No new database, new shared service, new cross-repository source of truth, private-data publication, unreviewed claim promotion, outbound automation, merge or production deployment authorized by this plan. Implementation PRs need their own acceptance and owner decisions.

## Existing links and follow-up ownership

- [KRU-211 knowledge model](https://linear.app/krusty/issue/KRU-211/mm-deliver-independently-maintained-source-to-outcome-knowledge-model)
- [KRU-212 schema reconciliation](https://linear.app/krusty/issue/KRU-212/mm-k1-reconcile-knowledge-schemas-ownership-and-migration-boundaries)
- [KRU-247 Design Lab reuse evaluation](https://linear.app/krusty/issue/KRU-247/design-lab-evaluate-first-measurable-reuse-in-security-market-map)
- [KRU-101 participation relations](https://linear.app/krusty/issue/KRU-101/evi-04-approved-participation-relationships-for-security-market-map)
- [Persona PR #148](https://github.com/heyfunwhoa/security-market-map/pull/148)
- [Persona PR #123](https://github.com/heyfunwhoa/security-market-map/pull/123)
- [Existing knowledge model plan](knowledge-model-delivery-plan.md) — check branch availability; not presumed merged
- [Existing shared architecture](../security-intelligence/architecture.md)
