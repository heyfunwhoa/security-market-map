"use client";

import { useEffect } from "react";

/** Opens folded sections while printing so sources print too, then restores them. */
export function PrintPrep() {
  useEffect(() => {
    const opened: HTMLDetailsElement[] = [];
    function before() {
      document.querySelectorAll("details:not([open])").forEach((el) => {
        (el as HTMLDetailsElement).open = true;
        opened.push(el as HTMLDetailsElement);
      });
    }
    function after() {
      opened.splice(0).forEach((el) => { el.open = false; });
    }
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);
  return null;
}
