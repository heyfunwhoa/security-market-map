---
id: "endpoint-security"
type: "category"
name: "Endpoint security"
layer: "core"
vendors: 9
---

# Endpoint security

Prevention and detection on laptops, servers, and other devices. EDR is the usual product. It is not an identity provider, even when it consumes identity signals.

**Buyer question:** What runs on the device, and who responds when it is compromised?

**Usual owner:** IT security or the SOC.

**Budget source:** Endpoint or IT security.

## Owning seats

- CISO / VP of security (`ciso`)
- IT / corporate security (`it-security`)
- SOC analyst (`soc-analyst`)
- Incident responder (`incident-response`)
- Digital forensics (`digital-forensics`)
- Insider risk (`insider-risk`)
- Cyber recovery / resilience (`cyber-recovery`)

## Who vendors sell to

From 3 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- IT operations / systems administrator (`it-operations`): 3 of 3 vendors
- IT / corporate security (`it-security`): 2 of 3 vendors
- SOC manager (`soc-lead`): 2 of 3 vendors
- SOC analyst (`soc-analyst`): 1 of 3 vendors

## Vendors (primary)

- CrowdStrike: Endpoint and XDR vendor. The Falcon homepage retrieved 26 Oct 2026 describes endpoint detection and response as detecting and prioritizing malicious activity. Identity Protection is a module name on that page, so no ITDR cell is filled.
- SentinelOne: Homepage retrieved 26 Oct 2026 describes endpoint and identity protection in one agent, and says the platform detects, contains, and responds. That detection sentence is not an endpoint-only cell and not an ITDR cell.

## Vendors (adjacent)

- AttackIQ
- Fortinet
- Check Point
- Expel
- Axonius
- Neo Security
- Fortra

## What buyers do instead

- Operating system built-in antivirus. Good enough when: Small fleet with low risk and no EDR requirement from insurers or customers. Breaks when: Insurers, customers, or an incident require detection and response, not just prevention. — hypothesis
- MDR provider brings its own endpoint agent. Good enough when: No in-house SOC and endpoints are the main concern. Breaks when: The team wants to own detections, switch providers, or cover servers and cloud the same way. — hypothesis

## Objections

- "My team will end up supporting this." — hypothesis

## Triggers

- EDR renewal
- Ransomware
- Unmanaged servers

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
