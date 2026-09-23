"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { StatusPill } from "@/components/chrome";
import { cellStatusLabel } from "@/lib/format";
import { compareProducts } from "@/lib/compare";
import type { Capability, Claim, Product, UseCase } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PRESETS: { id: string; label: string; useCaseId: string; productIds: string[] }[] = [
  {
    id: "iga",
    label: "C1, Opal, SailPoint, Saviynt",
    useCaseId: "uc-jml",
    productIds: ["c1-platform", "opal-platform", "sailpoint-isc", "saviynt-eic"],
  },
  {
    id: "platform",
    label: "Swap in Entra and Okta",
    useCaseId: "uc-jml",
    productIds: ["c1-platform", "opal-platform", "entra-id-governance", "okta-iga"],
  },
  {
    id: "agent",
    label: "Agent authorization",
    useCaseId: "uc-agent",
    productIds: ["c1-platform", "opal-zero", "entra-agent-id", "idira"],
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
    productIds: ["trufflehog", "github-secret-scanning", "gitguardian", "gitleaks"],
  },
];

export function CompareWorkbench({
  products,
  useCases,
  capabilities,
  claims,
  asOf,
  initialUseCase,
  initialProducts,
}: {
  products: Product[];
  useCases: UseCase[];
  capabilities: Capability[];
  claims: Claim[];
  asOf: string;
  initialUseCase: string;
  initialProducts: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [useCaseId, setUseCaseId] = useState(initialUseCase);
  const [selected, setSelected] = useState<string[]>(initialProducts.slice(0, 4));

  const useCase = useCases.find((item) => item.id === useCaseId) ?? useCases[0];

  function commit(nextUse: string, nextProducts: string[]) {
    const params = new URLSearchParams();
    params.set("use", nextUse);
    if (nextProducts.length) params.set("products", nextProducts.join(","));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggle(productId: string) {
    const next = selected.includes(productId)
      ? selected.filter((id) => id !== productId)
      : selected.length >= 4
        ? selected
        : [...selected, productId];
    setSelected(next);
    commit(useCaseId, next);
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setUseCaseId(preset.useCaseId);
    setSelected(preset.productIds);
    commit(preset.useCaseId, preset.productIds);
  }

  const rows = useMemo(
    () =>
      compareProducts({
        productIds: selected,
        capabilityIds: useCase.capabilityIds,
        claims,
        asOf,
      }),
    [selected, useCase, claims, asOf],
  );

  const capabilityName = (id: string) => capabilities.find((item) => item.id === id)?.name ?? id;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button key={preset.id} type="button" variant="outline" size="sm" onClick={() => applyPreset(preset)}>
            {preset.label}
          </Button>
        ))}
      </div>
      <div className="mt-4 max-w-md">
        <Label htmlFor="compare-use">Use case</Label>
        <select
          id="compare-use"
          value={useCase.id}
          onChange={(event) => {
            setUseCaseId(event.target.value);
            commit(event.target.value, selected);
          }}
          className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
        >
          {useCases.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-4 text-sm text-muted-foreground" id="compare-help">
        Choose two to four products. Four columns stay readable. Start with C1, Opal, SailPoint, and
        Saviynt, then swap Entra or Okta. Add Vault when the use case is secrets or NHI. A blank cell
        would be misleading, so missing evidence says Unknown.
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2" aria-describedby="compare-help">
        {products
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((product) => {
            const on = selected.includes(product.id);
            const disabled = !on && selected.length >= 4;
            return (
              <li key={product.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={disabled}
                  onClick={() => toggle(product.id)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-left text-sm enabled:hover:bg-muted disabled:opacity-50"
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {on ? "In the matrix" : disabled ? "Remove one to add this" : "Add"}
                  </span>
                </button>
              </li>
            );
          })}
      </ul>

      {selected.length < 2 ? (
        <p className="mt-6 rounded-lg border border-dashed px-4 py-6 text-sm">
          Select at least two products. There is no overall ranking to show instead.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 text-left font-semibold">Capability</th>
                {selected.map((id) => (
                  <th key={id} className="p-3 text-left font-semibold">
                    {products.find((product) => product.id === id)?.name ?? id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.capabilityId} className="border-t border-border align-top">
                  <th className="p-3 text-left font-medium">{capabilityName(row.capabilityId)}</th>
                  {selected.map((id) => {
                    const cell = row.cells[id];
                    return (
                      <td key={id} className="p-3">
                        <StatusPill status={cell.status} />
                        <p className="sr-only">{cellStatusLabel(cell.status)}</p>
                        {cell.claims.length === 0 ? (
                          <p className="mt-2 text-muted-foreground">Unknown. No sourced claim.</p>
                        ) : (
                          <ul className="mt-2 space-y-2">
                            {cell.claims.map((claim) => (
                              <li key={claim.id}>
                                <p>{claim.statement}</p>
                                <a className="text-primary underline-offset-4 hover:underline" href={claim.sourceUrl}>
                                  Source · {claim.lastCheckedAt}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-2xl">Questions to ask before you trust a cell</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
          {useCase.discoveryQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
