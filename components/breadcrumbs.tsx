import Link from "next/link";

type BreadcrumbLink = { href: string; label: string };

export function Breadcrumbs({ parents, current }: { parents: BreadcrumbLink[]; current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {parents.map((parent) => (
          <li key={parent.href} className="flex min-w-0 items-center gap-2">
            <Link
              href={parent.href}
              className="inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {parent.label}
            </Link>
            <span aria-hidden="true">/</span>
          </li>
        ))}
        <li className="min-w-0 break-words text-foreground" aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
