---
id: "soc-analyst"
type: "seat"
name: "SOC analyst"
kind: "persona"
function: "security"
sourcedPains: 2
pains: 2
---

# SOC analyst

Tier-1 triage: decide whether an alert is justified and when to escalate.

## Typical titles

- ic: SOC Analyst, Security Operations Analyst
- senior-ic: Senior SOC Analyst, Lead SOC Analyst

## Owns categories

- SIEM (`siem`)
- Extended detection and response (`xdr`)
- SOAR and response automation (`soar`)
- Endpoint security (`endpoint-security`)
- Cloud detection and response (`cloud-detection`)

## Pains

- Alert fatigue from noisy, low-context alerts — practitioner published ([Stamus Networks](https://www.stamus-networks.com/blog/what-the-2025-sans-detection-response-survey-reveals-false-positives-alert-fatigue-are-worsening))
- Burnout and limited career path — sourced ([SANS Institute](https://www.elastic.co/pdf/sans-soc-survey-2025.pdf))

## Objections

- "Analysts don't need another console." Usually about: Tool switching already slows triage. Reframe to test: Ask whether it reduces alerts or adds context inside the queue analysts already use. — hypothesis

## Qualification questions

- Do analysts spend most of their time on low-context alerts? Good fit if: Repeat false positives and manual enrichment. (medium weight, hypothesis)
- Is there a path for analyst feedback into tooling decisions? Good fit if: Analysts in evaluations. (low weight, hypothesis)
- Is the analyst outside the evaluation entirely? Poor fit if: Decisions made without SOC input. (low weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
