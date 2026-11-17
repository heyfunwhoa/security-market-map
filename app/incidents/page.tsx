import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/chrome";
import { IncidentCardList } from "@/components/incident-card";
import { IncidentFeed } from "@/components/incident-feed";
import { catalog } from "@/lib/catalog";
import { incidentFeed } from "@/lib/incident-feed";

export const metadata = { title: "Incidents" };

export default function IncidentsPage() {
  const linkedCategoryIds = new Set(incidentFeed.flatMap((item) => item.categoryLinks.map((link) => link.categoryId)));
  const categories = catalog.categories
    .filter((category) => linkedCategoryIds.has(category.id))
    .map((category) => ({ id: category.id, label: category.name }));
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }]} current="Incidents" />
      <PageIntro
        kicker="Security incidents"
        title="Incidents"
        lede="Publicly reported incidents that passed editorial review. Each one cites its sources, and gaps stay labelled as unknown. Candidate incidents still under review are not shown."
      />
      {/* The fallback is the full, unfiltered list so the first paint and no-JS readers get every card. */}
      <Suspense fallback={<div className="mt-8"><IncidentCardList items={incidentFeed} /></div>}>
        <IncidentFeed feed={incidentFeed} categories={categories} />
      </Suspense>
    </main>
  );
}
