import Link from "next/link";

const linkClass = "inline-flex min-h-11 items-center text-primary underline underline-offset-4";

export function EndpointEvaluationGuide() {
  return (
    <section aria-labelledby="endpoint-evaluation" className="mt-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      <h2 id="endpoint-evaluation" tabIndex={-1} className="scroll-mt-24 text-xl font-semibold">
        Evaluate endpoint coverage
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6">
        Start with a suspicious executable on a managed laptop. What can your team prevent, what can it investigate
        and contain, and what evidence will still be available when a new indicator arrives?
      </p>
      <dl className="mt-4 grid gap-4 text-sm leading-6 md:grid-cols-3">
        <div>
          <dt className="font-semibold">Endpoint Protection Platform (EPP)</dt>
          <dd className="mt-1">Applies prevention policy on the device, such as blocking or quarantining a file the policy flags.</dd>
        </div>
        <div>
          <dt className="font-semibold">Endpoint Detection and Response (EDR)</dt>
          <dd className="mt-1">Records endpoint activity so responders can detect suspicious behavior, investigate what happened and take actions such as isolating a host.</dd>
        </div>
        <div>
          <dt className="font-semibold">File and malware analysis</dt>
          <dd className="mt-1">Examines the file itself. Where samples are retained, analysts can recheck them when new intelligence arrives.</dd>
          <dd><Link className={linkClass} href="/categories/malware-analysis">Explore file investigation tools</Link></dd>
        </div>
      </dl>
      <p className="mt-3 text-sm leading-6">A single suite can cover several of these jobs. Use your current deployment as the baseline before evaluating a separate tool.</p>
      <h3 className="mt-4 font-semibold">Questions for a pilot</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
        <li>Which device types can the team monitor and isolate, and what evidence shows the action succeeded?</li>
        <li>Can an analyst retrieve the original file or only its hash? Which collection policies, permissions and retention windows apply?</li>
        <li>When new intelligence arrives, can the team check historical files and trace matches back to affected hosts?</li>
      </ul>
      <Link className={`mt-2 text-sm ${linkClass}`} href="/landscape?category=endpoint-security">Browse endpoint security products</Link>
    </section>
  );
}
