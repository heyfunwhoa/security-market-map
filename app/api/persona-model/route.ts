import { personaModel } from "@/lib/persona-model";

// Static snapshot of the persona model for other tools to consume.
export const dynamic = "force-static";

export function GET() {
  return Response.json(personaModel());
}
