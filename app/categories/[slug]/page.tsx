import { CiamEvaluationGuide } from "@/components/ciam-evaluation-guide";
import { EndpointEvaluationGuide } from "@/components/endpoint-evaluation-guide";
import { SacrMarketGroups } from "@/components/sacr-market-groups";
import { productDestination } from "@/lib/product-destination";
import { AwsSecurityHubGuide } from "@/components/aws-security-hub-guide";
import { CredentialExposureHandoff, WorkforceIdentityGuide } from "@/components/identity-response-guides";
import { SecretsManagementGuide } from "@/components/secrets-management-guide";
import exposureGroups from "@/research/public-exposure-options.json";
import { ExposureIntelligenceResearch, hasExposureIntelligenceResearch } from "@/components/exposure-intelligence-research";
import { PublicSecretMonitoring } from "@/components/public-secret-monitoring";
import { EndpointGlossary } from "@/components/endpoint-glossary";
import { ExternalExposureGuides } from "@/components/external-exposure-guides";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SECRETS_COMPARISON_URL, DEVELOPER_ENDPOINT_COMPARISON_URL } from "@/lib/comparison-selection";
import { AcademyLinks } from "@/components/academy-links";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AreaDiagram } from "@/components/area-diagram";
import { CloudAppShortlist, DataSecurityShortlist } from "@/components/cloud-app-shortlist";
import { ClaimList } from "@/components/claims";
import { FlowStrip } from "@/components/category-map";
import { PageIntro } from "@/components/chrome";
import { catalog, categoryBySlug, claimsForSubject, identityRequirementsForCategory, sourceById, vendorById } from "@/lib/catalog";
import { painsForCategory, seatById, seatsForCategory } from "@/lib/persona-graph";
import { targetingForCategory } from "@/lib/vendor-targeting";
import { formatDate } from "@/lib/format";
import { incidentFilterUrl, incidentsForCategory, NO_INCIDENT_FILTERS } from "@/lib/incident-feed";

export function generateStaticParams() {
  return catalog.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: categoryBySlug(slug)?.name ?? "Category" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const domains = catalog.domains.filter((domain) => category.domainIds.includes(domain.id));
  const adjacent = catalog.categories.filter((item) => category.adjacentCategoryIds.includes(item.id));
  const products = catalog.products.filter((product) =>
    product.primaryCategoryIds.includes(category.id),
  );
  const useCases = catalog.useCases.filter((useCase) => useCase.categoryIds.includes(category.id));
  const primaryVendors = [...new Set(products.map((product) => product.vendorId))]
    .flatMap((id) => { const vendor = vendorById(id); return vendor ? [vendor] : []; });
  const categoryClaims = claimsForSubject("category", category.id);
  const requirements = identityRequirementsForCategory(category.id);
  const relatedIncidents = incidentsForCategory(category.id);
  const owningSeats = seatsForCategory(category.id);
  const seatPains = painsForCategory(category.id);
  const targeting = targetingForCategory(category.id);
  const targetingRows = catalog.vendorSeatTargeting.filter((row) => row.categoryId === category.id);
  const categoryAlternatives = catalog.alternatives.filter((alt) => alt.categoryId === category.id);
  const categoryTriggers = catalog.buyingTriggers.filter((trigger) => trigger.categoryIds.includes(category.id));
  const categoryObjections = catalog.objections.filter((objection) => objection.categoryIds.includes(category.id));
  // Shows on each product tile whether the map holds any current claim for it.
  const productEvidenceNote = (productId: string) => {
    const current = claimsForSubject("product", productId).filter((claim) => claim.verificationStatus !== "superseded");
    return current.length === 0 ? "No sourced claim yet" : `${current.length} ${current.length === 1 ? "claim" : "claims"}`;
  };
  const sourcingLabel = categoryClaims.length > 0
    ? "The description, buyer question, owner, budget, triggers, outcomes, workflow, and illustrative flow are the map's wording. The sourced sentences are the claims below."
    : "The description, buyer question, owner, budget, triggers, outcomes, workflow, and illustrative flow are the map's wording. No source is attached to them yet.";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }]} domains={domains.map((domain) => ({ href: `/domains/${domain.slug}`, label: domain.name }))} current={category.name} />
      <PageIntro kicker={category.layer === "adjacent" ? "Adjacent" : "Category"} title={category.name} lede={category.definition} />
      <p id="category-buyer" tabIndex={-1} className="mt-4 max-w-3xl scroll-mt-24 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-ring">
        <span className="font-semibold">Buyer question. </span>
        {category.buyerQuestion}
      </p>
      <nav aria-label="On this category page" className="mt-2 flex flex-wrap gap-x-4 text-sm text-primary [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:underline">
        {category.id === "endpoint-security" && <a href="#endpoint-evaluation">Evaluate endpoint coverage</a>}
        {category.id === "ciam" && <a href="#ciam-evaluation">Evaluate enterprise SSO</a>}
        <a href="#category-products">Products</a>
        <a href="#category-workflow">Workflow</a>
        <a href="#category-adjacent">Adjacent categories</a>
        {relatedIncidents.length > 0 && <a href="#category-incidents">Incidents</a>}
        {hasExposureIntelligenceResearch(category.id) && <a href="#market-research">Market research</a>}
        <a href="#category-evidence">Category sources</a>
      </nav>
      {category.id === "endpoint-security" && <EndpointEvaluationGuide />}
      {category.id === "ciam" && <CiamEvaluationGuide />}
      <section className="mt-4" aria-labelledby="category-products">
        <h2 id="category-products" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">Primary products</h2>
        {products.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            No primary product is assigned. An empty list is a gap in this map, not a finding that the field has no vendors.
          </p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={productDestination(product, vendorById(product.vendorId)!.slug)}
                  className="flex min-h-11 flex-wrap items-baseline justify-between gap-x-3 break-words rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>{product.name}</span>
                  <span className="text-xs text-muted-foreground">{productEvidenceNote(product.id)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">{sourcingLabel}</p>
      {exposureGroups.some((group) => group.cases.some((item) => item.categoryId === category.id)) && (
        <p className="mt-5 text-sm"><Link href="/landscape/public-exposure" className="text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">Compare public monitoring and external exposure scenarios</Link></p>
      )}
      {category.id === "endpoint-security" && <EndpointGlossary />}
      {category.id === "cnapp" && <AwsSecurityHubGuide />}
      {["ctem", "cspm", "secrets-management", "workforce-identity"].includes(category.id) && (
        <p className="mt-4 text-sm"><Link className="text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring" href="/categories/cnapp#aws-security-hub">Explore AWS Security Hub buyer scenarios</Link></p>
      )}
      {category.id === "workforce-identity" && <WorkforceIdentityGuide />}
      {category.id === "secrets-management" && <><SecretsManagementGuide /><CredentialExposureHandoff /></>}
      <ExternalExposureGuides categoryId={category.id} />
      <SacrMarketGroups categoryId={category.id} />
      {relatedIncidents.length > 0 && (
        <section className="mt-6 rounded-xl border border-border bg-card p-4" aria-labelledby="category-incidents">
          <h2 id="category-incidents" className="text-xl">
            Related incidents <span className="text-base font-normal text-muted-foreground">({relatedIncidents.length})</span>
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Reviewed incidents that show the risk this category is bought to address. A link is not a claim that any
            product here would have prevented the incident.
          </p>
          <ul className="mt-3 grid gap-3 md:grid-cols-3">
            {relatedIncidents.slice(0, 3).map(({ item, link }) => (
              <li key={link.id} className="min-w-0 rounded-lg border border-border bg-background p-3 text-sm">
                <Link
                  href={`/incidents/${item.slug}`}
                  className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.incident.title}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">
                  Disclosed {formatDate(item.incident.disclosedOn)} ·{" "}
                  {item.sources.map((source) => source.publisher).join(", ")}
                </p>
                <p className="mt-2 leading-6">{link.rationale}</p>
              </li>
            ))}
          </ul>
          <Link
            href={incidentFilterUrl({ ...NO_INCIDENT_FILTERS, category: category.id })}
            className="mt-3 inline-block text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {relatedIncidents.length > 3
              ? `See all ${relatedIncidents.length} in the incident feed, with talk tracks`
              : "Open in the incident feed, with talk tracks"}
          </Link>
        </section>
      )}
      {category.id === "secrets-detection" ? (
        <section className="mt-6 rounded-xl border border-border bg-card p-4" aria-labelledby="compare-category">
          <h2 id="compare-category" className="text-2xl">Compare secrets detection evidence</h2>
          <p className="mt-2 text-sm leading-6">
            Start with TruffleHog, GitHub Secret Scanning, GitGuardian and Gitleaks,
            then find other products in this category. Compare discovery and credential
            verification separately; each supported statement links to its original source.
            This shortlist is a starting point, not a ranking.
          </p>
          <Link href={SECRETS_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Compare secrets detection products
          </Link>
        </section>
      ) : null}
      {["secrets-detection", "digital-risk-protection"].includes(category.id) && <PublicSecretMonitoring categoryId={category.id} />}
      {category.id === "endpoint-control" ? (
        <section className="mt-6 rounded-xl border border-border bg-card p-4" aria-labelledby="compare-developer-endpoint">
          <h2 id="compare-developer-endpoint" className="text-2xl">Compare developer endpoint controls</h2>
          <p className="mt-2 text-sm leading-6">
            Compare GitGuardian and Aikido by control boundary, not vendor logo.
            An unsourced cell stays Unknown. Vendor-published documentation is not an independent effectiveness test.
          </p>
          <Link href={DEVELOPER_ENDPOINT_COMPARISON_URL} className="mt-3 inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Compare developer endpoint protection
          </Link>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 id="category-workflow" tabIndex={-1} className="scroll-mt-4 text-2xl">Illustrative flow</h2>
        <div className="mt-3">
          <FlowStrip flow={category.flow} />
        </div>
      </section>
      <dl className="mt-8 grid gap-4 text-sm leading-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Who usually owns it</dt>
          <dd className="mt-1">{category.buyerOwner}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Budget</dt>
          <dd className="mt-1">{category.budgetSource}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Triggers</dt>
          <dd className="mt-1">{category.triggers.join("; ")}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="font-semibold">Outcomes worth measuring</dt>
          <dd className="mt-1">{category.outcomes.join("; ")}</dd>
        </div>
      </dl>
      <p className="mt-6 text-sm leading-6">{category.exampleWorkflow}</p>
      <ExposureIntelligenceResearch categoryId={category.id} />
      <CloudAppShortlist categoryId={category.id} />
      <DataSecurityShortlist categoryId={category.id} />
      <AcademyLinks categoryId={category.id} />
      <section className="mt-8">
        <h2 id="category-adjacent" tabIndex={-1} className="scroll-mt-4 text-2xl">Adjacent categories</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {adjacent.map((item) => (
            <li key={item.id}>
              <Link href={`/categories/${item.slug}`} className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl">Use cases</h2>
        <ul className="mt-3 space-y-2">
          {useCases.map((useCase) => (
            <li key={useCase.id}>
              <Link href={`/use-cases/${useCase.slug}`} className="text-sm font-medium text-primary hover:underline">
                {useCase.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {products.length > 0 ? (
        <div className="mt-8">
          <AreaDiagram
            title={category.name}
            problem={
              primaryVendors.length > 12
                ? `${category.buyerQuestion} The diagram shows 12 of ${primaryVendors.length} primary vendors.`
                : category.buyerQuestion
            }
            href={null}
            examples={primaryVendors.slice(0, 12).map((vendor) => ({
              label: vendor.name, href: `/vendors/${vendor.slug}`,
            }))}
          />
        </div>
      ) : null}
      {categoryAlternatives.length > 0 || categoryTriggers.length > 0 || categoryObjections.length > 0 ? (
        <section className="mt-8 grid gap-6 text-sm leading-6 lg:grid-cols-3" aria-label="Buying context">
          <div>
            <h2 className="text-2xl">What buyers do instead</h2>
            {categoryAlternatives.length === 0 ? (
              <p className="mt-2 text-muted-foreground">Not recorded yet.</p>
            ) : (
              <ul className="mt-2 space-y-3">
                {categoryAlternatives.map((alt) => (
                  <li key={alt.id}>
                    <p className="font-medium">{alt.name}</p>
                    <p>Good enough when: {alt.whenItWins}</p>
                    <p className="text-muted-foreground">Breaks when: {alt.whenItBreaks}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-2xl">What starts the conversation</h2>
            {categoryTriggers.length === 0 ? (
              <p className="mt-2 text-muted-foreground">Not recorded yet.</p>
            ) : (
              <ul className="mt-2 space-y-3">
                {categoryTriggers.map((trigger) => (
                  <li key={trigger.id}>
                    <p>{trigger.trigger}</p>
                    {trigger.publicSignal ? <p className="text-muted-foreground">Public signal (a lead, not intent): {trigger.publicSignal}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-2xl">Common objections</h2>
            {categoryObjections.length === 0 ? (
              <p className="mt-2 text-muted-foreground">Not recorded yet.</p>
            ) : (
              <ul className="mt-2 space-y-3">
                {categoryObjections.map((objection) => (
                  <li key={objection.id}>
                    <p className="font-medium">&ldquo;{objection.objection}&rdquo;</p>
                    <p>Reframe to test: {objection.reframe}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-muted-foreground lg:col-span-3">Hypotheses unless a source is listed. Vendor-neutral: none of these name a product.</p>
        </section>
      ) : null}
      {owningSeats.length > 0 || seatPains.length > 0 || targeting.vendorCount > 0 ? (
        <section className="mt-8" aria-labelledby="category-seats">
          <h2 id="category-seats" className="text-2xl">Who owns it and who feels the problem</h2>
          {owningSeats.length > 0 ? (
            <p className="mt-2 text-sm">
              Usually owned by{" "}
              {owningSeats.map((seat, index) => (
                <span key={seat.id}>
                  {index > 0 ? ", " : ""}
                  <Link href={`/personas/${seat.id}`} className="underline underline-offset-4 hover:text-foreground">{seat.name}</Link>
                </span>
              ))}
              .
            </p>
          ) : null}
          {targeting.vendorCount > 0 ? (
            <div className="mt-4 text-sm">
              <h3 className="text-lg">Who vendors sell to</h3>
              <p className="mt-1 text-muted-foreground">
                From {targeting.vendorCount} vendors&apos; own pages, mapped to seats by us. A vendor&apos;s audience is not proof of who buys.
              </p>
              <ul className="mt-2 space-y-1">
                {targeting.seats.map(({ seatId, count }) => (
                  <li key={seatId}>
                    <Link href={`/personas/${seatId}`} className="underline underline-offset-4 hover:text-foreground">{seatById(seatId)?.name ?? seatId}</Link>
                    : {count} of {targeting.vendorCount} vendors
                  </li>
                ))}
              </ul>
              <details className="mt-2">
                <summary className="cursor-pointer text-muted-foreground">Sources by vendor</summary>
                <ul className="mt-2 space-y-1">
                  {targetingRows.map((row) => (
                    <li key={row.vendorId}>
                      {vendorById(row.vendorId)?.name ?? row.vendorId}: {row.audience}{" "}
                      {row.urls.map((url, index) => (
                        <a key={url} href={url} className="underline underline-offset-4" rel="noreferrer">[{index + 1}]</a>
                      ))}{" "}
                      <span className="text-muted-foreground">
                        (checked {row.checkedAt}{row.inspection === "search-excerpt" ? ", from a search excerpt" : ""}
                        {row.mentionedSeatIds.length > 0 ? `; also mentions ${row.mentionedSeatIds.map((id) => seatById(id)?.name ?? id).join(", ")}, not counted` : ""})
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ) : null}
          {seatPains.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {seatPains.map(({ seat, pain }) => (
                <li key={`${seat.id}-${pain.pain}`}>
                  <Link href={`/personas/${seat.id}`} className="font-medium underline underline-offset-4 hover:text-foreground">{seat.name}</Link>
                  : {pain.pain}
                  {pain.evidence === "hypothesis" ? <span className="text-muted-foreground"> (hypothesis)</span> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
      {requirements.length > 0 ? (
        <section className="mt-8" aria-labelledby="category-regulation">
          <h2 id="category-regulation" className="text-2xl">Industry rules that call for these controls</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Each rule names a control this category can help with. Linking a rule here does not make any product compliant.
          </p>
          <ul className="mt-3 space-y-3">
            {requirements.map(({ overlay, req }) => (
              <li key={`${overlay.id}-${req.id}`} className="rounded-xl border border-border bg-card p-4 text-sm">
                <p className="font-medium">{overlay.name}</p>
                <p className="mt-1 leading-6">{req.requirement}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {req.rule}
                  {req.sourceIds.map((id) => {
                    const source = sourceById(id);
                    return source ? (
                      <span key={id}>
                        {" · "}
                        <a href={source.url} className="text-primary underline-offset-4 hover:underline">
                          {source.publisher}
                        </a>
                        {` (retrieved ${formatDate(source.retrievedAt)})`}
                      </span>
                    ) : null;
                  })}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 id="category-evidence" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">Claims about this category</h2>
        <div className="mt-3">
          <ClaimList claims={categoryClaims} />
        </div>
      </section>
    </main>
  );
}
