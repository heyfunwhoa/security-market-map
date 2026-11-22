import Link from "next/link";
import { ClaimList } from "@/components/claims";
import { MonitoringRepositoryScenario } from "@/components/monitoring-repository-scenario";
import { catalog } from "@/lib/catalog";

const linkStyle = "text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

// Each cell cites a claim on the existing GitGuardian product record.
const questions = [
  {
    question: "Where does it look?",
    internal: { text: "Repositories the team connected, including company repos that are publicly visible.", claim: "claim-monitoring-mode-gitguardian-visibility" },
    external: { text: "Supported public sources, including new and historical public GitHub commits.", claim: "claim-public-gitguardian-sources" },
  },
  {
    question: "What does my team set up?",
    internal: { text: "Authorize the GitGuardian GitHub app and include the repositories to monitor.", claim: "claim-monitoring-mode-gitguardian-integration" },
    external: { text: "Review the company names, email domains and GitHub organizations that define your public perimeter with GitGuardian.", claim: "claim-public-gitguardian-attribution" },
  },
  {
    question: "Why would we receive the alert?",
    internal: { text: "A secret was detected in a source included in the team’s integration.", claim: "claim-monitoring-mode-gitguardian-visibility" },
    external: { text: "GitGuardian found a signal linking a public finding to your company, such as a monitored developer. That developer might have posted a personal credential.", claim: "claim-monitoring-mode-gitguardian-public-incident" },
  },
] as const;

const claimIds = new Set<string>(questions.flatMap(({ internal, external }) => [internal.claim, external.claim]));
const claims = catalog.claims.filter((claim) => claim.subjectId === "gitguardian" && claimIds.has(claim.id));

const foragerClaims = catalog.claims.filter((claim) =>
  claim.subjectId === "truffle-security-forager" &&
  ["claim-public-forager-sources", "claim-monitoring-mode-forager-editions"].includes(claim.id)
);

export function GitGuardianMonitoringComparison() {
  return (
    <section aria-labelledby="monitoring-scope" className="space-y-5 border-t border-border pt-4 sm:rounded-xl sm:border sm:bg-card sm:p-6">
      <h4 id="monitoring-scope" tabIndex={-1} className="scroll-mt-24 text-2xl focus-visible:outline-2 focus-visible:outline-ring">Would we hear about a key posted in someone else’s GitHub repo?</h4>
      <p className="max-w-3xl leading-7">Compare GitGuardian Internal and Public Monitoring. A contractor posts an API key. Change where they posted it to see what your team could learn.</p>
      <MonitoringRepositoryScenario>
        <details>
          <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">How would Truffle Security Forager handle this contractor’s public commit?</summary>
          <div className="space-y-2 text-sm leading-6">
            <p>Forager monitors public GitHub commits. Whether your team sees a verified key depends on the link to your organization.</p>
            <p><strong>Community.</strong> The company view groups verified keys by email domain. Which domain, if any, connects this key to your company?</p>
            <p><strong>Enterprise add-on.</strong> Truffle Security also describes matching cloud account IDs and organization membership. Which signal links this particular key to your team?</p>
            <p>The sources describe how the editions work. Whether this example would produce a finding or notification remains unknown.</p>
            <ClaimList claims={foragerClaims} />
          </div>
        </details>
      </MonitoringRepositoryScenario>
      {questions.map(({ question, internal, external }) => (
        <div key={question} className="space-y-2 border-t border-border pt-4">
          <h5 className="font-semibold">{question}</h5>
          <dl className="grid gap-4 text-sm leading-6 sm:grid-cols-2">
            {([["Internal Monitoring", internal], ["Public Monitoring", external]] as const).map(([mode, cell]) => {
              const claim = claims.find((item) => item.id === cell.claim)!;
              return (
                <div key={mode}>
                  <dt className="font-semibold text-muted-foreground">{mode}</dt>
                  <dd>{cell.text} <a href={claim.sourceUrl} className={linkStyle}>Source<span className="sr-only"> for {mode}: {question}</span></a></dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
      <details>
        <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">GitGuardian documentation, review dates and limits</summary>
        <ClaimList claims={claims} />
      </details>
      <details>
        <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring">Questions for a buyer evaluation</summary>
        <dl className="space-y-3 text-sm leading-6">
          <div><dt className="font-semibold">Close a coverage gap</dt><dd>Which contractor repos and public forks sit outside our integrations? What would an external service see there?</dd></div>
          <div><dt className="font-semibold">Triage a possible company leak</dt><dd>What linked the finding to our business? Can an analyst tell whether the key belongs to a personal or company account?</dd></div>
          <div><dt className="font-semibold">Coordinate the response</dt><dd>Who takes the first alert here? Who can confirm the issuing account and affected services? If ownership is disputed, who keeps the case open?</dd></div>
          <div><dt className="font-semibold">Justify an additional monitoring service</dt><dd>In a pilot, which confirmed company exposures did external monitoring add? Which findings duplicated internal alerts or ended up unrelated?</dd></div>
        </dl>
      </details>
      <Link className={linkStyle} href="/categories/secrets-detection#public-monitoring">See other public secret monitoring options</Link>
    </section>
  );
}
