---
id: "agentic-runtime"
type: "category"
name: "Agentic runtime enforcement"
layer: "core"
vendors: 33
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

- C1: Formerly ConductorOne. Public pages describe an identity governance platform for human, non-human, and agent identities, including requests, reviews, and just-in-time grants. Treat detailed breadth as vendor-published until a design review. Workday signed a definitive agreement to acquire C1 on 12 Oct 2026 (announced 13 Oct 2026), expected to close by 31 Jan 2027; until a close is announced, treat C1 as an independent vendor.
- Opal Security: Access governance company. Opal Zero, announced 17 Sep 2026, is described as just-in-time governance for AI agents, with a decision per request and enforcement in an existing MCP gateway. The core Opal platform's human JIT depth is not separately sourced in this seed.
- Entro Security: SailPoint said on 29 Jun 2026 that it completed the Entro acquisition and that Entro's solutions are available to SailPoint customers as standalone offerings while native integration continues. entro.security presents SailPoint Entro: discovery, a human owner, lifecycle language, a Slack DLP description, and NHIDR. The product page does not restate the close date. Customer quotations and credential counts are not adopted.
- Astrix Security: NHI and agent-security vendor. The homepage describes an inventory of AI agents, MCP servers, and non-human identities, and says Astrix is now part of Cisco. Cisco's 29 Jun 2026 update says the acquisition is complete. New standalone licenses ended 30 Jun 2026. Owner assignment and decommissioning are not on the homepage. Cisco's capability list is not a checked product cell.
- Oasis Security: NHI security vendor. The about page describes discovery, owners, and lifecycle. Cyera's 3 Sep 2026 release says the acquisition is complete and that Oasis will operate as Cyera Identity. A combined enforcement workflow is not verified.
- Aembit: Aembit's non-human identity page describes policy-based, secretless, just-in-time access between workloads and resources. It does not say federation, and it does not list targets. Inventory and decommissioning are not on that page.
- Corsha: Named in SACR's 2024 NHI guide beside Aembit for machine authentication. No capability is checked.
- Apono: Cloud access and agent-runtime vendor in SACR's March 2026 runtime note. Intent-based access is their framing. It is not checked.
- Cyata: Agent-security vendor. SACR's March 2026 runtime note says Check Point acquired Cyata. That ownership was not re-checked on a primary page.
- Keycard: Named in SACR's runtime-identity note for issuing agent credentials at tool-call time. No issuance claim is filled.
- Noma Security: Named in SACR's runtime note for agent visibility beyond an MCP gateway. AI application security and runtime enforcement are not separated by a sourced claim here.
- Bay: Bay AI Inc., Tel Aviv. Checks each action an AI agent tries to take before it runs, on laptops, cloud workloads and SaaS, under one policy set. Founded early 2026 by Unit 8200 veterans; launched 10 Nov 2026 with about $50M raised.
- Manifold: California AIDR startup (2025), CEO Neal Swaelens. Maps agents on endpoints, especially coding agents and tools like Claude Cowork and OpenClaw, with their tools, MCP servers, databases and actions, flags anomalies and can quarantine or terminate agents. $8M seed led by Costanoa (Mar 2026).
- Capsule Security: Tel Aviv startup, CEO Naor Paz. Runtime trust layer that checks each agent tool call and data access inside the execution path, with no proxy, gateway or SDK; coverage reports name Copilot Studio, ServiceNow and Agentforce. Publishes open-source ClawGuard. $7M seed (Apr 2026); advisers include Chris Krebs.
- Kontext Security: Munich company (Cobrowser Technology GmbH per one aggregator) founded by Jens Ernstberger (CEO, doctorate in cryptography) and Michel Osswald. Task-aware runtime authorization between agents and tools: each action is judged by agent identity, assigned task, resource and request, observe-first then enforce, with short-lived credentials brokered so secrets stay out of agent environments. $4M led by 42CAP (Sep 2026).
- Asymptote Labs: New York startup (2025) founded by Justin D'Souza (CEO) and Shukan Shah (CTO), backed through South Park Commons. Beacon (MIT, Go, May 2026) records agent activity from 23+ harnesses including Claude Code, Codex and Cursor into one OpenTelemetry-based schema; a paid platform adds detection and blocking. $5.5M seed led by Tower Research Ventures (Oct 2026).
- Rein Security: New York and Tel Aviv company (2024), CEO Matan Bar-Efrat. Launched in Jan 2026 with $8M for application runtime security (API security, SCA reachability), then extended its patented sidecar to where AI agents execute, plus agent supply chain security. $25M Series A co-led by Glilot and Sienna (Oct 2026), $35M total. Names Lemonade and Dun & Bradstreet.
- Geordie AI: London company (2025) founded by Henry Comfort (CEO), Benji Weber (CTO, ex-Snyk) and Hanah-Marie Darley (Chief AI Officer). Independent security and governance view of agents across cloud, code and endpoint, plus Beam runtime remediation. $6.5M seed, then a $30M Series A led by Balderton with Crosspoint, General Catalyst and Ten Eleven (May 2026); Owkin is a named customer.
- Arcjet: San Francisco developer security company founded 2023 by David Mytton (previously Server Density and Console.dev). SDKs run bot detection, rate limits, prompt-injection checks and data redaction in code; Guards (May 2026) and agent runtime security (Sep 2026) extend that into agent tool handlers and workflows. $3.6M seed led by a16z (Sep 2024) and $8.3M Series A led by Plural (Oct 2025), about $12M total.
- Eve Security: Austin company founded 2025 by Nadav Cornberg (CEO), Sharon Eilon (CRO) and Amit Eliav (CTO). Runtime layer that turns security policy into deterministic enforcement for agents on Databricks, Copilot Studio, AgentCore, Bedrock and Glean. $3M seed (LiveOak, Tau, Sep 2025) extended by $4.5M led by Run Ventures (Sep 2026) to $7.5M.
- CodeIntegrity: Founded May 2024 near Seattle by Steven Jung (CEO) and Abi Raghuram (CTO, ex-Truveta); now San Francisco. Deterministic runtime control layer that limits which systems and data an agent can reach. The Economist cited its sub-four-hour compromise of Notion's AI features. $5M seed led by Syn Ventures, $5.25M total; piloting with regulated companies.
- Zenity: Zenity markets an AI agent security and governance platform: agent inventory, posture management, runtime boundaries and detection across SaaS, cloud and endpoint agents.
- Straiker: Straiker markets agent security in three products: Discover AI (inventory and posture), Ascend AI (adversarial testing) and Defend AI (runtime protection).

## Vendors (adjacent)

- Descope
- Cyera
- Natoma
- SlashID
- TrustFour
- Lasso Security
- Operant AI
- AIR Security
- Panguard AI
- Pillar Security

## What buyers do instead

- Agent permissions set by hand in each tool. Good enough when: A few internal agents with narrow scopes. Breaks when: Agents act for many users and need per-request decisions and logging. — hypothesis
- Allow agents and review logs afterward. Good enough when: Pilots with no sensitive data. Breaks when: An agent takes a harmful action that nobody could have stopped in time. — hypothesis

## Objections

_None recorded._

## Triggers

- Agents in production
- MCP servers nobody inventoried

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
