---
id: "network-security"
type: "seat"
name: "Network security"
kind: "persona"
function: "security"
sourcedPains: 1
pains: 3
---

# Network security

Edge access, lateral movement controls, and network detection.

## Typical titles

- ic: Network Security Engineer, NetSec Engineer
- senior-ic: Senior Network Security Engineer, Staff Network Security Engineer, Principal Network Security Engineer
- manager: Network Security Manager, NetSec Manager
- director: Director of Network Security, Head of Network Security

## Owns categories

- Network edge (`network-edge`)
- Network detection and response (`ndr`)
- Microsegmentation (`microsegmentation`)
- Web application and API protection (`waf-waap`)

## Pains

- Edge and VPN appliances became a top exploitation target and patch slowly — sourced ([HIPAA Journal](https://www.hipaajournal.com/verizon-dbir-2025/))
- Edge devices and VPNs are prime exploitation targets — hypothesis
- Lateral movement is hard to see — hypothesis

## Objections

- "Our firewall vendor already covers this." Usually about: Network teams standardize on one vendor stack. Reframe to test: Compare what the current stack sees for remote users, east-west traffic, and edge-device exposure. — hypothesis

## Qualification questions

- Were edge devices or VPNs affected by recent critical advisories? Good fit if: Emergency patching of firewalls or VPNs. (high weight, hypothesis)
- Is lateral movement hard to see or stop? Good fit if: Flat networks or few internal controls. (medium weight, hypothesis)
- Is the network fully managed by a carrier or MSP? Poor fit if: No internal network security owner. (medium weight, hypothesis)

## Buying triggers

_None recorded._

## Not a fit when

_None recorded._

## Don't assume

_None recorded._

_Generated from typed data in heyfunwhoa/security-market-map. Hypotheses are untested until field notes support them._
