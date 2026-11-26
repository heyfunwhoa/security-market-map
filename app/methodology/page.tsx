import type { Metadata } from "next";
import Link from "next/link";
import { AnnotatedText } from "@/components/annotated-text";
import { PageIntro, StatusPill } from "@/components/chrome";
import { catalog } from "@/lib/catalog";
import { domainClaimCounts } from "@/lib/domain-evidence";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How the Security Market Map decides what counts as evidence, what the status labels mean, and why Unknown stays Unknown.",
};

const SOURCE_TYPES: { status: string; meaning: string }[] = [
  { status: "verified", meaning: "Checked against an independent public source, such as a standard. Not a test of a product." },
  { status: "vendor_published", meaning: "What the vendor published. Not an independent test." },
  { status: "analyst", meaning: "Taken from a public analyst page. Paid report text and rankings are not copied here." },
  { status: "conflicting", meaning: "Two sources disagree. Both stay on the page." },
  { status: "needs_review", meaning: "Saved for a person to check. Not treated as fact." },
];

export default function MethodologyPage() {
  const counts = domainClaimCounts(catalog);
  const evidenced = catalog.domains.filter((domain) => domain.depth === "evidenced");
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageIntro
        kicker="Methodology"
        title="How to read this map"
        lede="A practical map for customer conversations, not an analyst taxonomy and not a ranking."
      />

      <section className="mt-10" aria-labelledby="not-a-ranking">
        <h2 id="not-a-ranking" className="text-2xl">Not a ranking</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
          <li>Every domain tile is the same size. Size never means spend, rank, or market share.</li>
          <li>Color identifies a tile or a status. It does not mean rank, evidence strength, or capability.</li>
          <li>
            Vendor names in examples are examples this map chose. They are not placements. A quadrant places vendors
            inside a defined market. It does not rank a company across cybersecurity.
          </li>
          <li>
            <AnnotatedText text="This is not an official Gartner, Forrester, IDC, SACR, or vendor classification." seen={new Set()} />
          </li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="status">
        <h2 id="status" className="text-2xl">Evidenced and mapped</h2>
        <dl className="mt-3 space-y-3 text-sm leading-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <dt className="font-semibold">Evidenced</dt>
            <dd className="mt-1">
              Claims, dates, and explicit gaps. {evidenced.map((domain) => domain.name).join(", ")} is the evidenced
              domain, with {evidenced.map((domain) => counts[domain.id]).join(", ")} claims.
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <dt className="font-semibold">Mapped</dt>
            <dd className="mt-1">
              The category and the buyer are named. Some claims exist, and the tile shows how many. Evidence is
              thinner than identity, and most capability cells stay Unknown.
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          A domain&apos;s claim count includes claims on its categories and on products and vendors whose primary
          category sits in that domain. A category in two domains counts in both.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="unknown">
        <h2 id="unknown" className="text-2xl">Unknown stays Unknown</h2>
        <p className="mt-3 text-sm leading-6">
          A blank cell is Unknown. It is a gap in this research, not a verdict that the product lacks the capability.
          A product with no capability claim stays on the map as a research candidate. Shortlist it. Do not check a
          feature for it.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="source-types">
        <h2 id="source-types" className="text-2xl">Source types on claim cards</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Each claim card shows one badge for how the claim was checked. Hover or focus the badge for this text.
        </p>
        <dl className="mt-3 space-y-3 text-sm leading-6">
          {SOURCE_TYPES.map((item) => (
            <div key={item.status} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
              <dt className="shrink-0 sm:w-40">
                <StatusPill status={item.status} />
              </dt>
              <dd>{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="dates">
        <h2 id="dates" className="text-2xl">Dates</h2>
        <p className="mt-3 text-sm leading-6">
          Every claim carries a published date when the source has one, an observed date, and the date it was last
          checked. The site&apos;s &quot;as of&quot; date is the newest of those dates across all claims. In this version of the
          site that is {formatDate(catalog.asOf)}. It is a snapshot date, not today&apos;s date.
        </p>
        <p className="mt-3 text-sm leading-6">
          <Link href="/sources" className="text-primary underline underline-offset-4">
            Open the source ledger
          </Link>{" "}
          to see each source and its recrawl window.
        </p>
      </section>
    </main>
  );
}
