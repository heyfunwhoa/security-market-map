import type { NextRequest } from "next/server";
import { contextSearch } from "@/lib/context-search";
import type { GraphNodeType } from "@/lib/context-graph";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = (params.get("q") ?? "").slice(0, 200);
  const types = params.get("types")?.split(",").filter(Boolean) as GraphNodeType[] | undefined;
  const limit = Math.min(Number(params.get("limit") ?? 10) || 10, 25);
  return Response.json({ query, hits: contextSearch(query, { types, limit }) });
}
