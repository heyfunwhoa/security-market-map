import { productComparisonUrl } from "@/lib/landscape-shortlist";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro, StatusPill } from "@/components/chrome";
import { ProductEvidenceExplorer } from "@/components/product-evidence-explorer";
import { CiamMarketContext } from "@/components/ciam-market-context";
import { ciamProfiles, isCiamProduct, type CiamProductSlug } from "@/lib/data/ciam-profiles";
import { ProductFocus } from "@/components/product-focus";
import { ProductSectionNav } from "@/components/product-section-nav";
import { catalog, claimsForSubject, vendorById } from "@/lib/catalog";
import { claimNeedsRecheck } from "@/lib/coverage";
import { availabilityLabel } from "@/lib/format";
import { AGENTIC_ENDPOINT_COMPARISON_URL, DEVELOPER_ENDPOINT_COMPARISON_URL } from "@/lib/comparison-selection";
import { productFit } from "@/lib/product-fit";
import {
  PRODUCT_ANCHOR_CLASS,
  isProductResearchSlug,
  productResearchCategory,
  productResearchSections,
  unknownControlBoundaries,
  type ProductResearchSlug,
} from "@/lib/product-research";

export function generateStaticParams() {
  return catalog.products
    .filter((product) => isProductResearchSlug(product.slug))
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: catalog.products.find((product) => isProductResearchSlug(product.slug) && product.slug === slug)?.name ?? "Product" };
}

const learning: Record<Exclude<ProductResearchSlug, CiamProductSlug>, { action: string; control: string; evidence: string; limitation: string; questions: readonly string[] }> = {
  "gitguardian-developer-endpoint": {
    action: "Credential appears on the developer workstation or in a supported AI tool interaction",
    control: "Scheduled ggshield scans, supported AI hooks and honeytoken workflows",
    evidence: "Scan time and scope, redacted secret finding, hook coverage, decoy-use alert",
    limitation: "Not continuous process monitoring or universal package blocking. Hook support varies by assistant and action timing.",
    questions: ["What local paths and agent artifacts are scanned?", "What prevents bypass of local hooks?", "Does a post-tool decision happen after an irreversible side effect?", "Who owns credential rotation once a finding appears?"],
  },
  kingfisher: {
    action: "An authorized scan finds a candidate credential in source code, Git history, or another supported scan target",
    control: "Kingfisher detects candidate secrets, can optionally check supported credentials live, and offers separate mapping, triage and explicit revocation stages",
    evidence: "Scanner rule and finding fingerprint, source and scan scope, validation outcome where authorized, and a structured JSON/SARIF finding",
    limitation: "Detection does not prove a credential is live. Live validation, blast-radius mapping and revocation depend on provider support, authorization and explicit operator decisions. Detector coverage is not evaluated.",
    questions: ["Which source and rule produced this candidate?", "Is validation supported for this credential and is live testing authorized?", "Are blast-radius queries read-only and scoped?", "Who can approve revocation and verify operational impact?", "Does the pinned release and ruleset match the evaluation evidence?"],
  },
  "bay-platform": {
    action: "An AI agent on a laptop, browser or cloud workspace proposes an action, such as a shell command, file write, tool call or MCP request",
    control: "A short-lived collector pushed through existing MDM or EDR inventories agents and their tools; Bay Enforcer receives each proposed action through the AI tool's native hook and returns Allow, Ask or Deny on the device, weighing the whole session",
    evidence: "Agent, MCP server, extension and skill inventory; the proposed action, session context, matched team policy and verdict",
    limitation: "Enforcement needs the on-device enforcement component; a collector-only deployment runs in detection mode (per SACR). Coverage depends on which AI tools expose hooks and which events they expose. No public supported-agent list; latency and false-positive figures are vendor claims.",
    questions: ["Which agents, versions and hook events are covered today, and what happens for tools without hooks?", "Does the pilot run collector-only (detect) or with Bay Enforcer (prevent)?", "How do Lighthouse's 30-day policies treat a new team or a new agent?", "What does Ask look like to the developer, and how are exceptions approved?", "What session data leaves the device, and where is it stored?"],
  },
  "aikido-device-protection": {
    action: "Developer or agent requests a package from a supported registry",
    control: "Local selective interception evaluates package-domain traffic against synchronized policy and intelligence",
    evidence: "Install verdict, matched policy, device/package inventory and local secret findings",
    limitation: "Coverage depends on supported ecosystems, traffic paths and installed agent configuration. AI usage inventory is not the same as AI tool-call blocking.",
    questions: ["Does the package manager, mirror, OS or container path intercept correctly?", "What is the failure mode offline?", "How are TLS trust, exceptions and developer latency handled?", "What information leaves the device?"],
  },
};

function AnchorHeading({ id, className, children }: { id: string; className: string; children: string }) {
  return (
    <h2 id={id} tabIndex={-1} className={`${PRODUCT_ANCHOR_CLASS} ${className}`}>
      {children}
    </h2>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProductResearchSlug(slug)) notFound();
  const product = catalog.products.find((item) => item.slug === slug);
  if (!product) notFound();
  const vendor = vendorById(product.vendorId);
  const ciam = isCiamProduct(slug);
  const details = ciam ? ciamProfiles[slug] : learning[slug];
  const claims = claimsForSubject("product", product.id);
  const related = catalog.categories.filter((category) => [...product.primaryCategoryIds, ...product.adjacentCategoryIds].includes(category.id));
  const category = productResearchCategory(slug);
  const unknownBoundaries = unknownControlBoundaries(product.id, catalog.asOf);
  const fit = productFit[slug];

  return (
    <main className="mx-auto min-w-0 max-w-6xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }, category]} current={product.name} />
      <PageIntro kicker="Product research" title={product.name} lede={product.positioning} />
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <StatusPill status={product.availability} />
        <Link href={fit ? AGENTIC_ENDPOINT_COMPARISON_URL : productComparisonUrl(product)} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">{fit ? "Compare with peers" : `Compare ${product.name}`}</Link>
        {vendor ? <Link className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={`/vendors/${vendor.slug}`}>About {vendor.name}</Link> : null}
        <a className="inline-flex min-h-11 max-w-full items-center text-primary underline underline-offset-4 [overflow-wrap:anywhere]" href={product.officialUrl}>Official product documentation</a>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{availabilityLabel(product.availability)}. {product.availabilityNote}</p>
      {fit ? (
        <p className="mt-4 rounded-lg border-l-4 border-primary bg-card p-4 text-base leading-7"><span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Buyer question</span>{fit.buyerQuestion}</p>
      ) : null}

      <ProductSectionNav sections={productResearchSections(slug)} />
      <section aria-labelledby="how-it-works" className="mt-9">
        <AnchorHeading id="how-it-works" className="text-2xl font-semibold">How it works</AnchorHeading>
        <p className="mt-2 text-sm text-muted-foreground">{ciam ? "Follow one customer through sign-in and use the pilot to check what the application enforces." : "Illustrative control sequence. Vendor documentation is not an independently verified blocking test."}</p>
        {fit ? (
          <dl className="mt-4 grid gap-2 rounded-xl border border-border bg-card p-4 text-sm leading-6 sm:grid-cols-[8rem_1fr]">
            {([["Trigger", details.action], ["Control", details.control], ["Evidence", details.evidence]] as const).map(([heading, description]) => (
              <div key={heading} className="contents">
                <dt className="font-semibold">{heading}</dt>
                <dd className="[overflow-wrap:anywhere]">{description}</dd>
              </div>
            ))}
          </dl>
        ) : (
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {([["1. Trigger", details.action], ["2. Control", details.control], ["3. Evidence", details.evidence]] as const).map(([heading, description]) => (
            <li key={heading} className="min-w-0 rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">{heading}</h3>
              <p className="mt-2 text-sm leading-6 [overflow-wrap:anywhere]">{description}</p>
            </li>
          ))}
        </ol>
        )}
      </section>

      {slug === "aikido-device-protection" ? <ProductFocus stages={[
        { title: "Request", summary: "A developer or coding agent requests a package from a supported registry.", check: "Confirm the actual package manager, network route, mirror, operating system and device enrollment.", boundary: "An unsupported registry, offline cache, container or WSL path must not be assumed covered." },
        { title: "Inspect", summary: "A local device component evaluates traffic on supported domains.", check: "Review selective interception, TLS trust configuration, privacy, and proxy compatibility.", boundary: "Network inspection does not mean universal device or malware visibility." },
        { title: "Decide", summary: "The agent applies available package policy and threat-intelligence decisions.", check: "Use a benign synthetic policy block to test decision timing and exception behavior.", boundary: "A detection or post-install alert is not necessarily a pre-install block." },
        { title: "Report", summary: "Device events and package inventory provide investigation context.", check: "Confirm event timestamp, allowed/blocked decision, metadata minimization, and response owner.", boundary: "Package or AI-provider usage inventory does not establish AI prompt or MCP tool-call prevention." },
      ]} /> : null}
      {slug === "bay-platform" ? <ProductFocus stages={[
        { title: "Discover", summary: "A short-lived collector pushed through MDM or EDR inventories agents, MCP servers, extensions, packages, skills and local models, then exits.", check: "Confirm OS coverage, the MDM or EDR used for rollout, scan cadence and how fast a newly installed agent appears.", boundary: "A point-in-time inventory is not continuous monitoring, and discovery alone does not block anything." },
        { title: "Set policy", summary: "Lighthouse drafts per-team policy from about 30 days of observed agent activity and lets teams replay it against that period.", check: "Replay a draft policy against real history and review what it would have blocked before turning it on.", boundary: "A learned baseline can approve risky behavior that was already normal; the under-1% false-positive figure is a vendor claim." },
        { title: "Decide", summary: "When an agent proposes an action, the AI tool hands it to Bay Enforcer through a native hook, which returns Allow, Ask or Deny using the whole session.", check: "Use a benign synthetic action (for example, a test command against a dummy bucket) to confirm the verdict arrives before the action runs.", boundary: "Only tools that expose hooks, and only the events they expose, can be decided pre-execution. Collector-only deployments detect but do not prevent." },
        { title: "Record", summary: "The action, session context, policy and verdict feed the inventory and entity graph for investigation.", check: "Confirm event fields, retention, export to the SIEM and who owns follow-up on an Ask or Deny.", boundary: "An audit trail of agent actions is not proof that every risky action was intercepted." },
      ]} /> : null}
      {slug === "kingfisher" ? <ProductFocus stages={[
        { title: "Detect", summary: "Match candidate secrets in authorized targets.", check: "Inspect source, pinned rule ID, location and redacted finding.", boundary: "A match is a candidate, not proof that the credential is active." },
        { title: "Validate", summary: "Optionally ask a supported issuer whether a credential works.", check: "Confirm provider support, test authorization, outcomes and network side effects.", boundary: "Timeouts and unsupported credential types are inconclusive, not invalid." },
        { title: "Map", summary: "Investigate available identity and permission context.", check: "Confirm mapped provider, read-only scope and least-privilege permissions.", boundary: "Provider-specific mapping is not universal blast-radius coverage." },
        { title: "Triage", summary: "Prioritize evidence and assign an owner.", check: "Confirm output format, fingerprint, redaction and reviewer handoff.", boundary: "Importing other scanner results is not native detector support." },
        { title: "Revoke", summary: "Contain an exposed credential with explicit approval.", check: "Confirm supported provider, authority, impact assessment and rollback.", boundary: "No live revocation in this research workflow; it can disrupt applications." },
      ]} /> : null}
      {slug === "kingfisher" ? (
        <section aria-labelledby="kingfisher-upstream" className="mt-9">
          <AnchorHeading id="kingfisher-upstream" className="text-2xl font-semibold">Upstream project</AnchorHeading>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Five distinct stages, not one universal control. Provider-specific support and the active release must be checked in upstream documentation.</p>
          <p className="mt-4 text-sm leading-6"><strong>Open source:</strong> Rust-based, Apache-2.0 according to the upstream project. Its stated benchmarks and feature coverage are publisher reports, not independently tested results.</p>
          <a href="https://github.com/mongodb/kingfisher" className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Read Kingfisher source and documentation</a>
        </section>
      ) : null}
      {ciam ? <CiamMarketContext slug={slug} /> : null}
      <section aria-labelledby="limitations" className="mt-8 rounded-xl border border-border p-4">
        <AnchorHeading id="limitations" className="text-xl font-semibold">What this does not establish</AnchorHeading>
        <p className="mt-2 text-sm leading-6">{details.limitation}</p>
      </section>

      {fit ? (
        <section aria-labelledby="market-fit" className="mt-9">
          <AnchorHeading id="market-fit" className="text-2xl font-semibold">Where it fits in the market</AnchorHeading>
          <p className="mt-2 text-sm text-muted-foreground">Grouped by how each product gets onto the device. A shared approach is not a ranking or a direct-competitor finding.</p>
          <dl className="mt-4 grid gap-4 text-sm leading-6">
            <div>
              <dt className="font-semibold">Deployment</dt>
              <dd className="mt-1">{fit.deployment}</dd>
            </div>
            <div>
              <dt className="font-semibold">Analyst view</dt>
              <dd className="mt-1">{fit.analyst.text} <a href={fit.analyst.href} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{fit.analyst.label}</a></dd>
            </div>
          </dl>
          <h3 className="mt-4 font-semibold">Nearest peers by approach</h3>
          <ul className="mt-2 grid gap-3 md:grid-cols-2">
            {fit.peers.map((group) => (
              <li key={group.approach} className="min-w-0 rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-medium">{group.approach}</p>
                <ul className="mt-2 flex flex-wrap gap-x-4">
                  {group.items.map((item) => (
                    <li key={item.name}><Link href={item.href} className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">{item.name}</Link></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="evidence" className="mt-9 min-w-0">
        <AnchorHeading id="evidence" className="text-2xl font-semibold">Source-backed product evidence</AnchorHeading>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">Every statement links to its publisher source and review date. Missing evidence remains Unknown, not unsupported.</p>
        {slug === "kingfisher" ? (
          <p className="mb-4 text-sm leading-6">
            <strong>Detector coverage:</strong> not evaluated. Technical rule and analyzer coverage stays in Detector Coverage Atlas until its separate pinned-source parser is implemented. This page does not treat an imported scanner report as native Kingfisher detector coverage.
          </p>
        ) : null}
        {unknownBoundaries.length > 0 ? (
          <div className="mb-4 rounded-lg border border-dashed border-border p-4">
            <h3 className="font-semibold">Unknown control boundaries</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">No source-backed claim is recorded for these boundaries. Unknown is not a finding that the product lacks the control.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
              {unknownBoundaries.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        ) : null}
        <ProductEvidenceExplorer
          groupBySource={Boolean(fit)}
          claims={claims}
          asOf={catalog.asOf}
          recheckClaimIds={claims.filter((claim) => claimNeedsRecheck(claim, catalog.sources, catalog.asOf)).map((claim) => claim.id)}
        />
      </section>

      <section aria-labelledby="investigate" className="mt-9">
        <AnchorHeading id="investigate" className="text-2xl font-semibold">Questions to validate in a pilot</AnchorHeading>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{details.questions.map((question) => <li key={question}>{question}</li>)}</ul>
      </section>

      <section aria-labelledby="adjacency" className="mt-9">
        <AnchorHeading id="adjacency" className="text-2xl font-semibold">Where it fits</AnchorHeading>
        <ul className="mt-3 flex flex-wrap gap-2">{related.map((item) => (
          <li key={item.id}><Link href={`/categories/${item.slug}`} className="inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm text-primary underline underline-offset-4">{item.name}</Link></li>
        ))}</ul>
      </section>

      {slug === "kingfisher" ? (
        <aside className="mt-10 border-t border-border pt-6">
          <h2 className="text-xl font-semibold">Technical detector coverage lives in Detector Coverage Atlas</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">The Atlas registers Kingfisher as not evaluated. Rule-level and optional analyzer comparisons will appear only after a pinned-source parser and provenance review. An imported TruffleHog report is not proof of native Kingfisher detector coverage.</p>
          <a href="https://github.com/heyfunwhoa/detector-coverage-atlas" className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Open Detector Coverage Atlas repository</a>
        </aside>
      ) : ciam ? null : (
        <aside className="mt-10 border-t border-border pt-6">
          <h2 className="text-xl font-semibold">Compare only when needed</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Start with the product&apos;s own control points and limitations. The comparison matrix combines documented evidence with explicit Unknown states, not a winner or score.</p>
          {slug === "bay-platform" ? (
            <Link href={AGENTIC_ENDPOINT_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Compare Bay with CrowdStrike, Island and Knostic</Link>
          ) : (
            <Link href={DEVELOPER_ENDPOINT_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Compare GitGuardian and Aikido</Link>
          )}
        </aside>
      )}
    </main>
  );
}
