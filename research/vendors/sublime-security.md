# Sublime Security - email security candidate (2026-11-05)

**Canonical entity:** Sublime Security, https://sublime.security/  
**Stage:** Researched; human review pending. Vendor-published, not independent test evidence.  
**Primary map category:** `email-security`. **Adjacent:** `dlp`, `security-awareness` (product announcements; verify edition); `itdr` only after evidence of distinct account control.

## Product and architecture
- **Vendor-reported:** programmable detection rules and Message Query Language (MQL), API connection to M365 / Google Workspace, transparent detection decisions and retrospective email hunts. [Overview](https://docs.sublime.security/docs/overview)
- **ASA:** Autonomous Security Analyst investigates user reports and suspicious/unknown messages. Default inactive; passive mode explains/alerts only; active mode can perform configured remediation. Available in Enterprise. [ASA docs](https://docs.sublime.security/docs/asa-autonomous-security-analyst)
- **ADÉ:** Autonomous Detection Engineer drafts organization-specific MQL rules from confirmed misses, backtests historical email and proposes approval. Optional auto-activation above a configurable precision threshold; enterprise offering. A test score is not independently verified precision in production. [ADÉ docs](https://docs.sublime.security/docs/ade-autonomous-detection-engineer)
- **Deployment:** Sublime Cloud or authorized self-hosted AWS / AWS GovCloud; no MX changes. Vendor documents region and processing caveats for agent inference: validate actual data flow and operating costs in selected region. [Installation](https://docs.sublime.security/docs/installation-options), [ADÉ docs](https://docs.sublime.security/docs/ade-autonomous-detection-engineer)
- **As-of 2026:** Email DLP announced GA 2026-09-30, tailored phishing simulations/training GA 2026-10-06; email prompt-injection detection is documented for Enterprise/ASA. [News index](https://sublime.security/topic/sublime-news/), [simulation GA](https://sublime.security/blog/tailored-phishing-simulations-and-training-generally-available/), [prompt-injection docs](https://docs.sublime.security/docs/prompt-injection-detection)

## Commercial and partner position
[Current vendor plans](https://sublime.security/plans-detail/) advertise **Core free for first 100 mailboxes** and quote-only **Enterprise**. A [2026-04-28 partner-program announcement](https://sublime.security/news/) supports partner-program existence, **not** known MSSP white label, multi-tenant SOC console, resale margin, contract minimum, or billing unit. Pricing of DLP, simulations, ASA/ADÉ across offerings needs a live quote.

## Competitive hypotheses, not facts
- **Against AegisAI / Ocean:** programmable rules and backtests versus model-first investigations. Test outcomes and operational hours rather than assuming rules or models are categorically better.
- **Against Abnormal:** customer-controlled detection engineering versus behavioral baselines/managed automation. Buyer may prefer an explainable tuning workflow or a less hands-on operation, depending on staffing and risk tolerance.
- **For service providers:** self-hosted deployment could matter to regulated customers, but it does not prove MSSP margin, delegated administration, or cross-tenant management.

## What to ask
1. Can the SOC review and roll back every ADÉ-approved rule? What happens at uncertain verdicts and in passive mode?
2. What is the real onboarding and tuning load, false-positive remediation and time to action at customer traffic scale?
3. Which editions and regions support ASA, ADÉ, DLP and phishing simulations; which inference data leaves an AWS tenant?
4. What are MSSP partner terms, per-tenant ownership, pricing minimums, renewal true-up and delegated admin?

**Evidence:** vendor official docs, pricing and release pages checked 2026-11-05. Publication dates of undated docs Unknown. **Next review:** 2026-12-05. **Owner/reviewer:** repository maintainer / unassigned. **Rights:** brief paraphrases, original links only.  
**Disposition:** [Email security landscape](../../docs/market-research/agentic-email-security-2026-11-05.md); no automatic source-to-feature claim promotion.
