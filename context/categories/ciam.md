---
id: "ciam"
type: "category"
name: "Customer identity (CIAM)"
layer: "core"
vendors: 8
---

# Customer identity (CIAM)

Authentication and account experience for customers, partners, or developers using your product. This is a different buyer and budget from workforce IGA.

**Buyer question:** How do customers or developers sign up, sign in, and consent without becoming an employee identity?

**Usual owner:** Product, developer-experience, or a dedicated CIAM owner.

**Budget source:** Product engineering or digital, not the IGA program.

## Owning seats

- Identity security lead (`identity-security`)

## Who vendors sell to

- None recorded.

## Vendors (primary)

- Ping Identity: Workforce and customer identity vendor. Not assumed to be an IGA or NHI governance suite in this seed.
- WorkOS: Developer-facing customer identity and enterprise features for a product. A different budget from workforce IGA.
- Descope: Customer and developer authentication. SACR's March 2026 runtime note also discusses an agent identity hub. That is not checked here, and it is not an IGA suite.
- Stytch: Customer authentication APIs. Adjacent budget to workforce identity.
- Frontegg: Customer identity features aimed at B2B product teams.

## Vendors (adjacent)

- Okta
- SlashID
- AuthZed

## What buyers do instead

- Homegrown login and user store. Good enough when: An early product with one sign-in flow and a small user base. Breaks when: Social login, B2B tenants, MFA, fraud, or regional data rules pile onto the team. — hypothesis
- Open-source auth library or self-hosted identity server. Good enough when: A strong platform team that wants control and can run it. Breaks when: Uptime, upgrades, and compliance evidence for the identity service become a full-time job. — hypothesis

## Objections

_None recorded._

## Triggers

- New customer-facing product
- Auth0 or homegrown auth replacement
- Partner portal

_Vendor positioning is vendor-reported unless a claim says otherwise. A shared category is not proof of direct competition._
