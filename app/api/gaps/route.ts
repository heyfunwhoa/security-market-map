import { gapReport, gapSummary } from "@/lib/gap-report";
import { catalog } from "@/lib/catalog";

export const dynamic = "force-static";

export function GET() {
  // Measured against the catalog date so the static export is reproducible.
  const gaps = gapReport(catalog, new Date(`${catalog.asOf}T00:00:00Z`));
  return Response.json({ asOf: catalog.asOf, total: gaps.length, groups: gapSummary(gaps) });
}
