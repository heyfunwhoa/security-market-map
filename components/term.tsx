"use client";

import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TermDefinition } from "@/lib/terms";

/** An acronym with its definition on hover, focus, or tap. */
export function Term({ definition }: { definition: TermDefinition }) {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="cursor-help rounded-sm underline decoration-dotted underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {definition.term}
        </button>
      </TooltipTrigger>
      <TooltipContent className="block max-w-xs text-left leading-5">
        <span className="block font-semibold">{definition.title}</span>
        <span className="mt-1 block">{definition.definition}</span>
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );
}
