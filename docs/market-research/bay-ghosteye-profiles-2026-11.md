# Vendor profiles: Bay and GhostEye

As of **2026-11-23**. Status: researched and proposed. Human review is pending. Owner: repository maintainer. Next review: **2026-12-23**. Both companies are young, so recheck sooner after any funding, product or customer news.

Canonical records: [typed data](../../lib/data/bay-ghosteye.ts), composed by [catalog](../../lib/catalog.ts). Two vendors, two products, nine sources, sixteen claims and one launch event, plus seven neighboring vendors (see the end of this note). The two companies are profiled together only because they were added in the same batch. They are in different categories and are not alternatives to each other.

## Bay

### Buyer problem (vendor-agnostic)

AI agents now run on employee laptops (coding agents, desktop assistants) as well as in the cloud and SaaS. An agent can take a damaging action without being compromised, for example by running a destructive command. Prompt filters see the words, not the action. The buyer question is: **can we check an agent's action before it runs, on the device, using what the session has done so far?** This is [agentic runtime enforcement](../../lib/data/categories.ts), with an endpoint angle.

### Company

| Field | Value | Source / confidence |
| --- | --- | --- |
| Legal name | Bay AI Inc. | SiliconANGLE |
| HQ | Tel Aviv; US and Europe go-to-market growing | SiliconANGLE, GovInfoSecurity |
| Founded | Early 2026 (January per GovInfoSecurity; about nine months before launch per others) | Conflicting |
| Launch | 10 Nov 2026, out of stealth | SiliconANGLE, Ynet |
| Team | About 35, mostly in Israel | Ynet only |
| Founders | Yuval Zacharia (CEO; Unit 8200, Hunters), Aner Morag (CPO; first employee at Noname Security), Boris Danilovich (R&D; Preempt, then CrowdStrike) | SiliconANGLE, Ynet |
| Funding | About $50M total. $37M Series A led by Battery Ventures with Micron Ventures, plus a $13M seed co-led by YL Ventures and Striker. GovInfoSecurity calls the whole $50M a Series A. | Split conflicting |
| Angels | Assaf Rappaport (Wiz), Jeetu Patel (Cisco), Manoj Apte (ex-Zscaler) | Ynet |
| Named customers | Micron, Wix, ClickUp, Peloton | Vendor-named at launch |
| Website | bay.io (bay.security redirects there) | Observed 2026-11-23 |

### Product

| Component | What it does (vendor-reported) |
| --- | --- |
| Wave | Scans each machine to inventory agents, browser extensions and local models, then leaves nothing running. |
| Bay Enforcer | A static binary that receives each proposed agent action through a native hook in the AI tool. Returns Allow, Ask or Deny on the device in under 4 ms, using the whole session as context. |
| Lighthouse | Drafts a policy per team from 30 days of agent activity, with no baselining period, and lets teams replay a policy against the past month. Bay says false positives are under 1%. |

Also reported: agentless install through existing MDM or EDR in under five minutes; enforcement on endpoints, cloud workspaces, browsers or through integrations; an entity graph linking agents, users, accounts, MCP servers and SaaS apps; token-use controls by user and team. Bay says Micron rolled it out to 150,000 endpoints in under five minutes.

### Placement

Primary: agentic runtime enforcement. Adjacent: endpoint security (it runs on the device and installs through MDM/EDR), MCP and tool security (it inventories MCP servers), AI governance (per-team policy). It sits beside the platforms in [MCP and agent security](mcp-security-scanners-2026-11.md). Its sourced difference is where the decision happens: on the device, per action, with session context.

### Unknowns

- No public docs, supported-agent list, OS list or pricing found.
- Speed and false-positive figures are vendor claims.
- Funding split and founding month conflict across sources.

## GhostEye

### Buyer problem (vendor-agnostic)

Attackers increasingly target people rather than systems: phishing, texts, calls to the help desk to reset a password or MFA. Annual training and generic phishing tests measure whether people finished a course, not whether a tailored attack would work. The buyer question is: **would a realistic attack built from what's public about our people succeed, and against whom?** This sits in [security awareness](../../lib/data/categories.ts), with overlap into pentesting and breach simulation.

### Company

| Field | Value | Source / confidence |
| --- | --- | --- |
| Founded | 2025 | YC page (high) |
| Accelerator | Y Combinator Summer 2025 | YC page (high) |
| HQ | New York (one aggregator says San Francisco) | YC page |
| Team | 3 (YC page); other directories list 4–5 | Low |
| Founders | Mohammad Eshan (CEO; ex-BlackRock red team lead, MITRE offensive operations), Charles Antoine Malenfant (CTO; ex-BlackRock senior AI engineer) | YC page |
| Funding | About $500K per PitchBook and others; Tracxn lists it as unfunded | Conflicting |
| Customers | None named in any source reviewed | — |
| Website | ghosteye.ai (not fetched from this session) | — |

### Product (vendor-reported or directory-reported)

- OSINT agents map each employee's public exposure: role, online presence, public information.
- Voice and messaging agents run personalized, multi-step social engineering campaigns over email, SMS and voice.
- Help-desk testing: AI voice agents try to reset passwords or bypass MFA through outsourced help desks (directory listing only).
- Per-person risk scores tracked over time; employees are shown how they were compromised.

### Placement

Primary: security awareness. Adjacent: pentest program (it runs live attacks, closer to a red-team test than a training course) and breach simulation. It is not an email security filter.

### Unknowns

- Funding, headcount and HQ differ across aggregators.
- No customers or pricing.
- A favorable founder profile (Chicago Reporter, Apr 2026) was found but not used as a source: it names no customers or investors, and its format suggests promotional content.

## Others in the space

Added in the same batch so each profile has neighbors on its category page. Records: [agent-runtime-human-layer.ts](../../lib/data/agent-runtime-human-layer.ts). Seven vendors, seven products, ten sources, fourteen claims. Sharing a category does not make any of these a direct competitor of Bay or GhostEye; the buyer scenario decides that.

### Agent runtime (beside Bay)

| Vendor | HQ | Funding (reported) | Where it acts | Note |
| --- | --- | --- | --- | --- |
| Manifold | California | $8M seed, Costanoa, Mar 2026 | Endpoints; detect and respond (quarantine, terminate) | Founders built Laiyer AI, acquired by Protect AI |
| Capsule Security | Tel Aviv | $7M seed, Lama Partners and Forgepoint, Apr 2026 | Inside the agent's execution path; no proxy or SDK | Open-source ClawGuard pre-invocation checkpoint |
| AIR Security | New York | $50M: $10M Sequoia-led + $40M Greenoaks-led, Sep 2026 | Between agents and skills, plugins, MCP servers | Primary in MCP and tool security, not runtime |
| Kontext Security | Munich | $4M, 42CAP, Sep 2026 | Between agents and tools; observe then enforce | Task-aware authorization; adjacent to agent identity |

Bay's sourced difference among these: per-action verdicts on the device through a native hook, installed through existing MDM/EDR.

### Human-layer attack simulation (beside GhostEye)

| Vendor | HQ | Funding (reported) | Channels | Note |
| --- | --- | --- | --- | --- |
| Adaptive Security | New York | $43M (a16z, OpenAI Startup Fund) Apr 2025, $55M total by Sep 2025 | Voice, SMS, email deepfake personas | Not Adaptive Shield (SSPM), a separate record |
| Jericho Security | New York | $15M Series A, Era Fund, Apr 2025 | Email, SMS, voice, video | $1.8M AFWERX contract |
| Hoxhunt | Finland (200+ staff) | Not recorded | Phishing training, behavior risk, reported-threat handling | Established human risk management platform |

KnowBe4 was already in the catalog. GhostEye's sourced difference among these: OSINT-first targeting of each person, and help-desk voice testing (directory-sourced).

### Not added

Seen but not added in this pass: Asymptote Labs, Eve Security, Rein Security, CodeIntegrity, Geordie AI, Arcjet's coding-agent runtime feature, and other human-layer tools named in comparison posts (Doppel, Brightside, Breacher). Each needs its own sourced record.

## Sources not used

Aggregator and directory pages that only repeat launch coverage (Dealroom, Tracxn, Crunchbase, startup directories) were checked for agreement but not recorded as separate sources, except PitchBook (funding) and CyberSecTools (help-desk testing).
