---
id: "threat-hunter"
type: "seat"
name: "Threat hunter"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Threat hunter

Tier-3 proactive hunting and major escalations.

## Typical titles

- ic: Threat Hunting Analyst, Threat Hunter Analyst
- senior-ic: Senior Threat Hunting Analyst, Lead Threat Hunting Analyst
- manager: Threat Hunting Manager, Threat Hunter Manager

## Owns categories

- SIEM (`siem`)
- Extended detection and response (`xdr`)
- Network detection and response (`ndr`)
- Threat intelligence (`threat-intelligence`)
- Cloud detection and response (`cloud-detection`)

## Pains

- Not enough skilled hunters, and cloud is the hardest place to hunt — sourced ([SANS Institute](https://www.sans.org/white-papers/sans-2025-threat-hunting-survey-advancements-threat-hunting-amid-ai-cloud-challenges/))
- Hunts fail on missing telemetry — hypothesis
- Hunting time gets eaten by triage — hypothesis

## Objections

- "Analysts don't need another console." Usually about: Tool switching already slows triage. Reframe to test: Ask whether it reduces alerts or adds context inside the queue analysts already use. — hypothesis
- "We need to fix telemetry before adding tools." Usually about: Missing data makes new tools look useless. Reframe to test: Start from the hunts or detections that failed for lack of data and fill that gap first. — hypothesis

## Qualification questions

- Is there a dedicated hunting function? Good fit if: Scheduled hunts or a hunt team. (medium weight, hypothesis)
- Have hunts failed because data wasn't retained? Good fit if: Short retention or missing telemetry. (high weight, hypothesis)
- Does hunting happen only during incidents? Poor fit if: No proactive hunting. (low weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
