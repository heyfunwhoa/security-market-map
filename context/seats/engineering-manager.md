---
id: "engineering-manager"
type: "seat"
name: "Engineering manager"
kind: "persona"
function: "engineering"
sourcedPains: 1
pains: 2
---

# Engineering manager

Schedule remediation beside features; reject controls without a paved path.

## Typical titles

- manager: Engineering Manager, Software Engineering Manager
- director: Director of Engineering, Head of Engineering

## Owns categories

- Static analysis (SAST) (`sast`)
- Software composition analysis (`sca`)
- Application security posture (`aspm`)
- Secrets detection and remediation (`secrets-detection`)

## Pains

- Security work competes with the roadmap — hypothesis
- Findings arrive without fix guidance — sourced ([Latio Tech](https://www.legitsecurity.com/hubfs/2026-Latio-Application-Security-Report.pdf))

## Objections

- "Developers will ignore it or route around it." Usually about: Past tools blocked builds or flooded tickets. Reframe to test: Start with high-confidence findings routed to the owning team, and measure fix rate before adding blocking checks. — hypothesis
- "We don't have sprint time for security work." Usually about: Security work isn't prioritized or estimated like product work. Reframe to test: Size the work in sprint terms, route only high-confidence findings, and ask whether it can enter the backlog like any other bug. — hypothesis

## Qualification questions

- Do security findings land in this manager's team backlog? Good fit if: Security tickets with a due date in their sprint. (high weight, hypothesis)
- Has a security issue disrupted a release? Good fit if: A blocked or rolled-back release. (medium weight, hypothesis)
- Is the team's roadmap fully committed with no room for tooling changes? Poor fit if: A hard launch date in the next quarter. (medium weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
