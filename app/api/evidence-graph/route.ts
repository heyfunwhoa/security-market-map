import { evidenceGraphResponse } from "@/lib/evidence-graph/read";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return evidenceGraphResponse(request.url);
}
