---
id: "app-runtime"
type: "category"
name: "Application runtime protection"
layer: "core"
vendors: 4
---

# Application runtime protection

WAF, bot controls, and RASP in front of or inside a running application. This is a production shield. It is not a code fix.

**Buyer question:** What stops an exploit against an application we have not patched yet?

**Usual owner:** AppSec or the edge team, and they will argue about which.

**Budget source:** WAF or application edge. Sometimes bundled with a CDN.

## Owning seats

- AppSec lead (`appsec`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Cloudflare: Application edge and WAF conversations often start here. Not an AppSec scanner and not an identity governance suite.
- Contrast Security: Contrast markets runtime application security: instrumentation inside the app for testing and for application detection and response (ADR). It says Gartner's 2026 AppSec Hype Cycle names it a Sample Vendor for ADR (vendor-reported).

## Vendors (adjacent)

- Salt Security
- Cequence

## What buyers do instead

- CDN or cloud provider WAF rules. Good enough when: Public web apps with common attack patterns. Breaks when: Custom app logic, bots, or zero-days need deeper protection or tuning. — hypothesis
- Patch fast and accept the gap. Good enough when: A small app estate and a fast release process. Breaks when: A critical vulnerability lands in something that can't be patched quickly. — hypothesis

## Objections

_None recorded._

## Triggers

- Exploit of a known bug
- Bot abuse
- WAF renewal

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
