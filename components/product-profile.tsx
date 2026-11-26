import { ProfileLink } from "@/components/catalog-profile-navigation";
import { ProductCategoryLinks } from "@/components/product-category-links";
import { AnchorHeading } from "@/components/anchor-heading";
import { SourceBadge } from "@/components/source-badge";
import { StatusPill } from "@/components/chrome";
import { ProductEvidenceExplorer } from "@/components/product-evidence-explorer";
import { catalog, claimsForSubject } from "@/lib/catalog";
import { claimNeedsRecheck } from "@/lib/coverage";
import { resolveProfileSteps } from "@/lib/product-profile";
import { productFit } from "@/lib/product-fit";
import { unknownControlBoundaries } from "@/lib/product-research";
import type { Claim, Product, Vendor } from "@/lib/schema";

const LINK =
  "inline-flex min-h-11 items-center text-primary underline underline-offset-4 [overflow-wrap:anywhere]";

function ProofItem({ claim }: { claim: Claim }) {
  return (
    <li className="min-w-0 border-t border-border pt-3 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-2">
        <SourceBadge claim={claim} />
        <span className="text-xs text-muted-foreground">
          Published {claim.publishedAt ?? "Unknown"} · checked{" "}
          {claim.lastCheckedAt}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 [overflow-wrap:anywhere]">
        {claim.statement}
      </p>
      <a
        href={claim.sourceUrl}
        aria-label={`Open original source: ${claim.statement}`}
        className={`${LINK} text-sm`}
      >
        Open original source
      </a>
    </li>
  );
}

/**
 * Source-based product profile: where it fits, steps with their recorded proof, company context,
 * pilot questions and every source. Each statement comes from a recorded claim, event, story or price;
 * gaps say Unknown or "No recorded source".
 */
export function ProductProfile({
  product,
  vendor,
  primaryCategories,
  adjacentCategories,
  limitation,
  questions,
  extraAfterSteps,
}: {
  product: Product;
  vendor: Vendor | undefined;
  primaryCategories: { slug: string; label: string }[];
  adjacentCategories: { slug: string; label: string }[];
  limitation: string;
  questions: readonly string[];
  extraAfterSteps?: React.ReactNode;
}) {
  const asOf = catalog.asOf;
  const fit = productFit[product.id];
  const steps = resolveProfileSteps(product.id, asOf);
  const inSteps = new Set(steps.flatMap((step) => step.unknown));
  const notShown = unknownControlBoundaries(product.id, asOf).filter(
    (name) => !inSteps.has(name),
  );
  const claims = claimsForSubject("product", product.id);
  const vendorClaims = vendor ? claimsForSubject("vendor", vendor.id) : [];
  const events = vendor
    ? catalog.events
        .filter((event) => event.vendorId === vendor.id)
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    : [];
  const stories = vendor
    ? catalog.stories.filter((story) => story.vendorId === vendor.id)
    : [];
  const prices = catalog.pricing.filter(
    (price) => price.productId === product.id,
  );
  const sourceUrl = (id: string) =>
    catalog.sources.find((source) => source.id === id)?.url;

  return (
    <>
      <section aria-labelledby="where-it-fits" className="mt-9">
        <AnchorHeading id="where-it-fits" className="text-2xl font-semibold">
          Where it fits
        </AnchorHeading>
        {fit ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Grouped by how each product gets onto the device. A shared
              approach is not a ranking or a direct-competitor finding.
            </p>
            <dl className="mt-4 grid gap-4 text-sm leading-6">
              <div>
                <dt className="font-semibold">Deployment</dt>
                <dd className="mt-1">{fit.deployment}</dd>
              </div>
              <div>
                <dt className="font-semibold">Analyst view</dt>
                <dd className="mt-1">
                  {fit.analyst ? (
                    <>
                      {fit.analyst.text}{" "}
                      <a href={fit.analyst.href} className={LINK}>
                        {fit.analyst.label}
                      </a>
                    </>
                  ) : (
                    "No analyst coverage recorded. SACR's endpoint control report, as fetched, does not name this product; that is not proof it was excluded."
                  )}
                </dd>
              </div>
            </dl>
            <h3 className="mt-4 font-semibold">Nearest peers by approach</h3>
            <ul className="mt-2 grid gap-3 md:grid-cols-2">
              {fit.peers.map((group) => (
                <li
                  key={group.approach}
                  className="min-w-0 rounded-xl border border-border bg-card p-4"
                >
                  <p className="text-sm font-medium">{group.approach}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <ProfileLink href={item.href} className={`${LINK} text-sm`}>
                          {item.name}
                        </ProfileLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            No sourced deployment comparison or analyst placement is recorded
            for this product yet.
          </p>
        )}
        <h3 className="mt-4 font-semibold">Categories</h3>
        <dl className="mt-2 space-y-3">
          <ProductCategoryLinks primary={primaryCategories} adjacent={adjacentCategories} />
        </dl>
      </section>

      <section aria-labelledby="how-it-works" className="mt-9">
        <AnchorHeading id="how-it-works" className="text-2xl font-semibold">
          How it works, with proof
        </AnchorHeading>
        <p className="mt-2 text-sm text-muted-foreground">
          Each step lists the recorded sources behind it, what is still unknown,
          and how to test it. Step descriptions and tests are research guidance,
          not vendor claims.
        </p>
        <ol className="mt-4 grid gap-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="min-w-0 rounded-xl border border-border bg-card p-4"
            >
              <h3 className="text-lg font-semibold">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6">{step.summary}</p>
              <h4 className="mt-4 text-sm font-semibold">Proof</h4>
              {step.claims.length ? (
                <ul className="mt-2 grid gap-3">
                  {step.claims.map((claim) => (
                    <ProofItem key={claim.id} claim={claim} />
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  No recorded source for this step. That is a research gap, not
                  a finding that the product lacks it.
                </p>
              )}
              <h4 className="mt-4 text-sm font-semibold">Not proven</h4>
              <p className="mt-1 text-sm leading-6">{step.boundary}</p>
              {step.unknown.length ? (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Unknown: {step.unknown.join("; ")}.
                </p>
              ) : null}
              <h4 className="mt-4 text-sm font-semibold">Test it in a pilot</h4>
              <p className="mt-1 text-sm leading-6">{step.check}</p>
            </li>
          ))}
        </ol>
        {notShown.length ? (
          <div className="mt-4 rounded-lg border border-dashed border-border p-4">
            <h3 className="font-semibold">Not shown by any recorded source</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              These capabilities are in the comparison set for this
              product&apos;s buyer question. Unknown is not a finding that the
              product lacks them.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
              {notShown.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {extraAfterSteps}

      <section
        aria-labelledby="limitations"
        className="mt-8 rounded-xl border border-border p-4"
      >
        <AnchorHeading id="limitations" className="text-xl font-semibold">
          What this does not establish
        </AnchorHeading>
        <p className="mt-2 text-sm leading-6">{limitation}</p>
      </section>

      <section aria-labelledby="company" className="mt-9">
        <AnchorHeading id="company" className="text-2xl font-semibold">
          Company, customers and news
        </AnchorHeading>
        <p className="mt-2 text-sm text-muted-foreground">
          Only recorded items with a source. Nothing here is added to fill the
          page.
        </p>
        <h3 className="mt-4 font-semibold">Recent news</h3>
        {events.length ? (
          <ul className="mt-2 grid gap-2 text-sm leading-6">
            {events.map((event) => (
              <li key={event.id}>
                <span className="text-muted-foreground">
                  {event.date ?? "Date unknown"}
                </span>{" "}
                ·{" "}
                {sourceUrl(event.sourceId) ? (
                  <a href={sourceUrl(event.sourceId)} className={LINK}>
                    {event.title}
                  </a>
                ) : (
                  event.title
                )}
                <span className="block text-muted-foreground">
                  {event.summary}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            No sourced news recorded.
          </p>
        )}
        <h3 className="mt-4 font-semibold">Company facts</h3>
        {vendorClaims.length ? (
          <ul className="mt-2 grid gap-3">
            {vendorClaims.map((claim) => (
              <ProofItem key={claim.id} claim={claim} />
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            No sourced company facts recorded
            {vendor ? (
              <>
                {" "}
                on{" "}
                <ProfileLink href={`/vendors/${vendor.slug}`} className={LINK}>
                  the {vendor.name} page
                </ProfileLink>
              </>
            ) : null}
            .
          </p>
        )}
        <h3 className="mt-4 font-semibold">Customer stories</h3>
        {stories.length ? (
          <ul className="mt-2 grid gap-2 text-sm leading-6">
            {stories.map((story) => (
              <li key={story.id}>
                <StatusPill status={story.proofType} />{" "}
                {sourceUrl(story.sourceId) ? (
                  <a href={sourceUrl(story.sourceId)} className={LINK}>
                    {story.title}
                  </a>
                ) : (
                  story.title
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            No sourced customer story recorded. Customer names mentioned in news
            appear under company facts with their source.
          </p>
        )}
        <h3 className="mt-4 font-semibold">Pricing</h3>
        {prices.length ? (
          <ul className="mt-2 grid gap-2 text-sm leading-6">
            {prices.map((price) => (
              <li key={price.id}>
                <StatusPill status={price.signalType} /> {price.statement}{" "}
                <span className="text-muted-foreground">{price.caveats}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            No sourced pricing recorded.
          </p>
        )}
      </section>

      <section aria-labelledby="investigate" className="mt-9">
        <AnchorHeading id="investigate" className="text-2xl font-semibold">
          Questions to validate in a pilot
        </AnchorHeading>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
          {questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="evidence" className="mt-9 min-w-0">
        <AnchorHeading id="evidence" className="text-2xl font-semibold">
          All sources
        </AnchorHeading>
        <details className="mt-3 rounded-xl border border-border bg-card p-4">
          <summary className="min-h-11 cursor-pointer content-center font-medium">
            Show all {claims.length} recorded product claims, grouped by who
            said them
          </summary>
          <div className="mt-4">
            <ProductEvidenceExplorer
              groupBySource
              claims={claims}
              asOf={asOf}
              recheckClaimIds={claims
                .filter((claim) =>
                  claimNeedsRecheck(claim, catalog.sources, asOf),
                )
                .map((claim) => claim.id)}
            />
          </div>
        </details>
      </section>
    </>
  );
}
