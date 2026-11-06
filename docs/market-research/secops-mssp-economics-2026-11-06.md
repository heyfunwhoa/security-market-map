# EDR, SecOps and MSSP economics: a buyer-led market map

**Observed / last checked:** 2026-11-06. **Status:** researched candidate, awaiting human editorial review; not published typed capability claims. **Owner:** Security Market Map maintainer. **Next review:** 2026-12-06, earlier for pricing or product changes. Public sources only. Vendor outcomes are vendor-reported, not independently tested.

This extends the [existing SecOps landscape](agentic-secops-competitive-landscape.md) and the [SACR crosswalk](sacr-category-crosswalk-2026-11-06.md). It asks: **what should a service provider buy, build or outsource to deliver secure, profitable services across many customers?**

**Reading order:** Sections 1–3 establish a vendor-agnostic foundation: concepts, delivery economics and evaluation. Sections 4–5 introduce buying approaches and individual vendor profiles. These are not formal competitor comparisons. Start with the [industry and category foundation](industry-category-foundation.md) for the wider market.

## 1. Understand the layers before comparing companies

| Term | Plain-language role | What the buyer still needs to establish |
| --- | --- | --- |
| EPP / NGAV | Prevent unwanted or malicious activity on endpoints | Which threats and operating systems are covered; prevention is not identical to investigation |
| EDR | Record endpoint activity, detect suspicious behavior, investigate and take endpoint response actions | Included detection content, tuning, response permissions, retention and who operates it |
| NDR / ITDR / CDR | Apply detection and response to network, identity or cloud activity | Data access, supported actions and coverage for each environment |
| SIEM | Collect and analyze security events across sources | Data quality, detection content, retention, query cost and operational ownership |
| XDR / Open XDR | Correlate signals and response across security controls | Native versus third-party coverage, integration depth and restrictions |
| SOAR / security automation | Coordinate repeatable actions across tools | Workflow maintenance, exception handling, permissions and auditability |
| AI SOC | Use AI in triage, investigation, decision support or response | Exact tasks, evaluation method, human oversight and verified outcomes |
| SecOps | The work of detecting, investigating and responding | People, processes and tools together; not one product category |
| SOC | The team/function performing security operations | Hours of coverage, escalation authority and responsibilities |
| MDR | A managed detection-and-response service | Contracted scope, provider responsibilities and customer responsibilities |
| MSSP | A business delivering managed security services to multiple organizations | Service portfolio, technical ownership and delivery model |

An MSSP can sell MDR. It can run its own SOC, use a co-managed model, or buy a vendor-operated service. It may combine EDR, SIEM, automation and infrastructure from several vendors. Therefore **MSSP belongs in buyer/operating-model filters, not beside EDR as if both were interchangeable products**.

These are editorial explanations. SACR's glossary [S2] supplies category reference points; actual product capabilities remain source-specific.

## 2. Model the provider's business, not just the license

Use one common workload: tenant count, endpoints, users, telemetry/day, retention, alerts, investigations and promised service hours. Compare the same service coverage and contractual responsibilities.

`Monthly delivery contribution = service revenue - vendor licenses - data/retention/query costs - AI usage - delivery labor - support/escalation - allocated onboarding cost`

`Contribution margin = monthly delivery contribution / service revenue`

This is a decision worksheet, not an accounting standard or an observed vendor margin. Finance must decide which delivery costs belong in cost of revenue. Keep sales/marketing and general overhead separate when calculating operating profit.

**Illustrative only:** $20,000 monthly service revenue minus $4,000 licenses, $6,000 labor, $1,000 data/AI and $1,000 onboarding/support leaves $8,000, or 40%. Saving $1,000 in licenses while adding $2,000 in labor reduces contribution to $7,000, or 35%. A cheaper license can produce a worse business.

| Economic mechanism | Customer benefit to test | Vendor expansion hypothesis, not verified contract terms |
| --- | --- | --- |
| Consolidation | Fewer contracts, integrations and consoles to maintain | More customers/modules standardized on the platform |
| Automation | Less repeated work at a fixed quality threshold | More workflow adoption or contracted usage |
| Managed service | Access to coverage and expertise without equivalent internal staffing | More protected units/services |
| Programmable infrastructure | Reuse service logic and onboard customers consistently | More protected workloads and platform consumption |
| Predictable pricing | Less variance between client fees and delivery costs | Aggregate customer volume and broader adoption |

Provider profit and vendor revenue can grow together if cost per delivered service falls while customer volume or paid service scope grows. That is a hypothesis to measure, not an automatic consequence of usage billing.

## 3. Evaluation that could actually change a decision

Run three representative tenant profiles: a small Microsoft-centric client, a heterogeneous mid-market client and a noisy cloud-heavy client. Use synthetic or authorized test data. Agree on required coverage before measuring speed.

1. Onboard each tenant and record elapsed time, engineering hours, permission setup and first useful detection.
2. Execute ten documented detection/investigation scenarios, including benign events and missing telemetry. Measure false positives, missed threats and evidence quality.
3. Exercise one approved containment action, denied permissions, a failed integration and escalation. Record auditability and safe recovery; not every response action is reversible.
4. Change a shared rule across tenants, preserve a client exception and test rollback of configuration.
5. Model base and high-volume months, including AI usage, query/storage and overage policies.
6. Record ongoing rule maintenance, analyst review, support and customer reporting hours.
7. Test service ownership: exports, configuration portability, offboarding, resale/branding rights and vendor access to customer data.

No vendor scores or observed competitive win rates exist in this brief.

## 4. Buying approaches and vendors to learn about

This is a discovery index of approaches and researched offerings. It does not establish substitution, superiority or an actual buyer shortlist.

| Buyer decision | Research set | Approach represented | What decides fit |
| --- | --- | --- | --- |
| Consolidate a provider's security stack | Todyl, Stellar Cyber, Sekoia | Partial platform overlap | Existing tool retention, bundled detection coverage, migration and operating effort |
| Automate investigations and service delivery | Torq, Conifers AI; existing research on Tines, D3 and Swimlane | Partial workflow overlap; possible coexistence | Tenant context, supported actions, exception workload and automation ownership |
| Buy a packaged service to attach to MSP contracts | Huntress; Blumira for packaged platform/support economics | Alternative operating model | Who supplies analyst coverage and response, customer handoffs, total staffing requirement |
| Extend an incumbent ecosystem | Microsoft Defender/Sentinel, CrowdStrike; SentinelOne as follow-up | Incumbent expansion or integration candidate | Existing entitlements, migrations, API limits, service-provider terms |
| Build differentiated security services | LimaCharlie; existing research on 7AI, Exaforce, Panther and Tenzir | Build-versus-buy and partial infrastructure overlap | Programmability, detection ownership, portability, engineering cost and commercial rights |
| Keep the existing stack / build internally | Current SIEM, EDR, scripts, open-source components | Status quo or self-build | Avoided migration versus ongoing maintenance and opportunity cost |

Do not compare a raw infrastructure rate with a fully managed MDR rate without pricing the missing detection maintenance, analyst coverage, response, support and implementation work.

## 5. Individual vendor profiles

### Todyl: stack consolidation

**Evidence [V1]:** Todyl's Exceed case study reports 53% lower costs and 50% fewer security products. The retrieved page displays the onboarding metric as `41$`, apparently a rendering/content error. Do not republish the previously circulated 41% figure as verified until the downloadable case study confirms it. These are one customer's vendor-published results, not expected savings for every MSP.

**Buyer scenario:** a provider wants to simplify a fragmented stack. **Comparison hypothesis:** consolidation may win against a more configurable approach when implementation staff are scarce. **Unknown:** partner rates, commitments, module scope and comparable cost baseline. **Evaluation question:** Does consolidation reduce total delivery effort while preserving required customization?

### Stellar Cyber: unified operations across customer environments

**Evidence [V2]:** its MSSP page presents multi-tier tenancy, Open XDR and bring-your-own-EDR positioning. This is a stronger platform comparison than treating it as merely an automation add-on.

**Buyer scenario:** centralize the SOC while retaining selected customer controls. **Comparison hypothesis:** packaged cross-tool operations can compete with infrastructure-led assembly. **Unknown:** quoted licensing, add-ons, isolation guarantees, delegated administration and customization depth. A single-license headline is not proof that every feature or usage level is included.

### Torq: cross-tool workflow and AI SOC automation

**Evidence [V3]:** Torq's RSM case study describes more than 75 monthly onboarding hours before adoption, a migration of over 200 customers in three weeks and 82% of managed SOC cases automated. It also describes workflows connecting SentinelOne, Stellar Cyber and Intezer.

**Implication:** multiple vendors in this map already coexist in a named deployment. Workflow automation and telemetry infrastructure can serve distinct roles. This source does not establish integrations beyond those it describes. **Unknown:** negotiated pricing, residual human work, maintenance cost and metric definitions. Do not turn case automation into an equivalent reduction in staffing or cost.

### Conifers AI: tenant-aware investigations on an existing stack

**Evidence [V4]:** CognitiveSOC's MSSP page describes nested tenancy, tenant-specific context and existing-tool/portal support; it advertises 3× throughput and 2–4-hour tenant onboarding.

**Buyer scenario:** an established provider wants more investigative capacity without replacing its stack. **Comparison hypothesis:** relevant to teams purchasing AI investigation capacity; broader infrastructure scope needs separate evidence. **Unknown:** pricing meter, production accuracy by alert type, response controls, supported integrations and cost of exceptions. Marketing accuracy figures require a defined denominator and independent testing.

### Blumira: predictable packaged economics

**Evidence [V5]:** its MSP page describes per-employee pricing aggregated across clients, volume discounts, no device charges or per-GB overages, maintained standard detection rules and 24/7 SecOps support. Specific rates require a conversation; bespoke integrations and specialized services can cost extra.

**Buyer scenario:** a provider wants a straightforward wholesale cost aligned with per-user client billing. **Comparison hypothesis:** predictability can matter more than the cheapest theoretical consumption rate. **Unknown:** contractual limits, supported ingestion scope, precise response responsibility and exceptional workloads. Support is not automatically a fully outsourced SOC or a response SLA.

### Huntress: managed security products with SOC coverage

**Evidence [V6]:** the pricing page ties products to endpoints, identities, data sources and learners, with SOC management included. Public examples at 100 units include $7.99 per endpoint/month for Managed EDR and $3.50 per source/month for Managed SIEM. These are published examples, **not a negotiated MSP wholesale quote**. The page separately notes that partners can own deployment, integration and ongoing management.

**Buyer scenario:** attach managed security without staffing every SOC function internally. **Comparison hypothesis:** a different ownership model can be the strongest commercial alternative even where technical architecture differs. **Unknown:** the provider's actual discount, minimum commitments, response handoffs and contract-specific scope.

### Sekoia: multi-tenant SOC operations

**Evidence [V7]:** its MSSP page describes shared rules/playbooks across isolated client environments, multi-tenant operation, prebuilt detection content and partner resources. This refresh resolves the older landscape's missing original-source review of its basic MSSP positioning; deeper capability parity is still unreviewed.

**Buyer scenario:** launch or scale managed detection with reusable operations. **Unknown:** contract pricing, deployment options, response authorization, detection coverage and implementation labor. Its claimed business-growth outcomes are not a revenue forecast.

### Microsoft and CrowdStrike: include incumbent expansion

**Evidence [V8]:** Microsoft describes partners building managed SOC and XDR offerings using Sentinel and Defender. **Evidence [V9]:** CrowdStrike documents a Flight Control API collection for multi-tenant environments.

**Implication:** APIs, partner programs and multi-tenancy should be studied across established ecosystems as well as newer offerings. Evaluate whether existing investment is sufficient, which changes require extra licenses, and whether customer environments are heterogeneous. Exact commercial comparison remains Unknown. SentinelOne remains a named follow-up candidate; this pass does not create new feature claims for it.

### LimaCharlie: infrastructure and service ownership

**Evidence [V10, V11]:** pricing describes a consumption-oriented platform with separately supplied AI-provider subscriptions; the MSSP walkthrough documents organization-based operation, reusable configuration and detection onboarding.

**Critical content distinction:** the walkthrough currently describes Sigma subscriptions, community rules and Soteria rulesets. A detection engine, available rulesets, default-enabled coverage, paid partner content and a vendor-operated detection program are different things. Do not state either “no rules exist” or “complete managed detection is included” from this evidence. Confirm exact entitlement, maintenance ownership, current deployment behavior and supported threat coverage.

**Identity boundary:** entity lookup/correlation and identity-log ingestion do not demonstrate a complete native ITDR product. Verify detections, posture analysis, identity response actions, permissions and supported providers before making that claim.

**Hypothesis:** LimaCharlie is attractive when service owners need adaptable infrastructure and can maintain differentiated services economically. **Disconfirm:** its extra implementation/support burden exceeds the licensing savings or the provider has no need to own the customization.

## 6. Prioritized next research

| Priority | Research question | Candidates | Completion evidence | Estimated effort |
| --- | --- | --- | --- | --- |
| 1 | Which provider operating model fits? | Six requested vendors plus Sekoia/LimaCharlie | Comparable scope and responsibility matrix | 1–2 human review days with AI-assisted document extraction |
| 1 | What is the actual all-in price? | Same set | Written partner quotes and workload model | 2–4 analyst hours after quotes; vendor response time unknown |
| 2 | How strong is incumbent expansion? | Microsoft, CrowdStrike, SentinelOne, Palo Alto Networks, Sophos | Current product/partner evidence and migration assumptions | 1–2 research days; no new parity assertions yet |
| 2 | Where do AI specialists differ? | Tines, D3, Swimlane, Dropzone, Intezer, 7AI, Exaforce | Update existing research using tenant and governed-action criteria | 1–2 research days |
| 3 | What infrastructure can coexist? | Panther, Tenzir, Cribl, Elastic, Wazuh, Security Onion | Data-flow architecture and realistic operating costs | 1–2 research days plus engineering validation |
| 3 | Which identity services could be added? | ITDR, ISPM, NHI and identity response products | Provider support, actions and economics; no inferred LimaCharlie product | 1–2 research days |

Estimates are planning assumptions, not commitments. AI can accelerate source extraction and comparison drafts; a person must validate contracts, production behavior and publication decisions.

## 7. Original sources and provenance

All observed and last checked **2026-11-06**. Publication dates are **Unknown** except S3 (2026-07-30). Links and short paraphrases only; no copied reports, graphics, rankings or licensed text. Analyst assertions are analyst-published; vendor pages remain vendor-published even after human review. Source labels are local citations, not a parallel runtime source registry.

| ID | Publisher / type | Original source |
| --- | --- | --- |
| S1 | SACR / analyst coverage navigation | https://softwareanalyst.io/reports |
| S2 | SACR / analyst glossary | https://softwareanalyst.io/glossary |
| S3 | SACR / analyst report | https://softwareanalyst.io/reports/ai-soc-technoscope-series-the-ai-soc-market-2026-part-2 |
| V1 | Todyl / vendor-published customer case | https://www.todyl.com/case-study/pivoting-to-security-first-to-quickly-scale |
| V2 | Stellar Cyber / vendor MSSP positioning | https://stellarcyber.ai/mssps/ |
| V3 | Torq / vendor-published customer case | https://torq.io/resources/rsm-mssp-case-study/ |
| V4 | Conifers AI / vendor MSSP positioning | https://www.conifers.ai/mssps/ |
| V5 | Blumira / vendor pricing | https://msp.blumira.com/pricing/ |
| V6 | Huntress / vendor pricing | https://www.huntress.com/pricing |
| V7 | Sekoia / vendor MSSP positioning | https://www.sekoia.com/solutions/mssp |
| V8 | Microsoft / vendor partner positioning | https://microsoftpartners.microsoft.com/Microsoft-Security-Partners/Modern-SecOps/ |
| V9 | CrowdStrike / official API documentation | https://developer.crowdstrike.com/api-reference/collections/mssp/ |
| V10 | LimaCharlie / vendor pricing | https://limacharlie.io/pricing |
| V11 | LimaCharlie / official MSSP walkthrough | https://docs.limacharlie.io/1-getting-started/mssp-walkthrough/ |

## Review and handoff

- Human reviewer / date / decision: **pending**. No independent product testing performed.
- Changed typed vendor/product/capability/source IDs: **none**. Existing candidate names and citations are reused from the October landscape; no duplicate vendor records created.
- Placement: `/landscape` → `/domains/secops` → existing `endpoint-security`, `security-data-pipelines`, `detection-engineering`, `siem`, `xdr`, `soar`, `mdr`, `itdr` categories → scenario/product evidence. Return through existing category/domain navigation. Proposed placement only; this Markdown is not application data.
- UI/navigation: no changes required for this research submission. Capability publication is a separate editorial step.
- Open PR overlap checked: #136 email research, #123 personas, #108 buyer discovery and #107 relationships. This change does not edit their files or publish their pending work.
- Acquisition/renaming: no new corporate-history claims; Sekoia's current domain does not establish a legal entity change.
- Downstream: Market Map research update; typed claims defer to human review; private career material, account intent and revenue forecasts unchanged.
- Correction: amend attributed evidence through a reviewed PR; preserve the dated prior landscape and explain supersession.
