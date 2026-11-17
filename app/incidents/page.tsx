import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/chrome";
import { IncidentCardList } from "@/components/incident-card";
import { IncidentFeed, type CategoryVendors } from "@/components/incident-feed";
import { catalog, vendorById } from "@/lib/catalog";
import { incidentFeed } from "@/lib/incident-feed";

export const metadata = { title: "Incidents" };

export default function IncidentsPage() {
  const linkedCategoryIds = new Set(incidentFeed.flatMap((item) => item.categoryLinks.map((link) => link.categoryId)));
  const categories = catalog.categories
    .filter((category) => linkedCategoryIds.has(category.id))
    .map((category) => ({ id: category.id, label: category.name }));
  const vendorsByCategory: Record<string, CategoryVendors> = {};
  for (const category of catalog.categories.filter((item) => linkedCategoryIds.has(item.id))) {
    const vendorIds = [
      ...new Set(catalog.products.filter((product) => product.primaryCategoryIds.includes(category.id)).map((product) => product.vendorId)),
    ];
    const vendors = vendorIds.flatMap((id) => {
      const vendor = vendorById(id);
      return vendor ? [{ name: vendor.name, href: `/vendors/${vendor.slug}` }] : [];
    });
    if (vendors.length) {
      vendorsByCategory[category.id] = {
        label: category.name,
        href: `/categories/${category.slug}#category-products`,
        total: vendors.length,
        vendors: vendors.slice(0, 6),
      };
    }
  }
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
        <IncidentFeed feed={incidentFeed} categories={categories} vendorsByCategory={vendorsByCategory} />
      </Suspense>
    </main>
  );
}
