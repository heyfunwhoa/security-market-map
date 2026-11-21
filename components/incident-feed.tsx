"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CopyTalkTrack } from "@/components/copy-talk-track";
import { IncidentCardList } from "@/components/incident-card";
import { cn } from "@/lib/utils";
import {
  ecosystemLabel,
  filterIncidents,
  industryLabel,
  INCIDENT_KIND_LABELS,
  incidentFilterUrl,
  NO_INCIDENT_FILTERS,
  readIncidentFilters,
  talkTracksDocument,
  type FeedIncident,
  type IncidentFilters,
} from "@/lib/incident-feed";

const MAX_BUTTON_OPTIONS = 6;

function FilterGroup({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const selectId = useId();
  // Short lists stay one-tap buttons; longer ones become a dropdown so the filter bar
  // stays scannable as the catalog grows (same native select as the landscape filters).
  if (options.length > MAX_BUTTON_OPTIONS) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={selectId} className="mr-1 text-sm font-semibold">
          {legend}:
        </label>
        <select
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-11 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-9 sm:w-auto"
        >
          <option value="all">All</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{legend}</legend>
      <span aria-hidden="true" className="mr-1 text-sm font-semibold">{legend}:</span>
      {[{ id: "all", label: "All" }, ...options].map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "min-h-11 rounded-full border border-border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-9",
            value === option.id ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted",
          )}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}

export type CategoryVendors = { label: string; href: string; total: number; vendors: { name: string; href: string }[] };

export function IncidentFeed({
  feed,
  categories,
  vendorsByCategory = {},
}: {
  feed: FeedIncident[];
  /** Only categories with at least one reviewed incident link. */
  categories: { id: string; label: string }[];
  /** Primary vendors per category, shown for call prep when a category is selected. */
  vendorsByCategory?: Record<string, CategoryVendors>;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const panelId = useId();
  const searchParams = useSearchParams();
  const filters = readIncidentFilters(searchParams, feed);
  const visible = filterIncidents(feed, filters);
  const navigate = (next: IncidentFilters) => {
    const url = incidentFilterUrl(next);
    if (url !== window.location.pathname + window.location.search) window.history.pushState(null, "", url);
  };
  const kinds = Object.entries(INCIDENT_KIND_LABELS)
    .filter(([id]) => feed.some((item) => item.incident.kind === id))
    .map(([id, label]) => ({ id, label }));
  const ecosystems = [...new Set(feed.flatMap((item) => item.incident.affectedEcosystems))]
    .sort()
    .map((id) => ({ id, label: ecosystemLabel(id) }));
  const industries = [...new Set(feed.flatMap((item) => item.industries))]
    .sort()
    .map((id) => ({ id, label: industryLabel(id) }));
  const activeCount = [filters.kind, filters.ecosystem, filters.category, filters.industry].filter((value) => value !== "all").length;
  const active = activeCount > 0;
  const prepVendors = filters.category !== "all" ? vendorsByCategory[filters.category] : undefined;

  return (
    <section aria-label="Incident feed" className="mt-8">
      <div className="space-y-3 rounded-xl border border-border p-4">
        {/* On phones the filters fold behind one button so the first incident stays in view. */}
        <button
          type="button"
          aria-expanded={filtersOpen}
          aria-controls={panelId}
          onClick={() => setFiltersOpen((open) => !open)}
          className="min-h-11 w-full rounded-md border border-border px-3 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:hidden"
        >
          {filtersOpen ? "Hide filters" : "Filters"}
          {activeCount > 0 && ` (${activeCount} on)`}
        </button>
        <div id={panelId} className={cn("space-y-3", filtersOpen ? "block" : "hidden", "sm:block")}>
        <FilterGroup legend="Type" value={filters.kind} options={kinds} onChange={(kind) => navigate({ ...filters, kind })} />
        <FilterGroup
          legend="Ecosystem"
          value={filters.ecosystem}
          options={ecosystems}
          onChange={(ecosystem) => navigate({ ...filters, ecosystem })}
        />
        {categories.length > 0 && (
          <FilterGroup
            legend="Market category"
            value={filters.category}
            options={categories}
            onChange={(category) => navigate({ ...filters, category })}
          />
        )}
        {industries.length > 0 && (
          <FilterGroup
            legend="Industry"
            value={filters.industry}
            options={industries}
            onChange={(industry) => navigate({ ...filters, industry })}
          />
        )}
        </div>
        <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span role="status">
            {visible.length} of {feed.length} reviewed incident{feed.length === 1 ? "" : "s"}
          </span>
          {visible.some((item) => item.salesNote) && (
            <CopyTalkTrack
              text={talkTracksDocument(visible)}
              label={`Copy all ${visible.filter((item) => item.salesNote).length} talk tracks`}
              copiedMessage="Copied, each with its source."
            />
          )}
          {active && (
            <button
              type="button"
              onClick={() => navigate(NO_INCIDENT_FILTERS)}
              className="rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Clear filters
            </button>
          )}
        </p>
        {prepVendors && (
          <div className="border-t border-border pt-3 text-sm">
            <p>
              <span className="font-semibold">Vendors in {prepVendors.label}: </span>
              {prepVendors.vendors.map((vendor, index) => (
                <span key={vendor.href}>
                  {index > 0 && ", "}
                  <Link href={vendor.href} className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">
                    {vendor.name}
                  </Link>
                </span>
              ))}
              {prepVendors.total > prepVendors.vendors.length && (
                <>
                  {" "}
                  <Link href={prepVendors.href} className="rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">
                    and {prepVendors.total - prepVendors.vendors.length} more
                  </Link>
                </>
              )}
            </p>
            <p className="mt-1 text-muted-foreground">
              Listed in this category on the map. Being listed doesn&apos;t mean a product would have prevented these incidents.
            </p>
          </div>
        )}
      </div>
      {visible.length ? (
        <IncidentCardList items={visible} />
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-border p-6 text-sm">
          No reviewed incidents match these filters. This means none have been reviewed yet, not that none happened.
        </p>
      )}
    </section>
  );
}
