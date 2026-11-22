import Link from "next/link";
import { BuyerProductOptions } from "@/components/buyer-product-options";
import { ClaimList } from "@/components/claims";
import { PaymentKeyCoordination } from "@/components/payment-key-coordination";
import { catalog, categoryBySlug, sourceById } from "@/lib/catalog";
import workforce from "@/research/workforce-identity-buyers.json";
import handoff from "@/research/credential-exposure-handoff.json";

const link = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const shell = "mt-6 max-w-4xl space-y-5 rounded-xl border border-border p-4 sm:p-6";
const heading = "scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring";
const byId = new Map(catalog.claims.map((claim) => [claim.id, claim]));

function Evidence({ ids, label }: { ids: string[]; label: string }) {
  return (
    <details className="rounded-lg border border-border px-4">
      <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{label}</summary>
      <div className="pb-4"><ClaimList claims={ids.map((id) => byId.get(id)!)} /></div>
    </details>
  );
}

export function WorkforceIdentityGuide() {
  return (
    <section className={shell} aria-labelledby="workforce-buyer-guide">
      <h2 id="workforce-buyer-guide" tabIndex={-1} className={heading}>How do employees and contractors get, use and lose access?</h2>
      <p className="leading-7">Workforce identity management follows a person across the directory and the applications they use. The IAM team can control sign-in while an application owner still controls a local permission or session. Start a buying conversation with the access decision that is failing and the team that can fix it.</p>
      <h3 className="text-xl">How analysts define the market</h3>
      <p className="text-sm leading-6">KuppingerCole describes the sign-in and access-management layer. Gartner describes the governance record behind access decisions. Forrester asks whether a workforce identity platform can act on identity risk. The market map uses these public sources to frame buyer questions. Product capabilities below come from the individual publishers.</p>
      <Evidence label="Read the three analyst sources" ids={workforce.analystIds} />
      <p className="text-sm"><Link className={link} href="/landscape/public-exposure#related-access-scenarios">Explore app consent, merger access and emergency administrator scenarios</Link></p>
      <nav aria-label="Workforce identity buyer decisions"><ul className="space-y-1 pl-5 text-sm leading-6 list-disc">
        {workforce.cases.map((item) => <li key={item.id}><a className={link} href={`#workforce-${item.id}`}>{item.title}</a></li>)}
      </ul></nav>
      {workforce.cases.map((item) => (
        <article key={item.id} aria-labelledby={`workforce-${item.id}`} className="space-y-3 border-t border-border pt-4">
          <h3 id={`workforce-${item.id}`} tabIndex={-1} className="scroll-mt-24 text-xl">{item.title}</h3>
          <p className="leading-7">{item.scenario}</p>
          <dl className="space-y-2 text-sm leading-6">
            <div><dt className="font-semibold">Who owns the decision?</dt><dd>{item.owner}</dd></div>
            <div><dt className="font-semibold">What would prove it works?</dt><dd>{item.proof}</dd></div>
            <div><dt className="font-semibold">What can still go wrong?</dt><dd>{item.gap}</dd></div>
          </dl>
          <Evidence label="Analyst perspective on this decision" ids={[item.analystId]} />
          <BuyerProductOptions options={item.options} />
          <Link className={link} href={`/categories/${item.categoryId}`}>Explore {categoryBySlug(item.categoryId)!.name}</Link>
        </article>
      ))}
      <p className="text-sm"><Link className={link} href="/categories/secrets-management#exposure-handoff">Follow an exposed application credential through containment</Link></p>
    </section>
  );
}

export function CredentialExposureHandoff() {
  return (
    <section className={shell} aria-labelledby="exposure-handoff">
      <h2 id="exposure-handoff" tabIndex={-1} className={heading}>From a public secret alert to a closed exposure</h2>
      <p className="leading-7">Who posted the key, who can invalidate it, and which service still uses it can be three different answers. Use this illustrative handoff to agree on containment, service continuity and what the team knows about use of the credential.</p>
      <PaymentKeyCoordination />
      <ol className="list-decimal space-y-3 pl-5 text-sm leading-6">{handoff.steps.map((step) => (
        <li key={step.title}><strong>{step.title}</strong><p>{step.owner}. {step.evidence}</p></li>
      ))}</ol>
      {handoff.cases.map((item) => (
        <article key={item.id} className="space-y-3 border-t border-border pt-4" aria-labelledby={`exposure-${item.id}`}>
          <h3 id={`exposure-${item.id}`} tabIndex={-1} className="scroll-mt-24 text-xl">{item.title}</h3>
          <p className="leading-7">{item.owners}</p>
          <p className="text-sm leading-6">{item.cutover}</p>
          <p className="text-sm leading-6"><strong>Where a team could stop too early. </strong>{item.miss}</p>
          <p className="text-sm leading-6"><strong>Evidence to close the exposure. </strong>{item.close}</p>
          <Evidence label="Product documentation for this example" ids={item.claimIds} />
          {item.sourceIds.map((id) => {
            const source = sourceById(id)!;
            return <p key={id} className="text-sm leading-6"><a className={link} href={source.canonicalUrl}>{source.title}</a> · {source.publisher} issuer documentation</p>;
          })}
          <Link className={link} href={`/categories/${item.guide}`}>Compare the credential management options</Link>
        </article>
      ))}
      <p className="text-sm"><Link className={link} href="/landscape/public-exposure#related-access-scenarios">Explore repository keys, build logs and package publishing scenarios</Link></p>
      <p className="text-sm"><Link className={link} href="/categories/workforce-identity#workforce-leave">When a person leaves, check their accounts, sessions and shared integrations</Link></p>
    </section>
  );
}
