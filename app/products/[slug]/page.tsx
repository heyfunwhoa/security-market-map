import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, StatusPill } from "@/components/chrome";
import { ProductEvidenceExplorer } from "@/components/product-evidence-explorer";
import { ProductFocus } from "@/components/product-focus";
import { ProductSectionNav } from "@/components/product-section-nav";
import { catalog, claimsForSubject, vendorById } from "@/lib/catalog";
import { availabilityLabel } from "@/lib/format";
import { DEVELOPER_ENDPOINT_COMPARISON_URL } from "@/lib/comparison-selection";

const endpointIds = new Set(["gitguardian-developer-endpoint", "aikido-device-protection", "kingfisher"]);

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
  "kingfisher": {
    action: "An authorized scan finds a candidate credential in source code, Git history, or another supported scan target",
    control: "Kingfisher detects candidate secrets, can optionally check supported credentials live, and offers separate mapping, triage and explicit revocation stages",
    evidence: "Scanner rule and finding fingerprint, source and scan scope, validation outcome where authorized, and a structured JSON/SARIF finding",
    limitation: "Detection does not prove a credential is live. Live validation, blast-radius mapping and revocation depend on provider support, authorization and explicit operator decisions. The Atlas has not yet evaluated Kingfisher detector coverage.",
    questions: ["Which source and rule produced this candidate?", "Is validation supported for this credential and is live testing authorized?", "Are blast-radius queries read-only and scoped?", "Who can approve revocation and verify operational impact?", "Does the pinned release and ruleset match the evaluation evidence?"],
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
        <Link href={slug === "kingfisher" ? "/categories/secrets-detection" : "/categories/endpoint-control"} className="text-primary underline underline-offset-4">{slug === "kingfisher" ? "Secrets detection" : "Endpoint control"}</Link>
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

      <ProductSectionNav sections={[
        { id: "how-it-works", label: "Overview" },
        ...(slug === "kingfisher" ? [{ id: "product-focus-title", label: "Zoom in" }, { id: "kingfisher-stages", label: "Workflow" }] : []),
        { id: "limitations", label: "Limitations" },
        { id: "evidence", label: "Evidence" },
        { id: "investigate", label: "Pilot questions" },
        { id: "adjacency", label: "Categories" },
      ]} />
      <section aria-labelledby="how-it-works" className="mt-9 scroll-mt-36">
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

      {slug === "kingfisher" ? <ProductFocus stages={[
        { title: "Detect", summary: "Match candidate secrets in authorized targets.", check: "Inspect source, pinned rule ID, location and redacted finding.", boundary: "A match is a candidate, not proof that the credential is active." },
        { title: "Validate", summary: "Optionally ask a supported issuer whether a credential works.", check: "Confirm provider support, test authorization, outcomes and network side effects.", boundary: "Timeouts and unsupported credential types are inconclusive, not invalid." },
        { title: "Map", summary: "Investigate available identity and permission context.", check: "Confirm mapped provider, read-only scope and least-privilege permissions.", boundary: "Provider-specific mapping is not universal blast-radius coverage." },
        { title: "Triage", summary: "Prioritize evidence and assign an owner.", check: "Confirm output format, fingerprint, redaction and reviewer handoff.", boundary: "Importing other scanner results is not native detector support." },
        { title: "Revoke", summary: "Contain an exposed credential with explicit approval.", check: "Confirm supported provider, authority, impact assessment and rollback.", boundary: "No live revocation in this research workflow; it can disrupt applications." },
      ]} /> : null}
      {slug === "kingfisher" ? (
        <section aria-labelledby="kingfisher-stages" className="mt-9">
          <h2 id="kingfisher-stages" className="text-2xl font-semibold">From detection to response</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Five distinct stages, not one universal control. Provider-specific support and the active release must be checked in upstream documentation.</p>
          <p className="mt-4 text-sm leading-6"><strong>Open source:</strong> Rust-based, Apache-2.0 according to the upstream project. Its stated benchmarks and feature coverage are publisher reports, not independently tested results.</p>
          <a href="https://github.com/mongodb/kingfisher" className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Read Kingfisher source and documentation</a>
        </section>
      ) : null}
      <section aria-labelledby="limitations" className="mt-8 scroll-mt-36 rounded-xl border border-border p-4">
        <h2 id="limitations" className="text-xl font-semibold">What this does not establish</h2>
        <p className="mt-2 text-sm leading-6">{details.limitation}</p>
      </section>

      <section aria-labelledby="evidence" className="mt-9">
        <h2 id="evidence" className="text-2xl font-semibold">Source-backed product evidence</h2>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">Every statement links to its publisher source and review date. Missing evidence remains Unknown, not unsupported.</p>
        <ProductEvidenceExplorer claims={claims} />
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

      {slug === "kingfisher" ? (
        <aside className="mt-10 border-t border-border pt-6">
          <h2 className="text-xl font-semibold">Technical detector coverage lives in Detector Coverage Atlas</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">The Atlas registers Kingfisher as not evaluated. Rule-level and optional analyzer comparisons will appear only after a pinned-source parser and provenance review. An imported TruffleHog report is not proof of native Kingfisher detector coverage.</p>
          <a href="https://github.com/heyfunwhoa/detector-coverage-atlas" className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Open Detector Coverage Atlas repository</a>
        </aside>
      ) : null}
      {slug !== "kingfisher" ? (
      <aside className="mt-10 border-t border-border pt-6">
        <h2 className="text-xl font-semibold">Compare only when needed</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Start with the product's own control points and limitations. The comparison matrix combines documented evidence with explicit Unknown states, not a winner or score.</p>
        <Link href={DEVELOPER_ENDPOINT_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Compare GitGuardian and Aikido</Link>
      </aside>
      ) : null}
    </main>
  );
}
