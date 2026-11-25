# Agentic endpoint security: how vendors deploy

As of **2026-11-25**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-25**. This space is moving fast. Recheck sooner after any launch, acquisition or funding news.

Canonical records: [agentic-endpoint.ts](../../lib/data/agentic-endpoint.ts), composed by [catalog](../../lib/catalog.ts). Two new vendors (Backslash Security, Knostic) and six new products, four of them under existing vendors (Neo Security, Island, Palo Alto Networks, CrowdStrike); nineteen sources, thirty claims (nine from SACR's ECP report, reusing its existing source record) and four events. Neo already had a SACR-sourced stub in [ecosystem.ts](../../lib/data/ecosystem.ts); that record is enriched rather than duplicated. Deployment claims are attached to the existing Bay, Zenity, Prompt Security and Microsoft Defender for Endpoint records. New products also carry the existing `endpoint-control` category as adjacent, and the Endpoint control example list now links Bay's record. All new records are `research_candidate`. Related incident candidates: [2026-11-25-agentic-endpoint-supply-chain.json](../../data/security-intelligence/candidates/2026-11-25-agentic-endpoint-supply-chain.json).

Bay now has a product research page at `/products/bay-platform` ([pilot](../verification/bay-product-template-pilot.md)). This adds a deployment-model lens to the [Bay profile](bay-ghosteye-profiles-2026-11.md) and the agent-runtime vendors in [agent-runtime-human-layer.ts](../../lib/data/agent-runtime-human-layer.ts) and [agent-security.ts](../../lib/data/agent-security.ts).

## Zoom level and placement

- **Domain:** AI and agent security.
- **Category:** [agentic runtime enforcement](../../lib/data/categories.ts) (primary), with endpoint control, endpoint security and MCP and tool security as adjacent categories. Same placement as Bay, plus endpoint control, which this repo already defines as controls on AI tools and local agents above the process tree.
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
| **Island** — Agentic Endpoint Posture | `island-agentic-endpoint-posture` (new product under existing `island`) | Runs on Island Desktop for existing customers. Otherwise deploys agentless through the customer's MDM or EDR. Built on Device Query. | Blocks assets above a risk threshold, allow-lists sanctioned AI clients, removes risky components, locks settings. Applied in real time per the vendor. Does not say whether every action works in agentless mode. | [Island blog, 2026-08-05](https://www.island.io/blog/see-score-and-control-every-ai-asset-on-your-endpoints) |
| **Zenity** — coding and personal agents | `zenity` (existing) | Agentless for supported coding agents via OpenTelemetry and native agent hooks; no endpoint sensor required. MCP gateway for MCP traffic. API integrations for SaaS and cloud agents. | Pre-execution blocking through supported hooks and the MCP gateway. Coverage varies by agent and action. | [Zenity: device-based agents](https://www.zenity.io/use-cases/agent-type/device-based); [Zenity blog](https://www.zenity.io/blog/coding-agent-attack-surface) |
| **Palo Alto Networks** — Koi | `palo-alto-koi` (new product under existing `palo-alto-networks`) | Acquired Koi; deal announced 2026-02-17 and completed 2026-04-14. Koi stays available standalone alongside existing EDR, and is being integrated into Prisma AIRS and a new Cortex XDR module. | Not specified in the sources checked | [PANW completion release](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-koi-to-secure-the-agentic-endpoint); [PANW blog](https://www.paloaltonetworks.com/blog/2026/02/securing-the-agentic-endpoint) |
| **CrowdStrike** — Falcon Guardian | `crowdstrike-falcon-guardian` (new product under existing `crowdstrike`) | Uses the existing Falcon sensor (Windows and macOS). Announced 2026-09-01 at Fal.Con, with an AI gateway capability. | Agent Access Controls block agents that aren't on the approved list | [CrowdStrike release](https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-unveils-falcon-guardian-secure-ai-agents-where-they) |
| **Microsoft** — Defender for Endpoint | `microsoft-defender-for-endpoint` (existing) | Discovery needs no deployment beyond Defender onboarding (preview). Runtime protection uses the hooks that Claude Code, Codex CLI and GitHub Copilot CLI expose. | Audit or block where the agent's hooks support it | [Discovery docs](https://learn.microsoft.com/en-us/defender-endpoint/discover-local-ai-agents); [Runtime docs](https://learn.microsoft.com/en-us/defender-endpoint/ai-agent-runtime-protection-overview) |
| **Neo Security** | `neo-security` (existing stub, enriched); product `neo-platform` (new) | Full endpoint agent, per the CEO. Analyses AI sessions on the device rather than forwarding prompts to the cloud. Bessemer frames it as built for the endpoint, in contrast to agentless API visibility. | Enforces policy before risky activity runs (secondary coverage) | [BankInfoSecurity](https://www.bankinfosecurity.com/neo-launches-100m-to-guard-agentic-enterprise-software-a-32272); [Bessemer](https://www.bvp.com/news/neo-security-securing-ai-agents-at-the-endpoint) |
| **Backslash Security** | `backslash-security` (new) | Agentless discovery: a short script pushed through MDM that runs, reports and exits. Optional endpoint sensor for inline enforcement. | Blocks unsafe agent actions inline when the sensor is installed | [Backslash explainer](https://www.backslash.security/learning/endpoint-ai-visibility-without-a-permanent-background-agent-what-actually) |
| **Knostic** — Kirin and AgentMesh | `knostic` (new) | Kirin runs inside the agent loop (Cursor, Claude Code, Copilot, Windsurf, Codex). A third-party profile says it's a user-space client pushed through MDM or installed by developers. | Checks each action before it runs; blocks dangerous skills, MCP servers and extensions before install | [Knostic](https://www.knostic.ai/coding-assistants-agents-mcp); [NHIMG profile](https://nhimg.org/understanding-knostic) |
| **SentinelOne** — Prompt Security | `sentinelone-prompt-security` (existing) | Lightweight agent and browser extensions for discovery; MCP gateway in front of 13,000+ known MCP servers; security plugins and API integrations. | Through the MCP gateway | [SentinelOne acquisition post](https://www.sentinelone.com/blog/a-new-chapter-for-ai-and-cybersecurity-sentinelone-acquires-prompt-security/); [product page](https://www.sentinelone.com/tw/platform/prompt-security-agentic-ai-security/) |
| **Check Point** — Workforce AI Security | `checkpoint` (existing vendor; product not added) | MDM-based script deployment is the recommended model per the admin guide. The script can run on a schedule. | Not checked | [Check Point admin guide](https://sc1.checkpoint.com/documents/Infinity_Portal/WebAdminGuides/EN/Workforce-AI-Security-Admin-Guide/Topics-Workforce-AI-Security-AG/Deployment.htm) |
| **Asymptote Labs** | `asymptote-labs` (existing) | Open-source Beacon hooks into 23+ agent harnesses; macOS install via Homebrew | Paid platform adds blocking | Existing catalog record |
| **Manifold** | `manifold-security` (existing) | Endpoints; deployment model unknown in the existing record | Quarantine, remediate or terminate rogue agents | Existing catalog record |

### Source caveats

- The Backslash ["top 7 agentic endpoint security companies"](https://www.backslash.security/blog/top-7-agentic-endpoint-security-companies) post (dated 2026-10-01) is written by a competitor and ranks Backslash first. It was used only to find names. Claims about other vendors that rest on it alone are marked pending. It predates Bay's 10 Nov launch, so Bay isn't in it.
- Glow (install-time blocking of AI tools) appears only in the Backslash post. It is not recorded here until a first-party source is checked.
- Bay's funding split and the Koi deal value are not repeated here; see the Bay profile and the PANW releases.

## SACR coverage: Endpoint Control and Prevention (22 Jul 2026)

[SACR's CISO Guide to Endpoint Control and Prevention](https://softwareanalyst.substack.com/p/the-ciso-guide-to-endpoint-control) (Lawrence Pingree and Francis Odum; page modified 28 Jul 2026) is the analyst framing closest to this note. It is already in the catalog as `src-sacr-ecp` and `src-sacr-ecp-20260722`, and it is the source of the `endpoint-control` category definition. This batch adds its vendor-level statements as claims (`claim-ae-sacr-*` in [agentic-endpoint.ts](../../lib/data/agentic-endpoint.ts)). SACR is one attributed lens, not the definition of the market; its vendor profiles largely restate vendor briefings.

**SACR's five zones** (paraphrased):

| Zone | SACR name | What it covers |
| --- | --- | --- |
| 1 | Software posture and governance | Controls which extensions, MCP servers, packages, models and containers can be installed; live inventory and posture |
| 2 | Application-layer enforcement | Sits between apps and agents; blocks risky tool calls or data sharing mid-session |
| 3 | Agent runtime visibility (AI-EDR) | Above-OS telemetry and behavioral baselines; traces prompt to downstream action |
| 4 | Intent-aware behavioral analysis | Weighs user and agent intent against policy in real time; graduated guardrails and coaching |
| 5 | Data-centric enforcement | Classifies and intercepts sensitive data movement; overlaps DLP and insider risk |

**What SACR says about vendors in this note:**

- **Bay:** profiled across zones 1–4 and called the strongest zone 1 option for credential exposure in agentic toolchains. Deploys an ephemeral collector over existing EDR or MDM (Intune and CrowdStrike are named), covering Windows, Mac, Linux, cloud endpoints and containers. This is the first source found for Bay's OS coverage. SACR's caveats: prevention needs the on-device enforcement component, a collector-only deployment runs in detection mode, and breadth, latency and cross-platform claims are vendor-reported and should be proven in a proof of value.
- **Koi (Palo Alto Networks):** zones 1–5; a network supply-chain gateway plus integration with existing CrowdStrike, Defender and MDM telemetry, avoiding a new agent.
- **CrowdStrike Falcon AIDR:** all zones; delivered through the Falcon sensor, browser extensions, AI gateway integrations, an SDK and an MCP proxy. SACR notes prompt-layer telemetry depends on network connectivity. SACR's "Falcon AIDR" and the Sep 2026 "Falcon Guardian" are treated here as the same line, pending confirmation.
- **SentinelOne Singularity:** all zones, through a kernel-level endpoint agent.
- **Neo Security:** zones 1–3.
- **Cyberhaven:** zone 5, browser-extension monitoring.
- **Not found in SACR's text:** Island, Zenity, Backslash, Knostic, Check Point, Manifold, Asymptote. The fetched page may not include the full attached report, so absence is not proof of exclusion.

**SACR-named vendors not yet in the catalog** (names only; no capability claims): Bloom Security (zones 1–3), Pluto Security (1–3), Glow (1–2), Origin (primary zone 3), Ent (3–5), Bold Security (4–5; agent through the endpoint management plane plus a browser extension), NeuralTrust (2–3), Harmonic Security (2, 4, 5). They are listed by name in the Endpoint control example set in [connections.ts](../../lib/data/connections.ts), without links, until each gets a first-party check. Several of them cite SACR in their own marketing; treat those posts as vendor statements.

## Full vendor list and evidence

Every vendor discussed in this note, with the record that holds its evidence. "Vendor" means a first-party page or release; "analyst" means SACR; "news" means press coverage.

| Vendor / product | Deployment model (short) | Evidence type | Primary evidence | Catalog record |
| --- | --- | --- | --- | --- |
| Bay | Agentless MDM/EDR collector; native-hook enforcement | Vendor, analyst, news | [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-2sqtxuxrvfows); [bay.io](https://www.bay.io/); [SACR ECP](https://softwareanalyst.substack.com/p/the-ciso-guide-to-endpoint-control) | `bay-platform` |
| CrowdStrike Falcon Guardian / AIDR | Existing Falcon sensor, plus browser, gateway, SDK, MCP proxy | Vendor, analyst | [CrowdStrike release](https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-unveils-falcon-guardian-secure-ai-agents-where-they); SACR ECP | `crowdstrike-falcon-guardian` |
| Microsoft Defender for Endpoint | Existing Defender onboarding; agent hooks for runtime | Vendor docs | [Discovery](https://learn.microsoft.com/en-us/defender-endpoint/discover-local-ai-agents); [Runtime](https://learn.microsoft.com/en-us/defender-endpoint/ai-agent-runtime-protection-overview) | `microsoft-defender-for-endpoint` |
| Palo Alto Networks — Koi | Standalone or inside Cortex XDR / Prisma AIRS; gateway plus existing telemetry | Vendor, analyst | [PANW release](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-koi-to-secure-the-agentic-endpoint); [PANW blog](https://www.paloaltonetworks.com/blog/2026/02/securing-the-agentic-endpoint); SACR ECP | `palo-alto-koi` |
| SentinelOne — Prompt Security | Lightweight agent, browser extensions, MCP gateway | Vendor, analyst | [Acquisition post](https://www.sentinelone.com/blog/a-new-chapter-for-ai-and-cybersecurity-sentinelone-acquires-prompt-security/); [product page](https://www.sentinelone.com/tw/platform/prompt-security-agentic-ai-security/); SACR ECP | `sentinelone-prompt-security` |
| Island — Agentic Endpoint Posture | Island Desktop, or agentless via MDM/EDR | Vendor | [Island blog](https://www.island.io/blog/see-score-and-control-every-ai-asset-on-your-endpoints) | `island-agentic-endpoint-posture` |
| Zenity | Native hooks and OpenTelemetry; MCP gateway | Vendor | [Use-case page](https://www.zenity.io/use-cases/agent-type/device-based); [blog](https://www.zenity.io/blog/coding-agent-attack-surface) | `zenity-platform` |
| Neo Security | Full endpoint agent | News, investor, analyst | [BankInfoSecurity](https://www.bankinfosecurity.com/neo-launches-100m-to-guard-agentic-enterprise-software-a-32272); [Bessemer](https://www.bvp.com/news/neo-security-securing-ai-agents-at-the-endpoint); SACR ECP | `neo-security`, `neo-platform` |
| Backslash Security | Agentless MDM script; optional sensor | Vendor, news | [Explainer](https://www.backslash.security/learning/endpoint-ai-visibility-without-a-permanent-background-agent-what-actually); [Graph release](https://cybermagazine.com/globenewswire/3335286); [SecurityWeek](https://www.securityweek.com/backslash-raises-19-million-to-secure-vibe-coding/) | `backslash-security`, `backslash-agentic-endpoint` |
| Knostic — Kirin and AgentMesh | Inside the agent loop; user-space client (third-party) | Vendor, third-party profile | [Knostic](https://www.knostic.ai/coding-assistants-agents-mcp); [NHIMG](https://nhimg.org/understanding-knostic) | `knostic`, `knostic-kirin` |
| Check Point — Workforce AI Security | MDM script, scheduled | Vendor docs | [Admin guide](https://sc1.checkpoint.com/documents/Infinity_Portal/WebAdminGuides/EN/Workforce-AI-Security-Admin-Guide/Topics-Workforce-AI-Security-AG/Deployment.htm) | Note only (`checkpoint` vendor exists) |
| Cyberhaven | Browser extension | Analyst | SACR ECP | `cyberhaven` |
| Asymptote Labs | Open-source hooks into 23+ harnesses | News | Existing record | `asymptote-beacon` |
| Manifold | Endpoints; model unknown | News | Existing record | `manifold-aidr` |
| Bloom, Pluto, Glow, Origin, Ent, Bold, NeuralTrust, Harmonic | Per SACR only (see above) | Analyst | SACR ECP | Names only, not yet records |

## What actually differs (sourced, not ranked)

- **Same rollout, different enforcement.** Bay, Island, Backslash and Check Point all report agentless rollout through existing MDM or EDR. Bay and Zenity report per-action blocking through the AI tool's native hooks without a persistent sensor. Backslash says inline blocking needs its optional sensor. Island describes real-time enforcement but doesn't say how agentless mode delivers it.
- **Sensor-first is a deliberate counter-position.** Neo and its lead investor frame a full endpoint agent as the better architecture, in contrast to agentless approaches.
- **Every major EDR vendor now ships something here.** CrowdStrike (Falcon Guardian on the Falcon sensor), Microsoft (Defender for Endpoint, using the same agent hooks), Palo Alto (Koi, into Cortex XDR and Prisma AIRS) and SentinelOne (Prompt Security). For a customer who already owns one, the startup has to win on depth, not on rollout. Island does the same for its browser customers.
- **Hooks are becoming shared plumbing.** Bay, Zenity, Knostic and Microsoft all describe deciding through the AI tool's own hooks. That makes the hook a commodity entry point; differentiation moves to session context, policy quality and coverage of tools without hooks.
- **Hook coverage is the open question for everyone using hooks.** Claude Code, Cursor and Codex expose hooks, but the events differ by tool. No vendor in this note publishes a full supported-agent and supported-event list.

## Unknowns

- Supported agent lists for Bay, Island, Neo and Backslash. Bay's OS coverage (Windows, Mac, Linux, cloud endpoints, containers) comes only from SACR restating vendor information.
- Whether Island's and Backslash's agentless modes enforce in real time or only on the next scan.
- Koi's current deployment model after integration into Cortex XDR.
- How any vendor enforces for browser or SaaS agents that can't call a local hook.
- No independent testing of speed, false-positive or coverage claims.

## Related incidents (candidates)

Two public cases vendors in this space use to explain the risk. Both are logged as candidates only, pending owner review:

- **postmark-mcp (Sep 2025):** a fake npm MCP server that BCC'd every email to its publisher; reported by Koi as the first malicious MCP server seen in the wild.
- **ClawHavoc (Feb 2026):** 341 malicious skills found on ClawHub, the OpenClaw skills marketplace, 335 from one campaign delivering the AMOS macOS stealer; later waves reported by Unit 42 and others.

## Follow-ups (need owner review)

1. Confirm Koi's original ClawHavoc and postmark-mcp posts before promoting either incident.
2. Fetch the Microsoft AI agent support matrix and record per-agent discovery and runtime coverage.
3. Check Neo's first-party site, funding split and founders; check Knostic's funding and founders.
4. Decide whether Check Point Workforce AI Security and the SACR-named startups (Bloom, Pluto, Glow, Origin, Ent, Bold, NeuralTrust, Harmonic) warrant vendor records, each after a first-party check.
5. Record per-capability GA status for Falcon Guardian.
6. Confirm that SACR's "Falcon AIDR" and CrowdStrike's "Falcon Guardian" are the same product line.
