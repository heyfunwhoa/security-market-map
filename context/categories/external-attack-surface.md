---
id: "external-attack-surface"
type: "category"
name: "External attack surface"
layer: "core"
vendors: 5
---

# External attack surface

Discovery of internet-facing assets and the exposures on them. This map keeps that search separate from a missing-patch scan on a known server, and separate from a search for abuse of a brand the organization already knows.

**Buyer question:** What is exposed that our asset list does not mention?

**Usual owner:** Exposure management or the vulnerability team.

**Budget source:** Exposure or VM. Confirm it is not being bought as a patch scanner.

## Owning seats

- Threat intelligence analyst (`threat-intel`)
- Exposure / attack-surface owner (`exposure-management`)

## Vendors (primary)

- Censys: External attack-surface vendor. Discovery of internet-facing assets, not a patch scanner by assumption.
- CyCognito: External attack-surface vendor. Discovery of exposed assets, not a patch scanner by assumption.

## Vendors (adjacent)

- BitSight
- XM Cyber
- ZeroFox

## What buyers do instead

- Periodic scans with open-source tools. Good enough when: A known, small set of domains and IPs. Breaks when: Acquisitions, shadow IT, and cloud sprawl make the surface unknown. — hypothesis

## Objections

_None recorded._

## Triggers

- An acquisition
- An unknown exposed service
- An acquisition brings in new code, cloud accounts, and identities.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
