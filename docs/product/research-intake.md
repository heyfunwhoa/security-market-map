# Research intake and template index

Status: documented authoring workflow; human review pending. Owner: Security Market Map maintainer.
Version: 0.1. Updated: 2026-11-06. Next review: 2026-12-04.
This guide routes research through existing templates. It adds no automated enforcement, runtime schema, UI or cross-repository writes.

## Choose the record before the template

Start with the buyer problem and broad context, then choose the smallest change that answers it. Search existing catalog IDs, aliases, source records, issues and open PRs before adding anything. Enrichment and corrections preserve stable IDs.

| Addition | Use this foundation | Required distinction |
| --- | --- | --- |
| Market, domain or segment lens | [Market/domain template](market-domain-template.md) | A market groups demand and alternatives; a domain groups technical work; a segment identifies a buyer population. These are not automatically new catalog types. |
| Category or category enrichment | [Category explanation contract, proposed in PR #137](https://github.com/heyfunwhoa/security-market-map/blob/abe0380789afda0f500448fd55a3c999984d5c7d/docs/product/category-explanation-system.md) | Taxonomy review is separate from product onboarding. Explain job, workflow, boundaries, dependencies, ownership, economics and evaluation before vendors. |
| Vendor or vendor lifecycle change | [Product onboarding intake](product-research-page-template-v1.md) and [review record](../market-research/review-template.md) | Company, product, parent and historical brand are distinct. Vendor-only research need not invent a product record. |
| New product or product enrichment | [Product Research Page Template v1](product-research-page-template-v1.md) | Reuse the vendor; qualify edition/version, deployment, capabilities, limitations and evidence. |
| Executive priority or buyer decision | [Decision-brief template](decision-briefs/template.md) | A public priority is not an approved customer project, budget or buying signal. |
| Source, claim, relationship or correction | [Research review record](../market-research/review-template.md) and [playbook](../market-research/competitive-intelligence-playbook.md) | Attribute each scoped assertion; preserve Unknown, contradictions, source rights and dates. |
| Technical detector evidence | [Product-to-Atlas handoff](product-research-page-template-v1.md#research-to-atlas-evidence-handoff) | Rule-level implementations belong in Detector Coverage Atlas; category membership does not establish coverage. |

The product template has implemented baseline examples, not automatic adoption for every page. The category contract remains an independently reviewed proposal. Decision briefs and this router are editorial documents. A linked template does not mean its schema or UI is shipped.

## One intake, independent reviews

1. **Identify:** record the buyer question, addition type, public/private classification, existing IDs and duplicate-search result.
2. **Route:** complete the relevant template and a research review record. Use multiple templates only when distinct records genuinely change.
3. **Connect:** reference existing records and document a scoped relationship using the fields below.
4. **Review locally:** review sources, meaning, taxonomy, rights and Unknowns. Run the checks required by [Contributing research](../../CONTRIBUTING.md). UI changes additionally require browser evidence.
5. **Offer downstream:** give each affected consumer a pinned reference and proposed action. Record update, no change, defer or blocked with owner and reason.
6. **Maintain:** schedule the next local review; retain superseded evidence and correction history. Follow the separate researched, reviewed, checks-passed, merged and published stages.

Do not create new production IDs or a parallel source registry through these documents. Propose schema changes separately against existing catalog contracts.

## Connection record

Copy this table into the topic brief or review record when a connection needs explanation. It is editorial metadata, not a new database.

| Field | Fill in |
| --- | --- |
| From and to | Existing IDs or document paths; proposed records explicitly labeled |
| Relationship and rationale | For example, category supports a portion of a decision; product belongs to category; product complements another in a stated scenario |
| Scope and exclusions | Buyer segment, environment, product version and what is not established |
| Evidence | Existing source/claim IDs and exact supporting statement; inference explicitly labeled |
| Revision | Source document commit or version, plus observed/reviewed dates |
| Status | Proposed, reviewed, needs review, superseded or rejected; reviewer and decision |
| Maintenance | Owner, next review, change triggers |
| Consumer disposition | Consumer, update/no change/defer/blocked, rationale and local issue/PR |
| Correction | Superseded connection, affected consumers and recovery action |

Category membership never proves a product feature. A feature never proves a business outcome. A priority never proves available budget. Analyst terminology is not a control standard or regulatory obligation.

## Independence and correction

Each record and each connection has its own review status. A vendor refresh does not require rewriting a domain explanation unless its meaning changes. A stale source triggers review of dependent claims and connections, not unrelated records.

Consumers pin accepted revisions and retain their own notes, release cadence and acceptance criteria. A material correction marks affected references as needing review; consumers decide whether to withdraw, replace or defer their local use and record that choice. There is no automatic synchronization in this change.

Collection ownership remains governed by the [Research Evidence Boundary ADR](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/architecture/ADR-001-research-evidence-boundary.md): ASE Research Hub produces approved evidence packages; Market Map consumes them. Referencing a public Market Map interpretation in private account discovery does not reverse that collection contract or authorize database writes.

## Worked routing examples

| Request | Route and checks | Optional connection |
| --- | --- | --- |
| Add an email-security vendor | Search vendor/parent/aliases; use product intake if a distinct offering is documented; qualify claims with official sources | Category to a decision about email fraud, with outcome unproven until evaluated |
| Add a new AI security category | Check aliases and overlap first; use category contract; request taxonomy review | Secure AI adoption brief, explaining only the portion addressed |
| Map MSSP/MDR demand | Use market template as a segment/service lens; reference existing technical domains and categories | Operating capacity and service economics as hypotheses requiring buyer evidence |
| Record CIO consolidation interest | Use decision template and dated source notes; separate intent, forecast and actual spend | Relevant categories are examples, not interchangeable tools |
| Correct a product capability | Update scoped claim evidence and review record; identify affected connections | Consumers independently re-review accepted revisions |

## Acceptance and next implementation boundary

- Every addition can be routed without inventing a duplicate record.
- Market, domain, segment, category, vendor, product and decision remain distinguishable.
- Existing templates remain canonical for their respective work.
- Relationships have a rationale, evidence limits and maintenance owner.
- Review states and downstream acceptance remain independent.
- No document status is described as automated validation.

Before implementing a form or schema, manually exercise one product enrichment, one category proposal and one market lens. Record ambiguous fields and review outcomes. Reconcile PR #137 and the decision pilot before introducing typed fields or consumer adapters.

## Pilot and delivery tracking

See the [three completed editorial intake records](research-intake-pilot.md), tracked in [KRU-218](https://linear.app/krusty/issue/KRU-218) under [KRU-211](https://linear.app/krusty/issue/KRU-211). They reuse existing research and document gaps; current external-source review and independent reader validation remain pending. Linear owns status and dependencies; this repository owns templates and evidence.
