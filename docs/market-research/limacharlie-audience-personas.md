# LimaCharlie audience and buyer personas — current-state research

As of: 2026-10-13 (America/Chicago). Owner: Security Market Map editorial maintainer.
Status: source-linked research candidate; human review pending. Not published typed catalog data.
Next manual review: 2026-11-13, or sooner after a material positioning/product change. No scheduled monitor is implied.

## How to read this

An audience is an organization type; a persona is a role in its buying or operating process. An ICP is a narrower, validated definition of which organizations reliably succeed. Public positioning alone does not establish a validated ICP.

**Observed positioning:** LimaCharlie's homepage leads with MSSPs/MDRs and also names enterprise, builders and AI SOC audiences.[^LC-A1] Its enterprise page includes security engineering use cases and practitioner testimonials.[^LC-A3] Its customer page names incident responders as users.[^LC-A6]

**Unknown:** actual segment revenue, win rate, retention, ideal employee/endpoint/tenant count, minimum budget, geographic priorities and typical economic buyer. None is inferred from website prominence or logos.

**Evidence labels:** vendor-reported = publisher's own positioning/capability claim; customer-quoted = testimony hosted by vendor; hypothesis = analyst interpretation to validate; unknown = missing evidence. All persona pains, buying roles, triggers, objections and success measures below are hypotheses, not discovered customer interviews. Role titles do not prove budget authority or champion status.

## Audience profiles

These are overlapping lanes, not mutually exclusive market-size buckets. MDR can be an MSSP service; incident response can be an additional offering; an AI SOC builder can also be a provider.

| ID / audience | What the organization does | Candidate first job / product entry (hypothesis) | Business case to test (hypothesis) | Evidence anchor |
| --- | --- | --- | --- | --- |
| LC-AUD-01 MSSP | Operates security tools and services across customer organizations | Automate a repetitive cross-tool queue with Grid; standardize tenant operations on the platform | More service capacity; lower fully loaded delivery cost per customer; faster onboarding | Explicit provider positioning and multi-tool automation claims [^LC-A1][^LC-A2] |
| LC-AUD-02 MDR provider | Delivers threat detection, investigation and response to customers | Build or extend detection/response workflows and customer-specific service logic | Investigation quality, service-level performance, delivery margin and differentiated offerings | Homepage names MDR; platform describes configurable building blocks [^LC-A1][^LC-A5] |
| LC-AUD-03 Enterprise SOC / internal security platform team | Protects its own business; engineering may build infrastructure for analysts | Configure detection and automate an investigation across retained tools | Coverage, operational reliability, analyst time and maintainability | Enterprise page describes API-first services and engineer control [^LC-A3] |
| LC-AUD-04 Security product / AI SOC builder | Ships a security product or service to other organizations | Embed security capabilities or build operators on existing infrastructure | Engineering effort, time to market, support burden and dependency risk | Homepage names builders and AI SOC; platform offers composable capabilities [^LC-A1][^LC-A5] |
| LC-AUD-05 Incident response firm | Investigates and contains incidents during client engagements | Obtain endpoint visibility and execute scoped response actions | Time to useful evidence, safe containment and engagement cost | Customer page names incident responders; enterprise page includes response testimony [^LC-A6][^LC-A3] |

Provider economics are about delivering a service the buyer sells. Enterprise economics are about operating its own defense. Product-builder economics include the cost and risk of a dependency embedded in its offering. Do not reuse one ROI model across all three.

## Product-entry distinction

- **Platform:** official positioning describes API-first security building blocks that can be adopted together or selectively.[^LC-A5]
- **Grid:** current documentation describes an AI field engineer that builds and supervises automation using LimaCharlie configuration.[^LC-A4]
- **Hypothesis:** platform-led evaluations may start with an engineer/CTO; a bounded Grid workflow may start with a SOC operations leader. Both still need technical, operational and purchasing validation.
- Do not label every customer-built AI workflow as Grid adoption. Check product, implementation and commercial scope separately.
- Product availability, integration depth, permissions and commercial terms for a specific evaluation remain to be verified. This document makes no pricing or production-efficacy claim.

## Persona profiles

Everything in these seven profiles is a **working hypothesis**, informed by the audience/product anchors above. Suggested metrics are evaluation measures, not claimed results or targets.

### LC-PER-01 — Provider founder / CEO / business leader

- **Audience:** LC-AUD-01/02; sometimes 04/05. **Potential role:** economic buyer; a small-provider founder may also be technical sponsor.
- **Job:** grow a sustainable security service while protecting customer trust.
- **Likely pain / trigger:** growth requires more staff; a new service launch; delivery margin pressure.
- **Message to test:** establish how the next customer can be served reliably and profitably.
- **Success measures:** fully loaded service gross margin, cost per customer, onboarding effort, capacity at a defined service level.
- **Objections:** unpredictable usage bills; implementation services cost; vendor dependency; customer ownership.
- **Proof needed:** workload-based cost model including labor, integration and AI costs; repeatable tenant onboarding; relevant reference.
- **Discovery:** “What limits profitable customer growth today, and who owns that constraint?”
- **Disconfirmation:** capacity is not a constraint, no funded service initiative, or required contract rights cannot be met.

### LC-PER-02 — CTO / Head of Engineering / Security Platform Architect

- **Audience:** all, especially providers and builders. **Potential role:** technical sponsor/evaluator; sometimes budget owner.
- **Job:** maintain reliable infrastructure and spend engineering time on differentiating capabilities.
- **Pain / trigger:** brittle integrations, custom platform maintenance, architectural limits, a build-versus-buy decision.
- **Message to test:** identify which infrastructure can be adopted while retaining required control.
- **Success measures:** integration effort, maintenance hours, reliability, deployment/change effort.
- **Objections:** API limitations, portability, dependency concentration, tenant isolation, debugging and operational ownership.
- **Proof needed:** representative API integration, access-boundary tests, export/exit path and support model.
- **Discovery:** “What must your team own, and what would you prefer to stop maintaining?”
- **Disconfirmation:** mandatory architecture or control requirements fail; internal ownership is strategically necessary.

### LC-PER-03 — Head of SOC / Director of Security Operations

- **Audience:** providers and enterprise. **Potential role:** operational champion or budget owner.
- **Job:** deliver consistent investigations and response with available staff.
- **Pain / trigger:** queue backlog, tool switching, service-level misses, staffing constraints.
- **Message to test:** improve one costly workflow and measure the remaining human work.
- **Success measures:** analyst minutes per case, queue age, escalation quality, response time with severity and baseline defined.
- **Objections:** missed threats, unsafe actions, extra tuning, disruption to analyst workflow.
- **Proof needed:** representative benign and malicious cases; human escalation; permission boundaries; complete audit evidence; rollback where supported.
- **Discovery:** “Which queue costs the most time, and what would an unacceptable automated decision look like?”
- **Disconfirmation:** no repeatable workflow, no baseline, or nobody owns exceptions and ongoing tuning.

### LC-PER-04 — Detection / Security Automation Engineer

- **Audience:** enterprise, providers and builders. **Potential role:** technical champion, evaluator and implementer.
- **Job:** create, test and maintain detections and automation appropriate to the environment.
- **Pain / trigger:** rigid rule logic, inaccessible context, manual deployment or integration maintenance.
- **Message to test:** demonstrate control over a real detection-to-response workflow.
- **Success measures:** rule deployment effort, test coverage, false-positive burden, maintenance effort.
- **Objections:** opaque generated logic, limited data access, debugging friction, tooling incompatibility.
- **Proof needed:** inspectable configuration, representative telemetry, versioned changes and negative test cases.
- **Discovery:** “Show a detection or workflow you cannot express cleanly in the current stack.”
- **Disconfirmation:** needed telemetry is absent or implementation capacity is unavailable.
- Public practitioner testimony supports the relevance of this job family, not its authority in every deal.[^LC-A3]

### LC-PER-05 — SOC Analyst / Incident Responder

- **Audience:** providers, enterprise and response firms. **Potential role:** user and influential evaluator.
- **Job:** determine what happened and take an appropriate, authorized next action.
- **Pain / trigger:** repeated context gathering, fragmented evidence and manual response steps.
- **Message to test:** make an investigation easier to complete and explain.
- **Success measures:** time to useful context, analyst handoffs, rework, escalation completeness.
- **Objections:** noisy output, unexplained conclusions, lost context, uncertain responsibility.
- **Proof needed:** case walkthrough, source evidence, approval/escalation path and action history.
- **Discovery:** “Walk through your last representative investigation, including every tool and handoff.”
- **Disconfirmation:** workflow adds work or makes evidence and responsibility harder to trace.

### LC-PER-06 — Enterprise CISO / VP of Security

- **Audience:** LC-AUD-03. **Potential role:** economic buyer or executive sponsor; authority must be confirmed.
- **Job:** improve defensible security outcomes within budget and governance constraints.
- **Pain / trigger:** operational gaps, modernization mandate, renewal or a need to govern AI-assisted operations.
- **Message to test:** tie a bounded operational change to an approved security objective.
- **Success measures:** coverage of agreed scenarios, accountable response, operational cost and auditability.
- **Objections:** existing commitments, migration risk, AI/data handling, unclear accountability.
- **Proof needed:** current-state architecture, governance review, quantified baseline and funded operating owner.
- **Discovery:** “Which security outcome warrants investment, and what evidence would make you comfortable approving it?”
- **Disconfirmation:** initiative lacks priority, sponsor, budget or governance fit.

### LC-PER-07 — Security Startup Founder / Product Engineering Leader

- **Audience:** LC-AUD-04. **Potential role:** economic and technical buyer, often combined early on.
- **Job:** ship a differentiated product without taking on unnecessary infrastructure work.
- **Pain / trigger:** launch deadlines, limited engineering capacity, new endpoint or AI capabilities.
- **Message to test:** separate product differentiation from infrastructure dependency.
- **Success measures:** milestone delivery, integration/support cost, unit economics at modeled scale.
- **Objections:** embedding/resale rights, support obligations, roadmap dependency, data/customer ownership.
- **Proof needed:** embedded prototype, contractual rights, failure/recovery plan and workload cost model.
- **Discovery:** “Which part of the product must be yours, and what dependency risk can you accept?”
- **Disconfirmation:** product rights, support requirements or differentiation cannot be preserved.

## Additional buying-committee roles to qualify

| Role (hypothesis) | Decision that may block purchase | Evidence to request |
| --- | --- | --- |
| Finance / procurement | Budget, commitment, usage variability and vendor onboarding | Defined workload estimate, approval owner, purchasing milestones |
| Legal / privacy / compliance | Data processing, subprocessors, residency and contractual liability | Current terms and applicable assessment; no assumed certification or legal conclusion |
| IT / infrastructure / identity owner | Deployment permission, integration access and operational changes | Deployment scope, least-privilege permissions and change ownership |
| Service delivery / customer success | Customer onboarding, ongoing support and handoff | Named operating owner, runbook, escalation process and support workload |

## Fit and qualification worksheet

A promising account is a hypothesis until discovery confirms:
1. Segment and first use case; current tools and retained commitments.
2. A measurable problem and a reason to act now.
3. An implementation owner and ongoing operator.
4. Required telemetry, integrations, actions and permission boundaries.
5. Economic buyer, funding path and decision criteria.
6. A baseline, agreed evaluation measures and failure conditions.
7. Commercial/data terms and a realistic support/maintenance plan.

Do not invent company-size cutoffs or lead scores. “Interested in AI” alone is not qualification. A person expressing enthusiasm is not necessarily a champion; validate influence and willingness to drive change.

## Claims, uncertainty and refresh

| Claim ID | Statement | Status / source | Limit |
| --- | --- | --- | --- |
| LC-A-C01 | Homepage leads with MSSP/MDR positioning and lists additional audiences | Vendor-reported; LC-A1 | Not revenue mix or validated priority |
| LC-A-C02 | MSSP page promotes cross-tool workflow automation | Vendor-reported; LC-A2 | Not measured capacity or efficacy |
| LC-A-C03 | Enterprise page addresses engineering-led security operations | Vendor-reported/customer-quoted; LC-A3 | Not proof of a typical buying committee |
| LC-A-C04 | Grid documentation describes building/supervising platform automation | Vendor-reported; LC-A4 | Not proof that every AI deployment uses Grid |
| LC-A-C05 | Platform offers configurable security building blocks | Vendor-reported; LC-A5 | Specific fit requires technical validation |
| LC-A-C06 | Customer page includes incident responders among users | Vendor-reported; LC-A6 | Not segment size or revenue |
| LC-A-H01 | Role pains, authority, triggers and proposed measures in profiles | Hypothesis; LC-PER-01–07 | Validate in actual discovery |
| LC-A-U01 | Segment economics, true ICP thresholds and winning buyer motion | Unknown | Requires authorized deal/cohort evidence |

Review owner should compare current originals, preserve this date's interpretation in git history, mark changed/disputed claims, and identify affected persona IDs before changing consumers. Monthly review is a manual target. No immutable source capture, content hash, automated ingestion or independent validation was performed in this documentation pass.

## Cross-repository disposition

- **Security Market Map — update:** this public-safe research note plus navigation from the competitive landscape; no application catalog changes.
- **Private career preparation — update by explicit user request:** a separate consumer brief may reference this version and add questions; no private answers belong here.
- **GTM Revenue OS — defer:** role and segment hypotheses do not justify changing economic assumptions or actuals.
- **Account Signal Engine — no change:** persona fit is not an account-specific buying signal or enrichment record.
- **Technical Docs Platform — no change:** governs the workflow rather than storing vendor profiles.
- **Builder Academy / portfolio — no change:** no general lesson or public career disclosure requested.

Shared Research Intelligence Lifecycle reference could not be retrieved (404) on 2026-10-13. This pass follows the available local [Competitive Intelligence Playbook](competitive-intelligence-playbook.md); it does not claim compliance with unread shared instructions.

## Original sources

All observed 2026-10-13. Publication dates were not established for these living pages. Links and brief paraphrases only; no full-page reproduction. Sources are vendor-hosted, not independent testing.

[^LC-A1]: LimaCharlie, homepage: https://www.limacharlie.com/ — audience labels and current positioning.
[^LC-A2]: LimaCharlie, MSSP solution: https://limacharlie.io/solutions/mssp — provider workflow messaging.
[^LC-A3]: LimaCharlie, Enterprise Security Teams: https://limacharlie.io/enterprise-security-teams — enterprise use cases and practitioner testimony.
[^LC-A4]: LimaCharlie documentation, Grid — Your AI Field Engineer: https://docs.limacharlie.io/9-ai-sessions/grid/ — configuration and supervision model.
[^LC-A5]: LimaCharlie, platform: https://www.limacharlie.com/platform — API-first building blocks.
[^LC-A6]: LimaCharlie, Customer Love: https://www.limacharlie.com/customer-love — named customer audience types.
