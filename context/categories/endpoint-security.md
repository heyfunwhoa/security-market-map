---
id: "endpoint-security"
type: "category"
name: "Endpoint security"
layer: "core"
vendors: 19
---

# Endpoint security

An endpoint protection platform (EPP) enforces policy on laptops and servers and can block or quarantine a file. Endpoint detection and response (EDR) records device activity so analysts can investigate an alert, scope affected hosts and take action. A single endpoint suite can provide both.

**Buyer question:** Can we show what the endpoint blocked, what actually ran, and who can contain an affected device?

**Usual owner:** IT or endpoint security manages coverage and policy. The security operations center investigates alerts and agrees containment authority with IT.

**Budget source:** Endpoint or IT security typically owns the license. Confirm who funds monitoring and after-hours response.

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
- Broadcom: Broadcom's Carbon Black portfolio includes endpoint detection and response. The Enterprise EDR binary store preserves samples under the customer's upload policy.

## Vendors (adjacent)

- Microsoft
- AttackIQ
- Fortinet
- Check Point
- Expel
- Axonius
- Neo Security
- Fortra
- Binalyze
- Bay
- Backslash Security
- Glow
- Manifold
- Asymptote Labs
- Cisco
- LimaCharlie

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
