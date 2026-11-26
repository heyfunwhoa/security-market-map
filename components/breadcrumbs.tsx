import Link from "next/link";

type BreadcrumbLink = { href: string; label: string };

export function Breadcrumbs({ parents, current, domains = [] }: { parents: BreadcrumbLink[]; current: string; domains?: BreadcrumbLink[] }) {
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
        {domains.length > 0 && <li className="flex min-w-0 flex-wrap items-center gap-x-2">
          <span className="sr-only">{domains.length === 1 ? "Domain" : "Domains"}</span>
          {domains.map((domain, index) => <span key={domain.href} className="inline-flex items-center gap-x-2">
            {index > 0 && <span aria-hidden="true">·</span>}
            <Link href={domain.href} className="inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">{domain.label}</Link>
          </span>)}
          <span aria-hidden="true">/</span>
        </li>}
        <li className="min-w-0 break-words text-foreground" aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
