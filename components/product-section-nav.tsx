import Link from "next/link";

type SectionLink = { id: string; label: string };
export function ProductSectionNav({ sections }: { sections: readonly SectionLink[] }) {
  return (
    <nav aria-label="On this page" className="mt-6 lg:sticky lg:top-2 lg:z-10 rounded-xl border border-border bg-background/95 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
        {sections.map((section) => (
          <li key={section.id}>
            <Link href={`#${section.id}`} className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-md border border-border px-3 text-sm text-primary underline-offset-4 hover:bg-muted hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
