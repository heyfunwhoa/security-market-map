---
id: "supply-chain-security"
type: "seat"
name: "Software supply-chain security"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Software supply-chain security

Manage software supply chain risk — dependencies, malicious packages, build provenance — as a program, not only a CVE scanner.

## Typical titles

- ic: Software Supply Chain Security Engineer, Supply Chain Security Engineer
- senior-ic: Senior Software Supply Chain Security Engineer, Staff Software Supply Chain Security Engineer, Principal Software Supply Chain Security Engineer
- manager: Software Supply Chain Security Manager, Supply Chain Security Manager
- director: Director of Software Supply Chain Security, Head of Software Supply Chain Security

## Owns categories

- Software supply chain (`software-supply-chain`)
- Software composition analysis (`sca`)
- Container and Kubernetes security (`container-security`)
- Infrastructure-as-code security (`iac-security`)

## Pains

- Malicious open source packages arrive faster than review can keep up — sourced ([Infosecurity Magazine](https://www.infosecurity-magazine.com/news/454000-malicious-open-source/))
- Can't tell which dependency issues are reachable or malicious — hypothesis
- Customers and regulators ask for SBOMs and provenance — hypothesis

## Objections

- "We'll deal with SBOMs when customers make us." Usually about: No current pressure, and unclear value. Reframe to test: Ask which customers or regulations will ask first, and what generating it on demand would cost then. — hypothesis

## Qualification questions

- Have customers or regulators asked for SBOMs or provenance? Good fit if: Customer contract language or regulation. (high weight, hypothesis)
- Has a malicious or compromised dependency affected the company? Good fit if: An emergency response to a package compromise. (high weight, hypothesis)
- Does the company ship no software to customers? Poor fit if: An internal-only IT estate. (medium weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
