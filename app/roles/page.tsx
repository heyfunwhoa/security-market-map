import type { Metadata } from "next";
import Link from "next/link";
import { jobRoles, buyingScenarios, buyingCenterProblems } from "@/lib/research/buying-centers";
export const metadata:Metadata={title:"Security Roles & Buying Centers",description:"Illustrative cybersecurity roles, buying contexts and budget discovery."};
export default function RolesPage(){
 const problems=buyingCenterProblems(); if(problems.length) throw new Error(problems.join("; "));
 return <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
  <p className="text-sm font-medium text-primary">Research atlas · illustrative preview</p>
  <h1 className="mt-3 font-serif text-4xl">Security Roles & Buying Centers</h1>
  <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Job titles, buying roles, and budget ownership are different questions. These are learning examples—not verified organizational structures or reported spending patterns.</p>
  <section aria-labelledby="jobs" className="mt-10"><h2 id="jobs" className="text-2xl font-semibold">Job roles & responsibilities</h2>
   <div className="mt-4 grid gap-4 sm:grid-cols-3">{jobRoles.map(r=><article key={r.id} className="rounded-xl border border-border p-5"><h3 className="text-lg font-semibold">{r.title}</h3><ul className="mt-3 list-disc pl-5 text-sm leading-6">{r.responsibilities.map(v=><li key={v}>{v}</li>)}</ul><p className="mt-4 text-xs text-muted-foreground">Related: {r.categoryIds.join(", ")}</p></article>)}</div>
  </section>
  <section aria-labelledby="buying" className="mt-12"><h2 id="buying" className="text-2xl font-semibold">Buying and budget discovery</h2>
   {buyingScenarios.map(s=><article key={s.id} className="mt-5 rounded-xl border border-border bg-card p-6"><h3 className="text-xl font-semibold">{s.name}</h3><p className="mt-3 text-sm text-muted-foreground">{s.note}</p><h4 className="mt-5 font-semibold">Potential funding structures to validate</h4><p className="mt-2 text-sm">{s.possibleFundingModels.join(" · ").replaceAll("_"," ")}</p><h4 className="mt-5 font-semibold">Discovery questions</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6">{s.questions.map(q=><li key={q}>{q}</li>)}</ul></article>)}
  </section>
  <aside className="mt-10 rounded-xl bg-muted p-5 text-sm leading-7"><strong>Sources and context:</strong> The <a className="underline" href="https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/about">NIST NICE Framework</a> defines cybersecurity work, not purchase authority. Analyst market spending forecasts do not establish individual customer budgets. See <Link className="underline" href="/sources">existing source ledger</Link>. Everything shown here is a modeling exercise until individually sourced.</aside>
 </main>
}
