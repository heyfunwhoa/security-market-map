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

**Review metadata (all six references):** Scope = public cybersecurity incident education/research; owner = Security Market Map editorial reviewer pending named assignment; catalog status = candidate/documented only; reference review date = 2026-10-17 (reference inventory, not a claim of full external-link availability testing); next review = before first fixture mapping and whenever upstream versions change; upstream schema/version = unresolved until import; rights/usage = verify each publisher's terms before reuse. CTID is a methodology reference, not a taxonomy.\n\n**Review rules:** Preserve official identifiers, source URL, upstream version, published/observed/reviewed dates, and usage terms. Separate documented taxonomy support from imported data and actually deployed classifiers. Never assign ATT&CK techniques, CVEs, threat actors or defensive effectiveness solely from a headline, Reddit post, or category crosswalk. Unknown means not evaluated, not absent.

**Dates:** `published_on` is a publisher-supplied date; `retrieved_at` marks an actual fetch (none recorded in these offline seeds); `last_reviewed_on` marks editorial review. **Do not fake retrieved timestamps.** New feeds start in a source registry with owner, terms, rate limit, trusted domain, last-success, next-review and review trigger.

The starter JSON files hold two *reported* incidents with direct CISA citations. They are deliberately minimal and are not comprehensive timelines. Links are references, not downloaded articles; content reuse rights must be checked before storing full text.

**Ingestion sequence (not implemented):** discover → URL/domain/allowlist check → fetch within terms → record snapshot hash and publish/retrieval dates → normalize aliases → create draft claims with explicit source relationships → conflict and attribution checks → human review → publish via API.

**Negative rule:** absence of an ATT&CK link, package record, exploit status or affected organization means **unknown/not yet evaluated**, not false.
