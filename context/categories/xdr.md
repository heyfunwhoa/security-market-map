---
id: "xdr"
type: "category"
name: "Extended detection and response"
layer: "core"
vendors: 5
---

# Extended detection and response

Detection and response sold together across more than the endpoint. This map does not treat that name as a SIEM replacement, and it does not treat it as an identity provider.

**Buyer question:** Which signals are correlated, and who is allowed to contain a host or an account?

**Usual owner:** SOC, often with the endpoint owner.

**Budget source:** SecOps or the endpoint renewal. Confirm which one is actually funding it.

## Owning seats

- SOC manager (`soc-lead`)
- Detection engineer (`detection-engineer`)
- SOC analyst (`soc-analyst`)
- Incident responder (`incident-response`)
- Threat hunter (`threat-hunter`)
- Digital forensics (`digital-forensics`)
- MSSP / MDR operations lead (`mssp-ops`)

## Vendors (primary)

_None recorded._

## Vendors (adjacent)

- Arctic Wolf
- Red Canary
- ExtraHop
- Vectra AI
- Darktrace

## What buyers do instead

- Keep EDR and SIEM separate. Good enough when: Established SIEM and detection team. Breaks when: Analysts drown in context switching and correlation across tools. — hypothesis
- Buy outcomes from an MDR instead. Good enough when: No SOC and no plan to build one. Breaks when: The team wants control of detections and data. — hypothesis

## Objections

- "Analysts don't need another console." — hypothesis
- "The per-tenant cost kills our margin." — hypothesis

## Triggers

- Too many consoles
- Endpoint renewal that now includes identity

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
