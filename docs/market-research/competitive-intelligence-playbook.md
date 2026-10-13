# Competitive Intelligence Playbook — Cybersecurity Markets

**Owner:** Security Market Map (public market knowledge) | **Status:** documented workflow, not automated software | **Created:** 2026-10-12

## Purpose

Give an enterprise AE, future Head of Sales, technical seller or job candidate a reusable way to understand cybersecurity competitors **by what buyers are trying to accomplish**. Map the market once with evidence; reuse the same verified public research in private interview preparation, GTM planning and future account research. Do not pretend a company is a direct head-to-head competitor merely because both use an analyst category or buzzword.

**First applied case:** [Agentic SecOps and MSSP/MDR competitive landscape](agentic-secops-competitive-landscape.md).

## 1. Choose the buyer's decision

Start with a specific decision in a specific environment:

- **Job to be done:** automate investigations, create an MDR offering, process telemetry, manage agents, or replace incumbent SIEM.
- **Buyer and budget:** SOC leader, MSSP CEO/operations, engineering/platform leader, security architect, finance/procurement.
- **Context:** existing stack, technical requirements, deployment/region, analyst availability, service-level commitments, purchasing timing.
- **Alternatives:** direct specialist, full platform, adjacent complementary tool, incumbent expansion, in-house build, defer/do nothing.
- **Decision criteria:** business outcome, time to value, integration, ownership, security/regulatory requirements, total cost and transition risk.

The answer should differ when the customer is an MDR building a service versus an enterprise SOC buying one.

## 2. Classify vendors correctly

Use explicit relationship values for each buyer decision:

| Relationship | Meaning | Required evidence |
| --- | --- | --- |
| Direct substitute | Customer could reasonably select one instead of the other to meet the same approved criteria | Buyer requirements + documented scope and ideally evaluated shortlist |
| Partial overlap | Some capabilities compete; other capabilities remain complementary | Official capability pages plus limitations/unknowns |
| Complementary | Both can be deployed together to accomplish different tasks | Architecture or supported integration evidence |
| Build-versus-buy | Customer could build the capability using tools, APIs and staffing | Necessary build components, realistic staffing and cost assumptions |
| Incumbent/no-decision | Customer chooses existing investment or status quo | Customer-side decision evidence, not automatically a vendor claim |

No sourced evidence means **candidate** or **unknown**, never an asserted direct competitor.

## 3. Evidence collection workflow

1. Register canonical **original** URLs: product docs, current pricing, case studies, release notes, APIs and partner pages, with publisher and as-of dates.
2. Preserve the strongest claim granularity: `vendor | product | capability | buyer scenario | claimed proof | caveat | source_id | captured_at | verified_at | evidence_status`.
3. Separate **vendor-reported**, **customer-quoted on vendor site**, **independent reporting**, **tested/internal authorized** and **unknown**.
4. Review competing claims: different product tiers, deployment models, missing feature documentation, pricing differences, older releases and source contradictions.
5. Publish reviewed source-linked statements into **Security Market Map's** existing `lib/data` typed catalog only through its current manual review/testing workflow. A Markdown brief is research, **not** published application truth.
6. Flag changes and sources for later re-review. Do not create a new scraper; use established research-source contracts when live adapters exist.

## 4. Comparison dimensions

Check only dimensions relevant to the actual buyer:

| Lens | Questions to answer |
| --- | --- |
| Product scope | Data collection? Native sensors? Detection? Investigation? Workflow execution? Response? Multi-tenant? |
| AI trust and controls | Agent autonomy; tool permissions; human approval; audit, rollback and explainability; prompt/instruction handling |
| Architecture | API-first and self-managed vs packaged; integration depth; deployment; latency; tenant data isolation; source and data portability |
| Operational experience | Onboard tenant; handle noisy data; tune detections; build workflows; support exceptions; run incident reviews |
| Commercial | Unit pricing; minimums; usage variability; AI provider cost; professional services; resale rights; gross margin; commitment duration |
| Outcomes | Time to first value, analyst-hours saved, MTTR/MTTD when measured, service expansion, support burden |
| Strategy | ICP, route to market, partner conflict, cross-sell, incumbent displacement, build/buy differentiation |

Use `Unknown` where evidence is missing; no fabricated check marks, vendor rankings, scores, ROI figures or head-to-head superiority.

## 5. Repeatable research outputs

**Category map:** who exists, what their overlapping layers are, and why comparisons depend on buying motion.

**Buyer decision worksheet:** an explicit scenario, four plausible alternatives including doing nothing, requirements, deal risks, economic metrics and missing validation.

**Source-linked battlecard:** vendor positioning *in their own words*, corroborated capabilities, segmentation, objections, realistic counterposition, integration/coexistence options, claims not yet tested, original links and review date.

**Case-study evidence review:** problem, implementation setting, claimed before/after metric, what was measured, possible selection bias and what cannot be inferred about general customer outcomes.

**Change digest (future):** what changed since last reviewed snapshot, how reliable the source is, which buyer scenario is impacted, and whether a human should update a claim.

**Win/loss learning (private only):** ask for customer permission before storing case-specific notes. Report evaluated alternatives and confirmed decision reason. Do not publish sensitive pipeline, margin, pricing concessions, transcripts or unapproved customer facts to the public market map.

## 6. Portable interview and GTM workflow

1. **Before interviewing:** select three buyer decisions and five closest *candidates*, not an indiscriminate top-10 vendor list.
2. **Generate questions:** each question states a claim or uncertainty, the interviewer persona, the desired insight and the action if answered.
3. **After interview:** log attributed response and confidence **privately in Joy Index**, with timestamp and follow-up. An interview statement is confirmed as *said*, not confirmed as fact.
4. **For GTM planning:** use only validated segment economics, win/loss and repeatable POC outcomes to build a revenue forecast or competitive campaign in GTM Revenue OS.
5. **For account intelligence:** an independent source update may become an account research candidate, but **not** automatically buying intent; Account Signal Engine must corroborate account-specific context.

## 7. Cross-repository ownership

- **Security Market Map:** published public market concepts, vendor categories, sourced competitive and capability claims; this document owns the reusable method.
- **Joy Index / Career Command Center:** private opportunity context, interviewer questions and answers, personal evaluations, practice state; public research consumed as **read-only reference**.
- **Account Signal Engine:** eventual permitted retrieval, versions and account/company signals under existing contracts, not a second public comparison database.
- **GTM Revenue OS:** deal economics and scenario assumptions, never silently promoted vendor claims or confidential interview assertions.
- **Technical Docs Platform:** governance for source provenance, privacy, agent workflow, shared data contracts and PR review. No duplicate standard here.

## What not to automate yet

No crawler, RAG embedding store, new third-party subscription, new canonical vendor table, scheduled monitor or cross-repo database credential is required for this playbook. Test a second category and a second consuming workflow before introducing reusable data services.

## Done means

- [ ] Buyer decision and alternative set make sense (including do-nothing).
- [ ] Every meaningful fact has original provenance, a date and an epistemic label.
- [ ] No feature checkbox or source statement is silently upgraded to measured truth.
- [ ] Competitor overlap and potential cooperation are both represented.
- [ ] Top 3 differentiation hypotheses have explicit falsification criteria.
- [ ] Interview/GTM action is separated from the shared public source claim.
- [ ] Monitoring owner and next editorial review are set.
