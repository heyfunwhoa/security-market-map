---
id: "identity-security"
type: "seat"
name: "Identity security lead"
kind: "persona"
function: "security"
sourcedPains: 2
pains: 3
---

# Identity security lead

One coherent identity story across workforce, privilege, cloud entitlements, and non-humans.

## Typical titles

- ic: Identity Security Engineer, Identity and Access Management Engineer
- senior-ic: Senior Identity Security Engineer, Staff Identity Security Engineer, Principal Identity Security Engineer
- manager: Identity Security Manager, Identity and Access Management Manager
- director: Director of Identity Security, Head of Identity Security
- vp: VP of Identity Security

## Owns categories

- Workforce identity (`workforce-identity`)
- Identity governance (IGA) (`iga`)
- PAM and PIM (`pam`)
- NHI and workload identity (`nhi`)
- CIEM and access intelligence (`ciem`)
- Identity threat detection (ITDR) (`itdr`)
- AI agent identity and runtime authorization (`agent-identity`)
- Agentic runtime enforcement (`agentic-runtime`)
- Customer identity (CIAM) (`ciam`)

## Pains

- Stolen and abused credentials remain a leading way in — sourced ([Verizon](https://www.verizongov.com/resources/reports/2025-dbir-executive-summary.pdf))
- Third-party access widens exposure beyond the identity team's view — sourced ([Verizon](https://www.verizongov.com/resources/reports/2025-dbir-executive-summary.pdf))
- Machine identities and credentials outnumber and outlive their owners — hypothesis

## Objections

- "Our identity provider covers this." Usually about: Identity is seen as one product, not a set of problems. Reframe to test: List what sits outside the identity provider (machine identities, non-SSO apps, cloud roles) and size that part. — hypothesis
- "That belongs to another team." Usually about: The problem sits between two owners, so nobody has budget for it. Reframe to test: Name both owners, agree who fixes and who funds, and bring them into the same conversation. — hypothesis
- "We need to finish the vault rollout before anything else." Usually about: Credential programs feel sequential and the team is stretched. Reframe to test: Use findings about exposed or standing credentials to prioritize which apps move into the vault first. — hypothesis

## Qualification questions

- Do machine identities or service accounts outnumber employees, without a clear owner? Good fit if: Inventory gaps, orphaned service accounts, or leaked keys. (high weight, hypothesis)
- Has an audit or incident involved credentials or access in the last year? Good fit if: An audit finding, credential-based incident, or insurer question. (high weight, hypothesis)
- Is identity entirely outsourced with no internal owner? Poor fit if: No identity team, and an MSP runs the IdP. (medium weight, hypothesis)

## Buying triggers

- A breach or near-miss starts with stolen or abused credentials. — sourced ([Verizon](https://www.verizongov.com/resources/reports/2025-dbir-executive-summary.pdf))
- A New York-regulated financial firm prepares its annual NYDFS Part 500 certification. — sourced ([Mondaq](https://www.mondaq.com/unitedstates/security/1396442/ydfs-finalizes-amendments-to-cybersecurity-regulations))
- An audit flags access reviews, privileged access, or evidence gaps. — hypothesis
- An acquisition brings in new code, cloud accounts, and identities. — hypothesis

## Not a fit when

- Only a single app certification project with no identity program owner

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
