import type { MarketProfile } from "@/lib/data/ciam-profiles";
import { formatDate } from "@/lib/format";
import { PRODUCT_ANCHOR_CLASS } from "@/lib/product-research";

const sourceLink = "inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring";

export function MarketContext({ profile, checked }: { profile: MarketProfile; checked: string }) {
  const { buyer, owner, pricing, customer, publisher } = profile;
  return (
    <section aria-labelledby="market-context" className="mt-9 min-w-0">
      <h2 id="market-context" tabIndex={-1} className={`${PRODUCT_ANCHOR_CLASS} text-2xl font-semibold`}>Buyer and economics</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Who buys and operates it</h3>
          <p className="mt-2 text-sm leading-6">{buyer}</p>
        </div>
        <div>
          <h3 className="font-semibold">Product ownership</h3>
          <p className="mt-2 text-sm leading-6">{owner.statement}</p>
          <a className={sourceLink} href={owner.url}>{owner.title}</a>
        </div>
        <div>
          <h3 className="font-semibold">What drives the bill</h3>
          <p className="mt-2 text-sm leading-6">{pricing.statement}</p>
          <p className="mt-1 text-sm leading-6">{pricing.caveat}</p>
          <a className={sourceLink} href={pricing.url}>{publisher} pricing</a>
          <p className="text-xs text-muted-foreground">Checked {formatDate(checked)}</p>
        </div>
        <div>
          <h3 className="font-semibold">{customer.title}</h3>
          <p className="mt-2 text-sm leading-6">{customer.summary}</p>
          <a className={sourceLink} href={customer.url}>Read the customer story from {publisher}</a>
        </div>
      </div>
    </section>
  );
}
