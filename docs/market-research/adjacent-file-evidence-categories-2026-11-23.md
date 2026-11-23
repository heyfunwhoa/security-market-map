# Adjacent file and evidence categories — November 2026

**Scope:** public industry research. **Status:** candidate research note. No typed categories, vendors or claims are added. Not benchmarked, not a feature-parity table, not a competitor list for any one vendor. **Prepared:** 2026-11-23. **Next editorial check:** 2027-01-23. **Method:** [Competitive Intelligence Playbook](competitive-intelligence-playbook.md).

**Evidence limit for this pass:** vendor official pages were **not** inspected; every vendor row below comes from secondary roundups or directories found by web search. Several roundups are written by a vendor in the same category (noted per source). Promotion to typed records needs official-page inspection first.

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
- **Navigation change:** none proposed. If promoted, each appears through existing category and seat pages.
- **Back out:** each links back to `malware-analysis` and `xdr` as complementary layers in the same incident.

## 1. Digital forensics and IR collection (`dfir-collection`, proposed)

**Plain definition:** tools that remotely collect and preserve forensic evidence (disk and memory artifacts, logs, volatile data) from endpoints and cloud workloads, then triage or analyse it for incident scoping and timelines. This is not the same as EDR telemetry, which is continuous but not forensic-grade, nor is it an IR retainer, which is people under contract.

**Relationship to `malware-analysis`:** complementary. DFIR collects the evidence; file analysis judges the files within it. Retained-evidence products overlap partly, since both answer "was this here before?", but they collect different things.

| Vendor / product | Public context | Evidence status |
| --- | --- | --- |
| Velociraptor (open source; Rapid7-backed) | Open-source endpoint monitoring, forensic collection and hunting: an agent on each host plus a central server [DF1, DF2] | Secondary; official docs not inspected |
| Binalyze AIR | Described as a DFIR / investigation platform for enterprise and MSSP SOCs, with forensic evidence collection at scale; brochure mentions an agentic investigator [DF3, DF4] | Secondary plus vendor brochure (search snippet only) |
| Magnet Forensics (AXIOM Cyber) | Digital investigation platform for acquiring and analysing forensic data; also strong in law-enforcement and corporate investigations [DF5, DF6] | Secondary |
| CrowdStrike Falcon Forensics; Cyber Triage; OpenText Endpoint Investigator; F-Response; Volexity; Darktrace (forensic acquisition, ex-Cado) | Named in DFIR tool roundups [DF5, DF6, DF7] | Candidates only |

**Open questions:** how many buyers get DFIR tooling through an IR retainer or MDR rather than buying it directly; overlap with EDR "forensics" add-ons; open-source versus commercial support cost.

## 2. Deception and decoys (`deception`, proposed)

**Plain definition:** decoy assets (fake hosts, services, credentials, files, cloud keys, honeytokens) placed where legitimate users have no reason to go, so that touching one is a strong signal of an intruder.

**Relationship to existing categories:** complementary to `xdr`, `siem` and `itdr`. Identity-focused deception overlaps partly with `itdr`. Honeytoken cloud keys overlap partly with `secrets-detection` workflows; that is a hypothesis only.

| Vendor / product | Public context | Evidence status |
| --- | --- | --- |
| Thinkst Canary / Canarytokens | Hardware and virtual honeypots plus free Canarytokens; widely cited as the benchmark for easy deployment [DC1, DC2, DC3] | Secondary; one source is a competitor-authored roundup |
| Acalvio ShadowPlex | Enterprise deception platform spanning IT and OT, with identity-focused honeytokens; GigaOm Radar reprint distributed by Acalvio [DC4, DC5] | Secondary / analyst reprint |
| Tracebit | Cloud and CI/CD canary deployment [DC1] | Vendor-authored roundup ranks itself first; treat with caution |
| CounterCraft, Lupovis, Labyrinth, Zscaler (deception), SentinelOne (ex-Attivo), Proofpoint (ex-Illusive), Fortinet, Rapid7 | Named in GigaOm vendor list and roundups [DC4, DC2] | Candidates only |

**Market note (secondary):** one buyer guide says several pioneers now ship inside larger platforms [DC2]. That points to bundling as the common no-decision alternative.

## 3. Content disarm and reconstruction (`cdr-file-sanitization`, proposed)

**Plain definition:** prevention-first file sanitization. Active or risky content (macros, scripts, embedded objects) is removed and a usable copy is rebuilt, rather than the original being judged malicious or not. Typical entry points are email, web download, file transfer and removable media.

**Relationship to `malware-analysis`:** a different approach to the same file risk. CDR neutralises without a verdict; malware analysis produces a verdict and context. Many CDR products also bundle multi-AV scanning or sandboxing [CD2]. Complementary in layered designs, and partly an alternative for inbound-file use cases.

| Vendor / product | Public context | Evidence status |
| --- | --- | --- |
| OPSWAT MetaDefender (Deep CDR) | CDR plus multi-engine scanning across email, web, file transfer and removable media [CD1, CD2] | Vendor-authored blog (category roundup); official product page not inspected |
| Votiro | Named CDR vendor across email and other channels [CD2, CD3] | Secondary |
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
| CD4 | Slashdot — CDR software directory | https://slashdot.org/software/content-disarm-reconstruction-cdr/ | Directory | 2026-11-23 |

Rights: short paraphrase only; no reproduced vendor copy.

## Consumer disposition

- **Security Market Map catalog:** no typed changes from this note. Promotion candidates, in suggested order: `dfir-collection` (fills the `digital-forensics` seat gap), then `deception`, then `cdr-file-sanitization`. Each needs official-page inspection and owner approval.
- **Other projects:** no change proposed.
