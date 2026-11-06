# Source-to-outcome knowledge model: delivery plan

Status: proposed design and planned implementation. Created 2026-11-06. Owner role: Security Market Map maintainer; named implementation assignees remain unallocated. Next planning review: 2026-11-13.
Tracking: [KRU-211](https://linear.app/krusty/issue/KRU-211). Existing project: Security Market Map — Evidence Explorer Pilot; milestone M3 — Source-to-outcome knowledge model.

## Product outcome

A reader can understand a security category independently of vendors, connect it to a business problem and measurable outcome, inspect the exact supporting source revision and then investigate product evidence. Another application can accept that knowledge independently and handle corrections without losing local context.

Linear owns delivery status and dependencies. This repository owns durable public design and research. Source collection belongs to Account Signal Engine. Shared contracts belong to Technical Docs. Neither this plan nor a Done issue establishes deployed enforcement.

## Audit and reconciliation

The November 6 audit identified 11 domains, 74 categories, 221 vendors, 294 products, 234 sources and 14 use cases. Forty-four categories lack linked use cases; 18 lack a direct category claim, which does not imply absence of related product evidence. Recompute at implementation baseline.
PR #137 provides editorial category foundations and explanations. [PR #138](https://github.com/heyfunwhoa/security-market-map/pull/138) adds executive-priority research and independent workflow design. Reconcile these before typed migration; neither establishes deployed schemas.
Reuse KRU-54 offline import, KRU-105 Latio, KRU-106 Gartner metadata and KRU-78 learning handoff. KRU-106 is Done but its checkpoint describes a documentation seed, not completed typed intake. Preserve that distinction.
The canonical Notion PRD was unresolved in the prior Gartner checkpoint. K1 must locate/reconcile its current identity, or explicitly document the unresolved dependency before implementing conflicting requirements.

## Connected records and ownership

| Record | Purpose and minimum semantics | Canonical responsibility |
| --- | --- | --- |
| Publisher | Stable identity, official domains, role, scope, aliases; authority is contextual | Reconcile identity with ASE source ownership; do not duplicate mutable publisher registries |
| Publication revision | Exact document/edition, original ID/URL, dates, rights, hash where permitted, supersession | ASE collection/provenance; Market Map reviewed references |
| Evidence/claim | Scoped statement, passage locator, revision, evidence type and review | Existing producer evidence and Market Map claim boundaries |
| Requirement set and requirement | Kind, issuer, edition, original requirement ID, applicability, effective dates where relevant | Market Map public interpretation with original authoritative references |
| Business problem | Affected process, stakeholders, causes, consequences and discovery questions | Market Map generic concepts |
| Outcome and metric definition | Desired improvement, units, numerator/denominator, time window, measurement method, counter-metric | Market Map definitions; actual customer results remain consumer-owned |
| Initiative/use case | Work to address a problem, owner/budget hypotheses, workflow and dependencies | Extend/reuse existing Market Map use cases |
| Category/capability | Neutral purpose, scope, exclusions, workflow and evaluation questions | Existing Market Map taxonomy |
| Vendor/product | Attributed offering capabilities, versions, commercial/deployment scope and Unknowns | Existing Market Map records |
| Mapping | Typed source/target references and revisions, scope, rationale, evidence, exact/partial/editorial correspondence, review | Owner of the interpretation |
| Consumer adoption | Pinned reference, local purpose, acceptance, status-check deadline, disposition | Each consuming application |

This is a conceptual schema, not a new canonical registry. K1 decides implementation fields, IDs and migrations. Keep epistemic status (reported, observed, tested) separate from editorial state (candidate, reviewed, published).
Separate product category, practice/program, architecture and service model. MSSP/MDR is not interchangeable with EDR or a technical capability.
Do not infer compliance from a category or vendor membership. Do not infer a funded project, intent or revenue from a market outcome.
Preserve desired outcome versus reported result versus observed measurement as distinct concepts.

## Sources, Standards & Requirements

The proposed section is a view over reviewed records, not another scraper. Candidate families:

| Family | Seed organizations or source types to verify | Main use |
| --- | --- | --- |
| Standards and guidance | NIST, ISO/IEC, CIS | Definitions, control structures and practices |
| Official laws/regulators | Primary legislation and relevant regulator publications | Obligations with jurisdiction, dates and applicability |
| Assurance/industry requirements | AICPA, PCI SSC | Assurance criteria and industry requirements |
| Technical methods | MITRE, OWASP, FIRST, CISA, CSA | Threat/weakness models, testing and prioritization |
| Analyst research | Gartner, Forrester, IDC, SACR, Latio | Attributed market vocabulary and category boundaries |
| Product documentation | Official documentation, release notes and scoped evaluations | Offering capabilities and limitations |
| Operational/economic evidence | Studies, incident reports and customer evidence | Outcomes with measurement and selection-bias limits |

This table is a research queue, not a verified exhaustive bibliography. K2 verifies at least one publication per family, records coverage gaps and distinguishes metadata-only access from inspected full text. Never reproduce licensed content without appropriate rights.
Suggested filters: family, topic, document type, jurisdiction, edition, historical/current, rights, review state and last checked date.
SACR and other taxonomies remain external lenses with reviewed crosswalks, not universal category truth.

## Outcome map and measures

| Intended outcome | Deliverable | Acceptance target | Measurement caution |
| --- | --- | --- | --- |
| Explain categories without vendor dependence | Three complete teaching paths | Two readers explain job, boundary, owner, outcome and source for at least two of three paths | Record baseline and actual sessions; do not invent results |
| Trace public assertions | Reviewed evidence mappings | 100% of published pilot factual mappings carry revision, scope, rationale, decision and owner | Editorial hypotheses remain visibly labeled |
| Maintain independently | Pinned adoption and correction drill | One offline consumer can accept/reject/defer and handle retraction | Offline success is not live integration proof |
| Prevent unsupported publication | Integrity gates | Zero orphan or unapproved/retracted promotions in defined negative fixtures | Passing fixtures do not prove universal correctness |
| Keep upkeep affordable | Review queue and cadence | Every pilot record has owner and review policy; measure reviewer time and backlog age | Establish baseline before promising cost savings |

## Three pilot paths

| Path | Business problem | Desired outcome and candidate measures | Counter-metric / boundary |
| --- | --- | --- | --- |
| SOC capacity | Investigation backlog and repetitive analyst work | Analyst time per qualifying case; queue age; escalation time | Error/escalation quality and coverage must not deteriorate; faster closure alone is not better security |
| Secrets exposure | Credentials remain usable after exposure | Exposure-to-revocation time; verified closure fraction | Detection count is not risk reduction; developer disruption and coverage matter |
| Recovery readiness | Critical services cannot be restored reliably | Tested restoration against agreed objective; restore completeness | Backup existence is not successful service recovery; scenario scope and dependencies matter |

All measures are proposed definitions. Customer baselines, targets, costs and results remain Unknown until measured in an authorized setting.
These three end-to-end pilots test the whole schema. Existing CSPM, DSPM, SAST, third-party-risk and recovery teaching exercises in [category explanation system](category-explanation-system.md) remain useful breadth tests; reuse the recovery material rather than restart it.

## Delivery sequence

### KRU-212: Reconcile knowledge schemas, ownership and migration boundaries

[Linear issue](https://linear.app/krusty/issue/KRU-212) · Planning effort: 6–9 AI-assisted hours + 2–3 human review hours.
Dependencies: none; begin with reconciliation.

Outcome: one reviewable design reconciles PRs #137/#138 with existing catalog and PRD, without duplicate entities.

Acceptance:
- Locate canonical Notion PRD referenced by KRU-106, or explicitly record unresolved authority before implementing conflicting requirements.
- Define Publisher, PublicationRevision, RequirementSet/Requirement, BusinessProblem, Outcome/MetricDefinition, Initiative/UseCase and EvidenceMapping; reuse Category/Capability/Vendor/Product and existing Source/Claim IDs.
- Define owning repo, stable IDs, aliases, revision semantics, null/Unknown, applicability, rights, review states and supersession per entity.
- Mapping requires relation type, source/target revisions, scope, rationale, evidence and review; distinguish exact/partial/editorial correspondence. No transitive product-compliance inference.
- Keep editorial approval separate from epistemic status (vendor-reported/tested/etc.).
- Propose additive migration and rollback; no mandatory live service or breaking identity-flow replacement.
- Reconcile five existing category teaching exercises with three end-to-end pilots: reuse recovery exercise and retain other exercises as later breadth coverage.
Evidence: schema decision, ownership matrix, existing-ID crosswalk and sample fixtures. Shared-contract changes belong to separately reviewed Technical Docs work.

### KRU-213: Build scoped authority and publication register with rights and versions

[Linear issue](https://linear.app/krusty/issue/KRU-213) · Planning effort: 6–9 AI-assisted hours + 2–3 human review hours.
Dependencies: KRU-212.

Outcome: readers distinguish market opinion, technical guidance, requirements and product claims, and can find the exact edition used.

Acceptance:
- Reuse Gartner KRU-106 metadata, Latio KRU-105 and SACR crosswalk; independently verify candidate references before promotion.
- Pilot inventory covers standards/guidance; official law/regulator material; assurance/industry requirements; technical methods; analyst research; product documentation; operational/economic evidence. At least one reviewed publication per family, with explicit Unknown where access prevents review.
- Track organization role/scope, original URL/document ID, edition, publication/observation/check dates, jurisdiction/applicability when relevant, supersession and permitted use. No claim of exhaustive global coverage.
- Preserve licensed-material boundaries and metadata-only access. Separate legal requirements, voluntary guidance and contractual obligations.
- Proposed filters: source family, topic, document type, jurisdiction, edition, historical/current, rights and review status.
- Deduplicate by canonical identity plus edition, not URL alone; maintain aliases and parent publisher history.
Evidence: bounded inventory, coverage denominator, gaps queue and reviewed mapping examples. Do not duplicate ASE acquisition registry or scrape by default.

### KRU-214: Connect three business-outcome pilots to categories and evidence

[Linear issue](https://linear.app/krusty/issue/KRU-214) · Planning effort: 8–12 AI-assisted hours + 3–4 human review hours.
Dependencies: KRU-212, KRU-213.

Outcome: three neutral paths teach SOC capacity, secrets exposure and recovery readiness, then allow optional standalone vendor evidence.

Acceptance:
- For each path record business problem, affected process, persona/owner hypotheses, initiative, workflow, capability/category references, dependencies, exclusions and evidence.
- Define metrics with unit, numerator/denominator where relevant, baseline window, measurement source, target owner and counter-metric. Separate desired, vendor-reported and observed outcomes.
- SOC capacity example: analyst time per qualifying case, queue age, escalation/error quality. Secrets example: exposure-to-revocation time and verified closure, not finding count alone. Recovery example: service restoration test against agreed objective and restore completeness.
- Use illustrative examples explicitly; no invented customer baselines, ROI or result claims.
- Distinguish category/practice/service/architecture/program kinds. Preserve service-delivery model (MSSP/MDR) as a separate dimension from product category.
- Each path remains useful with vendor names removed. Product capabilities require independent scoped records; no automatic comparison or LimaCharlie framing.
- Optional requirement connections carry exact version, applicability and limitations; category relevance is not compliance proof.
Evidence: three worked paths, source-linked mappings and metric definitions, reviewed by owner before typed publication.

### KRU-215: Enforce revision, freshness and correction gates for knowledge mappings

[Linear issue](https://linear.app/krusty/issue/KRU-215) · Planning effort: 7–11 AI-assisted hours + 1–2 human review hours.
Dependencies: KRU-212.

Outcome: stale, withdrawn or unsupported knowledge cannot silently become current evidence; corrections identify affected uses.

Acceptance:
- Fix misleading frozen catalog date labelled Today; distinguish publication snapshot, actual check time and freshness evaluation time.
- Validate IDs, relation types and compatible revisions; unknown references quarantine rather than invent mappings.
- Reuse KRU-54 offline importer tests and current review model. Test duplicate replay, unsupported schema, rights revocation, retraction, partial mapping and rollback that cannot reactivate revoked evidence.
- A source update queues mapping review, never auto-approves mappings or changes vendor-reported status.
- Routine update preserves last accepted permitted revision with visible age; freshness expiry blocks new current-evidence promotion; withdrawal blocks new reuse and creates impact dispositions.
- Define per-layer owner, review cadence, status-check interval, overdue queue and incident severity. No scheduled automation claimed without separate implementation evidence.
- Record affected downstream IDs and disposition; preserve private/local notes. Runtime gate enforcement must be separately demonstrated from documented policy.
Evidence: positive/negative fixtures, exact-commit check results, correction drill and rollback evidence.

### KRU-216: Validate source, problem and category entry paths with readers

[Linear issue](https://linear.app/krusty/issue/KRU-216) · Planning effort: 4–7 AI-assisted hours + 1–2 human session/review hours.
Dependencies: KRU-214, KRU-215.

Outcome: the model improves comprehension and navigation rather than only adding tables.

Acceptance:
- Reuse existing source/category/product pages and components; inspect UI guidance before any UI changes.
- Support three task entry paths: source/requirement, business problem/outcome, category. Product detail is a later optional layer. Preserve filters and return-to-context navigation.
- Two real readers attempt the three pilots. Target: both explain job, boundary, owner, outcome and supporting source in at least two of three; record actual results and failure reasons, not invented pass scores.
- Record initial baseline, completion time, confusion points and changes; targets are not performance claims.
- Verify mobile/desktop, keyboard/focus, text readability, empty/Unknown/stale/retracted states and reduced motion where applicable.
Evidence: session notes sanitized for public use, acceptance checklist and exact revision. Existing KRU-78 owns Academy handoff; link rather than duplicate.

### KRU-217: Prove independent consumer adoption and correction with offline fixtures

[Linear issue](https://linear.app/krusty/issue/KRU-217) · Planning effort: 4–7 AI-assisted hours + 1–2 human review hours.
Dependencies: KRU-214, KRU-215.

Outcome: one consumer can accept or defer a knowledge revision while preserving ownership and reacting safely to corrections.

Acceptance:
- Select ASE discovery preparation as proposed first consumer; reconcile with its current PRD and owner before changing that repo.
- Local acceptance record pins producer artifact/record/revision and contract version, purpose, reviewer, freshness limit and disposition.
- Reuse KRU-54 and shared contracts; create a separately reviewed contract addition only if existing evidence contract cannot express the requirement. No silent bidirectional expansion.
- Synthetic/offline exercise covers accept/reject/defer/no-change, duplicates, unsupported versions, producer unavailable, expiry and retraction.
- Corrections flag premises for owner review; no private data flows into public map, and no automatic opportunity, campaign, forecast or financial updates.
- Demonstrate independent releases and rollback; no live handoff until authentication, rights, observability and owner readiness are separately verified.
Evidence: consumer-owned fixture PR, pinned producer revision and acceptance/correction log. Live integration is explicitly out of this milestone.


## Maintenance and release gates

1. Intake checks identity, provenance, dates, rights and permitted storage.
2. Evidence review checks source meaning, scope and qualifiers.
3. Mapping review approves the interpretation for exact revisions.
4. Publication checks eligible state and referential integrity.
5. Consumer acceptance records local purpose and revision.
6. Correction identifies affected mappings/consumers and records disposition.

Routine source revisions queue review; they do not overwrite accepted interpretation. Expired status checks prevent new current-evidence promotion; permitted history can remain labeled. Retraction and revoked rights block new reuse and trigger remediation. Rollback cannot restore invalid evidence.
Starting review policy: monthly publication/priority triage, quarterly stable taxonomy/metric definitions, event-driven review for revisions/retractions; consumer owners set use-specific freshness limits. These are proposed human routines, not enabled scheduled jobs.
Measure backlog age, correction acknowledgement time and reviewer effort during the pilot. Set ongoing service targets after measuring capacity.
Fix source-page text that calls a frozen catalog as-of date Today; distinguish snapshot date, current evaluation date and actual last source check.

## Additional PM gaps addressed

- Decision rights: identify accountable human owner and reviewer; no orphan maintenance responsibility.
- Migration: preserve IDs/aliases and retired editions; additive schema first, rollback and compatibility before expansion.
- Rights and applicability: licensed metadata, legal jurisdiction and contractual scope are not interchangeable.
- Conflict handling: retain contradictory evidence and Unknown rather than forcing a single answer.
- Scope limits: bounded pilot inventory, not a promise to catalog every global authority or compliance obligation.
- Validation: comprehension and real reader feedback, not record count alone.
- Adoption: each consumer decides relevance, while withdrawn material cannot remain current.
- Cost and capacity: review labor, retrieval/storage permissions and change volume are operating constraints.
- Dependencies: planned work is not complete just because an antecedent documentation issue is Done.
- Non-goals: rankings, automatic comparisons, compliance certification, ROI claims, live scraping, new paid services and production integration.

## Effort, sequencing and status

Planning estimate: 35–55 focused AI-assisted research/implementation hours plus 10–16 human review/session hours; about 3–5 elapsed weeks with part-time capacity. These are judgment estimates, not measured productivity or delivery commitments. Re-estimate after K1.
AI can draft structures, propose mappings, extract permitted metadata and run checks. Humans validate meaning, rights, applicability, metric relevance and publishing decisions.
Limit active implementation to two slices and one writer for catalog migration. K1 first; K2 and K4 can follow; K3 depends on K2; K5/K6 depend on pilots and gates.
No due dates or individual assignments imposed. Linear records the actual blocker relationships; all new implementation tasks start in Backlog.

## Acceptance evidence for this planning change

- Created parent issue, six child issues and milestone in the existing project; dependencies recorded.
- Reused prior issues rather than reopening completed scopes or duplicating analyst intake.
- This file records proposed schemas and delivery gates, not implemented runtime behavior.
- Documentation/research checks recorded in the delivery handoff; full application checks are required before future code release.
- No schema/catalog/UI mutation, collector, consumer integration, merge or deployment in this planning change.
