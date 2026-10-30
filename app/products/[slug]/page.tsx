import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, StatusPill } from "@/components/chrome";
import { ClaimList } from "@/components/claims";
import { catalog, claimsForSubject, vendorById } from "@/lib/catalog";
import { availabilityLabel } from "@/lib/format";
import { DEVELOPER_ENDPOINT_COMPARISON_URL } from "@/lib/comparison-selection";

const endpointIds = new Set(["gitguardian-developer-endpoint", "aikido-device-protection"]);

export function generateStaticParams() {
  return catalog.products.filter((product) => endpointIds.has(product.slug)).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: catalog.products.find((product) => endpointIds.has(product.slug) && product.slug === slug)?.name ?? "Product" };
}

const learning = {
  "gitguardian-developer-endpoint": {
    action: "Credential appears on the developer workstation or in a supported AI tool interaction",
    control: "Scheduled ggshield scans, supported AI hooks and honeytoken workflows",
    evidence: "Scan time and scope, redacted secret finding, hook coverage, decoy-use alert",
    limitation: "Not continuous process monitoring or universal package blocking. Hook support varies by assistant and action timing.",
    questions: ["What local paths and agent artifacts are scanned?", "What prevents bypass of local hooks?", "Does a post-tool decision happen after an irreversible side effect?", "Who owns credential rotation once a finding appears?"],
  },
  "aikido-device-protection": {
    action: "Developer or agent requests a package from a supported registry",
    control: "Local selective interception evaluates package-domain traffic against synchronized policy and intelligence",
    evidence: "Install verdict, matched policy, device/package inventory and local secret findings",
    limitation: "Coverage depends on supported ecosystems, traffic paths and installed agent configuration. AI usage inventory is not the same as AI tool-call blocking.",
    questions: ["Does the package manager, mirror, OS or container path intercept correctly?", "What is the failure mode offline?", "How are TLS trust, exceptions and developer latency handled?", "What information leaves the device?"],
  },
} as const;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!endpointIds.has(slug)) notFound();
  const product = catalog.products.find((item) => item.slug === slug);
  if (!product) notFound();
  const vendor = vendorById(product.vendorId);
  const details = learning[slug as keyof typeof learning];
  const claims = claimsForSubject("product", product.id);
  const related = catalog.categories.filter((category) => [...product.primaryCategoryIds, ...product.adjacentCategoryIds].includes(category.id));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
        <Link href="/categories/endpoint-control" className="text-primary underline underline-offset-4">Endpoint control</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <PageIntro kicker="Product research" title={product.name} lede={product.positioning} />
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <StatusPill status={product.availability} />
        {vendor ? <Link className="min-h-11 inline-flex items-center text-primary underline underline-offset-4" href={`/vendors/${vendor.slug}`}>About {vendor.name}</Link> : null}
        <a className="min-h-11 inline-flex items-center text-primary underline underline-offset-4" href={product.officialUrl}>Official product documentation</a>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{availabilityLabel(product.availability)}. {product.availabilityNote}</p>

      <section aria-labelledby="how-it-works" className="mt-9">
        <h2 id="how-it-works" className="text-2xl font-semibold">How protection happens</h2>
        <p className="mt-2 text-sm text-muted-foreground">Illustrative control sequence. Vendor documentation is not an independently verified blocking test.</p>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {[["1. Trigger", details.action], ["2. Control", details.control], ["3. Evidence", details.evidence]].map(([heading, description]) => (
            <li key={heading} className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">{heading}</h3>
              <p className="mt-2 text-sm leading-6">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="limitations" className="mt-8 rounded-xl border border-border p-4">
        <h2 id="limitations" className="text-xl font-semibold">What this does not establish</h2>
        <p className="mt-2 text-sm leading-6">{details.limitation}</p>
      </section>

      <section aria-labelledby="evidence" className="mt-9">
        <h2 id="evidence" className="text-2xl font-semibold">Source-backed product evidence</h2>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">Every statement links to its publisher source and review date. Missing evidence remains Unknown, not unsupported.</p>
        <ClaimList claims={claims} />
      </section>

      <section aria-labelledby="investigate" className="mt-9">
        <h2 id="investigate" className="text-2xl font-semibold">Questions to validate in a pilot</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{details.questions.map((q) => <li key={q}>{q}</li>)}</ul>
      </section>

      <section aria-labelledby="adjacency" className="mt-9">
        <h2 id="adjacency" className="text-2xl font-semibold">Where it fits</h2>
        <ul className="mt-3 flex flex-wrap gap-2">{related.map((category) => (
          <li key={category.id}><Link href={`/categories/${category.slug}`} className="inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm text-primary underline underline-offset-4">{category.name}</Link></li>
        ))}</ul>
      </section>

      <aside className="mt-10 border-t border-border pt-6">
        <h2 className="text-xl font-semibold">Compare only when needed</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Start with the product's own control points and limitations. The comparison matrix combines documented evidence with explicit Unknown states, not a winner or score.</p>
        <Link href={DEVELOPER_ENDPOINT_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Compare GitGuardian and Aikido</Link>
      </aside>
    </main>
  );
}
