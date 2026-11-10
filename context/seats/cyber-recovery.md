---
id: "cyber-recovery"
type: "seat"
name: "Cyber recovery / resilience"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Cyber recovery / resilience

Prove the business can restore clean systems after ransomware or destructive attack.

## Typical titles

- ic: Cyber Recovery Engineer, Cyber Resilience Engineer
- senior-ic: Senior Cyber Recovery Engineer, Staff Cyber Recovery Engineer, Principal Cyber Recovery Engineer
- manager: Cyber Recovery Manager, Cyber Resilience Manager
- director: Director of Cyber Recovery, Head of Cyber Recovery

## Owns categories

- Cyber recovery (`cyber-recovery`)
- Endpoint security (`endpoint-security`)
- Cloud-native application protection (`cnapp`)

## Pains

- Backups fail to restore when ransomware hits — sourced ([SecurityBrief](https://securitybrief.co.uk/story/uk-firms-face-rising-ransomware-costs-but-recover-faster))
- Restores never tested against a ransomware scenario — hypothesis
- Backups reachable by the same attacker — hypothesis

## Objections

- "Our backups are fine." Usually about: Backups exist, but recovery hasn't been tested under attack. Reframe to test: Ask when a full restore was last tested, and whether the attacker's credentials could reach the backups. — hypothesis

## Qualification questions

- Has a full restore been tested against a ransomware scenario? Poor fit if: A recent successful end-to-end test, which means less urgency. (high weight, hypothesis)
- Do insurers or regulators require tested recovery? Good fit if: Insurance or DORA-style requirements. (high weight, hypothesis)
- Are backups reachable with the same admin credentials as production? Good fit if: No isolation between backup and production admins. (high weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
