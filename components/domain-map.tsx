import Link from "next/link";
import { charterLead, domainStatusLabel } from "@/lib/domain-evidence";
import type { Domain } from "@/lib/schema";
import { cn } from "@/lib/utils";

function claimLine(depth: Domain["depth"], count: number): string {
  const noun = count === 1 ? "claim" : "claims";
  return depth === "evidenced" ? `${count} ${noun}` : `${count} ${noun} so far`;
}

export function DomainMap({
  domains,
  claimCounts,
  highlightIds,
}: {
  domains: Domain[];
  claimCounts?: Record<string, number>;
  highlightIds?: readonly string[];
}) {
  const highlighting = highlightIds != null && highlightIds.length > 0;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {domains.map((domain) => {
        const highlighted = highlighting && highlightIds.includes(domain.id);
        return (
          <li key={domain.id}>
            <Link
              href={`/domains/${domain.slug}`}
              data-highlighted={highlighted || undefined}
              className={cn(
                "block h-full rounded-xl border bg-card p-4 transition-shadow hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                highlighted ? "border-primary ring-2 ring-primary/40" : "border-border",
              )}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-heading text-lg leading-snug tracking-tight">{domain.name}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium",
                    domain.depth === "evidenced"
                      ? "border-emerald-700/20 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-950 dark:text-emerald-100"
                      : "border-border bg-background",
                  )}
                >
                  {domainStatusLabel(domain.depth)}
                </span>
              </span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{charterLead(domain.charter)}</span>
              <span className="mt-3 block text-xs text-muted-foreground">
                {claimCounts ? `${claimLine(domain.depth, claimCounts[domain.id] ?? 0)} · ` : ""}
                {domain.categoryIds.length} categories
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
