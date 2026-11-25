# Source registry and editorial review (proposal)

| Source | Role | Freshness trigger | Integration |
| --- | --- | --- | --- |
| [MITRE ATT&CK STIX 2.1](https://attack.mitre.org/resources/attack-data-and-tools/) | Tactics/techniques, objects and versions | New release or monthly review | Import official versioned STIX data with IDs; not a manually maintained ATT&CK copy |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Known-exploited vulnerability status | Daily check when automation exists | Strict CVE joins, first-seen date and source observation |
| [OSV API](https://google.github.io/osv.dev/api/) | OSS advisories, affected ecosystems/packages/versions | Daily check when automation exists | Match by ecosystem/name/PURL and explicit version; aliases need review |
| [NVD](https://nvd.nist.gov/developers/vulnerabilities) | CVE metadata and update history | Daily check when automation exists | Preserve source/modified timestamps; distinguish CVSS from exploitation |
| [GitHub Security Advisories](https://docs.github.com/en/rest/security-advisories/global-advisories) | GHSA/npm and other advisories | Daily check when automation exists | Version-aware package association and GHSA/CVE/OSV alias mapping |
| [CISA public advisories](https://www.cisa.gov/news-events/cybersecurity-advisories) | Documented incidents and defensive guidance | RSS/feed or editorial review | Curated editorial records and links; do not auto-publish claims |
| Publisher/vender RSS and research | Context, hypotheses, vendor statements | Per source | Source claims and counterpoints, not verified incident facts |

## Incident classification and defense framework references (candidate metadata only)

This is the existing **Security Intelligence source reference**, not an organization-wide framework-ID registry. The former `technical-docs-platform/frameworks/` reference is not present on current main (checked 2026-10-17). [Technical Docs ADR-001](https://github.com/heyfunwhoa/technical-docs-platform/blob/main/architecture/ADR-001-research-evidence-boundary.md) governs approved research evidence handoff and contracts, not framework identifiers. Reconcile any later verified cross-product framework index by explicit maintainer decision, without cloning these reference entries. The [incident classifier proposal](incident-classification-framework.md) describes use and evidence requirements; it does not implement these imports.

| Framework | Official reference | What it classifies | Use in incident analysis | Integration state |
| --- | --- | --- | --- | --- |
| MITRE ATT&CK | [ATT&CK STIX data](https://attack.mitre.org/resources/attack-data-and-tools/) | Observed adversary tactics, techniques, subtechniques | Versioned domain/external ID/STIX ID with sourced technique claims | Documented proposal, no automatic mapping |
| VERIS | [VERIS Framework](https://verisframework.org/) | Incident actors, actions, assets, attributes and consequences | Distinguish incident classification from adversary behavior | Candidate, no live mapping |
| MITRE D3FEND | [D3FEND knowledge graph](https://d3fend.mitre.org/) | Defensive techniques and artifacts | Potential defensive mappings, never prevention proof | Proposed enrichment |
| CWE | [Common Weakness Enumeration](https://cwe.mitre.org/) | Software and hardware weakness types | Link only verified contributing weakness | Proposed enrichment |
| CAPEC | [Common Attack Pattern Enumeration and Classification](https://capec.mitre.org/) | General attack patterns | Supporting attack-pattern explanation, distinct from observed ATT&CK technique | Proposed enrichment |
| CTID VERIS-to-ATT&CK mapping | [Mapping methodology](https://ctid.mitre.org/mappings/about/methodology/veris-methodology/) | Crosswalk methodology | Research aid; a mapped category is not proof an incident exhibited a technique | Candidate methodology |

**Review metadata (all six references):** Scope = public cybersecurity incident education/research; owner = Security Market Map editorial reviewer pending named assignment; catalog status = candidate/documented only; reference review date = 2026-10-17 (reference inventory, not a claim of full external-link availability testing); next review = before first fixture mapping and whenever upstream versions change; upstream schema/version = unresolved until import; rights/usage = verify each publisher's terms before reuse. CTID is a methodology reference, not a taxonomy.

**Review rules:** Preserve official identifiers, source URL, upstream version, published/observed/reviewed dates, and usage terms. Separate documented taxonomy support from imported data and actually deployed classifiers. Never assign ATT&CK techniques, CVEs, threat actors or defensive effectiveness solely from a headline, Reddit post, or category crosswalk. Unknown means not evaluated, not absent.

**Dates:** `published_on` is a publisher-supplied date; `retrieved_at` marks an actual fetch (none recorded in these offline seeds); `last_reviewed_on` marks editorial review. **Do not fake retrieved timestamps.** New feeds start in a source registry with owner, terms, rate limit, trusted domain, last-success, next-review and review trigger.

The starter JSON files hold two *reported* incidents with direct CISA citations. They are deliberately minimal and are not comprehensive timelines. Links are references, not downloaded articles; content reuse rights must be checked before storing full text.

**Ingestion sequence (not implemented):** discover → URL/domain/allowlist check → fetch within terms → record snapshot hash and publish/retrieval dates → normalize aliases → create draft claims with explicit source relationships → conflict and attribution checks → human review → publish via API.

**Negative rule:** absence of an ATT&CK link, package record, exploit status or affected organization means **unknown/not yet evaluated**, not false.

## Candidate intake sources (proposed 2026-11-24, not reviewed)

Places to look for new incidents. These are discovery sources, not entries in `sources.seed.json`; each incident still cites its own page. **Role** says what a source can support: *primary* can confirm an incident, *secondary* adds detail but is context only, *lead only* is never cited as evidence. **Link** says whether the address was seen in a search result on 2026-11-24 (*seen*) or not checked (*unchecked*); nothing here was fetched, so verify before relying on it.

### Primary: can confirm an incident

| Source | Role | Good for | Link |
| --- | --- | --- | --- |
| [SEC EDGAR full-text search](https://efts.sec.gov/LATEST/search-index?q=%22Item%201.05%22&forms=8-K) | primary | US public-company 8-K filings. Search Item 1.05 (material) **and** Item 8.01 (voluntary or not-yet-material disclosures); some incidents start in 8.01 and move to 1.05 | unchecked (EDGAR itself seen) |
| [Texas AG data breach reports](https://texasattorneygeneral.gov/consumer-protection/data-breach-reporting) | primary | Breaches affecting 250+ Texans; public listing kept up to one year | seen |
| [California AG data breach list](https://oag.ca.gov/privacy/databreach/list) | primary | Breach notices with sample letters | unchecked |
| [Maine AG breach notices](https://www.maine.gov/agviewer/content/ag/985235c7-cb95-4be2-8792-a1252b4f8318/list.html) | primary | Notices with total people affected nationwide | unchecked |
| [Washington AG data breach notifications](https://www.atg.wa.gov/data-breach-notifications) | primary | Notices affecting 500+ residents | unchecked |
| [HHS OCR breach portal](https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf) | primary | US healthcare breaches affecting 500+ people | unchecked |
| [HHS HC3](https://www.hhs.gov/hc3) | primary (advisories) | Health-sector threat products | seen |
| [FBI IC3 advisories](https://www.ic3.gov/CSA) | primary | FBI Flash and joint advisories | unchecked |
| [CERT-FR (ANSSI)](https://www.cert.ssi.gouv.fr/) | primary | French alerts and reports; context for EU incidents such as Arkéa | unchecked |
| [UK NCSC](https://www.ncsc.gov.uk/) / [ACSC](https://www.cyber.gov.au/) / [CCCS](https://www.cyber.gc.ca/) | primary | National advisories outside the US | unchecked |
| Company newsrooms, investor pages, GlobeNewswire/RNS | primary | The company's own statement; prefer the company-hosted copy | per incident |

### Secondary: technical detail, context only

| Source | Role | Good for | Link |
| --- | --- | --- | --- |
| Incident-response and threat-intel research (Mandiant/Google Threat Intelligence, Unit 42, Microsoft Threat Intelligence, Talos, ESET, Sophos, Huntress, The DFIR Report) | secondary | Attack chains, dwell time, EDR evasion | unchecked |
| Annual reports (Verizon DBIR, Mandiant M-Trends, Sophos State of Ransomware) | secondary | Trend figures; not individual incidents | unchecked |
| Halcyon and Coveware quarterly ransomware reports | secondary | Ransomware trend data | Halcyon seen via Infosecurity Magazine coverage |
| Journalists who contact the company (BleepingComputer, The Record, SecurityWeek, DataBreaches.net, Reuters) | secondary | Confirmation attempts, figures, timelines | BleepingComputer, SecurityWeek seen |
| Supply-chain and extension research ([Socket](https://socket.dev/blog), Aikido, Wiz Research, [Koi](https://www.koi.ai/blog)) | secondary | Malicious packages, IDE and browser extensions; fast first reports | Socket already in seed; Koi seen (also uses koi.security) |
| On-chain investigators (ZachXBT, Elliptic, Chainalysis) | secondary | Crypto-theft amounts and fund flows; not confirmed by the victim | unchecked |
| FS-ISAC and Health-ISAC public reports | secondary | Sector context; most member content is not public | unchecked |

### Lead only: never cite as evidence

- Ransomware leak-site trackers such as ransomware.live: record a group's **claim** only, labeled as a claim.
- Dark-web posts, Telegram, Reddit and social posts.
- AI-generated aggregators and incident "scoring" sites (for example Rankiteo, ThreatCluster): use to find the original report, then cite that.

**Open questions for the reviewer:** which of these to add to `.github/workflows/source-link-check.yml`'s scope once they appear in seed records; terms of use for each before storing more than a citation and short summary; and whether state AG listings should get their own `type` value (the seed currently uses `regulator_filing`).

## Adding incidents from research sessions

New incidents found during research go through the [incident classification framework](incident-classification-framework.md), not straight into the reviewed seed:

1. Add a candidate batch under `data/security-intelligence/candidates/` with `status: "candidate_only"` and `publishable: false`. Each candidate records discovery (publisher, canonical URL, primary or secondary role, discovery time, usage rights), a de-duplication note, paraphrased claims with their own epistemic status, and unresolved questions.
2. Leave VERIS fields `null` until the official schema is imported. Mark ATT&CK mappings `not_evaluated` unless the technique is in the pinned offline subset (`lib/incident-taxonomy.ts`) and a reported claim supports it; then `candidate` only, with no STIX ID or reviewer.
3. Flag any candidate with only secondary sources as "Primary source needed". Keep research-wide studies with no single affected organization out of incidents.
4. Run `npm test` (`lib/incident-candidates.test.ts` enforces these rules), open a PR, and leave review and promotion into `incidents.seed.json` to the human reviewer.

## Source link checks

`.github/workflows/source-link-check.yml` runs `scripts/check-source-links.mjs` on the first of each month, and you can also run it by hand from the Actions tab. It reports every incident source as loaded, broken (404/410, DNS or TLS failure) or not checkable (the publisher blocked the request), and lists redirects. A broken link fails the run. The check is read-only: it confirms a page loads, not that it still says what we cite, so re-read any flagged source before changing it. Local runs from restricted networks report false "broken" results.
