import { Fragment } from "react";
import { Term } from "@/components/term";
import { splitTerms } from "@/lib/terms";

/** Plain text with the first page-level use of NHI, ITDR, CIEM, and IGA given a hover definition. */
export function AnnotatedText({ text, seen }: { text: string; seen: Set<string> }) {
  return (
    <>
      {splitTerms(text, seen).map((part, index) =>
        typeof part === "string" ? <Fragment key={index}>{part}</Fragment> : <Term key={index} definition={part} />,
      )}
    </>
  );
}
