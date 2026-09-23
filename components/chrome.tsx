"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AS_OF } from "@/lib/schema";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/domains", label: "Domains" },
  { href: "/learn", label: "Learn" },
  { href: "/landscape", label: "Landscape" },
  { href: "/compare", label: "Compare" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/budget", label: "Budget" },
  { href: "/territory", label: "Territory" },
  { href: "/sources", label: "Sources" },
];

function NavLinks({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();
  return (
    <nav className={className} aria-label="Primary">
      {LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
          <span className="block font-heading text-lg leading-none tracking-tight">
            Security Atlas
          </span>
          <span className="text-xs text-muted-foreground">
            Analyst coverage · as of {formatDate(AS_OF)}
          </span>
        </Link>
        <NavLinks className="ml-auto hidden items-center gap-0.5 lg:flex" />
        <button
          type="button"
          className="ml-auto inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-border px-4 py-3 lg:hidden">
          <p className="px-2.5 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Security Atlas
          </p>
          <NavLinks
            onNavigate={() => setOpen(false)}
            className="flex flex-col gap-1"
          />
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Seeded research for a cybersecurity analyst. Not a certification and not a ranking.</p>
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
