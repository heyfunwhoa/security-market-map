---
id: "microsegmentation"
type: "category"
name: "Microsegmentation"
layer: "core"
vendors: 3
---

# Microsegmentation

Workload-to-workload policy, usually sold apart from the perimeter firewall. This map keeps it as its own category. It does not decide which human may sign in.

**Buyer question:** Which workloads may talk, and how is that policy enforced after the firewall?

**Usual owner:** Network security or cloud security.

**Budget source:** Network or cloud. Not the identity budget.

## Owning seats

- Network security (`network-security`)
- OT / ICS security (`ot-security`)

## Vendors (primary)

- Illumio: Microsegmentation vendor. Not a perimeter firewall and not an identity provider.
- TrustFour: SACR's 2024 NHI guide describes TrustFour as workload and machine zero trust, and the ecosystem graphic places it in microsegmentation. Neither claim is checked.

## Vendors (adjacent)

- Akamai

## What buyers do instead

- VLANs and firewall rules. Good enough when: A simple network with few east-west flows. Breaks when: Ransomware lateral movement or audit scope reduction needs workload-level policy. — hypothesis
- Cloud security groups only. Good enough when: Workloads are all in one cloud. Breaks when: Hybrid estates need consistent policy across data center and cloud. — hypothesis

## Objections

- "Our firewall vendor already covers this." — hypothesis

## Triggers

- Flat networks
- Ransomware moving east-west

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
