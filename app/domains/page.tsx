import Link from "next/link";
import { DomainMap } from "@/components/domain-map";
import { MarketConstellation, marketCircles } from "@/components/market-constellation";
import { PageIntro } from "@/components/chrome";
import { catalog } from "@/lib/catalog";

export const metadata = { title: "Domains" };

const SECRETS = [
  {
    problem: "A credential was committed to GitHub",
    motion: "Find it, check whether it still works, name an owner, and drive rotation.",
    market: "Application security / secrets detection",
    href: "/use-cases/secrets-detection",
  },
  {
    problem: "An application needs a credential at runtime",
    motion: "Store, issue, rotate, and audit the credential.",
    market: "Secrets management / privileged access",
    href: "/use-cases/secrets-vaulting",
  },
  {
    problem: "A service account or AI agent has excessive access",
    motion: "Inventory the identity, map permissions, set ownership, and reduce privilege.",
    market: "Nonhuman identity / access / cloud entitlements",
    href: "/use-cases/nhi-lifecycle",
  },
  {
    problem: "An exposed credential could reach sensitive cloud data",
    motion: "Connect the secret to an identity, an entitlement, a resource, and the data.",
    market: "Cloud security / CNAPP / data security",
    href: "/use-cases/cloud-entitlements",
  },
];

export default function DomainsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <PageIntro
        kicker="Domains"
        title="The security market, mapped by what each solution protects"
        lede="Overlapping circles are the picture. A control bought for one question often shows up in the budget next door. Gartner, Forrester, and IDC draw the lines differently, and a Magic Quadrant does not rank a vendor across the whole market."
      />
      <MarketConstellation />

      <section className="mt-12" id="questions">
        <h2 className="text-3xl tracking-tight">The question each circle answers</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Vendor names are examples, not analyst rankings. Many companies sell across several rows.
          Gartner, for example, defines privileged access to include secrets management and cloud
          entitlement management, and defines a cloud-native application protection platform as a
          bundle of development and runtime controls. SSE, in that usage, is about securing access to
          the web, cloud services, and private applications.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3 font-semibold">Domain</th>
                <th className="p-3 font-semibold">Main question</th>
                <th className="p-3 font-semibold">Common categories</th>
                <th className="p-3 font-semibold">Illustrative vendors</th>
              </tr>
            </thead>
            <tbody>
              {["identity", "app", "cloud", "data", "network", "endpoint", "secops", "exposure", "email", "governance", "ai"]
                .map((id) => marketCircles.find((circle) => circle.id === id))
                .filter((circle) => circle != null)
                .map((circle) => (
                <tr key={circle.id} className="border-t border-border align-top">
                  <td className="p-3 font-medium">
                    <Link href={circle.href} className="text-primary hover:underline">
                      {circle.name}
                    </Link>
                  </td>
                  <td className="p-3">{circle.question}</td>
                  <td className="p-3 text-muted-foreground">{circle.categories}</td>
                  <td className="p-3 text-muted-foreground">{circle.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">Where secrets work sits</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Secrets security crosses markets with different buyers. A scanner, a vault, an identity
          governance platform, and a cloud platform may all say “secrets.” They enter the problem at
          different points. A buyer may need more than one. Gartner includes secrets management inside
          privileged access. Machine identity work also pulls in cloud, security, and the team that
          runs the platform.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {SECRETS.map((row) => (
            <li key={row.href}>
              <Link
                href={row.href}
                className="block h-full rounded-xl border border-border bg-card p-4 hover:bg-muted"
              >
                <span className="font-medium">{row.problem}</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{row.motion}</span>
                <span className="mt-3 block text-xs font-semibold tracking-wide text-primary uppercase">
                  {row.market}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">What the analysts are describing</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-2">
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">Spending stays broad, and software is the fastest piece.</span>{" "}
            Gartner’s July 2025 forecast put worldwide information security spending at $213 billion in
            2025 and about $240 billion in 2026, with the 2026 split near $121 billion in security
            software, $93 billion in services, and $26 billion in network security. Those are forecast
            segments, not the circles on this map.
          </li>
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">Cloud, identity, and applications are converging.</span> IDC
            has pointed to cloud-native platforms and identity among the drivers of security software
            growth. Forrester has described pressure to secure applications and APIs as AI becomes part
            of production software.
          </li>
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">Agents sharpen the identity question.</span> Gartner’s 2026
            trends call out agent registration, governance, credential automation, and authorization.
            Forrester’s agent-security writing connects identity with data, application security,
            operations, and governance.
          </li>
          <li className="rounded-xl border border-border bg-card p-4">
            <span className="font-semibold">Consolidation changes the competitive set.</span> A specialist
            may win a proof of concept and then lose the purchase to a platform the buyer already owns.
            Evaluate the bundle against the actual requirement. One platform does not close every circle.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl tracking-tight">How this atlas records them</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {catalog.domains.filter((domain) => domain.depth === "evidenced").length} domain is evidenced.
          The other {catalog.domains.filter((domain) => domain.depth === "mapped").length} are mapped:
          the buyer and the category are named, and capability cells stay Unknown until a page is cited.
        </p>
        <div className="mt-4">
          <DomainMap domains={catalog.domains} />
        </div>
      </section>
    </main>
  );
}
