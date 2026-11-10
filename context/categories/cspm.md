---
id: "cspm"
type: "category"
name: "Cloud posture (CSPM)"
layer: "core"
vendors: 11
---

# Cloud posture (CSPM)

Misconfiguration of cloud control planes: public storage, open security groups, missing logging. Not CIEM, though the same CNAPP may sell both, and not SCA.

**Buyer question:** Which cloud settings are unsafe, and who owns the account?

**Usual owner:** Cloud security.

**Budget source:** CNAPP or cloud security.

## Owning seats

- Cloud security (`cloud-sec`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Wiz: CNAPP vendor. Cloud entitlement conversations often happen here. That is adjacent budget to IGA, not a certification suite, unless a sourced claim says otherwise. Wiz markets a DSPM solution for cloud data security. Vendor-reported DSPM scope reviewed 2026-10-13.
- Orca Security: Homepage retrieved 26 Oct 2026 says the platform unifies cloud posture and evaluates paths that include misconfigurations. Code, secrets, identity permissions, and data are named on the same page and are not separate cells.

## Vendors (adjacent)

- Tenable
- Qualys
- Sonrai Security
- Censys
- JupiterOne
- Lacework
- Uptycs
- Gomboc
- Normalyze

## What buyers do instead

- Cloud provider native posture tools. Good enough when: One cloud and a team that lives in that console. Breaks when: Multiple clouds or prioritization across many accounts. — hypothesis

## Objections

- "We already have more findings than we can fix." — hypothesis
- "Our cloud provider's native tools are enough." — hypothesis

## Triggers

- Public bucket
- Multi-account sprawl
- A major cloud migration or a second cloud provider.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
