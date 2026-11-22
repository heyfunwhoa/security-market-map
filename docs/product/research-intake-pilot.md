# Intake pilot: three completed editorial records

Status: documented candidate, human review pending. Date: 2026-11-06. Owner: Market Map maintainer.
Reviewer: unassigned. Next review: 2026-12-04.
Delivery: [KRU-218](https://linear.app/krusty/issue/KRU-218), child of [KRU-211](https://linear.app/krusty/issue/KRU-211). PR: [#138](https://github.com/heyfunwhoa/security-market-map/pull/138).

These are concrete editorial applications of the [intake guide](research-intake.md), using existing repository research at commit e87278ff31f72316889de93fed245f6a92e9626e. They do not refresh external sources, add typed claims or establish current product performance. Public-safe; no customer records or measured outcomes. Sources require current review before new affirmative publication.

## 1. Product enrichment: Aikido Device Protection

**Intake decision:** enrich vendor `aikido` / product `aikido-device-protection`; do not create another vendor or offering. Existing product and pilot were located in `lib/data/developer-endpoint.ts` and the [commercial product validation record](../verification/aikido-commercial-product-template-pilot.md). Use the [product template](product-research-page-template-v1.md). Related product work is already in the catalog; this record proposes evaluation guidance only.

**Buyer question:** What developer package-install paths can this control address, and what operational exceptions must AppSec and endpoint IT manage?

**Placement:** application/endpoint security context → `software-supply-chain` and `endpoint-control` → existing product → scoped evidence. Existing route: `/products/aikido-device-protection`; no navigation change.

**Enrichment draft:** Evaluate a supported package request through interception, policy decision, event reporting and exception handling. Verify registry support, private mirrors, OS, containers/WSL, offline behavior and local trust requirements. Distinguish an actual block from an alert or inventory observation. Do not force the secrets-scanning lifecycle onto this product.

**Evidence and Unknowns:** The existing October 31 pilot cites the official [technical explanation](https://help.aikido.dev/aikido-device-protection/miscellaneous-aikido-endpoint/how-does-endpoint-protection-work). This intake references that dated vendor-published baseline; it is not a new live-source check. Plan entitlement, current supported configurations, performance and commercial terms remain to verify. No source text reproduced.

**Connection proposal:** product → software-supply-chain category, limited to documented package protection scope. Product → [secure AI adoption decision](decision-briefs/secure-ai-adoption.md) is an editorial evaluation hypothesis when agents install dependencies. Neither establishes universal agent safety, prompt-leak prevention or EDR replacement. Maintenance owner: Market Map maintainer; status: proposed; review due December 4.

**Evaluation:** In an authorized future test, specify supported installation routes, expected block/allow outcomes, exception recovery and developer disruption. Baseline, target and result: Unknown. No software installed or evaluated here.

**Consumer disposition:** Market Map: defer typed enrichment pending source and editorial review. Detector Atlas: no change, no rule-level evidence collected. ASE/GTM OS: no account-specific signal or financial update.

## 2. Category proposal: enrich AI governance

**Intake decision:** the proposed topic already exists as `ai-governance` in `lib/data/ecosystem.ts`. Enrich its explanation rather than add a new category. Existing domains: `ai`, `grc`. Apply the [category explanation proposal](https://github.com/heyfunwhoa/security-market-map/blob/abe0380789afda0f500448fd55a3c999984d5c7d/docs/product/category-explanation-system.md), independently pending review in #137.

**Kind and job:** governance practice/program with supporting products. Explain who owns an AI system, which decisions govern its use and where review evidence is recorded.

**Illustrative workflow:** register system and intended use → identify accountable owner → review policy and evidence → approve, restrict or retire → record decision → periodically reassess. This is an authoring model, not a prescribed technical protocol.

**Scope and boundary:** inventory, ownership and decision records. Enforcement requires separately evidenced controls. An approval record does not prove a tool call was blocked or a prompt was inspected.

**Neighbors and dependencies:** `grc-controls`, `agent-identity`, `ai-application-security`. Requires system discovery, business owners, review criteria and a route for implementing decisions. CISO, risk, AI leadership and business ownership vary by organization.

**Economics:** investigate program staffing, inventory maintenance, workflow/tooling and control implementation. Funding owner is a hypothesis; no default budget amount or compliance conclusion.

**Connection proposal:** `ai-governance` supports the accountability portion of the [secure AI adoption brief](decision-briefs/secure-ai-adoption.md), not every safety or performance requirement. Evidence baseline: existing category definition and dated brief source notes, not independently corroborated by this exercise. Status proposed; owner Market Map maintainer; review due December 4.

**Evaluation and gaps:** Can a reader locate an owner, decision, rationale and enforcing control for one system? A negative case is an approved system with no implemented access restriction. Reader test not run. Attach exact framework/version and original evidence before new factual guidance is promoted. Do not infer a legal obligation from an analyst category.

**Consumer disposition:** Market Map: candidate explanation only. KRU-212: review field fit and practice/category distinction. KRU-214: possible reuse without replacing its three agreed outcome pilots. Private consumers: no change.

## 3. Market lens: MSSP/MDR service builders

**Identity:** cross-domain buyer segment and service-delivery lens; no new technical category or production ID. Existing [SecOps evidence slice](secops-mssp-competitive-evidence-slice.md) already covers this population. Reuse it, with a vendor-neutral framing.

**Question and scope:** How can a service provider increase reliable delivery capacity while preserving service quality and viable economics? Scope: organizations operating managed security services with technical delivery ownership. Excludes assuming every MSP builds an MDR platform or that every enterprise SOC has reseller economics. Geography and company-size boundaries: unspecified; no market-size estimate.

**Problems and desired outcomes:** repetitive onboarding, investigation backlog and fragmented infrastructure are hypotheses to validate. Desired outcomes: sustainable operating capacity, dependable service and predictable full cost. Possible owners: operations leader, service/product owner, SOC manager, platform engineering and finance. Actual buying authority is unknown.

**Structure:** `siem`, `security-data-pipelines` and `soar` describe different jobs that may participate in service delivery. MDR is a service model; these technical categories are not interchangeable. Preserve the landscape → category → product → evidence journey. No new UI proposed.

**Alternatives:** improve current stack, buy managed tooling, integrate specialist components, build selected infrastructure, outsource part of delivery or defer. Compare onboarding, engineering, licensing, telemetry, staffing, migration and ongoing maintenance. No assumed savings or margin.

**Historical evidence:** the existing slice contains dated vendor-published case studies. They are illustrative cases, not a representative trend series. No new chronological demand or budget conclusion is established here. Current market sizing, broad purchasing surveys and independent economics remain gaps.

**Connection proposal:** this segment lens can contextualize [technology consolidation](decision-briefs/technology-consolidation.md) and SOC capacity work in KRU-214. The rationale is service economics and operational constraints, not proof of budget or demand. Evidence quality, buyer applicability and observed outcomes stay separate. Status proposed; owner Market Map maintainer; review due December 4.

**Evaluation:** define analyst minutes per qualifying case, queue age and escalation quality together; define onboarding duration and required engineering effort separately. Measurement population, baseline window, targets and results remain Unknown. No invented customer example or benchmark.

**Consumer disposition:** Market Map: retain as editorial lens. ASE: defer account application until relevant account evidence exists. GTM OS: defer economics until local assumptions and measurements exist. Do not export private service margins or customer records.

## Findings and acceptance checkpoint

| Criterion | Observation | Status |
| --- | --- | --- |
| Reuse identities | Product and AI governance category already exist; neither needs a new ID | Passed editorial inspection |
| Distinguish market from taxonomy | MSSP/MDR fits a segment/service lens spanning existing categories | Documented; human review pending |
| Separate relationship from claim | Each record names a bounded connection and unsupported inference | Documented |
| Independent maintenance | Owners, review date, Unknowns and consumer dispositions recorded per record | Documented, not automated |
| Current external evidence | Existing dated research reused, no source refresh performed | Not run; blocks new affirmative claims |
| Reader usability | No independent reader sessions performed | Not run |
| Runtime integrity/correction | No schema or consumer adapter changed | Not implemented here |

**Authoring lesson:** a successful intake often enriches an existing record or adds a lens instead of creating an entity. Product enrichment, category explanation and market demand evidence need different acceptance checks.

**Next gate:** human editorial/source review of these records; reconcile schema ownership under KRU-212 before typed implementation. These examples do not complete KRU-214's SOC capacity, secrets exposure and recovery readiness pilots. Corrections retain this dated version and flag affected links for each consumer's own disposition. No automatic sync, merge or publication.
