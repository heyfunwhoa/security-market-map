# Agentic and API-native email security — November 2026 competitive landscape

**Research owner:** Security Market Map maintainer  
**Status:** Researched / proposed; human editorial review pending. Not an independently tested feature grid, published comparison, analyst ranking, or customer short list.  
**Originally observed:** 2026-11-05. **Agent editorial source recheck:** 2026-11-06; human publication decision remains pending.
**Next editorial check:** 2026-12-05, or earlier on material product, pricing, deployment or partnership changes.  
**Rights:** original-source links and brief factual paraphrases only; no copied analyst tables, paywalled reports, customer data or private interview material.

## Buyer question and place in this map

**Buyer question:** In Microsoft 365 or Google Workspace, what combination of phishing/BEC prevention, suspicious-message investigation, user-report triage, account protection and controls can reduce successful social engineering **without** generating unmanageable SOC workload?

**Zoom path:** Corporate/IT security → existing `email-security` category → use case (prevent BEC and credential theft / triage reported mail / limit account-compromise impact) → vendor/product → source-linked feature or explicit Unknown. **Zoom out** to `security-awareness`, `itdr`, `dlp`, native Microsoft/Google controls, incumbent SEG and human workflows. Reuse `/landscape`, `/categories/email-security`, `/vendors/[slug]`, `/compare`, and `/sources`; no new category or UI proposed.

**Buyer and stakeholders:** email/messaging security owner and CISO select operational controls; SOC analyst/manager owns report queue; IT/M365/Workspace admin owns permissions and rollback; detection engineer cares about control, audit and false positives; procurement validates commercial terms. MSSP/MDR buyer is a separate service-provider decision requiring multi-tenancy and resale evidence.

**Alternatives:** retain Microsoft Defender for Office 365 / Google native controls; renew or expand Proofpoint/Mimecast/Check Point or another incumbent; add an API-native product alongside the incumbent; replace the existing layer; build triage with SOAR and security staffing; or defer. A similar marketing category does not establish proven direct-substitute status.

## Market read

The highest-value distinctions are **when a verdict becomes an effective block**, **who owns and can tune detection logic**, **what AI agents can change without review**, **what stays after compromise**, and **who pays for the workflow**. Each new vendor uses the language of investigation or agentic email security, but these are not interchangeable architectures or independently comparable efficacy results.

| Research option | Vendor-published positioning | Architecture / operator model | Commercial public signal | Key validation / uncertainty |
| --- | --- | --- | --- | --- |
| **AegisAI** | Purpose-built model/agents investigate intent, sender, links and attachments; Proteus announced 2026-10-08 [A1, A3] | Microsoft 365 / Google Workspace API, no MX change; vendor's technical FAQ explicitly says **after delivery** before pulling confirmed threats [A1, A2] | Enterprise quote or per-mailbox rate **Unknown** | Time-to-effective-removal distribution, readable verdicts, ATO early-access vs GA, benchmark methodology |
| **Sublime Security** | Programmable detection with MQL and two agents: ASA triage; ADÉ writes/backtests org-specific rules [S1–S3] | M365 / Google APIs; managed SaaS and authorized self-hosted AWS, including GovCloud [S4]; optional Enterprise inline routing [S10], configurable agent modes [S2, S3] and documented Enterprise tenant delegation [S13] | Core: first **100 mailboxes free**; Enterprise: contact vendor [S5] | Data-handling by region/model, tuning burden, DLP and simulation editions, partner economics |
| **Ocean** | Agents investigate every email for targeted phishing/BEC, plus SOC triage and employee guidance [O1] | Product site describes agentic email protection; exact inline-vs-after-delivery SLA and API permissions need review | Pricing/minimums **Unknown** | Prove deployment, latency, explainability, workflow controls and measurable holdout outcomes |
| **StrongestLayer** | TRACE reasons about message intent, sender history and organizational context; exports trace/logs [L1] | Vendor describes API integration without MX change and ~30-second verdict; details on outcome distribution remain untested [L1] | Vendor says custom **mailbox-based quote**, 14-day POC [L2]; partner page advertises no module gating [L3] | Data residency (current cited workflow describes SaaS but does not establish AWS US inference), evidence export, action timing, measured false positives |
| **Abnormal AI** (existing map candidate) | Per-employee/vendor behavioral baselines for targeted BEC, phishing; AI Security Mailbox automates user-report triage [B1, B2] | Vendor describes API deployment and campaign remediation; behavioral baselines are central, but its Control Center also offers custom rules and AI models [B1] | Pricing **Unknown** | Which modules/editions are in scope; integration and account/identity scope; independent comparative testing |
| **Material Security** | Inbound email, phishing-report triage, and account/sensitive-message workspace controls [M1–M3] | M365/Workspace API; cloud shared or dedicated options [M1,M3]; workspace tenancy is not equivalent to MSSP tenant management | Essentials **$4/user/month**, Advanced **$6/user/month** annually billed, **plus** Shared Drive fee; ATO add-on separately [M3] | Core versus Advanced/ATO scope, post-delivery timing, additional fees and reseller terms |

**Why Material sits here:** The category is email-security, while account and file protection are adjacent buyer jobs. The broader scope may appeal where post-compromise containment matters, but does not establish head-to-head feature parity or provider resale rights [M1–M3].

**Existing map overlap audit:** `abnormal`, `proofpoint`, `mimecast` already exist as research-candidate vendors in `lib/data/ecosystem.ts`. `adaptive-security` already has a distinct `research/vendors/adaptive-security.md` note and must not be confused with `adaptive-shield`. The five net-new candidates proposed in this change are `aegisai`, `sublime-security`, `ocean-security`, `strongestlayer` and `material-security`. Abnormal remains the existing reference. Do not create a second Abnormal or a new email-security category.

## Email-security functions and buyer boundaries

These **12 evaluation functions** are a buyer-oriented **research checklist**, not twelve verified checkmarks for each vendor. The linked examples are publisher descriptions, not observed production behavior. **Unmentioned** means **Unknown**, not that a vendor lacks the function. The typed map exposes **eight stable conceptual control questions** in the new `uc-email-fraud-response` use case, reuses existing `cap-dlp` and category IDs, and leaves every new vendor-feature comparison cell **Unknown** until human review publishes a source-bound `Claim`.

| Buyer job / function | Vendor-documented example (not exhaustive) | Boundary to validate in an authorized evaluation |
| --- | --- | --- |
| 1. **Phishing, BEC, impersonation and vendor fraud** | AegisAI message investigation [A1]; Abnormal identity baselines and configurable models [B1]; Material inbound BEC [M1] | Specific subtype and denominator; measured incremental detections versus native Microsoft/Google and current SEG |
| 2. **Suspicious links, attachments and QR codes** | AegisAI describes redirect, QR and attachment detonation [A2] | Which content is opened in a sandbox; gates/redirects and verdict-to-removal timing |
| 3. **Pre-delivery prevention** | Sublime documents Enterprise inline quarantine with provider routing rules [S10]; folder actions still deliver | Was the message ever copied to a mailbox? Fallback, bypass, failure behavior, latency and supported mailboxes |
| 4. **Post-delivery remediation** | AegisAI says API inspection and removal **after delivery** [A2]; Sublime default is post-delivery [S10] | Median/p95 first delivery → removal; how the admin undoes a false block |
| 5. **Employee-reported-phish triage** | Abnormal AI Security Mailbox [B2]; Sublime ASA [S2]; Material Essentials includes reported-phish agent [M3] | Real report sources, verdict confidence, escalation, employee feedback and measured analyst minutes |
| 6. **Historical threat hunting and investigation** | Sublime ADÉ backtests via historical Hunts [S3]; Abnormal Search & Respond [B1]; StrongestLayer reasoning exports [L1] | Historical search scope, retention, legal hold, incident evidence, campaign-wide action versus mere lookup |
| 7. **Organization-specific detection rules/models** | Sublime ADÉ generates MQL rules and presents results for review [S3]; Abnormal lists custom rules and AI models [B1] | Editability, backtest denominators, approvals, auto-activation thresholds and rollback |
| 8. **Outbound email DLP** | Sublime documents outbound monitor, alert, block, encryption and release [S11]. Material Advanced sensitive-content controls [M3] are adjacent, not evidence of outbound pre-delivery blocking | Outbound versus inbound, licensed data classifiers, encryption prerequisites and false-positive burden |
| 9. **Account takeover, OAuth and message-level controls** | Material accounts [M2] and ATO add-on [M3]; AegisAI account takeover is early-access in product positioning [A1] | Separate identity budget and required API/audit permissions; ability to prevent exfiltration after compromise |
| 10. **Employee awareness, simulations and guidance** | Sublime tailored simulations/training are an **Enterprise add-on** [S7, S12]; Ocean markets employee guidance [O1]; Abnormal reporter response [B2] | A simulation is not a comprehensive security-awareness program; which SKU and reporting are licensed? |
| 11. **Graymail and inbox workflow** | AegisAI graymail sorting [A1]; Sublime ADÉ can create graymail detections [S3] | Spam/graymail classification vs malicious quarantine; recipient preferences and recovery |
| 12. **Email-borne prompt injection** | Sublime documents Enterprise/ASA detection of AI-directed instructions in emails [S8] | Requires configured automation; if the AI agent acts before remediation, tagging alone does not prevent the action |

**Detection technique is separate from outcome:** contextual and behavioral modeling, organization-authored rules, agent investigations, and message detonation may support several jobs above. Their names do not prove higher recall or a superior false-positive tradeoff. Likewise **API-based/no MX change is an integration method, not proof of pre-inbox protection**. Treat the email-security deployment boundary and the identity/DLP control plane as separate decisions.

### Map navigation (no parallel taxonomy or UI change)

- **Zoom out:** `/landscape` → `/domains/corporate` → `/categories/email-security` with existing `security-awareness`, `itdr` and `dlp` as adjacent questions.
- **Zoom in by buyer job:** `/use-cases/email-fraud-response` → select products in `/compare` → `/vendors/aegisai`, `/vendors/sublime-security`, `/vendors/ocean-security`, `/vendors/strongestlayer`, `/vendors/material-security`, and existing `/vendors/abnormal`. Published comparison cells remain Unknown until separately reviewed claims exist.
- **Placement rule:** the eight new capability IDs describe distinct evaluable control boundaries; the other functions belong in research guidance or existing adjacent categories (especially DLP) until a justified new capability/claim is reviewed. Do **not** create another vendor list, navigation model or source registry.
- **Who may use it:** enterprise CISO/IT messaging team, SOC operator, and MSSP/MDR are distinct buyer motions. Multi-tenant hosting is not proof of MSSP reseller/workspace management rights.

### Commercial signals worth capturing, not assumed contract value

- **Material [M3]:** publisher lists Essentials **$4/user/month**, Advanced **$6/user/month**, each billed annually **plus Shared Drive fee**; ATO Resilience **+$3/user/month** add-on or **$5/user/month** standalone. Treat per-user/low-volume/shared-account rules, storage, support and discounts as quote-dependent. Do not turn public list pricing into a customer's actual annual contract.
- **Sublime [S4,S5,S12]:** first 100 Cloud mailboxes free; Enterprise requires a quote; tailored simulations are an **additional Enterprise product**. The free offer is not evidence that ASA, ADÉ, DLP or inline enforcement is included at no cost.
- **AegisAI, Ocean, StrongestLayer, Abnormal:** no reliable comparable public per-mailbox price in this research as of 2026-11-05; StrongestLayer promotes custom mailbox-based quoting [L2].
- **Provider economics:** advertised billing models are recorded below; actual annual contract value, reseller rights, applicable minimums, SOC service-margin and inference charges remain **Unknown** until an authorized commercial review. Do not derive MSSP gross margins from vendor marketing.

## MSSP editorial correction (2026-11-06)

Unknown must not erase available evidence. The original draft understated provider support. This table records what public sources actually support, without promoting it into product-feature claims or validated service economics.

| Vendor | Source-backed provider evidence | Still Unknown / acceptance needed |
| --- | --- | --- |
| Sublime | Official docs: Enterprise parent/child tenants on request, delegated roles and customer SSO [S13]. Provider guide: per-child setup, tuning and staged remediation; plans 3–4 weeks [S14]. Marketing: monthly usage billing, volume discounts and deal registration [S15]. | Test isolation, role scope, onboarding labor and offboarding. Obtain actual billing unit/rates, minimums and resale agreement. |
| Material | Marketing explicitly offers an MSP/MSSP console, tenant policies/reporting and usage billing without upfront commitment or minimum customer size [M4]. | Demonstrate isolation and delegated access; reconcile partner terms with annual list plans, ATO add-on and Shared Drive minimum fee [M3]. Do not calculate margin from retail pricing. |
| StrongestLayer | Partner marketing explicitly targets MSP/MSSP/VARs and advertises no module gating [L3]. | Tenant console, delegated access, billing aggregation, contract rights and actual service margin. |
| Ocean | Partner page advertises deal registration, co-selling and enablement [O3]. | Provider-operated multi-tenancy, delegated permissions, billing and contract rights. |
| AegisAI | Reviewed platform/FAQ establish API monitoring and write-enabled removal [A1, A2], not an MSSP operating model. | Provider tenancy, program terms and economics. No supporting provider documentation located in this bounded review; this is not evidence of absence. |

**Evidence labels:** “Official docs” verifies that the vendor documents a behavior, not that we tested it. “Marketing” verifies a published offer or statement, not contractual entitlement. Configuration, mailbox coverage and buyer economics require implementation evidence. Proofpoint, Mimecast and native mail controls remain existing alternatives; no blanket claim that gateways lack post-delivery or identity capabilities is imported from competitor marketing.

## Dossier and evidence nuances

### AegisAI — model-led investigation

- **Vendor-published:** AegisAI describes a Microsoft 365 / Google Workspace API integration with no MX change, four investigation agents per message, sandboxed links/files, human-readable reasons and a median 1.9-second verdict [A1].
- **Timing landmine:** Its 2026-10-08 Proteus launch promotes investigation **before the inbox**, but both the platform deployment section and phishing-prevention FAQ explicitly describe **post-delivery** API operation [A1–A3]. The specific architecture descriptions support post-delivery remediation; the release remains conflicting marketing, not evidence of a separate inline mode. Monitoring is read-only; removal requires write access. Ask for observed mail delivery and remediation timestamps rather than describing the vendor as an inline gateway.
- **Claim, not independent validation:** The release says Proteus caught >99% of 3,020 human-reviewed phishing attacks in its benchmark. Cohort selection, comparison configuration, precision and live-mail results need independent testing [A3].
- **Availability nuance:** AegisAI labels account takeover **early access / review-only**, with session revocation planned, and outbound DLP **early access**, without Google Workspace pre-delivery blocking during early access [A1]. Audit and approval settings are configuration examples. A feature mention is not unconditional autonomous enforcement.
- **Commercial:** Funding of $36M Series A, $49M total announced 2026-07-23, source is the company's press release, not audited sales traction [A4]. Public price, MSSP resale and per-tenant economics remain Unknown.
- **Likely sales wedge (hypothesis):** targeted spear-phishing / payment-diversion that passes authentication and native filters. Disconfirm if live tenant traffic shows no meaningful incremental catch after accounting for false positives and response delay.

### Sublime Security — transparent, tailored detection engineering

- **Vendor-published:** MQL detections and rule/audit visibility; ASA has inactive, passive (alerts, no mail changes or auto-review) and active configured-action modes; unknown verdicts require human review. ADÉ recommends backtested rules for approval by default; optional auto-activation can enable remediation, including quarantine. A backtest score is not measured production efficacy [S1–S3].
- **Architecture:** API-based managed or customer AWS deployment, no MX change; self-hosted availability requires authorization. Default delivery is post-delivery; optional Enterprise inline quarantine uses transport/routing configuration, with fallback and uncovered-mailbox exceptions [S10]. ASA/ADÉ are Enterprise offerings; ADÉ documents possible per-report self-hosted processing costs. Confirm regional data flow and permissions [S2–S4].
- **As-of launches:** Email DLP announced GA 2026-09-30; tailored phishing simulations/training GA 2026-10-06; official documentation describes an email prompt-injection detection flow tied to ASA [S6–S8]. Check actual SKU, rollout, enforcement and model/provider details in a tenant.
- **Commercial:** Core first 100 mailboxes free; Enterprise quoted. Vendor announced a channel program in Apr 2026 [S9]. Current docs describe Enterprise multi-tenancy and provider onboarding [S13, S14]; partner marketing advertises deal registration, monthly usage billing and discounts [S15]. Actual rates, margin and contractual resale rights remain Unknown.
- **Likely wedge (hypothesis):** team that wants to own and explain detections, automate triage without surrendering change control, or self-host where approved. Disconfirm if staff cannot operate MQL/agent governance or if agent precision and total operating burden are poor in pilot.

### Ocean — investigation-led specialist

- **Vendor-published:** targeted threat investigation, autonomous report triage, employee-facing mailbox guidance [O1]. Its 2026-05-19 launch announced $28M total funding; this is a company-issued announcement, not proof of market share [O2].
- **Unknown:** public-priced SKU, regional deployment requirements, specific pre/post-delivery response timing, MSSP resale/multi-tenancy, approval gates, effective false-positive rates and audited customer performance.
- **Hypothesis to disconfirm:** a security team values an investigation-centric experience and employee confidence more than programmable rules; falsify using a matched, tenant-authorized evaluation corpus.

### StrongestLayer — reasoning traces and mailbox economics

- **Vendor-published:** TRACE shows defense/prosecution/provenance reasoning, integrates with M365 and Google APIs and supports structured SOC exports; vendor says around 30 seconds for a verdict [L1].
- **Commercial signal:** pricing is quote-based and scales by mailbox count, with a vendor-advertised 14-day POC [L2]. **No public per-user rate** established.
- **Unknown:** independently measured latency, remediation mechanics and window of exposure, tenant and region isolation, MSP/reseller terms and what traces reveal about protected mail content.
- **Hypothesis to disconfirm:** SOC teams prioritize a reasoned verdict and audit over only a categorical block; falsify by checking investigation time, analyst trust and real-risk reduction.

### Abnormal / Material as comparison anchors

- Abnormal's documented behavior baselines, configurable rules/models and AI Security Mailbox make it the **existing reference candidate**, not evidence that AegisAI/Ocean/Sublime outperform or underperform it [B1, B2].
- Material addresses the broader email **plus** account-and-files compromise lifecycle [M1, M2]; segment as partial overlap/adjacent, not a binary winner.
- Traditional SEGs, native Microsoft/Google, phishing training and SIEM/SOAR may be complements, bundled alternatives or status quo depending on the funded buyer job.

## Practical comparison / proof-of-value design

1. **Baseline the current stack**: licensed Microsoft/Google tier, incumbent SEG/ICES, historical confirmed incidents, user-report workflow, mailbox mix, role and geography. Confirm permission and retention boundaries before connecting.
2. **Run bounded, authorized pilots** using the same tenant-approved mail cohorts, adjudication criteria, dates, and exposure window. Separate **vendor detection**, **post-delivery remediation**, **reported-mail triage**, **user guidance**, and **ATO/DLP** rather than combining them into one "AI score".
3. **Measure** confirmed malicious recall with denominators, false positives per 1,000 legitimate emails, missed financial-fraud scenarios, median/p95 delivery-to-remediation, user-report closure time, analyst minutes, user/business disruption, and time to rollback bad actions. Record blind adjudication and selection bias.
4. **Commercial model**: annual mailbox coverage (active/seasonal/shared mailboxes); minimum commitments; contract term; separate DLP, training, analyst/agent charges; pilot-to-paid conversion; API and inference charges; reseller margin and customer ownership where MSSP motion applies. Do not import an assumed ACV.
5. **Security controls**: OAuth scopes and app consent, retention, region, model subcontractors, human approvals, response audit logs, quarantine/release/rollback, abuse-mailbox handling and SIEM export. Verify support per edition, tenant and permission mode.
6. **Decision memo**: deployment effort and measured marginal benefit vs status quo; keep products **not determined** if their deployment model or efficacy was not tested. No unvalidated feature parity or ROI.

**Discovery questions**
- Email owner: What specific failure matters: payment-diversion BEC, compromised vendors, credential harvest, volume/false positives, or account takeover? What currently stops it, and when?
- SOC manager: How many reports per week are truly malicious? Which decisions can automate, and who can reverse a mistake? How long between delivery, report, action and final cleanup?
- M365/Workspace admin: Which OAuth scopes and write permissions are acceptable? Can the product be evaluated in read-only mode and measured without changing MX?
- Detection engineer: Can I inspect a disputed decision, write/approve a scoped rule, and export evidence to SIEM? What happens when an agent is uncertain?
- Finance/procurement: What is the real pricing metric, minimum, expansion policy, volume true-up and renewal exposure? Which existing spend could actually be retired?
- MSSP/MDR: Are tenants isolated in UI, data and contract? Can the provider own customer workflows, pricing and support? What are resale rights, per-tenant minimums and gross-margin exposure?

## Prioritized research work (relevance, **not** vendor rank)

- **Tier 1 source review:** AegisAI and Sublime (named focus). Establish pre/post delivery semantics and agent change control, edition and pricing.
- **Tier 2 candidate review:** Ocean and StrongestLayer. Resolve live-mail behavior, security architecture and pricing beyond product copy.
- **Reference:** Abnormal already in the typed map; Material newly mapped for email with adjacent workspace/identity/data security scope; Proofpoint, Mimecast and Microsoft/Google native controls as budget/architecture alternatives.
- **Do not infer:** feature checkmarks, performance winner, direct competitor edge, multi-tenant MSSP readiness, partner margin, customer churn, revenue/ARR or pricing not actually sourced.

## Source inventory / evidence state

Every entry is an original public URL. **Originally observed 2026-11-05; rechecked 2026-11-06.** S6 and S9 now point to the direct releases inspected on 2026-11-06; the original discovery indexes remain linked in the correction record below. Undated product pages have publication date **Unknown**; no source below independently tests a platform.

| ID | Original source (publisher) | Publication date | Evidence status / supports |
| --- | --- | --- | --- |
| A1 | [AegisAI platform](https://www.aegisai.com/platform) | Unknown | vendor marketing; API, agents, modes and early access |
| A2 | [AegisAI phishing-prevention FAQ](https://www.aegisai.com/platform/email-phishing-prevention) | Unknown | vendor marketing; explicitly **after** delivery |
| A3 | [Proteus launch](https://www.prnewswire.com/news-releases/aegisai-launches-proteus-the-first-foundational-model-for-email-security-that-investigates-every-email-like-a-security-analyst-before-it-reaches-the-inbox-302901929.html) (AegisAI via PR Newswire) | 2026-10-08 | press release; benchmark vendor-reported |
| A4 | [Series A announcement](https://www.prnewswire.com/news-releases/aegisai-raises-36-million-series-a-led-by-battery-ventures-to-fight-the-new-wave-of-ai-spear-phishing-302833624.html) (AegisAI) | 2026-07-23 | press release; funding vendor-reported |
| S1 | [Sublime overview](https://docs.sublime.security/docs/overview) | Unknown | vendor official docs; detection, MQL, agents |
| S2 | [ASA docs](https://docs.sublime.security/docs/asa-autonomous-security-analyst) | Unknown | vendor official docs; triage scope and modes |
| S3 | [ADÉ docs](https://docs.sublime.security/docs/ade-autonomous-detection-engineer) | Unknown | vendor official docs; backtest and activation |
| S4 | [Sublime installation options](https://docs.sublime.security/docs/installation-options) | Unknown | vendor official docs; SaaS, self-host and MX |
| S5 | [Sublime plans](https://sublime.security/plans-detail/) | Unknown | vendor marketing; 100 mailbox Core offer, Enterprise quote |
| S6 | [Email DLP GA release](https://www.prnewswire.com/news-releases/sublime-security-launches-email-dlp-becoming-the-first-platform-to-deliver-agentic-email-security-for-both-inbound-threat-detection-and-outbound-data-protection-302893893.html) (Sublime via PR Newswire; originally discovered through news index) | 2026-09-30 | vendor announcement; product release |
| S7 | [Tailored simulation GA](https://sublime.security/blog/tailored-phishing-simulations-and-training-generally-available/) | 2026-10-06 | vendor announcement; product release |
| S8 | [Email prompt injection docs](https://docs.sublime.security/docs/prompt-injection-detection) | Unknown | vendor official docs; scope and Enterprise ASA requirement |
| S9 | [Channel-program release](https://www.prnewswire.com/news-releases/sublime-security-launches-channel-partner-program-to-redefine-email-security-302755741.html) (Sublime via PR Newswire; originally discovered through news index) | 2026-04-28 | vendor announcement; partner program, deal protection and enablement, not agreed margin |
| S10 | [Sublime pre-delivery Inline Protection](https://docs.sublime.security/docs/inline-protection-for-inbound-messages) | Unknown | official docs; Enterprise, delivery boundary and failover exceptions |
| S11 | [Sublime Email DLP](https://docs.sublime.security/docs/email-data-loss-prevention-dlp) | Unknown | official docs; action modes and policy controls |
| S12 | [Sublime tailored training add-on](https://sublime.security/product/phishing-simulations-training/) | Unknown | vendor product page; requires Enterprise and is an add-on |
| O1 | [Ocean platform](https://ocean.security/) | Unknown | vendor marketing; agentic investigation, SOC, user guidance |
| O2 | [Ocean launch](https://ocean.security/resources/blog/ocean-launch-out-of-stealth) | 2026-05-19 | vendor announcement; funding and launch |
| L1 | [StrongestLayer TRACE workflow](https://www.strongestlayer.com/platform/how-it-works) | Unknown | vendor marketing; reasoning, connectors, timing and logs |
| L2 | [StrongestLayer pricing](https://www.strongestlayer.com/get-pricing) | Unknown | vendor marketing; mailbox-based quote/POC |
| B1 | [Abnormal inbound email](https://abnormal.ai/platform/inbound-email-security) | Unknown | vendor marketing; behavior baseline |
| B2 | [Abnormal AI Security Mailbox](https://abnormal.ai/platform/ai-security-mailbox) | Unknown | vendor marketing; reported-mail triage |
| M1 | [Material email](https://material.security/product/email) | Unknown | vendor marketing; inbound and post-compromise |
| M2 | [Material accounts](https://material.security/product/accounts) | Unknown | vendor marketing; ATO, OAuth and sensitive data |
| M3 | [Material pricing and feature matrix](https://material.security/pricing) | Unknown | vendor marketing; $4/$6 per user/month plus Shared Drive fees, ATO add-on, editions |

### Additional original sources inspected 2026-11-06

Existing source IDs and original observation dates are preserved. These additions extend this research register, not a parallel registry or published feature matrix. All six pages below have publication date **Unknown**.

| ID | Original source / publisher | Evidence type and scope |
| --- | --- | --- |
| S13 | [Multi-tenancy management](https://docs.sublime.security/docs/multi-tenancy-management), Sublime | Official docs; Enterprise enablement, delegated access, same-instance hierarchy |
| S14 | [MDR/MSP/MSSP onboarding](https://docs.sublime.security/docs/onboarding-guide-mdr-msp-and-mssp-partners), Sublime | Official docs; customer admin prerequisite, per-child configuration and rollout work |
| S15 | [Partners](https://sublime.security/partners/), Sublime | Vendor marketing; monthly usage billing, volume discounts, deal registration |
| M4 | [MSP/MSSP program](https://material.security/partners/msp), Material | Vendor marketing; tenant console and advertised provider billing |
| L3 | [Partner program](https://www.strongestlayer.com/company/partners), StrongestLayer | Vendor marketing; MSP/MSSP recruiting and no module gating |
| O3 | [Partner program](https://ocean.security/partner-program), Ocean | Vendor marketing; channel enablement and deal registration |

**Original discovery links:** [S6 news index](https://sublime.security/topic/sublime-news/), [S9 newsroom](https://sublime.security/news/).

**Correction log:** source recheck retains AegisAI's timing disagreement; adds Sublime inline/action/licensing boundaries and previously omitted provider sources; qualifies Material content controls versus outbound blocking; moves StrongestLayer's no-module-gating attribution to its partner page. The original StrongestLayer pricing URL redirects to `/pricing`; retain original provenance. Remove the unsupported AWS US inference statement from the comparison. No taxonomy, vendor identity, feature Claim, competitive edge or numerical ranking changed.

**Acceptance handoff:** agent review is complete for these corrections, not named human publication approval. Existing integrity tests must pass on the revised head. Before publication, manually inspect candidate badges, Unknown comparison cells, source links/dates and navigation on `/landscape`, `/categories/email-security`, `/use-cases/email-fraud-response`, the five vendor pages, `/compare` and `/sources` at phone/tablet/desktop widths with keyboard/focus checks. Browser checks and actual deployed-SHA verification are not performed by this editorial review. No merge/deployment authorized.

## Review, ownership and downstream disposition

- **Changed catalog IDs proposed:** `aegisai`, `sublime-security`, `ocean-security`, `strongestlayer`, `material-security` (vendor and corresponding product candidates); `uc-email-fraud-response` with eight conceptual capabilities; new original-source entries; **no** product-feature claims or direct-competition relationships.
- **Existing category:** `email-security`. Reused `itdr`, `dlp`, `security-awareness` and existing `cap-dlp` for adjacent buyer questions. The added use case is educational, not product parity.
- **Parent/product/historical brands:** no documented acquisitions or rename events asserted; company and product names kept distinct. Similar names such as unrelated Aegis AI services must not be merged.
- **Publication gate:** named human reviewer, approval and CI on exact PR head required before merge; deployed pages and citations must be checked separately. Research candidates never imply verified product parity.
- **Unknowns:** independent efficacy, pilot cohort, feature tier, true inline enforcement, pricing for most vendors, model-processing/data residency, tested MSSP tenant isolation and executed partnership terms; documented/advertised provider capabilities are recorded in the MSSP table above.
- **Consumer disposition (as of 2026-11-05):** Security Market Map — `update proposed` in draft PR; private career/interview notes — `no change`; Account Signal Engine and GTM Revenue OS — `defer` pending owner review; no automatic cross-repo or private-data write.
- **Correction/rollback:** amend/remove the proposed source-linked entries in a reviewed PR, preserving history and review reason; no deployed state exists from creating this branch alone.

## Review checklist

- [x] Original vendor sources and date/claim labels recorded.
- [x] Existing category, Abnormal and overlapping PRs checked.
- [x] Distinctions and explicit Unknowns; no private interview/customer data.
- [ ] Human reviewer and editorial decision.
- [ ] `npm run test:research-integrity` and `npm test` on the **new** PR head after this expansion.
- [ ] `npx next typegen`, `npm run typecheck`, `npm run lint`, `npm run build` on the **new** PR head after this expansion.
- [ ] Merge approval; publication/deployment URL and page-level verification.
