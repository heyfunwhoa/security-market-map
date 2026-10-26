import { academyPreviewsForCategory } from "@/lib/academy-links";

export function AcademyLinks({ categoryId }: { categoryId: string }) {
  const previews = academyPreviewsForCategory(categoryId);
  if (!previews.length) return null;

  return (
    <section className="mt-10" aria-labelledby="academy-links-heading">
      <h2 id="academy-links-heading" className="text-2xl tracking-tight">Learn and practice</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Explore the concepts in Builder Academy, then return here to compare tools and evidence.
      </p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {previews.map((preview) => (
          <li key={preview.id} className="rounded-xl border border-border p-4">
            <h3 className="font-semibold">
              <a className="inline-flex min-h-11 items-center rounded-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" href={preview.href}>
                {preview.title}
              </a>
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{preview.summary}</p>
            <p className="mt-3 text-xs text-muted-foreground">Builder Academy · Learning activity</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
