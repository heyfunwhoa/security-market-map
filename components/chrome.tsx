"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AS_OF } from "@/lib/schema";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { SearchHit } from "@/lib/search";
import { SearchCommand } from "@/components/search-panel";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

const NAV_GROUPS = [
  { title: "Explore", links: [
    { href: "/domains", label: "Explore domains", description: "Start with broad security areas and their categories." },
    { href: "/landscape", label: "Browse products", description: "Filter vendors and products, inspect details, and build a shortlist." },
    { href: "/compare", label: "Compare", description: "Compare product evidence for a specific use case." },
    { href: "/use-cases", label: "Buyer use cases", description: "Start with the problem you need to solve." },
  ] },
  { title: "Learn", links: [
    { href: "/learn", label: "Concepts & glossary", description: "Understand terminology and practical scenarios." },
    { href: "/connections", label: "How tools connect", description: "Explore identity, secrets, and adjacent security jobs." },
    { href: "/attack-path", label: "Attack paths", description: "Follow how an exposure can lead to an attack." },
    { href: "/control-map", label: "Security controls", description: "Explore the controls that address security problems." },
    { href: "/frameworks", label: "Frameworks", description: "Connect security concepts to framework guidance." },
  ] },
  { title: "Plan", links: [
    { href: "/budget", label: "Budget worksheet", description: "Work through price signals and budget assumptions." },
    { href: "/territory", label: "Territory planning", description: "Organize account and territory research." },
  ] },
  { title: "Research", links: [
    { href: "/sources", label: "Sources & references", description: "Inspect the references behind the research." },
  ] },
];

const navLinkClass = "inline-flex min-h-11 items-center rounded-md px-3 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteHeader({ hits }: { hits: SearchHit[] }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <header className="relative z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link href="/" aria-label="Security Market Map home" className="min-w-0 flex-1 rounded-sm py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <span className="block font-heading text-lg leading-snug tracking-tight">Security Market Map</span>
          <span className="block text-xs text-muted-foreground">Research notes · as of {formatDate(AS_OF)}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {NAV_GROUPS[0].links.slice(0, 3).map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={cn(navLinkClass, isActive(link.href) ? "bg-muted font-semibold" : "text-muted-foreground")}>{link.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <SearchCommand hits={hits} />
          <Sheet>
            <SheetTrigger className={`${navLinkClass} gap-2 border border-border`}>
              <Menu className="size-4" aria-hidden="true" />Menu
            </SheetTrigger>
            <SheetContent showCloseButton={false} className="data-[side=right]:w-full data-[side=right]:sm:max-w-lg overflow-y-auto overscroll-contain motion-reduce:animate-none motion-reduce:transition-none">
              <SheetHeader className="border-b border-border p-5">
                <div className="flex items-center justify-between gap-3"><SheetTitle className="text-xl">Explore the map</SheetTitle><SheetClose className={`${navLinkClass} border border-border`}>Close</SheetClose></div>
                <SheetDescription>Browse tools, understand the concepts, or inspect the research.</SheetDescription>
              </SheetHeader>
              <nav aria-label="All pages" className="space-y-6 px-5 pb-6">
                <SheetClose asChild><Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`${navLinkClass} border border-border`}>Home overview</Link></SheetClose>
                {NAV_GROUPS.map((group) => <section key={group.title} aria-label={group.title}>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.title}</h2>
                  <ul className="space-y-1">{group.links.map((link) => <li key={link.href}>
                    <SheetClose asChild><Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={cn("block min-h-11 rounded-lg p-3 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", isActive(link.href) && "bg-muted")}>
                      <span className="block font-medium">{link.label}{pathname === link.href && <span className="ml-2 text-xs text-muted-foreground">Current page</span>}</span>
                      <span className="mt-1 block text-sm leading-5 text-muted-foreground">{link.description}</span>
                    </Link></SheetClose>
                  </li>)}</ul>
                </section>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Independent research notes. Not an official Gartner, Forrester, IDC, SACR, or vendor classification,
          and not a ranking.
        </p>
        <p>As of {formatDate(AS_OF)}</p>
      </div>
    </footer>
  );
}

const PILL_LABELS: Record<string, string> = {
  verified: "Independent source",
  vendor_published: "Vendor said this",
  needs_review: "Needs review",
  conflicting: "Conflicting",
  superseded: "Superseded",
  research_candidate: "Research candidate",
  evidenced: "Evidence",
  limited: "Scoped",
  unverified: "Unverified",
  unknown: "Unknown",
  not_supported: "Not supported",
  announced: "Announced",
  generally_available: "Documented",
  legacy_name: "Name in transition",
  official_docs: "Official docs",
  vendor_marketing: "Vendor marketing",
  press_release: "Press release",
  customer_story: "Customer story",
  analyst: "Analyst",
  review: "Review",
  standard: "Standard",
  internal_note: "Internal note",
  direct_competitor: "Direct competitor",
  bundled_alternative: "Bundled alternative",
  complement: "Complement",
  adjacent_budget: "Adjacent budget",
};

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "verified" || status === "evidenced" || status === "generally_available"
      ? "border-emerald-700/20 bg-emerald-50 text-emerald-950"
      : status === "vendor_published" || status === "limited" || status === "official_docs"
        ? "border-sky-800/15 bg-sky-50 text-sky-950"
        : status === "needs_review" ||
            status === "unverified" ||
            status === "announced" ||
            status === "internal_note"
          ? "border-amber-800/20 bg-amber-50 text-amber-950"
          : status === "conflicting" || status === "not_supported"
            ? "border-rose-800/20 bg-rose-50 text-rose-950"
            : "border-stone-300 bg-stone-100 text-stone-700";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        tone,
      )}
    >
      {PILL_LABELS[status] ?? status}
    </span>
  );
}

export function PageIntro({
  id,
  kicker,
  title,
  lede,
}: {
  id?: string;
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">{kicker}</p>
      <h1 id={id} tabIndex={id ? -1 : undefined} className="mt-2 text-3xl tracking-tight text-balance sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground">{lede}</p>
    </header>
  );
}
