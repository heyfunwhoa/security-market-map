# Threat intelligence: progressive market exploration

Status: editorial candidate; maintainer review pending. Prepared 2026-11-25; next review 2026-12-25 or material product/category change. Owner: Security Market Map maintainer. Public research only. This is a navigation and use-case proposal, not new typed product claims or a market census.

## Zoom out: market and jobs

Security operations (`secops`) → threat intelligence (`threat-intelligence`) → intelligence source or operational job → use case → product → attributed evidence and evaluation. Cross-domain links should preserve the selected buyer question. Existing entry: [CTI market research](/categories/threat-intelligence#market-research). Foundation: [EASM and CTI](easm-cti.md), [file analysis and investigation](file-analysis-ai-investigation-landscape-2026-11.md), [progressive exploration](../product/progressive-exploration.md).

| Proposed grouping | Definition / boundary | Existing placement or candidate |
| --- | --- | --- |
| Strategic and adversary intelligence | Research actors, campaigns, targeting and business relevance | threat-intelligence |
| External/cybercrime intelligence | Monitor criminal ecosystems, underground sources and external threats; not asset ownership discovery | threat-intelligence; external-attack-surface adjacent |
| Internet infrastructure intelligence | Investigate DNS, IP, certificates and relationships; attribution is probabilistic | threat-intelligence |
| Malware intelligence | File reputation, family and similarity research | malware-analysis; threat-intelligence |
| Malware sandboxing | Observe controlled execution; distinct from reputation lookup | malware-analysis sub-area |
| Threat intelligence platform (TIP) | Manage, correlate, curate and distribute intelligence from multiple sources | threat-intelligence sub-area |
| Exploitation intelligence | Determine evidence of active exploitation and relevance to vulnerabilities | threat-intelligence; it-vulnerability-management |
| Compromised identity intelligence | Discover exposed credentials or sessions; remediation is a separate control | threat-intelligence; identity domain |
| Digital risk protection | Identify external impersonation and coordinate disruption | digital-risk-protection |
| Threat hunting and retained evidence | Proactively query current or historical enterprise data | detection-engineering; malware-analysis; threat-intelligence |
| Automated investigation | Correlate evidence and establish scope; distinguish alert triage from independent detection | ai-soc-investigation |
| Digital forensics and incident response | Acquire and analyze evidence under incident requirements | candidate DFIR placement in open PR #240; do not invent a duplicate ID |
| Security control validation | Test whether controls detect or prevent defined behaviors | breach-simulation |

These are editorial groupings, not mutually exclusive markets. Do not create an acronym, vendor, category or capability solely for navigation.

## Zoom in: use-case backlog

Each row is a candidate use case or cross-link to reconcile against existing UseCase IDs before implementation. Metrics are proposed evaluation measures, not observed customer results. Budget owners are hypotheses.

| Use case | Owner / potential budget | Workflow and evidence | Evaluation metric | Categories |
| --- | --- | --- | --- | --- |
| Actor and campaign profiling | CTI / SecOps | Reports → actor behavior → relevance → briefing | Time to actionable assessment | threat-intelligence |
| Industry threat monitoring | CTI / risk | Sector advisories → asset relevance → accountable owner | Relevant advisories actioned | threat-intelligence |
| Cybercrime monitoring | CTI / external risk | Source observation → corroboration → exposure investigation | Confirmed relevant findings | threat-intelligence |
| Infrastructure hunting | Hunter / SecOps | Indicator → DNS/IP pivots → corroboration → internal query | Confirmed related infrastructure | threat-intelligence |
| Malware classification | Malware analyst / SOC | File → static or dynamic analysis → verdict with caveats | Verdict quality and turnaround | malware-analysis |
| Variant discovery | Malware researcher / SOC | Known sample → similarity analysis → analyst validation | Confirmed related samples | malware-analysis |
| Intelligence ingestion and sharing | CTI engineering / SOC | Feed → normalize → deduplicate → distribute → expire | Timeliness, duplicate rate | threat-intelligence |
| IOC enrichment | SOC / SecOps | Alert → intelligence context → investigation decision | Analyst time and false positives | threat-intelligence; ai-soc-investigation |
| Exploitation-informed prioritization | VM / exposure | Vulnerability → KEV/exploitation context → asset criticality → remediation | Time to fix relevant exploited exposures | threat-intelligence; it-vulnerability-management |
| Retrospective hunting | Threat hunter / SOC | New indicator → retained evidence query → confirm affected hosts → case | Lookback coverage, time to scope | malware-analysis; threat-intelligence |
| Threat-informed detection engineering | Detection engineer / SOC | TTP → detection logic → test → deploy → monitor | Validated detection coverage | detection-engineering; breach-simulation |
| Detection assurance | SOC / endpoint security | Controlled test or independently sourced finding → compare telemetry → investigate gap | Confirmed incremental coverage | endpoint-security; breach-simulation; malware-analysis |
| Campaign reconstruction | IR / SOC | Seed indicator → related evidence → chronology and scope | Time to verified scope | ai-soc-investigation; malware-analysis |
| Forensic acquisition | DFIR / incident readiness | Authorized acquisition → integrity verification → analysis | Acquisition completeness and integrity | DFIR candidate in #240 |
| Alert investigation | SOC / SecOps | Alert → contextual evidence → verdict → authorized escalation | Quality, time, escalation accuracy | ai-soc-investigation |
| Credential exposure response | IAM / identity security | Exposure → ownership/validity → revoke or reset → verify | Time to containment | threat-intelligence; identity domain |
| Impersonation disruption | Brand protection / risk | Detect → validate → authorized takedown → confirm | Time to verified removal | digital-risk-protection |
| Intelligence program effectiveness | CTI director / CISO | Requirements → collection → analysis → action feedback | Intelligence-to-action conversion | threat-intelligence |

## Vendor discovery, not new claims

Reuse the six buyer-need groupings and 22 offerings already documented in research/easm-cti.json. Existing examples include Recorded Future (recorded-future), Group-IB (group-ib), Flashpoint (flashpoint), Intel 471 (intel471), Searchlight Cyber (searchlight-cyber), Bitsight (bitsight), SOCRadar (socradar), Censys (censys), Google (google), CrowdStrike (crowdstrike), Microsoft (microsoft), Palo Alto Networks (palo-alto-networks), Securonix (securonix). Preserve product/parent distinction. Additional candidates from existing directory: KELA, DomainTools, Silent Push, Filigran, Anomali, Dataminr, VulnCheck, GreyNoise. File-analysis candidates and sources already live in the linked file-analysis note. Future research queue: ThreatConnect, Cyware, Team Cymru, Hunt.io, Flare, SpyCloud, Hudson Rock, ANY.RUN, VMRay, Binalyze (coordinate #272). Do not infer parity or direct substitution.

Existing evidence links: [Google Threat Intelligence](https://cloud.google.com/security/products/threat-intelligence), [OpenCTI](https://filigran.io/products/opencti), [DomainTools Iris](https://docs.domaintools.com/iris/), [VulnCheck](https://docs.vulncheck.com/products/exploit-and-vulnerability-intelligence/vulnerability-intelligence). These links are reused from existing research, not freshly inspected for this submission; publication and current verification dates unknown here. Reuse original claims/source IDs at promotion. No copied source text; rights remain with publishers. New product positioning, editions, commercial terms, ownership and feature coverage remain Unknown until reviewed.

Standards/source review queue: [MITRE ATT&CK](https://attack.mitre.org/), [OASIS CTI](https://oasis-open.github.io/cti-documentation/), [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog), [FIRST EPSS](https://www.first.org/epss/). Public resources and open-source projects are not commercial vendors.

## Navigation and delivery

- Reuse /landscape, /categories/threat-intelligence, /compare and /vendors/[slug]. Category → use case → evidence-linked product; return via breadcrumb or related category. No new routes.
- Reconcile open #240 (DFIR), #256 (SecOps products), #257 (navigation), #261 (Stairwell use cases), #268/#269 (framework/practitioner views), #272 (Binalyze). No private interview evidence.
- Next PR after reconciliation: add only missing UseCase records in lib/data/use-cases.ts with valid category/capability IDs; reuse existing records and link to current personas. Do not add unsupported capability claims. Then review category sub-areas and source-backed vendor profiles.
- Acceptance: every proposed grouping maps to a canonical category or explicitly pending candidate; every promoted use case has buyer problem, stakeholders, triggers, budget hypothesis, architecture, metrics, discovery questions and valid references; product claims retain provenance and Unknowns; no new duplicate vendors; breadcrumb and sideways navigation tested when UI changes.
- Run repository research-integrity, tests, typegen, typecheck, lint and build before ready-for-review app changes; this docs-only draft has not run local checks. No merge/deploy.
- Respect [shared evidence boundary](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/architecture/ADR-001-research-evidence-boundary.md): collection belongs to Research Hub; only approved public evidence can be consumed. No new scraper or automatic publication.
