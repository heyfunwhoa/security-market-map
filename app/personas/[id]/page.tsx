import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/chrome";
import { catalog } from "@/lib/catalog";
import { seatById, seatContext, seats } from "@/lib/persona-graph";
import { EVIDENCE_LABEL, FUNCTION_LABEL, PRESENCE_LABEL, SIZE_LABEL, humanize } from "@/lib/persona-labels";
import { typicalTitles } from "@/lib/title-match";
import type { CompanySize, SeniorityLevel } from "@/lib/schema";

const SIZES: CompanySize[] = ["small", "mid-market", "enterprise"];
const LEVELS: SeniorityLevel[] = ["c-level", "vp", "director", "manager", "senior-ic", "ic"];
const linkClass =
  "underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function generateStaticParams() {
  return seats().map((seat) => ({ id: seat.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: seatById(id)?.name ?? "Buyer seat" };
}

function seatLink(id: string) {
  const seat = seatById(id);
  return seat ? (
    <Link href={`/personas/${id}`} className={linkClass}>
      {seat.name}
    </Link>
  ) : (
    <span>{humanize(id)}</span>
  );
}

function categoryLink(id: string) {
  const category = catalog.categories.find((item) => item.id === id);
  return category ? (
    <Link key={id} href={`/categories/${category.slug}`} className={linkClass}>
      {category.name}
    </Link>
  ) : null;
}

function problemLink(id: string) {
  const useCase = catalog.useCases.find((item) => item.id === id);
  return useCase ? (
    <Link key={id} href={`/use-cases/${useCase.slug}`} className={linkClass}>
      {useCase.name}
    </Link>
  ) : null;
}

function joinNodes(nodes: (React.ReactNode | null)[]) {
  const present = nodes.filter(Boolean);
  return present.flatMap((node, index) => (index === 0 ? [node] : [", ", node]));
}

export default async function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const context = seatContext(id);
  if (!context) notFound();
  const { seat, links, useCases, vendors, overlays } = context;
  const profile = seat.profile;
  const titles = typicalTitles(seat.id);
  const sourceById = new Map(catalog.sources.map((source) => [source.id, source]));
  const seatObjections = catalog.objections.filter((objection) => objection.seatIds.includes(seat.id));
  const seatTriggers = catalog.buyingTriggers.filter((trigger) => trigger.seatIds.includes(seat.id));
  const sourceIds = [...new Set([...profile.sourceIds, ...profile.pains.flatMap((pain) => pain.sourceIds)])];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        parents={[
          { href: "/", label: "Home" },
          { href: "/personas", label: "Buyer seats" },
        ]}
        current={seat.name}
      />
      <PageIntro kicker={`${FUNCTION_LABEL[profile.function]} · ${humanize(profile.cluster)}`} title={seat.name} lede={profile.job} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8 text-sm leading-6">
          <section aria-labelledby="pains">
            <h2 id="pains" className="text-2xl">Pains</h2>
            <ul className="mt-3 space-y-3">
              {profile.pains.map((pain) => {
                const categories = joinNodes(pain.relatedCategoryIds.map(categoryLink));
                const problems = joinNodes(pain.relatedUseCaseIds.map(problemLink));
                return (
                  <li key={pain.pain} className="rounded-lg border border-border p-3">
                    <p className="font-medium">{pain.pain}</p>
                    <p className="mt-1 text-muted-foreground">
                      {EVIDENCE_LABEL[pain.evidence]}
                      {pain.sourceIds.length > 0
                        ? ` · ${pain.sourceIds.map((sid) => sourceById.get(sid)?.publisher ?? sid).join(", ")}`
                        : ""}
                    </p>
                    {categories.length > 0 ? <p className="mt-1">Categories: {categories}</p> : null}
                    {problems.length > 0 ? <p className="mt-1">Use cases: {problems}</p> : null}
                  </li>
                );
              })}
            </ul>
          </section>

          {profile.messageToTest ? (
            <section aria-labelledby="message">
              <h2 id="message" className="text-2xl">Message to test</h2>
              <p className="mt-2">{profile.messageToTest}</p>
              <p className="mt-1 text-muted-foreground">A starting point for discovery, not a proven message.</p>
            </section>
          ) : null}

          {[
            ["Triggers", profile.triggers],
            ["Success measures", profile.successMeasures],
            ["Common objections", profile.objections],
            ["Not a fit when", profile.disconfirmation],
            ["Don't assume", profile.doNotAssume],
          ].map(([heading, items]) =>
            (items as string[]).length > 0 ? (
              <section key={heading as string}>
                <h2 className="text-2xl">{heading as string}</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {(items as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null,
          )}

          {seatObjections.length > 0 ? (
            <section aria-labelledby="objection-records">
              <h2 id="objection-records" className="text-2xl">Objections and reframes</h2>
              <ul className="mt-2 space-y-3">
                {seatObjections.map((objection) => (
                  <li key={objection.id} className="rounded-lg border border-border p-3">
                    <p className="font-medium">&ldquo;{objection.objection}&rdquo;</p>
                    <p className="mt-1 text-muted-foreground">Usually about: {objection.underlyingConcern}</p>
                    <p className="mt-1">Reframe to test: {objection.reframe}</p>
                    <p className="mt-1">Ask: {objection.qualifyingQuestions.join(" ")}</p>
                    <p className="mt-1 text-muted-foreground">{EVIDENCE_LABEL[objection.evidence]}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {seatTriggers.length > 0 ? (
            <section aria-labelledby="trigger-records">
              <h2 id="trigger-records" className="text-2xl">Buying triggers</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {seatTriggers.map((trigger) => (
                  <li key={trigger.id}>
                    {trigger.trigger}
                    <span className="text-muted-foreground"> ({EVIDENCE_LABEL[trigger.evidence].toLowerCase()})</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="links">
            <h2 id="links" className="text-2xl">Connected seats</h2>
            {links.length === 0 ? (
              <p className="mt-2 text-muted-foreground">No connections recorded yet.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {links.map((link) => (
                  <li key={`${link.direction}-${link.seatId}-${link.edge.type}`}>
                    {link.direction === "out" ? (
                      <>
                        {humanize(link.edge.type)} {seatLink(link.seatId)}
                      </>
                    ) : (
                      <>
                        {seatLink(link.seatId)} {link.edge.type.replace(/-/g, " ")} this seat
                      </>
                    )}
                    {link.edge.carries ? <span className="text-muted-foreground"> — {link.edge.carries}</span> : null}
                    {link.edge.qualify ? <span className="block text-muted-foreground">Ask: {link.edge.qualify}</span> : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-5 self-start rounded-xl border border-border bg-card p-4 text-sm leading-6">
          <div>
            <p className="font-semibold">Buying roles</p>
            <p>{profile.buyingRoles.map(humanize).join(", ")}</p>
          </div>
          <div>
            <p className="font-semibold">Typical titles</p>
            <ul className="mt-1 space-y-1">
              {LEVELS.filter((level) => titles[level]?.length).map((level) => (
                <li key={level}>
                  <span className="text-muted-foreground">{humanize(level)}:</span> {titles[level]!.slice(0, 3).join("; ")}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">By company size</p>
            <ul className="mt-1 space-y-2">
              {SIZES.map((size) => {
                const presence = profile.bySize[size];
                return (
                  <li key={size}>
                    <span className="text-muted-foreground">{SIZE_LABEL[size]}:</span> {PRESENCE_LABEL[presence.presence]}
                    {presence.coveredBy.length > 0 ? <> — covered by {joinNodes(presence.coveredBy.map(seatLink))}</> : null}
                    {presence.note ? <span className="block text-muted-foreground">{presence.note}</span> : null}
                  </li>
                );
              })}
            </ul>
          </div>
          {seat.categoryIds.length > 0 ? (
            <div>
              <p className="font-semibold">Categories this seat owns</p>
              <p>{joinNodes(seat.categoryIds.map(categoryLink))}</p>
              <p className="mt-1">
                <Link href={`/landscape?persona=${seat.id}`} className={linkClass}>
                  Browse products for this seat
                </Link>
                {vendors.length > 0 ? <span className="text-muted-foreground"> ({vendors.length} vendors tagged)</span> : null}
              </p>
            </div>
          ) : null}
          {useCases.length > 0 ? (
            <div>
              <p className="font-semibold">Use cases</p>
              <ul className="mt-1 space-y-1">
                {useCases.map(({ useCase, likelyBudget }) => (
                  <li key={useCase.id}>
                    {problemLink(useCase.id)}
                    {likelyBudget ? <span className="text-muted-foreground"> · likely budget</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {overlays.length > 0 ? (
            <div>
              <p className="font-semibold">Industry and regulation</p>
              <ul className="mt-1 space-y-1">
                {overlays.map(({ overlay, mandated }) => (
                  <li key={overlay.id}>
                    {overlay.name}
                    {mandated ? <span className="text-muted-foreground"> · named in rules</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {profile.communities.length > 0 || profile.frameworks.length > 0 ? (
            <div>
              <p className="font-semibold">Where they learn</p>
              <p>
                {joinNodes(
                  profile.communities.map((community) => (
                    <a key={community.url} href={community.url} className={linkClass} rel="noreferrer">
                      {community.name}
                    </a>
                  )),
                )}
              </p>
              {profile.frameworks.length > 0 ? <p className="mt-1 text-muted-foreground">{profile.frameworks.join(", ")}</p> : null}
            </div>
          ) : null}
          <p className="text-muted-foreground">
            Profile evidence: {EVIDENCE_LABEL[profile.evidence]}. Reviewed {profile.lastReviewedAt}.
          </p>
        </aside>
      </div>

      {sourceIds.length > 0 ? (
        <section className="mt-10 text-sm" aria-labelledby="sources">
          <h2 id="sources" className="text-2xl">Sources</h2>
          <ul className="mt-2 space-y-1">
            {sourceIds.map((sid) => {
              const source = sourceById.get(sid);
              return source ? (
                <li key={sid}>
                  <a href={source.url} className={linkClass} rel="noreferrer">
                    {source.title}
                  </a>
                  <span className="text-muted-foreground"> · {source.publisher}</span>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      ) : null}

      <nav aria-label="Broaden" className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href="/personas" className={linkClass}>All buyer seats</Link>
        <Link href="/use-cases" className={linkClass}>Buyer use cases</Link>
        <Link href="/domains" className={linkClass}>Security domains</Link>
      </nav>
    </main>
  );
}
