import { sourceById } from "@/lib/catalog";
import type { Claim } from "@/lib/schema";

type Gap = {
  topic: string;
  question: string;
  claimIds?: string[];
  sourceId?: string;
};

export const companyResearchGaps: Partial<Record<string, Gap[]>> = {
  descope: [
    {
      topic: "Integration and ownership",
      question: "Can a customer admin configure single sign-on while your application keeps control of sessions, account linking and fallback login?",
      claimIds: ["claim-descope-tenant-sso"],
    },
    {
      topic: "Tenant access and offboarding",
      question: "When a customer disables a user, when do new sign-ins and existing sessions lose access to that tenant?",
      claimIds: ["claim-descope-tenant-sso"],
    },
    {
      topic: "Pricing and support",
      question: "Which enterprise connections, provisioning features and support commitments are included in the proposed plan?",
    },
  ],
  workos: [
    {
      topic: "Integration and ownership",
      question: "With standalone single sign-on and with AuthKit, who owns sessions, account linking and fallback login?",
      claimIds: ["claim-ciam-sso-workos"],
    },
    {
      topic: "Tenant access and offboarding",
      question: "After a directory removal event, how long does it take for the application to revoke tenant membership and access from an existing session?",
      claimIds: ["claim-ciam-workflow-workos"],
    },
    {
      topic: "Pricing and support",
      question: "At your projected connection count, what would single sign-on and Directory Sync cost, and who handles connection setup or outages?",
      sourceId: "src-ciam-pricing-workos",
    },
  ],
  stairwell: [
    {
      topic: "File collection",
      question: "On the devices in scope, which original files can an analyst retrieve and which file types or locations does the collection policy omit?",
      claimIds: ["claim-workstation-stairwell-file"],
    },
    {
      topic: "Retention",
      question: "How long can responders retrieve a collected file, and what happens to it when a device is unenrolled or a deletion policy applies?",
      claimIds: ["claim-fill-stairwell-store"],
    },
    {
      topic: "Historical investigation",
      question: "When new intelligence arrives, can an analyst trace a matching file back to the hosts and dates where it was observed?",
      claimIds: ["claim-workstation-stairwell-rehunt"],
    },
  ],
};

const linkClass = "inline-flex min-h-11 items-center text-primary underline underline-offset-4";

export function CompanyResearchGaps({ gaps, questions, claims }: {
  gaps: Gap[];
  questions: string[];
  claims: Claim[];
}) {
  return (
    <section className="mt-10" aria-labelledby="research-gaps">
      <h2 id="research-gaps" tabIndex={-1} className="scroll-mt-24 text-2xl">Research gaps</h2>
      <p className="mt-2 text-sm text-muted-foreground">Use these questions in a pilot or confirm the answer with the vendor.</p>
      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {gaps.map((gap) => {
          const evidence = claims.filter((claim) => gap.claimIds?.includes(claim.id));
          const source = gap.sourceId ? sourceById(gap.sourceId) : undefined;
          return (
            <li key={gap.topic} className="min-w-0 rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold">{gap.topic}</h3>
              <p className="mt-2 text-sm leading-6">{gap.question}</p>
              {(evidence.length > 0 || source) && <div className="mt-1 text-sm">
                {evidence.map((claim) => (
                  <a key={claim.id} className={linkClass} href={`#${claim.id}`}>
                    {sourceById(claim.sourceId)?.title ?? "Related evidence"}
                  </a>
                ))}
                {source && <a className={linkClass} href={source.url}>{source.title}</a>}
              </div>}
            </li>
          );
        })}
      </ul>
      {questions.length > 0 && (
        <details className="mt-3 rounded-lg border border-border px-4">
          <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">Company research notes</summary>
          <ul className="mb-4 list-disc space-y-2 pl-5 text-sm leading-6">
            {questions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        </details>
      )}
    </section>
  );
}
