---
id: "dast"
type: "category"
name: "Dynamic testing (DAST)"
layer: "core"
vendors: 7
---

# Dynamic testing (DAST)

Testing a running application from the outside. Useful against what is deployed. Blind to most source-level issues and to infrastructure posture.

**Buyer question:** What can an outsider hit in staging or production, and when do we scan?

**Usual owner:** AppSec.

**Budget source:** AppSec tooling.

## Owning seats

- AppSec lead (`appsec`)
- Software developer (`developer`)

## Vendors (primary)

- PortSwigger: Burp Suite is the usual manual and automated web-testing tool. That is DAST-adjacent. It is not a corporate VM scanner.
- Invicti: Dynamic application testing vendor. Capabilities unverified.
- StackHawk: Named on application-testing shortlists beside SAST and DAST vendors. No scan capability is checked.
- Probely: Application-testing vendor named beside StackHawk and the SAST incumbents. Capabilities unverified.

## Vendors (adjacent)

- Checkmarx
- Veracode
- Tenable

## What buyers do instead

- Periodic penetration tests instead of automated scanning. Good enough when: Few releases a year and a compliance requirement for one test. Breaks when: Weekly releases outpace the test and findings arrive months late. — hypothesis
- Open-source web scanners run by AppSec. Good enough when: A few web apps and someone to triage results. Breaks when: Authenticated scanning, APIs, and CI integration across many apps take too much effort. — hypothesis

## Objections

_None recorded._

## Triggers

- Release test gap
- DAST renewal

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
