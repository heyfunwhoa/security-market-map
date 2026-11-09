import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/chrome";
import { EvidenceGraphExplorer } from "@/components/evidence-graph-explorer";
import { PageJourney } from "@/components/page-journey";
import { identitySecretsNhiGraph } from "@/lib/evidence-graph/identity-slice";

export const metadata = { title: "Evidence graph" };

export default function EvidenceGraphPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        parents={[{ href: "/", label: "Home" }, { href: "/connections", label: "Connections" }]}
        current="Evidence graph"
      />
      <PageIntro
        id="evidence-graph-introduction"
        kicker="Evidence graph · v1"
        title="Identity, secrets, and non-human identity"
        lede="A read-only projection of the validated catalog. Lines are taxonomy mappings, catalog comparisons, or sourced statements. A category listing is not a product capability. A comparison without a source stays Unknown. A research candidate is not promoted to a verified relationship."
      />
      <PageJourney
        steps={[
          { href: "#graph-nodes", title: "Find a record", description: "Search the node list or filter by category." },
          { href: "#graph-evidence", title: "Read the evidence", description: "Check the basis, dates, sources, and what is still Unknown." },
          { href: "#graph-relationships", title: "Follow a relationship", description: "Use the keyboard list. The diagram repeats it on a wider screen." },
        ]}
        back={{ href: "/connections", label: "Broaden to how these tools connect" }}
      />
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
        Zoom out through Connections or the identity domain. Zoom in from a category, use case, or vendor detail link. Products that only have a category tag stay in the landscape and are counted here as omissions.
      </p>
      <EvidenceGraphExplorer graph={identitySecretsNhiGraph} />
    </main>
  );
}
