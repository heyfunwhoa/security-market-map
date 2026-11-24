import type { CatalogEvent, CustomerStory, PricingSignal, Source } from "../schema";
import { registerProductEvidence, type ProductEvidence } from "./public-monitoring";

type Citation = { title: string; url: string; publishedAt?: string };
export type MarketProfile = {
  vendorId: string;
  publisher: string;
  buyer: string;
  action: string;
  control: string;
  evidence: string;
  limitation: string;
  questions: string[];
  owner: Citation & { publisher: string; statement: string; acquisition?: boolean };
  workflow: Citation & { section: string; statement: string; caveat: string };
  pricing: { url: string; section: string; statement: string; caveat: string };
  customer: Citation & { summary: string };
};

export const ciamProfiles = {
  "auth0": {
    vendorId: "okta",
    publisher: "Auth0",
    buyer: "A product identity team consolidating login across customer portals. The customer’s IT team manages its identity provider, and the application team owns the boundary between customer accounts.",
    action: "A customer opens its portal. The app starts login in the context of that customer’s Auth0 Organization.",
    control: "Auth0 uses a connection enabled for that organization. Its token can carry the organization ID back to the application.",
    evidence: "In a pilot, compare the organization ID in the token with the account requested by the user. Record the API decision for both a matching and a mismatching account.",
    limitation: "A valid token from the correct Auth0 tenant can still identify the wrong customer organization. The application must enforce its own data boundary.",
    questions: [
      "Can one person belong to two customer organizations and see only the resources of the organization they selected?",
      "Which enterprise connections, Organizations limits and administrator workflows are included at our projected user count?"
    ],
    owner: {
      statement: "Auth0 is part of Okta. Okta announced completion of the acquisition on May 3, 2021.",
      title: "Okta completes its acquisition of Auth0",
      publisher: "Okta",
      url: "https://www.okta.com/blog/company-and-culture/its-official-okta-joins-forces-with-auth0/",
      publishedAt: "2021-05-03",
      acquisition: true
    },
    workflow: {
      title: "Work with Tokens and Organizations",
      url: "https://auth0.com/docs/manage-users/organizations/using-tokens",
      section: "Validate tokens",
      statement: "Auth0 directs an API receiving an organization ID to check that it identifies an expected customer and to restrict access to that organization’s resources.",
      caveat: "Check the app’s own data authorization for requests with a valid token from a different organization."
    },
    pricing: {
      url: "https://auth0.com/pricing",
      section: "B2B plans and monthly active users",
      statement: "Auth0 publishes B2B plans based on monthly active users. Enterprise connection and organization allowances vary by plan.",
      caveat: "Size both monthly users and enterprise connections. Obtain a quote for the required allowances."
    },
    customer: {
      title: "Rohde & Schwarz simplifies access to customer portals",
      url: "https://auth0.com/case-studies/rohde-schwarz",
      summary: "Auth0 describes how Rohde & Schwarz consolidated customer portal identity and collected more profile information after registration, reducing what users had to enter up front."
    }
  },
  "workos": {
    vendorId: "workos",
    publisher: "WorkOS",
    buyer: "A SaaS team whose enterprise customers require federation and employee provisioning. The customer’s IT admin connects the directory. The SaaS team decides how directory changes affect its own application.",
    action: "An enterprise customer connects its identity provider for sign-in and can separately connect a directory to synchronize users and groups.",
    control: "WorkOS handles the federation integration. With Directory Sync, it sends lifecycle events that the application can use to update its membership records.",
    evidence: "Remove a test user from the customer directory. Trace the event to the local membership change, then check access in an existing application session.",
    limitation: "Receiving a directory event leaves the application responsible for acting on it. Existing session behavior depends on the chosen authentication integration.",
    questions: [
      "Can we keep our current login and session store for customers who use the standalone SSO integration?",
      "After a customer removes a user, when do our application’s permissions and existing sessions reflect the change?"
    ],
    owner: {
      statement: "WorkOS, Inc. is the service provider named in the WorkOS terms.",
      title: "WorkOS Terms of Service",
      publisher: "WorkOS",
      url: "https://workos.com/legal/terms-of-service"
    },
    workflow: {
      title: "Understanding the Events Lifecycle",
      url: "https://workos.com/docs/directory-sync/understanding-events",
      section: "Directory user and group deletion",
      statement: "WorkOS Directory Sync emits deletion events. Its guide describes how an application can process these events to remove or deactivate local directory records.",
      caveat: "A delivered event alone does not establish that the application revoked access or an existing session."
    },
    pricing: {
      url: "https://workos.com/pricing",
      section: "Enterprise SSO and Directory Sync connections",
      statement: "WorkOS prices enterprise SSO and Directory Sync by customer connection. The number of end users behind a connection does not set its price.",
      caveat: "Model SSO and Directory Sync separately and confirm volume pricing and the modules in the proposal."
    },
    customer: {
      title: "Prefect makes enterprise onboarding self-service",
      url: "https://workos.com/customers/prefect",
      summary: "WorkOS reports that Prefect replaced engineer-assisted setup with a link to its Admin Portal, where enterprise customers configure their connection themselves."
    }
  },
  "frontegg": {
    vendorId: "frontegg",
    publisher: "Frontegg",
    buyer: "A B2B product team that spends engineering or support time setting up SSO for each customer. Enterprise IT admins need to manage their own tenant without changing another customer’s setup.",
    action: "The product team enables SSO. A customer administrator configures its identity provider, domains and attribute mapping in the tenant portal.",
    control: "The customer signs in through its configured provider. On supported mobile SDKs a user who belongs to multiple accounts can switch the active account.",
    evidence: "Have a customer admin configure a test tenant. With a second tenant on the same app, confirm which account is active after switching and which records the app displays.",
    limitation: "Self-service identity configuration does not establish how the application enforces tenant data access. Verify the client platform and commercial plan in your deployment.",
    questions: [
      "Can a customer admin complete setup, test a new mapping and recover from an incorrect one without a support ticket?",
      "When a user changes accounts on mobile, do the visible data and allowed actions change together?"
    ],
    owner: {
      statement: "Frontegg Ltd. identifies itself as the company behind the service in its privacy policy.",
      title: "Frontegg privacy policy",
      publisher: "Frontegg",
      url: "https://frontegg.com/privacy-policy",
      publishedAt: "2025-09-10"
    },
    workflow: {
      title: "Mobile SDKs overview",
      url: "https://developers.frontegg.com/ciam/sdks/mobile/overview",
      section: "Switch tenant",
      statement: "Frontegg documents active-account switching across its mobile SDKs so a user can change the tenant context in an application.",
      caveat: "This SDK behavior does not establish the application’s server-side data isolation."
    },
    pricing: {
      url: "https://frontegg.com/pricing",
      section: "How are SSO and SCIM connections counted?",
      statement: "Frontegg’s pay-as-you-go model counts monthly active users and enterprise connections. A customer with both SSO and SCIM uses two connections.",
      caveat: "Estimate how many customers need both services and confirm any enterprise tier requirements."
    },
    customer: {
      title: "Cynerio delegates SSO setup to customer administrators",
      url: "https://frontegg.com/resources/cynerio-case-study",
      summary: "Frontegg reports that Cynerio adopted tenant-level self-service SSO so its customers could configure sign-in without relying on Cynerio’s support or development teams."
    }
  },
  "stytch": {
    vendorId: "stytch",
    publisher: "Stytch",
    buyer: "A B2B software team moving from single-account login to multiple workspaces per person. The application owner needs explicit membership boundaries even when several business units share one identity provider.",
    action: "A returning user authenticates before choosing an organization. Discovery shows the organizations available to that user.",
    control: "The user selects an organization. Stytch also documents a session exchange for switching organizations and a shared SSO connection for related organizations.",
    evidence: "Use one account with two memberships and one without a second membership. Check the organization offered at sign-in and the scope after switching.",
    limitation: "Sharing one SSO connection does not establish that business units share membership or roles. Confirm discovery policies, provisioning and entitlements for the proposed design.",
    questions: [
      "Which organizations does discovery offer to an existing member versus a new user with the same email domain?",
      "Can two business units share their identity provider while assigning different memberships and roles?"
    ],
    owner: {
      statement: "Twilio completed its acquisition of Stytch on November 14, 2025. Stytch remains the product brand in the cited developer materials.",
      title: "Twilio completes its acquisition of Stytch",
      publisher: "Twilio",
      url: "https://www.twilio.com/en-us/blog/company/news/twilio-to-acquire-stytch",
      publishedAt: "2025-11-14",
      acquisition: true
    },
    workflow: {
      title: "B2B discovery and session exchange",
      url: "https://changelog.stytch.com/announcements/2023-04-14-release-new-b2b-auth-products-and-features",
      section: "Discovery auth flow and Session exchange",
      statement: "Stytch documents discovery of a user’s organizations after authentication and a session exchange that lets a signed-in user switch organizations.",
      caveat: "Check current organization discovery and account creation policies before enabling a self-service onboarding flow.",
      publishedAt: "2023-04-14"
    },
    pricing: {
      url: "https://stytch.com/pricing",
      section: "Authentication pricing calculator",
      statement: "Stytch’s public pricing calculator takes monthly active users, SSO connections and SCIM connections as separate inputs.",
      caveat: "Confirm included allowances and the treatment of connections shared across multiple organizations."
    },
    customer: {
      title: "Clearbit opens a self-service onboarding path",
      url: "https://stytch.com/customer-stories/clearbit",
      summary: "Stytch reports that Clearbit used organization creation and discovery to add self-service sign-up while continuing to serve customers with multi-organization permissions."
    }
  },
  "clerk": {
    vendorId: "clerk",
    publisher: "Clerk",
    buyer: "A product team launching B2B workspaces with shared membership and roles. Customer administrators manage their members, while application developers enforce the active organization on requests.",
    action: "A customer connects its identity provider. The application can enroll a user in the organization and assign a default role at first enterprise sign-in.",
    control: "A member selects the active organization in a browser tab. Clerk documents that two tabs can have different active organizations even though they share a session cookie.",
    evidence: "Open two workspaces in different tabs. Check the organization attached to a background request and the permissions used by the receiving endpoint.",
    limitation: "Background requests that rely on the shared cookie can pick up another tab’s active organization. Validate the client token strategy and server-side checks for the framework being used.",
    questions: [
      "What role does a first-time SSO user receive, and which actions should that role allow?",
      "When one person has two workspaces open, can a background request update a record in the wrong workspace?"
    ],
    owner: {
      statement: "Clerk, Inc. is the provider named in Clerk’s standard terms.",
      title: "Clerk Standard Terms and Conditions",
      publisher: "Clerk",
      url: "https://clerk.com/legal/standard-terms",
      publishedAt: "2026-10-01"
    },
    workflow: {
      title: "Organizations overview",
      url: "https://clerk.com/docs/guides/organizations/overview",
      section: "How active organizations work in multiple browser tabs",
      statement: "Clerk tracks the active organization per tab. Its documentation explains that a shared session cookie can reflect a different active tab when an app sends a background request.",
      caveat: "Test the SDK’s recommended token handling in the application’s actual browser and backend flow."
    },
    pricing: {
      url: "https://clerk.com/pricing",
      section: "Retained users, organizations and self-serve SSO",
      statement: "Clerk distinguishes monthly retained users and qualifying retained organizations. Production enterprise SSO has its own connection allowance and additional-connection pricing.",
      caveat: "Count returning users and qualifying organizations, then price production SSO connections for the proposed plan."
    },
    customer: {
      title: "OpusFlow adopts Clerk for application authentication",
      url: "https://clerk.com/blog/opusflow",
      summary: "Clerk’s customer interview describes how OpusFlow evaluated custom authentication and adopted Clerk for its ERP application, including multifactor authentication. The story concerns the sign-in implementation.",
      publishedAt: "2023-05-15"
    }
  },
  "amazon-cognito": {
    vendorId: "amazon-web-services",
    publisher: "Amazon Web Services",
    buyer: "An AWS platform or application team willing to own its tenant architecture. Customer IT owns its identity provider, and the application team owns token validation, tenant routing and data authorization.",
    action: "A customer signs in through the app client configured for its identity provider. The user pool issues a token for the application.",
    control: "The receiving service validates the signed token, issuer and intended client or audience. The application maps the accepted identity to the requested tenant.",
    evidence: "Present a token issued for a different test app client and observe the API decision. Check which controls are configured per client and which are shared across the pool.",
    limitation: "A shared user pool also shares settings such as the password policy. App clients and a valid token alone do not establish tenant isolation across the application.",
    questions: [
      "Which customers require their own user pool because their policy or isolation requirements differ?",
      "Can the API reject a token from the wrong app client, and how does it decide which tenant’s data to return?"
    ],
    owner: {
      statement: "Amazon Web Services provides Cognito. User pools handle application sign-in, and identity pools can supply temporary AWS credentials.",
      title: "What is Amazon Cognito?",
      publisher: "Amazon Web Services",
      url: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html"
    },
    workflow: {
      title: "Verifying JSON web tokens",
      url: "https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html",
      section: "Verify the signature and claims",
      statement: "AWS documents signature, issuer, expiry and client checks for user pool tokens. An ID token and an access token use different claims to identify the intended app client.",
      caveat: "Check the token type, audience and resource binding for the application’s API."
    },
    pricing: {
      url: "https://aws.amazon.com/cognito/pricing/",
      section: "User pools and federation pricing",
      statement: "Amazon Cognito user pools bill by monthly active users. The pricing page distinguishes direct and social sign-in from users federated through a SAML or OIDC enterprise provider.",
      caveat: "Model the mix of sign-in methods, selected feature tier and region. Check separate charges for adjacent services."
    },
    customer: {
      title: "Wiz migrates enterprise customer sign-in to Cognito",
      url: "https://aws.amazon.com/solutions/case-studies/wiz-amazon-cognito-case-study/",
      summary: "AWS reports that Wiz built a migration portal around Cognito. Tenant administrators used it to configure and test SSO, move users and verify identities before retiring the old setup."
    }
  },
} satisfies Record<string, MarketProfile>;

export type CiamProductSlug = keyof typeof ciamProfiles;

export function isCiamProduct(slug: string): slug is CiamProductSlug {
  return Object.hasOwn(ciamProfiles, slug);
}

export const CIAM_PROFILE_CHECKED = "2026-11-23";
const workflowEntries: ProductEvidence[] = [];
export const ciamProfileSources: Source[] = [];
export const ciamPricing: PricingSignal[] = [];
export const ciamStories: CustomerStory[] = [];
export const ciamEvents: CatalogEvent[] = [];

for (const [productId, profile] of Object.entries<MarketProfile>(ciamProfiles)) {
  const { vendorId, publisher, workflow, owner, pricing, customer } = profile;
  workflowEntries.push({
    ...workflow, productId, key: productId, publisher, type: "official_docs", capabilityId: "cap-ciam",
  });

  const ownerId = `src-ciam-owner-${productId}`;
  const priceId = `src-ciam-pricing-${productId}`;
  const storyId = `src-ciam-customer-${productId}`;
  ciamProfileSources.push(
    {
      id: ownerId, title: owner.title, publisher: owner.publisher,
      url: owner.url, canonicalUrl: owner.url, sourceType: owner.acquisition ? "press_release" : "official_docs",
      publishedAt: owner.publishedAt ?? null, retrievedAt: CIAM_PROFILE_CHECKED,
      volatility: "moderate", excerpt: owner.statement,
    },
    {
      id: priceId, title: `${publisher} pricing · ${pricing.section}`, publisher,
      url: pricing.url, canonicalUrl: pricing.url, sourceType: "vendor_marketing",
      publishedAt: null, retrievedAt: CIAM_PROFILE_CHECKED, volatility: "fast", excerpt: pricing.statement,
    },
    {
      id: storyId, title: customer.title, publisher,
      url: customer.url, canonicalUrl: customer.url, sourceType: "customer_story",
      publishedAt: customer.publishedAt ?? null, retrievedAt: CIAM_PROFILE_CHECKED,
      volatility: "moderate", excerpt: customer.summary,
    },
  );
  ciamPricing.push({
    id: `price-ciam-${productId}`, productId, signalType: "public_list",
    statement: pricing.statement, amountLabel: null, asOf: CIAM_PROFILE_CHECKED,
    sourceId: priceId, caveats: pricing.caveat,
  });
  ciamStories.push({
    id: `story-ciam-${productId}`, vendorId, title: customer.title,
    summary: customer.summary, sourceId: storyId, proofType: "vendor_published",
  });
  if (owner.acquisition) {
    ciamEvents.push({
      id: `event-ciam-${productId}-acquisition`, vendorId, date: owner.publishedAt ?? null,
      kind: "acquisition", title: owner.title, summary: owner.statement, sourceId: ownerId,
    });
  }
}

export const ciamWorkflowEvidence = registerProductEvidence({
  prefix: "ciam-workflow", checked: CIAM_PROFILE_CHECKED, entries: workflowEntries,
});
