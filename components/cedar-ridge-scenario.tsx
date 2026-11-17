import Link from "next/link";
import { StatusPill } from "@/components/chrome";
import { catalog, productById, sourceById, vendorById } from "@/lib/catalog";
import { cedarRidgeId, cedarRidgeSections } from "@/lib/data/cedar-ridge";

const scenarioUrl = `/learn?scenario=${cedarRidgeId}`;
const linkClass = "inline-flex min-h-11 items-center text-primary underline underline-offset-4";

function Architecture() {
  return (
    <figure className="my-5 rounded-xl border border-border bg-card p-4">
      <figcaption className="font-semibold">How access becomes evidence</figcaption>
      <p className="mt-2 text-sm">ECS application → temporary task-role session → S3 object request</p>
      <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
        <li className="rounded-lg border border-border p-3">
          <strong>Detection</strong>
          <p>S3 activity → GuardDuty S3 Protection → supported finding or signal in Security Hub. CSPM checks add separate posture context.</p>
        </li>
        <li className="rounded-lg border border-border p-3">
          <strong>Investigation evidence</strong>
          <p>Configured CloudTrail S3 events → retained object audit history → analyst. Security Lake can provide a separate normalized telemetry store.</p>
        </li>
      </ul>
    </figure>
  );
}

function marketLinks(references: (typeof cedarRidgeSections)[number]["topics"][number]["references"]) {
  return (references ?? []).flatMap((item) => {
    if ("categoryId" in item) {
      const category = catalog.categories.find(({ id }) => id === item.categoryId);
      return category ? [{ label: item.label, href: `/categories/${category.slug}` }] : [];
    }
    const vendorId = "vendorId" in item ? item.vendorId : productById(item.productId)?.vendorId;
    const vendor = vendorId ? vendorById(vendorId) : undefined;
    return vendor ? [{ label: item.label, href: `/vendors/${vendor.slug}` }] : [];
  });
}

export function CedarRidgeScenario({ mode, step }: { mode?: string; step?: string }) {
  const reference = mode === "reference";
  const activeIndex = Math.max(0, cedarRidgeSections.findIndex(({ id }) => id === step));
  const active = cedarRidgeSections[activeIndex];
  const visibleSections = reference ? cedarRidgeSections : [active];

  function guidedUrl(id: string) {
    return `${scenarioUrl}&step=${id}#${id}`;
  }

  return (
    <section id={cedarRidgeId} className="mt-10 scroll-mt-24" aria-labelledby="cedar-ridge-title">
      <p className="text-sm text-muted-foreground">Synthetic scenario</p>
      <h2 id="cedar-ridge-title" className="mt-2 text-3xl">Cedar Ridge Health: compromised workload identity</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6">Investigate unusual S3 access, explain the role of each AWS service, and recommend a measurable security improvement.</p>
      <nav className="mt-3 flex flex-wrap gap-x-5" aria-label="Learning mode">
        <Link className={linkClass} aria-current={reference ? undefined : "page"} href={guidedUrl(active.id)}>Guided</Link>
        <Link className={linkClass} aria-current={reference ? "page" : undefined} href={`${scenarioUrl}&mode=reference&step=${active.id}#${active.id}`}>Reference</Link>
      </nav>
      <nav aria-label="Cedar Ridge sections" className="mt-4">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {cedarRidgeSections.map(({ id, title }, index) => (
            <li key={id}>
              <Link
                className="flex min-h-11 items-center rounded-lg border border-border bg-card px-3 py-2 text-sm aria-[current=step]:border-primary aria-[current=step]:font-semibold"
                aria-current={!reference && active.id === id ? "step" : undefined}
                href={reference ? `${scenarioUrl}&mode=reference&step=${id}#${id}` : guidedUrl(id)}
              >
                {index + 1}. {title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      {visibleSections.map((section) => (
        <section key={section.id} id={section.id} className="mt-8 max-w-3xl scroll-mt-24" tabIndex={-1} aria-labelledby={`${section.id}-heading`}>
          <h3 id={`${section.id}-heading`} className="text-2xl">{section.title}</h3>
          <p className="mt-3 text-sm leading-6">{section.intro}</p>
          {section.id === "architecture" && <Architecture />}
          {section.topics.map((topic) => (
            <article key={topic.title} className="mt-4 rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold">{topic.title}</h4>
              <p className="mt-2 text-sm leading-6">{topic.text}</p>
              {topic.evidence && (
                <ul className="mt-3 grid gap-2 text-sm" aria-label="Synthetic CloudTrail evidence">
                  {topic.evidence.map(({ time, session, object, result }) => (
                    <li key={time} className="rounded-lg border border-border p-3">
                      <p className="font-medium">{time} · {result}</p>
                      <p>Session: {session}</p>
                      <p className="break-all">Object: {object}</p>
                    </li>
                  ))}
                </ul>
              )}
              {topic.sourceIds && (
                <details className="mt-3 text-sm">
                  <summary className="min-h-11 cursor-pointer py-3">Sources and evidence</summary>
                  <ul>
                    {topic.sourceIds.map((id) => {
                      const source = sourceById(id);
                      return source ? (
                        <li key={id} className="flex flex-wrap items-center gap-x-2">
                          <a className={linkClass} href={source.url}>{source.title}</a>
                          <StatusPill status={source.sourceType} />
                        </li>
                      ) : <li key={id}>Source unavailable</li>;
                    })}
                  </ul>
                </details>
              )}
              {topic.references && (
                <ul className="mt-2 flex flex-wrap gap-x-4 text-sm" aria-label="Market Map references">
                  {marketLinks(topic.references).map(({ label, href }) => (
                    <li key={label}><Link className={linkClass} href={href}>{label}</Link></li>
                  ))}
                </ul>
              )}
            </article>
          ))}
          {section.prompts?.map(({ question, reasoning }) => (
            <details key={question} open={reference || undefined} className="mt-4 rounded-xl border border-border bg-card px-4">
              <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">{question}</summary>
              <p className="pb-4 text-sm leading-6">{reasoning}</p>
            </details>
          ))}
        </section>
      ))}
      {!reference && (
        <nav className="mt-4 flex flex-wrap gap-x-6" aria-label="Guided step navigation">
          {cedarRidgeSections[activeIndex - 1] && (
            <Link className={linkClass} href={guidedUrl(cedarRidgeSections[activeIndex - 1].id)}>Previous step</Link>
          )}
          {cedarRidgeSections[activeIndex + 1] && (
            <Link className={linkClass} href={guidedUrl(cedarRidgeSections[activeIndex + 1].id)}>Next step</Link>
          )}
        </nav>
      )}
    </section>
  );
}
