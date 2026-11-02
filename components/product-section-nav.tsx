"use client";

type SectionLink = { id: string; label: string };

export function ProductSectionNav({ sections }: { sections: readonly SectionLink[] }) {
  return (
    <nav
      aria-label="On this page"
      className="mt-6 max-w-full min-w-0 rounded-xl border border-border bg-background/95 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:sticky lg:top-2 lg:z-10"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
      <ul className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
        {sections.map((section) => (
          <li key={section.id} className="shrink-0 lg:shrink">
            <a
              href={`#${section.id}`}
              onClick={(event) => {
                const target = document.getElementById(section.id);
                if (!target) return;
                event.preventDefault();
                const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                target.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
                target.focus({ preventScroll: true });
                history.pushState(null, "", `#${section.id}`);
              }}
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-md border border-border px-3 text-sm text-primary underline-offset-4 hover:bg-muted hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
