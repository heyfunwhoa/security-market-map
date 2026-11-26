"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RecheckBadge } from "@/components/recheck-badge";
import { SourceBadge } from "@/components/source-badge";
import { evidenceBasis, noteWithoutCaveat } from "@/lib/claim-basis";
import type { Claim } from "@/lib/schema";

/** Who said it: vendor material first, then analysts, then press and other third parties. */
const SOURCE_GROUPS: { label: string; types: Claim["sourceType"][] }[] = [
  { label: "What the vendor says", types: ["official_docs", "vendor_marketing", "press_release", "customer_story"] },
  { label: "What analysts say", types: ["analyst"] },
  { label: "Press and third parties", types: [] },
];

function groupBySourceType(claims: Claim[]) {
  const known = new Set(SOURCE_GROUPS.flatMap((group) => group.types));
  return SOURCE_GROUPS.map((group) => ({
    label: group.label,
    claims: claims.filter((claim) => (group.types.length ? group.types.includes(claim.sourceType) : !known.has(claim.sourceType))),
  })).filter((group) => group.claims.length > 0);
}

export function ProductEvidenceExplorer({
  claims,
  recheckClaimIds = [],
  asOf,
  groupBySource = false,
}: {
  claims: Claim[];
  /** Group claims under vendor, analyst and press headings instead of one list. */
  groupBySource?: boolean;
  /** Claims whose source is past its review window as of the catalog snapshot (computed on the server). */
  recheckClaimIds?: string[];
  asOf?: string;
}) {
  if (claims.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-4">
        <p className="font-medium">Evidence status: Unknown</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          No product-specific claims have been recorded. This is not evidence that the capability is unsupported.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-3">
      <p className="text-sm text-muted-foreground">
        {claims.length} recorded source-linked {claims.length === 1 ? "claim" : "claims"}. Original publisher links remain
        available without expanding details.
      </p>
      {(groupBySource ? groupBySourceType(claims) : [{ label: "", claims }]).map((group) => (
      <div key={group.label || "all"} className="min-w-0 space-y-3">
      {group.label ? <h3 className="pt-3 text-lg font-semibold">{group.label} <span className="text-sm font-normal text-muted-foreground">({group.claims.length})</span></h3> : null}
      <Accordion type="multiple" className="space-y-3">
        {group.claims.map((claim) => (
          <AccordionItem key={claim.id} value={claim.id} className="min-w-0 rounded-xl border border-border bg-card px-4">
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <SourceBadge claim={claim} />
              {asOf && recheckClaimIds.includes(claim.id) ? <RecheckBadge asOf={asOf} /> : null}
              <span className="text-xs text-muted-foreground">Checked {claim.lastCheckedAt}</span>
              <span className="text-xs text-muted-foreground">Publication date {claim.publishedAt ?? "Unknown"}</span>
            </div>
            <p className="mt-3 text-sm leading-6 [overflow-wrap:anywhere]">{claim.statement}</p>
            <a
              href={claim.sourceUrl}
              aria-label={`Open original source: ${claim.statement}`}
              className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Open original source
            </a>
            {/* Trigger must remain a direct AccordionItem sibling — nesting it beside the source link broke expand. */}
            <AccordionTrigger
              aria-label={`Evidence details: ${claim.statement}`}
              className="min-h-11 justify-start gap-2 px-0 py-2 text-sm"
            >
              Evidence details
            </AccordionTrigger>
            <AccordionContent>
              <dl className="grid gap-3 border-t border-border pt-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold">Evidence basis</dt>
                  <dd className="mt-1 text-muted-foreground">{evidenceBasis(claim)}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Publication date</dt>
                  <dd className="mt-1 text-muted-foreground">{claim.publishedAt ?? "Unknown"}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Capability reference</dt>
                  <dd className="mt-1 break-all text-muted-foreground">{claim.capabilityId ?? "Unknown"}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Scope and caveats</dt>
                  <dd className="mt-1 text-muted-foreground [overflow-wrap:anywhere]">
                    {noteWithoutCaveat(claim.notes) || "No additional qualification recorded. Do not infer broad support."}
                  </dd>
                </div>
              </dl>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
      ))}
    </div>
  );
}
