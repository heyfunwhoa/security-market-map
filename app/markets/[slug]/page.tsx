import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/chrome";
import { ecpZones, REVIEWED } from "@/lib/data/brief";

const pages: Record<
  string,
  { title: string; lede: string; body: { heading: string; text: string; href?: string }[] }
> = {
  endpoint: {
    title: "Endpoint security",
    lede: "EPP and EDR remain the device record. SACR's five-zone endpoint-control framework is a proposed next layer, not a Gartner category and not a replacement for EDR.",
    body: [
      {
        heading: "EPP",
        text: "Endpoint protection tries to stop known-bad files and enforce device policy. It does not reconstruct an agent's tool calls.",
        href: "/categories/endpoint-security",
      },
      {
        heading: "EDR",
        text: "Endpoint detection records processes, files, and related activity, then helps an analyst respond. SACR's July 2026 note says that record is still necessary and is blind to much of what happens in the browser, the IDE, and a local agent.",
        href: "/categories/endpoint-security",
      },
      {
        heading: "XDR",
        text: "Extended detection correlates endpoint with other signals. It is a different purchase from a specialist that only watches local AI use.",
        href: "/categories/xdr",
      },
    ],
  },
  network: {
    title: "Network and access security",
    lede: "The network decides which connection is allowed. It still depends on an identity, and it does not govern an agent tool call that never crosses the gateway.",
    body: [
      {
        heading: "Edge",
        text: "Firewalls, secure web gateways, ZTNA, and SASE are often one deal and several controls.",
        href: "/categories/network-edge",
      },
      {
        heading: "Microsegmentation",
        text: "Workload-to-workload policy is not the perimeter firewall and not an identity provider.",
        href: "/categories/microsegmentation",
      },
      {
        heading: "Identity",
        text: "Zero trust still needs a directory. The network does not certify access.",
        href: "/domains/identity",
      },
    ],
  },
  exposure: {
    title: "Exposure management",
    lede: "Finding a weakness, finding an unknown internet-facing asset, and testing whether a control fires are three different jobs.",
    body: [
      {
        heading: "Vulnerability management",
        text: "Known assets and missing fixes. Not an AppSec scanner and not an external-discovery product by default.",
        href: "/categories/it-vulnerability-management",
      },
      {
        heading: "External attack surface",
        text: "Assets the inventory did not list. Discovery is not a patch priority.",
        href: "/categories/external-attack-surface",
      },
      {
        heading: "Validation",
        text: "Breach simulation checks whether a control noticed a technique. A missed technique is a detection gap to investigate, not a verdict on a product.",
        href: "/categories/breach-simulation",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: pages[slug]?.title ?? "Market" };
}

export default async function MarketViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker="Market view" title={page.title} lede={page.lede} />
      <p className="mt-4 text-sm text-muted-foreground">Reviewed {REVIEWED}. This is not a Gartner, Forrester, IDC, SACR, or vendor classification.</p>
      <div className="mt-6 grid gap-3">
        {page.body.map((section) => (
          <article key={section.heading} className="rounded-xl border border-border bg-card p-4">
            <h2 className="text-xl">
              {section.href ? (
                <Link href={section.href} className="hover:underline">
                  {section.heading}
                </Link>
              ) : (
                section.heading
              )}
            </h2>
            <p className="mt-2 text-sm leading-6">{section.text}</p>
          </article>
        ))}
      </div>
      {slug === "endpoint" ? (
        <section className="mt-8">
          <h2 className="text-2xl tracking-tight">SACR framework: five endpoint-control zones</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Attributed to Software Analyst Cyber Research, 22 Jul 2026. The zones are their proposal.
            This map does not score vendors against them.
          </p>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {ecpZones.map((zone, index) => (
              <li key={zone.zone} className="rounded-xl border border-border p-4 text-sm leading-6">
                <span className="font-semibold">
                  {index + 1}. {zone.zone}.{" "}
                </span>
                {zone.meaning}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm">
            <Link href="/categories/endpoint-control" className="text-primary hover:underline">
              Endpoint control category
            </Link>
          </p>
        </section>
      ) : null}
    </main>
  );
}
