---
id: "soar"
type: "category"
name: "SOAR and response automation"
layer: "core"
vendors: 7
---

# SOAR and response automation

Playbooks that enrich and sometimes contain an incident. Automation that disables a user is powerful and dangerous. It is not joiner-mover-leaver.

**Buyer question:** Which response steps are safe to automate, and who approves the rest?

**Usual owner:** SOC.

**Budget source:** SecOps. Sometimes bundled with the SIEM.

## Owning seats

- SOC manager (`soc-lead`)
- Detection engineer (`detection-engineer`)
- SOC analyst (`soc-analyst`)
- Incident responder (`incident-response`)
- MSSP / MDR operations lead (`mssp-ops`)

## Vendors (primary)

_None recorded._

## Vendors (adjacent)

- Splunk
- ServiceNow
- Prophet Security
- Dropzone AI
- Intezer
- Stairwell
- Anvilogic

## What buyers do instead

- Scripts and workflow automation tools. Good enough when: A few repeatable playbooks and an engineer who owns them. Breaks when: Many playbooks, approvals, and audit of automated actions. — hypothesis

## Objections

- "We built our own." — hypothesis
- "Analysts don't need another console." — hypothesis

## Triggers

- Alert fatigue
- Slow containment

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
