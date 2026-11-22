---
id: "appsec"
type: "seat"
name: "AppSec lead"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 2
---

# AppSec lead

Reduce application risk through testing, triage, developer enablement, and ownership of AppSec tooling.

## Typical titles

- ic: Application Security Engineer, AppSec Engineer
- senior-ic: Senior Application Security Engineer, Staff Application Security Engineer, Principal Application Security Engineer
- manager: Application Security Manager, AppSec Manager
- director: Director of Application Security, Head of Application Security
- vp: VP of Application Security

## Owns categories

- Static analysis (SAST) (`sast`)
- Software composition analysis (`sca`)
- Dynamic testing (DAST) (`dast`)
- API security (`api-security`)
- Application security posture (`aspm`)
- Secrets detection and remediation (`secrets-detection`)
- NHI and workload identity (`nhi`)
- Application runtime protection (`app-runtime`)
- Runtime-validated application security (`runtime-validated-application-security`)
- Interactive application testing (`iast`)

## Pains

- False positives and duplicate findings drown real issues — sourced ([Enterprise Security Tech](https://www.enterprisesecuritytech.com/post/devsecops-in-flux-black-duck-report-warns-that-ai-speed-is-outrunning-software-security))
- Findings without a named owner never get fixed — hypothesis

## Objections

- "Our platform vendor already does this." Usually about: Fear of tool sprawl and of explaining another line item. Reframe to test: Compare what the bundled feature covers today against the sources and depth this problem needs, then decide whether the gap is worth a separate tool. — hypothesis
- "We don't have anyone to run another tool." Usually about: The last tool created alerts nobody owned. Reframe to test: Size the work the tool removes against the work it adds, and agree up front who owns its output. — sourced
- "The open-source tool is good enough." Usually about: No pain yet from false positives, coverage, or reporting. Reframe to test: Agree on the point where open source stops being enough: more sources, verification, ownership routing, or audit reporting. — hypothesis
- "Developers will ignore it or route around it." Usually about: Past tools blocked builds or flooded tickets. Reframe to test: Start with high-confidence findings routed to the owning team, and measure fix rate before adding blocking checks. — hypothesis
- "We already have more findings than we can fix." Usually about: A new tool means a bigger backlog. Reframe to test: Rank by what's exploitable or verified live, and retire findings that can't be acted on. — hypothesis
- "That belongs to another team." Usually about: The problem sits between two owners, so nobody has budget for it. Reframe to test: Name both owners, agree who fixes and who funds, and bring them into the same conversation. — hypothesis

## Qualification questions

- Does the AppSec team cover many developers per security engineer? Good fit if: Ratios like 1 to 100 or more, or one person for the whole org. (high weight, hypothesis)
- Have leaked secrets or vulnerable dependencies caused an incident or near-miss? Good fit if: A rotated key, public leak report, or emergency patch. (high weight, hypothesis)
- Is AppSec run entirely by an outside consultancy? Poor fit if: No internal AppSec owner. (medium weight, hypothesis)

## Buying triggers

- A live credential is found in a public repo, ticket, or chat. — sourced ([NDSS Symposium (Meli, McNiece, Reaves; NC State University)](https://www.ndss-symposium.org/wp-content/uploads/2019/02/ndss2019_04B-3_Meli_paper.pdf))
- The company hires its first AppSec or product security engineer. — hypothesis

## Not a fit when

- No funded AppSec owner
- Engineering will not accept gates
- Pain is only OS/IT patching

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
