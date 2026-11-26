import Link from "next/link";
import { ClaimList } from "@/components/claims";
import { productById, vendorById } from "@/lib/catalog";
import { publicMonitoringClaims } from "@/lib/data/public-monitoring";
import { productDestination } from "@/lib/product-destination";
import guides from "@/research/external-exposure-guides.json";

const linkStyle = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ExternalExposureGuides({ categoryId }: { categoryId: string }) {
  const guide = Object.entries(guides).find(([id]) => id === categoryId)?.[1];
  if (!guide) {
    if (!["external-attack-surface", "threat-intelligence", "secrets-detection"].includes(categoryId)) return null;
    return (
      <nav aria-label="Related public exposure buyer guides" className="mt-5 max-w-3xl space-y-2 text-sm">
        <h2 className="text-lg">Explore related public exposures</h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {Object.entries(guides).map(([id, item]) => (
            <li key={id}><Link href={`/categories/${id}#public-exposure-guide`} className={linkStyle}>{item.title}</Link></li>
          ))}
        </ul>
      </nav>
    );
  }
  return (
    <section aria-labelledby="public-exposure-guide" className="mt-6 max-w-4xl space-y-3 rounded-xl border border-border bg-card p-4">
      <h2 id="public-exposure-guide" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">{guide.title}</h2>
      <p className="max-w-3xl leading-7">{guide.summary}</p>
      <p className="text-sm leading-6"><strong>Typical handoff. </strong>{guide.owner}</p>
      <p className="text-sm leading-6"><strong>Ask the buyer. </strong>{guide.question}</p>
      <p className="text-sm leading-6"><strong>What to measure. </strong>{guide.measure}</p>
      <h3 className="text-lg">Vendors and product evidence</h3>
      <p className="text-sm text-muted-foreground">The map proposes the workflow and evaluation questions. Each product statement below links to the publisher’s evidence.</p>
      {guide.options.map((option) => {
        const claim = publicMonitoringClaims.find((item) => item.id === option.claimId);
        const product = claim && productById(claim.subjectId);
        const vendor = product && vendorById(product.vendorId);
        if (!claim || !product || !vendor) return null;
        return (
          <details key={claim.id} className="rounded-lg border border-border px-4">
            <summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{product.name}</summary>
            <div className="space-y-3 pb-4 text-sm leading-6">
              <p><strong>Ask the vendor. </strong>{option.ask}</p>
              <ClaimList claims={[claim]} />
              <Link className={linkStyle} href={productDestination(product, vendor.slug)}>{vendor.name} product profile</Link>
            </div>
          </details>
        );
      })}
      <p className="text-sm leading-6">Related guides include the <Link href="/categories/secrets-detection#public-monitoring" className={linkStyle}>public secret monitoring comparison</Link> and the <Link href="/categories/threat-intelligence#market-research" className={linkStyle}>threat intelligence market map</Link>.</p>
    </section>
  );
}
