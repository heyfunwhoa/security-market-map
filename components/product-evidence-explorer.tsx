import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StatusPill } from "@/components/chrome";
import type { Claim } from "@/lib/schema";

export function ProductEvidenceExplorer({ claims }: { claims: Claim[] }) {
  if (claims.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-4">
        <p className="font-medium">Evidence status: Unknown</p>
        <p className="mt-1 text-sm text-muted-foreground">
          No product-specific claims have been recorded. This is not evidence that the capability is unsupported.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{claims.length} recorded source-linked {claims.length === 1 ? "claim" : "claims"}. Original publisher links remain available without expanding details.</p>
      <Accordion type="multiple" className="space-y-3">
        {claims.map((claim) => (
          <AccordionItem key={claim.id} value={claim.id} className="rounded-xl border border-border bg-card px-4">
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <StatusPill status={claim.verificationStatus} />
              <StatusPill status={claim.sourceType} />
              <span className="text-xs text-muted-foreground">Checked {claim.lastCheckedAt}</span>
            </div>
            <p className="mt-3 text-sm leading-6">{claim.statement}</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 pb-2">
              <a href={claim.sourceUrl} className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Open original source</a>
              <AccordionTrigger className="min-h-11 flex-none px-2">Evidence details</AccordionTrigger>
            </div>
            <AccordionContent>
              <dl className="grid gap-3 border-t border-border pt-3 text-sm sm:grid-cols-2">
                <div><dt className="font-semibold">Evidence basis</dt><dd className="mt-1 text-muted-foreground">{claim.verificationStatus === "vendor_published" ? "Publisher-reported, not independently tested." : "Inspect source and verification status before drawing a conclusion."}</dd></div>
                <div><dt className="font-semibold">Publication date</dt><dd className="mt-1 text-muted-foreground">{claim.publishedAt ?? "Not recorded"}</dd></div>
                <div><dt className="font-semibold">Capability reference</dt><dd className="mt-1 break-all text-muted-foreground">{claim.capabilityId ?? "Not mapped"}</dd></div>
                <div><dt className="font-semibold">Scope and caveats</dt><dd className="mt-1 text-muted-foreground">{claim.notes || "No additional qualification recorded; do not infer broad support."}</dd></div>
              </dl>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
