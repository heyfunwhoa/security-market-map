"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { LandscapeEdge, LandscapeRow } from "@/components/landscape-browser";
import { ProductInspector } from "@/components/product-inspector";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/chrome";
import { productDetailUrl } from "@/lib/landscape-filters";
import { shortlistUrl, toggleShortlist } from "@/lib/landscape-shortlist";

const action = "inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function LandscapeResults({ rows, allRows, edges, categories, useCases, useCase, relation, children }: {
  rows: LandscapeRow[]; allRows: LandscapeRow[]; edges: LandscapeEdge[];
  categories: { id: string; label: string }[]; useCases: { id: string; label: string }[];
  useCase: string; relation: string; children: ReactNode;
}) {
  const [view, setView] = useState("table");
  const [selected, setSelected] = useState<string[]>([]);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const [announcement, setAnnouncement] = useState("");
  const hidden = selected.filter((id) => !rows.some((row) => row.productId === id)).length;
  const toggle = (id: string, restoreFocus = false) => {
    const next = toggleShortlist(selected, id);
    const name = allRows.find((row) => row.productId === id)?.productName ?? id;
    setSelected(next);
    setAnnouncement(`${name} ${next.includes(id) ? "added to" : "removed from"} shortlist. ${next.length} of 4 selected.${next.length === 4 ? " Limit reached; remove a product to select another." : ""}`);
    if (restoreFocus) summaryRef.current?.focus();
  };
  return <div className="mt-4 space-y-4">
    <div role="group" aria-label="Result view" className="flex flex-wrap gap-2">
      {["table", "cards"].map((mode) => <button key={mode} type="button" aria-pressed={view === mode} onClick={() => setView(mode)} className={`${action} ${view === mode ? "bg-muted font-semibold" : ""}`}>{mode === "table" ? "Selection table" : "Detailed cards"}</button>)}
    </div>
    <section aria-label="Comparison shortlist" className="rounded-xl border border-border bg-card p-4">
      <p ref={summaryRef} tabIndex={-1} className="font-medium rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{selected.length} of 4 selected{hidden ? ` · ${hidden} outside current filters` : ""}</p>
      <p role="status" aria-atomic="true" className="sr-only">{announcement}</p>
      <p className="mt-1 text-sm text-muted-foreground">Select two to four products in the table. Your shortlist stays as you filter this page. Confirm the buyer use case in Compare; selection does not imply equivalent capabilities.</p>
      {selected.length > 0 && <ul className="mt-3 flex flex-wrap gap-2">{selected.map((id) => <li key={id}><button type="button" className={action} onClick={() => toggle(id, true)} aria-label={`Remove ${allRows.find((row) => row.productId === id)?.productName ?? id} from comparison`}>{allRows.find((row) => row.productId === id)?.productName ?? id} ×</button></li>)}</ul>}
      <div className="mt-3 flex flex-wrap gap-2">
        {selected.length >= 2 ? <Link href={shortlistUrl(selected, useCase)} className={`${action} bg-primary text-primary-foreground`}>Compare selected</Link> : <button type="button" disabled className={`${action} opacity-50`}>Select at least 2 to compare</button>}
        {selected.length > 0 && <button type="button" onClick={() => { setSelected([]); setAnnouncement("Shortlist cleared. 0 of 4 selected."); summaryRef.current?.focus(); }} className={action}>Clear shortlist</button>}
      </div>
    </section>
    {view === "cards" ? children : <div className="rounded-xl border border-border">
      <Table scrollLabel="Products matching your filters">
        <TableCaption className="p-3">Products matching your filters. Scroll horizontally on narrow screens. Select at most four; deselect one to replace it.</TableCaption>
        <TableHeader><TableRow><TableHead scope="col">Select</TableHead><TableHead scope="col">Product / vendor</TableHead><TableHead scope="col">Category context</TableHead><TableHead scope="col">Availability</TableHead><TableHead scope="col">Inspect</TableHead></TableRow></TableHeader>
        <TableBody>{rows.map((row) => <TableRow key={row.productId} data-state={selected.includes(row.productId) ? "selected" : undefined}>
          <TableCell><label className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center"><Checkbox checked={selected.includes(row.productId)} disabled={selected.length >= 4 && !selected.includes(row.productId)} onCheckedChange={() => toggle(row.productId)} aria-label={`Select ${row.productName} for comparison`} className="motion-reduce:transition-none" /></label></TableCell>
          <TableHead scope="row" className="min-w-48 whitespace-normal"><Link className="inline-flex min-h-11 items-center font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring" href={productDetailUrl(row.vendorSlug, row.productId)}>{row.productName}</Link><p className="text-muted-foreground">{row.vendorName}</p></TableHead>
          <TableCell className="min-w-48 max-w-72 whitespace-normal">{categories.filter((item) => row.categoryIds.includes(item.id)).map((item) => item.label).join(" · ") || "Unknown"}</TableCell>
          <TableCell><StatusPill status={row.availability} /></TableCell>
          <TableCell><ProductInspector row={row} categories={categories} useCases={useCases} related={edges.filter((edge) => edge.productId === row.productId && (useCase === "all" || edge.useCaseId === useCase) && (relation === "all" || edge.type === relation))} /></TableCell>
        </TableRow>)}{rows.length === 0 && <TableRow><TableCell colSpan={5}>No products match these filters. Your shortlist is retained above.</TableCell></TableRow>}</TableBody>
      </Table>
    </div>}
  </div>;
}
