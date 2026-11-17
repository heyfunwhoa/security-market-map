"use client";

import { useState } from "react";
import { pillLabel, StatusPill } from "@/components/chrome";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { evidenceBasis } from "@/lib/claim-basis";
import type { Claim } from "@/lib/schema";

/** One compact badge for how a claim was checked. Hover, focus, or tap for the explanation. */
export function SourceBadge({ claim }: { claim: Pick<Claim, "verificationStatus" | "sourceType"> }) {
  const [open, setOpen] = useState(false);
  const basis = evidenceBasis(claim);
  return (
    <TooltipProvider>
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={`${pillLabel(claim.verificationStatus)}, ${pillLabel(claim.sourceType)}. ${basis}`}
          className="inline-flex min-h-6 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <StatusPill status={claim.verificationStatus} />
        </button>
      </TooltipTrigger>
      <TooltipContent className="block max-w-xs text-left leading-5">
        <span className="block font-semibold">Source: {pillLabel(claim.sourceType)}</span>
        <span className="mt-1 block">{basis}</span>
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );
}
