---
id: "ndr"
type: "category"
name: "Network detection and response"
layer: "core"
vendors: 7
---

# Network detection and response

Detection from network traffic and metadata. This map keeps it as its own category beside endpoint detection. A firewall log in a SIEM is not the same purchase.

**Buyer question:** What can we see on the wire that the endpoint agent will miss?

**Usual owner:** SOC or network security.

**Budget source:** Detection, sometimes the network budget.

## Owning seats

- Threat hunter (`threat-hunter`)
- Network security (`network-security`)
- OT / ICS security (`ot-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- ExtraHop: Network detection and response candidate. Not a firewall and not an endpoint agent.
- Vectra AI: Network detection vendor also discussed for identity signals. No detection claim is checked.
- Corelight: Network evidence vendor on NDR shortlists. Treat it as telemetry until a detection page is sourced.
- Darktrace: Network detection incumbent. A shortlist name, not a sourced comparison with ExtraHop or Vectra.

## Vendors (adjacent)

- Illumio
- Claroty
- Nozomi Networks

## What buyers do instead

- Open-source network IDS and flow logs. Good enough when: A small network and a skilled analyst. Breaks when: Encrypted traffic, east-west visibility, and alert volume outgrow it. — hypothesis
- Rely on endpoint and identity telemetry. Good enough when: Most assets run an endpoint agent. Breaks when: Unmanaged devices, OT, or lateral movement hide where agents don't run. — hypothesis

## Objections

- "We need to fix telemetry before adding tools." — hypothesis
- "Our firewall vendor already covers this." — hypothesis
- "We can't risk downtime on the plant floor." — hypothesis

## Triggers

- Unmanaged devices
- East-west traffic the EDR never sees

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
