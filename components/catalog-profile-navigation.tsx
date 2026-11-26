"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { readCatalogReturn, withCatalogReturn } from "@/lib/landscape-filters";

type Crumb = { href: string; label: string };
type RenderWithOrigin = (origin: string | null) => ReactNode;

function CatalogOrigin({ render }: { render: RenderWithOrigin }) {
  return render(readCatalogReturn(useSearchParams().get("from")));
}

// Direct profile links and breadcrumbs remain available in the static HTML.
function WithCatalogOrigin({ render }: { render: RenderWithOrigin }) {
  return <Suspense fallback={render(null)}><CatalogOrigin render={render} /></Suspense>;
}

export function ProfileBreadcrumbs({ current, category, catalogFallback }: {
  current: string; category?: Crumb; catalogFallback?: Crumb;
}) {
  return <WithCatalogOrigin render={(origin) => {
    const parents = [{ href: "/", label: "Home" }];
    const catalog = origin ? { href: origin, label: "Back to results" } : catalogFallback;
    if (catalog) parents.push(catalog);
    if (category) parents.push(category);
    return <Breadcrumbs parents={parents} current={current} />;
  }} />;
}

export function ProfileLink({ href, className, children }: {
  href: string; className: string; children: ReactNode;
}) {
  return <WithCatalogOrigin render={(origin) =>
    <Link href={origin ? withCatalogReturn(href, origin) : href} className={className}>{children}</Link>
  } />;
}
