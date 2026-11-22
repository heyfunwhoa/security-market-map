import styles from "./payment-key-coordination.module.css";

export function PaymentKeyCoordination() {
  return (
    <details className="rounded-lg border border-border bg-card px-3 sm:px-5">
      <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        See who needs to coordinate
      </summary>
      <figure className="space-y-4 border-t border-border pt-4 pb-5">
        <figcaption id="payment-key-coordination" tabIndex={-1} className="scroll-mt-24 focus-visible:outline-2 focus-visible:outline-ring">
          <p className="text-sm text-muted-foreground">Illustrative payment-service handoff</p>
          <h3 className="mt-1 text-xl">The old key has expired. Can payments still go through?</h3>
          <p className="mt-2 text-sm leading-6">Assume AppSec has linked the public finding to the payment service. Two teams can now check their part in parallel.</p>
        </figcaption>
        <div>
          <dl className={styles.branches}>
            <div className={styles.branch}>
              <dt className="font-semibold">Stripe account admin</dt>
              <dd className="mt-2 text-sm"><strong>Confirmed</strong><br />The old key expired in the affected account and environment.</dd>
            </div>
            <div className={styles.branch}>
              <dt className="font-semibold">Payment service owner</dt>
              <dd className="mt-2 text-sm"><strong>Still open</strong><br />The team has yet to confirm a successful request using the replacement key.</dd>
            </div>
          </dl>
          <div className={styles.interchange}>
            <p className="font-semibold">Next check-in · Incident owner with the payments team</p>
            <p className="mt-1 text-sm leading-6">“Can you show a successful request from the affected service using the replacement key?”</p>
          </div>
        </div>
        <p className="text-sm leading-6"><strong>Usage review stays open.</strong> Even after payments are confirmed, the SOC may still be reviewing activity during the exposure window. Record what the available logs cover and what remains unknown.</p>
        <a href="#exposure-partner-key" className="text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Read the payment example and its Stripe sources</a>
      </figure>
    </details>
  );
}
