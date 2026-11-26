import { PRODUCT_ANCHOR_CLASS } from "@/lib/product-research";

/** Section heading that the product section nav can scroll to and focus. */
export function AnchorHeading({
  id,
  className,
  children,
}: {
  id: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      tabIndex={-1}
      className={`${PRODUCT_ANCHOR_CLASS} ${className}`}
    >
      {children}
    </h2>
  );
}
