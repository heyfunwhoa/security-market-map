---
id: "workforce-identity"
type: "category"
name: "Workforce identity"
layer: "core"
vendors: 15
---

# Workforce identity

The directory, identity provider, single sign-on, MFA or passwordless, and provisioning path employees and contractors use to get into company systems.

**Buyer question:** How does a person prove who they are, and how does that account get created and removed?

**Usual owner:** Identity architect or workforce IAM owner, often with IT operations.

**Budget source:** Workforce IAM or IT infrastructure, sometimes bundled with a Microsoft or Okta agreement.

## Owning seats

- Security architect (`security-architect`)
- Identity security lead (`identity-security`)
- IGA program owner (`iga-owner`)
- SaaS security (`saas-security`)

## Vendors (primary)

- Microsoft: Entra ID is the workforce directory for many accounts. ID Governance, PIM, Workload ID, and Agent ID are separate documented capabilities. Do not treat a single Entra logo as IGA, PAM, NHI, and agent authorization at once. Microsoft documents Purview DSPM for discovering, protecting and investigating sensitive-data risks; some non-Microsoft coverage depends on partner integrations. Vendor-reported DSPM scope reviewed 2026-10-13. Completed the Protect AI acquisition; Guardian model scanning is sold under Prisma AIRS (reviewed 2026-11-09).
- Okta: Workforce identity provider, with a separate customer-identity product in Auth0 and an identity governance offer. This seed does not assert Okta Identity Governance feature parity with C1, Opal, SailPoint, or Entra ID Governance.
- IBM: IBM Verify is a workforce identity stack. IBM closed the HashiCorp acquisition in February 2025. Keep Vault as a separate product and a separate evaluation from Verify.
- ManageEngine: Mid-market Active Directory administration and privileged access products. Confirm which SKU is installed before comparing it to an enterprise IGA suite.
- Ping Identity: Workforce and customer identity vendor. Not assumed to be an IGA or NHI governance suite in this seed.

## Vendors (adjacent)

- One Identity
- Lumos
- Oracle
- WorkOS
- CrowdStrike
- Silverfort
- Semperis
- Zscaler
- Island
- Strata Identity

## What buyers do instead

- Directory plus per-app local accounts. Good enough when: A handful of SaaS apps and one office directory. Breaks when: Dozens of apps, contractors, and MFA or offboarding gaps an auditor or insurer asks about. — hypothesis
- Identity features bundled in the productivity suite. Good enough when: Most apps already sign in through the suite and policies are simple. Breaks when: Conditional access, non-suite apps, or lifecycle automation become requirements. — hypothesis

## Objections

- "HR data isn't clean enough to drive access." — hypothesis

## Triggers

- IdP consolidation
- MFA or phishing-resistant rollout
- HR-to-directory provisioning gaps

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
