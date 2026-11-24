import { expect, it } from "vitest";
import { catalog } from "./catalog";
import { buyerComparison, comparisonDraft, ssoExample } from "./buyer-comparison";
import { secopsJourneys } from "./data/secops-use-cases";

it("keeps unrelated, duplicated and unselected evidence out of a brief", () => {
  const comparison = buyerComparison(catalog, ssoExample.id, ssoExample.productIds)!;
  expect(comparison.defaults).toEqual(["claim-descope-tenant-sso", "claim-ciam-sso-workos"]);
  expect(comparison.prices.map((price) => price.productId).sort()).toEqual(["descope", "workos"]);
  const selected = comparisonDraft(comparison, ["price-descope-sso", "claim-secops-buyer-splunk"]);
  expect(selected.text).toContain("Published pricing");
  expect(selected.links).toHaveLength(2);
  expect(selected.text).not.toContain("Splunk");
  expect(comparisonDraft(comparison, ["", ""]).text).toContain("No sourced finding selected.");
  expect(comparisonDraft(comparison, ["claim-ciam-workflow-workos", "claim-ciam-workflow-workos"]).links).toHaveLength(2);
});

it("carries two distinct, use-case-specific product findings into each SecOps pilot", () => {
  for (const journey of secopsJourneys) {
    const result = buyerComparison(catalog, journey.id, journey.productIds)!;
    expect(result.defaults.map((id) => result.findings.get(id)?.productId)).toEqual(journey.productIds);
    const draft = comparisonDraft(result, []);
    expect(draft.links).toHaveLength(3);
    expect(draft.text).toContain(journey.pilot);
    expect(draft.text).toContain(journey.discoveryQuestions[0]);
  }
});

it("leaves an unevidenced selection open for discovery", () => {
  expect(buyerComparison(catalog, "uc-ciam", ["descope"])).toBeNull();
  const result = buyerComparison(catalog, "uc-ciam", ["splunk", "stairwell-platform"])!;
  const draft = comparisonDraft(result, []);
  expect(draft.text).toContain("No sourced finding selected.");
  expect(draft.links).toHaveLength(1);
});
