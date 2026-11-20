import Link from "next/link";
import { BuyerProductOptions } from "@/components/buyer-product-options";
import { sourceById } from "@/lib/catalog";
import guide from "@/research/aws-security-hub-buyers.json";

const link = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring";

export function AwsSecurityHubGuide() {
  return (
    <section aria-labelledby="aws-security-hub" className="mt-8 max-w-4xl space-y-4 rounded-xl border border-border p-4 sm:p-6">
      <h2 id="aws-security-hub" tabIndex={-1} className="scroll-mt-24 text-2xl">Where AWS Security Hub fits</h2>
      <p className="leading-7">AWS Security Hub helps a cloud security team decide which risks to work on first. Inspector supplies vulnerability findings, GuardDuty flags suspicious activity, Macie adds sensitive-data context, and Security Hub CSPM checks configurations. Security Hub looks for combinations of signals on supported resources and can send a finding into a configured ticketing workflow.</p>
      <BuyerProductOptions options={guide.products} />
      <h3 className="text-xl">Which team owns the next step?</h3>
      <p className="text-sm leading-6">These are illustrative buyer conversations. Each one links the documented product behavior to a question and a proposed way to check the outcome.</p>
      {guide.cases.map((item) => (
        <details key={item.id} id={`aws-hub-${item.id}`} className="scroll-mt-24 rounded-lg border border-border px-4">
          <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{item.title}</summary>
          <div className="space-y-3 pb-4 text-sm leading-6">
            <p>{item.decision}</p>
            <dl className="space-y-2">
              <div><dt className="font-semibold">Who owns it?</dt><dd>{item.owner}</dd></div>
              <div><dt className="font-semibold">Ask in discovery</dt><dd>{item.question}</dd></div>
              <div><dt className="font-semibold">What would prove it?</dt><dd>{item.proof}</dd></div>
            </dl>
            <ul aria-label="Original sources" className="list-disc space-y-1 pl-5">
              {item.sourceIds.map((id) => {
                const source = sourceById(id)!;
                return <li key={id}><a className={link} href={source.canonicalUrl}>{source.publisher} · {source.title}</a></li>;
              })}
            </ul>
            <Link className={link} href={item.guide}>{item.guideLabel}</Link>
          </div>
        </details>
      ))}
      <p className="text-sm leading-6">For a buying decision, price the resources and optional services in scope. If the team already owns a cloud platform or SIEM, compare the time to identify the owner and verify one fix in the existing workflow. AWS describes Essentials billing and the separate Extended partner subscription and onboarding process in the product evidence above.</p>
      <p className="text-sm"><Link className={link} href="/domains/secops#secops-buyer-guide">Follow the finding into security operations</Link></p>
      <p className="text-sm"><Link className={link} href="/use-cases/finding-ownership">Broaden to finding ownership across security tools</Link></p>
    </section>
  );
}
