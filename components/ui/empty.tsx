import type { ComponentProps } from "react";

// Source-adapted from shadcn/ui Empty. See licenses/shadcn-ui.txt.
export function Empty({ className = "", ...props }: ComponentProps<"div">) {
  return <div data-slot="empty" className={`mt-3 min-w-0 rounded-lg border border-dashed border-border p-4 text-sm leading-6 ${className}`} {...props} />;
}
