---
id: "platform-security"
type: "seat"
name: "Platform security"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 2
---

# Platform security

Secure the shared internal platform: CI/CD guardrails, workload identity, runtime policy, secrets delivery, build-system supply chain.

## Typical titles

- ic: Platform Security Engineer, Infrastructure Security Engineer
- senior-ic: Senior Platform Security Engineer, Staff Platform Security Engineer, Principal Platform Security Engineer
- manager: Platform Security Manager, Infrastructure Security Manager
- director: Director of Platform Security, Head of Platform Security

## Owns categories

- Container and Kubernetes security (`container-security`)
- Infrastructure-as-code security (`iac-security`)
- Secrets management (`secrets-management`)
- Application security posture (`aspm`)

## Pains

- One bad template or base image repeats the same flaw across every team — hypothesis
- Leaked credentials take months to revoke and rotate — sourced ([Verizon](https://www.verizongov.com/resources/reports/2025-dbir-executive-summary.pdf))

## Objections

- "We built our own." Usually about: Pride of ownership, plus doubt that a product fits their edge cases. Reframe to test: Ask what it costs to maintain, who owns it if that engineer leaves, and what it doesn't cover yet. — hypothesis
- "The open-source tool is good enough." Usually about: No pain yet from false positives, coverage, or reporting. Reframe to test: Agree on the point where open source stops being enough: more sources, verification, ownership routing, or audit reporting. — hypothesis
- "We need to finish the vault rollout before anything else." Usually about: Credential programs feel sequential and the team is stretched. Reframe to test: Use findings about exposed or standing credentials to prioritize which apps move into the vault first. — hypothesis

## Qualification questions

- Does platform security set guardrails for CI/CD, images and secrets delivery? Good fit if: Golden images, admission policy or pipeline controls. (high weight, hypothesis)
- Have findings repeated across many services because of a shared platform gap? Good fit if: The same misconfiguration in many repos. (high weight, hypothesis)
- Is the platform built entirely on one managed service with built-in controls? Poor fit if: A fully managed PaaS with no custom pipelines. (low weight, hypothesis)

## Buying triggers

- A live credential is found in a public repo, ticket, or chat. — sourced ([NDSS Symposium (Meli, McNiece, Reaves; NC State University)](https://www.ndss-symposium.org/wp-content/uploads/2019/02/ndss2019_04B-3_Meli_paper.pdf))

## Not a fit when

- No shared platform
- Security reviews apps only after merge with no platform control plane

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
