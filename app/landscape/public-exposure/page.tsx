import Link from "next/link";
import { ClaimList } from "@/components/claims";
import { PageIntro } from "@/components/chrome";
import { categoryBySlug, productById, vendorById } from "@/lib/catalog";
import { publicMonitoringClaims } from "@/lib/data/public-monitoring";
import { productDetailUrl } from "@/lib/landscape-filters";
import groups from "@/research/public-exposure-options.json";

export const metadata = { title: "Public monitoring and external exposure buyer guide" };

const linkStyle = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const claimsById = new Map(publicMonitoringClaims.map((claim) => [claim.id, claim]));

export default function PublicExposurePage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <Link className={linkStyle} href="/landscape">Back to the security landscape</Link>
      <PageIntro
        kicker="Buyer guide"
        title="Public monitoring and external exposure"
        lede="Start with what surfaced. An unknown host, a leaked key and a stolen employee login each call for different evidence and a different person to act."
      />
      <nav aria-label="Find a buyer scenario" className="grid gap-5 rounded-xl border border-border bg-card p-5 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id}>
            <h2 className="mb-2 text-lg">{group.title}</h2>
            <ul className="space-y-2 text-sm leading-6">
              {group.cases.map((item) => <li key={item.id}><a className={linkStyle} href={`#${item.id}`}>{item.title}</a></li>)}
            </ul>
          </div>
        ))}
      </nav>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">Scenarios and team handoffs are illustrative. Each product opens to its publisher’s evidence, the date checked and the remaining questions. Some options observe different stages of the same incident.</p>
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={group.id} className="space-y-5">
          <h2 id={group.id} className="text-3xl">{group.title}</h2>
          {group.cases.map((item) => (
            <article key={item.id} aria-labelledby={item.id} className="space-y-4 rounded-xl border border-border p-4 sm:p-6">
              <h3 id={item.id} tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">{item.title}</h3>
              <p className="max-w-3xl text-lg leading-7">{item.scenario}</p>
              <dl className="grid gap-4 text-sm leading-6 md:grid-cols-3">
                <div><dt className="font-semibold">What can be seen before setup?</dt><dd>{item.visibility}</dd></div>
                <div><dt className="font-semibold">How do we know it’s ours?</dt><dd>{item.attribution}</dd></div>
                <div><dt className="font-semibold">Who acts?</dt><dd>{item.owner}</dd></div>
              </dl>
              <ul className="space-y-2">
                {item.options.map((option) => {
                  const claims = option.claimIds.map((id) => claimsById.get(id)!);
                  const product = productById(claims[0].subjectId)!;
                  const vendor = vendorById(product.vendorId)!;
                  return (
                    <li key={product.id}>
                      <details className="rounded-lg border border-border bg-card px-4">
                        <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{option.label}</summary>
                        <div className="space-y-3 pb-4 text-sm"><ClaimList claims={claims} />
                          <Link className={linkStyle} href={productDetailUrl(vendor.slug, product.id)}>View {vendor.name} product profile</Link>
                        </div>
                      </details>
                    </li>
                  );
                })}
              </ul>
              <Link className={linkStyle} href={`/categories/${item.categoryId}`}>Explore {categoryBySlug(item.categoryId)!.name}</Link>
            </article>
          ))}
        </section>
      ))}
      <Link className={linkStyle} href="/landscape">Back to the security landscape</Link>
    </main>
  );
}
