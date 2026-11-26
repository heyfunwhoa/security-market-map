---
id: "deception"
type: "category"
name: "Deception and decoys"
layer: "core"
vendors: 2
---

# Deception and decoys

Decoy hosts, services, credentials, files and cloud keys placed where legitimate users have no reason to go, so that any touch is a strong signal of an intruder. A honeytoken alert says someone used the decoy; it does not by itself say how they got in or what else they reached.

**Buyer question:** Can we get alerts that are almost never false positives, without deploying agents everywhere?

**Usual owner:** SOC lead, threat hunting or detection engineering; identity security for credential decoys.

**Budget source:** SecOps. Increasingly bundled into EDR, XDR or identity platforms; verify with the buyer.

## Owning seats

- SOC manager (`soc-lead`)
- Threat hunter (`threat-hunter`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Thinkst Applied Research: Thinkst sells Canary decoy devices and services and offers Canarytokens, free tripwires such as fake documents, API keys and DNS names that alert when touched.
- Acalvio: Acalvio markets ShadowPlex as an agentless deception platform that deploys decoys and honeytokens across identity, cloud, network, endpoints and OT.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- Free honeytokens and open-source honeypots. Good enough when: A few tripwires in known places and someone to watch the alerts. Breaks when: Decoys need to be deployed, rotated and kept realistic across many environments. — hypothesis
- Decoy features inside the EDR, XDR or identity platform. Good enough when: The platform already covers the assets that matter. Breaks when: Decoys are needed on unmanaged, cloud or OT assets the platform doesn't reach. — hypothesis

## Objections

_None recorded._

## Triggers

- Alert fatigue and low-fidelity detections
- Concern about lateral movement on unmanaged or OT assets
- Red-team findings that went undetected

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
