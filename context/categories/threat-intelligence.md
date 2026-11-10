---
id: "threat-intelligence"
type: "category"
name: "Threat intelligence"
layer: "core"
vendors: 6
---

# Threat intelligence

Finished reporting and indicator feeds that detection teams use. This map keeps the feed as its own category. A feed is not a detection, and a report is not an incident response retainer unless the contract says so.

**Buyer question:** Which actors and indicators does this team need, and who turns them into detections?

**Usual owner:** Threat intelligence or detection engineering.

**Budget source:** SecOps. Sometimes bundled with an MDR or a consulting retainer.

## Owning seats

- Threat hunter (`threat-hunter`)
- Threat intelligence analyst (`threat-intel`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Recorded Future: Threat intelligence vendor. A feed is not a detection. No indicator quality is asserted. Recorded Future says it was named a Leader in Forrester's Q3 2026 External Threat Intelligence Wave, which breaks out digital risk protection; it lists digital risk protection among its connected capabilities (vendor-reported, reviewed 2026-11-09).
- Flashpoint: Threat intelligence vendor named beside Recorded Future. Unverified here.

## Vendors (adjacent)

- Secureworks
- Dragos
- SOC Prime
- ZeroFox

## What buyers do instead

- Free feeds and community sharing groups. Good enough when: Basic indicator blocking and a small team. Breaks when: Analysts need context, relevance, and fewer false positives. — hypothesis
- Intelligence bundled in the EDR or SIEM. Good enough when: Intelligence is consumed only inside detections. Breaks when: Strategic reporting, takedowns, or sector-specific intelligence are required. — hypothesis

## Objections

- "We already get more intel than we can use." — hypothesis

## Triggers

- A sector-specific threat
- Indicators nobody operationalizes

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
