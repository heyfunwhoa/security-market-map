// Offline proposal-only intake. K1/K4 remain the only mapping validation authority.
export type IntakeKind = "source" | "concept" | "technology" | "vendor";
export type Entry = { kind: string; id: string; label: string; aliases?: readonly string[] };
export type Proposal = { id: string; from: string; to: string; relation: string; sourceId: string; revision: string; locator: string; statement: string; conflict?: boolean };
export function previewIntake(input: { kind: IntakeKind; query: string; entries: readonly Entry[]; proposals: readonly Proposal[]; sourceId: string; revision: string }) {
  const normalize = (s: string) => s.trim().toLowerCase();
  const matches = input.entries.filter(e => [e.label,e.id,...(e.aliases ?? [])].some(a => normalize(a) === normalize(input.query)));
  const keys = new Set(input.entries.map(e => e.kind + ":" + e.id));
  const seen = new Map<string, string>();
  const changes = [];
  for (const p of input.proposals) {
    const key = JSON.stringify([p.from,p.to,p.relation,p.sourceId,p.revision,p.locator,p.statement]);
    const signature = JSON.stringify(p);
    if (seen.get(p.id) === signature) continue;
    const collision = seen.has(p.id);
    seen.set(p.id,signature);
    const disposition = collision || p.conflict ? "conflict" : !keys.has(p.from) || !keys.has(p.to) || p.sourceId !== input.sourceId || p.revision !== input.revision || !p.locator.trim() || !p.statement.trim() ? "unsupported" : "enrichment";
    changes.push({ ...p, key, disposition, review: "pending" as const });
  }
  const unique = changes.filter((p,i) => p.disposition === "conflict" || changes.findIndex(q => q.key === p.key) === i);
  return { matches, identityDisposition: matches.length > 1 ? "conflict" : matches.length === 1 ? "matched" : "new_candidate", changes: unique, published: false as const };
}
export function neighbors(preview: ReturnType<typeof previewIntake>, ref: string) {
  return preview.changes.filter(p => p.disposition === "enrichment" && (p.from === ref || p.to === ref)).map(p => ({ ref: p.from === ref ? p.to : p.from, relation: p.relation, direction: p.from === ref ? "outbound" : "inbound", review: p.review }));
}
