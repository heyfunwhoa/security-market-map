# AI agent security: market structure, players and opportunity

As of **2026-11-25**. Status: researched and proposed. Human review is pending. Next review: **2026-12-25**, or sooner after any large deal closes.

Typed records added with this note: [ai-agent-security-market.ts](../../lib/data/ai-agent-security-market.ts) (two vendors, five sources, seven claims, two events). Everything else below links to records that already exist, or is research text that has **not** been promoted to typed claims. Neighboring notes: [Bay and GhostEye profiles](bay-ghosteye-profiles-2026-11.md), [MCP and agent security platforms](mcp-security-scanners-2026-11.md), [industry and category foundation](industry-category-foundation.md).

Zoom level: domain (AI security) → categories (agentic runtime, MCP and tools, agent identity, AI governance, AI data security) → player types → one worked placement (Bay). No navigation change is proposed.

## 1. The buyer problem, without vendor names

In 2025 most enterprises bought AI *assistants*: chat tools and copilots that suggest. In 2026 they started deploying *agents*: coding agents on laptops, desktop assistants, SaaS agents and custom agents in the cloud that read files, call tools through MCP, use credentials and take actions. Security teams now face five questions, which map to existing categories:

| Buyer question | Category in this map | Where the control sits |
| --- | --- | --- |
| What AI tools, agents, extensions, MCP servers and models are in use, and by whom? | AI governance (discovery), endpoint security | Device inventory, browser, SaaS and cloud APIs |
| Can we stop a specific risky *action* before it runs? | [Agentic runtime enforcement](../../lib/data/categories.ts) | On the device (hook in the agent), inline gateway, or SDK in agent code |
| Which tools and MCP servers can an agent reach, and are they trustworthy? | MCP and tool security | MCP gateway, registry, scanner |
| Whose authority is the agent acting with, and is it scoped? | Agent identity, NHI, PAM | Identity provider, credential broker |
| Can sensitive data leave through a prompt or an agent? | AI data security, DLP | Browser, network (SSE), endpoint, model gateway |

A useful test for any product: **where does the decision happen, and what does it see?** A network proxy sees the connection, a browser extension sees the web session, an endpoint hook sees the local action with the session's history, an identity system sees the credential. These are often complements, not substitutes, in a given buyer scenario.

## 2. Market size signals (secondary, treat as directional)

- Gartner's information security forecast (2Q26/3Q26, client research, reported by Software Strategies Blog, [Jul 2026](https://softwarestrategiesblog.com/2026/07/06/gartner-2q26-information-security-forecast-securing-ai-2030/)): total security spending about $248B in 2026; securing AI is described as the only segment accelerating through 2030. The blog reports spending on securing AI ecosystems and AI agents of about **$3B in 2026 rising to about $16B in 2030**. Not checked against Gartner's own documents.
- TechCrunch ([19 Jan 2026](https://techcrunch.com/2026/01/19/rogue-agents-and-shadow-ai-why-vcs-are-betting-big-on-ai-security/)) quotes an analyst forecast of $800B to $1.2T for AI security software by 2031. This is far outside other estimates; do not use it without the underlying method.
- Software Strategies Blog ([Mar 2026](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)) aggregates about **$3.6B** raised by agentic AI security startups and cites Momentum Cyber's figure of $96B in 2025 cybersecurity M&A.

Interpretation: the dedicated "AI agent security" budget is still small relative to endpoint, network or identity budgets, but it is the fastest-growing line. Much of the early spend comes out of existing security, innovation or AI-platform budgets rather than a named line item.

## 3. Player types and where each one's opportunity is

Shared category membership does not make two vendors direct competitors. The buyer scenario decides that.

### a. Platform incumbents (consolidating by acquisition)

| Incumbent | AI/agent move | Source in this repo |
| --- | --- | --- |
| CrowdStrike | Agreed to acquire Zscaler (~$43.9B, all stock, 23 Nov 2026, pending), framed as "Zero Trust for AI safety" inline between users, agents and apps. Earlier bought Pangea (2025, reported). | `evt-crowdstrike-zscaler-agree` |
| Palo Alto Networks | Closed CyberArk (11 Feb 2026, now Idira); Prisma AIRS; Cortex Agentic Endpoint Security for coding agents and MCP servers (24 Nov 2026 blog). Coverage attributes the endpoint piece to the 2026 Koi acquisition and model security to Protect AI (2025). | `evt-panw-close`, `evt-panw-agentic-endpoint` |
| SentinelOne | Prompt Security (2025): employee AI use visibility, MCP gateway. | existing Prompt Security record |
| Cisco | Robust Intelligence (2024); Astrix (closed 29 Jun 2026). | `evt-astrix-cisco-close` |
| Identity vendors | SailPoint–Entro (closed 29 Jun 2026); Okta–Permiso (closed Aug 2026, reported); Cyera–Oasis (closed 3 Sep 2026). | existing events |
| Others (reported, not separately checked) | Check Point–Lakera; F5–CalypsoAI (Jan 2026); Cato–Aim (2025); Snyk–Invariant Labs (2025, recorded); Zscaler–SPLX (2025). Channel Insider's [2026 recap](https://www.channelinsider.com/channel-business/mergers-and-acquisitions/news-2026-cybersecurity-acquisitions-recap/) also lists ServiceNow–Armis and Veza, Proofpoint–Varonis and 1Password–Apono. | not promoted |

**Opportunity:** cross-sell AI controls into an installed base (CrowdStrike cites ~8,000 Zscaler customers). Incumbents win where the buyer wants fewer agents on the device and one console. Their limit is speed: most AI capability arrives by acquisition and takes quarters to integrate, and a pending deal (CrowdStrike–Zscaler) can freeze roadmaps and buying decisions in the meantime.

### b. AI-native platforms (discovery + posture + runtime across surfaces)

Zenity, Noma Security, Pillar Security, Straiker, Geordie AI, WitnessAI (governance-led), and Bay. Most claim inventory, posture and runtime together; the sourced differences are where enforcement happens and which agent platforms are covered.

**Opportunity:** be the neutral layer across every AI harness (Copilot, Claude, ChatGPT, Cursor, Codex, Copilot Studio, Agentforce) while incumbents integrate. Risk: being acquired or outspent once incumbents finish integrating, roughly a 12 to 24 month window.

### c. Point specialists

- **Endpoint / coding agents:** Backslash, Manifold, Asymptote Labs, Neo Security, Glow (named in vendor comparison posts), Capsule.
- **MCP and tool trust:** AIR Security, Runlayer, Helmet, Operant AI, MCP-Scan (Snyk).
- **Agent identity and authorization:** Keycard, Kontext, Aembit, Astrix (Cisco), Oasis (Cyera).
- **In-code runtime:** Arcjet, Rein, CodeIntegrity, Eve.

**Opportunity:** depth on one control point, often open-source-led (Asymptote Beacon, Capsule ClawGuard). Most likely exit is acquisition by a platform in section a.

### d. Model and AI platform owners

Microsoft (Entra Agent ID, Copilot controls), Google, AWS (AgentCore), Anthropic and OpenAI add native admin controls and hooks. These both enable third parties (Bay and others plug into native hooks) and set a free baseline that third parties must exceed.

## 4. Funding snapshot (as reported, 2025–2026)

| Company | Round | Date | Source |
| --- | --- | --- | --- |
| Bay | $50M total ($37M A, Battery; $13M seed, YL and Striker) | Nov 2026 | existing Bay record; TNW adds M12 |
| AIR Security | $50M | Sep 2026 | existing record |
| Geordie AI | $30M Series A (Balderton) | May 2026 | existing record |
| Rein Security | $25M Series A | Oct 2026 | existing record |
| WitnessAI | $58M | Jan 2026 | `claim-aim-witnessai-round` |
| Noma Security | $100M Series B | Jul 2025 | roundup, not promoted |
| Oasis Security | $120M Series B, then acquired by Cyera | Mar → Sep 2026 | existing records |
| Seed tier | Manifold $8M, Capsule $7M, Asymptote $5.5M, Kontext $4M, Runlayer $11M, Helmet $9M | 2025–2026 | existing records / roundup |

Pattern: one AI-native vendor per quarter raises $30–60M; identity-adjacent agent startups have mostly been acquired within 12 months of a Series B.

## 5. Worked placement: Bay

Bay's sourced position (see [profile](bay-ghosteye-profiles-2026-11.md)): an AI-native platform whose distinguishing control is a per-action verdict on the device (Allow, Ask, Deny) through native hooks, deployed through existing MDM/EDR, with discovery (Wave) and policy drafting (Lighthouse). Launch coverage (TNW) names Zenity, Straiker, NeuralTrust and Asymptote Labs as companies in the space; that is the outlet's list, not a sourced parity claim.

Closest buyer scenario: *a company has rolled out coding agents and desktop assistants to thousands of employees and needs to stop destructive or data-exfiltrating actions on the device without slowing developers.* In that scenario the main alternatives are (1) the EDR vendor's new agentic module (Palo Alto Cortex AES, SentinelOne/Prompt), (2) an SSE/browser control (Zscaler, Netskope, enterprise browsers), which sees connections but not local tool calls, and (3) other device-level startups (Backslash, Manifold, Asymptote). A buyer may combine Bay with (2).

Open questions for Bay: supported agents and OS list, how "no permanent agent" squares with the on-device Enforcer binary, pricing unit (seat vs endpoint vs agent), and independent evidence for the sub-4 ms and under-1% false-positive figures.

## 6. Ideal customer profile hypothesis (public evidence only)

Derived from Bay's public launch material and named customers (Micron, Peloton, ClickUp, Wix). A hypothesis to test, not a vendor statement.

**Account profile**
- Enterprises and upper mid-market with 2,000+ knowledge workers, large engineering populations and a leadership mandate to roll out AI agents broadly. Named customers skew to semiconductors/hardware (Micron), software and SaaS (ClickUp, Wix) and consumer tech (Peloton).
- Already standardized on MDM/EDR (Bay installs through them), with coding agents (Cursor, Claude Code, Codex, Copilot) live or in pilot.
- Regulated or IP-sensitive data on laptops: source code, chip designs, health or financial data.
- Trigger events: an AI rollout deadline, an agent-caused incident or near-miss, a board question about AI risk, an audit finding on shadow AI.

**Buying committee**
- Economic buyer: CISO or VP Security; sometimes CIO/CTO when the rollout is an AI-adoption program.
- Champions: head of security engineering, endpoint security lead, AppSec/ProdSec lead for coding agents, AI platform or developer productivity owner.
- Influencers and blockers: IT/endpoint admins (deployment), IAM (identity integration), GRC and privacy (policy and audit), developer experience leaders (friction), procurement.

**Disqualifiers**: no agent adoption beyond chat; a single-vendor mandate to wait for the EDR or SSE vendor's AI module; no MDM/EDR coverage.

## Sources not promoted to typed claims

Secondary roundups (Software Strategies Blog, Channel Insider, guptadeepak.com) were used for orientation and are cited inline. They are not recorded as sources because their figures are aggregations or second-hand. Promote a figure only after checking the primary release.
