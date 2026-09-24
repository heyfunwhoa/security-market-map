import Link from "next/link";
import { AreaDiagram } from "@/components/area-diagram";
import { catalog } from "@/lib/catalog";
import { cloudAppEcosystem } from "@/lib/data/connections";

export function CloudAppShortlist({
  domainId,
  categoryId,
}: {
  domainId?: string;
  categoryId?: string;
}) {
  const boxes = cloudAppEcosystem.filter((box) => {
    if (domainId) return box.domains.includes(domainId);
    if (categoryId) return box.categoryIds.includes(categoryId);
    return true;
  });
  if (boxes.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl">Cloud and application security shortlist</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Names below come from a cloud and application security shortlist. Circles are the same size
        because this is not a rank. A name in a box is not a checked capability. ArmorCode is drawn
        in more than one box. Several ownership questions are still open.
      </p>
      <div className="mt-4 grid gap-6">
        {boxes.map((box) => {
          const related = catalog.categories.filter((category) => box.categoryIds.includes(category.id));
          return (
            <article key={box.name} className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-lg">
                <Link href={box.href} className="hover:underline">
                  {box.name}
                </Link>
              </h3>
              <p className="mt-1 text-xs font-semibold tracking-wide text-primary uppercase">{box.acronyms}</p>
              <p className="mt-2 text-sm leading-6">{box.note}</p>
              <p className="mt-3 text-sm leading-6">
                {related.map((category, index) => (
                  <span key={category.id}>
                    {index > 0 ? " · " : null}
                    <Link href={`/categories/${category.slug}`} className="text-primary hover:underline">
                      {category.name}
                    </Link>
                  </span>
                ))}
              </p>
              <div className="mt-4">
                <AreaDiagram title={box.diagram} problem={box.note} href={box.href} examples={box.examples} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
