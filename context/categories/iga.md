---
id: "iga"
type: "category"
name: "Identity governance (IGA)"
layer: "core"
vendors: 20
---

# Identity governance (IGA)

Joiner-mover-leaver, access requests, certifications, role mining, separation of duties, audit evidence, and remediation. IGA decides who should have access and whether they still should.

**Buyer question:** Who should have this access, who approved it, and can we prove that at audit time?

**Usual owner:** IGA program owner, often reporting to IAM or GRC.

**Budget source:** IAM governance program, sometimes a compliance-driven project.

## Owning seats

- CISO / VP of security (`ciso`)
- Identity security lead (`identity-security`)
- IGA program owner (`iga-owner`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- C1: Formerly ConductorOne. Public pages describe an identity governance platform for human, non-human, and agent identities, including requests, reviews, and just-in-time grants. Treat detailed breadth as vendor-published until a design review.
- Opal Security: Access governance company. Opal Zero, announced 17 Sep 2026, is described as just-in-time governance for AI agents, with a decision per request and enforcement in an existing MCP gateway. The core Opal platform's human JIT depth is not separately sourced in this seed.
- SailPoint: Long-standing IGA vendor. Buyers will put Identity Security Cloud on a governance shortlist. This seed does not assert non-human or agent parity.
- Saviynt: IGA vendor associated with application access governance. Capability cells in this seed are unknown until a current page is cited.
- One Identity: Identity governance vendor often met in established IAM programs. No capability is checked in this seed.
- Omada: IGA vendor. The public site describes governance for human, machine, and AI agent identities. That sentence is positioning, not a capability check.
- Microsoft: Entra ID is the workforce directory for many accounts. ID Governance, PIM, Workload ID, and Agent ID are separate documented capabilities. Do not treat a single Entra logo as IGA, PAM, NHI, and agent authorization at once. Microsoft documents Purview DSPM for discovering, protecting and investigating sensitive-data risks; some non-Microsoft coverage depends on partner integrations. Vendor-reported DSPM scope reviewed 2026-10-13. Completed the Protect AI acquisition; Guardian model scanning is sold under Prisma AIRS (reviewed 2026-11-09).
- Okta: Workforce identity provider, with a separate customer-identity product in Auth0 and an identity governance offer. This seed does not assert Okta Identity Governance feature parity with C1, Opal, SailPoint, or Entra ID Governance.
- Lumos: Often evaluated for app access reviews and requests. Treat it as an IGA-adjacent candidate, not a proven full lifecycle suite, until sourced.
- Zluri: SaaS access and identity governance candidate. No capability is asserted here.
- Oracle: Identity governance that shows up in Oracle estates. Do not assume it is the enterprise IGA standard outside that estate.
- SAP: Identity access governance associated with SAP landscapes. Adjacent budget unless the customer is standardizing all IGA there.

## Vendors (adjacent)

- Veza
- IBM
- ManageEngine
- Ping Identity
- Varonis
- Token Security
- AppOmni
- Grip Security

## What buyers do instead

- Ticket-based access requests and spreadsheet reviews. Good enough when: Few apps and a light audit scope. Breaks when: Audit findings on reviews, slow joiner/mover/leaver, or SOX scope grows. — hypothesis
- Identity provider lifecycle features. Good enough when: Most apps are SSO-connected and roles are simple. Breaks when: Separation of duties, certifications, and non-SSO apps are in scope. — hypothesis

## Objections

- "Our identity provider covers this." — hypothesis
- "HR data isn't clean enough to drive access." — hypothesis

## Triggers

- Audit finding
- Access review spreadsheets
- Mover and leaver failures
- New SOX or SOX-like scope
- A New York-regulated financial firm prepares its annual NYDFS Part 500 certification.
- An audit flags access reviews, privileged access, or evidence gaps.
- An acquisition brings in new code, cloud accounts, and identities.

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
