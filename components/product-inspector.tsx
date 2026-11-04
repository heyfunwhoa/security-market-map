"use client";

import Link from "next/link";
import type { LandscapeEdge, LandscapeRow } from "@/components/landscape-browser";
import { StatusPill } from "@/components/chrome";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { deploymentLabel, relationshipLabel, scopeLabel } from "@/lib/format";
import { productDetailUrl } from "@/lib/landscape-filters";

const actionClass = "inline-flex min-h-11 items-center justify-center rounded-md border border-border px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ProductInspector({ row, related, categories, useCases }: {
  row: LandscapeRow;
  related: LandscapeEdge[];
  categories: { id: string; label: string }[];
  useCases: { id: string; label: string }[];
}) {
  return (
    <Sheet>
      <SheetTrigger className={`${actionClass} mt-3 hover:bg-muted`} aria-label={`Quick view: ${row.productName}`}>
        Quick view
      </SheetTrigger>
      <SheetContent showCloseButton={false} className="data-[side=right]:w-full data-[side=right]:sm:max-w-xl overflow-y-auto overscroll-contain motion-reduce:animate-none motion-reduce:transition-none">
        <SheetHeader className="border-b border-border p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Product quick view</span>
            <SheetClose className={`${actionClass} shrink-0 hover:bg-muted`}>Close</SheetClose>
          </div>
          <SheetTitle className="break-words text-2xl">{row.productName}</SheetTitle>
          <SheetDescription>{row.vendorName}. Close this panel to return to your filtered results.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-5 pb-6">
          <section aria-label="Product overview" className="space-y-3">
            <StatusPill status={row.availability} />
            <p className="leading-6">{row.positioning}</p>
            <dl className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4">
              <Detail label="Categories" value={categories.filter((item) => row.categoryIds.includes(item.id)).map((item) => item.label).join(" · ")} />
              <Detail label="Identity scope" value={row.scopes.map(scopeLabel).join(" · ")} />
              <Detail label="Deployment" value={row.deployment.map(deploymentLabel).join(" · ")} />
            </dl>
          </section>
          <section aria-label="Recorded relationships">
            <h3 className="font-heading text-lg">Recorded relationships</h3>
            <p className="mt-1 text-sm text-muted-foreground">Matches your use-case and relationship filters. These records do not establish feature parity.</p>
            {related.length ? <ul className="mt-3 divide-y divide-border">
              {related.map((edge) => <li key={`${edge.type}-${edge.otherName}-${edge.useCaseId}`} className="py-3">
                <p className="font-medium">{edge.otherName}</p>
                <p>{relationshipLabel(edge.type)}</p>
                <p className="text-muted-foreground">{useCases.find((item) => item.id === edge.useCaseId)?.label ?? "Use case unknown"}</p>
              </li>)}
            </ul> : <p className="mt-3 rounded-lg border border-dashed border-border p-4 text-muted-foreground">No recorded relationships match this view. Missing research does not mean no relationship exists.</p>}
          </section>
          <section aria-label="Evidence and uncertainty" className="border-t border-border pt-4">
            <h3 className="font-heading text-lg">Evidence and uncertainty</h3>
            <p className="mt-1 text-muted-foreground">Review source attribution, claim status, and Unknowns on the product detail page before making a capability comparison.</p>
            <Link href={productDetailUrl(row.vendorSlug, row.productId)} className={`${actionClass} mt-3 text-primary hover:bg-muted`}>Open product detail and evidence</Link>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-medium text-muted-foreground">{label}</dt><dd className="mt-1">{value || "Unknown"}</dd></div>;
}
