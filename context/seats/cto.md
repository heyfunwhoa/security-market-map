---
id: "cto"
type: "seat"
name: "CTO / VP of engineering"
kind: "persona"
function: "engineering"
sourcedPains: 1
pains: 3
---

# CTO / VP of engineering

Engineering strategy; co-sponsors platform and developer-security buys.

## Typical titles

- vp: VP of Engineering
- c-level: CTO, Chief Technology Officer, Chief Engineer

## Owns categories

- Application security posture (`aspm`)
- Secrets management (`secrets-management`)
- Container and Kubernetes security (`container-security`)
- Infrastructure-as-code security (`iac-security`)
- Cloud-native application protection (`cnapp`)

## Pains

- Security work competes with the product roadmap for the same engineers — hypothesis
- Security tools that aren't developer-friendly slow delivery — sourced ([Latio Tech](https://www.legitsecurity.com/hubfs/2026-Latio-Application-Security-Report.pdf))
- Enterprise deals need security proof the team can't produce fast — hypothesis

## Objections

- "It's not in this year's budget." Usually about: No clear owner for the spend, or the problem hasn't been tied to a risk the board tracks. Reframe to test: Find whose existing budget this replaces or protects, and tie the problem to an exposure already on the risk register. — sourced
- "We built our own." Usually about: Pride of ownership, plus doubt that a product fits their edge cases. Reframe to test: Ask what it costs to maintain, who owns it if that engineer leaves, and what it doesn't cover yet. — hypothesis
- "Developers will ignore it or route around it." Usually about: Past tools blocked builds or flooded tickets. Reframe to test: Start with high-confidence findings routed to the owning team, and measure fix rate before adding blocking checks. — hypothesis
- "We'll deal with SBOMs when customers make us." Usually about: No current pressure, and unclear value. Reframe to test: Ask which customers or regulations will ask first, and what generating it on demand would cost then. — hypothesis

## Qualification questions

- Are enterprise deals blocked by security questionnaires or audits? Good fit if: Lost or delayed deals tied to security. (high weight, hypothesis)
- Does security work compete with roadmap for the same engineers? Good fit if: Security tickets displacing features. (medium weight, hypothesis)
- Is the company pre-product with no customers? Poor fit if: No production systems. (medium weight, hypothesis)

## Buying triggers

- The company needs its first SOC 2 or ISO 27001 to close enterprise deals. — hypothesis
- Security questionnaires start blocking or slowing enterprise deals. — hypothesis
- The company hires its first AppSec or product security engineer. — hypothesis
- A large funding round sets expectations for enterprise readiness. — hypothesis

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
