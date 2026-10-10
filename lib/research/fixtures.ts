import type { RetrievedDocument } from "./adapters";
import { normalizeMonitoredUrl } from "./normalize";
import type { MonitoredSource, SourcePolicy } from "./schema";

/** Public OWASP project page already cited in the catalog as `src-owasp-nhi`. */
export const OWASP_NHI_URL = normalizeMonitoredUrl(
  "https://owasp.org/www-project-non-human-identities-top-10/2025/top-10-2025/",
);

const baselineText =
  "OWASP project listing NHI risks, including improper offboarding, secret leakage, overprivilege, and long-lived secrets.";

const baselineStatement =
  "The OWASP Non-Human Identities Top 10 project page lists NHI risks such as improper offboarding, secret leakage, overprivilege, and long-lived secrets. This proposal does not add a product capability or a vendor ranking.";

export const owaspMonitoredSource: MonitoredSource = {
  id: "mon-owasp-nhi-2025",
  catalogSourceId: "src-owasp-nhi",
  title: "OWASP Non-Human Identities Top 10, 2025",
  canonicalUrl: OWASP_NHI_URL,
  publisher: "OWASP",
  author: null,
  sourceType: "standard",
  classification: "independent_industry",
  publishedAt: null,
  monitoringFrequency: "quarterly",
  permissionStatus: "public_permitted",
  lastCheckStatus: "never_checked",
  lastCheckedAt: null,
  policyId: "policy-owasp-nhi-2025",
  enabled: true,
};

export const owaspSourcePolicy: SourcePolicy = {
  id: "policy-owasp-nhi-2025",
  monitoredSourceId: owaspMonitoredSource.id,
  classification: "independent_industry",
  permissionStatus: "public_permitted",
  retrievalScope: "excerpt",
  licenseNote:
    "The OWASP project page is public. Phase 1 stores a short excerpt and a pending proposal. It does not copy the page into the catalog.",
  authorizationRef: null,
  updatedAt: "2026-10-09",
};

export const owaspBaselineDocument: RetrievedDocument = {
  url: OWASP_NHI_URL,
  title: owaspMonitoredSource.title,
  publishedAt: null,
  text: baselineText,
  statements: [
    {
      statement: baselineStatement,
      subjectType: "category",
      subjectId: "nhi",
      capabilityId: null,
      polarity: "asserts",
      sourceType: "standard",
      priorClaimId: "claim-owasp-nhi-top10",
    },
  ],
};

export const owaspWhitespaceDocument: RetrievedDocument = {
  ...owaspBaselineDocument,
  text: `${baselineText.replace("OWASP ", "OWASP   ")}\n`,
};

export const owaspChangedDocument: RetrievedDocument = {
  ...owaspBaselineDocument,
  text: `${baselineText} The project page is the public list of risks, not a vendor ranking.`,
  statements: [
    {
      ...owaspBaselineDocument.statements[0],
      statement:
        "The OWASP Non-Human Identities Top 10 project page lists NHI risks such as improper offboarding, secret leakage, overprivilege, and long-lived secrets, and it does not rank vendors. This proposal does not add a product capability.",
    },
  ],
};

/** Analyst landing page. Phase 1 does not retrieve it. */
export const restrictedAnalystSource: MonitoredSource = {
  id: "mon-kc-iga",
  catalogSourceId: "src-kc-iga",
  title: "KuppingerCole Leadership Compass: IGA",
  canonicalUrl: normalizeMonitoredUrl(
    "https://www.kuppingercole.com/research/lc80864/identity-governance-and-administration-iga",
  ),
  publisher: "KuppingerCole",
  author: null,
  sourceType: "analyst",
  classification: "industry_analyst",
  publishedAt: null,
  monitoringFrequency: "quarterly",
  permissionStatus: "restricted",
  lastCheckStatus: "never_checked",
  lastCheckedAt: null,
  policyId: "policy-kc-iga",
  enabled: true,
};

export const restrictedAnalystPolicy: SourcePolicy = {
  id: "policy-kc-iga",
  monitoredSourceId: restrictedAnalystSource.id,
  classification: "industry_analyst",
  permissionStatus: "restricted",
  retrievalScope: "none",
  licenseNote:
    "Analyst research stays restricted in phase 1. The ledger may store the canonical URL and this policy. It does not retrieve the report.",
  authorizationRef: null,
  updatedAt: "2026-10-09",
};
