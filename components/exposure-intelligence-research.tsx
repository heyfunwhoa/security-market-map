import Link from "next/link";
import type { ReactNode } from "react";
import { vendorById } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import { PublicSecretMonitoring } from "@/components/public-secret-monitoring";
import research from "@/research/easm-cti.json";

const textLink = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const entries = "divide-y divide-border";
const entry = "space-y-2 py-3 text-sm leading-6";

function Sources({ urls }: { urls: string[] }) {
  return (
    <ul aria-label="Original sources" className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {urls.map((url, index) => (
        <li key={url}>
          <a className={textLink} href={url}>
            Source {index + 1} · {new URL(url).hostname.replace(/^www\./, "")}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ResearchGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="min-w-0 rounded-lg border border-border px-4">
      <summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        {title}
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}

export function hasExposureIntelligenceResearch(categoryId: string): categoryId is keyof typeof research.markets {
  return Object.hasOwn(research.markets, categoryId);
}

export function ExposureIntelligenceResearch({ categoryId }: { categoryId: string }) {
  if (!hasExposureIntelligenceResearch(categoryId)) return null;
  const market = research.markets[categoryId];
  const otherId = categoryId === "external-attack-surface" ? "threat-intelligence" : "external-attack-surface";
  const count = market.groups.reduce((total, group) => total + group.offerings.length, 0);
  const inMarket = (item: { market: string }) => item.market === market.abbreviation || item.market === "Both";
  return (
    <section className="mt-8 space-y-4" aria-labelledby="market-research">
      <h2 id="market-research" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">
        {market.abbreviation} market map and buyer guide
      </h2>
      <p className="max-w-3xl text-sm text-muted-foreground">
        Candidate research · {formatDate(research.reviewedOn)} · {count} offerings.
        Vendors describe the products. The market map proposes the buyer groups and evaluation questions.
      </p>
      <p className="max-w-3xl leading-7">{market.intro}</p>
      <p className="max-w-3xl text-sm leading-6"><strong>Ask the buyer. </strong>{market.discoveryQuestion}</p>
      <PublicSecretMonitoring categoryId={categoryId} />
      <h3 className="text-lg">Companies by buyer need</h3>
      <div className="space-y-2">
        {market.groups.map((group) => (
          <ResearchGroup key={group.need} title={group.need + " (" + group.offerings.length + ")"}>
            <p className="mb-2 text-sm text-muted-foreground">{group.question}</p>
            <ul className={entries}>
              {group.offerings.map((offer) => {
                const vendor = "catalogVendorId" in offer && typeof offer.catalogVendorId === "string"
                  ? vendorById(offer.catalogVendorId) : undefined;
                return (
                  <li className={entry} key={offer.company + "/" + offer.offering}>
                    <h4 className="font-semibold">{offer.company} · {offer.offering}</h4>
                    <p>{offer.description}</p>
                    <p><strong>Likely buyer. </strong>{offer.buyer}</p>
                    <p><strong>Evaluation question. </strong>{offer.question}</p>
                    <Sources urls={offer.sources} />
                    {vendor && <Link className={textLink} href={`/vendors/${vendor.slug}`}>{vendor.name} catalog profile</Link>}
                  </li>
                );
              })}
            </ul>
          </ResearchGroup>
        ))}
      </div>
      <h3 className="text-lg">Buying context</h3>
      <div className="space-y-2">
        <ResearchGroup title="Industry evidence and commercial models">
          <ul className={entries}>
            {research.industry.filter(inMarket).map((item) => (
              <li key={item.topic} className={entry}>
                <h4 className="font-semibold">{item.topic}</h4><p>{item.evidence}</p>
                <p className="text-muted-foreground">{item.interpretation}</p><Sources urls={item.sources} />
              </li>
            ))}
          </ul>
        </ResearchGroup>
        <ResearchGroup title="Buyer questions and evaluation measures">
          <ul className={entries}>
            {research.situations.filter((item) => inMarket(item) || item.market === "Adjacent").map((item) => (
              <li key={item.situation} className={entry}>
                <h4 className="font-semibold">{item.situation}</h4><p>{item.question}</p>
                <p><strong>Suggested participants. </strong>{item.participants}</p>
                <p><strong>Evaluation. </strong>{item.measure}</p>
              </li>
            ))}
          </ul>
        </ResearchGroup>
        <ResearchGroup title={`Vendors in both market maps (${research.overlap.length})`}>
          <p className="text-sm text-muted-foreground">Each pair has separate product evidence. Confirm licensing and integration with the vendor.</p>
          <ul className={entries}>
            {research.overlap.map((pair) => (
              <li key={pair.company} className={entry}>
                <h4 className="font-semibold">{pair.company}</h4>
                <p>EASM · <a className={textLink} href={pair.sources[0]}>{pair.easm}</a></p>
                <p>CTI · <a className={textLink} href={pair.sources[1]}>{pair.cti}</a></p>
                <p>{pair.question}</p>
              </li>
            ))}
          </ul>
        </ResearchGroup>
        <ResearchGroup title="Acquisitions, renames and retirements">
          <ul className={entries}>
            {research.history.filter(inMarket).map((item) => (
              <li key={item.earlier} className={entry}>
                <h4 className="font-semibold">{item.earlier} · {item.reference}</h4>
                <p>{item.timing}. {item.event}</p><Sources urls={item.sources} />
              </li>
            ))}
          </ul>
        </ResearchGroup>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <a className={textLink} href="#category-products">Browse catalog products</a>
        <Link className={textLink} href={`/categories/${otherId}#market-research`}>Explore the {research.markets[otherId].abbreviation} map</Link>
        <a className={textLink} href="/research/easm-cti-conversation-guide.pdf">Two-page conversation guide (PDF)</a>
        <a className={textLink} href="/research/easm-cti-market-map.xlsx" download>Filterable company directory (Excel)</a>
      </div>
    </section>
  );
}
