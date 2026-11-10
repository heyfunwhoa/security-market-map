---
id: "security-architect"
type: "seat"
name: "Security architect"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Security architect

Design reusable secure patterns (identity, crypto, API, platform) and sign off on major designs.

## Typical titles

- senior-ic: Senior Security Architecture Architect, Staff Security Architecture Architect, Principal Security Architecture Architect
- manager: Security Architecture Manager, Security Architect Manager
- director: Director of Security Architecture, Head of Security Architecture

## Owns categories

- Threat modeling (`threat-modeling`)
- Workforce identity (`workforce-identity`)
- Secrets management (`secrets-management`)
- Application security posture (`aspm`)
- Cloud-native application protection (`cnapp`)
- Identity orchestration and authorization (`identity-orchestration`)

## Pains

- Tool sprawl: dozens of overlapping products that do not integrate — sourced ([IBM](https://newsroom.ibm.com/2025-01-28-ibm-and-palo-alto-networks-find-platformization-is-key-to-reduce-cybersecurity-complexity))
- Teams buy overlapping tools that bypass shared standards — hypothesis
- Design reviews happen too late to change anything — hypothesis

## Objections

- "This overlaps a tool already in our reference architecture." Usually about: Fear of another exception to shared standards. Reframe to test: Show where it fits the existing architecture and which tool or process it replaces or feeds. — hypothesis

## Qualification questions

- Is there a reference architecture or standard this decision has to fit? Good fit if: Architecture review boards or approved-pattern lists. (medium weight, hypothesis)
- Is the architect asked to approve new security tools before purchase? Good fit if: A design review step in procurement. (high weight, hypothesis)
- Has the architecture team already standardized on a competing approach this year? Poor fit if: A recent platform decision covering the same need. (medium weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

- Architecture is purely advisory with no veto
- Purchase is a single-team tactical tool

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
