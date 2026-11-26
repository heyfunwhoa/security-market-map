# File analysis, retained-evidence hunting and AI investigation — November 2026

**Scope:** public industry research. **Status:** candidate research note, not published typed claims, not benchmarked, not a feature-parity table. **Prepared:** 2026-11-11. **Next editorial check:** 2026-12-11 or on a material launch/acquisition. **Method:** [Competitive Intelligence Playbook](competitive-intelligence-playbook.md).

## Zoom placement (progressive exploration)

- **Zoom out — domain:** Security operations (`secops` domain in `lib/data/ecosystem.ts`, beside `siem`, `soar`, `xdr`, `mdr`, `threat-intelligence`, `detection-engineering`).
- **Typed category added in this PR:** `malware-analysis` ("File and malware analysis"), covering layers 1 and 2 below. Linked from the `threat-hunter`, `incident-response` and `digital-forensics` seats; two hypothesis alternatives (public lookup/sandbox services, EDR-bundled verdicts).
- **Category layers (proposed, research-only):**
  1. File and malware analysis (verdict on a file)
  2. Retained-evidence hunting (keep files, re-check history as intel changes)
  3. AI SOC / agentic investigation (investigate an alert end to end)
  4. Incumbent platform AI (EDR/XDR/SIEM vendors adding agents)
- **Zoom in — buyer decision:** "An alert fired on a file. Is it malicious, what else is related, where did it spread, and did we get everything?"
- **Back out:** related SOC automation and MSSP/MDR layers are mapped in [Agentic SecOps and MSSP/MDR landscape](agentic-secops-competitive-landscape.md). Do not duplicate those vendor records here.
- **Reused IDs:** `reversinglabs` already exists as a vendor (secrets sweep). Its file-analysis products would be new product records under that vendor, not a new vendor. No other vendors below exist in the catalog (searched 2026-11-11).
- **Navigation change:** none; the category appears through existing category and seat pages. Layer 3 is now the typed category `ai-soc-investigation` ("AI SOC investigation"), defined against `soar` (fixed playbooks) and `mdr` (people under contract), and linked from the `soc-lead`, `soc-analyst` and `incident-response` seats.
- **Typed records added (all `research_candidate`, one vendor-published claim each, official page inspected 2026-11-11):** Stairwell, ReversingLabs Spectra Analyze (existing `reversinglabs` vendor), VirusTotal (existing `google` vendor) in `malware-analysis`; Prophet Security, Dropzone AI, Intezer in `ai-soc-investigation`. Torq, sandboxes, GLIMPS, Threatray and others stay research-only until their official pages are inspected.

## Plain definition

**File analysis:** determine whether a file (usually an executable or script) is malicious, what it was built to do, and what it is related to. Common methods: static analysis (inspect structure and code without running it), dynamic analysis/sandboxing (detonate and observe behavior), signature/YARA matching, reputation lookup, and code-similarity/family clustering.

## Buyer problem context: EDR evasion (added 2026-11-23)

These are attributed threat research findings, not incidents and not product claims. They explain why a buyer might want a layer beyond endpoint detection. They do not show that any product in this note would have caught this activity.

- **Attackers test tooling against specific EDR agents.** Sophos researchers describe an actor who built a virtual-machine lab, with hosts running the Sophos and CrowdStrike agents plus a no-EDR control, to develop and test bypass tooling. Windows Defender is also named as a target. The work was found on one endpoint in an unnamed customer tenant [SX1].
- **AI sped this up, but humans drove it.** The same research says the actor used AI coding agents to write and revise the tooling. Sophos assesses that AI mainly coordinated workflows, and that the evasion work was a human-reviewed engineering cycle [SX1].
- **Claimed success is disputed.** The agents' own reports claimed near-universal bypass after iteration. Sophos says the documented output does not necessarily support that, so don't cite a success rate [SX1].
- **Attackers dwell longer.** Mandiant reports global median dwell time rose to 14 days in 2025, from 11 days in 2024 [MT1]. This supports the case for re-checking retained evidence, though it doesn't prove that case.
- **Counterpoint for file-centric tools.** CrowdStrike reports that 82% of its 2025 detections were malware-free [CS1]. File and malware analysis addresses only the share of intrusions that leave files behind. A buyer may weigh identity and behavior-based controls higher.

Unknowns: how common pre-deployment EDR testing is beyond this one case; whether the Sophos endpoint belonged to a victim or the actor; and the Sophos post's publication date (a secondary summary dated it 2026-06-05).

## Layer 1 — File and malware analysis

| Vendor / product | Positioning (source-attributed) | Relationship to buyer decision | Evidence status |
| --- | --- | --- | --- |
| Google VirusTotal | Widely used file/URL reputation and analysis service | Incumbent/no-decision for many SOCs; partial overlap | Official upload page inspected 2026-11-11 (OF5) |
| ReversingLabs (Spectra Analyze / Spectra Detect) | Says it offers deeper file intelligence than VirusTotal using AI-driven and proprietary static and dynamic techniques [RL1] | Partial overlap | Official product page inspected 2026-11-11 (OF4); reseller comparison is vendor-published |
| Intezer | Malware analysis using code-reuse ("genetic") analysis [CT1]; also sells an AI SOC (Layer 3) | Partial overlap in Layers 1 and 3 | Official homepage inspected 2026-11-11 (OF3); now positions primarily as AI SOC |
| ANY.RUN, VMRay, OPSWAT MetaDefender Sandbox | Sandbox / dynamic analysis [CT1, CT2] | Partial overlap or complementary (different method) | Secondary directory |
| Threatray | AI-driven binary code search and malware family attribution [CT3] | Partial overlap (variant/family) | Secondary directory |

## Layer 2 — Retained-evidence hunting

| Vendor / product | Positioning (source-attributed) | Relationship | Evidence status |
| --- | --- | --- | --- |
| Stairwell | Preserves executables from enrolled endpoints in a private environment without a retention window; reruns IOCs, YARA and threat reports across history; Variant Discovery; Backstory agentic investigator; per-asset pricing including investigations [SW1–SW4] | Reference position for this layer | Vendor-published; inspected 2026-11-11; not tested |
| GLIMPS Fortress (France) | On-premise AI file repository with continuous malware analysis and retrohunting [CT4] | Candidate partial overlap | Secondary directory; official pages not inspected |

### Investigating a developer package after removal

A developer removes a dependency on Friday. On Monday, an advisory identifies the old version as malicious. The SOC and developer-platform team need to know which machines saw it, whether they can recover the original file, and whether related files appeared under other hashes. A package-version record can identify a laptop to investigate. A retained copy lets an analyst inspect the file again. Process evidence helps establish whether it ran.

| Provider and product | Evidence available after the advisory | Coverage question |
| --- | --- | --- |
| Stairwell Rehunt and Backstory | Stairwell retains the original bytes of collected files. Analysts can apply new rules to those files and use the investigation graph to inspect related files, machine sightings, paths and times. | Did the collection policy include the actual script or executable on the laptop or build runner before removal? [Collection policy](https://docs.stairwell.com/docs/policies-overview) · [Stored files](https://docs.stairwell.com/docs/objects) · [YARA rules](https://docs.stairwell.com/docs/yara-rules) · [Investigation graph](https://docs.stairwell.com/docs/reading-the-investigation-graph) |
| LimaCharlie BinLib | With BinLib enabled, an analyst can download previously captured executables by hash and run YARA rules over that private collection. | Which executable did the sensor capture? Verify collection of a script-only dependency separately. [BinLib operations](https://docs.limacharlie.io/5-integrations/extensions/limacharlie/binlib/) |
| CrowdStrike Falcon | CrowdStrike describes a fleet-wide search of historical data when a previously downloaded package is newly flagged. Its announcement names npm and PyPI. | Can the responder also retrieve the original file after deletion? The vendor announcement establishes the historical search. Raw-file recovery through this feature is unknown. [Real-Time Supply Chain Attack Protection](https://www.crowdstrike.com/en-us/blog/crowdstrike-extends-endpoint-security-to-stop-supply-chain-attacks/) |
| Broadcom Carbon Black Cloud Enterprise EDR | The Unified Binary Store can return Windows PE files uploaded under the endpoint policy after execution. Process search links an executable hash to a device name and start time. | Was the artifact an executed Windows binary on an upload-enabled device? The store retains only the first 25 MB of larger files. Its device summaries cover executions in the preceding three months. [Unified Binary Store overview](https://developer.carbonblack.com/reference/carbon-black-cloud/cb-threathunter/latest/unified-binary-store-api/) · [Process search fields](https://developer.carbonblack.com/reference/carbon-black-cloud/platform/latest/platform-search-fields/) |
| Microsoft Defender for Endpoint | The file page shows device sightings. An analyst can download a sample Defender already stored. If a copy still needs to be collected, Defender retrieves it from its current device path. | Which machines saw the file, and was a downloadable copy stored before it disappeared? [File investigation](https://learn.microsoft.com/en-us/defender-endpoint/investigate-files) · [File response actions](https://learn.microsoft.com/en-us/defender-endpoint/respond-file-alerts) |
| ReversingLabs Spectra Analyze | Local Retro Hunting applies YARA rules to samples held on the customer's appliance. An analyst can download a local sample by hash. Cloud Retro Hunting searches a separate ReversingLabs collection. | Which input supplied the local sample, and what record links it to a named laptop or build runner at the relevant time? [Local and cloud retro hunting](https://docs.reversinglabs.com/SpectraAnalyze/yara-retro/) · [Sample downloads](https://docs.reversinglabs.com/SpectraAnalyze/api-documentation/download-api/) |
| Aikido Device Protection | The package inventory records package name and version, first observation, and how many connected devices have it installed. Aikido also documents blocking known malicious installs. | Can an analyst still identify the device after uninstall and retrieve the removed file? Both remain open for this workflow. [Package inventory](https://help.aikido.dev/aikido-device-protection/using-aikido-endpoint/browsing-packages) · [Device Protection](https://help.aikido.dev/aikido-device-protection/endpoint-protection) |

For an evaluation, use a benign package and a modified copy on two enrolled test devices. Remove the original before sharing the advisory. Record which devices each tool identifies, whether the analyst can download the exact file, whether the hunt finds the modified copy, and what evidence supports execution. Time the investigation through the decision on which machines need follow-up.

Start with the existing tools, then repeat with the candidate on the same evidence and time window. Keep a separate record of the device IDs, hashes, times and actions used in the exercise so reviewers can check the findings. Save one worksheet per setup. Mark each finding confirmed, contradicted or unknown and cite the supporting record. Compare the time to a decision and whether the additional evidence changed the response. [Download the evaluation worksheet](../../public/worksheets/developer-package-advisory.csv)

The [developer-workstation use case](https://security-market-map.vercel.app/use-cases/developer-endpoint-protection) links to provider profiles. Use the [device exposure comparison](https://security-market-map.vercel.app/compare?use=uc-developer-endpoint&products=crowdstrike-platform,aikido-device-protection,microsoft-defender-for-endpoint,stairwell-platform) to review download history, inventory and sightings. Use the [retained file comparison](https://security-market-map.vercel.app/compare?use=uc-developer-endpoint&products=stairwell-platform,limacharlie-binlib,reversinglabs-spectra-analyze,carbon-black-cloud-enterprise-edr) to review recovery and historical hunts.

#### Worked example and decision handoff

This fictional exercise uses benign fixtures. The devices, evidence labels and elapsed minutes are illustrative. [Read the completed worksheet](../../public/worksheets/developer-package-advisory-example.csv).

**Technical handoff.** The original file appeared on laptop A and runner B. A process record confirms execution on B. On A, the recovered sample matches the fixture hash, while execution remains unknown. Laptop C was offline during the collection window. Developer platform owns the check linking B’s job to a release. Endpoint IT owns the coverage check for C.

**Executive update.** We confirmed the file ran on a build runner. The release owner is holding the relevant release while engineering checks which output the job produced. Customer impact is still unknown. The next update is due when engineering completes that trace or at the release decision deadline, whichever comes first.

**What changed the decision?** At minute 8, two file sightings justified investigation. At minute 12, the process record gave the team a reason to trace a specific build. Recovering the sample at minute 16 helped the analyst inspect it. That recovery alone would not establish release or customer impact.

Research notes checked 2026-11-24 against primary vendor sources. These are documented capabilities with no hands-on results recorded. The market-map maintainer owns editorial review at the guide's December 11 checkpoint or when a vendor changes collection, retention or entitlement.

## Layer 3 — AI SOC / agentic investigation

| Vendor | Public context | Relationship | Evidence status |
| --- | --- | --- | --- |
| Prophet Security | $30M Series A, Accel-led, July 2025 [MS1]; one report cites an AWS Marketplace entry tier of ~$50K/year for 5,000 investigations [TI1] | Partial overlap with Backstory's investigation step | Official homepage inspected 2026-11-11 (OF1); funding/pricing secondary; marketplace listing not inspected |
| Dropzone AI | $37M Series B, Theory Ventures, July 2025 [MS1]; markets AI agents that investigate alerts, hunt and respond on existing tools [OF2] | Partial overlap | Official homepage inspected 2026-11-11 (OF2); funding secondary |
| Torq | $140M Series D at $1.2B valuation, January 2026 [MS1] | Partial overlap; also in [agentic SecOps note](agentic-secops-competitive-landscape.md) | Secondary |
| Intezer | AI SOC combining agentic triage with forensic tools [ID1] | Partial overlap | Vendor-published (competitor-authored) |
| Others named in 2026 roundups | BlinkOps, Swimlane, Exaforce, D3 Security, Radiant Security, Conifers, 7AI, Command Zero [BO1, MS1] | Candidates only | Secondary; several roundups are vendor-authored |

Category caveat: a vendor-authored analysis notes the "agentic SOC" label now spans autonomous investigation, fixed enrichment and chatbot-style workflow generation [NH1]. Do not infer direct competition from the label.

## Layer 4 — Incumbent platform AI (often the real alternative)

CrowdStrike (Charlotte AI), SentinelOne (Purple AI), Palo Alto Networks (Cortex XSIAM), Google SecOps, Microsoft (Sentinel / Security Copilot) [MS1, BO1]. Relationship: incumbent/no-decision or complementary (Stairwell integrates with several of these as sources/destinations [SW4]). Evidence: secondary; official pages not inspected.

## Update 2026-11-23 — Stairwell enrichment

Placement unchanged: Stairwell stays in `malware-analysis` (Layer 2), adjacent to `ai-soc-investigation`, `threat-intelligence` and `soar`. One new typed claim (`claim-fill-stairwell-backstory-launch`, vendor press release [SW5]); everything else below is research-only.

- **Backstory launch (vendor-published) [SW5]:** announced 2026-07-29. Stairwell says Backstory traces related variants, identifies affected endpoints, maps blast radius, and re-examines preserved file history as new intelligence arrives, reasoning over executables rather than alerts. The release contrasts this with AI SOC tools focused on alert noise and triage speed. That framing is the vendor's, not an adopted category boundary.
- **Vendor research stat [SW5]:** Stairwell's Hidden Malware Report says that across 1,085 public threat reports, each published hash had on average 2.4 more related malicious variants. The method has not been reviewed here.
- **Vendor-stated corpus [SW5]:** 1.5B+ preserved executables, 110K+ detection rules, 20+ public intel sources. Not verified.
- **Named public reference [SW5]:** H&M Group's CSO is quoted in the release. A quote is not a deployment-scale claim.
- **Leadership (secondary, unverified) [SV1]:** a third-party profile says Emmy Linder (formerly Cybereason COO) became CEO in July 2025 and founder Mike Wiacek moved to CTO. The press release does call Wiacek "Founder and CTO", which supports the CTO half. Stairwell's own leadership page was not inspected.
- **Funding (secondary) [FD1]:** $45M Series B in October 2022, $69.5M total reported. No later round was found; that is not proof none exists.

Adjacent categories that sit around this buyer decision (DFIR collection, deception, CDR) are mapped in [Adjacent file and evidence categories](adjacent-file-evidence-categories-2026-11-23.md).

## Differentiation hypotheses (with falsification tests)

1. **Own-history retention is the differentiator, not AI.** Test which evidence changes the response decision when buyers already have local sample hunting or access to a threat-intelligence corpus.
2. **Per-asset pricing including investigations beats per-investigation pricing at high alert volume.** Falsified if total 12-month cost at the same workload is not lower, or buyers prefer usage alignment.
3. **Static + history beats sandbox for triage speed.** Falsified if sandbox-first teams don't change workflow in a POC.

## Unknowns

Direct win/loss frequency; which layer buyers budget from; coverage and host attribution of the customer’s own retained samples; incumbent AI depth for file-level investigation; current status of Radiant Security (one report implies a change, unverified).

## Sources

| ID | Publisher / title | URL | Type | Observed |
| --- | --- | --- | --- | --- |
| SW1 | Stairwell — Store | https://stairwell.com/store/ | Vendor | 2026-11-11 |
| SW2 | Stairwell — Rehunt | https://stairwell.com/rehunt/ | Vendor | 2026-11-11 |
| SW3 | Stairwell — Backstory | https://stairwell.com/backstory/ | Vendor | 2026-11-11 |
| SW4 | Stairwell — Pricing; Integrations | https://stairwell.com/pricing/ · https://stairwell.com/integrations/ | Vendor | 2026-11-11 |
| SW5 | Stairwell — Backstory launch press release (GlobeNewswire, 2026-07-29) | https://www.globenewswire.com/news-release/2026/07/29/3335300/0/en/stairwell-launches-backstory-the-first-agentic-investigation-platform-for-malware-blast-radius.html | Vendor press release | 2026-11-22 |
| SV1 | Silicon Valley Investclub — Emmy Linder profile | https://siliconvalleyinvestclub.com/zh-TW/companies/stairwell/team/emmy-linder/ | Secondary profile | 2026-11-22 |
| FD1 | Built In — Stairwell Series B; The SaaS News | https://builtin.com/articles/stairwell-raises-45m-series-b-hiring · https://www.thesaasnews.com/news/stairwell-raises-45-million-in-series-b/ | Secondary news | 2026-11-22 |
| RL1 | Carahsoft — ReversingLabs vs VirusTotal | https://www.carahsoft.com/resources/25645-reversinglabs-vs-virustotal | Vendor via reseller | 2026-11-11 |
| CT1 | CybersecTools — Intezer alternatives | https://cybersectools.com/alternatives/intezer.md | Directory | 2026-11-11 |
| CT2 | CybersecTools — Stairwell Variant Discovery vs ANY.RUN | https://cybersectools.com/compare/stairwell-variant-discovery-vs-anyrun | Directory | 2026-11-11 |
| CT3 | CybersecTools — Stairwell Variant Discovery vs Threatray | https://cybersectools.com/compare/stairwell-variant-discovery-vs-threatray | Directory | 2026-11-11 |
| CT4 | CybersecTools — GLIMPS Fortress vs Stairwell Variant Discovery | https://cybersectools.com/compare/glimps-fortress-vs-stairwell-variant-discovery | Directory | 2026-11-11 |
| MS1 | Autonomous SOC market summary | https://autonomous-soc-secops-d3c43e.pages.dev/summary | Secondary, publisher unknown | 2026-11-11 |
| TI1 | Tech Insider — Prophet vs Dropzone vs Radiant | https://tech-insider.org/?p=22875 | Secondary | 2026-11-11 |
| BO1 | BlinkOps — Top 10 AI SOC vendors 2026 | https://www.blinkops.com/blog/top-10-ai-soc-vendors-in-2026-a-practitioners-comparison | Vendor-authored roundup | 2026-11-11 |
| ID1 | Intezer — Dropzone AI alternatives | https://intezer.com/?p=53916 | Competitor-authored | 2026-11-11 |
| OF1 | Prophet Security — homepage | https://www.prophetsecurity.ai/ | Vendor | 2026-11-11 |
| OF2 | Dropzone AI — homepage | https://www.dropzone.ai/ | Vendor | 2026-11-11 |
| OF3 | Intezer — homepage | https://intezer.com/ | Vendor | 2026-11-11 |
| OF4 | ReversingLabs — Spectra Analyze | https://www.reversinglabs.com/products/spectra-analyze | Vendor | 2026-11-11 |
| OF5 | VirusTotal — upload page | https://www.virustotal.com/gui/home/upload | Vendor service | 2026-11-11 |
| NH1 | NHI Mgmt Group — agentic SOC labels (summarizing Prophet) | https://nhimg.org/articles/the-agentic-soc-is-here-but-capability-labels-no-longer-help-buyers/ | Secondary of vendor view | 2026-11-11 |
| SX1 | Sophos CTU — Pointing a Cursor at evading detection | https://www.sophos.com/en-us/blog/pointing-a-cursor-at-evading-detection | Vendor threat research (primary); fetched | 2026-11-23 |
| MT1 | Google Cloud / Mandiant — M-Trends 2026 | https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2026 | Vendor threat report; seen via search result, not fetched | 2026-11-23 |
| CS1 | CrowdStrike — 2026 Global Threat Report | https://www.crowdstrike.com/global-threat-report.html | Vendor threat report; seen via search result, not fetched | 2026-11-23 |

Rights: short paraphrase only; no reproduced vendor copy.

## Consumer disposition

- **Security Market Map catalog:** `malware-analysis` and `ai-soc-investigation` categories added with six research-candidate products; remaining vendors deferred until official-source inspection.
- **Career Command Center (Joy Index):** proposed read-only reference for an active opportunity; private owner decides. No private facts here.
- **Account Signal Engine / GTM Revenue OS / Builder Academy:** no change.
