# Build + learn roadmap
Status: plan, not implemented. Apply software discipline to every milestone: feature branch → small changes → schema/unit tests → lint/typecheck/build → manual accessibility/UX review → draft PR → merge after review.

| Phase | What to ship | What it teaches |
|---|---|---|
| P0 — Audit current system | Route inventory, Zod schema map, current identity claims/source audit, target visitor tasks | Product discovery, requirements, evidence vs assumptions |
| P1 — Knowledge model extension | Typed IDs and relationships for Role/Persona/ICP/UseCase/Technology; preserve existing records | Data modeling, schema evolution, entity resolution, referential integrity |
| P2 — First atlas experience | Identity + NHI technology deep dive, acronym/alias lookup, architecture links, 2 roles and buying motions | IA, accessible UX, technical writing, research |
| P3 — Analyst & source library | Report metadata/market definitions, source trust/conflict/freshness display and editorial review status | Provenance, content governance, licensing |
| P4 — Threat/control and compliance maps | Scoped MITRE ATT&CK, NIST, OWASP relationships and cited control/use-case connections | Security standards and accurate mapping |
| P5 — Learning paths | Role-based reading modes, prerequisites, applied drills, confidence/evaluation | Instructional design, product metrics |
| P6 — Controlled ingestion | Firecrawl/Exa adapters with budgets, allowlist, dedup, source rights, audit log, diff and manual approval | Data engineering, background jobs, reliable pipelines |
| P7 — Retrieval & API | Approved citation-aware RAG, measured retrieval evals, access controls, versioned API | AI engineering, software architecture and product integration |
| P8 — Downstream GTM products | Account Signal Engine integration, competitive/market monitoring, persona-based briefing | Segmentation, enablement, GTM leadership |

## Skills curriculum embedded into work
**Product management:** audiences, JTBD, product brief, scope/non-goals, prioritization, acceptance tests; defend decisions against evidence.
**Data engineering:** schema, normalization, aliases, source identity, canonical IDs, dedup, provenance, timestamps, change feeds; validate with fixtures.
**Software engineering:** React/Next.js, API contracts, TypeScript/Zod, tests, Git/PR review, CI, background jobs (only when warranted), security review and accessibility.
**AI engineering:** retrieval vs generation, evidence grading, citation verification, offline evaluation, human approvals, prompt injection awareness, abstention, observability, token/financial cost.
**GTM leadership:** category segmentation, personas, buying centers, ICP-fit assumptions, buyer journeys, market sizing caveats, sales plays, positioning and enablement; avoid claiming purchase intent from inferred signals.

## Definition of done for each incremental change
- Research/UX question and intended user named.
- Facts have sources, retrieval dates and rights labels; interpretations tagged.
- No regressions to existing evidence boundaries or 'Unknown' semantics.
- Tests and checks run and results recorded; no invented passes.
- Security/privacy implications assessed.
- Plain-language explanation + short reflection: What did I learn? What trade-off was made?
- PR links to source evidence and UX decision.

## Immediate next PR after this design-only plan
1. Audit current Zod schemas and routes, document conflict with proposed model.
2. Implement only `SecurityRole` with 2–3 sourced or clearly illustrative roles and `BuyingPersona` with one buying scenario.
3. Add validation tests and a minimal static directory, then discuss whether a dedicated route is useful.
4. No automated scraping, database migration, RAG or vector store yet.

## Non-goals for initial milestone
No giant vendor scrape, no unsourced feature parity, no paywalled analyst content hosting, no fabricated role reporting lines or budget authority, no full knowledge graph service, and no automatic CRM updates.
