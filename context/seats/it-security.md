---
id: "it-security"
type: "seat"
name: "IT / corporate security"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# IT / corporate security

Protect the employee and corporate estate: endpoints, email, network edge, IT asset vulnerability management, awareness.

## Typical titles

- ic: IT Security Engineer, Corporate Security Engineer
- senior-ic: Senior IT Security Engineer, Staff IT Security Engineer, Principal IT Security Engineer
- manager: IT Security Manager, Corporate Security Manager
- director: Director of IT Security, Head of IT Security
- vp: VP of IT Security

## Owns categories

- Endpoint security (`endpoint-security`)
- Email security (`email-security`)
- IT vulnerability management (`it-vulnerability-management`)
- Network edge (`network-edge`)
- Security awareness (`security-awareness`)
- Endpoint control and prevention (`endpoint-control`)
- Enterprise browser (`enterprise-browser`)

## Pains

- Edge device vulnerabilities are only partly remediated — sourced ([HIPAA Journal](https://www.hipaajournal.com/verizon-dbir-2025/))
- Patch backlog on endpoints and servers — hypothesis
- Too many overlapping endpoint and email tools — hypothesis

## Objections

- "We already have more findings than we can fix." Usually about: A new tool means a bigger backlog. Reframe to test: Rank by what's exploitable or verified live, and retire findings that can't be acted on. — hypothesis
- "Our identity provider covers this." Usually about: Identity is seen as one product, not a set of problems. Reframe to test: List what sits outside the identity provider (machine identities, non-SSO apps, cloud roles) and size that part. — hypothesis
- "Our firewall vendor already covers this." Usually about: Network teams standardize on one vendor stack. Reframe to test: Compare what the current stack sees for remote users, east-west traffic, and edge-device exposure. — hypothesis
- "Business teams own those SaaS apps, not us." Usually about: No authority over app settings or integrations. Reframe to test: Agree on a shared baseline and route fixes to app owners with clear risk, instead of taking over admin. — hypothesis

## Qualification questions

- Is IT security responsible for endpoints, email and SaaS without a large team? Good fit if: A small team covering many corporate tools. (high weight, hypothesis)
- Have insurers or customers required specific controls? Good fit if: Insurance questionnaires or customer audits. (high weight, hypothesis)
- Is the whole function outsourced to an MSP? Poor fit if: An MSP owns all corporate security tools. (medium weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

- Pain is only in application code or cloud workload posture

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
