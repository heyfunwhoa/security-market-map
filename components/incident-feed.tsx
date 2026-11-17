"use client";

import { useId } from "react";
import { useSearchParams } from "next/navigation";
import { CopyTalkTrack } from "@/components/copy-talk-track";
import { IncidentCardList } from "@/components/incident-card";
import { cn } from "@/lib/utils";
import {
  ecosystemLabel,
  filterIncidents,
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

export function IncidentFeed({
  feed,
  categories,
}: {
  feed: FeedIncident[];
  /** Only categories with at least one reviewed incident link. */
  categories: { id: string; label: string }[];
}) {
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
  const active = filters.kind !== "all" || filters.ecosystem !== "all" || filters.category !== "all";

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
        {categories.length > 0 && (
          <FilterGroup
            legend="Market category"
            value={filters.category}
            options={categories}
            onChange={(category) => navigate({ ...filters, category })}
          />
        )}
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
