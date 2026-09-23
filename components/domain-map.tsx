import Link from "next/link";
import type { Domain } from "@/lib/schema";

export function depthLabel(depth: Domain["depth"]): string {
  return depth === "evidenced" ? "Evidenced" : "Mapped";
}

export function DomainMap({ domains }: { domains: Domain[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {domains.map((domain) => (
        <li key={domain.id}>
          <Link
            href={`/domains/${domain.slug}`}
            className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="font-heading text-xl tracking-tight">{domain.name}</span>
              <span className="shrink-0 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium">
                {depthLabel(domain.depth)}
              </span>
            </span>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">{domain.charter}</span>
            <span className="mt-3 block text-xs text-muted-foreground">
              {domain.categoryIds.length} categories · {domain.typicalOwner}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
