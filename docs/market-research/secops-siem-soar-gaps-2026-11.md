# SecOps SIEM and SOAR vendor gaps (2026-11)

**Date checked:** 2026-11-24. **Status:** research candidates; vendor-reported only; human review pending.

## Why

The SIEM and SOAR categories were missing commonly named platforms. SOAR had no primary vendors at all. This adds three products against the existing taxonomy. No new category, navigation or capability was created.

## Placement (zoom out → zoom in)

- **Domain:** Security operations (`secops`).
- **Categories reused:** `siem`, `soar`, `threat-intelligence`, `ai-soc-investigation`.
- **Vendors reused:** `google`, `palo-alto-networks`. **New vendor:** `tines`.
- **Products added:** `google-secops` (primary `siem`), `cortex-xsoar` (primary `soar`), `tines-platform` (primary `soar`).

## Evidence

| Product | Source | What the publisher says |
| --- | --- | --- |
| Google SecOps | [Product page](https://cloud.google.com/security/products/security-operations) | Includes SIEM, SOAR and applied threat intelligence. |
| Cortex XSOAR | [What is Cortex XSOAR?](https://cortex-docs.paloaltonetworks.com/cortex-xsoar-8-on-prem/8.8/learn-about-cortex-xsoar/get-started-with-cortex-xsoar/what-is-cortex-xsoar) | Ingests alerts and indicators from SIEMs, threat intel feeds and mailboxes, then runs playbooks to enrich and respond. |
| Tines | [Homepage](https://www.tines.com/) | A secure environment for AI agents, apps and automation; every team builds, IT and Security govern. |

All three statements are vendor-reported and untested here.

## Who they say they sell to (seat targeting)

Added to `lib/data/vendor-seat-targeting.ts` from search excerpts, not full page reads. This shows each vendor's own audience wording, not proof of who buys.

| Vendor | Category | Seats | Wording basis |
| --- | --- | --- | --- |
| Palo Alto Networks (Cortex XSOAR) | SOAR | SOC lead, SOC analyst, MSSP ops | Docs: SOC teams; the MSSP page is designed with security analysts in mind |
| Tines | SOAR | SOC lead, IT operations, MSSP ops | Security and IT teams; a dedicated MSSP page |
| Google (SecOps) | SOAR, SIEM | SOC lead | Security teams that detect, investigate and respond |

**Gap worth noting:** no vendor pitches detection engineers or incident responders by name, even though the map lists both as SOAR owners.

## More SOAR and SIEM vendors (Torq, Swimlane, Elastic)

Stairwell's generic webhook doc names Torq, Swimlane and Elastic as example destinations. None were in the catalog. They're added as vendors, products, sources and claims, with seat targeting from search excerpts:

| Vendor | Category | Seats | Basis |
| --- | --- | --- | --- |
| Torq | SOAR (adjacent AI SOC) | SOC lead, SOC analyst | SOC teams page and Hyperautomation page |
| Swimlane | SOAR (adjacent AI SOC) | SOC lead, MSSP ops | Platform data sheet and pricing page |
| Elastic | SIEM (adjacent endpoint, AI SOC) | SOC analyst, threat hunter, detection engineer | SIEM page |

Stairwell's integrations docs list **Elastic** as a dedicated outbound integration, so it gets a `complement` edge. Torq and Swimlane appear only as generic-webhook examples and get no edge.

Torq and Swimlane both market against "legacy SOAR", so they sit across SOAR and AI SOC investigation. Elastic is the first SIEM vendor to pitch detection engineers alongside analysts.

## XDR seat targeting

XDR had no vendor mapped to it, even though CrowdStrike and SentinelOne product records list XDR as primary. Added `xdr` as adjacent on the CrowdStrike, SentinelOne and Palo Alto Networks vendor records, plus three targeting rows (search excerpts):

| Vendor | Seats | Basis |
| --- | --- | --- |
| CrowdStrike | SOC analyst, threat hunter, SOC lead | Press release and Insight XDR page |
| SentinelOne | SOC analyst, SOC lead | Singularity XDR use-case page and data sheet |
| Palo Alto Networks | SOC analyst, incident response, threat hunter (SOC lead mentioned) | Cortex XDR workshop and course pages, which are training audiences rather than a product pitch |

**Gap:** no vendor names detection engineers, digital forensics or MSSP ops for XDR, though the map lists all three as owners.

## Other change

- **Stairwell:** removed `soar` from its adjacent categories. No Stairwell source in the catalog describes playbook orchestration or response automation; it integrates with SOAR tools rather than being one. Reverse this if a source shows otherwise.

## Stairwell integrations (claims on `stairwell-platform`)

Recorded as four sourced claims on the existing Stairwell product, from Stairwell's [integrations docs](https://docs.stairwell.com/docs/integrations), [Google SecOps docs](https://docs.stairwell.com/docs/google-secops) and [integrations page](https://stairwell.com/integrations/). All were read from search excerpts.

- **Direction:** EDR (CrowdStrike, SentinelOne) sends Stairwell files. SIEM, SOAR and case tools receive its findings.
- **Google SecOps:** enrichment inside SecOps cases.
- **SOAR:** Palo Alto Cortex and Tines.
- **Splunk:** an app that enriches Splunk logs.

**Use case and edges (added after review):** the new use case `uc-alert-investigation` ("Alert enrichment and file investigation") covers `endpoint-security`, `siem`, `soar`, `malware-analysis`, `threat-intelligence` and `ai-soc-investigation`. Its seats are SOC lead (budget), SOC analyst, incident response, threat intel and detection engineering. It's linked from the SOC analyst's alert-fatigue pain. Six `complement` edges run from `stairwell-platform` to CrowdStrike, SentinelOne, Google SecOps, Splunk Enterprise Security (a new product record under the existing Splunk vendor), Cortex XSOAR and Tines. Each edge cites a Stairwell source and says integration depth is not verified.

**Malware analysis listing:** Google was added as adjacent to `malware-analysis` and `threat-intelligence`, so VirusTotal's parent now appears on those category pages.

## Unknowns

- Tines markets well beyond SOAR (IT workflows, AI agents). Its budget line varies by buyer.
- Google SecOps package contents and Tines deployment options are not verified.
- Sharing the `soar` category is not proof that these products compete directly.

## Full-page check (2026-11-24)

Every vendor URL in this PR was re-read in full. Seat-targeting rows that were fully read are now `page-read`. CrowdStrike and Palo Alto XDR stay `search-excerpt` because one of their two URLs wasn't re-read. What changed:

- **Google SecOps:** the product page no longer says "formerly Chronicle," so that wording is gone.
- **Tines:** the homepage now says "The secure environment for AI agents, apps and automation" and pitches every team, with IT and Security governing. The claim, positioning and seat row were updated. SOC lead moved from pitched to mentioned.
- **Stairwell + Google SecOps:** enrichment varies by indicator type. Hashes get YARA matches, hostnames get DNS records, IPs get sightings. Prevalence and variants aren't listed per type.
- **Stairwell + Splunk:** there's no "Stairwell App for Splunk" wording. The page says it enriches Splunk events with verdicts, investigation context and Rehunt matches.
- **Stairwell + SOAR:** the integrations page doesn't label Cortex or Tines as SOAR. The edges now cite the docs, which list XSOAR as two-way and Tines as outbound.
- **Stairwell + Elastic:** the docs list a dedicated outbound integration, so an edge was added.
- **SentinelOne XDR:** the readable text names only "security teams," so SOC analyst was removed. The data-sheet PDF bodies couldn't be read.
