import Link from "next/link";
import { BuyerProductOptions } from "@/components/buyer-product-options";
import { sourceById } from "@/lib/catalog";
import guide from "@/research/secops-buyers.json";

const link = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring";

export function SecOpsBuyerGuide() {
  const analyst = sourceById("src-sacr-cloud-soc-20251211")!;
  return (
    <section aria-labelledby="secops-buyer-guide" className="mt-8 max-w-4xl space-y-4 rounded-xl border border-border p-4 sm:p-6">
      <h2 id="secops-buyer-guide" tabIndex={-1} className="scroll-mt-24 text-2xl">Where a security finding goes next</h2>
      <p className="leading-7">Security operations (SecOps) brings people, processes and tools together to detect, investigate and respond to suspicious activity. A security operations center (SOC) is the team that runs that work. An AWS finding, a stolen employee login and a public API key can start three different investigations.</p>
      <p className="text-sm leading-6">Software Analyst Cyber Research distinguishes the cloud team’s work on preventive controls from the SOC’s work on active threats. The buyers and evaluations below are illustrative. Each product opens to its publisher’s evidence. <a className={link} href={analyst.canonicalUrl}>Read the cloud security and SOC research</a>.</p>
      {guide.jobs.map((job) => (
        <details key={job.category} className="rounded-lg border border-border px-4">
          <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{job.title}</summary>
          <div className="space-y-3 pb-4 text-sm leading-6">
            <p>{job.decision}</p>
            <dl className="space-y-2">
              <div><dt className="font-semibold">Who owns it?</dt><dd>{job.owner}</dd></div>
              <div><dt className="font-semibold">What would prove it?</dt><dd>{job.proof}</dd></div>
            </dl>
            <BuyerProductOptions options={job.options} />
            <Link className={link} href={`/categories/${job.category}`}>Explore this category</Link>
          </div>
        </details>
      ))}
      <h3 className="text-xl">Who works alongside the SOC?</h3>
      <p className="text-sm leading-6">For a public cloud key, the SOC owns the investigation. The following teams may own parts of the fix. Agree on the actual owners during discovery.</p>
      <dl className="grid gap-3 text-sm leading-6 sm:grid-cols-2">
        {guide.adjacent.map((area) => (
          <div key={area.href}>
            <dt><Link className={link} href={area.href}>{area.label}</Link></dt>
            <dd>{area.job}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm"><Link className={link} href="/learn?scenario=cedar-ridge&step=investigate#investigate">Follow an AWS finding through an example investigation</Link></p>
    </section>
  );
}
