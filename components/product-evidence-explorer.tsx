"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StatusPill } from "@/components/chrome";
import type { Claim } from "@/lib/schema";

export function ProductEvidenceExplorer({ claims }: { claims: Claim[] }) {
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
      <Accordion type="multiple" className="space-y-3">
        {claims.map((claim) => (
          <AccordionItem key={claim.id} value={claim.id} className="min-w-0 rounded-xl border border-border bg-card px-4">
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <StatusPill status={claim.verificationStatus} />
              <StatusPill status={claim.sourceType} />
              <span className="text-xs text-muted-foreground">Checked {claim.lastCheckedAt}</span>
              <span className="text-xs text-muted-foreground">Publication date {claim.publishedAt ?? "Unknown"}</span>
            </div>
            <p className="mt-3 text-sm leading-6 [overflow-wrap:anywhere]">{claim.statement}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {claim.verificationStatus === "vendor_published"
                ? "Publisher-reported, not independently tested."
                : "Inspect source and verification status before drawing a conclusion."}
            </p>
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
                  <dd className="mt-1 text-muted-foreground">
                    {claim.verificationStatus === "vendor_published"
                      ? "Publisher-reported, not independently tested."
                      : "Inspect source and verification status before drawing a conclusion."}
                  </dd>
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
                    {claim.notes || "No additional qualification recorded; do not infer broad support."}
                  </dd>
                </div>
              </dl>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
