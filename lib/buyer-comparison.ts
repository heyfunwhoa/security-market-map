import type { Catalog } from "./catalog";
import { ENTERPRISE_SSO_PRESET } from "./comparison-selection";
import { compareProducts } from "./compare";
import { secopsJourneys } from "./data/secops-use-cases";
import { shortlistUrl } from "./landscape-shortlist";
import { SITE_URL } from "./site";

export const ssoExample = {
  id: ENTERPRISE_SSO_PRESET.useCaseId, productIds: ENTERPRISE_SSO_PRESET.productIds,
  label: "Compare enterprise SSO for an existing login",
  question: "After a customer removes a user, who ends access in the application and how long does it take?",
  pilot: "Connect one test tenant to the existing login. Ask its IT admin to configure SSO, remove a test user from the directory and measure when an active app session loses access.",
};

export const ssoCriteria = [
  { title: "Can we keep our existing login?", ids: ["claim-descope-tenant-sso", "claim-ciam-sso-workos"], ask: "Trace one enterprise sign-in and one existing customer sign-in. Identify which system issues each application session." },
  { title: "What can the customer’s IT admin set up?", ids: ["claim-descope-tenant-sso", "claim-buyer-decision-workos-admin"], ask: "Have the customer admin configure and test a connection. Record where your engineer has to step in." },
  { title: "When does a removed user lose access?", ids: ["claim-buyer-decision-descope-scim", "claim-ciam-workflow-workos"], ask: "Time an already-open session and a fresh sign-in separately, then identify which team owns any delay." },
];

type Finding = { id: string; productId: string; product: string; statement: string; caveat: string; label: string; url: string; checked: string; attribution: string };
export function buyerComparison(catalog: Catalog, useCaseId: string, productIds: string[]) {
  const use = catalog.useCases.find((item) => item.id === useCaseId);
  if (!use || productIds.length < 2) return null;
  const products = productIds.map((id) => catalog.products.find((item) => item.id === id)!);
  const rows = compareProducts({ productIds, capabilityIds: use.capabilityIds, claims: catalog.claims, sources: catalog.sources, asOf: catalog.asOf });
  const findings = new Map<string, Finding>();
  for (const { cells } of rows) {
    for (const product of products) {
      const cell = cells[product.id];
      if (cell.status !== "evidenced") continue;
      for (const claim of cell.claims) {
        if (claim.polarity !== "asserts" || !["verified", "vendor_published"].includes(claim.verificationStatus)) continue;
        const source = catalog.sources.find((item) => item.id === claim.sourceId);
        if (!source) continue;
        findings.set(claim.id, { id: claim.id, productId: product.id, product: product.name, statement: claim.statement, caveat: claim.notes ?? "",
          label: source.title, url: source.canonicalUrl, checked: claim.lastCheckedAt,
          attribution: claim.verificationStatus === "vendor_published" ? "Vendor-published" : "Verified in the map" });
      }
    }
  }
  const hasSso = use.id === ssoExample.id && products.some((p) => ssoExample.productIds.includes(p.id));
  const prices: Finding[] = [];
  if (hasSso) {
    for (const price of catalog.pricing.filter((item) => productIds.includes(item.productId) && (item.id.startsWith("price-ciam-") || item.id === "price-descope-sso"))) {
      const source = catalog.sources.find((item) => item.id === price.sourceId);
      if (!source) continue;
      const finding = { id: price.id, productId: price.productId, product: products.find((p) => p.id === price.productId)!.name,
        statement: price.statement, caveat: price.caveats, label: source.title, url: source.canonicalUrl, checked: price.asOf, attribution: "Published pricing" };
      findings.set(price.id, finding);
      prices.push(finding);
    }
  }
  const preferredIds = hasSso ? ssoCriteria[0].ids : [];
  const options = [...findings.values()];
  const preferred = products.flatMap((product) => {
    const option = options.find((x) => x.productId === product.id && preferredIds.includes(x.id)) ?? options.find((x) => x.productId === product.id);
    return option ? [option.id] : [];
  });
  const journey = secopsJourneys.find((item) => item.id === use.id);
  return {
    use, products, findings, prices, hasSso, defaults: [...new Set([...preferred, ...findings.keys()])].slice(0, 2),
    question: hasSso ? ssoExample.question : use.discoveryQuestions[0],
    pilot: hasSso ? ssoExample.pilot : journey?.pilot ?? `Choose one representative case and agree on a baseline for this measure: ${use.successMetrics[0]}. Run the same case with each option and record the result.`,
  };
}

export function comparisonDraft(comparison: NonNullable<ReturnType<typeof buyerComparison>>, requested: (string | string[] | undefined)[]) {
  const { use, products, findings, defaults, question, pilot } = comparison;
  const ids = requested.every((id) => id === undefined) ? defaults : requested.filter((id): id is string => typeof id === "string");
  const selected = [...new Set(ids)].slice(0, 2).flatMap((id) => findings.get(id) ?? []);
  const comparisonUrl = SITE_URL + shortlistUrl(products.map((p) => p.id), use.id);
  const title = products.map((product) => product.name).join(" / ");
  const text = [
    `Products under consideration: ${title}`, use.buyerQuestion, "",
    ...selected.map((f) => `${f.attribution} · ${f.product} · checked ${f.checked}\n${f.statement}\n${f.caveat}\n${f.url}\n`),
    ...(selected.length ? [] : ["No sourced finding selected.", ""]),
    `Open question: ${question}`, `Pilot: ${pilot}`,
  ].join("\n");
  return { useCaseId: use.id, title, text, links: [...selected.map((f) => ({ label: f.label, url: f.url })), { label: "Reopen this comparison", url: comparisonUrl }] };
}

export type ComparisonDraft = ReturnType<typeof comparisonDraft>;
