import Link from "next/link";
import type { SeedLink } from "@/lib/data/connections";

const FILLS = [
  "oklch(0.86 0.05 240)", "oklch(0.86 0.06 155)",
  "oklch(0.87 0.06 85)", "oklch(0.85 0.05 310)",
];
const nodeClass = "flex min-h-14 min-w-0 items-start gap-3 rounded-xl border border-border bg-background p-4 text-sm leading-6 [overflow-wrap:anywhere]";
const linkClass = "hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const gridClass = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-3";

/** Area membership is a grouping, not a competitive or capability relationship. */
export function AreaDiagram({ title, problem, href, examples, fill }: {
  title: string; problem: string; href: string | null; examples: SeedLink[]; fill?: string;
}) {
  return (
    <figure className="min-w-0 rounded-2xl border border-border bg-card p-4">
      <figcaption className="min-w-0 space-y-2 [overflow-wrap:anywhere]">
        {href ? <Link href={href} className={`inline-flex min-h-11 items-center rounded-sm font-heading text-lg ${linkClass}`}>{title}</Link> : <span className="block font-heading text-lg">{title}</span>}
        <p className="text-sm leading-6 text-muted-foreground">{problem}</p>
      </figcaption>
      <div className="my-4 h-1 rounded-full" style={{ backgroundColor: fill ?? FILLS[0] }} aria-hidden="true" />
      {examples.length ? <ul className={gridClass} aria-label={`Examples in ${title}`}>
        {examples.map((item, index) => <li key={`${item.label}-${index}`} className="min-w-0">
          {item.href ? <Link href={item.href} className={`${nodeClass} h-full ${linkClass}`}>
            <span className="mt-2 size-2 shrink-0 rounded-full" style={{ backgroundColor: FILLS[index % FILLS.length] }} aria-hidden="true" />
            <span className="min-w-0 font-medium">{item.label}</span>
          </Link> : <div className={`${nodeClass} h-full`}>
            <span className="min-w-0"><span className="block font-medium">{item.label}</span><span className="text-xs text-muted-foreground">Detail not yet seeded</span></span>
          </div>}
        </li>)}
      </ul> : <p className="text-sm text-muted-foreground">No examples recorded yet.</p>}
    </figure>
  );
}

export function IdentityStructureDiagram() {
  const kinds = [
    { label: "Human", href: "/categories/workforce-identity" },
    { label: "Non-human", href: "/categories/nhi" },
    { label: "AI agent", href: "/categories/agent-identity" },
  ];
  const jobs = [
    { label: "Discovery", href: "/categories/nhi" },
    { label: "Authentication", href: "/categories/workforce-identity" },
    { label: "Governance", href: "/categories/iga" },
    { label: "Lifecycle", href: "/use-cases/nhi-lifecycle" },
  ];
  return (
    <figure className="min-w-0 rounded-2xl border border-border bg-card p-4">
      <figcaption className="text-sm leading-6 text-muted-foreground">Human, machine, and agent identities share the same four jobs. These are responsibilities, not separate products.</figcaption>
      <p className="mb-3 mt-4 text-sm font-semibold">Identity types</p>
      <ul className={gridClass} aria-label="Identity types">{kinds.map((kind) => <li key={kind.label} className="min-w-0"><Link href={kind.href} className={`${nodeClass} ${linkClass}`}>{kind.label}</Link></li>)}</ul>
      <div className="my-4 border-l-2 border-primary pl-4"><p className="text-sm font-medium">Each identity type needs all four jobs below</p></div>
      <ul className={gridClass} aria-label="Shared identity jobs">{jobs.map((job) => <li key={job.label} className="min-w-0"><Link href={job.href} className={`${nodeClass} ${linkClass}`}>{job.label}</Link></li>)}</ul>
    </figure>
  );
}

export function CredentialChainDiagram({ steps }: {
  steps: { problem: string; capability: string; href: string }[];
}) {
  return (
    <figure className="min-w-0 rounded-2xl border border-border bg-card p-4">
      <figcaption className="text-sm leading-6 text-muted-foreground">Follow the numbered sequence. Each step is a different job created by one exposed credential.</figcaption>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Jobs created by an exposed credential">
        {steps.map((step, index) => <li key={`${step.capability}-${index}`} className="min-w-0">
          <Link href={step.href} className={`${nodeClass} h-full ${linkClass}`}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-semibold" aria-hidden="true">{index + 1}</span>
            <span className="min-w-0"><span className="block font-medium"><span className="sr-only">Step {index + 1}: </span>{step.capability}</span><span className="mt-1 block text-muted-foreground">{step.problem}</span></span>
          </Link>
        </li>)}
      </ol>
    </figure>
  );
}
