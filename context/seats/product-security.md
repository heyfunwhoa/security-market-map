---
id: "product-security"
type: "seat"
name: "Product security lead"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Product security lead

Make the product customers buy trustworthy: threat modeling, design review, secure engineering expectations, disclosure, and launch bars.

## Typical titles

- ic: Product Security Engineer, ProdSec Engineer
- senior-ic: Senior Product Security Engineer, Staff Product Security Engineer, Principal Product Security Engineer
- manager: Product Security Manager, ProdSec Manager
- director: Director of Product Security, Head of Product Security
- vp: VP of Product Security

## Owns categories

- Product security program (`product-security-program`)
- Threat modeling (`threat-modeling`)
- Disclosure and bug bounty (`vulnerability-disclosure`)
- Static analysis (SAST) (`sast`)

## Pains

- Pentest findings stay open; many never get fixed — sourced ([Cyentia Institute](https://www.cyentia.com/publication/2025-state-of-pentesting-report/))
- Launch deadlines arrive before the security review — hypothesis
- Customer questionnaires and researcher reports pile up — hypothesis

## Objections

- "We'll deal with SBOMs when customers make us." Usually about: No current pressure, and unclear value. Reframe to test: Ask which customers or regulations will ask first, and what generating it on demand would cost then. — hypothesis

## Qualification questions

- Are customer security reviews slowing enterprise deals? Good fit if: Questionnaires and audits tied to deals. (high weight, hypothesis)
- Is there a disclosure or bug bounty program to run? Good fit if: A security.txt, VDP or bounty platform. (medium weight, hypothesis)
- Is product security covered by AppSec part-time? Poor fit if: No product security headcount. (low weight, hypothesis)

## Buying triggers

- Security questionnaires start blocking or slowing enterprise deals. — hypothesis
- The company hires its first AppSec or product security engineer. — hypothesis

## Not a fit when

- Company ships only internal tools
- 'ProdSec' is a title on AppSec tooling with no program

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
