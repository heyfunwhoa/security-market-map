import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { productDetailUrl } from "@/lib/landscape-filters";

const groups = [
  { question: "What could the device observe or stop?", ids: ["epp", "edr", "ecp", "ai-edr", "ecpp"] },
  { question: "Where else did the activity appear?", ids: ["ndr", "itdr", "cdr", "xdr"] },
  { question: "How does the team investigate and respond?", ids: ["sdpp", "siem", "soar", "aisoc", "mdr"] },
];

const evaluation = [
  ["Coverage", "Which developer laptops, servers and virtual desktops contribute evidence?", "Show enrolled devices, collection exclusions and the last time each device checked in."],
  ["Investigation history", "Can we reconstruct the installer’s activity after the laptop has been reimaged?", "Show the timeline, how long events are retained and which activity is missing."],
  ["File retention", "Can we reopen the original file and find where else it appeared after its verdict changes?", "Show the retained sample, its sightings and how far back those sightings go."],
  ["Response ownership", "Who can isolate a laptop after hours, and who approves it?", "Walk through the handoff from alert to authorized action and show the audit record."],
  ["Budget", "Which parts of this workflow already come with the endpoint contract?", "Identify the licenses, retention fees and managed response coverage needed for the same scenario."],
];

const linkStyle = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring";

export function EndpointGlossary() {
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-4" aria-labelledby="endpoint-glossary">
      <h2 id="endpoint-glossary" className="scroll-mt-24 text-2xl">Endpoint and security operations glossary</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.question}>
            <h3 className="font-semibold">{group.question}</h3>
            <dl className="mt-3 space-y-4 text-sm">
              {group.ids.map((id) => {
                const term = catalog.glossary.find((entry) => entry.id === id)!;
                return (
                  <div key={id}>
                    <dt className="font-semibold">
                      <Link className={linkStyle} href={`/learn#${id}`}>{term.term}</Link>
                    </dt>
                    <dd className="mt-1 leading-6">{term.definition}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6">
        Software Analyst Cyber Research (SACR) uses ECP, AI-EDR and ECPP in its{" "}
        <a className={linkStyle} href="https://softwareanalyst.io/reports/the-ciso-guide-to-endpoint-control-and-prevention-ecp-the-next-architecture-for-endpoint-security">endpoint framework</a>.
      </p>
      <details className="mt-6 rounded-lg border border-border p-4">
        <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-ring">
          Buyer questions for an endpoint evaluation
        </summary>
        <ul className="mt-3 space-y-4 text-sm leading-6">
          {evaluation.map(([topic, question, evidence]) => (
            <li key={topic}>
              <h3 className="font-semibold">{topic}</h3>
              <p>{question}</p>
              <p className="text-muted-foreground">{evidence}</p>
            </li>
          ))}
        </ul>
      </details>
      <h3 className="mt-4 font-semibold">If a file verdict changes 60 days later</h3>
      <p className="mt-1 max-w-3xl text-sm leading-6">
        Can the investigator examine the original installer and identify the devices that saw it?
        EDR can help reconstruct what ran. Stairwell describes reanalyzing files it collected as new intelligence
        arrives and tying sightings to devices and times. Check which devices and file types were covered.
      </p>
      <details className="mt-3 rounded-lg border border-border p-4">
        <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-ring">
          Walk through the same case with three buyers
        </summary>
        <p className="mt-3 text-sm leading-6">
          Use a harmless test installer and agree on the expected devices and events before the evaluation.
          Simulate a later verdict change and test against evidence from the agreed retention window.
        </p>
        <dl className="mt-3 grid gap-4 text-sm leading-6 md:grid-cols-3">
          <div>
            <dt className="font-semibold">SOC analyst</dt>
            <dd>Show what ran, which devices saw the file, and whether you can recover the original sample. Distinguish an observed file from confirmed execution.</dd>
          </div>
          <div>
            <dt className="font-semibold">Endpoint owner</dt>
            <dd>Reconcile reporting devices against inventory. Show which devices lacked coverage and who can approve and audit isolation.</dd>
          </div>
          <div>
            <dt className="font-semibold">CISO</dt>
            <dd>Summarize how many devices were affected, what remains unknown, who owns the next action, and which gaps require additional spend.</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-6">
          Record elapsed time from the verdict change to the first evidence-backed scope and response decision.
          Mark each expected result as demonstrated, partial, or unverified, with a link to the evidence or a reason it is missing.
        </p>
      </details>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link className={linkStyle} href={productDetailUrl("stairwell", "stairwell-platform")}>Stairwell product evidence</Link>
        <a className={linkStyle} href="https://docs.stairwell.com/docs/what-is-stairwell">Stairwell collection documentation</a>
      </p>
    </section>
  );
}
