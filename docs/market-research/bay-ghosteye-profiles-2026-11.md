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

### Market context

For incumbents, M&A, funding and an ICP hypothesis around Bay, see [AI agent security market structure](ai-agent-security-market-structure-2026-11.md) (25 Nov 2026).

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
| Team | 6 as of 2026-11-25 | Current YC page |
| Founders | Mohammad Eshan (CEO; ex-BlackRock red team lead, MITRE offensive operations), Charles Antoine Malenfant (CTO; ex-BlackRock senior AI engineer) | YC page |
| Funding | About $500K per PitchBook and others; Tracxn lists it as unfunded | Conflicting |
| Customers | Eight Sleep, Everest Global Insurance, Day One Agency, Fella Health, Precision Medicine Group, Kontigo | Vendor-displayed logos; commercial status unknown |
| Website | ghosteye.ai | First-party site reviewed 2026-11-25 |

### Product (vendor-reported or directory-reported)

- OSINT agents map each employee's public exposure: role, online presence, public information.
- Voice and messaging agents run personalized, multi-step social engineering campaigns over email, SMS and voice.
- Help-desk testing: AI voice agents try to reset passwords or bypass MFA through outsourced help desks (now also described on the first-party platform).
- Per-person risk scores tracked over time; employees are shown how they were compromised.

### Placement

Primary: security awareness and breach simulation (dual placement). Adjacent: pentest program. It validates controls rather than acting as an email filter or identity enforcement product.

### Unknowns

- Funding, headcount and HQ differ across aggregators.
- Pricing, paid customer count, ACV and depth of automation remain unknown.
- A favorable founder profile (Chicago Reporter, Apr 2026) was found but not used as a source: it names no customers or investors, and its format suggests promotional content.

### Commercial use cases and market sizing (2026-11-25 refresh)

The [official platform](https://ghosteye.ai/platform/) and [homepage](https://ghosteye.ai/) now describe human-layer simulation together with scoped technical control validation. The [current YC profile](https://www.ycombinator.com/companies/ghosteye) describes continuous red teaming and remediation. YC currently lists Mohammad Eshan as the active founder; Charles Antoine Malenfant's current status is unconfirmed.

| Use case | Likely buyer / partner | Outcome to measure |
| --- | --- | --- |
| Personalized social engineering simulation | Human risk / awareness | Reporting and verification effectiveness |
| Help-desk recovery validation | IAM / IT service desk | Recovery control effectiveness |
| Scoped identity and application access validation | IAM / security engineering | Whether approved access checks succeed or are blocked |
| Detection and response validation | SOC / red team | Evidence of detection and response gaps |
| Remediation and repeat testing | CISO / security assurance | Whether remediation holds on retest |

Buyer and budget mappings are analytical hypotheses, not confirmed purchasing history. Potential budget sources: security awareness, BAS, red teaming and identity security assurance. Initial ICP hypothesis: organizations with dedicated security, identity and help-desk owners, especially financial services, insurance, healthcare and technology. Potential peers include Adaptive Security, Jericho Security, Hoxhunt and Breacher.ai; BAS vendors such as Cymulate and AttackIQ are adjacent alternatives, not verified direct competitors.

| Global adjacent market | 2026 estimate | Forecast | Source |
| --- | --- | --- | --- |
| Security awareness training | $6.74B | $14.66B in 2031 | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/security-awareness-training-market) |
| BAS | $733.6M | $7.51B in 2033 | [Grand View Research](https://www.grandviewresearch.com/industry-analysis/automated-breach-attack-simulation-market-report) |
| BAS | $1.29B | $3.61B in 2031 | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/breach-and-attack-simulation-market) |

Different analyst definitions and forecast methods produce different estimates. Do not add these overlapping markets or treat either as GhostEye's TAM. Illustrative bottom-up scenario: 10,000 eligible accounts × $75,000 annual contract value = $750M annual addressable spend; 2% penetration = 200 accounts and $15M ARR. Neither input is validated; actual eligibility, ACV, geography, procurement and delivery capacity require research. No company-reported TAM is established.

## Others in the space

Added in the same batch so each profile has neighbors on its category page. Records: [agent-runtime-human-layer.ts](../../lib/data/agent-runtime-human-layer.ts). Sixteen vendors, sixteen products, forty-four sources, fifty-four claims and seven launch events. Founders, HQ, funding history and named customers are applied in [agent-runtime-human-layer-profiles.ts](../../lib/data/agent-runtime-human-layer-profiles.ts). Sharing a category does not make any of these a direct competitor of Bay or GhostEye; the buyer scenario decides that.

### Agent runtime (beside Bay)

| Vendor | HQ | Funding (reported) | Where it acts | Note |
| --- | --- | --- | --- | --- |
| Manifold (CEO Neal Swaelens) | California | $8M seed, Costanoa, Mar 2026 | Endpoints; detect and respond (quarantine, terminate) | Founders built Laiyer AI, acquired by Protect AI |
| Capsule Security (CEO Naor Paz) | Tel Aviv | $7M seed, Lama Partners and Forgepoint, Apr 2026 | Inside the agent's execution path; no proxy or SDK | Open-source ClawGuard pre-invocation checkpoint |
| AIR Security (Yair Saban, Niv Hoffman) | New York | $50M: $10M Sequoia-led + $40M Greenoaks-led, Sep 2026 | Between agents and skills, plugins, MCP servers | Primary in MCP and tool security, not runtime |
| Kontext Security (Jens Ernstberger, Michel Osswald) | Munich | $4M, 42CAP, Sep 2026 | Between agents and tools; observe then enforce | Task-aware authorization; adjacent to agent identity |
| Asymptote Labs (Justin D'Souza, Shukan Shah) | New York | $5.5M seed, Tower Research Ventures, Oct 2026 | Endpoints; telemetry first, paid blocking | Open-source Beacon (MIT) records 23+ agent harnesses |
| Rein Security (CEO Matan Bar-Efrat) | New York / Tel Aviv | $25M Series A, Oct 2026 ($35M total) | Sidecar where agents execute | Started in application runtime security; names Lemonade, Dun & Bradstreet |
| Geordie AI (Henry Comfort, Benji Weber, Hanah-Marie Darley) | London | $30M Series A, Balderton, May 2026; $36.5M total | Cloud, code and endpoint agents; Beam remediation | Governance-first; adjacent to AI governance |
| Arcjet (David Mytton) | San Francisco | $3.6M seed (a16z) + $8.3M A (Plural); ~$12M total | Inside app and agent code via SDKs | Developer security company; agent runtime security added Sep 2026 |
| Eve Security (Nadav Cornberg, Sharon Eilon, Amit Eliav) | Austin | $3M seed + $4.5M extension; $7.5M total | Agent platforms: Databricks, Copilot Studio, AgentCore, Bedrock, Glean | Deterministic policy enforcement |
| CodeIntegrity (Steven Jung, Abi Raghuram) | San Francisco (founded near Seattle, 2024) | $5M seed, Syn Ventures; $5.25M total | Between agents and enterprise systems | Known for a Notion AI research compromise |

Bay's sourced difference among these: per-action verdicts on the device through a native hook, installed through existing MDM/EDR.

### Human-layer attack simulation (beside GhostEye)

| Vendor | HQ | Funding (reported) | Channels | Note |
| --- | --- | --- | --- | --- |
| Adaptive Security (Brian Long, Andrew Jones) | New York | $55M Series A; $81M Series B (Bain Capital Ventures) Dec 2025; $146.5M total | Voice, SMS, email deepfake personas | Not Adaptive Shield (SSPM), a separate record |
| Jericho Security (CEO Sage Wohns) | New York | $15M Series A, Era Fund, Apr 2025 | Email, SMS, voice, video | $1.8M AFWERX contract |
| Hoxhunt (Mika Aalto, Pyry Åvist) | Helsinki (200+ staff) | $40M Series B, Level Equity, 2022; ~$43M total | Phishing training, behavior risk, reported-threat handling | Established human risk management platform |
| Doppel (Kevin Tian, Rahul Madduluri) | Not confirmed | $70M Series C, Bessemer, Nov 2025; $124M total, >$600M valuation | Email, SMS, messaging apps, voice, meeting apps | Primary in digital risk protection; Simulation turns real detected phishing into campaigns |
| Brightside AI (Andrey Suzdaltsev, Andrey Lazarev) | Prilly/Lausanne, Switzerland | $1M, Social Links, 2023 | Email, live vishing calls, deepfake video | Vishing also sold as an add-on |
| Breacher.ai (CEO Jason Thatcher) | Orlando | Not found | Agentic deepfake voice, live deepfake video, help-desk tests | Red-team style; self-serve simulator from $199/month |

KnowBe4 was already in the catalog. GhostEye's sourced difference among these: OSINT-first targeting of each person, and help-desk voice testing (directory-sourced).

### Website caveat

Website check (2026-11-24): Geordie AI's homepage (geordie.ai) was fetched and now backs its `website` field. Kontext's site (kontext.security) comes from its company-run DEV Community profile; the homepage itself was not fetched. CodeIntegrity, Capsule and AIR still have no confirmed first-party website: their `website` field points to a launch or funding announcement, and each record says so. (A CodeIntegrity staff comment on Hacker News mentions codeintegrity.ai; that is a lead, not a confirmation.)

## Sources not used

Aggregator and directory pages that only repeat launch coverage (Dealroom, Tracxn, Crunchbase, startup directories) were checked for agreement but not recorded as separate sources, except PitchBook (funding) and CyberSecTools (help-desk testing).
