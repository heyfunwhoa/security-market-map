---
id: "agentic-runtime"
type: "category"
name: "Agentic runtime enforcement"
layer: "core"
vendors: 18
---

# Agentic runtime enforcement

A check on a live agent action before it completes. Directory, governance, privileged access, and non-human inventory remain necessary and do not decide whether that action should continue. This map does not score the control.

**Buyer question:** Can anything stop or narrow an agent action while it is still running?

**Usual owner:** Identity security, with the team that owns the agent.

**Budget source:** Identity or a new agent-security line. Not the EDR renewal by default.

## Owning seats

- Identity security lead (`identity-security`)
- AI platform owner (`ai-owner`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- C1: Formerly ConductorOne. Public pages describe an identity governance platform for human, non-human, and agent identities, including requests, reviews, and just-in-time grants. Treat detailed breadth as vendor-published until a design review.
- Opal Security: Access governance company. Opal Zero, announced 17 Sep 2026, is described as just-in-time governance for AI agents, with a decision per request and enforcement in an existing MCP gateway. The core Opal platform's human JIT depth is not separately sourced in this seed.
- Descope: Customer and developer authentication. SACR's March 2026 runtime note also discusses an agent identity hub. That is not checked here, and it is not an IGA suite.
- Entro Security: SailPoint said on 29 Jun 2026 that it completed the Entro acquisition and that Entro's solutions are available to SailPoint customers as standalone offerings while native integration continues. entro.security presents SailPoint Entro: discovery, a human owner, lifecycle language, a Slack DLP description, and NHIDR. The product page does not restate the close date. Customer quotations and credential counts are not adopted.
- Astrix Security: NHI and agent-security vendor. The homepage describes an inventory of AI agents, MCP servers, and non-human identities, and says Astrix is now part of Cisco. Cisco's 29 Jun 2026 update says the acquisition is complete. New standalone licenses ended 30 Jun 2026. Owner assignment and decommissioning are not on the homepage. Cisco's capability list is not a checked product cell.
- Oasis Security: NHI security vendor. The about page describes discovery, owners, and lifecycle. Cyera's 3 Sep 2026 release says the acquisition is complete and that Oasis will operate as Cyera Identity. A combined enforcement workflow is not verified.
- Aembit: Aembit's non-human identity page describes policy-based, secretless, just-in-time access between workloads and resources. It does not say federation, and it does not list targets. Inventory and decommissioning are not on that page.
- Corsha: Named in SACR's 2024 NHI guide beside Aembit for machine authentication. No capability is checked.
- Apono: Cloud access and agent-runtime vendor in SACR's March 2026 runtime note. Intent-based access is their framing. It is not checked.
- Cyata: Agent-security vendor. SACR's March 2026 runtime note says Check Point acquired Cyata. That ownership was not re-checked on a primary page.
- Keycard: Named in SACR's runtime-identity note for issuing agent credentials at tool-call time. No issuance claim is filled.
- Noma Security: Named in SACR's runtime note for agent visibility beyond an MCP gateway. AI application security and runtime enforcement are not separated by a sourced claim here.

## Vendors (adjacent)

- Cyera
- Natoma
- SlashID
- TrustFour
- Lasso Security
- Operant AI

## What buyers do instead

- Agent permissions set by hand in each tool. Good enough when: A few internal agents with narrow scopes. Breaks when: Agents act for many users and need per-request decisions and logging. — hypothesis
- Allow agents and review logs afterward. Good enough when: Pilots with no sensitive data. Breaks when: An agent takes a harmful action that nobody could have stopped in time. — hypothesis

## Objections

_None recorded._

## Triggers

- Agents in production
- MCP servers nobody inventoried

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
