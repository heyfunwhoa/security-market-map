import reports from "@/research/sacr-market-groups.json";

export function SacrMarketGroups({ categoryId }: { categoryId: string }) {
  const related = reports.filter((report) => report.categoryIds.includes(categoryId));
  if (!related.length) return null;

  return (
    <section className="mt-6 space-y-3" aria-labelledby="sacr-research">
      <h2 id="sacr-research" className="text-2xl">SACR market research</h2>
      <p className="text-sm text-muted-foreground">Labels reflect SACR’s published placement of vendors and products. Individual capabilities and current packaging require separate verification.</p>
      {related.map((report) => (
        <details key={report.title} className="rounded-xl border border-border bg-card p-4">
          <summary className="cursor-pointer font-semibold">{report.title}</summary>
          <p className="mt-3 text-sm">{report.description}</p>
          <dl className="my-4 space-y-3">
            {report.groups.map((group) => (
              <div key={group.label}>
                <dt className="font-semibold">{group.label}</dt>
                <dd className="text-sm text-muted-foreground">{group.brands}</dd>
              </div>
            ))}
          </dl>
          <a href={report.source} className="text-sm text-primary underline">Read the SACR report on {report.title}</a>
        </details>
      ))}
    </section>
  );
}
