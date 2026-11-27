"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ANSWER_LABELS, readableStatus, TRUST_TONES, trustLabel } from "@/lib/evidence-labels";
import type { AliasGroups, SearchHit } from "@/lib/search";
import { SearchCommand } from "@/components/search-panel";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

/**
 * Menu groups are named for what a visitor is trying to do (UX audit item 1).
 * Every page keeps its address; only the grouping and order changed.
 */
const NAV_GROUPS = [
  { title: "Explore the market", links: [
    { href: "/domains", label: "Explore domains", description: "Start with broad security areas and their categories." },
    { href: "/categories", label: "Categories A–Z", description: "Find a category by name or acronym and see its domains." },
    { href: "/landscape", label: "Browse products", description: "Filter vendors and products, inspect details, and build a shortlist." },
    { href: "/use-cases", label: "Use cases", description: "Browse the problems buyers are evaluating." },
    { href: "/compare", label: "Compare evidence", description: "Compare product evidence for a specific use case." },
  ] },
  { title: "Prepare a conversation", links: [
    { href: "/personas", label: "Buyer seats", description: "Who buys, uses, approves, and blocks, with pains and titles." },
    { href: "/territory", label: "Territory planning", description: "Organize account and territory research." },
    { href: "/budget", label: "Budget worksheet", description: "Work through price signals and budget assumptions." },
  ] },
  { title: "Research", links: [
    { href: "/incidents", label: "Incidents", description: "Reviewed, sourced security incidents with talk tracks." },
    { href: "/learn", label: "Concepts & scenarios", description: "Understand terminology and practical scenarios." },
    { href: "/connections", label: "How tools connect", description: "Explore identity, secrets, and adjacent security jobs." },
    { href: "/evidence-graph", label: "Evidence graph", description: "Inspect sourced identity, secrets, and non-human identity relationships." },
    { href: "/attack-path", label: "Attack paths", description: "Follow how an exposure can lead to an attack." },
    { href: "/control-map", label: "Security controls", description: "Explore the controls that address security problems." },
    { href: "/frameworks", label: "Frameworks", description: "Connect security concepts to framework guidance." },
    { href: "/methodology", label: "Methodology", description: "How evidence, status labels, and Unknown work on this map." },
    { href: "/sources", label: "Sources & references", description: "Inspect the references behind the research." },
    { href: "/about", label: "About", description: "Who maintains the map and what it is for." },
  ] },
];

/** The four pages shown in the desktop header: domain directory, products, use cases, and comparisons. */
const HEADER_HREFS = ["/domains", "/landscape", "/use-cases", "/compare"];
export const HEADER_LINKS = HEADER_HREFS.map((href) => NAV_GROUPS.flatMap((group) => group.links).find((link) => link.href === href)!);
export const NAV_GROUP_TITLES = NAV_GROUPS.map((group) => group.title);
export const NAV_HREFS = NAV_GROUPS.flatMap((group) => group.links.map((link) => link.href));

const navLinkClass = "inline-flex min-h-11 items-center rounded-md px-3 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteHeader({ hits, aliases = [], asOf, profileComparisons }: { hits: SearchHit[]; aliases?: AliasGroups; asOf: string; profileComparisons: Record<string, string> }) {
  const pathname = usePathname();
  const destination = (href: string) => href === "/compare" ? profileComparisons[pathname] ?? href : href;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <header data-site-chrome className="relative z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link href="/" aria-label="Security Market Map home" className="min-w-0 flex-1 rounded-sm py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <span className="block font-heading text-lg leading-snug tracking-tight">Security Market Map</span>
          <span className="block text-xs text-muted-foreground">Research notes · as of {formatDate(asOf)}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {HEADER_LINKS.map((link) => <Link key={link.href} href={destination(link.href)} aria-current={pathname === link.href ? "page" : undefined} className={cn(navLinkClass, isActive(link.href) ? "bg-muted font-semibold" : "text-muted-foreground")}>{link.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <SearchCommand hits={hits} aliases={aliases} />
          <Sheet>
            <SheetTrigger className={`${navLinkClass} gap-2 border border-border`}>
              <Menu className="size-4" aria-hidden="true" />Menu
            </SheetTrigger>
            <SheetContent showCloseButton={false} className="data-[side=right]:w-full data-[side=right]:sm:max-w-lg overflow-y-auto overscroll-contain motion-reduce:animate-none motion-reduce:transition-none">
              <SheetHeader className="border-b border-border p-5">
                <div className="flex items-center justify-between gap-3"><SheetTitle className="text-xl">Explore the map</SheetTitle><SheetClose className={`${navLinkClass} border border-border`}>Close</SheetClose></div>
                <SheetDescription>Explore the market, compare products, prepare a conversation, or look up research.</SheetDescription>
              </SheetHeader>
              <nav aria-label="All pages" className="space-y-6 px-5 pb-6">
                <SheetClose asChild><Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`${navLinkClass} border border-border`}>Home overview</Link></SheetClose>
                {NAV_GROUPS.map((group) => <section key={group.title} aria-label={group.title}>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.title}</h2>
                  <ul className="space-y-1">{group.links.map((link) => <li key={link.href}>
                    <SheetClose asChild><Link href={destination(link.href)} aria-current={pathname === link.href ? "page" : undefined} className={cn("block min-h-11 rounded-lg p-3 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", isActive(link.href) && "bg-muted")}>
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

export function SiteFooter({ asOf }: { asOf: string }) {
  return (
    <footer data-site-chrome className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Independent research notes. Not an official Gartner, Forrester, IDC, SACR, or vendor classification,
          and not a ranking.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/methodology" className="underline underline-offset-4 hover:text-foreground">Methodology</Link>
          <Link href="/about" className="underline underline-offset-4 hover:text-foreground">About</Link>
          <span>As of {formatDate(asOf)}</span>
        </p>
      </div>
    </footer>
  );
}

const PILL_LABELS: Record<string, string> = {
  taxonomy_mapping: "Taxonomy mapping",
  catalog_structure: "Catalog structure",
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
  news: "News coverage",
  legal_summary: "Legal summary",
  academic: "Academic research",
  direct_competitor: "Direct competitor",
  bundled_alternative: "Bundled alternative",
  complement: "Complement",
  adjacent_budget: "Adjacent budget",
  seed_reviewed: "Seed reviewed",
  approved: "Reviewed",
  reported: "Reported",
  observed: "Observed",
  draft: "Draft",
  reviewed: "Reviewed",
  not_evaluated: "Not evaluated",
  recheck_due: "Recheck due",
};

/** Trust labels first (lib/evidence-labels.ts), then compare-grid answers, then neutral pills. */
export function pillLabel(status: string): string {
  return trustLabel(status) ?? ANSWER_LABELS[status]?.label ?? PILL_LABELS[status] ?? readableStatus(status);
}

export function StatusPill({ status }: { status: string }) {
  // Trust statuses share one label and tone (lib/evidence-labels.ts). Everything else is neutral.
  const trust = trustLabel(status);
  const answer = ANSWER_LABELS[status];
  const tone = trust ? TRUST_TONES[trust] : (answer?.tone ?? "border-stone-300 bg-transparent text-stone-700 dark:border-stone-600 dark:text-stone-200");
  const label = pillLabel(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        tone,
      )}
    >
      {label}
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
