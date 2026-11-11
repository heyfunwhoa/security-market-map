# File analysis, retained-evidence hunting and AI investigation — November 2026

**Scope:** public industry research. **Status:** candidate research note, not published typed claims, not benchmarked, not a feature-parity table. **Prepared:** 2026-11-11. **Next editorial check:** 2026-12-11 or on a material launch/acquisition. **Method:** [Competitive Intelligence Playbook](competitive-intelligence-playbook.md).

## Zoom placement (progressive exploration)

- **Zoom out — domain:** Security operations (SOC / incident response). Not yet a typed category in `lib/data/categories.ts`; nearest existing placement is `adjacent-security`.
- **Category layers (proposed, research-only):**
  1. File and malware analysis (verdict on a file)
  2. Retained-evidence hunting (keep files, re-check history as intel changes)
  3. AI SOC / agentic investigation (investigate an alert end to end)
  4. Incumbent platform AI (EDR/XDR/SIEM vendors adding agents)
- **Zoom in — buyer decision:** "An alert fired on a file. Is it malicious, what else is related, where did it spread, and did we get everything?"
- **Back out:** related SOC automation and MSSP/MDR layers are mapped in [Agentic SecOps and MSSP/MDR landscape](agentic-secops-competitive-landscape.md). Do not duplicate those vendor records here.
- **Reused IDs:** `reversinglabs` already exists as a vendor (secrets sweep). Its file-analysis products would be new product records under that vendor, not a new vendor. No other vendors below exist in the catalog (searched 2026-11-11).
- **Navigation change:** none proposed. Promotion into typed claims needs a new or approved category and human review.

## Plain definition

**File analysis:** determine whether a file (usually an executable or script) is malicious, what it was built to do, and what it is related to. Common methods: static analysis (inspect structure and code without running it), dynamic analysis/sandboxing (detonate and observe behavior), signature/YARA matching, reputation lookup, and code-similarity/family clustering.

## Layer 1 — File and malware analysis

| Vendor / product | Positioning (source-attributed) | Relationship to buyer decision | Evidence status |
| --- | --- | --- | --- |
| Google VirusTotal | Widely used file/URL reputation and analysis service | Incumbent/no-decision for many SOCs; partial overlap | Secondary (directory/review listings); official docs not inspected for this note |
| ReversingLabs (Spectra Analyze / Spectra Detect) | Says it offers deeper file intelligence than VirusTotal using AI-driven and proprietary static and dynamic techniques [RL1] | Partial overlap | Vendor-published via reseller page; product pages not inspected |
| Intezer | Malware analysis using code-reuse ("genetic") analysis [CT1]; also sells an AI SOC (Layer 3) | Partial overlap in Layers 1 and 3 | Secondary directory; official pages not inspected |
| ANY.RUN, VMRay, OPSWAT MetaDefender Sandbox | Sandbox / dynamic analysis [CT1, CT2] | Partial overlap or complementary (different method) | Secondary directory |
| Threatray | AI-driven binary code search and malware family attribution [CT3] | Partial overlap (variant/family) | Secondary directory |

## Layer 2 — Retained-evidence hunting

| Vendor / product | Positioning (source-attributed) | Relationship | Evidence status |
| --- | --- | --- | --- |
| Stairwell | Preserves executables from enrolled endpoints in a private environment without a retention window; reruns IOCs, YARA and threat reports across history; Variant Discovery; Backstory agentic investigator; per-asset pricing including investigations [SW1–SW4] | Reference position for this layer | Vendor-published; inspected 2026-11-11; not tested |
| GLIMPS Fortress (France) | On-premise AI file repository with continuous malware analysis and retrohunting [CT4] | Candidate partial overlap; closest model found | Secondary directory; official pages not inspected |

Note: VirusTotal and ReversingLabs also offer retrohunt over *their* corpora. Whether a buyer sees that as a substitute for retaining *their own* file history is an open buyer-decision question (Unknown).

## Layer 3 — AI SOC / agentic investigation

| Vendor | Public context | Relationship | Evidence status |
| --- | --- | --- | --- |
| Prophet Security | $30M Series A, Accel-led, July 2025 [MS1]; one report cites an AWS Marketplace entry tier of ~$50K/year for 5,000 investigations [TI1] | Partial overlap with Backstory's investigation step | Secondary; marketplace listing not inspected |
| Dropzone AI | $37M Series B, Theory Ventures, July 2025 [MS1]; autonomous triage on an existing stack | Partial overlap | Secondary |
| Torq | $140M Series D at $1.2B valuation, January 2026 [MS1] | Partial overlap; also in [agentic SecOps note](agentic-secops-competitive-landscape.md) | Secondary |
| Intezer | AI SOC combining agentic triage with forensic tools [ID1] | Partial overlap | Vendor-published (competitor-authored) |
| Others named in 2026 roundups | BlinkOps, Swimlane, Exaforce, D3 Security, Radiant Security, Conifers, 7AI, Command Zero [BO1, MS1] | Candidates only | Secondary; several roundups are vendor-authored |

Category caveat: a vendor-authored analysis notes the "agentic SOC" label now spans autonomous investigation, fixed enrichment and chatbot-style workflow generation [NH1]. Do not infer direct competition from the label.

## Layer 4 — Incumbent platform AI (often the real alternative)

CrowdStrike (Charlotte AI), SentinelOne (Purple AI), Palo Alto Networks (Cortex XSIAM), Google SecOps, Microsoft (Sentinel / Security Copilot) [MS1, BO1]. Relationship: incumbent/no-decision or complementary (Stairwell integrates with several of these as sources/destinations [SW4]). Evidence: secondary; official pages not inspected.

## Differentiation hypotheses (with falsification tests)

1. **Own-history retention is the differentiator, not AI.** Falsified if buyers accept vendor-corpus retrohunt (VirusTotal/ReversingLabs) as equivalent in evaluations.
2. **Per-asset pricing including investigations beats per-investigation pricing at high alert volume.** Falsified if total 12-month cost at the same workload is not lower, or buyers prefer usage alignment.
3. **Static + history beats sandbox for triage speed.** Falsified if sandbox-first teams don't change workflow in a POC.

## Unknowns

Direct win/loss frequency; which layer buyers budget from; ReversingLabs/VirusTotal retrohunt scope vs customer-owned retention; incumbent AI depth for file-level investigation; current status of Radiant Security (one report implies a change, unverified).

## Sources

| ID | Publisher / title | URL | Type | Observed |
| --- | --- | --- | --- | --- |
| SW1 | Stairwell — Store | https://stairwell.com/store/ | Vendor | 2026-11-11 |
| SW2 | Stairwell — Rehunt | https://stairwell.com/rehunt/ | Vendor | 2026-11-11 |
| SW3 | Stairwell — Backstory | https://stairwell.com/backstory/ | Vendor | 2026-11-11 |
| SW4 | Stairwell — Pricing; Integrations | https://stairwell.com/pricing/ · https://stairwell.com/integrations/ | Vendor | 2026-11-11 |
| RL1 | Carahsoft — ReversingLabs vs VirusTotal | https://www.carahsoft.com/resources/25645-reversinglabs-vs-virustotal | Vendor via reseller | 2026-11-11 |
| CT1 | CybersecTools — Intezer alternatives | https://cybersectools.com/alternatives/intezer.md | Directory | 2026-11-11 |
| CT2 | CybersecTools — Stairwell Variant Discovery vs ANY.RUN | https://cybersectools.com/compare/stairwell-variant-discovery-vs-anyrun | Directory | 2026-11-11 |
| CT3 | CybersecTools — Stairwell Variant Discovery vs Threatray | https://cybersectools.com/compare/stairwell-variant-discovery-vs-threatray | Directory | 2026-11-11 |
| CT4 | CybersecTools — GLIMPS Fortress vs Stairwell Variant Discovery | https://cybersectools.com/compare/glimps-fortress-vs-stairwell-variant-discovery | Directory | 2026-11-11 |
| MS1 | Autonomous SOC market summary | https://autonomous-soc-secops-d3c43e.pages.dev/summary | Secondary, publisher unknown | 2026-11-11 |
| TI1 | Tech Insider — Prophet vs Dropzone vs Radiant | https://tech-insider.org/?p=22875 | Secondary | 2026-11-11 |
| BO1 | BlinkOps — Top 10 AI SOC vendors 2026 | https://www.blinkops.com/blog/top-10-ai-soc-vendors-in-2026-a-practitioners-comparison | Vendor-authored roundup | 2026-11-11 |
| ID1 | Intezer — Dropzone AI alternatives | https://intezer.com/?p=53916 | Competitor-authored | 2026-11-11 |
| NH1 | NHI Mgmt Group — agentic SOC labels (summarizing Prophet) | https://nhimg.org/articles/the-agentic-soc-is-here-but-capability-labels-no-longer-help-buyers/ | Secondary of vendor view | 2026-11-11 |

Rights: short paraphrase only; no reproduced vendor copy.

## Consumer disposition

- **Security Market Map catalog:** defer. Needs a SOC/malware-analysis category decision and official-source inspection before typed claims.
- **Career Command Center (Joy Index):** proposed read-only reference for an active opportunity; private owner decides. No private facts here.
- **Account Signal Engine / GTM Revenue OS / Builder Academy:** no change.
