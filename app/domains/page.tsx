import { DomainMap } from "@/components/domain-map";
import { PageIntro } from "@/components/chrome";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Domains" };

export default function DomainsPage() {
  const evidenced = catalog.domains.filter((domain) => domain.depth === "evidenced");
  const mapped = catalog.domains.filter((domain) => domain.depth === "mapped");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Domains"
        title="The security estate, with coverage depth written on the map"
        lede="Identity is the evidenced slice: claims, dates, and Unknown cells. Corporate IT, application security, product security, cloud, data, operations, GRC, validation, and platform are mapped. A mapped domain names the buyer and the neighboring budget. It does not check a feature."
      />
      <p className="mt-6 text-sm text-muted-foreground">
        {evidenced.length} evidenced · {mapped.length} mapped · {catalog.categories.length} categories
      </p>
      <div className="mt-6">
        <DomainMap domains={catalog.domains} />
      </div>
    </main>
  );
}
