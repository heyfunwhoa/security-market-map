---
id: "api-security"
type: "category"
name: "API security"
layer: "core"
vendors: 15
---

# API security

Inventory and abuse of APIs the product exposes. Overlaps DAST, gateways, and runtime protection. Do not assume an API security product replaces authentication.

**Buyer question:** Which APIs exist, and which of them are being called in ways we did not design?

**Usual owner:** AppSec or a product security engineer next to the API platform.

**Budget source:** AppSec or API platform.

## Owning seats

- AppSec lead (`appsec`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Salt Security: API security candidate. No capability is asserted.
- Noname Security: API security vendor named on the application-runtime row. Ownership was not re-checked.
- Traceable: API security vendor beside Salt and Noname. No discovery or blocking claim is checked.
- Cequence: API and application-runtime vendor. Bot and API protection are different modules until the quote says otherwise.
- ClearVector: Named on the application-runtime row beside API and WAF vendors. No enforcement claim is checked.

## Vendors (adjacent)

- PortSwigger
- Invicti
- Cloudflare
- Akamai
- F5
- Imperva
- Lakera
- Corsha
- StackHawk
- Sweet Security

## What buyers do instead

- API gateway auth and rate limiting. Good enough when: APIs are inventoried and all pass through one gateway. Breaks when: Shadow or deprecated APIs and business-logic abuse don't show up at the gateway. — hypothesis
- Test APIs with existing DAST. Good enough when: A small, documented API surface. Breaks when: APIs change faster than specs, or abuse happens in production traffic. — hypothesis

## Objections

_None recorded._

## Triggers

- Shadow APIs
- Partner API launch

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
