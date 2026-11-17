---
id: "iga-owner"
type: "seat"
name: "IGA program owner"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# IGA program owner

Run joiner/mover/leaver, access requests, and certifications.

## Typical titles

- ic: Identity Governance Engineer, IGA Engineer
- senior-ic: Senior Identity Governance Engineer, Staff Identity Governance Engineer, Principal Identity Governance Engineer
- manager: Identity Governance Manager, IGA Manager
- director: Director of Identity Governance, Head of Identity Governance

## Owns categories

- Identity governance (IGA) (`iga`)
- Workforce identity (`workforce-identity`)

## Pains

- Leavers keep working access after their last day — sourced ([Efficiently Connected](https://www.efficientlyconnected.com/?p=9885))
- Access reviews get rubber-stamped — hypothesis
- Leavers keep access because HR and IT records disagree — hypothesis

## Objections

- "Our identity provider covers this." Usually about: Identity is seen as one product, not a set of problems. Reframe to test: List what sits outside the identity provider (machine identities, non-SSO apps, cloud roles) and size that part. — hypothesis
- "HR data isn't clean enough to drive access." Usually about: Joiner, mover and leaver events in HR are late or wrong. Reframe to test: Start with leavers and contractors, where late changes create the most risk. — hypothesis

## Qualification questions

- Do access reviews take weeks or get rubber-stamped? Good fit if: Review campaigns run late or approve nearly everything. (high weight, hypothesis)
- Is SOX, SOC 2, or a regulator testing access controls? Good fit if: Audit scope that includes access reviews. (high weight, hypothesis)
- Are fewer than about 20 apps in scope, all behind SSO? Poor fit if: A small, simple app estate. (low weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
