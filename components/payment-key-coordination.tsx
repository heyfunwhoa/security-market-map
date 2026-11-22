"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./payment-key-coordination.module.css";

const examples = [
  {
    label: "Only the old key’s expiry",
    expiryConfirmed: true,
    paymentConfirmed: false,
    contact: "Payments team",
    question: "Can you show a successful request from the affected service using the replacement key?",
  },
  {
    label: "Only the new key’s use",
    expiryConfirmed: false,
    paymentConfirmed: true,
    contact: "Stripe account admin",
    question: "Is the old key still active in the affected Stripe account? If it expired, when?",
  },
  {
    label: "Both checks confirmed",
    expiryConfirmed: true,
    paymentConfirmed: true,
    contact: "Security operations team (SOC)",
    question: "Which part of the exposure window do the request logs cover, and what can you tell about use of the old key?",
  },
  {
    label: "Neither check confirmed",
    expiryConfirmed: false,
    paymentConfirmed: false,
    contact: "Stripe admin and payments team",
    question: "Who can check whether the old key is still active, and who can confirm the affected service works with its replacement?",
  },
] as const;

function OwnerBranch({ owner, confirmed, evidence }: { owner: string; confirmed: boolean; evidence: string }) {
  return (
    <div className={styles.branch} data-confirmed={confirmed}>
      <dt className="font-semibold">{owner}</dt>
      <dd className="mt-1 text-sm leading-5"><strong>{confirmed ? "Confirmed" : "Still open"}</strong><br />{evidence}</dd>
    </div>
  );
}

export function PaymentKeyCoordination() {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const [selected, setSelected] = useState(0);
  const example = examples[selected];

  useEffect(() => {
    function revealLinkedExample() {
      if (window.location.hash === "#payment-key-coordination" && disclosure.current && !disclosure.current.open) {
        disclosure.current.open = true;
        document.getElementById("payment-key-coordination")?.scrollIntoView();
      }
    }
    revealLinkedExample();
    window.addEventListener("hashchange", revealLinkedExample);
    return () => window.removeEventListener("hashchange", revealLinkedExample);
  }, []);

  return (
    <details ref={disclosure} className="rounded-lg border border-border bg-card px-3 sm:px-5">
      <summary className="cursor-pointer py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        See who needs to coordinate
      </summary>
      <div id="payment-key-coordination" tabIndex={-1} className="scroll-mt-24 space-y-4 border-t border-border pt-4 pb-5 focus-visible:outline-2 focus-visible:outline-ring">
        <div>
          <p className="text-sm text-muted-foreground">Illustrative payment-service handoff</p>
          <h3 className="mt-1 text-xl">A payment key was exposed. Who needs to check in?</h3>
          <p className="mt-2 text-sm leading-6">Assume AppSec traced the key to the payment service. The Stripe admin and the payments team can check their part in parallel.</p>
        </div>
        <div className="space-y-1">
          <label htmlFor="payment-key-evidence" className="block text-sm font-semibold">What has been confirmed in this example?</label>
          <select id="payment-key-evidence" value={selected} onChange={(event) => setSelected(event.currentTarget.selectedIndex)}
            className="block min-h-11 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            {examples.map((item, index) => <option key={item.label} value={index}>{item.label}</option>)}
          </select>
        </div>
        <div className={styles.diagram}>
          <dl aria-label="Evidence from each owner" className={styles.branches}>
            <OwnerBranch owner="Stripe account admin" confirmed={example.expiryConfirmed}
              evidence={example.expiryConfirmed ? "The old key expired in the affected account and environment." : "The old key’s status in the affected account is unknown."} />
            <OwnerBranch owner="Payment service owner" confirmed={example.paymentConfirmed}
              evidence={example.paymentConfirmed ? "The affected service made a successful request with the replacement key." : "A successful request using the replacement key still needs confirmation."} />
          </dl>
          <div className={styles.interchange} aria-live="polite" aria-atomic="true">
            <p className="text-sm text-muted-foreground">Incident owner’s next check-in</p>
            <p className="font-semibold">{example.contact}</p>
            <p className="mt-1 text-sm leading-6">“{example.question}”</p>
          </div>
        </div>
        <p className="text-sm leading-6"><strong>Usage review stays open.</strong> In all four examples, the SOC can investigate in parallel. Record the window reviewed, what the logs show and what remains unknown.</p>
        <a href="#exposure-partner-key" className="text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Read the payment example and its Stripe sources</a>
      </div>
    </details>
  );
}
