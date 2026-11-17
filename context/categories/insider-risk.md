---
id: "insider-risk"
type: "category"
name: "Insider risk"
layer: "core"
vendors: 7
---

# Insider risk

Behavior that suggests data theft or misuse by someone who already has access. This map keeps that investigation separate from a data-loss block and from identity threat detection.

**Buyer question:** Which departing or misusing user is moving data, and who is allowed to look?

**Usual owner:** Insider risk, often with legal and the SOC.

**Budget source:** Data security or SecOps.

## Owning seats

- Digital forensics (`digital-forensics`)
- Insider risk (`insider-risk`)
- Security awareness / people security (`security-awareness`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Proofpoint: Homepage retrieved 26 Oct 2026 describes collaboration, data, and AI security, including discovery of AI apps and agents and runtime policy. That page does not describe an email gateway. Not an identity threat product unless a specific SKU is sourced.
- DTEX Systems: Insider-risk vendor. Monitoring a user is not an access review.
- Securonix: Security analytics vendor named for insider risk and SIEM. Confirm which budget is buying.

## Vendors (adjacent)

- Cyberhaven
- Forcepoint
- Code42
- Fortra

## What buyers do instead

- DLP rules plus HR investigations. Good enough when: Clear data types and infrequent cases. Breaks when: Context on user behavior is needed to separate mistakes from intent. — hypothesis
- Handle cases as they come up. Good enough when: Low-value data and few departures. Breaks when: A departing employee takes customer data or source code. — hypothesis

## Objections

- "Legal and HR won't let us monitor employees that closely." — hypothesis

## Triggers

- Departures
- A sensitive repository with broad access

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
