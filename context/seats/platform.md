---
id: "platform"
type: "seat"
name: "DevOps / platform engineering"
kind: "persona"
function: "engineering"
sourcedPains: 1
pains: 2
---

# DevOps / platform engineering

Deliver reliable self-service: pipelines, environments, developer portals, infrastructure modules, workload authentication.

## Typical titles

- ic: Platform Engineering Engineer, Platform Engineer
- senior-ic: Senior Platform Engineering Engineer, Staff Platform Engineering Engineer, Principal Platform Engineering Engineer
- manager: Platform Engineering Manager, Platform Manager
- director: Director of Platform Engineering, Head of Platform Engineering
- vp: VP of Platform Engineering

## Owns categories

- Secrets management (`secrets-management`)
- NHI and workload identity (`nhi`)
- Container and Kubernetes security (`container-security`)
- Infrastructure-as-code security (`iac-security`)

## Pains

- Security tickets and credential requests create toil — hypothesis
- Hardcoded secrets keep leaking into code and stay in Git history — sourced ([NDSS Symposium (Meli, McNiece, Reaves; NC State University)](https://www.ndss-symposium.org/wp-content/uploads/2019/02/ndss2019_04B-3_Meli_paper.pdf))

## Objections

- "We built our own." Usually about: Pride of ownership, plus doubt that a product fits their edge cases. Reframe to test: Ask what it costs to maintain, who owns it if that engineer leaves, and what it doesn't cover yet. — hypothesis
- "Our cloud provider's native tools are enough." Usually about: Cost, and a single-cloud view of the world. Reframe to test: Test the native tools against multi-account prioritization and the second cloud, if there is one. — hypothesis
- "That belongs to another team." Usually about: The problem sits between two owners, so nobody has budget for it. Reframe to test: Name both owners, agree who fixes and who funds, and bring them into the same conversation. — hypothesis

## Qualification questions

- Does the platform team own CI/CD, the deployment paths and shared infrastructure? Good fit if: A named platform or DevOps team with paved roads. (high weight, hypothesis)
- Are security fixes landing on the platform team's backlog without context? Good fit if: Tickets from security with unclear ownership. (medium weight, hypothesis)
- Is the platform team fully booked on a migration for the next two quarters? Poor fit if: A big cloud or Kubernetes migration in flight. (medium weight, hypothesis)

## Buying triggers

- A major cloud migration or a second cloud provider. — hypothesis

## Not a fit when

- Security will not let platform operate the control
- Every team must keep local secret stores by policy

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
