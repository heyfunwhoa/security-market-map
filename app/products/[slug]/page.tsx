import { ProductCategoryLinks } from "@/components/product-category-links";
import { productComparisonUrl } from "@/lib/landscape-shortlist";
import { notFound } from "next/navigation";
import { ProfileBreadcrumbs, ProfileLink } from "@/components/catalog-profile-navigation";
import { PageIntro, StatusPill } from "@/components/chrome";
import { ProductEvidenceExplorer } from "@/components/product-evidence-explorer";
import { CiamMarketContext } from "@/components/ciam-market-context";
import { ciamProfiles, isCiamProduct, type CiamProductSlug } from "@/lib/data/ciam-profiles";
import { ProductSectionNav } from "@/components/product-section-nav";
import { catalog, claimsForSubject, vendorById } from "@/lib/catalog";
import { claimNeedsRecheck } from "@/lib/coverage";
import { availabilityLabel } from "@/lib/format";
import { agenticEndpointComparisonUrl, DEVELOPER_ENDPOINT_COMPARISON_URL } from "@/lib/comparison-selection";
import { productFit } from "@/lib/product-fit";
import { AnchorHeading } from "@/components/anchor-heading";
import { ProductProfile } from "@/components/product-profile";
import { hasProfileSteps } from "@/lib/product-profile";
import {
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
  "island-agentic-endpoint-posture": {
    action: "An MCP server, skill, hook, AI client, package or extension is installed or changed on a device",
    control: "Island Desktop, or an agentless deployment through existing MDM or EDR, inventories AI assets; Island scores each one in its cloud and policy blocks, allow-lists, removes or locks components that cross a risk threshold",
    evidence: "AI asset inventory, per-asset risk score with impact, likelihood and findings, and the matched policy action",
    limitation: "Island's post does not say whether any control stops an individual agent action before it runs, which enforcement actions work in agentless mode, or which operating systems are supported. Scores are Island's own analysis and are not independently tested.",
    questions: ["Which enforcement actions work in agentless mode, and how soon after a scan do they apply?", "Can any control stop a single agent action before it runs, or only block, remove or lock assets?", "Which operating systems and AI clients are supported today?", "What device data goes to Island's cloud for scoring?", "Can it be bought without Island Enterprise Browser or Island Desktop?"],
  },
  "palo-alto-koi": {
    action: "A developer or agent installs a package, extension, plugin or MCP server, or an agent proposes a shell, file, MCP, skill or network action",
    control: "An endpoint component and registry proxy inventory and govern non-binary software; runtime policies block or ask before named agent actions for Cursor, Claude Code and Antigravity",
    evidence: "Software and agent inventory, developer-agent session timeline, blocked or approved actions, and remediation records",
    limitation: "Runtime blocking is described for Cursor, Claude Code and Antigravity only, and Palo Alto does not say how those actions are intercepted. Deployment descriptions differ: Palo Alto describes an endpoint deployment portal, Koi's page an MDM-pushed script, and SACR a network supply-chain gateway. Customer figures come from a vendor-published story.",
    questions: ["Which components does the pilot need: endpoint package, registry proxy, SASE routing, or all three?", "Which agents get pre-execution runtime policies today, and what happens for other AI tools?", "Is Koi bought standalone, through Cortex XDR or through Prisma AIRS, and does packaging change what is included?", "What session data leaves the device, and how long is it kept?", "What does Ask look like to a developer, and who approves it?"],
  },
  "crowdstrike-falcon-guardian": {
    action: "An AI agent runs, or tries to run, on a managed Windows or macOS endpoint",
    control: "The existing Falcon sensor inventories known and shadow agents, links prompts, identity, tool calls and skills to endpoint activity, and Agent Access Controls block agents that are not approved",
    evidence: "Agent inventory with deployer and status, the agent execution chain, detections, and agent data in Falcon Next-Gen SIEM",
    limitation: "Agent Access Controls decide which agents may run; CrowdStrike's release does not say whether individual agent actions or tool calls are blocked before they run. No GA dates are given, AI Gateway and Falcon Complete for Guardian are future capabilities, and discovery is stated for Windows and macOS only.",
    questions: ["Which Falcon Guardian components are generally available today, and which are licensed separately?", "Can a policy stop a single tool call or command before it runs, or only stop an agent from running?", "Is Falcon Guardian the product SACR calls Falcon AIDR?", "What covers Linux hosts and developer containers?", "Which agent fields reach Next-Gen SIEM, and how long are they kept?"],
  },
  "aikido-device-protection": {
    action: "Developer or agent requests a package from a supported registry",
    control: "Local selective interception evaluates package-domain traffic against synchronized policy and intelligence",
    evidence: "Install verdict, matched policy, device/package inventory and local secret findings",
    limitation: "Coverage depends on supported ecosystems, traffic paths and installed agent configuration. AI usage inventory is not the same as AI tool-call blocking.",
    questions: ["Does the package manager, mirror, OS or container path intercept correctly?", "What is the failure mode offline?", "How are TLS trust, exceptions and developer latency handled?", "What information leaves the device?"],
  },
};


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProductResearchSlug(slug)) notFound();
  const product = catalog.products.find((item) => item.slug === slug);
  if (!product) notFound();
  const vendor = vendorById(product.vendorId);
  const ciam = isCiamProduct(slug);
  const details = ciam ? ciamProfiles[slug] : learning[slug];
  const claims = claimsForSubject("product", product.id);
  const categoryLinks = (ids: string[]) => catalog.categories
    .filter((item) => ids.includes(item.id))
    .map((item) => ({ slug: item.slug, label: item.name }));
  const category = productResearchCategory(slug);
  const unknownBoundaries = unknownControlBoundaries(product.id, catalog.asOf);
  const fit = productFit[slug];
  const profile = !ciam && hasProfileSteps(slug);
  const buyerQuestion = profile ? catalog.useCases.find((useCase) => useCase.id === product.useCaseIds[0])?.buyerQuestion : undefined;

  return (
    <main className="mx-auto min-w-0 max-w-6xl px-4 py-10">
      <ProfileBreadcrumbs category={category} current={product.name} />
      <PageIntro kicker="Product research" title={product.name} lede={product.positioning} />
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <StatusPill status={product.availability} />
        <ProfileLink href={fit ? agenticEndpointComparisonUrl(product.id) : productComparisonUrl(product)} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">{fit ? "Compare with peers" : `Compare ${product.name}`}</ProfileLink>
        {vendor ? <ProfileLink className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={`/vendors/${vendor.slug}`}>About {vendor.name}</ProfileLink> : null}
        <a className="inline-flex min-h-11 max-w-full items-center text-primary underline underline-offset-4 [overflow-wrap:anywhere]" href={product.officialUrl}>Official product documentation</a>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{availabilityLabel(product.availability)}. {product.availabilityNote}</p>
      {buyerQuestion ? (
        <p className="mt-4 rounded-lg border-l-4 border-primary bg-card p-4 text-base leading-7"><span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Buyer question</span>{buyerQuestion}</p>
      ) : null}

      <ProductSectionNav sections={productResearchSections(slug)} />
      {profile && details ? (
        <ProductProfile
          product={product}
          vendor={vendor}
          primaryCategories={categoryLinks(product.primaryCategoryIds)}
          adjacentCategories={categoryLinks(product.adjacentCategoryIds.filter((id) => !product.primaryCategoryIds.includes(id)))}
          limitation={details.limitation}
          questions={details.questions}
          extraAfterSteps={slug === "kingfisher" ? (
            <section aria-labelledby="kingfisher-upstream" className="mt-9">
              <AnchorHeading id="kingfisher-upstream" className="text-2xl font-semibold">Upstream project</AnchorHeading>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Five distinct stages, not one universal control. Provider-specific support and the active release must be checked in upstream documentation.</p>
              <p className="mt-4 text-sm leading-6"><strong>Open source:</strong> Rust-based, Apache-2.0 according to the upstream project. Its stated benchmarks and feature coverage are publisher reports, not independently tested results.</p>
              <a href="https://github.com/mongodb/kingfisher" className="mt-3 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">Read Kingfisher source and documentation</a>
              <p className="mt-4 text-sm leading-6"><strong>Detector coverage:</strong> not evaluated. Technical rule and analyzer coverage stays in Detector Coverage Atlas until its separate pinned-source parser is implemented. This page does not treat an imported scanner report as native Kingfisher detector coverage.</p>
            </section>
          ) : null}
        />
      ) : (
        <>
      <section aria-labelledby="how-it-works" className="mt-9">
        <AnchorHeading id="how-it-works" className="text-2xl font-semibold">How it works</AnchorHeading>
        <p className="mt-2 text-sm text-muted-foreground">{ciam ? "Follow one customer through sign-in and use the pilot to check what the application enforces." : "Illustrative control sequence. Vendor documentation is not an independently verified blocking test."}</p>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {([["1. Trigger", details.action], ["2. Control", details.control], ["3. Evidence", details.evidence]] as const).map(([heading, description]) => (
            <li key={heading} className="min-w-0 rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">{heading}</h3>
              <p className="mt-2 text-sm leading-6 [overflow-wrap:anywhere]">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      {ciam ? <CiamMarketContext slug={slug} /> : null}
      <section aria-labelledby="limitations" className="mt-8 rounded-xl border border-border p-4">
        <AnchorHeading id="limitations" className="text-xl font-semibold">What this does not establish</AnchorHeading>
        <p className="mt-2 text-sm leading-6">{details.limitation}</p>
      </section>


      <section aria-labelledby="evidence" className="mt-9 min-w-0">
        <AnchorHeading id="evidence" className="text-2xl font-semibold">Source-backed product evidence</AnchorHeading>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">Every statement links to its publisher source and review date. Missing evidence remains Unknown, not unsupported.</p>
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
        <dl className="mt-3 space-y-3">
          <ProductCategoryLinks primary={categoryLinks(product.primaryCategoryIds)} adjacent={categoryLinks(product.adjacentCategoryIds.filter((id) => !product.primaryCategoryIds.includes(id)))} />
        </dl>
      </section>
        </>
      )}

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
          {fit ? (
            <ProfileLink href={agenticEndpointComparisonUrl(product.id)} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Compare with agentic endpoint peers</ProfileLink>
          ) : (
            <ProfileLink href={DEVELOPER_ENDPOINT_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Compare GitGuardian and Aikido</ProfileLink>
          )}
        </aside>
      )}
    </main>
  );
}
