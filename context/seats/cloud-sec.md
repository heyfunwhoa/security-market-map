---
id: "cloud-sec"
type: "seat"
name: "Cloud security"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 4
---

# Cloud security

Cloud control-plane posture, workload protection, entitlements, and cloud detection foundations.

## Typical titles

- ic: Cloud Security Engineer, CloudSec Engineer
- senior-ic: Senior Cloud Security Engineer, Staff Cloud Security Engineer, Principal Cloud Security Engineer
- manager: Cloud Security Manager, CloudSec Manager
- director: Director of Cloud Security, Head of Cloud Security
- vp: VP of Cloud Security

## Owns categories

- Cloud posture (CSPM) (`cspm`)
- Cloud workload protection (`cwpp`)
- CIEM and access intelligence (`ciem`)
- Cloud-native application protection (`cnapp`)
- Cloud detection and response (`cloud-detection`)
- Identity threat detection (ITDR) (`itdr`)
- Adjacent security (`adjacent-security`)

## Pains

- Cloud identities carry access keys older than a year — sourced ([Datadog](https://investors.datadoghq.com/news-releases/news-release-details/datadogs-2025-state-cloud-security-report-finds-companies))
- Findings get routed to teams that don't own the resource — hypothesis
- Posture findings outnumber the people who can fix them — hypothesis
- Multi-cloud and fast-changing accounts break visibility — hypothesis

## Objections

- "Our platform vendor already does this." Usually about: Fear of tool sprawl and of explaining another line item. Reframe to test: Compare what the bundled feature covers today against the sources and depth this problem needs, then decide whether the gap is worth a separate tool. — hypothesis
- "We already have more findings than we can fix." Usually about: A new tool means a bigger backlog. Reframe to test: Rank by what's exploitable or verified live, and retire findings that can't be acted on. — hypothesis
- "Our cloud provider's native tools are enough." Usually about: Cost, and a single-cloud view of the world. Reframe to test: Test the native tools against multi-account prioritization and the second cloud, if there is one. — hypothesis
- "That belongs to another team." Usually about: The problem sits between two owners, so nobody has budget for it. Reframe to test: Name both owners, agree who fixes and who funds, and bring them into the same conversation. — hypothesis

## Qualification questions

- Does the company run more than a handful of cloud accounts, or more than one cloud? Good fit if: Dozens of accounts or multi-cloud. (high weight, hypothesis)
- Are critical cloud findings missing a named owner? Good fit if: Findings that sit unassigned for weeks. (high weight, hypothesis)
- Is cloud security owned by a single generalist with no budget? Poor fit if: No cloud security line in the budget. (medium weight, hypothesis)

## Buying triggers

- A major cloud migration or a second cloud provider. — hypothesis

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
