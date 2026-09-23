import Link from "next/link";
import type { Category } from "@/lib/schema";

const GROUPS: { id: Category["group"]; label: string; note: string }[] = [
  {
    id: "entry",
    label: "How someone gets in",
    note: "Workforce directory and customer auth are different buyers.",
  },
  {
    id: "governance",
    label: "How access is decided",
    note: "Reviews and privileged elevation answer different questions.",
  },
  {
    id: "credentials",
    label: "How the secret is handled",
    note: "Finding a key is not the same as issuing the next one.",
  },
  {
    id: "machines",
    label: "Who the machine is",
    note: "A service account and an agent both need an owner.",
  },
  {
    id: "detection",
    label: "What access exists, and what looks wrong",
    note: "Posture and detection sit beside governance.",
  },
  {
    id: "adjacent",
    label: "Budgets next door",
    note: "Useful context. Not an automatic IGA competitor.",
  },
];

export function CategoryMap({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {GROUPS.map((group) => (
        <section key={group.id} className="rounded-xl border border-border bg-card p-4" aria-label={group.label}>
          <h3 className="text-lg">{group.label}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{group.note}</p>
          <ul className="mt-3 space-y-2">
            {categories
              .filter((category) => category.group === group.id)
              .map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block rounded-md border border-transparent px-2 py-2 hover:border-border hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {category.buyerQuestion}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function FlowStrip({
  flow,
}: {
  flow: { actor: string; credential: string; permission: string; decision: string; action: string; evidence: string };
}) {
  const steps = [
    ["Actor", flow.actor],
    ["Credential", flow.credential],
    ["Permission", flow.permission],
    ["Decision", flow.decision],
    ["Action", flow.action],
    ["Evidence", flow.evidence],
  ];
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
      {steps.map(([label, body], index) => (
        <li key={label} className="rounded-lg border border-border bg-background p-3">
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">
            {index + 1}. {label}
          </span>
          <p className="mt-1 text-sm leading-5">{body}</p>
        </li>
      ))}
    </ol>
  );
}
