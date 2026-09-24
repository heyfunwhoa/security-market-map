import Link from "next/link";
import { PageIntro } from "@/components/chrome";
import { controlDepths, REVIEWED, runtimeLayers } from "@/lib/data/brief";

const dimensions = [
  ["Actor", "Human, service account, workload, integration, or AI agent"],
  ["Asset", "Code, credential, application, cloud resource, endpoint, or data"],
  ["Lifecycle", "Discover, provision, authorize, monitor, intervene, rotate, or decommission"],
  ["Observation point", "Repository, identity provider, vault, gateway, MCP proxy, agent framework, endpoint, browser, API, cloud workload, or data layer"],
  ["Control depth", "Inventory, alert, recommend, initiate a workflow, or enforce directly"],
  ["Timing", "Before the action, during it, or after it has completed"],
];

export const metadata = { title: "Control map" };

export default function ControlMapPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Control map"
        title="Seeing an action is not the same as stopping it"
        lede="Use the six dimensions on any category. A product can be strong at inventory and still be unable to block the call in front of you."
      />
      <p className="mt-4 text-sm text-muted-foreground">Reviewed {REVIEWED}.</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="p-3">Dimension</th>
              <th className="p-3">What to name in a demo</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map(([name, detail]) => (
              <tr key={name} className="border-t border-border align-top">
                <td className="p-3 font-medium">{name}</td>
                <td className="p-3">{detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-border bg-muted/40 p-4">
          <h2 className="text-xl">See</h2>
          <p className="mt-2 text-sm leading-6">Inventory and alert. The action can finish before anyone looks.</p>
        </article>
        <article className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
          <h2 className="text-xl">Recommend</h2>
          <p className="mt-2 text-sm leading-6">A suggestion or a ticket. A person still has to change something.</p>
        </article>
        <article className="rounded-xl border border-primary bg-primary/10 p-4">
          <h2 className="text-xl">Stop</h2>
          <p className="mt-2 text-sm leading-6">Direct enforcement before the action completes. This has to be on the path the agent actually uses.</p>
        </article>
      </div>
      <section className="mt-10">
        <h2 className="text-2xl tracking-tight">Control depth</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6">
          {controlDepths.map((item) => (
            <li key={item.depth}>
              <span className="font-semibold">{item.depth}. </span>
              {item.meaning}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl tracking-tight">Agent runtime, from rules to a block</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Drawn from SACR&apos;s March 2026 runtime note and the September 2026 ARISE note. Analyst
          interpretation. Not a verified capability matrix.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3">Layer</th>
                <th className="p-3">Question</th>
                <th className="p-3">Depth</th>
              </tr>
            </thead>
            <tbody>
              {runtimeLayers.map((layer) => (
                <tr key={layer.layer} className="border-t border-border align-top">
                  <td className="p-3 font-medium">{layer.layer}</td>
                  <td className="p-3">{layer.question}</td>
                  <td className="p-3 text-muted-foreground">{layer.depth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/frameworks" className="text-primary hover:underline">
            Gateway versus direct access
          </Link>
        </p>
      </section>
    </main>
  );
}
