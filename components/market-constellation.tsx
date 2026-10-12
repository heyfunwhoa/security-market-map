"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { marketCircles, type MarketCircle } from "@/lib/market-circles";

function CircleDetail({ circle }: { circle: MarketCircle }) {
  return (
    <div>
      <h3 className="font-heading text-lg leading-tight">{circle.name}</h3>
      <p className="mt-2 text-sm leading-6">{circle.question}</p>
      <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">Categories</p>
      <p className="mt-1 text-sm leading-6">{circle.categories}</p>
      <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">Examples</p>
      <p className="mt-1 text-sm leading-6">{circle.examples}</p>
      <Link
        href={circle.href}
        className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Open this area
      </Link>
    </div>
  );
}

export function MarketConstellation() {
  const [activeId, setActiveId] = useState("identity");
  const active = marketCircles.find((circle) => circle.id === activeId) ?? marketCircles[0];

  return (
    <figure className="mt-6">
      <figcaption className="max-w-3xl text-sm leading-6 text-muted-foreground">
        Follow an attack from left to right. An identity gets access, uses an application or a network
        path, reaches a workload, and affects data. The circles underneath are how a team detects the
        incident, decides what to fix, and shows that the control still holds. Overlaps are shared
        problems and shared budgets, not a ranking.
      </figcaption>
      <p className="mt-3 text-xs text-muted-foreground sm:hidden">
        Scroll sideways to move from identity across to data. Each area is written out under the diagram.
      </p>
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <svg
            viewBox="0 0 1040 520"
            role="group"
            aria-label="Overlapping circles of security domains, from identity to data"
            className="h-auto min-w-[720px] w-full"
          >
            <g style={{ mixBlendMode: "multiply" }}>
              {marketCircles.map((circle) => (
                <circle key={circle.id} cx={circle.cx} cy={circle.cy} r={circle.r} fill={circle.fill} />
              ))}
            </g>
            {marketCircles.map((circle) => {
              const start = circle.cy - ((circle.lines.length - 1) * 16) / 2;
              return (
                <a
                  key={circle.id}
                  href={circle.href}
                  aria-label={`${circle.name}. ${circle.question}`}
                  className={cn(
                    "outline-none [&:hover>circle]:stroke-foreground [&:focus-visible>circle]:stroke-foreground",
                    circle.id === active.id && "[&>circle]:stroke-foreground",
                  )}
                  onMouseEnter={() => setActiveId(circle.id)}
                  onFocus={() => setActiveId(circle.id)}
                >
                  <circle
                    cx={circle.cx}
                    cy={circle.cy}
                    r={circle.r}
                    fill="transparent"
                    className="stroke-transparent stroke-[3]"
                  />
                  <text
                    x={circle.cx}
                    y={start}
                    textAnchor="middle"
                    fill="currentColor"
                    style={{ fontFamily: "var(--font-heading)", fontSize: circle.r > 100 ? 18 : 14 }}
                    className="pointer-events-none"
                  >
                    {circle.lines.map((line, index) => (
                      <tspan key={line} x={circle.cx} dy={index === 0 ? 0 : 18}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </a>
              );
            })}
          </svg>
        </div>
        <aside
          className="hidden rounded-2xl border border-border bg-card p-4 lg:block"
          aria-live="polite"
        >
          <CircleDetail circle={active} />
        </aside>
      </div>
      <ul className="mt-4 space-y-3 lg:hidden">
        {marketCircles.map((circle) => (
          <li key={circle.id} className="rounded-2xl border border-border bg-card p-4">
            <CircleDetail circle={circle} />
          </li>
        ))}
      </ul>
    </figure>
  );
}
