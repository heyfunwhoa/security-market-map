import { catalog } from "../catalog";
import { withBuyerContext } from "./buyer-context";
import { projectEvidenceGraph, type SliceSpec } from "./project";

/**
 * The whole map as one evidence graph: every category and use case, plus vendor-neutral buyer
 * context for every seat. Used by the gap report, context search, and ?slice=market-map.
 */
export const MARKET_MAP_SLICE: SliceSpec = {
  id: "market-map",
  title: "Security market map with buyer context",
  categoryIds: catalog.categories.map((category) => category.id),
  useCaseIds: catalog.useCases.map((useCase) => useCase.id),
};

const projected = projectEvidenceGraph(catalog, MARKET_MAP_SLICE);
if (projected.problems.length > 0) {
  throw new Error(`Market map evidence graph projection failed:\n${projected.problems.join("\n")}`);
}
const layered = withBuyerContext(projected.graph, catalog, { allSeats: true });
if (layered.problems.length > 0) {
  throw new Error(`Buyer context layering failed:\n${layered.problems.slice(0, 20).join("\n")}`);
}

export const marketMapGraph = layered.graph;
