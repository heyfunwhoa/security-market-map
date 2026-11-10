---
id: "detection-engineer"
type: "seat"
name: "Detection engineer"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 2
---

# Detection engineer

Write, test, and maintain detection content; close telemetry gaps; own tuning.

## Typical titles

- ic: Detection Engineering Engineer, Detection Engineer
- senior-ic: Senior Detection Engineering Engineer, Staff Detection Engineering Engineer, Principal Detection Engineering Engineer
- manager: Detection Engineering Manager, Detection Manager
- director: Director of Detection Engineering, Head of Detection Engineering

## Owns categories

- SIEM (`siem`)
- SOAR and response automation (`soar`)
- Cloud detection and response (`cloud-detection`)
- Identity threat detection (ITDR) (`itdr`)
- Extended detection and response (`xdr`)
- Detection engineering lifecycle (`detection-engineering`)

## Pains

- False positives are the top detection challenge — practitioner published ([Stamus Networks](https://www.stamus-networks.com/blog/what-the-2025-sans-detection-response-survey-reveals-false-positives-alert-fatigue-are-worsening))
- Missing telemetry for new environments — hypothesis

## Objections

- "We built our own." Usually about: Pride of ownership, plus doubt that a product fits their edge cases. Reframe to test: Ask what it costs to maintain, who owns it if that engineer leaves, and what it doesn't cover yet. — hypothesis
- "We need to fix telemetry before adding tools." Usually about: Missing data makes new tools look useless. Reframe to test: Start from the hunts or detections that failed for lack of data and fill that gap first. — hypothesis

## Qualification questions

- Is there a detection engineering team or role? Good fit if: Detections-as-code or a named detection engineer. (high weight, hypothesis)
- Are SIEM ingest costs forcing data to be dropped? Good fit if: Logs left out of the SIEM for cost. (high weight, hypothesis)
- Does the vendor or MDR own all detection content? Poor fit if: No in-house detections. (medium weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

- No content owner

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
