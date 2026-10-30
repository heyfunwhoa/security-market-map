"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { StatusPill } from "@/components/chrome";
import { deploymentLabel, relationshipLabel, scopeLabel } from "@/lib/format";
import { filterLandscapeRows, initialLandscapeFilters, landscapeFilterReducer, readLandscapeFilters, landscapeFilterUrl, productDetailUrl } from "@/lib/landscape-filters";
import { Label } from "@/components/ui/label";
import { LandscapeResults } from "@/components/landscape-results";
import { ProductInspector } from "@/components/product-inspector";

export type LandscapeRow = {
  productId: string;
  productName: string;
  vendorName: string;
  vendorSlug: string;
  positioning: string;
  categoryIds: string[];
  domainIds: string[];
  scopes: string[];
  deployment: string[];
  useCaseIds: string[];
  availability: string;
};

export type LandscapeEdge = {
  productId: string;
  type: string;
  useCaseId: string;
  otherName: string;
};

type Option = { id: string; label: string };

export function LandscapeBrowser({
  rows,
  edges,
  categories,
  domains,
  useCases,
  personas,
}: {
  rows: LandscapeRow[];
  edges: LandscapeEdge[];
  categories: (Option & { domainIds: string[] })[];
  domains: Option[];
  useCases: Option[];
  personas: { id: string; label: string; categoryIds: string[] }[];
}) {
  const searchParams = useSearchParams();
  const resultSummaryRef = useRef<HTMLParagraphElement>(null);
  const filters = readLandscapeFilters(searchParams, {
    domain: domains.map((item) => item.id), category: categories.map((item) => item.id),
    useCase: useCases.map((item) => item.id), persona: personas.map((item) => item.id),
    deployment: ["saas", "self_hosted", "hybrid", "cloud_native", "open_source", "unknown"],
    scope: ["human", "nhi", "agent", "not_an_identity_control"],
    relation: ["direct_competitor", "bundled_alternative", "complement", "adjacent_budget"],
    focusedProduct: rows.map((row) => row.productId),
  });
  const scopedCategories = categories.filter((item) => filters.domain === "all" || item.domainIds.includes(filters.domain));
  if (!scopedCategories.some((item) => item.id === filters.category)) filters.category = "all";
  const scopedProducts = filterLandscapeRows(rows, edges, personas, { ...filters, focusedProduct: "all" });
  if (!scopedProducts.some((row) => row.productId === filters.focusedProduct)) filters.focusedProduct = "all";
  const { domain, category, useCase, persona, deployment, scope, relation, focusedProduct } = filters;
  const navigate = (next: typeof filters) => {
    const url = landscapeFilterUrl(next);
    if (url !== window.location.pathname + window.location.search) window.history.pushState(null, "", url);
  };
  const change = (key: keyof typeof filters) => (value: string) => navigate(landscapeFilterReducer(filters, { type: "select", key, value }));
  const reset = () => navigate(initialLandscapeFilters);
  const visible = scopedProducts.filter((row) => focusedProduct === "all" || row.productId === focusedProduct);
  const focused = visible.find((row) => row.productId === focusedProduct);
  const activeCount = Object.values(filters).filter((value) => value !== "all").length;
  const advancedCount = [deployment, scope, relation].filter((value) => value !== "all").length;
  const labelFor = (options: Option[], id: string) => options.find((item) => item.id === id)?.label ?? id;
  const activeFilters = [
    { key: "domain", label: "Domain", value: labelFor(domains, domain) },
    { key: "category", label: "Category", value: labelFor(categories, category) },
    { key: "useCase", label: "Use case", value: labelFor(useCases, useCase) },
    { key: "persona", label: "Buyer", value: labelFor(personas, persona) },
    { key: "deployment", label: "Deployment", value: deploymentLabel(deployment) },
    { key: "scope", label: "Scope", value: scopeLabel(scope) },
    { key: "relation", label: "Relationship", value: relationshipLabel(relation) },
    { key: "focusedProduct", label: "Product", value: rows.find((row) => row.productId === focusedProduct)?.productName ?? focusedProduct },
  ] satisfies { key: keyof typeof filters; label: string; value: string }[];


  return (
    <div>
      <section aria-labelledby="drilldown-heading" className="mb-5 rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="drilldown-heading" className="font-heading text-lg">Explore from landscape to product</h2>
          <button type="button" className="min-h-11 rounded-sm px-2 text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" onClick={reset}>Reset all filters</button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Start broad, narrow to a category, then inspect a product. Navigation is not a ranking or a feature-parity claim.</p>
        <p className="mt-2 text-sm text-muted-foreground">Product choices reflect all filters below. Changing a filter clears the selected product. Copy the page URL to share this view; use your browser’s Back button to return to it.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Filter label="1 · Market domain" value={domain} onChange={change("domain")} options={domains} />
          <Filter label="2 · Category" value={category} onChange={change("category")} options={scopedCategories} />
          <Filter label="3 · Product" value={focusedProduct} onChange={change("focusedProduct")} options={scopedProducts.map((row) => ({ id: row.productId, label: `${row.productName} · ${row.vendorName}` }))} />
        </div>
        {focused ? <div className="mt-4 rounded-lg border border-border bg-background p-3" aria-live="polite">
          <p className="text-sm font-semibold">{focused.productName} <span className="font-normal text-muted-foreground">· {focused.vendorName}</span></p>
          <p className="mt-1 text-sm">{focused.positioning}</p>
          <Link href={productDetailUrl(focused.vendorSlug, focused.productId)} className="mt-2 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring">Open product detail and evidence</Link>
        </div> : null}
      </section>
      <fieldset className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2">
        <legend className="px-1 text-sm font-semibold">Choose your buying context</legend>
        <Filter label="Use case" value={useCase} onChange={change("useCase")} options={useCases} />
        <Filter
          label="Buyer"
          value={persona}
          onChange={change("persona")}
          options={personas.map((item) => ({ id: item.id, label: item.label }))}
        />
      </fieldset>
      <details className="group mt-4 rounded-xl border border-border bg-card">
        <summary className="min-h-11 cursor-pointer rounded-xl p-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          Advanced filters <span className="font-normal text-muted-foreground">· {advancedCount ? `${advancedCount} active` : "Deployment, identity scope, relationships"}</span>
        </summary>
        <fieldset className="grid gap-3 border-t border-border p-4 sm:grid-cols-2 lg:grid-cols-3">
          <legend className="sr-only">Advanced product filters</legend>
        <Filter
          label="Deployment"
          value={deployment}
          onChange={change("deployment")}
          options={["saas", "self_hosted", "hybrid", "cloud_native", "open_source", "unknown"].map(
            (id) => ({ id, label: deploymentLabel(id) }),
          )}
        />
        <Filter
          label="Identity scope"
          value={scope}
          onChange={change("scope")}
          options={["human", "nhi", "agent", "not_an_identity_control"].map((id) => ({
            id,
            label: scopeLabel(id),
          }))}
        />
        <Filter
          label="Relationship in this use case"
          value={relation}
          onChange={change("relation")}
          options={[
            "direct_competitor",
            "bundled_alternative",
            "complement",
            "adjacent_budget",
          ].map((id) => ({ id, label: relationshipLabel(id) }))}
        />
        </fieldset>
      </details>
      {activeCount > 0 && <section aria-label="Active filters" className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
        <p className="text-sm font-semibold">Your current view</p>
        <p className="mt-1 text-sm text-muted-foreground">Remove a filter to broaden the results. Changing domain also clears category; changing any filter clears product focus.</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {activeFilters.filter((item) => filters[item.key] !== "all").map((item) => <li key={item.key} className="max-w-full">
            <Button type="button" variant="secondary" className="h-auto min-h-11 max-w-full gap-2 whitespace-normal py-2 text-left motion-reduce:transition-none motion-reduce:active:translate-y-0"
              aria-label={`Remove ${item.label.toLowerCase()} filter: ${item.value}`}
              onClick={() => { resultSummaryRef.current?.focus(); change(item.key)("all"); }}>
              <span className="min-w-0 [overflow-wrap:anywhere]"><span className="font-normal">{item.label}: </span>{item.value}</span><X className="size-4 shrink-0" aria-hidden="true" />
            </Button>
          </li>)}
        </ul>
      </section>}
      <p ref={resultSummaryRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className="mt-4 text-sm text-muted-foreground">
        {visible.length} of {rows.length} products. {activeCount} active {activeCount === 1 ? "filter" : "filters"}. Sorted A to Z. Being on this list is candidacy, not a rank and not a
        capability verdict.
      </p>
      <LandscapeResults rows={visible} allRows={rows} edges={edges} categories={categories} useCases={useCases} useCase={useCase} relation={relation}>
      {visible.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-border px-4 py-8 text-sm">
          <p>
          No product in the seed matches these filters. Widen one filter rather than treating the gap as
          a market fact.
          </p>
          <button type="button" onClick={reset} className="mt-2 min-h-11 rounded-sm px-2 text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Reset all filters</button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-3">
          {visible.map((row) => {
            const related = edges.filter(
              (edge) =>
                edge.productId === row.productId &&
                (useCase === "all" || edge.useCaseId === useCase) &&
                (relation === "all" || edge.type === relation),
            );
            return (
              <li key={row.productId} className="rounded-xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={productDetailUrl(row.vendorSlug, row.productId)} className="text-lg font-semibold hover:underline">
                    {row.productName}
                  </Link>
                  <span className="text-sm text-muted-foreground">{row.vendorName}</span>
                  <StatusPill status={row.availability} />
                </div>
                <p className="mt-2 text-sm leading-6">{row.positioning}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {row.scopes.map(scopeLabel).join(" · ")} · {row.deployment.map(deploymentLabel).join(" · ")}
                </p>
                {related.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-sm">
                    {related.slice(0, 3).map((edge) => (
                      <li key={`${edge.type}-${edge.otherName}-${edge.useCaseId}`}>
                        <StatusPill status={edge.type} />{" "}
                        <span className="text-muted-foreground">with {edge.otherName}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ProductInspector row={row} related={related} categories={categories} useCases={useCases} />
              </li>
            );
          })}
        </ul>
      )}
      </LandscapeResults>
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}) {
  const id = `filter-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-11 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <option value="all">Any</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
