import { buildContextGraph } from "@/lib/context-graph";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildContextGraph());
}
