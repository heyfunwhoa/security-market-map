---
id: "email-security"
type: "category"
name: "Email security"
layer: "core"
vendors: 15
---

# Email security

Inbound and outbound mail controls: phishing, impersonation, and data leaving by email. A secure email gateway and an API-based detection product are different architectures.

**Buyer question:** How does a malicious or fraudulent message get stopped before someone acts on it?

**Usual owner:** IT security, often with the messaging team.

**Budget source:** Email security, inside IT security.

## Owning seats

- IT / corporate security (`it-security`)
- Insider risk (`insider-risk`)
- Security awareness / people security (`security-awareness`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Proofpoint: Homepage retrieved 26 Oct 2026 describes collaboration, data, and AI security, including discovery of AI apps and agents and runtime policy. That page does not describe an email gateway. Not an identity threat product unless a specific SKU is sourced.
- Abnormal Security: Homepage retrieved 26 Oct 2026 describes a behavioral platform for email, identity, and AI security. An identity graph lists humans, service accounts, and AI agents and is not an NHI inventory cell. The page does not say whether mail is held at a gateway or read by API.
- Mimecast: Homepage retrieved 26 Oct 2026 names email threat protection and says email security is where the company started. The page does not describe a quarantine or a block.
- dmarcian: dmarcian helps domain owners interpret mail authentication reports and investigate sending sources.
- Material Security: Vendor positions cloud-workspace email threat detection alongside account-takeover and sensitive-message protection for Microsoft 365 and Google Workspace. Mailbox and account controls are distinct from inline message enforcement; product tier and actual outcomes require buyer-specific review. Researched 2026-11-05.
- AegisAI: Vendor describes purpose-built investigation models and AI agents for targeted phishing and BEC on Microsoft 365 / Google Workspace via API. The vendor's technical FAQ says remediation follows delivery; no proven inline pre-delivery guarantee. Researched 2026-11-05.
- Sublime Security: Vendor documents programmable MQL email detection, ASA/ADE agents, default post-delivery API processing and optional Enterprise inline protection, plus managed and authorized AWS self-hosting. Research candidate; source recheck 2026-11-06, outcomes untested.
- Ocean: Vendor describes agent-based investigation of targeted email attacks, SOC user-report triage and employee guidance. Delivery/remediation timing, independent efficacy and commercial terms are not established in this map. Researched 2026-11-05.
- StrongestLayer: Vendor describes TRACE reasoning across email intent and organizational context, with an API connection and structured SOC evidence. Claimed ~30-second verdict is not independently measured. Researched 2026-11-05.

## Vendors (adjacent)

- KnowBe4
- Forcepoint
- Virtru
- Adaptive Security
- Jericho Security
- Hoxhunt

## What buyers do instead

- Native filtering in the email platform. Good enough when: Commodity spam and malware are the main problem. Breaks when: Targeted phishing, business email compromise, or account takeover get through. — hypothesis
- Train users to report phishing. Good enough when: Low volume of targeted attacks and a strong reporting culture. Breaks when: Losses from wire fraud or credential phishing happen despite training. — hypothesis

## Objections

_None recorded._

## Triggers

- Business-email compromise
- Gateway renewal

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
