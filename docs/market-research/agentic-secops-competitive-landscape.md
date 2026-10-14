# Agentic SecOps and MSSP/MDR platform landscape — October 2026

**Scope:** public industry research; Security Market Map owns this reusable competitive view. **Status:** curated source-linked research, not independently benchmarked or a feature-parity claim. **Prepared:** 2026-10-12. **Next editorial check:** 2026-11-12 or earlier for material launches. This document is not yet ingested into the published typed application catalog.

## Why this market is difficult to compare

A buying committee may use the phrase "AI SOC" for distinct requirements: (1) managed detection and response infrastructure, (2) multi-tenant SIEM/XDR, (3) cross-tool automation and governed AI agents, (4) code-driven telemetry/detection infrastructure. An adjacent vendor is not automatically a head-to-head competitor. Compare by **job to be done**, not funding amount or labels.

**LimaCharlie reference position:** programmable security operations infrastructure (sensors/telemetry, detection-and-response rules, cloud adapters, APIs) plus **Grid**, a persistent AI field engineer that configures and supervises agent/workflow automation. These are **LimaCharlie vendor statements** [LC1, LC2]; enterprise outcomes require customer-side validation. Its MDR customer Soteria describes API onboarding and detections-as-code, but this is a vendor-published case study [LC3].

## Competition by buyer motion

| Buyer decision / job to be done | Vendors worth testing | Why adjacent / what to validate |
| --- | --- | --- |
| Build or scale an MSSP/MDR business on multi-tenant security infrastructure | **Stellar Cyber, Sekoia.io, D3 Security, Swimlane**, 7AI | Stellar Cyber positions a packaged multi-tenant Open XDR platform [ST1]. D3 positions multi-tenant investigation and SOAR [D3]. Swimlane pitches automation plus MSSP channel alignment [SW]. Test actual tenant isolation, onboarding, SOC labor, resale/white-label rights and margin. Sekoia needs a refreshed official capability review before comparison cells are filled. |
| Add AI triage/investigation/response to an existing SOC stack | **Torq, Tines, D3, 7AI, Exaforce** | Torq sells cross-vendor agentic SOC automation [TQ]; Tines documents governed agentic workflows [TI]; D3 combines investigation with response [D3]; 7AI and Exaforce span more of the data/operating platform [7A1, EX]. Compare actual actions, approvals, integration depth, audit evidence and time-to-value. |
| Buy an extensible AI SOC foundation for building a service | **7AI, Exaforce, Stellar Cyber, LimaCharlie** | 7AI explicitly supports partners building offerings and federated SIEM [7A1,7A2]; Exaforce markets a security data layer and agents [EX]. Ask what is programmable, exportable and owned by the service provider. |
| Collect, transform, retain and detect on security telemetry | **Panther, Tenzir, Elastic Security**, Exaforce | Panther emphasizes detection-as-code and a security data lake [PA]; Tenzir specializes in pipelines [TZ]. These may complement rather than replace LimaCharlie. Verify which stack layer is actually in the customer's budget. |
| Stay with or expand existing incumbent stack | Existing SIEM, EDR, SOAR and MDR vendors | A "do nothing", internal-build or incumbent-platform expansion decision can be the real competitor. Record incumbent, migration cost, switching risks and financial trade-offs. |

### Prioritization for ongoing monitoring

- **Tier A — overlapping MSSP/MDR commercial motion:** Stellar Cyber, D3 Security, Swimlane, Sekoia.io (needs original-source enrichment).
- **Tier A — Grid / AI agent motion:** Torq, 7AI, Exaforce, Tines.
- **Tier B — infrastructure overlap:** Panther, Tenzir, Elastic Security.
- **Watch:** managed MDR operators, incumbent SOAR/SIEM/XDR, open-source self-build options, and cloud/security suites.

Tier here indicates *research relevance to the stated buying motion*, not product quality, market share or verified frequency of competitive displacement.

## Claims and potential differentiation to test (hypotheses, not conclusions)

1. **LimaCharlie land-and-expand:** MSSP starts with endpoint/telemetry/detections, standardizes multiple tenants, then adds cross-tool agent automation or new services. Evidence for *possibility* is the Soteria case [LC3]; expansion frequency and net retention are unknown.
2. **Infrastructure plus agentic operator:** Grid builds conventional platform configuration rather than a Grid-only closed workflow [LC2]. Compare portability, permission boundaries, monitoring, and human approvals against Torq/D3/Tines/7AI. Do not claim uniqueness without a documented head-to-head test.
3. **Partner economics:** assess provider gross margin, bill predictability, AI inference cost ownership, contract minimums, channel conflict, and customer/data ownership. D3 publicly describes an AI-inclusive pricing model [D3]; Swimlane emphasizes not competing for provider customers [SW]; 7AI has a formal partner/build program [7A2]. Treat every contract term as unknown until evaluated.
4. **MDR scalability:** evaluate time to provision a new tenant; time to onboard first sources; detection coverage QA; exceptions per tenant; response approvals; change management; rollback; staff-hours per 100 customers; and support burden.
5. **Architecture risk:** compare telemetry ingest/retention vs federated query, native sensors, deployment model, region controls, RBAC, logging, interoperability, and cost over 12 months at the same defined workload.

## Reusable deal comparison worksheet

For any real evaluation, record:

- **Segment and buyer:** MSSP/MDR operator, enterprise SOC, detection engineer, security platform engineer, finance/procurement.
- **Current stack:** endpoints/telemetry sources, SIEM/SOAR, EDR, cloud, identity; volumes and tenant count.
- **Buying trigger:** analysts overloaded, tenant growth, replacement deadline, new managed service, alert quality, data-cost pressure.
- **Decision criteria:** security/functional must-haves, time-to-first-value, implementation ownership, approvals and compliance, commercial economics.
- **Evidence:** direct source URL + publisher + published date (if supplied) + observation date + vendor-reported/independent/tested classification; record Unknown rather than guessing.
- **Win/loss:** incumbent, evaluated alternatives, proof/POC results, actual reason selected/rejected, reference permission and analyst confidence. Do not infer win rates from customer stories.

**Example apples-to-apples POC:** same three tenant profiles, same 5 integrations, 10 defined alert scenarios, permission matrix, and a 30-day estimated operational cost; score detection fidelity, human intervention, setup effort, audit/rollback, and recurring cost. No real comparison scores exist in this research.

## Artemis Security — enterprise AI-native SOC candidate (2026-10-14)

**Entity:** Artemis Security, https://artemissecurity.com/ (not Alethea's distinct "Artemis for Security" physical/online-threat platform). **Relationship to LimaCharlie:** **partial overlap, potential direct substitute for particular enterprise SOC detection/investigation/response budgets**, not a proven head-to-head replacement for LimaCharlie's programmable SecOps or MSSP/MDR infrastructure. **Status:** source-linked candidate awaiting human review; no typed product/capability assertions or competitive edge published.

- **Vendor-reported positioning [AR1, AR2]:** AI-native security operations using a living model of users, accounts, devices and resources to support detection, investigation and response. The company describes intelligent federated telemetry; actual coverage and data locality require verification.
- **Vendor-reported model announcement [AR3]:** Orion-1 was announced **2026-10-08** for threat detection, investigation, attack reconstruction, hunting and correlation. The vendor's benchmark and superiority descriptions are self-reported; vendor says Orion-1 is initially available in **private preview** to selected Artemis customers, with broader availability planned; general availability, reproducibility and performance on representative customer data remain unverified.
- **Company milestone [AR4]:** Artemis announced emerging from stealth with **$70M aggregate seed + Series A financing** on **2026-04-15**; funding is company-reported context, not evidence of product performance or adoption.
- **Buyer decision:** An enterprise SOC could compare Artemis's packaged AI-native investigation/response model with building or modernizing composable detections and response on LimaCharlie/Grid alongside existing tools. Test whether both are on an actual buyer shortlist before claiming direct displacement.
- **Differentiation hypothesis (unproven):** Artemis emphasizes an integrated AI-native investigation and response experience; LimaCharlie emphasizes programmable sensors, APIs, telemetry/detection/response infrastructure and Grid workers [LC1, LC2]. Either may coexist with incumbent tools. Neither positioning establishes feature parity.
- **Explicit Unknown:** native sensors, exact endpoint coverage, multi-tenant isolation/MSSP resale, open APIs and export, custom detector control, model selection/BYOK, response approval/rollback implementation details (vendor states high-impact actions require human approval by default [AR3]), pricing/unit economics, region and data retention, Orion-1 general availability, independent accuracy and actual win/loss frequency. Do not infer absence from missing documentation.
- **Comparison validation:** use identical synthetic alert and tenant scenarios; review source onboarding, correlation traceability, permissions/human approvals, audit/rollback, extensibility, ownership, per-workload cost and implementation effort. No head-to-head results currently exist.
- **Owner/review:** Security Market Map research editor / repository maintainer; **next check 2026-11-12** or material release; **observed 2026-10-14**. Public original URLs may be linked; do not copy protected text or ingest private interview/customer data.
- **Downstream disposition:** Security Market Map candidate **update** (this section); typed catalog **defer** pending human evidence review; private Career Command Center **defer** to its owner as read-only public source; Account Signal Engine **no account signal** without account-specific corroboration; GTM Revenue OS **no change** to modeled assumptions; Builder Academy **no change**.

**Original sources:** [AR1] https://artemissecurity.com/ (vendor product page, observed 2026-10-14); [AR2] https://artemissecurity.com/about/ (vendor positioning, observed 2026-10-14); [AR3] https://artemissecurity.com/company-news/introducing-orion-1-the-leading-frontier-model-for-cyber-defense/ (vendor announcement, published 2026-10-08, observed 2026-10-14); [AR4] https://artemissecurity.com/company-news/announcing-artemis-security-that-understands-what-it-protects/ (vendor announcement, published 2026-04-15, observed 2026-10-14).

## Public original sources (vendor claims unless marked otherwise)

- **[LC1]** LimaCharlie documentation, platform overview: https://docs.limacharlie.io/
- **[LC2]** LimaCharlie docs, Grid field engineer and workers: https://docs.limacharlie.io/9-ai-sessions/grid/
- **[LC3]** LimaCharlie, "How Soteria scaled its MDR practice", published 2026-09-25: https://limacharlie.io/blog/soteria-mdr-case-study
- **[ST1]** Stellar Cyber, MSSP architecture/use cases: https://stellarcyber.ai/mssps/ and https://stellarcyber.ai/platform-deployment/
- **[D3]** D3 Security, Morpheus for MSSPs, updated September 2026: https://d3security.com/morpheus/use-case/mssp/
- **[SW]** Swimlane, MSSP AI SOC announcement, 2026-07-22: https://swimlane.com/news/mssp-ai-soc/
- **[TQ]** Torq, AI SOC platform description: https://torq.io/ai-soc-automation/
- **[TI]** Tines, governed agentic workflows, 2026-06-17: https://www.tines.com/blog/agentic-workflow-automation-governing-ai-agents-inside-workflows/
- **[7A1]** 7AI, Federated SIEM + Build announcement, 2026-07-27: https://7ai.com/press/7ai-launches-federated-siem-and-7ai-build-the-foundation-for-ai-native-security
- **[7A2]** 7AI, service-provider partner tracks: https://7ai.com/partners
- **[EX]** Exaforce, agentic SOC and data platform: https://www.exaforce.com/platform
- **[PA]** Panther platform and native agent/detection stack: https://panther.com/overview
- **[TZ]** Tenzir telemetry pipeline docs: https://tenzir.com/docs/

These links are references to original public pages, not copyrighted page copies. Source availability and company statements were reviewed for this research on 2026-10-12, but feature parity, efficacy, contract terms and financial outcomes have **not** been independently tested.

## Implementation / publishing boundary

- The typed live app catalog remains the canonical published source: `lib/data`. **Do not create badges or feature booleans from this Markdown alone.**
- Propose reviewed entities, capabilities and claim/source records through the existing claim + source schema, tests and review workflow. No scraping, paid APIs, new database, or automatic publication introduced here.
- Share this public-safe research by URL with the private Joy Index Interview Intelligence workspace, which owns interviewer prompts and candidate decisions; do not copy private notes or paths into this public repository. For a repeatable process, use the [Competitive Intelligence Playbook](competitive-intelligence-playbook.md).
- Cross-project evidence collection, when actually available, should use reviewed contracts in Technical Docs and the source pipeline, not direct DB access.

## Audience and persona companion

[Current-state LimaCharlie audience and buyer personas](limacharlie-audience-personas.md) (2026-10-13) separates sourced positioning from working role hypotheses, qualification questions and unknown segment economics. Research candidate only; not typed application data.

## Security data and builder infrastructure expansion

See the [SecOps infrastructure overlap and company index](secops-infrastructure-overlap.md) for the 11-company research map spanning data pipelines, programmable SecOps, agent/workflow infrastructure and AI SOC capabilities. Candidate research only, not typed catalog publication.
