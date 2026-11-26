import type { Relationship } from "../schema";
import type { ProductEvidence } from "./public-monitoring";

const comparisons = [
  {
    productId: "auth0",
    publisher: "Auth0",
    title: "Enable Organization Connections",
    url: "https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections",
    section: "Enable Organization Connections",
    statement: "Auth0 lets an application enable a different set of enterprise, social, or database connections for each customer organization. Each connection must already exist in the Auth0 tenant.",
    caveat: "Confirm which plan includes Organizations and who can administer each connection.",
    rationale: "Compare how an app gives each business customer its own login options. With Auth0, the app team chooses which existing connections each organization can use.",
  },
  {
    productId: "workos",
    publisher: "WorkOS",
    title: "Single Sign-On",
    url: "https://workos.com/docs/sso",
    section: "Choose your integration approach",
    statement: "WorkOS offers SSO as a standalone API for an existing authentication stack and as part of its AuthKit platform. It supports enterprise identity providers using SAML or OIDC.",
    caveat: "Choose the integration path before estimating migration work.",
    rationale: "If a customer requires SSO and the product team wants to keep its current login and sessions, compare the standalone integration paths in WorkOS and Descope.",
  },
  {
    productId: "frontegg",
    publisher: "Frontegg",
    title: "Single sign-on overview",
    url: "https://developers.frontegg.com/ciam/guides/authentication/sso/management/sso-overview",
    section: "Tenants configure SSO for their own organization",
    statement: "After the app team enables SSO, Frontegg lets each tenant set its identity provider, domains and attribute mapping in a self-service admin portal.",
    caveat: "Test the onboarding flow with a customer's administrator and an identity provider used in production.",
    rationale: "Compare how much an enterprise customer's IT administrator can do on their own. Frontegg documents self-service configuration down to domains and attribute mapping.",
  },
  {
    productId: "stytch",
    publisher: "Stytch",
    title: "Improved SSO Connections",
    url: "https://changelog.stytch.com/announcements/2024-10-25-improved-sso-connections",
    section: "External SSO Connections",
    statement: "Stytch describes sharing one SAML or OIDC connection across multiple customer organizations that use the same identity provider.",
    caveat: "Check the desired organization boundaries, role mapping and current entitlement.",
    rationale: "For a customer with several business units on one identity provider, compare how each product routes sign-in and keeps memberships separate. Stytch documents sharing a single SSO connection.",
    publishedAt: "2024-10-25",
  },
  {
    productId: "clerk",
    publisher: "Clerk",
    title: "Set up Enterprise SSO for Organizations",
    url: "https://clerk.com/docs/guides/organizations/add-members/sso",
    section: "Add members to an Organization via Enterprise SSO",
    statement: "Clerk can connect an organization to a SAML or OIDC identity provider. On first sign-in it can create the membership and assign a default role. Administrators can disable this automatic enrollment.",
    caveat: "Verify which role new members receive and what happens when a user already belongs to another organization.",
    rationale: "When first sign-in should also create membership, compare enrollment and default roles. Clerk lets the team choose between automatic enrollment and provisioning members beforehand.",
  },
  {
    productId: "amazon-cognito",
    publisher: "Amazon Web Services",
    title: "App-client multi-tenancy best practices",
    url: "https://docs.aws.amazon.com/cognito/latest/developerguide/application-client-based-multi-tenancy.html",
    section: "App-client multi-tenancy and when to implement it",
    statement: "Amazon Cognito supports a shared user pool with a separate app client for each tenant. The app client can select that tenant's identity provider while some settings, including password policy, apply across the user pool.",
    caveat: "AWS flags hosted sign-in cookie behavior as an isolation consideration for this design. Validate tenant isolation against the application's requirements.",
    rationale: "For an AWS-based app, compare a managed CIAM platform with the engineering work of configuring Cognito app clients, identity providers and tenant isolation in a shared user pool.",
  },
];

const prefix = "ciam-sso";
const entries: ProductEvidence[] = comparisons.map((row) => ({
  ...row,
  key: row.productId,
  capabilityId: "cap-ciam",
  type: "official_docs",
}));

export const ciamSsoResearch = { prefix, checked: "2026-11-23", entries };

export const ciamSsoRelationships: Relationship[] = comparisons.map((row) => ({
  id: `rel-descope-${row.productId}-ciam`,
  fromProductId: "descope",
  toProductId: row.productId,
  type: "direct_competitor",
  useCaseId: "uc-ciam",
  rationale: row.rationale,
  sourceId: `src-${prefix}-${row.productId}`,
}));
