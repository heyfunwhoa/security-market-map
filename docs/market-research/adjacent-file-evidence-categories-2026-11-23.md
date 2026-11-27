# Adjacent file and evidence categories — November 2026

**Scope:** public industry research. **Status:** research note; the three categories are now typed (`lib/data/ecosystem.ts`), each with two research-candidate vendors/products and vendor-published claims. Not benchmarked, not a feature-parity table, not a competitor list for any one vendor. **Prepared:** 2026-11-23. **Next editorial check:** 2027-01-23. **Method:** [Competitive Intelligence Playbook](competitive-intelligence-playbook.md).

**Evidence status (2026-11-23):** typed records: Velociraptor (existing `rapid7`), Binalyze AIR, Thinkst Canary and OPSWAT Deep CDR. Their official pages were opened and checked (claims at `medium`). Acalvio ShadowPlex was also opened and checked (`medium`). Votiro CDR rests on Votiro's support page as shown in search-index text (`low`), because votiro.com now redirects to Menlo Security. Every other vendor row below is secondary. Several roundups are written by a vendor in the same category (noted per source).

## Why these three

The catalog already covers file verdicts and retained-evidence hunting (`malware-analysis`), AI investigation (`ai-soc-investigation`), endpoint controls (`endpoint-security`, `xdr`), intel (`threat-intelligence`) and services (`mdr`). The searches on 2026-11-23 found no category for three neighbouring jobs a SOC or IR team buys around the same incident:

| Proposed category (id) | Job | Where it sits in the incident |
| --- | --- | --- |
| `dfir-collection` — Digital forensics and IR collection | Collect and preserve evidence from endpoints and cloud at speed | After an alert: scope, evidence, timeline |
| `deception` — Deception and decoys | Plant decoys and honeytokens that only an intruder would touch | Before or during: early, high-fidelity detection |
| `cdr-file-sanitization` — Content disarm and reconstruction | Strip active content from inbound files and rebuild a safe copy | Before: prevent file-borne threats at entry points |

These fill a gap the repo already records: the `digital-forensics` seat has an unlinked pain ("Retainer scope doesn't match the incident", `context/gaps.json`) and no category of its own.

## Zoom placement (progressive exploration)

- **Zoom out — domain:** Security operations (`secops` in `lib/data/ecosystem.ts`) for `dfir-collection` and `deception`. `cdr-file-sanitization` is cross-domain: it is bought for email, web and removable-media paths, so it would sit between `secops` and the existing `email-security` category.
- **Zoom in — buyer decisions:**
  - DFIR: "We have an incident. How fast can we collect forensic-grade evidence from every affected host, and who runs it: us or the retainer firm?"
  - Deception: "Can we get alerts that are almost never false positives, without adding agents everywhere?"
  - CDR: "Can we let people open files from outside without detonating or scanning every one?"
- **Reused IDs:** seats `digital-forensics`, `incident-response`, `threat-hunter`, `soc-lead`; categories `malware-analysis`, `endpoint-security`, `email-security`, `mdr`, `itdr`. Rapid7 and Google may already exist as vendors; check before adding product records.
- **Typed links added:** `dfir-collection` → seats `digital-forensics`, `incident-response`; `deception` → `threat-hunter`, `soc-lead`; `cdr-file-sanitization` → `ot-security`. `malware-analysis` now lists `dfir-collection` and `cdr-file-sanitization` as adjacent. Two hypothesis alternatives per category in `lib/data/alternatives.ts`.
- **Navigation change:** none. Each appears through existing category and seat pages.
- **Back out:** each links back to `malware-analysis` and `xdr` as complementary layers in the same incident.

## 1. Digital forensics and IR collection (`dfir-collection`, proposed)

**Plain definition:** tools that remotely collect and preserve forensic evidence (disk and memory artifacts, logs, volatile data) from endpoints and cloud workloads, then triage or analyse it for incident scoping and timelines. This is not the same as EDR telemetry, which is continuous but not forensic-grade, nor is it an IR retainer, which is people under contract.

**Relationship to `malware-analysis`:** complementary. DFIR collects the evidence; file analysis judges the files within it. Retained-evidence products overlap partly, since both answer "was this here before?", but they collect different things.

| Vendor / product | Public context | Evidence status |
| --- | --- | --- |
| Velociraptor (open source; Rapid7-backed) | Open-source endpoint monitoring, forensic collection and hunting: an agent on each host plus a central server [OF6, DF1] | **Typed** (`velociraptor`); official docs opened 2026-11-23 |
| Binalyze AIR | Says AIR automates DFIR with remote evidence collection and analysis across operating systems [OF9]; brochure mentions an agentic investigator [DF4]. Update 2026-11-25: binalyze.com now redirects to binalyze.ai, and an AI SOC use case pitches AIR as the evidence layer for AI SOC workflows via APIs, MCP and its Fleet workspace [OF13] | **Typed** (`binalyze-air`); official homepage opened 2026-11-23; AI SOC page opened 2026-11-25 |
| Magnet Forensics (AXIOM Cyber) | Digital investigation platform for acquiring and analysing forensic data; also strong in law-enforcement and corporate investigations [DF5, DF6] | Secondary |
| CrowdStrike Falcon Forensics; Cyber Triage; OpenText Endpoint Investigator; F-Response; Volexity; Darktrace (forensic acquisition, ex-Cado) | Named in DFIR tool roundups [DF5, DF6, DF7] | Candidates only |

**Binalyze update (2026-11-25):** the AI SOC page lists AI SOC vendors and MSSPs as partner audiences, and names Fleet (agentic investigation workspace) and Outpost (browser-based investigation) alongside AIR [OF13]. Binalyze is therefore mapped as adjacent to `ai-soc-investigation`, not primary. Secondary context, not verified: a $19M Series A in September 2023 led by Molten Ventures, with Cisco Investments, Citi Ventures and Deutsche Bank's venture arm; a binalyze.com pricing page captured in search results showed per-asset monthly tiers. Current pricing is Unknown.

**Open questions:** how many buyers get DFIR tooling through an IR retainer or MDR rather than buying it directly; overlap with EDR "forensics" add-ons; open-source versus commercial support cost.

## 2. Deception and decoys (`deception`, proposed)

**Plain definition:** decoy assets (fake hosts, services, credentials, files, cloud keys, honeytokens) placed where legitimate users have no reason to go, so that touching one is a strong signal of an intruder.

**Relationship to existing categories:** complementary to `xdr`, `siem` and `itdr`. Identity-focused deception overlaps partly with `itdr`. Honeytoken cloud keys overlap partly with `secrets-detection` workflows; that is a hypothesis only.

| Vendor / product | Public context | Evidence status |
| --- | --- | --- |
| Thinkst Canary / Canarytokens | Canary decoys plus free Canarytokens in document, credential, VPN-profile and QR formats [OF7]; widely cited as the easy-deployment benchmark [DC2, DC3] | **Typed** (`thinkst-canary`); official help page opened 2026-11-23 |
| Acalvio ShadowPlex | Says ShadowPlex deploys deception agentlessly across identity, cloud, network, endpoints and OT/ICS [OF10]; GigaOm Radar reprint distributed by Acalvio [DC4] | **Typed** (`acalvio-shadowplex`); official homepage opened 2026-11-23 |
| Tracebit | Cloud and CI/CD canary deployment [DC1] | Vendor-authored roundup ranks itself first; treat with caution |
| CounterCraft, Lupovis, Labyrinth, Zscaler (deception), SentinelOne (ex-Attivo), Proofpoint (ex-Illusive), Fortinet, Rapid7 | Named in GigaOm vendor list and roundups [DC4, DC2] | Candidates only |

**Market note (secondary):** one buyer guide says several pioneers now ship inside larger platforms [DC2]. That points to bundling as the common no-decision alternative.

## 3. Content disarm and reconstruction (`cdr-file-sanitization`, proposed)

**Plain definition:** prevention-first file sanitization. Active or risky content (macros, scripts, embedded objects) is removed and a usable copy is rebuilt, rather than the original being judged malicious or not. Typical entry points are email, web download, file transfer and removable media.

**Relationship to `malware-analysis`:** a different approach to the same file risk. CDR neutralises without a verdict; malware analysis produces a verdict and context. Many CDR products also bundle multi-AV scanning or sandboxing [CD2]. Complementary in layered designs, and partly an alternative for inbound-file use cases.

| Vendor / product | Public context | Evidence status |
| --- | --- | --- |
| OPSWAT MetaDefender (Deep CDR) | Says Deep CDR disarms and regenerates files and covers 200+ file types [OF8]; also bundles multi-engine scanning [CD2] | **Typed** (`opswat-deep-cdr`); official page opened 2026-11-23 |
| Votiro | Says its CDR disarms and rebuilds incoming files for email, downloads, file sharing and removable media [OF11]. **Acquired by Menlo Security (announced 2025-02-19) [OF12]; votiro.com redirects to menlosecurity.com** | **Typed** (`votiro-cdr` under vendor `menlo-security`, former name Votiro); official pages via search-index text |
| Glasswall | Named CDR vendor [CD3] | Secondary |
| Check Point (Threat Extraction), Sasa Software (GateScanner), odix, SoftCamp, YazamTech | Named in market reports and directories [CD2, CD3, CD4] | Candidates only |

**Open questions:** whether buyers fund CDR from email security, OT/critical infrastructure or SecOps budgets; how far CDR is now bundled into email gateways.

## Further adjacencies considered and not proposed

- **Sandboxing as its own category:** already covered as a method inside `malware-analysis`.
- **Binary code similarity / family attribution** (Threatray, Intezer's origins): left as a method inside `malware-analysis`.
- **Security data lake:** `siem` already discusses lake-based approaches. Revisit only with a distinct buyer decision.
- **IR retainers:** a services operating model; better modelled under `mdr` and seat pains than as a product category.

## Unknowns

Budget ownership for each proposed category; how far EDR and XDR suites bundle each one (the likely no-decision alternative); actual buyer overlap with `malware-analysis`; current ownership of several acquired deception and forensics vendors (secondary reports only).

## Sources

| ID | Publisher / title | URL | Type | Observed |
| --- | --- | --- | --- | --- |
| DF1 | Tech Insider — How to set up Velociraptor DFIR (2026) | https://tech-insider.org/?p=29809 | Secondary | 2026-11-23 |
| DF2 | Slashdot — Binalyze AIR vs Velociraptor | https://slashdot.org/software/comparison/Binalyze-AIR-vs-Velociraptor/ | Directory | 2026-11-23 |
| DF3 | SourceForge — Binalyze AIR | https://sourceforge.net/software/product/Binalyze-AIR/ | Directory | 2026-11-23 |
| DF4 | Binalyze — AIR extended brochure 2026 (search snippet) | https://marketing.binalyze.com/hubfs/Content/Brochures/Binalyze_AIR_Extended_Brochure_2026.pdf | Vendor (not opened) | 2026-11-23 |
| DF5 | Forensic Focus — DFIR tool directory | https://www.forensicfocus.com/dfir-tool-directory/ | Directory | 2026-11-23 |
| DF6 | Belkasoft — Top digital forensics software 2026 | https://belkasoft.com/top-digital-forensics-software-2026 | Vendor-authored roundup | 2026-11-23 |
| DF7 | Cyber Triage — Remote forensic collection tools | https://www.cybertriage.com/blog/remote-forensic-collection-tools-2025/ | Vendor-authored roundup | 2026-11-23 |
| DC1 | Tracebit — Best deception vendors 2026 | https://ai.tracebit.com/task/blog/best-deception-vendors-2026 | Competitor-authored roundup | 2026-11-23 |
| DC2 | GBHackers — Deception technology buyer's guide 2026 | https://gbhackers.com/deception-technology-buyers-guide/amp/ | Secondary | 2026-11-23 |
| DC3 | Deepak Gupta — Top honeypot and deception tools 2026 | https://guptadeepak.com/tools/top-5-honeypots-deception-tools-2026/ | Secondary | 2026-11-23 |
| DC4 | GigaOm Radar for Deception Technology v5 (Acalvio reprint) | https://portal.gigaom.com/reprint/gigaom-radar-for-deception-technology-v5-acalvio | Analyst reprint via vendor | 2026-11-23 |
| DC5 | SACR — The next evolution of cyber deception in SecOps | https://softwareanalyst.substack.com/p/the-next-evolution-of-cyber-deception | Analyst | 2026-11-23 |
| CD1 | OPSWAT — CDR: 8 best vendors in 2026 | https://www.opswat.com/blog/content-disarm-reconstruction-cdr-8-best-vendors-in-2026 | Vendor-authored roundup | 2026-11-23 |
| CD2 | iThome — CDR vendor overview | https://www.ithome.com.tw/tech/122771 | Secondary | 2026-11-23 |
| CD3 | MarketResearch.com — Global CDR market report listing | https://www.marketresearch.com/Deep-Insights-Research-Co-DIR-v4285/Global-Content-Disarm-Reconstruction-CDR-41705778 | Market report listing | 2026-11-23 |
| OF6 | Velociraptor — What is Velociraptor? | https://docs.velociraptor.app/docs/overview/ | Official docs (opened) | 2026-11-23 |
| OF7 | Thinkst — Canarytoken overview and use cases | https://help.canary.tools/hc/en-gb/articles/10905485310109-Canarytoken-Overview-and-Use-Cases | Official docs (opened) | 2026-11-23 |
| OF8 | OPSWAT — Deep CDR technology | https://www.opswat.com/technologies/deep-cdr | Vendor (opened) | 2026-11-23 |
| OF9 | Binalyze — homepage | https://www.binalyze.com/ | Vendor (opened) | 2026-11-23 |
| OF10 | Acalvio — homepage / ShadowPlex | https://www.acalvio.com/ · https://www.acalvio.com/shadowplex-platform/ | Vendor (opened) | 2026-11-23 |
| OF11 | Votiro — CDR support article | https://support.votiro.com/hc/en-us/articles/360014301677-Content-Disarm-and-Reconstruction-CDR | Vendor (opened 2026-11-26) | 2026-11-23 |
| OF12 | Menlo Security — Menlo Security acquires Votiro (2025-02-19); corroborated by Business Wire, SiliconANGLE | https://www.menlosecurity.com/blog/menlo-security-acquires-votiro | Acquirer announcement (search-index text) | 2026-11-23 |
| OF13 | Binalyze — AI SOC & Agentic Investigations use case | https://binalyze.ai/use-case/ai-soc/ | Vendor (opened) | 2026-11-25 |
| CD4 | Slashdot — CDR software directory | https://slashdot.org/software/content-disarm-reconstruction-cdr/ | Directory | 2026-11-23 |

Rights: short paraphrase only; no reproduced vendor copy.

## Consumer disposition

- **Security Market Map catalog:** three typed categories added with two vendors each. Votiro is modelled under a new `menlo-security` vendor (primary `enterprise-browser`) with Votiro as a former name, following the Fortra / Digital Guardian pattern. Next: confirm Votiro's current product name inside Menlo's portfolio, then consider Magnet Forensics, Tracebit and Glasswall.
- **Other projects:** no change proposed.

**Correction (2026-11-26):** Votiro was removed from Menlo Security's former names. Menlo acquired Votiro; it was never called Votiro. The Votiro CDR product record still carries the name. OF11 and OF12 were opened and confirmed.
