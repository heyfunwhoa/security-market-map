"use client";

import { useState } from "react";
import { previewExtraction, type ExtractionPreview } from "@/lib/ingestion/manual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type LocalReview = ExtractionPreview & { id: string };

export function SourceIntake() {
  const [url, setUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [statement, setStatement] = useState("");
  const [sourceType, setSourceType] = useState<
    "official_docs" | "vendor_marketing" | "press_release" | "internal_note"
  >("vendor_marketing");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<ExtractionPreview | null>(null);
  const [queue, setQueue] = useState<LocalReview[]>([]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form
        className="space-y-3 rounded-xl border border-border bg-card p-4"
        onSubmit={(event) => {
          event.preventDefault();
          try {
            const next = previewExtraction({ url, excerpt, statement, sourceType });
            setPreview(next);
            setError("");
          } catch {
            setPreview(null);
            setError("Use a full http or https URL. The preview does not publish anything.");
          }
        }}
      >
        <h2 className="text-xl">Manual source</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Paste a page you already have open. This builds a review preview in the browser. It does not
          crawl the web, and it does not enter the published seed.
        </p>
        <div>
          <Label htmlFor="source-url">URL</Label>
          <Input id="source-url" value={url} onChange={(event) => setUrl(event.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="excerpt">Short excerpt</Label>
          <Textarea id="excerpt" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="statement">Proposed claim</Label>
          <Textarea
            id="statement"
            value={statement}
            onChange={(event) => setStatement(event.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="source-type">Source type</Label>
          <select
            id="source-type"
            value={sourceType}
            onChange={(event) => setSourceType(event.target.value as typeof sourceType)}
            className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="official_docs">Official docs</option>
            <option value="vendor_marketing">Vendor marketing</option>
            <option value="press_release">Press release</option>
            <option value="internal_note">Internal note</option>
          </select>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" variant="outline">
          Preview extraction
        </Button>
      </form>
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-xl">Review preview</h2>
        {!preview ? (
          <p className="mt-2 text-sm text-muted-foreground">Nothing extracted yet.</p>
        ) : (
          <div className="mt-3 space-y-2 text-sm">
            <p>
              <span className="font-medium">Canonical URL. </span>
              {preview.canonicalUrl}
            </p>
            <p>
              <span className="font-medium">Content hash. </span>
              {preview.contentHash}
            </p>
            <p>
              <span className="font-medium">Excerpt. </span>
              {preview.excerpt || "None"}
            </p>
            <p>
              <span className="font-medium">Status. </span>
              Pending human review. Not published.
            </p>
            <Button
              type="button"
              onClick={() =>
                setQueue((current) => [
                  { ...preview, id: `${preview.contentHash}-${current.length}` },
                  ...current.filter((item) => item.contentHash !== preview.contentHash),
                ])
              }
            >
              Park in local review queue
            </Button>
          </div>
        )}
        <h3 className="mt-6 text-sm font-semibold">Local queue</h3>
        {queue.length === 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">Empty. Nothing here is in the atlas.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {queue.map((item) => (
              <li key={item.id} className="rounded-md border border-border p-2">
                {item.proposedClaims[0]?.statement || "No claim text"} — not published
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
