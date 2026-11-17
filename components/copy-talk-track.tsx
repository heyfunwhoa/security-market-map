"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyTalkTrack({
  text,
  label = "Copy with source",
  accessibleLabel,
  copiedMessage = "Copied, including the source.",
}: {
  text: string;
  label?: string;
  /** Distinct name when several copy buttons share a page, e.g. one per feed card. */
  accessibleLabel?: string;
  copiedMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="button" variant="outline" size="sm" onClick={copy} aria-label={accessibleLabel}>
        {status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {label}
      </Button>
      <span role="status" className="text-sm text-muted-foreground">
        {status === "copied" ? copiedMessage : status === "failed" ? "Copy failed. Select the text instead." : ""}
      </span>
    </div>
  );
}
