import { BudgetWorksheet } from "@/components/budget-worksheet";
import { PageIntro, StatusPill } from "@/components/chrome";
import { catalog } from "@/lib/catalog";
import { formatDate, priceSignalLabel } from "@/lib/format";

export const metadata = { title: "Budget" };

const KINDS = [
  ["public_list", "A price the vendor publishes as the ongoing price, with the unit and the term visible."],
  ["promotional_offer", "A dated offer with eligibility. It expires. It is not the renewal price."],
  ["commissioned_composite", "A model someone paid an analyst or a vendor to build. Label it as commissioned."],
  ["field_signal", "Something a recruiter, partner, or seller heard. It is not a quote."],
  ["actual_quote", "A number on paper for this account, this term, and this SKU."],
];

export default function BudgetPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Budget"
        title="Keep the price type next to the number"
        lede="The worksheet starts empty. Nothing in it is an expected ROI. The only seeded price is a vendor launch offer, and it stays out of the form until you decide it applies."
      />
      <section className="mt-8 grid gap-3 md:grid-cols-2">
        {KINDS.map(([id, body]) => (
          <article key={id} className="rounded-xl border border-border bg-card p-4 text-sm leading-6">
            <StatusPill status={id} />
            <p className="mt-2 font-medium">{priceSignalLabel(id)}</p>
            <p className="mt-1 text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Seeded signals</h2>
        <ul className="mt-3 space-y-3">
          {catalog.pricing.map((price) => {
            const product = catalog.products.find((item) => item.id === price.productId);
            return (
              <li key={price.id} className="rounded-xl border border-border p-4 text-sm leading-6">
                <StatusPill status={price.signalType} />
                <p className="mt-2 font-medium">
                  {product?.name} · {price.amountLabel} · as of {formatDate(price.asOf)}
                </p>
                <p className="mt-1">{price.statement}</p>
                <p className="mt-1 text-muted-foreground">{price.caveats}</p>
              </li>
            );
          })}
          <li className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            Actual quotes in this seed: none. Commissioned ROI studies: none. Do not borrow a number from
            a blog to fill either gap.
          </li>
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl">Three-year value worksheet</h2>
        <div className="mt-4">
          <BudgetWorksheet />
        </div>
      </section>
    </main>
  );
}
