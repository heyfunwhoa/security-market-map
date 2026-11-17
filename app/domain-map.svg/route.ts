import { catalog } from "@/lib/catalog";
import { domainClaimCounts } from "@/lib/domain-evidence";
import { domainMapSvg } from "@/lib/domain-map-svg";

export const dynamic = "force-static";

export function GET() {
  const svg = domainMapSvg({
    domains: catalog.domains,
    claimCounts: domainClaimCounts(catalog),
    totalClaims: catalog.claims.length,
    asOf: catalog.asOf,
  });
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": 'inline; filename="security-market-map.svg"',
    },
  });
}
