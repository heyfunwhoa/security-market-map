import Link from "next/link";
import { ClaimList } from "@/components/claims";
import { catalog, productById, vendorById } from "@/lib/catalog";
import { productDestination } from "@/lib/product-destination";

const claimsById = new Map(catalog.claims.map((claim) => [claim.id, claim]));
const linkStyle = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function BuyerProductOptions({ options }: { options: { label: string; claimIds: string[] }[] }) {
  return (
    <ul className="space-y-2">
      {options.map((option) => {
        const claims = option.claimIds.map((id) => claimsById.get(id)!);
        const product = productById(claims[0].subjectId)!;
        const vendor = vendorById(product.vendorId)!;
        return (
          <li key={product.id}>
            <details className="rounded-lg border border-border bg-card px-4">
              <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{option.label}</summary>
              <div className="space-y-3 pb-4 text-sm">
                <ClaimList claims={claims} />
                <Link className={linkStyle} href={productDestination(product, vendor.slug)}>View {vendor.name} product profile</Link>
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
