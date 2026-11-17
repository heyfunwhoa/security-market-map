---
id: "waf-waap"
type: "category"
name: "Web application and API protection"
layer: "core"
vendors: 8
---

# Web application and API protection

Inline controls in front of a web application and its APIs, including blocking and bot checks. This map keeps that edge separate from static analysis, and separate from an API inventory unless that module is licensed.

**Buyer question:** What sits in front of the application, and what does it block?

**Usual owner:** AppSec or the team that runs the edge.

**Budget source:** Application edge. Often a different renewal from the scanner.

## Owning seats

- Network security (`network-security`)

## Vendors (primary)

- Cloudflare: Application edge and WAF conversations often start here. Not an AppSec scanner and not an identity governance suite.
- Akamai: Edge and application-protection vendor on WAAP shortlists. Segmentation products are a different conversation. Neither is checked.
- F5: Application delivery and WAF incumbent. Not an AppSec scanner.
- Imperva: Web application and API protection vendor. Data security products exist. Do not merge them into one row.
- Cequence: API and application-runtime vendor. Bot and API protection are different modules until the quote says otherwise.

## Vendors (adjacent)

- Noname Security
- Traceable
- ClearVector

## What buyers do instead

- CDN-included WAF rules. Good enough when: Standard web apps and default rule sets. Breaks when: APIs, bots, and custom rules need dedicated tuning. — hypothesis
- Rely on secure code and patching. Good enough when: Internal or low-traffic apps. Breaks when: A public app faces bots, credential stuffing, or an unpatched flaw. — hypothesis

## Objections

_None recorded._

## Triggers

- A public application
- Credential stuffing
- WAF renewal

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
