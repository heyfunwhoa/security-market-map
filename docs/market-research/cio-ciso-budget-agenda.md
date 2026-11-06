# CIO and CISO budgets: executive agenda and learning guide

As of **2026-11-06**. Status: researched editorial candidate; human review pending. Owner: Security Market Map maintainer. Next review: 2026-12-04. Scope: broad enterprise technology and cybersecurity, with global/US sources as individually identified; not a universal benchmark for SMBs, public agencies or a particular industry.

Start with the business decision, then the project, then the budget, then the product. A popular category is not proof that a buyer has approved money for it.

## 1. Think like the executive

The following is an educational decision model, not a claim that every company has this reporting structure.

| Executive | Core decision | Useful evidence | Common partners |
| --- | --- | --- | --- |
| CIO | Where should technology improve growth, productivity, service and reliability? | Cost per business transaction, adoption, service availability, delivery time, realized benefits | CFO, COO, business-unit leaders, CTO, CDO, CISO |
| CISO | Which risks can the business accept, and which controls deserve investment? | Material business scenarios, control effectiveness, recovery tests, residual risk and obligations | CIO, legal, risk committee, audit, engineering, operations |
| CFO | Is the investment affordable and preferable to other uses of funds? | Cash timing, total ownership cost, sensitivity, commitments, accountable benefit owner | Budget owners, procurement, CEO |
| Board / risk committee | Is management taking appropriate risk to execute strategy? | Decisions required, material exposure, assurance, progress and exceptions | CEO, CFO, CISO, audit |

A CIO can own the IT budget without owning every technology purchase. A CISO can set security requirements without controlling the funds used to meet them. Titles alone do not establish signature authority. See the existing [security persona atlas](security-org-personas.md).

## 2. How the agenda evolved

These are overlapping eras, not dates when old priorities disappeared. The project examples are our interpretation of the cited historical evidence, not survey rankings.

| Era | Executive question | CIO project examples | CISO project examples | Evidence anchor |
| --- | --- | --- | --- | --- |
| 2014–2016: digital business | Can technology change how we compete? | Digital customer channels, analytics, cloud foundations, modernization | Risk assessment and protection for expanding digital operations | Gartner's 2015 agenda emphasizes digital leadership and cloud/mobile/data; NIST CSF began in 2014 [S01, S02] |
| 2017–2019: scaling and governing | Can the operating model keep up with the digital footprint? | Platform integration, identity integration, operational standardization | Supply-chain risk, identity assurance, repeatable control assessment | NIST's 2018 framework evolution is a historical control anchor, not evidence of spending share [S02] |
| 2020–2021: continuity and distributed work | Can staff and customers operate through disruption? | Collaboration, remote access, digital service delivery | Endpoint protection, identity controls, resource-focused access | CIO's pandemic survey and NIST zero trust architecture [S03, S04] |
| 2022–2023: economic scrutiny | Which commitments must continue, and what can be deferred? | Portfolio prioritization, cloud optimization, vendor rationalization | Coverage and staffing trade-offs; renewed scrutiny of incremental purchases | IANS reports budget-growth deceleration; Forrester's 2023 planning abstract flags scrutiny [S05, S06] |
| 2024–2025: AI exploration and accountability | Which experiments deserve production funding? | AI pilots, data readiness, integration, workforce adoption | AI governance, data access, control evidence and supplier review | Forrester's 2024 planning release, NIST CSF 2.0, IANS 2025 [S07, S08, S09] |
| Late 2026 / 2027 planning: scaling with economics | Can we deliver value without uncontrolled cost or risk? | AI unit economics, data foundations, operating-model redesign | Secure AI use, governance ownership, affordable operational coverage | Gartner, Forrester, IANS and Flexera [S10–S14] |

The recurring tensions are growth versus cost, speed versus reliability, and innovation versus risk. New technology changes the projects through which those tensions are managed.

## 3. What the numbers actually say

| Observation | Period / population | Interpretation limit | Source |
| --- | --- | --- | --- |
| Average security budget growth: 17% in the preceding cycle; 6% in 2022–2023 | IANS 2023 study, 550 security executives | Survey-reported growth; not a fixed panel or universal growth rate | S05 |
| Average security growth: 8% for 2024; 4% for 2025 | IANS 2025 retrospective; 587 CISOs in 2025 study | Cohort composition and definitions require checking before a time-series calculation | S09 |
| Average security growth 5%, median 0%; 55% flat or down | IANS 2026 public summary | Mean conceals unequal outcomes; full sample details not established from this page | S10 |
| 38% fund AI security outside the security budget | IANS 2026 summary | Explore IT, data and innovation ownership; do not assume any particular account does this | S10 |
| CIO IT budgets projected to grow 3.7% in 2027; agentic-AI funding 31.8% | Gartner 2027 CIO survey public article | Plans, not realized spending; categories may have very different starting sizes | S11 |
| Worldwide IT forecast: $6.391T in 2026; $7.352T in 2027, +15% | Gartner October 2026 market forecast | Includes infrastructure-market dynamics; not the growth rate of an ordinary CIO's budget | S12 |
| 82% of technology decision-makers expect budget increases | Forrester 2027 planning survey; broader survey exceeds 2,600 across functions | Respondent share, not an 82% increase; expectation, not approval | S13 |
| Managing cloud spend cited as a challenge by 85% | Flexera 2026 survey release | Vendor-published respondent perceptions; not audited waste or every enterprise's experience | S14 |

Do not average these numbers together. Track metric, denominator, respondent population, fieldwork dates, geography, forecast vintage and currency separately. Inflation, FX, price increases, usage growth and a changing survey sample can all affect comparisons.

**An unresolved example:** Cybersecurity Dive's 2024 coverage reports security at 13.2% of IT spend; IANS's 2025 page retrospectively gives 11.9% for 2024 [S15, S09]. Preserve both with their source vintage. The public material inspected does not establish why they differ. Do not publish a seamless ratio trend or silently choose one.

Gartner and Forrester are research/advisory firms, not universal standards bodies. Their taxonomies, forecasts and predictions serve different purposes. NIST CSF 2.0 organizes risk outcomes and includes governance; it does not prescribe a shopping list or a security-budget percentage [S08].

### Current priorities beyond the AI headline

PwC's 2026 planning survey ranked AI (36%), cloud security (34%), network security (28%) and data protection (26%) among budget priorities [S17]. These are respondent selections, not shares of total spending. Its newer 2027 release says 84% of security and finance leaders expect budget increases and 58% of security leaders prioritize AI [S18]. These prospective, mixed-role findings do not invalidate IANS's tighter reported 2026 CISO budgets.

WEF's 2026 outlook also emphasizes geopolitical fragmentation, sovereignty and uneven cyber capacity [S19]. Our planning implication: retain supplier concentration, continuity and delivery capability on the agenda even when AI dominates headlines. A threat ranking alone does not establish a funded project.

| Business model | Executive lens to investigate | Example project hypothesis |
| --- | --- | --- |
| Financial services | Trust, service continuity and assurance | Resilience testing and third-party dependency review |
| Healthcare | Care delivery and sensitive information | Recovery readiness and access controls |
| Manufacturing / energy | Safe, reliable physical operations | Asset visibility and carefully staged segmentation |
| SaaS / technology | Product delivery and customer trust | Application security and evidence workflows |
| Retail | Transaction availability, fraud and margins | Identity controls and peak-period recovery readiness |
| Public sector | Mission delivery and procurement constraints | Legacy modernization with phased control improvement |

These are discovery lenses, not industry spending rankings or legal requirements. Validate geography, company size, ownership, maturity and fiscal calendar before comparing peers.

## 4. Translate today's themes into projects and funding

This is an analyst-informed planning map, not measured category spending growth. Funding owners and metrics are hypotheses to validate in each organization. Evidence anchors support the broad drivers; the specific project designs below are our synthesis.

| Business concern | Fundable project | Possible budget home | Existing map placement | Evidence to justify expansion |
| --- | --- | --- | --- | --- |
| AI must improve a business process | Bounded workflow rollout with adoption and evaluation | CIO, business unit, innovation | `ai`; broader productivity sits outside this security catalog | Quality-adjusted cost per completed task; adoption; exception rate |
| Sensitive data enters AI workflows | Data inventory, access cleanup, approved AI usage | CDO/data, IT, CISO | `data`, `ai`, `identity` | Sensitive workflows with controls; access exceptions resolved |
| Agents and workloads receive privileges | Identity ownership, least privilege, credential lifecycle | IAM, platform, AI program | `identity`, `platform`, `ai` | Owned identities; privilege reduction; revocation tests |
| Cloud and AI usage bills are unpredictable | Allocation, budgets, usage controls, architecture changes | Infrastructure, FinOps, application owners | `cloud`; FinOps is adjacent, not a new security category | Unit cost at constant service quality; forecast error; realized cash savings |
| Threat-response workload outgrows staffing | Triage redesign, detection tuning, selective automation or MDR evaluation | CISO / SecOps | `secops`, `siem`, `soar`, `detection-engineering`, `security-data-pipelines` | Backlog age; coverage; validated response time; workload per analyst |
| Business services cannot tolerate outages | Recovery testing, incident exercises, dependency remediation | IT operations, business continuity, CISO | `corporate`, `secops`, `grc` | Tested restoration against business-defined recovery requirements |
| Software delivery exposes critical services | Remediation workflow and development controls | Engineering, AppSec, product security | `appsec`, `product`, `aspm`, `sast`, `sca` | High-risk exposure duration; remediation completion; delivery impact |
| Assurance consumes scarce staff time | Control evidence and supplier-review workflow | GRC, legal, procurement, CISO | `grc`, `grc-controls`, `customer-trust` | Evidence freshness, exception closure, review cycle time |
| Tools overlap or are underused | Renewal and coverage rationalization | CIO/CISO with procurement | Cross-domain; existing `/budget` worksheet | Retired spend after migration; coverage retained; exit obligations |

Broad drivers: S10–S14 and S17–S19; governance anchor S08. Identity, resilience, AppSec and SOC examples are durable planning priorities, not a claim that this research proves they are the fastest-growing 2026 categories.

A useful distinction: **AI for security** improves a security workflow. **Security for AI** governs AI applications, data and access. **AI embedded in a renewal** can simply be a vendor price/package change. Record these separately.

## 5. How a topic becomes a budget line

Illustrative workflow:

1. A business trigger appears: a new service, unacceptable downtime, a customer requirement, a renewal, an audit finding or a capacity constraint.
2. A sponsor defines the outcome and the cost or risk of doing nothing.
3. The team tests alternatives: improve current tools, buy, build, outsource or defer.
4. Finance and the accountable owner identify a funding route and implementation capacity.
5. A bounded evaluation tests the hardest assumptions, including adoption and ongoing operations.
6. Approval allocates funding, ownership and success criteria. Procurement and deployment remain separate stages.
7. The owner measures benefits and decides whether to renew, expand, correct or stop.

| Funding route | What changes | What to verify |
| --- | --- | --- |
| Existing operating allocation | A team funds work inside its approved envelope | Available funds, delegated authority, competing commitments |
| Replacement / consolidation | New purchase displaces existing spend | Renewal dates, actual retirement, overlap period, migration labor |
| Transformation program | Security is a workstream within a larger business project | Sponsor, work-package funding, recurring operations after project end |
| Incremental annual request | Next plan includes additional funds | Planning window, executive priority, hiring and implementation capacity |
| Exception / contingency | An urgent decision changes the current plan | Authority, urgency, offsets and future recurring commitments |
| Shared funding | Several functions fund common capabilities | One accountable outcome owner, allocation rule and no double counting |

A category such as DSPM may appear in a business case long before finance creates a separate line called DSPM. It may remain inside data protection, cloud or an AI program. A separate line becomes useful when spend is material, recurring, accountable and needs its own forecast or controls. This is a planning heuristic, not an accounting requirement.

Use two budget views at once:

- **Purpose:** run existing services, improve them, or create a new capability.
- **Cost:** people, subscriptions, infrastructure/usage, external services, implementation/training and contingency.

Also distinguish approved budget, committed contracts, actual spend and forecast-to-complete. Headcount approval is separate from software approval. Accounting treatment is determined with finance; do not infer CapEx/OpEx solely from the product's label.

### Worked example: service-desk AI rollout

Hypothetical teaching case, not a customer result. A CIO sponsors faster resolution of routine requests. The service-desk owner defines success; security and data owners define access and review requirements.

Pilot costs: $40k software + $15k usage + $20k integration + $10k training + $15k contingency = **$100k**. This excludes internal staff opportunity cost, which must be estimated separately. Production needs a fresh forecast rather than annualizing the pilot blindly.

Releasing 2,000 hours at a $60 loaded hourly cost produces **$120k of modeled capacity value**, not necessarily cash savings. Cash savings require an actual reduction in expense or avoided committed hiring. Finance should keep capacity, cost avoidance, revenue effects and cash savings in separate columns.

Security can be a funded work package for access controls and evaluations inside this transformation program. That does not prove that the CISO received new discretionary funds. Scale only after testing task quality, adoption, sensitive-data handling and unit economics under realistic volume.

## 6. Learn and review like a C-level operator

Use one 30-minute session each week, rotating through four lenses. A monthly evidence review updates the tracker; a quarterly review revisits the portfolio.

| Learning session | Exercise | Output |
| --- | --- | --- |
| 1: Business and money | Choose an industry; name its top operating constraint and funding owner | One-page outcome-to-budget map |
| 2: Historical context | Compare a source from 2020 or 2023 with the latest edition | What persisted, changed or only changed names |
| 3: Investment committee | Compare buy, improve incumbent, build, outsource and defer | Recommendation, total cost, evidence gaps and stop conditions |
| 4: Board communication | Explain one decision in plain business language | 90-second update: outcome, evidence, risk, decision needed |

Ask in every review:

- Which business priority is this tied to, and why now?
- Is the budget requested, approved, committed or already spent?
- What gets displaced if we fund it? What breaks if we defer it?
- Who owns the outcome, the cost center and the operating work?
- What is the full cost including migration, consumption and people?
- What evidence would make us stop? Who accepts the remaining risk?

For sales use, translate a market trend into a discovery hypothesis, never automatic account buying intent. For an MSSP, also test service gross margin, staff capacity and multi-customer delivery economics; an enterprise CISO budget benchmark is not an MSSP profit-and-loss benchmark.

## 7. Keep the intelligence current

Use [the seeded trend tracker](cio-ciso-budget-tracker.csv) and [source notes](cio-ciso-budget-sources.md). The CSV is an editorial worksheet, not a parallel application source registry or published catalog. Keep additions source-linked and human-reviewed before promotion.

Separate maturity from budget status: emerging topic → scoped project → requested funding → approved funding → committed purchase → deployed capability → measured outcome. The current tracker contains public market signals and planning hypotheses, not account-specific approved budgets.

Monthly: compare new publications with the last recorded edition; append dated changes and preserve superseded observations. Quarterly: ask which themes should increase, hold, reduce or remain experiments. Recheck annual surveys on publication, not on an assumed release date. Score confidence from access and method quality, not publisher prestige alone.

Source mix: Gartner and Forrester for agendas and forecasts; IANS/Artico for security-budget surveys; CIO/CSO and Cybersecurity Dive for practitioner context and challenges; Flexera/FinOps research for operational economics; NIST for risk language. Vendor research carries commercial incentives. Independent coverage that repeats the same survey is not a second independent sample.

## Review and integration record

- Placement: landscape → domain/buyer problem → project/budget decision → category → vendor evidence. Return to `/landscape` to broaden; use existing `/compare`, `/vendors/[slug]` and `/budget` only at the relevant depth.
- Reused identifiers: existing domain/category IDs in the table; existing `ciso` persona reference. No new vendor, source, capability or claim IDs; no UI change.
- Existing overlap checked: catalog budget descriptions, persona atlas, budget worksheet and open PR search for CIO budget. No matching dedicated budget research PR found at research time.
- Consumer disposition: Market Map research update; other repos may link after owner review. No private account, career or forecast stores changed.
- Rights: original short paraphrases and links only; no copied analyst graphics, paywalled reports or proprietary rankings. Full paid reports were not reviewed.
- Reviewer: pending. No merge, application publication or deployment implied. Correction: amend through a PR, preserve source vintage and mark superseded facts.
