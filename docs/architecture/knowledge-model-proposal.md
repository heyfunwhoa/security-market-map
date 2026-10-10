# Connected knowledge model — design proposal
**Not a schema migration.** Extend the current typed Zod catalog incrementally; inspect `lib/schema.ts`, `lib/catalog.ts`, `lib/data/{sources,claims}.ts` before writing code.

## Canonical entities
| Entity | Essential fields | Why |
|---|---|---|
| Domain | id, label, description | Broad taxonomy |
| Category / Technology | canonicalId, preferredTerm, aliases, domainIds, definition, maturity, relationships | Support multiple taxonomies and overlaps |
| Acronym | term, expansions[], contexts[], canonicalConceptIds | Resolve ambiguity safely |
| Capability / Control | id, type, description, relatedTechnologyIds, mappings | Architecture / coverage without product assertions |
| Threat / Standard / Regulation | id, framework, version, scope, sourceIds | Evidence-backed demand/control mapping |
| SecurityRole | id, family, titles[], responsibilities, skills[], seniorityContext | Job directory |
| BuyingPersona | id, buyerFunction, context, motivations, objections, evaluationCriteria | Role in a purchase, not job title |
| ICP / Segment | id, sector, sizeBand, environment, maturity, constraints, geography, evidence | Account fit model, not people |
| BuyingMotion | id, useCaseIds, segmentIds, personas[], decisionProcess, triggers[] | Contextual purchasing committee |
| UseCase | id, problem, technicalPreconditions, expectedOutcomes, criteria, categoryIds | Buyer-to-technology bridge |
| Vendor | id, legalName, aliases, sourceIds | One company can own many products |
| Product | id, vendorId, offerings, categoryIds, status, sources | Claims attach to product/version |
| AnalystReport | id, publisher, title, authors?, reportType, date, marketDefinition, url, rights | Multiple analyst taxonomies and viewpoints |
| Source | id, canonicalUrl, publisher, publishedAt?, retrievedAt, rights, volatility | Auditability and freshness |
| Claim | id, subjectId, predicate, object/value, context, polarity, citedSourceIds, observedAt, reviewStatus, conflicts | Supported assertion |
| Relationship | fromId, relationType, toId, scope, sourceIds, verificationStatus | Typed navigability, not speculative parity |
| LearningPath | id, intendedRole, prerequisites, conceptIds, exercises, validation | Education layer |

## Relationship types (examples)
`is_subcategory_of`, `overlaps_with`, `complements`, `integrates_with`, `addresses_use_case`, `used_by_role`, `evaluated_by_persona`, `typical_for_segment`, `mapped_to_control`, `mapped_to_threat_technique`, `defined_in_report`, `supplied_by_product`.
Relationships must document scope, directionality, confidence/evidence. Avoid ungrounded transitivity ("A relates to B; B relates to C; therefore A competes with C").

## Publishing and retrieval policies
- Source snapshot/canonical URL, retrievedAt, publication date when available, author/publisher, license/access constraints.
- Facts derived from documentation ≠ vendor marketing assertions ≠ analyst opinions ≠ inferences.
- Review status: draft → review needed → approved or disputed; expiry/stale flag separate.
- Conflict is representable; missing evidence remains Unknown.
- Citations ideally at claim and relationship level.
- If adding RAG later, retrieve approved chunks with source pointers, enforce rights/access scope and abstain if evidence is weak.
- API design later: stable IDs, versioning, rate limiting and documented query semantics; don't expose editorial drafts by default.

## Content quality tests
Unique IDs; links resolve; acronym expansion disambiguated by context; source freshness policy; missing rights labels; no orphaned approved claims; no fabricated budget estimates; relationship validity; symmetric relationship constraints where applicable; never map an analyst report title to unverified vendor rank.

## First implementation slice
Add **Role** and **BuyingPersona** to the existing data model only after an audit. Build one role-to-technology example and one use-case-to-persona relationship, then tests. Keep migration backwards-compatible.
