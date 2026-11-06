# AegisAI - email security candidate (2026-11-05)

**Canonical entity:** AegisAI, https://www.aegisai.com/  
**Stage:** Researched; human review pending. Published vendor claims, not independent head-to-head proof.  
**Buyer decision:** Defend Microsoft 365 / Google Workspace against contextual spear phishing, BEC, phishing URLs and attachments while controlling false positives and time exposed.  
**Primary map category:** `email-security`. **Adjacent, not claimed parity:** `itdr` where account takeover is separately evaluated; `dlp` and `security-awareness` only after edition/availability review.

## Product and architecture
- **Vendor-reported:** specialized investigation agents assess reputation, headers, intent, links and attachments. Connect via Microsoft 365 or Google Workspace API without MX changes. Platform advertises a 1.9-second median verdict, not a verified p95 time-to-removal guarantee. [Platform](https://www.aegisai.com/platform)
- **Important timing conflict to qualify:** October Proteus announcement says investigation before the inbox; vendor's [phishing prevention FAQ](https://www.aegisai.com/platform/email-phishing-prevention) explicitly says **detonation and removal happen after delivery**. Never sell or compare this as an inline gateway without observed timestamps. [2026-10-08 release](https://www.prnewswire.com/news-releases/aegisai-launches-proteus-the-first-foundational-model-for-email-security-that-investigates-every-email-like-a-security-analyst-before-it-reaches-the-inbox-302901929.html)
- **Product-scope limits:** platform labels ATO **early access**, and illustrates DLP in audit mode, simulation notice-only and red-team lures requiring approval under example permission settings. Verify configuration and paid entitlement before describing enforcement. [Platform](https://www.aegisai.com/platform)
- **Company signal:** vendor announced $36M Series A and $49M total on 2026-07-23, not independently audited recurring revenue. [Release](https://www.prnewswire.com/news-releases/aegisai-raises-36-million-series-a-led-by-battery-ventures-to-fight-the-new-wave-of-ai-spear-phishing-302833624.html)

## Competitive hypotheses, not facts
- **Against Sublime:** model-led investigation versus organization-authored/backtested detection logic and deployment control. Compare auditability and production workload, not "AI" labels.
- **Against Abnormal:** purpose-built model and investigation versus per-identity behavioral baseline. Both can be evaluated for the same buyer job; differential efficacy is untested here.
- **Against incumbent SEG/native mail:** potential coverage for payload-less or AI-crafted BEC, **only** if measured against live authorized traffic and response timing.

## Commercial and proof gaps
Public per-mailbox price, minimums, license/agent SKUs, DLP and ATO general availability, managed-service/resale rights, multi-tenancy, independent efficacy, exact remediation timing and regional data residency: **Unknown**. The vendor's >99% Proteus benchmark is vendor-reported on a selected 3,020-attack corpus, not a customer-verified comparative production rate.

## What to ask
1. For an email delivered at T0, show timestamps for first mailbox visibility, verdict, quarantine/removal and rollback (median plus p95).
2. What are the required OAuth scopes and permissions in monitor and enforce modes? Which features are GA vs early access?
3. Show false-positive and true-positive adjudication on the same consented data as existing M365/Google and SEG, without cherry-picking.
4. Does a partner get separate customer tenants, delegated admin, resale rights, minimums and supported pricing?

**Evidence:** Original product/FAQ and dated releases above, checked 2026-11-05; publisher is AegisAI, source type vendor marketing / press release. Published dates for undated platform pages: Unknown.  
**Next review:** 2026-12-05 or earlier if Proteus/ATO/deployment status changes. **Owner/reviewer:** repository maintainer / unassigned. **Rights:** short paraphrases plus links.  
**Disposition:** Research proposal in [email security landscape](../../docs/market-research/agentic-email-security-2026-11-05.md); typed candidate is not a reviewed capability claim; no private interview information.
