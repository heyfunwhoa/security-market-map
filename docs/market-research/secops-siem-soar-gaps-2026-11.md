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
| Google SecOps | [Product page](https://cloud.google.com/security/products/security-operations) | Formerly Chronicle; includes SIEM, SOAR and applied threat intelligence. |
| Cortex XSOAR | [What is Cortex XSOAR?](https://cortex-docs.paloaltonetworks.com/cortex-xsoar-8-on-prem/8.8/learn-about-cortex-xsoar/get-started-with-cortex-xsoar/what-is-cortex-xsoar) | Ingests alerts and indicators from SIEMs, threat intel feeds and mailboxes, then runs playbooks to enrich and respond. |
| Tines | [Homepage](https://www.tines.com/) | AI orchestration platform for security and IT teams; connects tools and deploys agents. |

All three statements are vendor-reported and untested here.

## Who they say they sell to (seat targeting)

Added to `lib/data/vendor-seat-targeting.ts` from search excerpts, not full page reads. This shows each vendor's own audience wording, not proof of who buys.

| Vendor | Category | Seats | Wording basis |
| --- | --- | --- | --- |
| Palo Alto Networks (Cortex XSOAR) | SOAR | SOC lead, SOC analyst, MSSP ops | Docs: SOC teams; the MSSP page is designed with security analysts in mind |
| Tines | SOAR | SOC lead, IT operations, MSSP ops | Security and IT teams; a dedicated MSSP page |
| Google (SecOps) | SOAR, SIEM | SOC lead | Security teams that detect, investigate and respond |

**Gap worth noting:** no vendor pitches detection engineers or incident responders by name, even though the map lists both as SOAR owners.

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
