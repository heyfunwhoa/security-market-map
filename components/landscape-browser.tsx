"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { StatusPill } from "@/components/chrome";
import { deploymentLabel, relationshipLabel, scopeLabel } from "@/lib/format";
import { Label } from "@/components/ui/label";

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
  categories: Option[];
  domains: Option[];
  useCases: Option[];
  personas: { id: string; label: string; categoryIds: string[] }[];
}) {
  const [domain, setDomain] = useState("all");
  const [category, setCategory] = useState("all");
  const [useCase, setUseCase] = useState("all");
  const [persona, setPersona] = useState("all");
  const [deployment, setDeployment] = useState("all");
  const [scope, setScope] = useState("all");
  const [relation, setRelation] = useState("all");
  const [focusedProduct, setFocusedProduct] = useState("all");
  const [limit, setLimit] = useState(24);
  const resetLimit = () => setLimit(24);
  const scopedCategories = categories.filter((item) => domain === "all" || rows.some((row) => row.domainIds.includes(domain) && row.categoryIds.includes(item.id)));
  const scopedProducts = rows.filter((row) => (domain === "all" || row.domainIds.includes(domain)) && (category === "all" || row.categoryIds.includes(category))).sort((a, b) => a.productName.localeCompare(b.productName));
  const focused = rows.find((row) => row.productId === focusedProduct);
  const selectDomain = (value: string) => { setDomain(value); setCategory("all"); setFocusedProduct("all"); resetLimit(); };
  const selectCategory = (value: string) => { setCategory(value); setFocusedProduct("all"); resetLimit(); };

  const visible = useMemo(() => {
    const personaCategories = personas.find((item) => item.id === persona)?.categoryIds ?? [];
    return rows
      .filter((row) => domain === "all" || row.domainIds.includes(domain))
      .filter((row) => focusedProduct === "all" || row.productId === focusedProduct)
      .filter((row) => category === "all" || row.categoryIds.includes(category))
      .filter((row) => useCase === "all" || row.useCaseIds.includes(useCase))
      .filter(
        (row) =>
          persona === "all" || row.categoryIds.some((id) => personaCategories.includes(id)),
      )
      .filter((row) => deployment === "all" || row.deployment.includes(deployment))
      .filter((row) => scope === "all" || row.scopes.includes(scope))
      .filter((row) => {
        if (relation === "all") return true;
        return edges.some(
          (edge) =>
            edge.productId === row.productId &&
            edge.type === relation &&
            (useCase === "all" || edge.useCaseId === useCase),
        );
      })
      .sort((a, b) => a.productName.localeCompare(b.productName));
  }, [rows, edges, domain, category, useCase, persona, personas, deployment, scope, relation, focusedProduct]);

  return (
    <div>
      <section aria-labelledby="drilldown-heading" className="mb-5 rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="drilldown-heading" className="font-heading text-lg">Explore from landscape to product</h2>
          <button type="button" className="text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => { setDomain("all"); setCategory("all"); setFocusedProduct("all"); setUseCase("all"); setPersona("all"); setDeployment("all"); setScope("all"); setRelation("all"); resetLimit(); }}>Zoom out to all markets</button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Start broad, narrow to a category, then inspect a product. Navigation is not a ranking or a feature-parity claim.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Filter label="1 · Market domain" value={domain} onChange={selectDomain} options={domains} />
          <Filter label="2 · Category" value={category} onChange={selectCategory} options={scopedCategories} />
          <Filter label="3 · Product" value={focusedProduct} onChange={(value) => { setFocusedProduct(value); resetLimit(); }} options={scopedProducts.map((row) => ({ id: row.productId, label: `${row.productName} · ${row.vendorName}` }))} />
        </div>
        {focused ? <div className="mt-4 rounded-lg border border-border bg-background p-3" aria-live="polite">
          <p className="text-sm font-semibold">{focused.productName} <span className="font-normal text-muted-foreground">· {focused.vendorName}</span></p>
          <p className="mt-1 text-sm">{focused.positioning}</p>
          <Link href={`/vendors/${focused.vendorSlug}`} className="mt-2 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring">Open vendor detail and evidence</Link>
        </div> : null}
      </section>
      <div role="group" aria-label="Additional product filters" className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3">
        <Filter label="Use case" value={useCase} onChange={(value) => { setUseCase(value); resetLimit(); }} options={useCases} />
        <Filter
          label="Buyer"
          value={persona}
          onChange={(value) => { setPersona(value); resetLimit(); }}
          options={personas.map((item) => ({ id: item.id, label: item.label }))}
        />
        <Filter
          label="Deployment"
          value={deployment}
          onChange={(value) => { setDeployment(value); resetLimit(); }}
          options={["saas", "self_hosted", "hybrid", "cloud_native", "open_source", "unknown"].map(
            (id) => ({ id, label: deploymentLabel(id) }),
          )}
        />
        <Filter
          label="Identity scope"
          value={scope}
          onChange={(value) => { setScope(value); resetLimit(); }}
          options={["human", "nhi", "agent", "not_an_identity_control"].map((id) => ({
            id,
            label: scopeLabel(id),
          }))}
        />
        <Filter
          label="Relationship in this use case"
          value={relation}
          onChange={(value) => { setRelation(value); resetLimit(); }}
          options={[
            "direct_competitor",
            "bundled_alternative",
            "complement",
            "adjacent_budget",
          ].map((id) => ({ id, label: relationshipLabel(id) }))}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {visible.length} products. Sorted A to Z. Being on this list is candidacy, not a rank and not a
        capability verdict.
      </p>
      {visible.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-border px-4 py-8 text-sm">
          No product in the seed matches these filters. Widen one filter rather than treating the gap as
          a market fact.
        </p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {visible.slice(0, limit).map((row) => {
            const related = edges.filter(
              (edge) =>
                edge.productId === row.productId &&
                (useCase === "all" || edge.useCaseId === useCase) &&
                (relation === "all" || edge.type === relation),
            );
            return (
              <li key={row.productId} className="rounded-xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/vendors/${row.vendorSlug}`} className="text-lg font-semibold hover:underline">
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
              </li>
            );
          })}
        </ul>
      )}
      {visible.length > limit ? <button type="button" onClick={() => setLimit((current) => current + 24)} className="mt-4 min-h-11 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">Show more products ({Math.min(limit, visible.length)} of {visible.length} shown)</button> : null}
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
        className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
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
