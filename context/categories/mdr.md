---
id: "mdr"
type: "category"
name: "Managed detection and response"
layer: "core"
vendors: 5
---

# Managed detection and response

A provider watches alerts and responds under a contract. The technology may be theirs or the customer's. MDR is an operating model. It is not proof that a particular detection exists.

**Buyer question:** Who is on the hook after hours, and which actions may they take without us?

**Usual owner:** CISO or SOC manager.

**Budget source:** SecOps services, separate from a software subscription even when the same logo sells both.

## Owning seats

- SOC manager (`soc-lead`)
- Incident responder (`incident-response`)
- MSSP / MDR operations lead (`mssp-ops`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Arctic Wolf: Managed detection and response vendor. The contract is the product. No detection content is checked here.
- Expel: Managed detection vendor often brought in beside an existing EDR or SIEM. Not assumed to replace that tool.
- Red Canary: Managed detection vendor on MDR shortlists. Capabilities unverified.
- Secureworks: Managed detection and security-services incumbent. Confirm whether the conversation is MDR or consulting.

## Vendors (adjacent)

- Flashpoint

## What buyers do instead

- Build an in-house 24x7 SOC. Good enough when: Large enterprise with budget for shifts and retention. Breaks when: Hiring, burnout, or coverage gaps on nights and weekends. — hypothesis

## Objections

- "Our IR retainer covers this." — hypothesis
- "The per-tenant cost kills our margin." — hypothesis

## Triggers

- No overnight coverage
- An EDR renewal that adds a service
- The MDR provider misses an incident or can't cover cloud and identity.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
