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

function chainWord(capability: string) {
  const known: Record<string, string> = {
    "Secrets detection": "Detect",
    "Secret verification": "Verify",
    "Identity and credential discovery": "Owner",
    "Revocation and remediation": "Revoke",
    "Secrets management": "Issue",
    "Workload identity and short-lived authentication": "Short-lived",
    "Governance and permission analysis": "Access",
  };
  return known[capability] ?? shortLines(capability)[0];
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
  const satellite = count >= 10 ? 32 : count >= 8 ? 36 : count >= 6 ? 42 : 48;
  const orbit = count >= 10 ? 198 : count >= 8 ? 168 : count >= 6 ? 142 : 116;
  const hub = orbit - 16;
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
          <g>
            <circle cx={center} cy={center} r={hub} fill={hubFill} fillOpacity={0.95} stroke="currentColor" strokeOpacity={0.28} />
            {examples.map((item, index) => {
              const angle = -Math.PI / 2 + (index * 2 * Math.PI) / examples.length;
              const x = center + Math.cos(angle) * orbit;
              const y = center + Math.sin(angle) * orbit;
              return (
                <circle
                  key={item.label}
                  cx={x}
                  cy={y}
                  r={satellite}
                  fill={FILLS[index % FILLS.length]}
                  fillOpacity={0.92}
                  stroke="currentColor"
                  strokeOpacity={0.28}
                />
              );
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
  const lineHeight = size + 3;
  const firstDy = -((lines.length - 1) * lineHeight) / 2;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="currentColor"
      style={{ fontFamily: "var(--font-heading)", fontSize: size }}
      className="pointer-events-none"
    >
      {lines.map((line, index) => (
        <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? firstDy : lineHeight}>
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
        <g>
          {kinds.map((kind) => (
            <circle key={kind.label} cx={kind.cx} cy={100} r={72} fill={kind.fill} fillOpacity={0.95} stroke="currentColor" strokeOpacity={0.28} />
          ))}
          {jobs.map((job) => (
            <circle key={job.label[0]} cx={job.cx} cy={248} r={58} fill="oklch(0.9 0.04 80)" fillOpacity={0.95} stroke="currentColor" strokeOpacity={0.28} />
          ))}
        </g>
        {kinds.map((kind) => (
          <a key={kind.label} href={kind.href} aria-label={kind.label}>
            <circle cx={kind.cx} cy={100} r={72} fill="transparent" className="stroke-transparent stroke-[3] hover:stroke-foreground" />
            <DiagramLabel x={kind.cx} y={100} lines={kind.label === "Non-human" ? ["Non-human"] : kind.label === "AI agent" ? ["AI agent"] : [kind.label]} size={16} />
          </a>
        ))}
        {jobs.map((job) => (
          <a key={job.label[0]} href={job.href} aria-label={job.label[0]}>
            <circle cx={job.cx} cy={248} r={58} fill="transparent" className="stroke-transparent stroke-[3] hover:stroke-foreground" />
            <DiagramLabel
              x={job.cx}
              y={248}
              lines={job.label[0] === "Authentication" ? ["Auth"] : job.label[0] === "Governance" ? ["Govern"] : job.label[0] === "Discovery" ? ["Discover"] : ["Lifecycle"]}
              size={14}
            />
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
  const width = steps.length * 130;
  return (
    <figure className="rounded-2xl border border-border bg-card p-3">
      <figcaption className="px-1 text-sm leading-6 text-muted-foreground">
        Read left to right. Each circle is a different job created by one exposed credential.
      </figcaption>
      <div className="mt-2 overflow-x-auto">
        <svg viewBox={`0 0 ${width} 170`} role="group" aria-label="Seven jobs created by one leaked credential" className="h-auto min-w-[52rem] w-full">
          <line x1="48" y1="78" x2={width - 48} y2="78" stroke="currentColor" strokeOpacity="0.35" />
          {steps.map((step, index) => {
            const x = 70 + index * 130;
            return (
              <a key={step.capability} href={step.href} aria-label={`${index + 1}. ${step.capability}. ${step.problem}`}>
                <circle cx={x} cy={78} r={48} fill={FILLS[index % FILLS.length]} fillOpacity={0.95} stroke="currentColor" strokeOpacity={0.28} />
                <DiagramLabel x={x} y={78} lines={[String(index + 1), chainWord(step.capability)]} size={12} />
              </a>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
