# Material Security — email and workspace protection (2026-11-05)

**Canonical vendor:** Material Security, https://material.security/  
**Product in map:** `material-email-security`, displayed as “Material Email Security and Workspace Protection.”  
**Status:** vendor-source-backed candidate research. Editorial review and tenant-specific validation pending. This is not a certified capability matrix or a product ranking.

## Buyer problem and market placement

**Primary category:** existing `email-security`, because Material markets detection and remediation of phishing, BEC, impersonation and fraud in Microsoft 365 and Google Workspace.  
**Adjacent categories:** `itdr` (account takeover, OAuth grant/forwarding changes, sensitive message access) and `dlp` (email sensitive-content protections). Account security and DLP are **distinct funded jobs**, not automatic parity with specialized identity, DLP or DSPM platforms.  
**Buyer:** messaging/IT security and SOC; broader cloud-workspace security, data security and identity owners may join the evaluation.

## Vendor-documented features by functional boundary

- **Inbound email:** detects phishing, BEC, VIP impersonation, vendor compromise, malicious links and invoice fraud; uses a provider API without MX record changes. `Vendor-reported` [M1].
- **Investigation and response:** automated user-reported phishing triage, similarity-based related-message remediation, email hunting and custom detections are listed in public company material. Action timing and p95 exposure have not been measured independently [M1, M3].
- **Account and identity:** watches account activity, forwarding, risky OAuth grants and sensitive-content behavior. Vendor says message-level controls can protect sensitive content after an account has been compromised [M2, M3].
- **Workspace data:** shared-drive security and sensitive email/file content controls are broader than inbound mail filtering; content analysis and OAuth remediation differ between Essentials and Advanced. Need tenant-specific configuration review [M3].
- **Commercial:** source lists Essentials **$4/user/month** and Advanced **$6/user/month** (annual billing), **plus Shared Drive size fee**; ATO Resilience **+$3/user/month** add-on or **$5/user/month** standalone. Service/shared/low-volume account treatment and enterprise discounts depend on quote. These are **vendor-published list indications**, not an actual quote [M3].
- **Deployment:** vendor describes shared (multi-tenant) and dedicated (single-tenant) options. **Do not infer provider-operated MSSP tenancy, resale rights or margin** from those cloud-hosting terms [M3].

## Distinct from the API-native phishing competitors

| Buyer decision | Material research position | Comparison boundary |
| --- | --- | --- |
| Prevent BEC and malicious inbound email | Email controls are explicitly marketed [M1] | Evaluate with AegisAI, Sublime, Ocean, StrongestLayer and Abnormal on the *same* authorized mail corpus |
| Reduce phishing-report triage | Report triage and campaign remediation are marketed [M1, M3] | Need reporter outcomes, SOC queue minutes, cross-mailbox action logs and false positive recovery |
| Limit impact when mailbox is compromised | Account/identity and message-level controls marketed [M2, M3] | Adjacent to specialized ITDR and data security; it is not a claim of complete PAM or NHI parity |
| Consolidate email, sensitive data and cloud workspace controls | Publicly differentiated Essentials / Advanced / ATO licensing [M3] | Include Shared Drive and support fees, existing Microsoft entitlements, and implementation costs before TCO claim |

**Likely wedge (hypothesis):** buyer wants email threat protection and to constrain the consequences of a compromised M365/Google account without buying multiple separate tools. **Disconfirm:** production proof shows little incremental risk reduction, no rights to data/action needed, or bundled economics do not beat the current stack.

## Evaluation questions

1. For a payment-change BEC, what is the **delivery → detection → quarantine/deletion** time distribution, including p95 and possible race window?
2. Which account takeover actions require delegated identity rights, and what events remain protected if the attacker controls the mailbox?
3. Which user, shared, service and low-activity mailboxes count for licensing? What Shared Drive storage and support fees apply?
4. Are sensitive content, OAuth remediation and ATO Resilience in the actual purchased plan? Which actions are audit-only or controlled by approval?
5. What is the support for customers served by an MSSP/MDR: delegated tenants, billing, data isolation, contractual resale and customer ownership?

## Sources and editorial record

- **[M1]** [Email Security](https://material.security/product/email), Material Security, vendor marketing, publication date Unknown, observed 2026-11-05.
- **[M2]** [Account Security](https://material.security/product/accounts), Material Security, vendor marketing, publication date Unknown, observed 2026-11-05.
- **[M3]** [Public Pricing / Feature Matrix](https://material.security/pricing), Material Security, vendor marketing, publication date Unknown, observed 2026-11-05.

**Owner:** Security Market Map maintainer. **Reviewer / decision:** unassigned / pending. **Next editorial check:** 2026-12-05 or on a material licensing/release change. **Rights:** short factual paraphrase and original links only; no proprietary reports or private account details.

**Unknown:** independent detection efficacy, actual deployment/control latency, contract add-ons and quote, partner/MSSP margin, comprehensive edition matrix, data residency.  
**Parent/product/historical names:** Material Security vendor; named product coverage as per public page, no acquisition/rename asserted.  
**Consumer disposition:** proposed candidate in Security Market Map PR; other systems deferred. No cross-repo sync.

See [email-security market landscape and function matrix](../../docs/market-research/agentic-email-security-2026-11-05.md).
