"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { VendorMonitorView } from "@/lib/research/vendor-monitor";

const DECISIONS = [
  { value: "accept", label: "Accept for a later catalog edit" },
  { value: "reject", label: "Reject" },
  { value: "request_changes", label: "Request changes" },
  { value: "defer", label: "Defer" },
  { value: "resubmit", label: "Resubmit" },
] as const;

export function VendorReviewForm({
  proposalId,
  onReviewed,
}: {
  proposalId: string;
  onReviewed: (view: VendorMonitorView) => void;
}) {
  const [decision, setDecision] = useState<(typeof DECISIONS)[number]["value"]>("defer");
  const [reviewer, setReviewer] = useState("");
  const [rationale, setRationale] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      className="mt-3 space-y-3"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError("");
        try {
          const response = await fetch("/api/research/review", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ proposedClaimId: proposalId, decision, reviewer, rationale }),
          });
          const body = (await response.json()) as { error?: string; published?: boolean };
          if (!response.ok || body.published !== false) {
            setError(body.error ?? "Review was not recorded.");
            return;
          }
          const status = await fetch("/api/research/status");
          if (!status.ok) {
            setError("The decision was recorded, and the status view could not be reloaded.");
            return;
          }
          onReviewed((await status.json()) as VendorMonitorView);
          setRationale("");
        } catch {
          setError("Review was not recorded.");
        } finally {
          setPending(false);
        }
      }}
    >
      <p className="text-sm leading-6 text-muted-foreground">
        Record a review on this server&apos;s ledger. Accepting a proposal does not publish a catalog claim.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor={`decision-${proposalId}`}>Decision</Label>
          <select
            id={`decision-${proposalId}`}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            value={decision}
            onChange={(event) => setDecision(event.target.value as (typeof DECISIONS)[number]["value"])}
          >
            {DECISIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`reviewer-${proposalId}`}>Reviewer</Label>
          <Input
            id={`reviewer-${proposalId}`}
            value={reviewer}
            maxLength={80}
            onChange={(event) => setReviewer(event.target.value)}
            autoComplete="name"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor={`rationale-${proposalId}`}>Rationale</Label>
        <Textarea
          id={`rationale-${proposalId}`}
          value={rationale}
          maxLength={500}
          onChange={(event) => setRationale(event.target.value)}
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Recording" : "Record review"}
      </Button>
    </form>
  );
}
