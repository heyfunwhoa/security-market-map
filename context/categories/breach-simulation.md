---
id: "breach-simulation"
type: "category"
name: "Breach and attack simulation"
layer: "core"
vendors: 4
---

# Breach and attack simulation

Platforms that safely run attacker techniques to see whether controls detect or block them. A control that was never tested is a claim. This category tests the claim. No vendor here has a capability checkmark yet.

**Buyer question:** Which techniques do our controls actually see?

**Usual owner:** Detection engineering or offensive security.

**Budget source:** Security validation, beside the SOC.

## Owning seats

- Security validation / offensive (`offensive-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- AttackIQ: Breach and attack simulation vendor. A missed technique is a detection gap, not a product failure you can assert without a test.
- Pentera: Security validation vendor on breach-simulation shortlists beside AttackIQ. Results are not evidence about a specific control.
- XM Cyber: XM Cyber markets continuous exposure management (attack-path analysis that supports a CTEM program) built on an attack graph that chains vulnerabilities, misconfigurations and identity exposures into attack paths.

## Vendors (adjacent)

- Rapid7

## What buyers do instead

- Annual pentest or red team engagement. Good enough when: Controls change slowly and one test a year satisfies stakeholders. Breaks when: Teams need to know whether controls still work after every change. — hypothesis
- Open-source attack simulation frameworks. Good enough when: A detection engineer has time to run and maintain tests. Breaks when: Coverage, reporting, and safe scheduling across the estate become too much work. — hypothesis

## Objections

- "We already find more than we can get fixed." — hypothesis

## Triggers

- A control that looks good in a dashboard
- Purple-team program

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
