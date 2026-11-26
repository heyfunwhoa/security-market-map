import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { catalog } from "@/lib/catalog";
import { acronymGlossary } from "@/lib/data/titles";

export const metadata = { title: "Categories A–Z" };

// Search labels for category terms outside the buyer-title glossary.
const categoryTerms = [
  ["AI", "Artificial intelligence"],
  ["API", "Application programming interface"],
  ["ASPM", "Application security posture management"],
  ["CAASM", "Cyber asset attack surface management"],
  ["CDR", "Cloud detection and response"],
  ["CWPP", "Cloud workload protection platform"],
  ["DAST", "Dynamic application security testing"],
  ["DRP", "Digital risk protection"],
  ["ECP", "Endpoint control and prevention"],
  ["IaC", "Infrastructure as code"],
  ["IAST", "Interactive application security testing"],
  ["IoT", "Internet of Things"],
  ["ISPM", "Identity security posture management"],
  ["IT", "Information technology"],
  ["MCP", "Model Context Protocol"],
  ["NDR", "Network detection and response"],
  ["SaaS", "Software as a service"],
  ["SAST", "Static application security testing"],
  ["SCA", "Software composition analysis"],
  ["SDPP", "Security data pipeline platforms"],
  ["WAF", "Web application firewall"],
  ["WAAP", "Web application and API protection"],
  ["WIM", "Workload identity management"],
].map(([acronym, expansion]) => ({ acronym, expansion }));

const terms = [...acronymGlossary, ...categoryTerms];
const alternativeNames: Record<string, string[]> = {
  "security-asset-management": ["CAASM"],
  "external-attack-surface": ["EASM"],
  "iac-security": ["IaC"],
  "waf-waap": ["WAF", "WAAP"],
  "third-party-risk": ["TPRM"],
};

const entries = [...catalog.categories].sort((a, b) => a.name.localeCompare(b.name, "en")).map((category) => {
  const names = new Set([category.id.toUpperCase(), ...category.name.split(/[^\w-]+/), ...(alternativeNames[category.id] ?? [])]);
  const labels = terms.filter((term) => names.has(term.acronym) || term.expansion.toLowerCase() === category.name.toLowerCase());
  return {
    category,
    aliases: labels.map(({ acronym, expansion }) => category.name.toLowerCase() === expansion.toLowerCase() ? acronym : `${expansion} (${acronym})`),
    domains: catalog.domains.filter((domain) => category.domainIds.includes(domain.id)),
  };
});

export default async function CategoryIndex({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const matches = entries.filter(({ category, aliases }) =>
    [category.name, ...aliases].some((name) => name.toLowerCase().includes(query.toLowerCase())),
  );
  const groups = Map.groupBy(matches, ({ category }) => category.name.charAt(0).toUpperCase());
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs parents={[{ href: "/", label: "Home" }]} current="Categories A–Z" />
      <PageIntro kicker="Market map" title="Categories A–Z" lede={`Browse ${entries.length} security categories and the domains they belong to.`} />
      <form action="/categories" role="search" aria-label="Search categories" className="mt-5 max-w-xl">
        <label htmlFor="category-query" className="text-sm font-medium">Category name or acronym</label>
        <div className="mt-1 flex items-center gap-2">
          <Input id="category-query" name="q" type="search" defaultValue={query} placeholder="e.g. SIEM" className="min-h-11 min-w-0" />
          <Button type="submit" className="min-h-11">Search</Button>
        </div>
      </form>
      {query && <p className="mt-3 text-sm" role="status">
        {matches.length} {matches.length === 1 ? "category" : "categories"} matching “{query}”.{" "}
        <Link href="/categories" className="inline-flex min-h-11 items-center text-primary underline">Show all categories</Link>
      </p>}
      {groups.size > 1 && <nav aria-label="Jump to a letter" className="mt-4 flex flex-wrap gap-1">
        {[...groups.keys()].map((letter) => <a key={letter} href={`#letter-${letter}`} aria-label={`Jump to ${letter}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-sm font-semibold hover:bg-muted">{letter}</a>)}
      </nav>}
      {[...groups].map(([letter, rows]) => (
        <section key={letter} aria-labelledby={`letter-${letter}`} className="mt-7">
          <h2 id={`letter-${letter}`} tabIndex={-1} className="scroll-mt-4 border-b border-border pb-1 text-2xl">{letter}</h2>
          <ul className="divide-y divide-border">
            {rows.map(({ category, domains, aliases }) => <li key={category.id} className="grid gap-x-4 py-2 sm:grid-cols-[3fr_2fr]">
              <div>
                <Link className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline" href={`/categories/${category.slug}`}>{category.name}</Link>
                {aliases.length > 0 && <p className="text-sm text-muted-foreground">{aliases.join(" · ")}</p>}
              </div>
              <ul aria-label={`Domains for ${category.name}`} className="flex flex-wrap content-start gap-x-3">
                {domains.map((domain) => <li key={domain.id}><Link href={`/domains/${domain.slug}`} className="inline-flex min-h-11 items-center text-sm text-primary underline">{domain.name}</Link></li>)}
              </ul>
            </li>)}
          </ul>
        </section>
      ))}
    </main>
  );
}
