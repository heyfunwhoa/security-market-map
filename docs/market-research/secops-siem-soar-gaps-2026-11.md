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

## Other change

- **Stairwell:** removed `soar` from its adjacent categories. No Stairwell source in the catalog describes playbook orchestration or response automation; it integrates with SOAR tools rather than being one. Reverse this if a source shows otherwise.

## Unknowns

- Tines markets well beyond SOAR (IT workflows, AI agents). Its budget line varies by buyer.
- Google SecOps package contents and Tines deployment options are not verified.
- Sharing the `soar` category is not proof that these products compete directly.
