import Link from "next/link";

type CategoryLink = { slug: string; label: string };

export function ProductCategoryLinks({ primary, adjacent }: { primary: CategoryLink[]; adjacent: CategoryLink[] }) {
  return <>{[{ title: "Primary categories", links: primary }, { title: "Adjacent categories", links: adjacent }].map(({ title, links }) =>
    links.length > 0 && <div key={title}>
      <dt className="text-sm font-medium">{title}</dt>
      <dd><ul className="flex flex-wrap gap-x-3">{links.map((link) => <li key={link.slug}>
        <Link href={`/categories/${link.slug}`} className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4">{link.label}</Link>
      </li>)}</ul></dd>
    </div>,
  )}</>;
}
