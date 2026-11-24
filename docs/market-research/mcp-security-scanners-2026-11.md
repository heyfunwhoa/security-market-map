# MCP and agent-skill security tools

As of **2026-11-23**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-23**, or sooner if a product is acquired, renamed, or repackaged.

## Why

The MCP and tool security category had two gateway-style vendors (Lasso Security, Operant AI). It had no record of the scanner side of the category: tools that check an MCP server or agent skill before an agent installs it. This change adds four products, two of them from vendors already in the catalog.

Canonical records: [typed data](../../lib/data/mcp-security-scanners.ts), composed by [catalog](../../lib/catalog.ts). Two new vendors, four products, five sources, five claims. No feature-parity cells, scores or direct-competitor edges.

## Vendor-agnostic frame

An AI agent calls tools to act: read files, run commands, query data. It gets new tools by installing skills or MCP servers. A malicious skill or a poisoned tool description can steer the agent into misusing its access, for example reading a credentials file and sending it out.

Controls in this category sit at two points:

| Control point | Question it answers | Typical form |
| --- | --- | --- |
| Before install | Is this skill or MCP server safe to add? | Scanner run on a package, manifest or tool description |
| At run time | Should this tool call go through? | Gateway or proxy between the agent and its tools |

Neither one is a sandbox: a sandbox runs code in isolation to watch it, while these tools inspect or broker each action. Several tools do both points, so the table describes jobs, not vendors.

## Placement (zoom out → zoom in)

| Product | Vendor record | Primary | Adjacent | Control point (vendor-reported) |
| --- | --- | --- | --- | --- |
| PanGuard | Panguard AI (new) | mcp-security | agentic-runtime | Both: pre-install skill scan and a guard on tool calls |
| Cisco MCP Scanner | Cisco (existing) | mcp-security | ai-application-security | Before install |
| MCP-Scan (Invariant Labs, now Snyk) | Snyk (existing) | mcp-security | ai-application-security | Before install; Invariant also built a gateway and guardrails |
| Runlayer | Runlayer (new) | mcp-security | agent-identity | At run time, with identity-provider permissions |

To zoom out, open the MCP and tool security category, then the agent identity domain. Each vendor page links back to its categories.

## Notes

- **Open rule formats.** PanGuard publishes its detections as Agent Threat Rules (ATR), an MIT-licensed format it compares to Sigma for SIEM rules and YARA for files. Its claim that ATR rules were merged into Cisco and Microsoft tooling is vendor-reported and was not checked in those projects.
- **Buyer.** These tools are bought or adopted by developers and AppSec teams first. Open-source scanners spread bottom-up; gateways are usually an IT or security purchase.
- **Overlap.** Sharing this category does not make these products interchangeable. A pre-install scanner and a runtime gateway are often used together.

## Limits and open questions

- All capability statements are publisher-reported or from news coverage, and untested.
- PanGuard's rule count differs across its own pages (747 and 785). No count is recorded in a claim.
- Panguard AI's paid tiers are named but their pricing and contents were not reviewed.
- MCP-Scan's current name and packaging inside Snyk were not re-checked.
- Runlayer's data comes from launch coverage only.
- Seen but not added (single-developer or unverified projects): GuardFive, AgentAudit, Bawbel Scanner, Pipelock, agent-security-scanner-mcp. Larger names mentioned in coverage (Wiz, Docker, Cloudflare, Javelin, Helmet Security) need their own sourced records before being placed here.
