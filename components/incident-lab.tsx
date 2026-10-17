"use client";

import { useState } from "react";
import { evaluateClassification, type IncidentClassification } from "@/lib/incident-classifier";

type Scenario = "saas" | "package";
function fixture(scenario: Scenario): IncidentClassification {
  const packageCase = scenario === "package";
  return {
    incidentId: packageCase ? "synthetic:package-ecosystem" : "synthetic:saas-identity",
    fixtureOnly: true,
    veris: { schemaVersion: null, actor: null, action: null, asset: null, attribute: null },
    claims: [{ id: "synthetic-claim-1", status: "reported" }],
    mappings: [{
      attackId: packageCase ? "T1195.001" : "T1195.002",
      domain: "enterprise-attack",
      taxonomy: { name: "MITRE ATT&CK", version: null, stixId: null },
      claimIds: ["synthetic-claim-1"],
      rationale: packageCase ? "Fictional publisher distributes altered dependency" : "Fictional vendor update contains altered software",
      status: "candidate"
    }],
    unknowns: packageCase ? ["Credential theft outcome", "Downstream execution"] : ["Initial access mechanism", "Which tenants were affected"],
    disagreements: []
  };
}
export function IncidentLab() {
  const [scenario, setScenario] = useState<Scenario>("saas");
  const [missing, setMissing] = useState(false);
  const [disputed, setDisputed] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [customId, setCustomId] = useState("");
  const data = fixture(scenario);
  data.mappings[0].attackId = customId.trim() || data.mappings[0].attackId;
  data.mappings[0].claimIds = missing ? ["nonexistent-claim"] : ["synthetic-claim-1"];
  if (disputed) { data.disagreements = ["Synthetic contradictory account"]; data.claims[0].status = "disputed"; }
  if (reviewed) data.mappings[0].status = "reviewed_supported";
  const result = evaluateClassification(data);
  return (
    <section className="mt-8 space-y-6" aria-label="Fixture incident classification workbench">
      <div className="rounded-xl border border-border p-5 space-y-4">
        <label htmlFor="scenario" className="block font-semibold">Choose a synthetic incident</label>
        <select id="scenario" className="w-full rounded-lg border border-border bg-background p-3" value={scenario} onChange={(event) => { setScenario(event.target.value as Scenario); setCustomId(""); }}>
          <option value="saas">Third-party SaaS software compromise</option>
          <option value="package">Malicious development dependency</option>
        </select>
        <label htmlFor="attack-id" className="block text-sm font-medium">ATT&CK candidate ID (format test only)</label>
        <input id="attack-id" className="w-full rounded-lg border border-border bg-background p-3" value={customId} onChange={event => setCustomId(event.target.value)} placeholder={data.mappings[0].attackId} />
        <fieldset className="space-y-3">
          <legend className="font-semibold">Try evidence failures</legend>
          <label className="flex items-center gap-3"><input type="checkbox" checked={missing} onChange={event => setMissing(event.target.checked)} /> Remove supporting claim</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={disputed} onChange={event => setDisputed(event.target.checked)} /> Add disputed evidence</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={reviewed} onChange={event => setReviewed(event.target.checked)} /> Request reviewed status (not an approval)</label>
        </fieldset>
        <button type="button" onClick={() => {setMissing(false);setDisputed(false);setReviewed(false);setCustomId("");setScenario("saas");}} className="rounded-lg border border-border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2">Reset fixture</button>
      </div>
      <div className="rounded-xl border border-border p-5 space-y-4" aria-live="polite">
        <h2 className="text-xl font-semibold">Classification evaluation</h2>
        <p className="text-sm">Validation: <strong>{result.valid ? "Candidate structure accepted" : "Blocked by validation"}</strong></p>
        <p className="text-sm">Publication: <strong>Not permitted (synthetic only)</strong></p>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div><dt className="text-sm text-muted-foreground">Candidate technique</dt><dd className="font-semibold">{data.mappings[0].attackId}</dd></div>
          <div><dt className="text-sm text-muted-foreground">Mapping status</dt><dd>{data.mappings[0].status.replaceAll("_", " ")}</dd></div>
          <div><dt className="text-sm text-muted-foreground">VERIS</dt><dd>Unknown; schema not imported</dd></div>
          <div><dt className="text-sm text-muted-foreground">ATT&CK taxonomy version</dt><dd>Not pinned</dd></div>
        </dl>
        <h3 className="font-semibold">Why suggested</h3>
        <p className="text-sm">{data.mappings[0].rationale} (synthetic narrative, not evidence of a real incident)</p>
        <h3 className="font-semibold">Unresolved questions</h3>
        <ul className="list-disc pl-6 text-sm">{data.unknowns.map(x=><li key={x}>{x}</li>)}</ul>
        <h3 className="font-semibold">Validation findings</h3>
        {result.failures.length ? <ul className="list-disc pl-6 text-sm">{result.failures.map((x,i)=><li key={i}>{x}</li>)}</ul> : <p className="text-sm">Candidate inputs are structurally acceptable, but no framework or human approval is established.</p>}
      </div>
      <p className="text-sm text-muted-foreground">Local deterministic demonstration only. No saved records, external data requests, AI generation, or incident publication. This UI does not validate ATT&CK IDs against MITRE’s dataset.</p>
    </section>
  );
}
