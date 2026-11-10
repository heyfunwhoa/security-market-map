---
id: "soc-lead"
type: "seat"
name: "SOC manager"
kind: "persona"
function: "security"
sourcedPains: 2
pains: 2
---

# SOC manager

Own queue outcomes, coverage, staffing, and approval of safe automation.

## Typical titles

- manager: Security Operations Manager, SOC Manager
- director: Director of Security Operations, Head of Security Operations
- vp: VP of Security Operations

## Owns categories

- SIEM (`siem`)
- SOAR and response automation (`soar`)
- Identity threat detection (ITDR) (`itdr`)
- Cloud detection and response (`cloud-detection`)
- Extended detection and response (`xdr`)
- Managed detection and response (`mdr`)

## Pains

- Keeping skilled analysts — sourced ([SANS Institute](https://www.elastic.co/pdf/sans-soc-survey-2025.pdf))
- SOC work is disconnected from the business; many staff don't know the SOC budget — sourced ([SANS Institute](https://www.elastic.co/pdf/sans-soc-survey-2025.pdf))

## Objections

- "We don't have anyone to run another tool." Usually about: The last tool created alerts nobody owned. Reframe to test: Size the work the tool removes against the work it adds, and agree up front who owns its output. — sourced
- "Analysts don't need another console." Usually about: Tool switching already slows triage. Reframe to test: Ask whether it reduces alerts or adds context inside the queue analysts already use. — hypothesis
- "We already get more intel than we can use." Usually about: Feeds don't turn into actions. Reframe to test: Judge intel by how many detections, blocks, or decisions it produced last quarter. — hypothesis

## Qualification questions

- Is alert volume higher than the team can triage? Good fit if: Backlogs, closed-without-review alerts, or burnout. (high weight, hypothesis)
- Is detection coverage for cloud or identity weak? Good fit if: Blind spots named after incidents. (medium weight, hypothesis)
- Is the SOC fully outsourced with no plan to change? Poor fit if: An MDR contract with years left. (medium weight, hypothesis)

## Buying triggers

- A breach or near-miss starts with stolen or abused credentials. — sourced ([Verizon](https://www.verizongov.com/resources/reports/2025-dbir-executive-summary.pdf))
- The MDR provider misses an incident or can't cover cloud and identity. — hypothesis

## Not a fit when

- No operating SOC
- Purchase is only a preventive scanner

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
