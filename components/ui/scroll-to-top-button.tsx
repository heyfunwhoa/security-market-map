"use client";

// Adapted from Mischief UI (MIT), revision 92c335bf6910007b95e282a6e0a1168555b86cf1.
// Copyright (c) 2026 Tinkerers Labs. See licenses/mischief-ui-MIT.txt.
import { useEffect, useState } from "react";
import { ArrowUpToLine } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTopButton({ targetId }: { targetId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > 320);
    }
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  function returnToTop() {
    const target = document.getElementById(targetId);
    // Move focus before scrolling hides the control, preserving keyboard position.
    target?.focus({ preventScroll: true });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Back to page introduction"
      title="Back to page introduction"
      aria-hidden={!visible || undefined}
      tabIndex={visible ? 0 : -1}
      onClick={returnToTop}
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-12 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-lg transition-opacity hover:bg-primary/90 motion-reduce:transition-none",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUpToLine className="size-5" aria-hidden="true" />
    </button>
  );
}

