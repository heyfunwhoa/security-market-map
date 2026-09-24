import type { SeedLink } from "@/lib/data/connections";

const FILLS = [
  "oklch(0.86 0.05 240)",
  "oklch(0.86 0.06 155)",
  "oklch(0.87 0.06 85)",
  "oklch(0.85 0.05 310)",
  "oklch(0.86 0.05 25)",
  "oklch(0.86 0.04 200)",
  "oklch(0.87 0.05 55)",
  "oklch(0.85 0.04 130)",
];

function hubLines(title: string): string[] {
  const known: Record<string, string[]> = {
    "Secrets detection": ["Secrets", "detection"],
    "Secrets management": ["Secrets", "mgmt"],
    "NHI discovery and posture": ["NHI", "discovery"],
    "Machine IAM and workload identity": ["Machine", "IAM"],
    "Identity governance": ["Identity", "governance"],
    "Privileged access": ["Privileged", "access"],
    "Certificate lifecycle": ["Certificates"],
    "Cloud entitlements": ["Cloud", "access"],
    "SaaS-to-SaaS and OAuth": ["SaaS", "OAuth"],
    "AI agent identity": ["AI agent"],
    "Network edge": ["Network"],
  };
  return known[title] ?? shortLines(title);
}

function shortLines(label: string): string[] {
  const known: Record<string, string[]> = {
    "Truffle Security": ["Truffle"],
    "Oasis Security": ["Oasis"],
    "Entro Security": ["Entro"],
    "Astrix Security": ["Astrix"],
    "Token Security": ["Token"],
    "Clutch Security": ["Clutch"],
    "Orca Security": ["Orca"],
    "Sonrai Security": ["Sonrai"],
    "Abnormal Security": ["Abnormal"],
    "Palo Alto Networks": ["Palo Alto"],
    "CyberArk lineage": ["CyberArk"],
    "Idira / CyberArk lineage": ["CyberArk"],
    "One Identity": ["One", "Identity"],
    "SPIFFE/SPIRE": ["SPIFFE"],
    "Grip Security": ["Grip"],
  };
  if (known[label]) return known[label];
  if (label.length <= 12) return [label];
  const [first, ...rest] = label.split(" ");
  if (rest.length === 0) return [label.slice(0, 12)];
  return [first, rest.join(" ")].slice(0, 2);
}

function layout(count: number) {
  const satellite = count >= 8 ? 36 : count >= 6 ? 42 : 48;
  const orbit = count >= 8 ? 168 : count >= 6 ? 142 : 116;
  const hub = orbit - 18;
  const pad = 8;
  const center = orbit + satellite + pad;
  return { satellite, orbit, hub, center, size: center * 2 };
}

export function AreaDiagram({
  title,
  problem,
  href,
  examples,
  fill,
}: {
  title: string;
  problem: string;
  href: string | null;
  examples: SeedLink[];
  fill?: string;
}) {
  const { satellite, orbit, hub, center, size } = layout(examples.length);
  const hubFill = fill ?? "oklch(0.82 0.04 80)";
  return (
    <figure className="rounded-2xl border border-border bg-card p-3">
      <figcaption className="px-1 text-sm leading-6">
        <span className="font-medium">{title}.</span>{" "}
        <span className="text-muted-foreground">{problem}</span>
      </figcaption>
      <div className="mt-2 overflow-x-auto">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          role="group"
          aria-label={`${title}. ${problem}`}
          className="mx-auto h-auto w-full max-w-[28rem]"
        >
          <g style={{ mixBlendMode: "multiply" }}>
            <circle cx={center} cy={center} r={hub} fill={hubFill} />
            {examples.map((item, index) => {
              const angle = -Math.PI / 2 + (index * 2 * Math.PI) / examples.length;
              const x = center + Math.cos(angle) * orbit;
              const y = center + Math.sin(angle) * orbit;
              return <circle key={item.label} cx={x} cy={y} r={satellite} fill={FILLS[index % FILLS.length]} />;
            })}
          </g>
          {href ? (
            <a href={href} aria-label={title}>
              <circle cx={center} cy={center} r={hub} fill="transparent" className="stroke-transparent stroke-[3] hover:stroke-foreground" />
              <DiagramLabel x={center} y={center} lines={hubLines(title)} size={hub > 120 ? 16 : 14} />
            </a>
          ) : (
            <DiagramLabel x={center} y={center} lines={hubLines(title)} size={hub > 120 ? 16 : 14} />
          )}
          {examples.map((item, index) => {
            const angle = -Math.PI / 2 + (index * 2 * Math.PI) / examples.length;
            const x = center + Math.cos(angle) * orbit;
            const y = center + Math.sin(angle) * orbit;
            const lines = shortLines(item.label);
            const label = <DiagramLabel x={x} y={y} lines={lines} size={satellite > 40 ? 12 : 11} />;
            if (!item.href) {
              return (
                <g key={item.label} aria-label={`${item.label}, not seeded`}>
                  {label}
                </g>
              );
            }
            return (
              <a key={item.label} href={item.href} aria-label={item.label}>
                <circle cx={x} cy={y} r={satellite} fill="transparent" className="stroke-transparent stroke-[3] hover:stroke-foreground" />
                {label}
              </a>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

function DiagramLabel({ x, y, lines, size }: { x: number; y: number; lines: string[]; size: number }) {
  const start = y - ((lines.length - 1) * (size + 2)) / 2 + size * 0.35;
  return (
    <text
      x={x}
      y={start}
      textAnchor="middle"
      fill="currentColor"
      style={{ fontFamily: "var(--font-heading)", fontSize: size }}
      className="pointer-events-none"
    >
      {lines.map((line, index) => (
        <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : size + 2}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function IdentityStructureDiagram() {
  const kinds = [
    { label: "Human", href: "/categories/workforce-identity", cx: 120, fill: "oklch(0.86 0.05 240)" },
    { label: "Non-human", href: "/categories/nhi", cx: 300, fill: "oklch(0.86 0.06 155)" },
    { label: "AI agent", href: "/categories/agent-identity", cx: 480, fill: "oklch(0.86 0.05 190)" },
  ];
  const jobs = [
    { label: ["Discovery"], href: "/categories/nhi", cx: 90 },
    { label: ["Authentication"], href: "/categories/workforce-identity", cx: 230 },
    { label: ["Governance"], href: "/categories/iga", cx: 370 },
    { label: ["Lifecycle"], href: "/use-cases/nhi-lifecycle", cx: 510 },
  ];

  return (
    <figure className="rounded-2xl border border-border bg-card p-3">
      <figcaption className="px-1 text-sm leading-6 text-muted-foreground">
        Human, machine, and agent identities share the same four jobs. The circles overlap the band
        because the jobs are not separate products.
      </figcaption>
      <svg viewBox="0 0 600 340" role="group" aria-label="Human, non-human, and agent identities above discovery, authentication, governance, and lifecycle" className="mt-2 h-auto w-full">
        <g style={{ mixBlendMode: "multiply" }}>
          {kinds.map((kind) => (
            <circle key={kind.label} cx={kind.cx} cy={92} r={68} fill={kind.fill} />
          ))}
          <rect x="36" y="188" width="528" height="112" rx="56" fill="oklch(0.88 0.04 80)" />
        </g>
        {kinds.map((kind) => (
          <a key={kind.label} href={kind.href} aria-label={kind.label}>
            <circle cx={kind.cx} cy={92} r={68} fill="transparent" className="stroke-transparent stroke-[3] hover:stroke-foreground" />
            <DiagramLabel x={kind.cx} y={92} lines={kind.label === "Non-human" ? ["Non-human"] : [kind.label]} size={15} />
          </a>
        ))}
        {jobs.map((job) => (
          <a key={job.label[0]} href={job.href} aria-label={job.label[0]}>
            <circle cx={job.cx} cy={244} r={52} fill="transparent" className="stroke-transparent stroke-[3] hover:stroke-foreground" />
            <DiagramLabel x={job.cx} y={244} lines={job.label[0] === "Authentication" ? ["Auth"] : job.label} size={14} />
          </a>
        ))}
      </svg>
    </figure>
  );
}

export function CredentialChainDiagram({
  steps,
}: {
  steps: { problem: string; capability: string; href: string }[];
}) {
  const width = steps.length * 118;
  return (
    <figure className="rounded-2xl border border-border bg-card p-3">
      <figcaption className="px-1 text-sm leading-6 text-muted-foreground">
        Read left to right. Each circle is a different job created by one exposed credential.
      </figcaption>
      <div className="mt-2 overflow-x-auto">
        <svg viewBox={`0 0 ${width} 150`} role="group" aria-label="Seven jobs created by one leaked credential" className="h-auto min-w-[44rem] w-full">
          <line x1="40" y1="58" x2={width - 40} y2="58" stroke="currentColor" strokeOpacity="0.35" />
          {steps.map((step, index) => {
            const x = 58 + index * 118;
            return (
              <a key={step.capability} href={step.href} aria-label={`${index + 1}. ${step.capability}. ${step.problem}`}>
                <circle cx={x} cy={58} r={36} fill={FILLS[index % FILLS.length]} className="stroke-transparent stroke-[3] hover:stroke-foreground" />
                <DiagramLabel x={x} y={54} lines={[String(index + 1), ...shortLines(step.capability).slice(0, 1)]} size={11} />
              </a>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
