import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { productDetailUrl } from "@/lib/landscape-filters";

const groups = [
  { question: "What could the device observe or stop?", ids: ["epp", "edr", "ecp", "ai-edr", "ecpp"] },
  { question: "Where else did the activity appear?", ids: ["ndr", "itdr", "cdr", "xdr"] },
  { question: "How does the team investigate and respond?", ids: ["sdpp", "siem", "soar", "aisoc", "mdr"] },
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
            <ul className="mt-2 space-y-1 text-sm">
              {group.ids.map((id) => {
                const term = catalog.glossary.find((entry) => entry.id === id)!;
                return <li key={id}><Link className={linkStyle} href={`/learn#${id}`}>{term.term}</Link></li>;
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6">
        Software Analyst Cyber Research (SACR) uses ECP, AI-EDR and ECPP in its{" "}
        <a className={linkStyle} href="https://softwareanalyst.io/reports/the-ciso-guide-to-endpoint-control-and-prevention-ecp-the-next-architecture-for-endpoint-security">endpoint framework</a>.
      </p>
      <h3 className="mt-4 font-semibold">If a file verdict changes 60 days later</h3>
      <p className="mt-1 max-w-3xl text-sm leading-6">
        Can the investigator examine the original installer and identify the devices that saw it?
        EDR can help reconstruct what ran. Stairwell describes reanalyzing files it collected as new intelligence
        arrives and tying sightings to devices and times. Check which devices and file types were covered.
      </p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link className={linkStyle} href={productDetailUrl("stairwell", "stairwell-platform")}>Stairwell product evidence</Link>
        <a className={linkStyle} href="https://docs.stairwell.com/docs/what-is-stairwell">Stairwell collection documentation</a>
      </p>
    </section>
  );
}
