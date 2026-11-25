# Agentic endpoint security: how vendors deploy

As of **2026-11-25**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-25**. This space is moving fast. Recheck sooner after any launch, acquisition or funding news.

This is a research note, not published typed claims. It adds a deployment-model lens to the [Bay profile](bay-ghosteye-profiles-2026-11.md) and to the agent-runtime vendors already in [agent-runtime-human-layer.ts](../../lib/data/agent-runtime-human-layer.ts) and [agent-security.ts](../../lib/data/agent-security.ts). No catalog records are added or changed. Vendors already in the catalog are referenced by their existing IDs; new names are candidates only.

## Zoom level and placement

- **Domain:** AI and agent security.
- **Category:** [agentic runtime enforcement](../../lib/data/categories.ts) (primary), with endpoint security and MCP and tool security as adjacent categories. Same placement as Bay.
- **Buyer question at this zoom:** we've decided we need to see and control AI agents on employee devices. **How does the control get onto the device, and where does the decision happen?**
- **Zoom out:** the [Bay profile](bay-ghosteye-profiles-2026-11.md) for the vendor-agnostic buyer problem, and [MCP and agent security](mcp-security-scanners-2026-11.md) for gateway and scanner approaches.
- **Navigation change:** none proposed.

## Deployment models (vendor-agnostic)

Use these terms when comparing vendors. They describe architecture, not quality.

| Model | How it gets on the device | Where the decision happens | Trade-off for the buyer |
| --- | --- | --- | --- |
| **Agentless discovery via MDM/EDR** | A script or binary pushed by the MDM or EDR the customer already runs. It runs, reports, and exits. | No runtime decision, or policy applied on a later scan | Fastest rollout and no new agent to approve. Coverage and freshness depend on the scan schedule and the existing MDM/EDR footprint. |
| **Native agent hooks** | The AI tool itself calls out at lifecycle events (Claude Code, Cursor and Codex all expose hooks). The vendor configures the hook. | On the device, per action, before it runs | Can block before execution without a kernel driver. Coverage is limited to tools that expose hooks, and to the events each tool exposes. |
| **Endpoint sensor / agent** | A persistent agent the customer installs | On the device, continuously | Broadest visibility, including tools without hooks. It's another agent for IT to deploy and approve. |
| **Gateway / proxy** | Traffic or MCP calls are routed through a vendor gateway | In the network path | Works without device software. Misses local actions that never cross the network, such as stdio MCP servers and local shell commands. |
| **Platform module** | Added to an existing EDR or browser the customer already runs | Wherever that platform runs | No new vendor. Depth depends on the platform's roadmap. |

Most vendors combine two or more of these. The useful question in a deal is which model each capability uses: discovery, posture, and blocking can each be delivered differently.

**Editorial note:** "agentless" is used loosely in vendor marketing. It can mean "no persistent agent" (a scan that exits), "uses the AI tool's own hooks", or "no device software at all". Ask which one.

## Vendor evidence

All capability statements below are vendor-reported unless marked otherwise. Not tested.

| Vendor | Catalog status | Reported deployment model | Reported runtime blocking | Source |
| --- | --- | --- | --- | --- |
| **Bay** | `bay-security` (existing) | Agentless rollout through existing MDM or EDR, with no persistent agent, proxy or kernel driver. Wave scanner exits after inventory. Bay Enforcer, a static binary, receives each proposed action through a native hook in the AI tool. | Allow, Ask or Deny on the device, using whole-session context | [AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-2sqtxuxrvfows); [SiliconANGLE](https://siliconangle.com/?p=853606) |
| **Island** — Agentic Endpoint Posture | `island` (existing vendor; product not in catalog) | Runs on Island Desktop for existing customers. Otherwise deploys agentless through the customer's MDM or EDR. Built on Device Query. | Blocks assets above a risk threshold, allow-lists sanctioned AI clients, removes risky components, locks settings. Applied in real time per the vendor. Does not say whether every action works in agentless mode. | [Island blog, 2026-08-05](https://www.island.io/blog/see-score-and-control-every-ai-asset-on-your-endpoints) |
| **Zenity** — coding and personal agents | `zenity` (existing) | Agentless for supported coding agents via OpenTelemetry and native agent hooks; no endpoint sensor required. MCP gateway for MCP traffic. API integrations for SaaS and cloud agents. | Pre-execution blocking through supported hooks and the MCP gateway. Coverage varies by agent and action. | [Zenity: device-based agents](https://www.zenity.io/use-cases/agent-type/device-based); [Zenity blog](https://www.zenity.io/blog/coding-agent-attack-surface) |
| **Palo Alto Networks** — Koi | `palo-alto-networks` (existing vendor; Koi not in catalog) | Acquired Koi; deal announced 2026-02-17 and completed 2026-04-14. Koi stays available standalone alongside existing EDR, and is being integrated into Prisma AIRS and a new Cortex XDR module. | Not specified in the sources checked | [PANW completion release](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-koi-to-secure-the-agentic-endpoint) |
| **Neo Security** | Candidate (not in catalog) | Full endpoint agent, per the CEO. Analyses AI sessions on the device rather than forwarding prompts to the cloud. Bessemer describes it as built for the endpoint rather than agentless API visibility. | Enforces policy before risky activity occurs (secondary coverage) | [BankInfoSecurity](https://www.bankinfosecurity.com/neo-launches-100m-to-guard-agentic-enterprise-software-a-32272); [Bessemer](https://www.bvp.com/news/neo-security-securing-ai-agents-at-the-endpoint) |
| **Backslash Security** | Candidate (not in catalog) | Agentless discovery: a short script pushed through MDM that runs, reports and disappears. Optional endpoint sensor for inline enforcement. | Blocks unsafe agent actions inline when the sensor is installed | [Backslash explainer](https://www.backslash.security/learning/endpoint-ai-visibility-without-a-permanent-background-agent-what-actually) |
| **SentinelOne** — Prompt Security | `sentinelone-prompt-security` (existing) | Lightweight endpoint agent or application reverse proxy. MCP enforcement through its gateway. | Allows or blocks MCP interactions down to the tool call, via the gateway | Backslash comparison (competitor-authored; see caveat). First-party confirmation pending. |
| **Check Point** — Workforce AI Security | `checkpoint` (existing vendor; product not in catalog) | MDM-based script deployment is the recommended model per the admin guide. The script can run on a schedule. | Not checked | [Check Point admin guide](https://sc1.checkpoint.com/documents/Infinity_Portal/WebAdminGuides/EN/Workforce-AI-Security-Admin-Guide/Topics-Workforce-AI-Security-AG/Deployment.htm) |
| **Asymptote Labs** | `asymptote-labs` (existing) | Open-source Beacon hooks into 23+ agent harnesses; macOS install via Homebrew | Paid platform adds blocking | Existing catalog record |
| **Manifold** | `manifold-security` (existing) | Endpoints; deployment model unknown in the existing record | Quarantine, remediate or terminate rogue agents | Existing catalog record |

### Source caveats

- The Backslash ["top 7 agentic endpoint security companies"](https://www.backslash.security/blog/top-7-agentic-endpoint-security-companies) post (dated 2026-10-01) is written by a competitor and ranks Backslash first. It was used only to find names. Claims about other vendors that rest on it alone are marked pending. It predates Bay's 10 Nov launch, so Bay isn't in it.
- Glow (install-time blocking of AI tools) appears only in the Backslash post. It is not recorded here until a first-party source is checked.
- Bay's funding split and the Koi deal value are not repeated here; see the Bay profile and the PANW releases.

## What actually differs (sourced, not ranked)

- **Same rollout, different enforcement.** Bay, Island, Backslash and Check Point all report agentless rollout through existing MDM or EDR. Bay and Zenity report per-action blocking through the AI tool's native hooks without a persistent sensor. Backslash says inline blocking needs its optional sensor. Island describes real-time enforcement but doesn't say how agentless mode delivers it.
- **Sensor-first is a deliberate counter-position.** Neo and its lead investor frame a full endpoint agent as the better architecture, in contrast to agentless approaches.
- **Platform incumbents are already here.** Palo Alto (Koi into Cortex XDR and Prisma AIRS) and SentinelOne (Prompt Security) can bundle this into an EDR the customer already owns. Island does the same for its browser customers.
- **Hook coverage is the open question for everyone using hooks.** Claude Code, Cursor and Codex expose hooks, but the events differ by tool. No vendor in this note publishes a full supported-agent and supported-event list.

## Unknowns

- Supported OS and agent lists for Bay, Island, Neo and Backslash.
- Whether Island's and Backslash's agentless modes enforce in real time or only on the next scan.
- Koi's current deployment model after integration into Cortex XDR.
- How any vendor enforces for browser or SaaS agents that can't call a local hook.
- No independent testing of speed, false-positive or coverage claims.

## Proposed follow-ups (need owner review)

1. Add `deployment` detail to `bay-platform`, `zenity-platform` and `sentinelone-prompt-security` as typed claims, citing the first-party sources above.
2. Decide whether Island Agentic Endpoint Posture, Koi (under `palo-alto-networks`), Neo Security and Backslash become product records in `agentic-runtime`.
3. Confirm Prompt Security's deployment options from a SentinelOne page before publishing.
