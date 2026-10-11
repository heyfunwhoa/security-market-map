import { fixtureRetrievalAdapter, type RetrievedDocument } from "./adapters";
import {
  owaspBaselineDocument,
  owaspMonitoredSource,
  owaspSourcePolicy,
} from "./fixtures";
import { createLedger, type ResearchLedger } from "./ledger";
import { checkMonitoredSource, type CheckResult } from "./pipeline";
import { monitoredSourceSchema, sourcePolicySchema } from "./schema";

export function createPhaseOneLedger(): ResearchLedger {
  const ledger = createLedger();
  ledger.sources.push(monitoredSourceSchema.parse({ ...owaspMonitoredSource }));
  ledger.policies.push(sourcePolicySchema.parse({ ...owaspSourcePolicy }));
  return ledger;
}

/**
 * Offline check of one public source. This does not call Exa or Firecrawl,
 * and it does not publish a catalog claim.
 */
export async function runOwaspPublicFixture(options?: {
  document?: RetrievedDocument;
  asOf?: string;
  ledger?: ResearchLedger;
}): Promise<{ ledger: ResearchLedger; result: CheckResult }> {
  const ledger = options?.ledger ?? createPhaseOneLedger();
  const document = options?.document ?? owaspBaselineDocument;
  const result = await checkMonitoredSource({
    ledger,
    sourceId: owaspMonitoredSource.id,
    adapter: fixtureRetrievalAdapter([document]),
    asOf: options?.asOf ?? "2026-10-09",
    force: true,
  });
  return { ledger, result };
}
