---
id: "itdr"
type: "category"
name: "Identity threat detection (ITDR)"
layer: "core"
vendors: 11
---

# Identity threat detection (ITDR)

Detection, investigation, and response for identity-based attacks: token theft, directory attacks, privilege abuse, and attack paths. ITDR does not replace joiner-mover-leaver.

**Buyer question:** How do we see and stop an attacker using a real identity?

**Usual owner:** Detection engineering or identity security, often beside the SOC.

**Budget source:** SecOps or identity threat, not the IGA implementation budget.

## Owning seats

- Identity security lead (`identity-security`)
- Cloud security (`cloud-sec`)
- SOC manager (`soc-lead`)
- Detection engineer (`detection-engineer`)
- Incident responder (`incident-response`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- CrowdStrike: Endpoint and XDR vendor. The Falcon homepage retrieved 26 Oct 2026 describes endpoint detection and response as detecting and prioritizing malicious activity. Identity Protection is a module name on that page, so no ITDR cell is filled.
- Silverfort: Identity protection vendor buyers shortlist for ITDR, including environments that are hard to agent. Capabilities unverified here.
- Semperis: Identity threat detection and recovery vendor associated with directory environments. Confirm Active Directory versus Entra scope before a comparison.
- SpecterOps: BloodHound is an attack-path tool for identity. Useful beside ITDR and privileged access. Not an IGA product.
- SentinelOne: Homepage retrieved 26 Oct 2026 describes endpoint and identity protection in one agent, and says the platform detects, contains, and responds. That detection sentence is not an endpoint-only cell and not an ITDR cell.

## Vendors (adjacent)

- Entro Security
- Wiz
- Abnormal Security
- Vectra AI
- DTEX Systems
- Obsidian Security

## What buyers do instead

- Identity detections written in the SIEM. Good enough when: A strong detection team and clean identity logs. Breaks when: Identity attack paths and posture need context the SIEM doesn't hold. — hypothesis

## Objections

- "Our identity provider covers this." — hypothesis

## Triggers

- Token theft
- Directory incident
- EDR vendor pitching identity
- Attack-path assessment
- A breach or near-miss starts with stolen or abused credentials.
- The MDR provider misses an incident or can't cover cloud and identity.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
