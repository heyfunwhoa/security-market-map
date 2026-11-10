---
id: "mcp-security"
type: "category"
name: "MCP and tool security"
layer: "core"
vendors: 2
---

# MCP and tool security

Discovery and control of Model Context Protocol servers and the tools an agent can call. A gateway can enforce on traffic it sees and does not see why the agent acted. Direct access can see more of the behavior and does not by itself enforce the policy. Neither pattern is a sourced product capability here.

**Buyer question:** Which tool servers exist, and can an unapproved tool answer the agent?

**Usual owner:** AI platform or AppSec, with identity if the tool uses a credential.

**Budget source:** AI security or the agent-identity budget.

## Owning seats

- AI security (`ai-security`)

## Vendors (primary)

- Lasso Security: Lasso markets AI security including MCP server discovery, tool-call monitoring and an open-source MCP gateway.
- Operant AI: Operant AI markets runtime protection for AI agents, including an MCP Gateway for discovery and policy over agent-to-MCP traffic.

## Vendors (adjacent)

_None recorded._

## What buyers do instead

- An approved list of MCP servers and tools. Good enough when: A few developers trying MCP. Breaks when: MCP spreads across teams and tools call internal systems. — hypothesis
- Treat MCP like any other developer tool. Good enough when: Experiments only, with no production access. Breaks when: MCP servers get credentials to real systems. — hypothesis

## Objections

- "It's too early to buy for AI agents." — hypothesis

## Triggers

- Developers adding MCP servers
- A tool returning instructions the agent obeys
- Teams start deploying AI agents or MCP servers with access to internal systems.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
