import Link from "next/link";
import { shortlistUrl } from "@/lib/landscape-shortlist";

export function CiamEvaluationGuide() {
  return (
    <section aria-labelledby="ciam-evaluation" className="mt-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      <h2 id="ciam-evaluation" tabIndex={-1} className="scroll-mt-24 text-xl font-semibold">
        Evaluate enterprise single sign-on
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6">
        A customer wants employees to use their company identity provider to sign in to your SaaS app.
        Start by deciding whether to add single sign-on (SSO) to your existing login or adopt a broader
        customer identity and access management (CIAM) platform.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6">
        <li><strong>Integration.</strong> Test sign-in with the customer’s identity provider. Identify which system owns sessions, account linking and fallback login.</li>
        <li><strong>Tenant boundaries.</strong> Test two customer organizations, including a user who belongs to both. Verify that signing in to one organization grants only the intended access.</li>
        <li><strong>Lifecycle and support.</strong> Time how long access lasts after a user is disabled. Have a customer admin configure a connection and walk through an expired certificate or failed sign-in.</li>
      </ul>
      <div className="mt-2 flex flex-wrap gap-x-5 text-sm [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
        <Link href={shortlistUrl(["descope", "workos"], "uc-ciam")}>Compare Descope and WorkOS</Link>
        <Link href="/landscape?category=ciam">Browse CIAM products</Link>
        <Link href="/categories/workforce-identity">Explore workforce identity</Link>
      </div>
    </section>
  );
}
