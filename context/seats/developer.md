---
id: "developer"
type: "seat"
name: "Software developer"
kind: "persona"
function: "engineering"
sourcedPains: 1
pains: 2
---

# Software developer

Write and ship code; primary consumer of shift-left tooling.

## Typical titles

- ic: Software Engineer, Backend Engineer
- senior-ic: Senior Software Engineer, Staff Software Engineer, Principal Software Engineer

## Owns categories

- Static analysis (SAST) (`sast`)
- Software composition analysis (`sca`)
- Secrets detection and remediation (`secrets-detection`)
- Dynamic testing (DAST) (`dast`)

## Pains

- Hours lost each week to false positives and duplicate findings — sourced ([Digitalisation World](https://m.digitalisationworld.com/news/68715/growing-developer-focus-on-software-security))
- Security gates slow shipping — hypothesis

## Objections

- "The open-source tool is good enough." Usually about: No pain yet from false positives, coverage, or reporting. Reframe to test: Agree on the point where open source stops being enough: more sources, verification, ownership routing, or audit reporting. — hypothesis
- "Developers will ignore it or route around it." Usually about: Past tools blocked builds or flooded tickets. Reframe to test: Start with high-confidence findings routed to the owning team, and measure fix rate before adding blocking checks. — hypothesis
- "We don't have sprint time for security work." Usually about: Security work isn't prioritized or estimated like product work. Reframe to test: Size the work in sprint terms, route only high-confidence findings, and ask whether it can enter the backlog like any other bug. — hypothesis

## Qualification questions

- Do developers get security findings in their pull requests or IDE? Good fit if: Inline findings and fix guidance. (medium weight, hypothesis)
- Have developers had to rotate a leaked credential? Good fit if: An emergency rotation. (medium weight, hypothesis)
- Are developers outside any security tool decision? Poor fit if: No developer input on tools. (low weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

- Budget authority

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
