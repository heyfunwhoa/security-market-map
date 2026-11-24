import { registerProductEvidence } from "./public-monitoring";
import type { PricingSignal, Source } from "../schema";

const checked = "2026-11-23";

export const decisionEvidence = registerProductEvidence({ prefix: "buyer-decision", checked, entries: [
  {
    key: "descope-scim", productId: "descope", publisher: "Descope", type: "official_docs", capabilityId: "cap-ciam",
    title: "SCIM Management", url: "https://docs.descope.com/management/tenant-management/scim", section: "SCIM Session Behavior",
    statement: "Descope applies directory changes at the next login or token refresh. A directory deactivation can leave an existing session active until then.",
    caveat: "Measure the time to loss of access in the application, including any session it issues itself.",
  },
  {
    key: "workos-admin", productId: "workos", publisher: "WorkOS", type: "official_docs", capabilityId: "cap-ciam",
    title: "Admin Portal", url: "https://workos.com/docs/admin-portal", section: "Managing SSO connections",
    statement: "WorkOS lets a customer administrator edit connection metadata and test single sign-on in its Admin Portal.",
    caveat: "Verify who can issue an organization-specific portal link and how an administrator recovers from a configuration error.",
  },
  {
    key: "sentinel-case", productId: "microsoft-sentinel", publisher: "Microsoft", type: "official_docs", capabilityId: "cap-investigation-case",
    title: "Investigate Microsoft Sentinel incidents in depth in the Azure portal", url: "https://learn.microsoft.com/en-us/azure/sentinel/investigate-incidents", section: "Investigate incidents",
    statement: "Microsoft Sentinel groups alerts into an incident and carries the associated entities into the investigation.",
    caveat: "The cited walkthrough uses the Azure portal. Verify the workflow in the portal used by the target SOC.",
  },
] });

const priceUrl = "https://www.descope.com/pricing";
export const descopePriceSource: Source = {
  id: "src-descope-pricing", title: "Descope pricing", url: priceUrl, canonicalUrl: priceUrl, publisher: "Descope",
  sourceType: "vendor_marketing", publishedAt: null, retrievedAt: checked, volatility: "fast",
  excerpt: "The plan comparison lists allowances for active users, tenants and SSO connections. Enterprise pricing is custom.",
};
export const descopePrice: PricingSignal = {
  id: "price-descope-sso", productId: "descope", signalType: "public_list", sourceId: descopePriceSource.id,
  asOf: checked, amountLabel: null, statement: "Descope plans include allowances for monthly active users, active tenants and SSO connections. Enterprise pricing is custom.",
  caveats: "Ask for a quote using the same tenant, connection and user counts as the other proposals.",
};
