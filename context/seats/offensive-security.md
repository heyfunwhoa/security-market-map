---
id: "offensive-security"
type: "seat"
name: "Security validation / offensive"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Security validation / offensive

Prove controls fail safely and map findings to fixers (BAS platform ≠ pentest program ≠ bug bounty intake).

## Typical titles

- ic: Offensive Security Engineer, Red Team Engineer
- senior-ic: Senior Offensive Security Engineer, Staff Offensive Security Engineer, Principal Offensive Security Engineer
- manager: Offensive Security Manager, Red Team Manager
- director: Director of Offensive Security, Head of Offensive Security
- vp: VP of Offensive Security

## Owns categories

- Breach and attack simulation (`breach-simulation`)
- Penetration testing (`pentest-program`)
- Disclosure and bug bounty (`vulnerability-disclosure`)
- Threat modeling (`threat-modeling`)

## Pains

- Findings are reported but less than half are ever resolved — sourced ([Cyentia Institute](https://www.cyentia.com/publication/2025-state-of-pentesting-report/))
- Validated findings don't get remediated — hypothesis
- Point-in-time tests go stale fast — hypothesis

## Objections

- "We already find more than we can get fixed." Usually about: Testing produces reports that don't change outcomes. Reframe to test: Measure fix rate, not finding count, and pick validation that proves which findings are exploitable. — hypothesis

## Qualification questions

- Does the team run continuous testing or red team exercises? Good fit if: An internal red team or ongoing testing program. (medium weight, hypothesis)
- Do validated findings go unremediated for months? Good fit if: Repeat findings across tests. (high weight, hypothesis)
- Is testing only an annual compliance pentest? Poor fit if: One report a year for an auditor. (low weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

- No appetite to remediate validated findings
- Report-only culture

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
