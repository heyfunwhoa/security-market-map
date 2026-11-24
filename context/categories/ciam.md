---
id: "ciam"
type: "category"
name: "Customer identity (CIAM)"
layer: "core"
vendors: 10
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
- WorkOS: WorkOS helps application teams offer enterprise sign-in and keep user and group memberships in sync with a customer’s directory.
- Clerk: Clerk helps application teams manage customer sign-in and membership in business customer organizations.
- Descope: Descope helps product and engineering teams manage how customers and partners sign in to their applications. Its Agentic Identity Hub also lets a customer's identity provider govern which agents can access an application on a user's behalf.
- Stytch: Stytch, acquired by Twilio in November 2025, provides authentication for customer applications. Its B2B offering organizes users into customer workspaces.
- Frontegg: Frontegg gives B2B software teams a customer identity service with a portal where tenant administrators can manage their own SSO setup.

## Vendors (adjacent)

- Okta
- Amazon Web Services
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
