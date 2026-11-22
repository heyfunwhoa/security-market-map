import { StatusPill } from "@/components/chrome";
import { formatDate } from "@/lib/format";

/**
 * Shown next to a claim whose source is past its review window as of the catalog snapshot.
 * The claim stays visible; the badge says it should be rechecked before you rely on it.
 */
export function RecheckBadge({ asOf }: { asOf: string }) {
  return (
    <span title={`The source is past its review window as of ${formatDate(asOf)}. Recheck before quoting.`}>
      <StatusPill status="recheck_due" />
      <span className="sr-only">: the source is past its review window as of {formatDate(asOf)}. Recheck before quoting.</span>
    </span>
  );
}
