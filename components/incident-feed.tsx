"use client";

import { useSearchParams } from "next/navigation";
import { IncidentCardList } from "@/components/incident-card";
import { cn } from "@/lib/utils";
import {
  ecosystemLabel,
  filterIncidents,
  INCIDENT_KIND_LABELS,
  incidentFilterUrl,
  readIncidentFilters,
  type FeedIncident,
  type IncidentFilters,
} from "@/lib/incident-feed";

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

export function IncidentFeed({ feed }: { feed: FeedIncident[] }) {
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
  const active = filters.kind !== "all" || filters.ecosystem !== "all";

  return (
    <section aria-label="Incident feed" className="mt-8">
      <div className="space-y-3 rounded-xl border border-border p-4">
        <FilterGroup legend="Type" value={filters.kind} options={kinds} onChange={(kind) => navigate({ ...filters, kind })} />
        <FilterGroup
          legend="Ecosystem"
          value={filters.ecosystem}
          options={ecosystems}
          onChange={(ecosystem) => navigate({ ...filters, ecosystem })}
        />
        <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span role="status">
            {visible.length} of {feed.length} reviewed incident{feed.length === 1 ? "" : "s"}
          </span>
          {active && (
            <button
              type="button"
              onClick={() => navigate({ kind: "all", ecosystem: "all" })}
              className="rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Clear filters
            </button>
          )}
        </p>
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
