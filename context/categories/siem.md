---
id: "siem"
type: "category"
name: "SIEM"
layer: "core"
vendors: 16
---

# SIEM

The place logs are collected, detections are written, and investigations start. Identity, endpoint, and cloud products may send signals here. The SIEM does not grant access.

**Buyer question:** Which logs do we have, and can an analyst ask a question in time?

**Usual owner:** SOC or detection engineering.

**Budget source:** SecOps, often priced on ingest.

## Owning seats

- CISO / VP of security (`ciso`)
- SOC manager (`soc-lead`)
- Detection engineer (`detection-engineer`)
- SOC analyst (`soc-analyst`)
- Incident responder (`incident-response`)
- Threat hunter (`threat-hunter`)
- Threat intelligence analyst (`threat-intel`)
- Digital forensics (`digital-forensics`)
- MSSP / MDR operations lead (`mssp-ops`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Splunk: Homepage retrieved 26 Oct 2026 describes a data platform for security and observability that searches telemetry where it lives. Detection content is not described on that page.
- Rapid7: Homepage retrieved 26 Oct 2026 lists MDR, exposure management, attack surface management, SIEM, cloud security, vulnerability management, and threat intelligence as separate offers. None of those blurbs fills a patch, misconfiguration, or detection-content cell.
- Panther: Panther describes itself as a cloud-native SIEM and AI SOC platform on a security data lake, with detection-as-code workflows.

## Vendors (adjacent)

- Microsoft
- AttackIQ
- Rubrik
- Arctic Wolf
- Expel
- Corelight
- Recorded Future
- Securonix
- Avalor
- Cribl
- Tenzir
- DataBahn
- Anvilogic

## What buyers do instead

- Logs in a data lake with in-house detections. Good enough when: A strong data engineering team and cost pressure on ingest. Breaks when: Detection content, case management, and analyst workflow have to be built and maintained. — hypothesis
- Let the MDR provider own detection. Good enough when: No in-house SOC and endpoint coverage is the main need. Breaks when: Custom detections, cloud and identity coverage, or log retention requirements grow. — hypothesis

## Objections

- "We built our own." — hypothesis
- "Analysts don't need another console." — hypothesis
- "We need to fix telemetry before adding tools." — hypothesis
- "The per-tenant cost kills our margin." — hypothesis

## Triggers

- Ingest bill
- Migration off a legacy SIEM
- The MDR provider misses an incident or can't cover cloud and identity.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
