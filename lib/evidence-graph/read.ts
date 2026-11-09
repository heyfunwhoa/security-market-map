import {
  EVIDENCE_GRAPH_VERSION,
  EXPANSION_LIMITS,
  type EvidenceGraph,
  type EvidenceGraphExpansion,
} from "./contract";
import { EvidenceGraphQueryError, expandEvidenceGraph } from "./project";
import { identitySecretsNhiGraph } from "./identity-slice";

const ALLOWED_PARAMS = new Set(["root", "depth", "nodeLimit", "edgeLimit"]);

function integerParam(value: string | null, fallback: number, min: number, max: number, name: string): number {
  if (value === null || value === "") return fallback;
  if (!/^\d+$/.test(value)) throw new EvidenceGraphQueryError(`${name} must be an integer`);
  const parsed = Number(value);
  if (parsed < min || parsed > max) {
    throw new EvidenceGraphQueryError(`${name} must be an integer from ${min} to ${max}`);
  }
  return parsed;
}

export function readEvidenceGraph(requestUrl: string, graph: EvidenceGraph = identitySecretsNhiGraph): EvidenceGraph | EvidenceGraphExpansion {
  const url = new URL(requestUrl);
  for (const key of url.searchParams.keys()) {
    if (!ALLOWED_PARAMS.has(key)) throw new EvidenceGraphQueryError(`Unsupported query parameter: ${key}`);
  }
  const root = url.searchParams.get("root");
  const depthValue = url.searchParams.get("depth");
  const nodeLimitValue = url.searchParams.get("nodeLimit");
  const edgeLimitValue = url.searchParams.get("edgeLimit");
  if (!root) {
    if (depthValue !== null || nodeLimitValue !== null || edgeLimitValue !== null) {
      throw new EvidenceGraphQueryError("depth, nodeLimit, and edgeLimit require root");
    }
    return graph;
  }
  return expandEvidenceGraph(graph, {
    rootId: root,
    depth: integerParam(depthValue, EXPANSION_LIMITS.defaultDepth, 0, EXPANSION_LIMITS.maxDepth, "depth"),
    nodeLimit: integerParam(nodeLimitValue, EXPANSION_LIMITS.defaultNodeLimit, 1, EXPANSION_LIMITS.maxNodeLimit, "nodeLimit"),
    edgeLimit: integerParam(edgeLimitValue, EXPANSION_LIMITS.defaultEdgeLimit, 1, EXPANSION_LIMITS.maxEdgeLimit, "edgeLimit"),
  });
}

export function evidenceGraphResponse(requestUrl: string): Response {
  try {
    const body = readEvidenceGraph(requestUrl);
    return Response.json(
      "mode" in body ? body : { ...body, mode: "slice", contractVersion: EVIDENCE_GRAPH_VERSION },
    );
  } catch (error) {
    if (error instanceof EvidenceGraphQueryError) {
      return Response.json(
        { contractVersion: EVIDENCE_GRAPH_VERSION, error: error.message },
        { status: error.status },
      );
    }
    throw error;
  }
}
