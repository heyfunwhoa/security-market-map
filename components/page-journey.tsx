import Link from "next/link";

export function PageJourney({ steps, back }: {
  steps: { href: string; title: string; description: string }[];
  back: { href: string; label: string };
}) {
  return <nav aria-label="Explore this page" className="mt-6 rounded-xl border border-border bg-card p-4">
    <p className="font-semibold">Choose where to start</p>
    <ol className="mt-3 grid gap-3 md:grid-cols-3">
      {steps.map((step, index) => <li key={step.href} className="min-w-0">
        <a href={step.href} className="block h-full min-h-11 rounded-lg border border-border p-3 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [overflow-wrap:anywhere]">
          <span className="font-medium">{index + 1}. {step.title}</span>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">{step.description}</span>
        </a>
      </li>)}
    </ol>
    <Link href={back.href} className="mt-3 inline-flex min-h-11 items-center rounded-sm text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{back.label}</Link>
  </nav>;
}
