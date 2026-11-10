---
id: "pam-owner"
type: "seat"
name: "PAM owner"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# PAM owner

Control standing and just-in-time privileged access, vaulted credentials, and session oversight.

## Typical titles

- ic: Privileged Access Engineer, PAM Engineer
- senior-ic: Senior Privileged Access Engineer, Staff Privileged Access Engineer, Principal Privileged Access Engineer
- manager: Privileged Access Manager, PAM Manager
- director: Director of Privileged Access, Head of Privileged Access

## Owns categories

- PAM and PIM (`pam`)
- Secrets management (`secrets-management`)

## Pains

- Long-lived cloud keys that never rotate act as standing privilege — sourced ([Datadog](https://investors.datadoghq.com/news-releases/news-release-details/datadogs-2025-state-cloud-security-report-finds-companies))
- Standing admin privilege is hard to remove — hypothesis
- App teams resist moving credentials into the vault — hypothesis

## Objections

- "We need to finish the vault rollout before anything else." Usually about: Credential programs feel sequential and the team is stretched. Reframe to test: Use findings about exposed or standing credentials to prioritize which apps move into the vault first. — hypothesis

## Qualification questions

- Do admins still have standing privileged access? Good fit if: Shared admin accounts or permanent domain admins. (high weight, hypothesis)
- Has an auditor or insurer asked about privileged sessions? Good fit if: Requests for session recording or just-in-time access. (medium weight, hypothesis)
- Is the PAM rollout stalled with no executive sponsor? Poor fit if: Rollout paused for over a quarter. (medium weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
