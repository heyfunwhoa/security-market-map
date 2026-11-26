/**
 * Buyer decision guides for a use case: products grouped by how they reach the device, with each
 * capability's evidence status taken from the catalog (lib/compare evidenceCell). Groups describe
 * deployment approach only; order within a group is alphabetical, not a ranking.
 */
import { catalog } from "./catalog";
import { evidenceCell } from "./compare";

export type DecisionGuide = {
  title: string;
  intro: string;
  groups: { approach: string; productIds: string[] }[];
};

export const decisionGuides: Record<string, DecisionGuide> = {
  "uc-agentic-endpoint": {
    title: "Decision guide: how each product gets there, and what is shown",
    intro:
      "Every product with a source-based profile for this buyer question, grouped by how it reaches the device. Each cell is the evidence status recorded in the catalog. Most evidence is vendor-published; Unknown means no recorded source, not that the product lacks it.",
    groups: [
      { approach: "Agentless through MDM or EDR the customer already runs", productIds: ["backslash-agentic-endpoint", "bay-platform", "island-agentic-endpoint-posture"] },
      { approach: "Runs through the AI tool itself (hooks, plugin or gateway)", productIds: ["knostic-kirin", "zenity-platform"] },
      { approach: "From a large security platform vendor", productIds: ["crowdstrike-falcon-guardian", "palo-alto-koi"] },
    ],
  },
};

export function resolveDecisionGuide(useCaseId: string) {
  const guide = decisionGuides[useCaseId];
  const useCase = catalog.useCases.find((item) => item.id === useCaseId);
  if (!guide || !useCase) return null;
  const capabilities = useCase.capabilityIds
    .map((id) => catalog.capabilities.find((capability) => capability.id === id))
    .filter((capability) => capability !== undefined);
  const groups = guide.groups.map((group) => ({
    approach: group.approach,
    rows: group.productIds
      .map((id) => catalog.products.find((product) => product.id === id))
      .filter((product) => product !== undefined)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((product) => ({
        product,
        cells: capabilities.map((capability) => ({
          capability,
          status: evidenceCell(catalog.claims, product.id, capability.id, catalog.asOf, catalog.sources).status,
        })),
      })),
  }));
  return { ...guide, capabilities, groups };
}
