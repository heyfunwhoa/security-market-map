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

**Dates:** `published_on` is a publisher-supplied date; `retrieved_at` marks an actual fetch (none recorded in these offline seeds); `last_reviewed_on` marks editorial review. **Do not fake retrieved timestamps.** New feeds start in a source registry with owner, terms, rate limit, trusted domain, last-success, next-review and review trigger.

The starter JSON files hold two *reported* incidents with direct CISA citations. They are deliberately minimal and are not comprehensive timelines. Links are references, not downloaded articles; content reuse rights must be checked before storing full text.

**Ingestion sequence (not implemented):** discover → URL/domain/allowlist check → fetch within terms → record snapshot hash and publish/retrieval dates → normalize aliases → create draft claims with explicit source relationships → conflict and attribution checks → human review → publish via API.

**Negative rule:** absence of an ATT&CK link, package record, exploit status or affected organization means **unknown/not yet evaluated**, not false.
