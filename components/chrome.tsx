"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AS_OF } from "@/lib/schema";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/domains", label: "Domains" },
  { href: "/attack-path", label: "Attack path" },
  { href: "/control-map", label: "Controls" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/connections", label: "Connections" },
  { href: "/learn", label: "Learn" },
  { href: "/landscape", label: "Landscape" },
  { href: "/compare", label: "Compare" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/budget", label: "Budget" },
  { href: "/territory", label: "Territory" },
  { href: "/sources", label: "Sources" },
];

function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav className={className} aria-label="Primary">
      {LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "bg-muted font-semibold text-foreground" : "text-muted-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const seenPath = useRef(pathname);

  useEffect(() => {
    if (seenPath.current === pathname) return;
    seenPath.current = pathname;
    const menu = document.getElementById("site-menu");
    if (menu instanceof HTMLDetailsElement) menu.open = false;
  }, [pathname]);

  return (
    <header className="relative z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="min-w-0">
          <span className="block font-heading text-lg leading-none tracking-tight">
            Security Market Map
          </span>
          <span className="text-xs text-muted-foreground">
            Analyst coverage · as of {formatDate(AS_OF)}
          </span>
        </Link>
        <NavLinks className="ml-auto hidden items-center gap-0.5 lg:flex" />
        <details id="site-menu" className="ml-auto lg:hidden">
          <summary
            aria-label="Open menu"
            aria-controls="mobile-nav"
            className="flex size-8 cursor-pointer list-none items-center justify-center rounded-lg border border-border bg-background [&::-webkit-details-marker]:hidden"
          >
            <Menu className="menu-open size-4" />
            <X className="menu-close size-4" />
          </summary>
          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="absolute top-full right-0 left-0 z-50 border-t border-border bg-background px-4 py-2 shadow-lg"
          >
            {LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block border-b border-border px-1 py-3 text-base last:border-b-0",
                    active ? "font-semibold text-foreground" : "text-foreground",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </details>
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
  verified: "Verified",
  vendor_published: "Vendor-published",
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
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">{kicker}</p>
      <h1 className="mt-2 text-3xl tracking-tight text-balance sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground">{lede}</p>
    </header>
  );
}
