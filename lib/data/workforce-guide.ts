import type { Product, Vendor, Source } from "../schema";
import type { ProductEvidence } from "./public-monitoring";

export const workforceGuideVendors: Vendor[] = [{
  id: "cisco", slug: "cisco", name: "Cisco", formerNames: [], website: "https://www.cisco.com/",
  positioning: "Cisco provides Duo for workforce authentication, including passwordless sign-in.",
  primaryCategoryIds: ["workforce-identity"], adjacentCategoryIds: [], identityScopes: ["human"],
  verificationStatus: "research_candidate", openQuestions: ["Which applications, devices and recovery paths does the buyer need to support?"],
}];

export const workforceGuideProducts: Product[] = [
  {
    id: "cisco-duo-passwordless", slug: "cisco-duo-passwordless", vendorId: "cisco", name: "Cisco Duo Passwordless",
    positioning: "Passwordless sign-in with supported authenticators and applications.", primaryCategoryIds: ["workforce-identity"], adjacentCategoryIds: [],
    useCaseIds: [], identityScopes: ["human"], deployment: ["unknown"], availability: "unknown",
    availabilityNote: "Confirm purchased edition and required integrations.", officialUrl: "https://duo.com/docs/passwordless",
  },
  {
    id: "google-cloud-pam", slug: "google-cloud-pam", vendorId: "google", name: "Google Cloud Privileged Access Manager",
    positioning: "Time-bound privileged access to Google Cloud resources.", primaryCategoryIds: ["pam"], adjacentCategoryIds: [],
    useCaseIds: [], identityScopes: ["human"], deployment: ["unknown"], availability: "unknown",
    availabilityNote: "Confirm purchased edition and required integrations.", officialUrl: "https://docs.cloud.google.com/iam/docs/pam-overview",
  },
  {
    id: "sailpoint-human-fabric", slug: "sailpoint-human-fabric", vendorId: "sailpoint", name: "SailPoint Human Fabric",
    positioning: "Human identity governance with access certification, reviewer decisions and remediation.", primaryCategoryIds: ["iga"], adjacentCategoryIds: [],
    useCaseIds: [], identityScopes: ["human"], deployment: ["unknown"], availability: "unknown",
    availabilityNote: "Confirm purchased edition and required integrations.", officialUrl: "https://documentation.sailpoint.com/saas/help/certs/index.html",
  },
];

const entries: ProductEvidence[] = [
  {
    key: "okta-provisioning", productId: "okta-workforce", publisher: "Okta", title: "Lifecycle of a provisioned user",
    url: "https://help.okta.com/en-us/Content/topics/provisioning/lcm/lcm-provisioning-workflow.htm", type: "official_docs", section: "User account provisioning through application integrations",
    statement: "Okta describes flowing a person’s profile and assigned access from a connected user store into application integrations to create downstream accounts.",
    caveat: "Confirm provisioning is enabled for each application and check the resulting account in the target.",
  },
  {
    key: "entra-auth-strength", productId: "entra-id", publisher: "Microsoft", title: "Conditional Access authentication strengths",
    url: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths", type: "official_docs", section: "Built-in and custom authentication strengths",
    statement: "Microsoft Entra Conditional Access can require an authentication strength for a resource, including a built-in strength for phishing-resistant MFA.",
    caveat: "Check the methods enrolled, policy scope, exceptions and recovery paths for the population in question.",
  },
  {
    key: "duo-passkeys", productId: "cisco-duo-passwordless", publisher: "Cisco", title: "Duo Passwordless",
    url: "https://duo.com/docs/passwordless", type: "official_docs", section: "Authentication methods and prerequisites",
    statement: "Duo documents phishing-resistant FIDO2 passkeys for passwordless sign-in, including supported platform authenticators and roaming security keys.",
    caveat: "Confirm the application sign-in path, supported devices, fallback methods and Duo configuration.",
  },
  {
    key: "okta-certification", productId: "okta-iga", publisher: "Okta", title: "Review campaigns",
    url: "https://help.okta.com/oie/en-us/Content/Topics/identity-governance/access-certification/iga-ac-review-campaign.htm", type: "official_docs", section: "Reviewer decisions in access certification campaigns",
    statement: "Okta Identity Governance lets reviewers decide whether access should be approved or revoked during an access certification campaign.",
    caveat: "Check how the decision is applied and reconciled at the target for the application and assignment method.",
  },
  {
    key: "sailpoint-campaign", productId: "sailpoint-human-fabric", publisher: "SailPoint", title: "Certifications",
    url: "https://documentation.sailpoint.com/saas/help/certs/index.html", type: "official_docs", section: "Certification campaigns and remediation",
    statement: "SailPoint Human Fabric documents a certification workflow in which reviewers approve or revoke access and sign off, followed by remediation and campaign completion.",
    caveat: "The documentation specifies that some access is governed by the access model and cannot be certified in a campaign.",
  },
  {
    key: "google-privileged-grants", productId: "google-cloud-pam", publisher: "Google Cloud", title: "Privileged Access Manager overview",
    url: "https://docs.cloud.google.com/iam/docs/pam-overview", type: "official_docs", section: "Entitlements and time-bound elevated access",
    statement: "Google Cloud Privileged Access Manager supports temporary elevated access to Google Cloud resources through entitlements and grants, with optional approval.",
    caveat: "Check which resource and roles the grant covers, when it expires, and what other access the requester already has.",
  },
  {
    key: "entra-session-boundary", productId: "entra-id", publisher: "Microsoft", title: "Revoke user access in Microsoft Entra ID",
    url: "https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access", type: "official_docs", section: "Application session tokens",
    statement: "Microsoft documents that an application controls its own session tokens. Entra ID cannot directly revoke a session token issued by the application.",
    caveat: "Inspect the application’s own access and session evidence, especially for unsynchronized applications.",
  },
  {
    key: "okta-logout-scope", productId: "okta-workforce", publisher: "Okta", title: "Universal Logout supported apps and devices",
    url: "https://help.okta.com/oie/en-us/content/topics/itp/universal-logout-supported-apps.htm", type: "official_docs", section: "Supported applications and device coverage",
    statement: "Okta documents specific applications and devices supported by Universal Logout, with different sign-out behavior depending on the integration.",
    caveat: "Confirm support for the actual application and verify session termination there.",
  },
  {
    key: "entra-risk-investigation", productId: "entra-id", publisher: "Microsoft", title: "Investigate risk with Microsoft Entra ID Protection",
    url: "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-investigate-risk", type: "official_docs", section: "Risky users, risky sign-ins and risk detections",
    statement: "Microsoft documents investigating risky users and sign-ins using Entra ID Protection reports and sign-in evidence.",
    caveat: "Check license, data retention, permissions, and whether the sign-in belongs to the same identity and exposure window.",
  },
  {
    key: "github-exposure-response", productId: "github-secret-scanning", publisher: "GitHub", title: "Resolving alerts from secret scanning",
    url: "https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-secret-scanning-alerts/resolving-alerts", type: "official_docs", section: "Assessing exposure and resolving an alert",
    statement: "GitHub recommends revoking or rotating a leaked credential and reviewing its use when resolving a secret scanning alert.",
    caveat: "Changing the alert state does not itself invalidate a third-party credential. The issuer and consuming applications provide that evidence.",
  },
];

export const workforceGuideResearch = { prefix: "workforce", checked: "2026-11-20", entries };

// Issuer documentation is evidence for an illustrative incident, outside the vendor shortlist.
export const issuerReferenceSources: Source[] = [
  {
    id: "src-stripe-key-lifecycle", title: "Stripe API keys", publisher: "Stripe", url: "https://docs.stripe.com/keys",
    canonicalUrl: "https://docs.stripe.com/keys", sourceType: "official_docs", publishedAt: null, retrievedAt: "2026-11-20",
    volatility: "fast", excerpt: "Manage and rotate API keys. Stripe documents expiring and replacing a key, including an overlap period when both values can work.",
  },
  {
    id: "src-stripe-request-logs", title: "Stripe API request logs", publisher: "Stripe", url: "https://docs.stripe.com/development/dashboard/request-logs",
    canonicalUrl: "https://docs.stripe.com/development/dashboard/request-logs", sourceType: "official_docs", publishedAt: null, retrievedAt: "2026-11-20",
    volatility: "fast", excerpt: "Request logs. Stripe records requests to its API and provides request details in its developer tools. Confirm the account, log window and available attribution.",
  },
];
