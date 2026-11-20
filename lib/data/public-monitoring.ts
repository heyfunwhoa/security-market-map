import type { Claim, Product, Source, Vendor } from "../schema";

// UTC date the cited passages were inspected. This is a vendor-literature review.
export const publicMonitoringChecked = "2026-11-20";

export const flareVendor: Vendor = {
  id: "flare", slug: "flare", name: "Flare", formerNames: [], website: "https://flare.io/",
  positioning: "Flare provides external threat intelligence. Analysts can investigate company code found in public repositories and account credentials reported in breaches.",
  primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"],
  identityScopes: ["human"], verificationStatus: "research_candidate",
  openQuestions: ["Which identifiers link a public repository finding to the company?", "Which types of exposed credentials can the team confirm and route to an owner?"],
};

export const publicMonitoringProducts: Product[] = [
  {
    id: "truffle-security-forager", slug: "truffle-security-forager", vendorId: "truffle-security", name: "Truffle Security Forager",
    positioning: "A company can review verified API keys associated with its email domain that surfaced in public GitHub commits or published npm packages.",
    primaryCategoryIds: ["secrets-detection"], adjacentCategoryIds: ["software-supply-chain"], useCaseIds: ["uc-detect"],
    deployment: ["saas"], identityScopes: ["nhi"], availability: "unknown",
    availabilityNote: "The user guide documents Forager. Historical lookback, notification timing and contract terms remain open questions.",
    officialUrl: "https://trufflesecurity.com/docs/user-enablement-guide",
  },
  {
    id: "flare-cti-platform", slug: "flare-cti-platform", vendorId: "flare", name: "Flare Cyber Threat Intelligence Platform",
    positioning: "An analyst can investigate whether a public repository contains company code or configuration and separately review employee account exposure in breach data.",
    primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["human"], availability: "unknown",
    availabilityNote: "Flare documents these workflows. Dataset entitlements, historical coverage and alert delivery commitments need confirmation.",
    officialUrl: "https://flare.io/cyber-threat-intelligence-platform",
  },
  {
    id: "recorded-future-brand-intelligence", slug: "recorded-future-brand-intelligence", vendorId: "recorded-future", name: "Recorded Future Brand Intelligence",
    positioning: "Analysts receive alerts about exposed company material, including source code or employee credentials, and can initiate takedowns for supported types of brand abuse.",
    primaryCategoryIds: ["threat-intelligence"], adjacentCategoryIds: ["digital-risk-protection"], useCaseIds: [],
    deployment: ["unknown"], identityScopes: ["human"], availability: "unknown",
    availabilityNote: "The vendor describes a commercial module. Confirm contract scope and eligibility for removal with the provider handling the exposure.",
    officialUrl: "https://www.recordedfuture.com/products/brand-intelligence",
  },
];

// Each entry produces a standard source and its scoped product claim. The guide
// reuses these claim IDs so a correction reaches both the comparison and catalog.
type Evidence = {
  key: string;
  productId: string;
  publisher: string;
  title: string;
  url: string;
  type: Source["sourceType"];
  publishedAt?: string;
  author?: string;
  section: string;
  statement: string;
  caveat: string;
  capabilityId?: string;
};

const evidence: Evidence[] = [
  {
    key: "gitguardian-sources", productId: "gitguardian", publisher: "GitGuardian", title: "Monitored public sources",
    url: "https://docs.gitguardian.com/public-monitoring/sources/overview", type: "official_docs", section: "Supported sources",
    statement: "GitGuardian monitors new and historical public GitHub commits. Its historical scans also cover public Gists and, for selected workspaces, public Docker Hub image layers.",
    caveat: "The Gist and Docker Hub entries specify historical coverage only.", capabilityId: "cap-secret-discovery",
  },
  {
    key: "gitguardian-attribution", productId: "gitguardian", publisher: "GitGuardian", title: "Company public perimeter",
    url: "https://docs.gitguardian.com/public-monitoring/perimeter/overview", type: "official_docs", section: "Company public perimeter",
    statement: "GitGuardian uses monitored developers, company GitHub organizations and company-specific terms near a secret to associate public findings with a customer.",
    caveat: "Applicable signals depend on the public source. A developer match still needs review to establish who owns the credential.",
  },
  {
    key: "github-attribution", productId: "github-secret-scanning", publisher: "GitHub", title: "Public monitoring for secret scanning",
    url: "https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/secret-security/public-monitoring", type: "official_docs", section: "How public monitoring works",
    statement: "GitHub looks across public GitHub repositories, Gists, and issue and pull request comments. Enterprise membership or a verified email domain connects a finding to the enterprise. With data residency, attribution uses verified domains.",
    caveat: "GitHub lists credential status only for supported secret types.", capabilityId: "cap-secret-discovery",
  },
  {
    key: "github-availability", productId: "github-secret-scanning", publisher: "GitHub", title: "Public monitoring for enterprises generally available",
    url: "https://github.blog/changelog/2026-10-28-public-monitoring-for-enterprises-generally-available/", type: "official_docs", publishedAt: "2026-10-28", section: "Release announcement and eligibility",
    statement: "GitHub announced general availability on October 28, 2026 and says public monitoring is included with GitHub Secret Protection at no additional charge.",
    caveat: "The linked product documentation specifies GitHub Enterprise Cloud with Secret Protection or GitHub Advanced Security enabled.",
  },
  {
    key: "forager-sources", productId: "truffle-security-forager", publisher: "Truffle Security", title: "User enablement guide",
    url: "https://trufflesecurity.com/docs/user-enablement-guide", type: "official_docs", section: "Forager",
    statement: "Forager monitors public GitHub commits and npm package releases for exposed secrets. Its company view presents verified keys associated with an email domain.",
    caveat: "The guide gives no historical lookback or notification-time commitment.", capabilityId: "cap-secret-discovery",
  },
  {
    key: "forager-verification", productId: "truffle-security-forager", publisher: "Truffle Security", title: "Introducing Forager",
    url: "https://trufflesecurity.com/blog/introducing-forager", type: "vendor_marketing", publishedAt: "2023-07-17", author: "Hon Kwok", section: "Introducing Forager and Secret Sources",
    statement: "Truffle Security describes verifying live API keys with TruffleHog and making exposure details available to the associated company.",
    caveat: "The launch article describes the validation workflow. Detector-by-detector coverage and detection rates remain untested here.", capabilityId: "cap-secret-verification",
  },
  {
    key: "flare-platform", productId: "flare-cti-platform", publisher: "Flare", title: "Cyber Threat Intelligence Platform",
    url: "https://flare.io/cyber-threat-intelligence-platform", type: "vendor_marketing", section: "An Identity-First Cyber Threat Intelligence Platform",
    statement: "Flare positions its platform for security teams investigating external threats and identity exposure.",
    caveat: "The platform description leaves dataset entitlements and detection performance unspecified.",
  },
  {
    key: "flare-repositories", productId: "flare-cti-platform", publisher: "Flare", title: "Queries for public repository leaks",
    url: "https://docs.flare.io/queries", type: "official_docs", section: "Identifying data leaks in public repositories",
    statement: "Flare documents investigating potential code or configuration leaks on public GitHub using organization-specific project names or code fragments.",
    caveat: "A matching project name is a lead. Credential ownership and live key validation are unspecified in this workflow.",
  },
  {
    key: "flare-breaches", productId: "flare-cti-platform", publisher: "Flare", title: "Breaches",
    url: "https://docs.flare.io/breaches", type: "official_docs", section: "The Breaches Directory",
    statement: "Flare also provides a directory of breach incidents. Where a breach includes credentials, analysts can review account data that matches the customer’s identifiers.",
    caveat: "A breach record and a key found in a public repository are distinct kinds of evidence.",
  },
  {
    key: "recorded-future-sources", productId: "recorded-future-brand-intelligence", publisher: "Recorded Future", title: "Brand Intelligence datasheet",
    url: "https://assets.recordedfuture.com/Datasheets/brand-intelligence-module.pdf", type: "vendor_marketing", section: "Page 2, Data and credential leak monitoring",
    statement: "Recorded Future describes monitoring code repositories, paste sites and dark web forums for exposed company data, including proprietary code and employee credentials.",
    caveat: "The datasheet leaves per-source lookback, machine-credential ownership and API-key validity unspecified.",
  },
  {
    key: "recorded-future-response", productId: "recorded-future-brand-intelligence", publisher: "Recorded Future", title: "Brand Intelligence product overview",
    url: "https://www.recordedfuture.com/products/brand-intelligence", type: "vendor_marketing", section: "Brand Intelligence overview and takedowns",
    statement: "Recorded Future describes alerts for code and credential leaks and a takedown workflow for brand abuse such as typosquat domains.",
    caveat: "The product page gives no commitment to remove leaked code from any particular repository or to revoke an exposed key.",
  },
];

export const publicMonitoringSources: Source[] = evidence.map((row) => ({
  id: "src-public-" + row.key, title: row.title, publisher: row.publisher, author: row.author,
  url: row.url, canonicalUrl: row.url, sourceType: row.type, publishedAt: row.publishedAt ?? null,
  retrievedAt: publicMonitoringChecked, volatility: "fast", excerpt: row.section + ". " + row.statement,
}));

export const publicMonitoringClaims: Claim[] = evidence.map((row) => ({
  id: "claim-public-" + row.key, subjectType: "product", subjectId: row.productId,
  capabilityId: row.capabilityId ?? null, polarity: "asserts", statement: row.statement,
  sourceId: "src-public-" + row.key, sourceUrl: row.url, sourceType: row.type, publishedAt: row.publishedAt ?? null,
  observedAt: publicMonitoringChecked, lastCheckedAt: publicMonitoringChecked, effectiveFrom: null, effectiveTo: null,
  confidence: "medium", verificationStatus: "vendor_published", conflictsWith: [], notes: row.caveat,
}));
