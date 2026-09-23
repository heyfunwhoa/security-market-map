"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { accountBrief, DEFAULT_WEIGHTS, scoreAccount } from "@/lib/territory";
import type { Account, FitWeights, UseCase } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "atlas-territory-v1";

type TerritoryStore = { accounts: Account[]; weights: FitWeights };

const EMPTY_STORE: TerritoryStore = { accounts: [], weights: DEFAULT_WEIGHTS };

let memory: TerritoryStore = EMPTY_STORE;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readStorage(): TerritoryStore {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return EMPTY_STORE;
    const parsed = JSON.parse(stored) as Partial<TerritoryStore>;
    return {
      accounts: Array.isArray(parsed.accounts) ? parsed.accounts : [],
      weights: parsed.weights ?? DEFAULT_WEIGHTS,
    };
  } catch {
    return EMPTY_STORE;
  }
}

if (typeof window !== "undefined") {
  memory = readStorage();
}

function getSnapshot() {
  return memory;
}

function getServerSnapshot() {
  return EMPTY_STORE;
}

function writeStore(next: TerritoryStore) {
  memory = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

function blankAccount(): Account {
  return {
    id: crypto.randomUUID(),
    name: "",
    industry: "",
    employees: "",
    identityEstimate: "",
    idp: "",
    iga: { state: "unknown", name: "" },
    pam: { state: "unknown", name: "" },
    vault: { state: "unknown", name: "" },
    cloud: [],
    compliance: [],
    agentAdoption: "unknown",
    triggers: "",
    partner: "",
    sourceLinks: [],
    hypothesis: "",
    notes: "",
    useCaseIds: [],
    updatedAt: new Date().toISOString(),
  };
}

export function TerritoryWorkspace({ useCases }: { useCases: UseCase[] }) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const accounts = store.accounts;
  const weights = store.weights;
  const [activeId, setActiveId] = useState<string>("");
  const [linkError, setLinkError] = useState("");
  const [copied, setCopied] = useState(false);

  const account = accounts.find((item) => item.id === activeId) ?? accounts[0] ?? null;
  const score = useMemo(
    () => (account ? scoreAccount(account, weights) : null),
    [account, weights],
  );

  function update(next: Account) {
    writeStore({
      weights,
      accounts: accounts.map((item) => (item.id === next.id ? next : item)),
    });
  }

  function addAccount() {
    const next = blankAccount();
    writeStore({ weights, accounts: [next, ...accounts] });
    setActiveId(next.id);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside>
        <Button type="button" onClick={addAccount}>
          New account
        </Button>
        {accounts.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No accounts yet. Nothing here is invented, including incumbents.
          </p>
        ) : (
          <ul className="mt-3 space-y-1">
            {accounts.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-current={item.id === activeId}
                  className="w-full rounded-md px-2 py-1.5 text-left text-sm aria-current:bg-muted"
                >
                  {item.name || "Untitled account"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
      {account && score ? (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Account name" value={account.name} onChange={(name) => update({ ...account, name })} />
            <Field label="Industry" value={account.industry} onChange={(industry) => update({ ...account, industry })} />
            <Field label="Employees" value={account.employees} onChange={(employees) => update({ ...account, employees })} />
            <Field
              label="Identity estimate"
              value={account.identityEstimate}
              onChange={(identityEstimate) => update({ ...account, identityEstimate })}
            />
            <Field label="IdP" value={account.idp} onChange={(idp) => update({ ...account, idp })} />
            <Field label="Partner" value={account.partner} onChange={(partner) => update({ ...account, partner })} />
          </div>
          <Incumbent
            label="IGA incumbent"
            value={account.iga}
            onChange={(iga) => update({ ...account, iga })}
          />
          <Incumbent
            label="PAM incumbent"
            value={account.pam}
            onChange={(pam) => update({ ...account, pam })}
          />
          <Incumbent
            label="Vault incumbent"
            value={account.vault}
            onChange={(vault) => update({ ...account, vault })}
          />
          <div>
            <Label htmlFor="agent">Agent adoption</Label>
            <select
              id="agent"
              value={account.agentAdoption}
              onChange={(event) =>
                update({
                  ...account,
                  agentAdoption: event.target.value as Account["agentAdoption"],
                })
              }
              className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="unknown">Unknown</option>
              <option value="none">None</option>
              <option value="pilot">Pilot</option>
              <option value="production">Production</option>
            </select>
          </div>
          <ListField
            label="Cloud"
            values={account.cloud}
            onChange={(cloud) => update({ ...account, cloud })}
            placeholder="Add a cloud you have confirmed"
          />
          <ListField
            label="Compliance frameworks"
            values={account.compliance}
            onChange={(compliance) => update({ ...account, compliance })}
            placeholder="Add a framework you have confirmed"
          />
          <div>
            <Label htmlFor="triggers">Triggers</Label>
            <Textarea
              id="triggers"
              value={account.triggers}
              onChange={(event) => update({ ...account, triggers: event.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="hypothesis">Hypothesis</Label>
            <Textarea
              id="hypothesis"
              value={account.hypothesis}
              onChange={(event) => update({ ...account, hypothesis: event.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={account.notes}
              onChange={(event) => update({ ...account, notes: event.target.value })}
              className="mt-1"
            />
          </div>
          <fieldset>
            <legend className="text-sm font-medium">Use cases for the discovery plan</legend>
            <ul className="mt-2 space-y-1">
              {useCases.map((useCase) => (
                <li key={useCase.id}>
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={account.useCaseIds.includes(useCase.id)}
                      onChange={(event) => {
                        const useCaseIds = event.target.checked
                          ? [...account.useCaseIds, useCase.id]
                          : account.useCaseIds.filter((id) => id !== useCase.id);
                        update({ ...account, useCaseIds });
                      }}
                    />
                    {useCase.name}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          <div>
            <Label htmlFor="source-url">Source link</Label>
            <div className="mt-1 flex gap-2">
              <Input
                id="source-url"
                placeholder="https://..."
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return;
                  event.preventDefault();
                  const input = event.currentTarget;
                  const url = input.value.trim();
                  try {
                    const parsed = new URL(url);
                    if (!parsed.protocol.startsWith("http")) throw new Error("bad");
                    update({
                      ...account,
                      sourceLinks: [...account.sourceLinks, { label: parsed.hostname, url }],
                    });
                    input.value = "";
                    setLinkError("");
                  } catch {
                    setLinkError("Enter a full http or https URL. A blank source is better than a guessed one.");
                  }
                }}
              />
            </div>
            {linkError ? <p className="mt-1 text-sm text-destructive">{linkError}</p> : null}
            <ul className="mt-2 space-y-1 text-sm">
              {account.sourceLinks.map((link) => (
                <li key={link.url}>
                  <a className="underline" href={link.url}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <fieldset className="rounded-xl border border-border p-4">
            <legend className="px-1 text-sm font-semibold">Your weights, 0 to 5</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(Object.keys(DEFAULT_WEIGHTS) as (keyof FitWeights)[]).map((key) => (
                <div key={key}>
                  <Label htmlFor={`weight-${key}`}>{key}</Label>
                  <Input
                    id={`weight-${key}`}
                    inputMode="numeric"
                    value={String(weights[key])}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (!Number.isFinite(value)) return;
                      writeStore({
                        accounts,
                        weights: { ...weights, [key]: Math.min(5, Math.max(0, value)) },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </fieldset>
          <section className="rounded-xl border border-border bg-card p-4">
            <h2 className="text-xl">
              Fit {score.score === null ? "not scored" : `${score.score} / 100`}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Unknown factors are left out, then the remaining weights are renormalized. The score does
              not invent installed technology.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {score.factors.map((factor) => (
                <li key={factor.id}>
                  <span className="font-medium">{factor.label}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    · weight {factor.weight} · {factor.value === null ? "excluded" : factor.value}. {factor.reason}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className="mt-4"
              variant="outline"
              onClick={async () => {
                const markdown = accountBrief({ account, weights, useCases });
                await navigator.clipboard.writeText(markdown);
                const blob = new Blob([markdown], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = `${account.name || "account"}-brief.md`;
                anchor.click();
                URL.revokeObjectURL(url);
                setCopied(true);
              }}
            >
              {copied ? "Brief copied and downloaded" : "Export Markdown brief"}
            </Button>
          </section>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">Add an account to start a brief.</p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1" />
    </div>
  );
}

function Incumbent({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Account["iga"];
  onChange: (value: Account["iga"]) => void;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div>
        <Label htmlFor={id}>{label}</Label>
        <select
          id={id}
          value={value.state}
          onChange={(event) =>
            onChange({ ...value, state: event.target.value as Account["iga"]["state"] })
          }
          className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
        >
          <option value="unknown">Unknown — leave out of the score</option>
          <option value="none">None recorded</option>
          <option value="named">Named incumbent</option>
        </select>
      </div>
      <div>
        <Label htmlFor={`${id}-name`}>Name, if you recorded one</Label>
        <Input
          id={`${id}-name`}
          value={value.name}
          disabled={value.state !== "named"}
          onChange={(event) => onChange({ ...value, name: event.target.value })}
          className="mt-1"
        />
      </div>
    </div>
  );
}

function ListField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        className="mt-1"
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          const value = event.currentTarget.value.trim();
          if (!value) return;
          onChange([...values, value]);
          event.currentTarget.value = "";
        }}
      />
      <ul className="mt-1 flex flex-wrap gap-2">
        {values.map((value) => (
          <li key={value}>
            <button
              type="button"
              className="rounded-full border border-border px-2 py-0.5 text-xs"
              onClick={() => onChange(values.filter((item) => item !== value))}
            >
              {value} · remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
