---
id: "agent-identity"
type: "category"
name: "AI agent identity and runtime authorization"
layer: "core"
vendors: 15
---

# AI agent identity and runtime authorization

Inventory of agents, human delegation, MCP or tool access, gateways, and a decision on each action. An agent that can call tools is not just another service account with a static key.

**Buyer question:** Which agent is this, who authorized it, and what may it do on this call?

**Usual owner:** Identity plus the AI platform owner. Security often gets pulled in after a pilot.

**Budget source:** Unsettled. It may come from IGA, NHI, or an AI platform budget. Ask before you assume.

## Owning seats

- Identity security lead (`identity-security`)
- AI security (`ai-security`)
- AI platform owner (`ai-owner`)

## Vendors (primary)

- C1: Formerly ConductorOne. Public pages describe an identity governance platform for human, non-human, and agent identities, including requests, reviews, and just-in-time grants. Treat detailed breadth as vendor-published until a design review.
- Opal Security: Access governance company. Opal Zero, announced 17 Sep 2026, is described as just-in-time governance for AI agents, with a decision per request and enforcement in an existing MCP gateway. The core Opal platform's human JIT depth is not separately sourced in this seed.
- Astrix Security: NHI and agent-security vendor. The homepage describes an inventory of AI agents, MCP servers, and non-human identities, and says Astrix is now part of Cisco. Cisco's 29 Jun 2026 update says the acquisition is complete. New standalone licenses ended 30 Jun 2026. Owner assignment and decommissioning are not on the homepage. Cisco's capability list is not a checked product cell.

## Vendors (adjacent)

- Omada
- Microsoft
- Palo Alto Networks
- Descope
- Entro Security
- Oasis Security
- Aembit
- Lakera
- Robust Intelligence
- Noma Security
- Strata Identity
- Cerbos

## What buyers do instead

- Treat agents as ordinary service accounts. Good enough when: A few internal agents with fixed, narrow permissions. Breaks when: Agents act on behalf of users, chain tools, or need per-request decisions. — hypothesis

## Objections

- "It's too early to buy for AI agents." — hypothesis

## Triggers

- MCP servers in the enterprise
- Agent pilots with standing tokens
- Board question on AI access
- Teams start deploying AI agents or MCP servers with access to internal systems.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
