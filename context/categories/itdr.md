---
id: "itdr"
type: "category"
name: "Identity threat detection and posture (ITDR, ISPM)"
layer: "core"
vendors: 20
---

# Identity threat detection and posture (ITDR, ISPM)

Finding identity weaknesses before they are used (posture, often sold as ISPM: IdP and directory misconfiguration, MFA gaps, dormant or orphaned accounts, shadow admins) and detecting, investigating, and responding to identity-based attacks (token theft, directory attacks, privilege abuse, attack paths). Posture finds the weakness; detection catches its abuse. Neither replaces joiner-mover-leaver or effective cloud permissions.

**Buyer question:** Where is our identity estate weak, and how do we see and stop an attacker using a real identity?

**Usual owner:** Identity security or detection engineering, often beside the SOC.

**Budget source:** Identity security, SecOps, or exposure management; posture may arrive bundled with an IdP. Not the IGA implementation budget.

## Owning seats

- Identity security lead (`identity-security`)
- Cloud security (`cloud-sec`)
- SOC manager (`soc-lead`)
- Detection engineer (`detection-engineer`)
- Incident responder (`incident-response`)

## Who vendors sell to

From 7 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- Identity security lead (`identity-security`): 6 of 7 vendors
- Incident responder (`incident-response`): 1 of 7 vendors
- IT operations / systems administrator (`it-operations`): 1 of 7 vendors
- SOC analyst (`soc-analyst`): 1 of 7 vendors
- SOC manager (`soc-lead`): 1 of 7 vendors

## Vendors (primary)

- CrowdStrike: Endpoint and XDR vendor. The Falcon homepage retrieved 26 Oct 2026 describes endpoint detection and response as detecting and prioritizing malicious activity. Identity Protection is a module name on that page, so no ITDR cell is filled.
- Silverfort: Identity protection vendor buyers shortlist for ITDR, including environments that are hard to agent. Capabilities unverified here.
- Semperis: Identity threat detection and recovery vendor associated with directory environments. Confirm Active Directory versus Entra scope before a comparison.
- SpecterOps: BloodHound is an attack-path tool for identity. Useful beside ITDR and privileged access. Not an IGA product.
- SentinelOne: Homepage retrieved 26 Oct 2026 describes endpoint and identity protection in one agent, and says the platform detects, contains, and responds. That detection sentence is not an endpoint-only cell and not an ITDR cell.
- AuthMind: AuthMind markets identity observability: correlating access-path activity of human, non-human and AI agent identities across cloud, SaaS and on-premises.
- SpyCloud: SpyCloud connects recovered breach and infostealer data to customer watchlists for investigation.

## Vendors (adjacent)

- Microsoft
- Okta
- Veza
- Entro Security
- Wiz
- Abnormal Security
- Vectra AI
- DTEX Systems
- Obsidian Security
- Orchid Security
- Push Security
- Searchlight Cyber
- Material Security

## What buyers do instead

- Posture reports and scores inside the IdP. Good enough when: One IdP holds nearly every account and admin. Breaks when: Several IdPs, on-premises directories, cloud, and SaaS each hold part of the same identity. — hypothesis
- Scripts and periodic audits of MFA and stale accounts. Good enough when: One directory and an engineer who runs the scripts every quarter. Breaks when: Findings need continuous tracking, an owner per fix, and evidence for auditors. — hypothesis
- Identity detections written in the SIEM. Good enough when: A strong detection team and clean identity logs. Breaks when: Identity attack paths and posture need context the SIEM doesn't hold. — hypothesis

## Objections

- "Our identity provider covers this." — hypothesis

## Triggers

- Token theft
- Directory incident
- MFA coverage question from the board or an auditor
- EDR vendor pitching identity
- Attack-path assessment
- A breach or near-miss starts with stolen or abused credentials.
- The MDR provider misses an incident or can't cover cloud and identity.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
