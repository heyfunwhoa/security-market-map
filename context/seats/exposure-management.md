---
id: "exposure-management"
type: "seat"
name: "Exposure / attack-surface owner"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Exposure / attack-surface owner

Find and prioritize exposures across internet-facing, cloud, and IT assets, then route them to fixers.

## Typical titles

- ic: Exposure Management Analyst, Attack Surface Management Analyst
- senior-ic: Senior Exposure Management Analyst, Lead Exposure Management Analyst
- manager: Exposure Management Manager, Attack Surface Management Manager
- director: Director of Exposure Management, Head of Exposure Management

## Owns categories

- External attack surface (`external-attack-surface`)
- Continuous threat exposure management (`ctem`)
- Cyber asset management (`security-asset-management`)
- Cloud vulnerability management (`cloud-vulnerability`)
- IT vulnerability management (`it-vulnerability-management`)

## Pains

- Exploited edge vulnerabilities stay open for weeks — sourced ([HIPAA Journal](https://www.hipaajournal.com/verizon-dbir-2025/))
- Asset inventory is incomplete — hypothesis
- Exposures get routed to the wrong owner — hypothesis

## Objections

- "We already have more findings than we can fix." Usually about: A new tool means a bigger backlog. Reframe to test: Rank by what's exploitable or verified live, and retire findings that can't be acted on. — hypothesis
- "We already find more than we can get fixed." Usually about: Testing produces reports that don't change outcomes. Reframe to test: Measure fix rate, not finding count, and pick validation that proves which findings are exploitable. — hypothesis

## Qualification questions

- Is the vulnerability backlog growing faster than it's fixed? Good fit if: Aging critical findings. (high weight, hypothesis)
- Does the company know its full external attack surface? Good fit if: Acquisitions or shadow IT create unknowns. (medium weight, hypothesis)
- Is the estate small enough to patch everything monthly? Poor fit if: A small, uniform fleet. (low weight, hypothesis)

## Buying triggers

- An acquisition brings in new code, cloud accounts, and identities. — hypothesis

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
