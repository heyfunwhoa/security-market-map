"use client";

import Link from "next/link";
import { productsInCategory } from "@/lib/comparison-selection";
import { useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { StatusPill } from "@/components/chrome";
import { cellStatusLabel } from "@/lib/format";
import { compareProducts } from "@/lib/compare";
import type {
  Capability,
  Category,
  Claim,
  Product,
  Source,
  UseCase,
} from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { ComparisonEvidence } from "@/components/comparison-evidence";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PRESETS: {
  id: string;
  label: string;
  useCaseId: string;
  productIds: string[];
}[] = [
  {
    id: "iga",
    label: "C1, Opal, SailPoint, Saviynt",
    useCaseId: "uc-jml",
    productIds: [
      "c1-platform",
      "opal-platform",
      "sailpoint-isc",
      "saviynt-eic",
    ],
  },
  {
    id: "platform",
    label: "Swap in Entra and Okta",
    useCaseId: "uc-jml",
    productIds: [
      "c1-platform",
      "opal-platform",
      "entra-id-governance",
      "okta-iga",
    ],
  },
  {
    id: "agent",
    label: "Agent authorization",
    useCaseId: "uc-agent",
    productIds: ["c1-platform", "opal-zero", "entra-agent-id", "idira"],
  },
  {
    id: "secrets-three",
    label: "Infisical, Vault, Akeyless",
    useCaseId: "uc-vault",
    productIds: ["infisical", "vault", "akeyless"],
  },
  {
    id: "vault",
    label: "Vault and the secrets shortlist",
    useCaseId: "uc-vault",
    productIds: ["vault", "akeyless", "aws-secrets-manager", "idira-secrets"],
  },
  {
    id: "detect",
    label: "Secrets detection",
    useCaseId: "uc-detect",
    productIds: [
      "trufflehog",
      "github-secret-scanning",
      "gitguardian",
      "gitleaks",
    ],
  },
];

export function CompareWorkbench({
  categories,
  categoryId,
  products,
  useCases,
  capabilities,
  claims,
  sources,
  asOf,
  initialUseCase,
  initialProducts,
}: {
  categories: Category[];
  categoryId: string;
  products: Product[];
  useCases: UseCase[];
  capabilities: Capability[];
  claims: Claim[];
  sources: Source[];
  asOf: string;
  initialUseCase: string;
  initialProducts: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const useCaseId = initialUseCase;
  const selected = initialProducts;
  const [productQuery, setProductQuery] = useState("");
  const productInput = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const useCase = useCases.find((item) => item.id === useCaseId);

  function commit(
    nextUse: string,
    nextProducts: string[],
    nextCategory = categoryId,
  ) {
    const params = new URLSearchParams();
    params.set("use", nextUse);
    params.set("products", nextProducts.join(","));
    if (nextCategory) params.set("category", nextCategory);
    startTransition(() =>
      router.replace(`${pathname}?${params.toString()}`, { scroll: false }),
    );
  }

  function toggle(productId: string) {
    if (isPending) return;
    if (selected.includes(productId)) productInput.current?.focus();
    const next = selected.includes(productId)
      ? selected.filter((id) => id !== productId)
      : selected.length >= 4
        ? selected
        : [...selected, productId];
    commit(useCaseId, next);
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setProductQuery("");
    commit(
      preset.useCaseId,
      preset.productIds,
      preset.id === "detect" ? "secrets-detection" : "",
    );
  }

  const rows = useMemo(
    () =>
      compareProducts({
        productIds: selected,
        capabilityIds: useCase?.capabilityIds ?? [],
        claims,
        sources,
        asOf,
      }),
    [selected, useCase, claims, sources, asOf],
  );

  const capabilityName = (id: string) =>
    capabilities.find((item) => item.id === id)?.name ?? id;
  const productName = (id: string) =>
    products.find((product) => product.id === id)?.name ?? id;
  const needle = productQuery.trim().toLowerCase();
  const candidates = productsInCategory(products, categoryId);
  const filtered = candidates
    .filter((product) => product.name.toLowerCase().includes(needle))
    .sort((a, b) => a.name.localeCompare(b.name));
  const matches = filtered.slice(0, 8);
  const matchCount = filtered.length;
  const category = categories.find((item) => item.id === categoryId);
  const availableUses = useCases.filter(
    (item) => !categoryId || item.categoryIds.includes(categoryId),
  );

  return (
    <div aria-busy={isPending}>
      {category ? (
        <Link
          href={`/categories/${category.slug}`}
          className="mb-4 inline-flex min-h-11 items-center text-sm text-primary underline"
        >
          Back to {category.name}
        </Link>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.id}
            type="button"
            variant="outline"
            size="sm"
            className="min-h-11 whitespace-normal text-left"
            disabled={isPending}
            onClick={() => applyPreset(preset)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      <div className="mt-4 max-w-md">
        <Label htmlFor="compare-category">Category</Label>
        <select
          id="compare-category"
          value={categoryId}
          disabled={isPending}
          onChange={(event) => {
            const id = event.target.value;
            const nextUse = useCases.find(
              (item) => !id || item.categoryIds.includes(id),
            );
            setProductQuery("");
            commit(nextUse?.id ?? "", [], id);
          }}
          className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-2 text-sm"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 max-w-md">
        <Label htmlFor="compare-use">Use case</Label>
        <select
          id="compare-use"
          disabled={isPending || availableUses.length === 0}
          value={useCaseId}
          onChange={(event) => {
            commit(event.target.value, selected);
          }}
          className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-2 text-sm"
        >
          {availableUses.length === 0 ? (
            <option value="">No mapped use case</option>
          ) : null}
          {availableUses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-4 text-sm text-muted-foreground" id="compare-help">
        Find products by name in the selected category (primary or adjacent
        membership). Choose up to four. Category membership is not evidence of a
        capability; missing evidence says Unknown. Changing category clears the
        selection.
      </p>
      <div className="mt-3 max-w-md" aria-describedby="compare-help">
        <Label htmlFor="compare-pick">Add a product</Label>
        <Input
          id="compare-pick"
          ref={productInput}
          aria-describedby="compare-help"
          type="search"
          value={productQuery}
          onChange={(event) => setProductQuery(event.target.value)}
          placeholder="Type a product name"
          className="mt-1 min-h-11 bg-background"
          aria-controls="compare-matches"
          autoComplete="off"
        />
        <p role="status" className="mt-2 text-xs text-muted-foreground">
          {isPending
            ? "Updating comparison…"
            : `${matchCount} matching products · ${selected.length} of 4 selected`}
        </p>
        <ul id="compare-matches" className="mt-2 space-y-2">
          {matches.length === 0 ? (
            <li className="text-sm text-muted-foreground">
              No products match this category and name.
              {needle ? (
                <Button
                  variant="outline"
                  className="ml-2 min-h-11"
                  onClick={() => setProductQuery("")}
                >
                  Clear search
                </Button>
              ) : null}
            </li>
          ) : null}
          {matches.map((product) => {
            const on = selected.includes(product.id);
            const disabled = !on && selected.length >= 4;
            return (
              <li key={product.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={disabled || isPending}
                  onClick={() => toggle(product.id)}
                  className="min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-left text-sm enabled:hover:bg-muted disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {on
                      ? "In the matrix"
                      : disabled
                        ? "Remove one to add this"
                        : "Add"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {matchCount > matches.length ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Type more of the name to narrow the list.
          </p>
        ) : null}
      </div>
      <ul
        className="mt-3 flex flex-wrap gap-2"
        aria-label="Products in the matrix"
      >
        {selected.map((id) => (
          <li key={id}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-11 whitespace-normal text-left"
              disabled={isPending}
              onClick={() => toggle(id)}
            >
              {productName(id)}
              <span className="text-xs text-muted-foreground">Remove</span>
            </Button>
          </li>
        ))}
      </ul>

      {!useCase ? (
        <p className="mt-6 rounded-lg border border-dashed p-4">
          No comparison use case is mapped to this category yet. Choose another
          category; no capability support is inferred.
        </p>
      ) : selected.length < 2 ? (
        <p className="mt-6 rounded-lg border border-dashed px-4 py-6 text-sm">
          Select at least two products. There is no overall ranking to show
          instead.
        </p>
      ) : (
        <div
          role="region"
          aria-label="Product capability comparison"
          tabIndex={0}
          className="relative mt-6 max-w-full overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <caption className="p-3 text-left text-sm text-muted-foreground">
              {useCase.name} · {asOf}. Inspect supporting sources in each cell;
              this is not a product ranking.
            </caption>
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="p-3 text-left font-semibold">
                  Capability
                </th>
                {selected.map((id) => (
                  <th
                    scope="col"
                    key={id}
                    className="p-3 text-left font-semibold"
                  >
                    {products.find((product) => product.id === id)?.name ?? id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.capabilityId}
                  className="border-t border-border align-top"
                >
                  <th scope="row" className="p-3 text-left font-medium">
                    {capabilityName(row.capabilityId)}
                  </th>
                  {selected.map((id) => {
                    const cell = row.cells[id];
                    return (
                      <td key={id} className="p-3">
                        <StatusPill status={cell.status} />
                        <p className="sr-only">
                          {cellStatusLabel(cell.status)}
                        </p>
                        <ComparisonEvidence
                          key={`${useCase.id}-${id}-${row.capabilityId}`}
                          cell={cell}
                          sources={sources}
                          productName={productName(id)}
                          capabilityName={capabilityName(row.capabilityId)}
                          asOf={asOf}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {useCase ? (
        <section className="mt-8">
          <h2 className="text-2xl">Questions to ask before you trust a cell</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
            {useCase.discoveryQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
