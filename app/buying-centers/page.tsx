import Link from "next/link";
import { PageIntro } from "@/components/chrome";
import { buyingStages, roleProfiles } from "@/lib/data/buying-centers";

export const metadata = { title: "Teams, Roles & Buying Centers | Security Market Map" };

export default function BuyingCentersPage() {
  const teams = [...new Set(roleProfiles.map((role) => role.team))];
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro kicker="Buyer research · role hypotheses" title="Teams, Roles & Buying Centers" lede="From the people experiencing a security problem to the teams evaluating it and the leaders who may own the budget." />
      <p className="mt-5 max-w-4xl rounded-xl border border-border bg-card p-4 text-sm leading-6">
        These are illustrative organizational patterns, not verified reporting lines or budget ownership at a particular company. Company size, operating model, industry and product category change purchasing decisions. Validate the actual buying center through discovery.
      </p>
      <section aria-labelledby="decision-map" className="mt-10">
        <h2 id="decision-map" className="text-2xl font-semibold">How a security purchase moves through an organization</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {buyingStages.map((stage,index) => (
            <li key={stage.name} className="rounded-xl border border-border bg-card p-4">
              <span className="text-xs font-medium text-muted-foreground">Perspective {index+1}</span>
              <h3 className="mt-1 font-semibold">{stage.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">These are distinct responsibilities, not a mandatory sequence. A person can occupy several roles; an approver may not be the economic buyer.</p>
      </section>
      <section aria-labelledby="team-map" className="mt-12">
        <h2 id="team-map" className="text-2xl font-semibold">Explore by team</h2>
        <p className="mt-2 text-sm text-muted-foreground">Use this role library to understand ownership, priorities, metrics and likely buying influence.</p>
        <div className="mt-6 space-y-8">
          {teams.map((team) => (
            <div key={team}>
              <h3 className="text-xl font-semibold">{team}</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {roleProfiles.filter((role)=>role.team===team).map((role)=>(
                  <article key={role.id} className="rounded-xl border border-border bg-card p-5">
                    <h4 className="font-semibold">{role.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{role.responsibilities}</p>
                    <dl className="mt-4 space-y-2 text-sm leading-6">
                      <div><dt className="font-medium">What matters</dt><dd className="text-muted-foreground">{role.caresAbout}</dd></div>
                      <div><dt className="font-medium">Measures</dt><dd className="text-muted-foreground">{role.metrics}</dd></div>
                      <div><dt className="font-medium">Often reports to</dt><dd className="text-muted-foreground">{role.reportsToOften}</dd></div>
                      <div><dt className="font-medium">Potential decision roles</dt><dd className="text-muted-foreground">{role.buyingRole.join(" · ")}</dd></div>
                      <div><dt className="font-medium">Discovery question</dt><dd className="text-muted-foreground">{role.discovery}</dd></div>
                    </dl>
                    {role.categoryIds.length ? <p className="mt-4 text-xs text-muted-foreground">Category IDs: {role.categoryIds.join(" · ")} (illustrative mappings; validate catalog links)</p>:null}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12 rounded-xl border border-border bg-card p-5">
        <h2 className="text-xl font-semibold">Example: secrets detection and vaults</h2>
        <p className="mt-2 text-sm leading-6">Developer sees the exposure or friction → AppSec evaluates detection, coverage and triage → Platform/IAM runs credential delivery and rotation → AppSec or Platform leadership sponsors the program → CISO, CTO or delegated leader may hold budget → procurement and finance approve commercial terms.</p>
        <p className="mt-3 text-sm text-muted-foreground">Detection, secrets management and machine identity can fall under different owners and separate budgets—even inside one company.</p>
        <Link className="mt-4 inline-block text-sm text-primary hover:underline" href="/domains/identity">Explore identity security →</Link>
        <p className="mt-3 text-sm text-muted-foreground">Related instructor profiles: <a className="underline" href="https://app.notion.com/p/6fddd76bc8ab4f63aec04a6862bc55f9">Builder Academy: Roles & Why They Care</a>.</p>
      </section>
    </main>
  );
}
