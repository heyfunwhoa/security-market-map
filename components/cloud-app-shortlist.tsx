import Link from "next/link";
import { AreaDiagram } from "@/components/area-diagram";
import { catalog } from "@/lib/catalog";
import { cloudAppEcosystem, dataSecurityEcosystem } from "@/lib/data/connections";

type ShortlistBox = (typeof cloudAppEcosystem)[number];

function Shortlist({
  title,
  lede,
  boxes,
}: {
  title: string;
  lede: string;
  boxes: ShortlistBox[];
}) {
  if (boxes.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{lede}</p>
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

function selectBoxes(boxes: ShortlistBox[], domainId?: string, categoryId?: string) {
  return boxes.filter((box) => {
    if (domainId) return box.domains.includes(domainId);
    if (categoryId) return box.categoryIds.includes(categoryId);
    return true;
  });
}

export function CloudAppShortlist({ domainId, categoryId }: { domainId?: string; categoryId?: string }) {
  return (
    <Shortlist
      title="Cloud and application security shortlist"
      lede="Names below come from a cloud and application security shortlist. Circles are the same size because this is not a rank. A name in a box is not a checked capability. ArmorCode is drawn in more than one box. Several ownership questions are still open."
      boxes={selectBoxes(cloudAppEcosystem, domainId, categoryId)}
    />
  );
}

export function DataSecurityShortlist({ domainId, categoryId }: { domainId?: string; categoryId?: string }) {
  return (
    <Shortlist
      title="Data security shortlist"
      lede="DSPM finds the data. Access governance and the database control decide who can read it. DLP watches a channel on the way out. Encryption protects a copy. Circles are the same size. A name is not a checked capability. The same company can appear in more than one box."
      boxes={selectBoxes(dataSecurityEcosystem, domainId, categoryId)}
    />
  );
}
