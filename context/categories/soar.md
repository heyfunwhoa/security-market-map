---
id: "soar"
type: "category"
name: "SOAR and response automation"
layer: "core"
vendors: 11
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

## Who vendors sell to

From 5 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- SOC manager (`soc-lead`): 5 of 5 vendors
- MSSP / MDR operations lead (`mssp-ops`): 3 of 5 vendors
- SOC analyst (`soc-analyst`): 2 of 5 vendors
- IT operations / systems administrator (`it-operations`): 1 of 5 vendors

## Vendors (primary)

- Tines: Tines describes an AI orchestration and workflow platform for security and IT teams.
- Torq: Torq describes an AI SOC platform built on its Hyperautomation workflow engine, with AI agents for triage, investigation and response.
- Swimlane: Swimlane describes Turbine as an agentic AI automation platform for SOC, vulnerability management and compliance teams, sold to enterprises and MSSPs.

## Vendors (adjacent)

- Palo Alto Networks
- Google
- Splunk
- ServiceNow
- Prophet Security
- Dropzone AI
- Intezer
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
