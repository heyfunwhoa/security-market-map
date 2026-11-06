# Executive priorities: connected workflows and independent maintenance

Status: **proposed design, not implemented integration**. Owner: Security Market Map maintainer. Created/checked: 2026-11-06. Next design review: 2026-12-04. Companion to the [CIO/CISO guide](../market-research/cio-ciso-budget-agenda.md) and [existing foundation plan](security-gtm-intelligence-plan.md). Subordinate to existing product requirements and the accepted [research evidence boundary](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/architecture/ADR-001-research-evidence-boundary.md).

## Decision

**Worked pilot:** [Decision map, common template and three briefs](decision-briefs/README.md) applies this design to resilience, secure AI adoption and technology consolidation. Includes separate evidence-quality, applicability and outcome assessments. The briefs are editorial candidates, not live consumer records.

Connect projects through explicit, versioned references and local review decisions. Keep source collection, public interpretation, account context and revenue assumptions under separate ownership.

Two approvals answer different questions:

1. **Publisher review:** Is the evidence public-safe, attributable, sufficiently understood and suitable for this interpretation?
2. **Consumer review:** Is this particular revision applicable to this workflow, with the right context and permissions?

An approved source does not automatically approve a category mapping, an account hypothesis, a sales claim or a financial assumption. Local acceptance cannot rescue withdrawn, private or rights-restricted evidence for new use.

## What exists and what this adds

The current budget guide, source notes and CSV are editorial research candidates in draft PR #138. The CSV's B01–B13 identifiers label research topics; they are not production initiative IDs.

This document adds workflow design, responsibility boundaries, proposed review rules, mapping examples and acceptance criteria. It adds no API, database table, catalog record, consumer import, automated enforcement or deployed UI.

The existing shared contract registry owns integration schemas. Its research-evidence-v1 path concerns approved evidence from Account Signal Engine Research Hub to Security Market Map. Do not silently turn that contract into a bidirectional account or revenue contract. A future initiative-reference contract would require a separately reviewed addition there.

## Ownership and independent release boundaries

| Owner | Authoritative responsibility | May consume | Must keep local |
| --- | --- | --- | --- |
| Account Signal Engine Research Hub | Permitted collection, provenance and source versions | Approved source lists and collection requests | Collection runs, source review and account-specific evidence |
| Security Market Map | Public category/persona interpretations and future generic initiative mappings | Approved evidence; public source references | Editorial review, taxonomy decisions, mapping rationale |
| Account Signal Engine account workflow | Account relevance and hypothesis review | A pinned Market Map revision plus authorized account evidence | Account context, relevance decision, unknowns and discovery questions |
| GTM Revenue OS | Its own workflow records and explicit scenario assumptions | Locally accepted references and authorized account context | Qualification decisions, monetary assumptions, business-case calculations |
| Learning/portfolio content | Teaching sequence and educational interpretation | Accepted public concepts and source links | Exercises, lesson revisions and learning progress |
| Technical Docs Platform | Shared contract definitions and compatibility fixtures | Requirements proposed by owning projects | Schema/version policy; no business-data ownership |

These responsibilities do not assert live connectivity. Do not share database credentials, overwrite another application's records, or move private notes back into the public map. Vendor-specific material remains a separate, optional evidence layer.

## Applicable workflows

| Workflow | Connection and user action | Required checks | Consumer-owned output |
| --- | --- | --- | --- |
| Executive learning | Select CIO/CISO concern → read historical evidence → practice a decision | Source dates and population; distinguish recommendation from survey result | Lesson notes and an exercise answer |
| Category exploration | Concern → generic initiative → category → product evidence | Mapping rationale; existing category IDs; no membership-to-feature inference | Public explanation or comparison question |
| Account research | Public initiative reference + account announcement or authorized discovery → assess relevance | Same company; relevant date/scope; corroboration; no keyword-to-intent promotion | Account hypothesis with missing evidence |
| Discovery and qualification | Accepted hypothesis → ask about owner, outcome, timing and funding | Customer statement attribution; authority not inferred from job title | Confirmed/unknown fields in the owning workflow |
| Business case and budget | Confirmed project → compare alternatives → enter assumptions | Funding source; full operating cost; adoption; double counting; sensitivity | Locally approved scenario, not a market-derived forecast |
| Campaign or educational content | Accepted market concern → persona message → draft content | Audience relevance; citations; rights; claim meaning; communications authorization | Draft campaign or learning asset; no automatic sending |
| Renewal/expansion review | Existing commitment + changed needs → evaluate continuation or scope | Actual usage and outcomes; contract dates; coverage; local authorization | Renewal recommendation; no automatic expansion opportunity |
| Research correction | Revised/retracted source → affected references identified → local review | Revision matching; severity; provenance; privacy; downstream disposition | Accepted correction, blocked use or documented no-change |

Example: a published survey about AI priorities can inform a lesson. A named company's AI rollout can justify a research question. Only account evidence can establish a project owner or funding status. Neither creates revenue, pipeline or a buying commitment by itself.

## Generic initiative mapping: first review candidates

These examples define relationships to review, not new published IDs or product recommendations. References to B-rows identify the existing editorial tracker.

| Generic initiative | Executive concern | Topic reference | Existing map areas | Account evidence needed |
| --- | --- | --- | --- | --- |
| Secure a business AI workflow | Value, data boundaries and action control | B01, B03, B07 | ai, identity, data, platform | Actual workflow, data/actions, owner and rollout stage |
| Improve essential-service recovery | Availability and resilience | B05 | corporate, secops, grc | Critical service, recovery objective and observed test gap |
| Improve response capacity | Workload and effective coverage | B06 | secops; SIEM/SOAR and detection engineering where relevant | Measured bottleneck, staffing, scenarios and response obligations |
| Reduce avoidable technology cost | Predictability and duplication | B04, B08 | cloud and relevant existing domains | Baseline cost, renewal window, coverage and feasible retirement |
| Modernize a business application | Delivery constraints and technical debt | B10 | Adjacent IT initiative; security work may touch appsec/product/platform | Application dependency, migration scope and available team |
| Improve high-impact authorization | Fraud and human-driven breaches | B11 | identity, corporate | Consequential decision, process owner and tested failure scenario |
| Build delivery capability | Skills and execution capacity | B12 | Cross-domain; workforce is not a new security category | Skill gap, delivery impact and benefit owner |
| Assess cryptographic readiness | Long-lived dependencies and future change | B13 | data, platform | Inventory scope, relevant dependencies and assessment sponsor |

Before assigning stable initiative IDs, search current/pending taxonomy work and reuse any matching concept. Broader IT projects must remain adjacent context rather than being forced into cybersecurity categories.

## Reference and adoption record

Proposed fields for a future local adoption record; these are not added to research-evidence-v1:

- Producer repository, artifact path, stable record ID when available, exact revision/commit and schema version.
- Source references, evidence type, source publication date, observation date and producer review decision.
- Mapping rationale and uncertainty; public/restricted/private classification and permitted uses.
- Consumer repository, local record reference, purpose and accountable owner.
- Consumer disposition: accept, reject, defer, no-change or blocked, with reason and review time.
- Next local review date, last upstream-status check, freshness limit and invalidation status.

Until stable IDs exist, use the artifact path, exact commit and section plus a topic ID where applicable. A source-note ID such as S23 is scoped to this bibliography, not a globally unique evidence ID. Never use a moving main-branch link as the only reproducibility record.

Store only the local projection and annotations needed by a consumer. Retain a pointer to the accepted source revision; do not create an independently editable copy of the canonical research.

## Maintenance rules

Proposed starting cadence, to be reviewed by each owner:

| Layer | Routine review | Event-triggered review |
| --- | --- | --- |
| Public priority research | Monthly; annual-edition comparison when released | Correction, new survey edition or changed methodology |
| Initiative/category mappings | Quarterly | Taxonomy or source-meaning change |
| Account relevance | At active preparation/discovery milestones | New project evidence, stakeholder change or contradiction |
| Qualification/business case | At decision, stage change and approval | Changed funding, scope, costs or customer evidence |
| Teaching material | Quarterly | Material correction to a taught concept |
| Shared contracts | At every contract change | Breaking field semantics, privacy or compatibility issue |

Independence means owners can accept, reject or defer normal updates, deploy separately and retain their local work. It does not mean knowingly presenting withdrawn evidence as current.

**Proposed freshness policy:** consumer owners set a maximum status-check interval before live integration. A starting value is 30 days for general market-learning references; active account decisions require a current relevance review at use. These are proposed limits, not existing enforced timers. Historical material may remain valid as history after its review date, with the period visible.

| Upstream condition | Required future consumer behavior |
| --- | --- |
| New non-breaking revision | Queue local review; keep the last accepted revision visibly dated within its allowed freshness window |
| Temporarily unavailable | Retain last accepted public evidence if still valid; show retrieval/status-check age |
| Freshness window exceeded | Mark stale; block new current-evidence promotions until reviewed; retain historical work |
| Disputed interpretation | Expose disagreement and uncertainty; require local review before consequential reuse |
| Retracted, private or rights-restricted | Block new reuse; identify affected outputs; retain permitted audit metadata; follow retention policy for restricted payloads |
| Unsupported schema version | Reject/quarantine update without corrupting the accepted local state |
| No relevant change | Record no-change and the reason; do not manufacture work |

A correction may invalidate a research-backed premise without rewriting a customer's attributed statement or recalculating a financial scenario silently. Flag the affected assumption for its owner's decision. If source rights prohibit continued storage, pinning is not permission to retain the payload.

## Checks before any connection becomes live

These are acceptance requirements for future implementation, not tests claimed to pass today.

| Check | Positive case | Negative case / expected result |
| --- | --- | --- |
| Provenance and meaning | Source and interpretation stay distinguishable | Survey intent supplied as approved budget: reject promotion |
| Publication permissions | Public, reviewed, cleared evidence | Private/unreviewed/restricted package: deny export/import |
| Referential integrity | Existing persona/category IDs resolve | Unknown ID: unresolved state, no invented mapping |
| Consumer applicability | Named purpose and local acceptance | Producer approval alone: remains pending locally |
| Version compatibility | Supported pinned revision imports | Unsupported major version: quarantine |
| Replay safety | Same revision delivered twice | One logical local projection; no duplicate account/opportunity |
| Correction propagation | Retraction reaches consumer review | Unreachable consumer exceeds freshness window: new reuse blocked |
| Local independence | Producer unavailable; consumer retains permitted accepted context | Update must not overwrite local notes or deploy other repos |
| Financial boundary | Owner explicitly changes a scenario input | Research update cannot change ACV, win rate, bookings or forecast |
| Cross-project privacy | Public references flow into private context | Private context or identifiers cannot flow into public catalog/logs |
| Rights and correction | Permitted summary with link | Disallowed excerpt or withdrawn permission: block/remove as required |
| Rollback | Restore prior still-valid accepted mapping | Rollback must not reactivate retracted evidence |

Use the existing [shared contract registry](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/contracts/README.md) for schema and fixture gates. Producer and consumer tests belong in their owning repositories. Shared compatibility CI complements each app's tests; it does not substitute for them.

## Delivery sequence and review checkpoints

1. **This PR: public documentation.** Agree on workflows, ownership and candidate mappings; verify links and publication boundaries. No consumer adoption claimed.
2. **Market Map pilot.** Review three initiatives and reuse existing IDs. Implement a local mapping only after the catalog/schema choice is reviewed; test unresolved references and evidence labels.
3. **One consumer pilot.** Choose Account Signal Engine discovery preparation. Start with public/synthetic fixtures and pinned references. Demonstrate local accept/reject, stale-source behavior, duplicate delivery and retraction handling in its own PR.
4. **Second consumer only after proof.** Add educational reuse or an explicit GTM scenario reference through a separate owner-reviewed PR. Preserve financial assumptions and private boundaries.
5. **Live handoff only after readiness.** Verify authentication, source rights, bounded retrieval, compatibility, invalidation, observability and rollback. Use the existing collection owner; no second scraper or shared database.

No application must release simultaneously with another. A breaking contract requires an explicit migration plan; a research correction requires an impact review. Both should be visible, attributable and reversible where permitted.

## Acceptance and handoff

- Workflow and ownership design: documented here; maintainer review pending.
- Seed connections: eight candidate mappings to existing editorial topics; no typed-catalog publication.
- Automated runtime checks above: proposed, not implemented by this document.
- Consumer adoption: not started by this PR; owning-repo review required.
- Operational integration: not enabled; no new secrets, paid retrieval or cross-repo writes.
- Correction path: reviewed document changes now; implementation must include invalidation and rollback evidence before activation.

## Delivery reconciliation: existing work first

Checkpoint: 2026-11-06. This section is a proposed handoff within the existing design, not a new operating model or audited portfolio-wide implementation. Review existing issue and repository state again before execution.

| Work | Existing owner / tracking | Disposition and next gate |
| --- | --- | --- |
| Budget research and evidence | Market Map; [KRU-211](https://linear.app/krusty/issue/KRU-211), PR #138 | Review the [dated budget enrichment](../market-research/cio-ciso-budget-review-2026-11-06.md). Keep source conflicts and prior vintages; no automatic CSV or typed-claim promotion. |
| Intake templates | Market Map; [KRU-218](https://linear.app/krusty/issue/KRU-218) | Review [three intake records](research-intake-pilot.md); distinguish source review from authoring completeness. |
| Schema alignment | [KRU-212](https://linear.app/krusty/issue/KRU-212) | Reconcile PRs #137/#138 before adding production entities or consumer contracts. |
| Shared acceptance practice | Technical Docs; [KRU-195](https://linear.app/krusty/issue/KRU-195) | Extend existing standards only for demonstrated gaps. Keep existing adoption matrix authoritative. |
| Portfolio lifecycle and views | Ops Board; [KRU-122](https://linear.app/krusty/issue/KRU-122), [KRU-123](https://linear.app/krusty/issue/KRU-123) | Reuse the existing lifecycle; proposed enhancements remain backlog and need scope/estimate reconciliation. |
| Ops Board live acceptance | [KRU-125](https://linear.app/krusty/issue/KRU-125) | Preserve the current owner walkthrough gate and one active board implementation stream before adding portfolio features. |

### Candidate consumers, not new delivery commitments

- GTM Revenue OS financial planning: use reviewed public evidence to formulate funding questions. Actual costs, assumptions and forecasts stay local; no budget percentage is prefilled from a market survey.
- GTM Revenue OS commercial operations: reference the decision briefs in discovery. Public priority does not establish account intent or qualification.
- Account Signal Engine: retain Research Hub collection ownership. A public interpretation used in an account workflow requires its own corroboration and relevance review.
- Learning and field enablement: use reviewed generic explanations and exercises; validate product-specific claims separately. Do not copy private company operating details into this public repository.

### Smallest next slice

1. Review proposed enrichment for B03/B04/B12/B13 in the dated budget review. Resolve or explicitly exclude disputed FinOps/Flexera figures.
2. Record one publisher decision and one consumer disposition using existing review templates. No new connector or live data store is needed.
3. Under KRU-212, reconcile the existing source/category/use-case model before implementing any additional fields.
4. Keep broader Ops Board UI work queued until its existing acceptance gate and scope review are satisfied.

### Bidirectional completion check

Before calling a delivery checkpoint complete, the owning Linear issue must link the artifact or PR, and the artifact or PR must link the issue. Record exact revision, acceptance evidence, unresolved work, next action and review owner. A missing counterpart is an explicit gap, not an implied sync. Reference-only notes and uncommitted ideas may legitimately have no implementation ticket.

Documented, reviewed, tested, merged, deployed and beneficial are separate claims. This checkpoint establishes documentation and links only. Human review and consumer adoption remain pending. No status changes, new project, new issue, integration activation or release are authorized by this map.
