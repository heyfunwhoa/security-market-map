# Agentic and API-native email security — November 2026 competitive landscape

**Research owner:** Security Market Map maintainer  
**Status:** Researched / proposed; human editorial review pending. Not an independently tested feature grid, published comparison, analyst ranking, or customer short list.  
**Observed and last checked:** 2026-11-05  
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
| **Sublime Security** | Programmable detection with MQL and two agents: ASA triage; ADÉ writes/backtests org-specific rules [S1–S3] | M365 / Google APIs; managed SaaS and authorized self-hosted AWS, including GovCloud [S4]; human-approval and configurable agent modes [S2, S3] | Core: first **100 mailboxes free**; Enterprise: contact vendor [S5] | Data-handling by region/model, tuning burden, DLP and simulation editions, partner economics |
| **Ocean** | Agents investigate every email for targeted phishing/BEC, plus SOC triage and employee guidance [O1] | Product site describes agentic email protection; exact inline-vs-after-delivery SLA and API permissions need review | Pricing/minimums **Unknown** | Prove deployment, latency, explainability, workflow controls and measurable holdout outcomes |
| **StrongestLayer** | TRACE reasons about message intent, sender history and organizational context; exports trace/logs [L1] | Vendor describes API integration without MX change and ~30-second verdict; details on outcome distribution remain untested [L1] | Vendor says custom **mailbox-based quote**, 14-day POC, no rigid feature tiers [L2] | Data residency (vendor describes AWS US inference), evidence export, action timing, measured false positives |
| **Abnormal AI** (existing map candidate) | Per-employee/vendor behavioral baselines for targeted BEC, phishing; AI Security Mailbox automates user-report triage [B1, B2] | Vendor describes API deployment and campaign remediation; baseline rather than customer-authored MQL [B1] | Pricing **Unknown** | Which modules/editions are in scope; integration and account/identity scope; independent comparative testing |

**Separate adjacent comparator:** Material Security explicitly sells broader cloud-workspace protection across **email, accounts and files**, plus sensitive-message controls. It may be preferred when post-compromise blast radius and OAuth/account security outweigh pure inbound detection [M1, M2]. Do not infer that Material is feature-equivalent to the five products above.

**Existing map overlap audit:** `abnormal`, `proofpoint`, `mimecast` already exist as research-candidate vendors in `lib/data/ecosystem.ts`. `adaptive-security` already has a distinct `research/vendors/adaptive-security.md` note and must not be confused with `adaptive-shield`. The four net-new candidates proposed in this change are `aegisai`, `sublime-security`, `ocean-security`, `strongestlayer`. Do not create a second Abnormal or a new email-security category.

## Dossier and evidence nuances

### AegisAI — model-led investigation

- **Vendor-published:** AegisAI describes a Microsoft 365 / Google Workspace API integration with no MX change, four investigation agents per message, sandboxed links/files, human-readable reasons and a median 1.9-second verdict [A1].
- **Timing landmine:** Its 2026-10-08 Proteus launch promotes investigation **before the inbox**, but its phishing-prevention FAQ explicitly says API analysis and removal happen **after delivery** [A2, A3]. Ask for observed mail delivery and remediation timestamps rather than describing the vendor as an inline gateway.
- **Claim, not independent validation:** The release says Proteus caught >99% of 3,020 human-reviewed phishing attacks in its benchmark. Cohort selection, comparison configuration, precision and live-mail results need independent testing [A3].
- **Availability nuance:** AegisAI platform labels account-takeover protection **early access**; monitoring-mode descriptions place DLP in audit mode, simulations notice-only and red-team lures in approval flow [A1]. A feature mention is not unconditional autonomous enforcement.
- **Commercial:** Funding of $36M Series A, $49M total announced 2026-07-23, source is the company's press release, not audited sales traction [A4]. Public price, MSSP resale and per-tenant economics remain Unknown.
- **Likely sales wedge (hypothesis):** targeted spear-phishing / payment-diversion that passes authentication and native filters. Disconfirm if live tenant traffic shows no meaningful incremental catch after accounting for false positives and response delay.

### Sublime Security — transparent, tailored detection engineering

- **Vendor-published:** MQL detections and rule/audit visibility; ASA investigates reported/flagged mail with passive/active response settings; ADÉ turns confirmed misses into backtested org-specific rules, by default for human approval [S1–S3].
- **Architecture:** API-based managed or customer AWS deployment, no MX change; self-hosted availability requires authorization. ASA and ADÉ are Enterprise offerings and may have region-specific inference and operating costs [S2–S4].
- **As-of launches:** Email DLP announced GA 2026-09-30; tailored phishing simulations/training GA 2026-10-06; official documentation describes an email prompt-injection detection flow tied to ASA [S6–S8]. Check actual SKU, rollout, enforcement and model/provider details in a tenant.
- **Commercial:** Core first 100 mailboxes free; Enterprise quoted. Vendor announced a channel partner program in Apr 2026, but public sources here **do not establish** MSSP multi-tenant operation, margins, resale rights or deal registration [S5, S9].
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

- Abnormal's documented behavior baselines and AI Security Mailbox make it the **existing reference candidate**, not evidence that AegisAI/Ocean/Sublime outperform or underperform it [B1, B2].
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
- **Reference:** Abnormal already in the typed map; Material as adjacent cloud-workspace security; Proofpoint, Mimecast, Microsoft/Google native controls as budget/architecture alternatives.
- **Do not infer:** feature checkmarks, performance winner, direct competitor edge, multi-tenant MSSP readiness, partner margin, customer churn, revenue/ARR or pricing not actually sourced.

## Source inventory / evidence state

Every entry is an original public URL. **Observed 2026-11-05**. Undated product pages have publication date **Unknown**; no source below independently tests a platform.

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
| S6 | [Email DLP GA news index](https://sublime.security/topic/sublime-news/) | 2026-09-30 | vendor announcement; product release |
| S7 | [Tailored simulation GA](https://sublime.security/blog/tailored-phishing-simulations-and-training-generally-available/) | 2026-10-06 | vendor announcement; product release |
| S8 | [Email prompt injection docs](https://docs.sublime.security/docs/prompt-injection-detection) | Unknown | vendor official docs; scope and Enterprise ASA requirement |
| S9 | [Partner-program news index](https://sublime.security/news/) | 2026-04-28 | vendor announcement; existence of program only |
| O1 | [Ocean platform](https://ocean.security/) | Unknown | vendor marketing; agentic investigation, SOC, user guidance |
| O2 | [Ocean launch](https://ocean.security/resources/blog/ocean-launch-out-of-stealth) | 2026-05-19 | vendor announcement; funding and launch |
| L1 | [StrongestLayer TRACE workflow](https://www.strongestlayer.com/platform/how-it-works) | Unknown | vendor marketing; reasoning, connectors, timing and logs |
| L2 | [StrongestLayer pricing](https://www.strongestlayer.com/get-pricing) | Unknown | vendor marketing; mailbox-based quote/POC |
| B1 | [Abnormal inbound email](https://abnormal.ai/platform/inbound-email-security) | Unknown | vendor marketing; behavior baseline |
| B2 | [Abnormal AI Security Mailbox](https://abnormal.ai/platform/ai-security-mailbox) | Unknown | vendor marketing; reported-mail triage |
| M1 | [Material email](https://material.security/product/email) | Unknown | vendor marketing; inbound and post-compromise |
| M2 | [Material accounts](https://material.security/product/accounts) | Unknown | vendor marketing; ATO, OAuth and sensitive data |

## Review, ownership and downstream disposition

- **Changed catalog IDs proposed:** `aegisai`, `sublime-security`, `ocean-security`, `strongestlayer` (vendor and corresponding product candidates); new primary source entries; **no** feature claims or direct-competition relationships.
- **Existing category:** `email-security`. Adjacent categories considered only where clear in official evidence; broader buyer scenarios remain in this document.
- **Parent/product/historical brands:** no documented acquisitions or rename events asserted; company and product names kept distinct. Similar names such as unrelated Aegis AI services must not be merged.
- **Publication gate:** named human reviewer, approval and CI on exact PR head required before merge; deployed pages and citations must be checked separately. Research candidates never imply verified product parity.
- **Unknowns:** independent efficacy, pilot cohort, feature tier, true inline enforcement, pricing for most vendors, model-processing/data residency, full MSSP multi-tenancy/partnership terms.
- **Consumer disposition (as of 2026-11-05):** Security Market Map — `update proposed` in draft PR; private career/interview notes — `no change`; Account Signal Engine and GTM Revenue OS — `defer` pending owner review; no automatic cross-repo or private-data write.
- **Correction/rollback:** amend/remove the proposed source-linked entries in a reviewed PR, preserving history and review reason; no deployed state exists from creating this branch alone.

## Review checklist

- [x] Original vendor sources and date/claim labels recorded.
- [x] Existing category, Abnormal and overlapping PRs checked.
- [x] Distinctions and explicit Unknowns; no private interview/customer data.
- [ ] Human reviewer and editorial decision.
- [ ] `npm run test:research-integrity` and `npm test` on exact commit.
- [ ] `npx next typegen`, `npm run typecheck`, `npm run lint`, `npm run build`.
- [ ] Merge approval; publication/deployment URL and page-level verification.
