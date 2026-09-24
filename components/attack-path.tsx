"use client";

import { useState } from "react";
import Link from "next/link";
import { attackSteps } from "@/lib/data/brief";

export function AttackPath() {
  const [index, setIndex] = useState(0);
  const step = attackSteps[index];

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Attack path steps">
        {attackSteps.map((item, itemIndex) => {
          const selected = itemIndex === index;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`attack-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`attack-panel-${item.id}`}
              className={`shrink-0 rounded-full border px-3 py-2 text-left text-sm ${
                selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
              }`}
              onClick={() => setIndex(itemIndex)}
            >
              {itemIndex + 1}. {item.title}
            </button>
          );
        })}
      </div>
      <article
        role="tabpanel"
        id={`attack-panel-${step.id}`}
        aria-labelledby={`attack-tab-${step.id}`}
        className="mt-4 rounded-xl border border-border bg-card p-5"
      >
        <p className="text-sm leading-6">{step.narrative}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-semibold">Actor</dt>
            <dd className="text-muted-foreground">{step.actor}</dd>
          </div>
          <div>
            <dt className="font-semibold">Asset</dt>
            <dd className="text-muted-foreground">{step.asset}</dd>
          </div>
          <div>
            <dt className="font-semibold">Lifecycle</dt>
            <dd className="text-muted-foreground">{step.lifecycle}</dd>
          </div>
        </dl>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-3">Control</th>
                <th className="p-3">Where it can look</th>
                <th className="p-3">What it can do</th>
                <th className="p-3">When</th>
                <th className="p-3">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {step.controls.map((control) => (
                <tr key={control.name} className="border-t border-border align-top">
                  <td className="p-3">
                    <Link href={control.href} className="text-primary hover:underline">
                      {control.name}
                    </Link>
                  </td>
                  <td className="p-3">{control.observe}</td>
                  <td className="p-3">{control.depth}</td>
                  <td className="p-3">
                    <span
                      className={
                        control.timing === "before"
                          ? "rounded-full bg-primary/15 px-2 py-1"
                          : control.timing === "during"
                            ? "rounded-full bg-amber-500/15 px-2 py-1"
                            : "rounded-full bg-muted px-2 py-1"
                      }
                    >
                      {control.timing}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{control.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-6">
          <span className="font-semibold">Ask in the demo. </span>
          {step.ask}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2 text-sm disabled:opacity-40"
            disabled={index === 0}
            onClick={() => setIndex((value) => value - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2 text-sm disabled:opacity-40"
            disabled={index === attackSteps.length - 1}
            onClick={() => setIndex((value) => value + 1)}
          >
            Next
          </button>
        </div>
      </article>
    </div>
  );
}
