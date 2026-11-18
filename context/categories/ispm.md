---
id: "ispm"
type: "category"
name: "Identity security posture management (ISPM)"
layer: "core"
vendors: 9
---

# Identity security posture management (ISPM)

Continuous assessment of the identity estate itself: IdP and directory misconfiguration, MFA and authentication gaps, dormant and orphaned accounts, shadow admins, and risky trust across identity systems. It finds and prioritizes weaknesses before an attacker uses them. CIEM measures effective cloud permissions. ITDR detects active abuse. IGA certifies and removes access. ISPM sits between them and often feeds all three.

**Buyer question:** Where is our identity estate weak right now, and which fix removes the most risk?

**Usual owner:** Identity security or IAM, sometimes the security architect or a posture or exposure-management owner.

**Budget source:** Identity security or exposure management. It may be bundled into an IdP, ITDR, or CNAPP purchase. Ask which.

## Owning seats

- Identity security lead (`identity-security`)

## Who vendors sell to

From 4 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- Identity security lead (`identity-security`): 3 of 4 vendors
- IT operations / systems administrator (`it-operations`): 1 of 4 vendors

## Vendors (primary)

- AuthMind: AuthMind markets identity observability: correlating access-path activity of human, non-human and AI agent identities across cloud, SaaS and on-premises.
- Orchid Security: Orchid markets discovery of unmanaged apps, hidden authentication flows and ungoverned access, with posture across self-hosted and SaaS applications.

## Vendors (adjacent)

- Microsoft
- Okta
- Veza
- CrowdStrike
- Silverfort
- Semperis
- Push Security

## What buyers do instead

- Posture reports and scores inside the IdP. Good enough when: One IdP holds nearly every account and admin. Breaks when: Several IdPs, on-premises directories, cloud, and SaaS each hold part of the same identity. — hypothesis
- Posture checks bundled in the ITDR product. Good enough when: The ITDR product already sees the directories that matter. Breaks when: SaaS, cloud, and machine accounts sit outside what the ITDR sensor reads. — hypothesis
- Scripts and periodic audits of MFA and stale accounts. Good enough when: One directory and an engineer who runs the scripts every quarter. Breaks when: Findings need continuous tracking, an owner per fix, and evidence for auditors. — hypothesis

## Objections

_None recorded._

## Triggers

- Identity-based breach or IdP incident in the news
- MFA coverage question from the board or an auditor
- IdP consolidation or merger exposing multiple directories
- ITDR alert volume with no prevention story

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
