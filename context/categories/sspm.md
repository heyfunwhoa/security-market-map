---
id: "sspm"
type: "category"
name: "SaaS security posture"
layer: "core"
vendors: 8
---

# SaaS security posture

Posture of sanctioned SaaS: configuration, third-party apps, and OAuth grants. Shortlists also print CASB in this box. A gateway that proxies traffic is not the same product as a configuration check. It overlaps non-human identity when the question is which app holds a token. It does not replace IGA.

**Buyer question:** Which SaaS apps are connected, and which grants should not still be standing?

**Usual owner:** SaaS security, identity, or IT security.

**Budget source:** SaaS security or identity. Ask which budget is in the room.

## Owning seats

- SaaS security (`saas-security`)

## Vendors (primary)

- AppOmni: SaaS and AI security vendor. The homepage describes discovery of SaaS and AI in use, who has access, unsanctioned apps, and shadow agents, plus response actions such as revoking access. It does not describe an NHI owner or a decommission cell. Integration counts and customer quotations are not adopted.
- Grip Security: SaaS and AI control vendor. The homepage says Grip builds an app inventory and links assets to identities. It does not describe an NHI owner or a decommission cell. Ratings, savings figures, and customer quotations are not adopted.
- Spin.AI: SaaS security vendor named beside AppOmni and Zscaler. Not an identity provider.
- Obsidian Security: SaaS security vendor. Posture and threat detection are different claims. Neither is checked.
- Adaptive Shield: SaaS security vendor named beside AppOmni. Ownership was not re-checked.

## Vendors (adjacent)

- Zluri
- Zscaler
- Strac

## What buyers do instead

- Periodic manual reviews of SaaS admin settings. Good enough when: A few critical SaaS apps with known admins. Breaks when: Dozens of apps, third-party integrations, and drift between reviews. — hypothesis
- Rely on CASB or SSE visibility. Good enough when: Main concern is user traffic to SaaS. Breaks when: Misconfigured SaaS settings and OAuth integrations aren't visible in traffic. — hypothesis

## Objections

- "Business teams own those SaaS apps, not us." — hypothesis

## Triggers

- A marketplace app with broad scopes
- Shadow SaaS

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
