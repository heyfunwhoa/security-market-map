import Link from "next/link";
import { PageIntro, StatusPill } from "@/components/chrome";
import { catalog } from "@/lib/catalog";
import { caseStudy, REVIEWED } from "@/lib/data/brief";

const SOURCE_IDS = [
  "src-cyera-oasis-blog",
  "src-oasis-cyera-blog",
  "src-cyera-oasis-close",
  "src-sacr-cyera-oasis",
];

export const metadata = { title: "Cyera and Oasis" };

export default function CyeraOasisPage() {
  const sources = SOURCE_IDS.map((id) => catalog.sources.find((source) => source.id === id)).filter(
    (source) => source !== undefined,
  );
  const claims = catalog.claims.filter((claim) => SOURCE_IDS.includes(claim.sourceId));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Case study"
        title="Data context and non-human identity context"
        lede="Cyera and Oasis say those two contexts should govern what an agent can see and do. The deal status below is separated from any claim that a shipping product already enforces both together."
      />
      <p className="mt-4 text-sm text-muted-foreground">Reviewed {REVIEWED}. {caseStudy.status}</p>
      <section className="mt-8 grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border border-border p-4 text-sm leading-6">
          <h2 className="text-xl">Strategic rationale</h2>
          <p className="mt-2">{caseStudy.rationale}</p>
          <p className="mt-3">
            <StatusPill status="vendor_published" />
          </p>
        </article>
        <article className="rounded-xl border border-border p-4 text-sm leading-6">
          <h2 className="text-xl">Shipped integration</h2>
          <p className="mt-2">{caseStudy.shipped}</p>
          <p className="mt-3">
            <StatusPill status="needs_review" />
          </p>
        </article>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Unresolved</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
          {caseStudy.open.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Claims</h2>
        <ul className="mt-3 space-y-3 text-sm leading-6">
          {claims.map((claim) => (
            <li key={claim.id} className="rounded-xl border border-border p-4">
              <p>{claim.statement}</p>
              <p className="mt-2 text-muted-foreground">
                {claim.verificationStatus}, reviewed {claim.lastCheckedAt}. {claim.notes}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Sources</h2>
        <ul className="mt-3 space-y-3 text-sm leading-6">
          {sources.map((source) => (
            <li key={source.id}>
              <a className="text-primary hover:underline" href={source.url}>
                {source.title}
              </a>
              <p className="text-muted-foreground">
                {source.author ?? "Author not named on the page"} · {source.publisher} · published{" "}
                {source.publishedAt ?? "date not recorded"} · accessed {source.retrievedAt}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-8 text-sm">
        <Link href="/vendors/cyera" className="text-primary hover:underline">
          Cyera
        </Link>
        {" · "}
        <Link href="/vendors/oasis" className="text-primary hover:underline">
          Oasis
        </Link>
      </p>
    </main>
  );
}
