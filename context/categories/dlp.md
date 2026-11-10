---
id: "dlp"
type: "category"
name: "Data loss prevention"
layer: "core"
vendors: 22
---

# Data loss prevention

Controls on data leaving through email, the endpoint, the web, or SaaS. Those are different enforcement points. A DSPM scan of a bucket does not stop a download. Logging an event is not the same as blocking it. A key in a chat message can also be a secrets-detection finding.

**Buyer question:** Where can sensitive data leave, and what do we block versus log?

**Usual owner:** Data security or IT security.

**Budget source:** DLP, often beside email and endpoint.

## Owning seats

- Data security (`data-security`)
- Privacy / DPO (`privacy`)
- Insider risk (`insider-risk`)
- SaaS security (`saas-security`)

## Who vendors sell to

From 3 vendors' own pages, mapped to seats editorially. Vendor audience, not proof of who buys.

- Data security (`data-security`): 2 of 3 vendors
- CISO / VP of security (`ciso`): 1 of 3 vendors
- GRC or trust lead (`grc-owner`): 1 of 3 vendors
- Insider risk (`insider-risk`): 1 of 3 vendors
- IT operations / systems administrator (`it-operations`): 1 of 3 vendors
- SOC manager (`soc-lead`): 1 of 3 vendors

## Vendors (primary)

- Nightfall: Nightfall markets sensitive-data discovery and classification alongside data exfiltration prevention across SaaS, endpoints, email, and AI workflows. Vendor-reported positioning reviewed 2026-10-13; scope and effectiveness are not independently tested. DSPM is an adjacent discovery use case, not an assertion of full DSPM parity.
- Forcepoint: DLP incumbent named beside email and web controls. The channel on the order form is the product. No policy is checked.
- Code42: Endpoint data-movement candidate, often discussed as insider risk. Not assumed to be email DLP or DSPM.
- Strac: SaaS DLP candidate. No app coverage or block is checked.
- Fortra: Named on DLP shortlists, including the Digital Guardian lineage. Confirm which product is on the quote.

## Vendors (adjacent)

- Microsoft
- Metomic
- Zscaler
- Proofpoint
- Varonis
- Netskope
- BigID
- Imperva
- DTEX Systems
- Cyberhaven
- Spin.AI
- Teleskope
- Concentric AI
- Securiti
- Eureka
- Virtru
- PKWARE

## What buyers do instead

- DLP features in the email or endpoint suite. Good enough when: Most exfiltration risk is email and laptops. Breaks when: SaaS, AI tools, and code repos become the main leak paths. — hypothesis

## Objections

- "Our platform vendor already does this." — hypothesis
- "We can't give a vendor access to that data." — hypothesis
- "Legal and HR won't let us monitor employees that closely." — hypothesis

## Triggers

- Data leaving by email
- SaaS sprawl

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
