---
id: "data-security"
type: "seat"
name: "Data security"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Data security

Discover sensitive data, govern access, and control egress — without collapsing DSPM, DAG, DLP, and privacy into one SKU.

## Typical titles

- ic: Data Security Engineer, Data Loss Prevention Engineer
- senior-ic: Senior Data Security Engineer, Staff Data Security Engineer, Principal Data Security Engineer
- manager: Data Security Manager, Data Loss Prevention Manager
- director: Director of Data Security, Head of Data Security
- vp: VP of Data Security

## Owns categories

- Data security posture (`dspm`)
- Data loss prevention (`dlp`)
- Data access governance (`data-access-governance`)
- Privacy governance (`privacy-governance`)
- Encryption and tokenization (`data-encryption`)
- Database security (`database-security`)

## Pains

- Does not know where all sensitive data lives — sourced ([Fortune](https://fortune.com/2026/02/25/thales-sp-survey-cyber-risk-ai-agents-wandering-free-data-not-secure-two-thirds-companies/))
- Don't know where sensitive data sits across SaaS and cloud — hypothesis
- DLP either blocks the business or misses real leaks — hypothesis

## Objections

- "We can't give a vendor access to that data." Usually about: Privacy, residency, or contract limits on sharing code or customer data. Reframe to test: Clarify what leaves the environment, what is stored, and whether a self-hosted or scoped option exists. — hypothesis

## Qualification questions

- Does the company hold regulated or customer data across SaaS, cloud and warehouses? Good fit if: PII, PHI or financial data in many stores. (high weight, hypothesis)
- Has anyone asked where sensitive data lives and couldn't get an answer? Good fit if: An audit, AI project or incident question without an answer. (high weight, hypothesis)
- Is data security fully covered by an email or endpoint DLP that already works? Poor fit if: No complaints about DLP coverage. (low weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

- Pain is only code vulnerability
- Only endpoint DLP with no data-store scope

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
