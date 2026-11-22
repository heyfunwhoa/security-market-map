---
id: "cloud-detection"
type: "category"
name: "Cloud detection and response"
layer: "core"
vendors: 7
---

# Cloud detection and response

Detections on cloud control-plane and workload telemetry. The SOC may own the queue. Cloud security owns the log sources. This is not CSPM hygiene.

**Buyer question:** How do we see an attacker using a cloud API, not just a bad setting?

**Usual owner:** Cloud security or the SOC.

**Budget source:** Cloud detection, sometimes inside the CNAPP and sometimes inside the SIEM.

## Owning seats

- Cloud security (`cloud-sec`)
- SOC manager (`soc-lead`)
- Detection engineer (`detection-engineer`)
- SOC analyst (`soc-analyst`)
- Threat hunter (`threat-hunter`)

## Who vendors sell to

From 3 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- Cloud security (`cloud-sec`): 2 of 3 vendors
- Incident responder (`incident-response`): 2 of 3 vendors
- SOC manager (`soc-lead`): 2 of 3 vendors
- GRC or trust lead (`grc-owner`): 1 of 3 vendors
- IT operations / systems administrator (`it-operations`): 1 of 3 vendors
- DevOps / platform engineering (`platform`): 1 of 3 vendors
- SOC analyst (`soc-analyst`): 1 of 3 vendors

## Vendors (primary)

- Gem Security: Named in the cloud-security box beside CNAPP and cloud detection. Ownership was not re-checked. No detection claim is filled.
- Uptycs: Cloud security and detection vendor. Not assumed to be a corporate EDR product.
- Sweet Security: Named on the application-runtime row. Confirm whether the product is cloud runtime or API protection before comparing it with a WAF.

## Vendors (adjacent)

- Wiz
- Splunk
- Sysdig
- Upwind

## What buyers do instead

- Send cloud logs to the SIEM and write detections. Good enough when: A strong detection team and manageable log cost. Breaks when: Cloud-specific attack paths need context the SIEM doesn't hold. — hypothesis
- Cloud provider native threat detection. Good enough when: One cloud and standard workloads. Breaks when: Multiple clouds or identity-based attacks need correlated detection. — hypothesis

## Objections

_None recorded._

## Triggers

- Cloud incident
- No one watching audit logs
- The MDR provider misses an incident or can't cover cloud and identity.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
