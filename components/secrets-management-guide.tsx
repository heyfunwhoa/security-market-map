import Link from "next/link";
import { BuyerProductOptions } from "@/components/buyer-product-options";
import cases from "@/research/secrets-management-guide.json";

const linkStyle = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SecretsManagementGuide() {
  return (
    <section aria-labelledby="secrets-management-guide" className="mt-6 max-w-4xl space-y-5 rounded-xl border border-border p-4 sm:p-6">
      <h2 id="secrets-management-guide" tabIndex={-1} className="scroll-mt-24 text-2xl">How should we manage this credential?</h2>
      <p className="max-w-3xl leading-7">A public alert can tell AppSec that a key escaped. Its owner still needs to revoke it, deliver a replacement and check which systems used it. If the target supports short-lived access, the team may be able to retire the standing credential altogether.</p>
      <p><Link className={linkStyle} href="#exposure-handoff">See who acts after a credential appears in public</Link></p>
      <nav aria-label="Secrets management buyer questions"><ul className="list-disc space-y-1 pl-5 text-sm leading-6">
        {cases.map((item) => <li key={item.id}><a className={linkStyle} href={`#management-${item.id}`}>{item.title}</a></li>)}
      </ul></nav>
      <p className="text-sm text-muted-foreground">Team handoffs and evaluation questions are illustrative. Open a product to read its publisher’s documented scope, evidence and limits.</p>
      {cases.map((item) => (
        <article key={item.id} aria-labelledby={`management-${item.id}`} className="space-y-3 border-t border-border pt-4">
          <h3 id={`management-${item.id}`} tabIndex={-1} className="scroll-mt-24 text-xl">{item.title}</h3>
          <p className="leading-7">{item.scenario}</p>
          <p className="text-sm leading-6"><strong>Who acts? </strong>{item.owner}</p>
          <p className="text-sm leading-6"><strong>What would prove it works? </strong>{item.proof}</p>
          <BuyerProductOptions options={item.options} />
        </article>
      ))}
      <Link className={linkStyle} href="/landscape/public-exposure#public-secrets">Compare products that find secrets in public</Link>
    </section>
  );
}
