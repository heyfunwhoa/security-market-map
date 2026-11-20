import Link from "next/link";
import { vendorById } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import research from "@/research/public-secret-monitoring.json";

const link = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const relatedCategories = new Map([
  ["external-attack-surface", "A public repository or package can expose a company credential even when the host belongs to someone else."],
  ["threat-intelligence", "A report about leaked code, a company API key and a stolen employee login each calls for a different response."],
  ["digital-risk-protection", "When a brand alert points to exposed code, the next question is whether it contains an organization-owned credential."],
]);

export function PublicSecretMonitoring({ categoryId }: { categoryId: string }) {
  if (categoryId !== "secrets-detection") {
    const context = relatedCategories.get(categoryId);
    return context ? (
      <aside className="mt-4 max-w-3xl rounded-lg border border-border p-4 text-sm leading-6" aria-label="Related public monitoring research">
        <p>{context}</p>
        <Link href="/categories/secrets-detection#public-monitoring" className={link}>Compare public monitoring vendors</Link>
      </aside>
    ) : null;
  }
  return (
    <section className="mt-6 space-y-4" aria-labelledby="public-monitoring">
      <h2 id="public-monitoring" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">
        Public monitoring for exposed secrets and source code
      </h2>
      <p className="max-w-3xl leading-7">
        If a developer exposes a company API key in a personal repository, who tells the security team, what connects the key to the company, and who can rotate it?
        Start here when the exposure happens on a public service the organization does not control.
      </p>
      <p className="text-sm text-muted-foreground">Candidate research · Checked {formatDate(research.reviewedOn)}. Coverage comes from vendor publications. Buyer roles and evaluation questions are the map’s interpretation.</p>
      {research.groups.map((group) => (
        <div key={group.need} className="space-y-2">
          <h3 className="text-lg">{group.need}</h3>
          <p className="max-w-3xl text-sm leading-6">{group.buyer}</p>
          {group.offerings.map((offer) => {
            const vendor = "vendorId" in offer && typeof offer.vendorId === "string" ? vendorById(offer.vendorId) : undefined;
            return (
              <details key={offer.name} className="rounded-lg border border-border bg-card px-4">
                <summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  {offer.name} · {offer.product}
                </summary>
                <div className="max-w-3xl space-y-2 pb-4 text-sm leading-6">
                  <p>{offer.coverage}</p>
                  <p>{offer.attribution}</p>
                  <p><strong>Ask in an evaluation. </strong>{offer.question}</p>
                  <ul aria-label={offer.name + " sources"} className="flex flex-wrap gap-x-4 gap-y-2">
                    {offer.sources.map((source) => <li key={source.url}><a href={source.url} className={link}>{source.label}</a></li>)}
                  </ul>
                  {vendor && <Link href={`/vendors/${vendor.slug}`} className={link}>{vendor.name} catalog profile</Link>}
                </div>
              </details>
            );
          })}
        </div>
      ))}
      <div className="max-w-3xl space-y-2 text-sm leading-6">
        <h3 className="text-lg">How to compare findings</h3>
        <p>Ask each vendor to walk through a redacted customer-authorized case or a synthetic example. Record the public source, how the finding was linked to the company, whether credential validity was known, and which team received it.</p>
        <p>For exposed API keys, measure time to identify the owner and confirm rotation or revocation. For copied code, track confirmation and removal separately. For stolen employee logins, track the handoff to identity response.</p>
        <p>Broaden the comparison with the <Link href="/categories/external-attack-surface#market-research" className={link}>EASM market map</Link>, <Link href="/categories/threat-intelligence#market-research" className={link}>threat intelligence market map</Link> or <Link href="/categories/digital-risk-protection" className={link}>digital risk protection category</Link>.</p>
      </div>
    </section>
  );
}
