"use client";

import { useEffect, useState } from "react";
import { VendorResearchPanel } from "@/components/vendor-research-panel";
import type { VendorMonitorView } from "@/lib/research/vendor-monitor";

export function ResearchPanelLive({ initial }: { initial: VendorMonitorView }) {
  const [view, setView] = useState(initial);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/research/status")
      .then(async (response) => {
        const body = (await response.json()) as VendorMonitorView & { error?: string };
        if (!response.ok) throw new Error(body.error ?? "Research status is unavailable.");
        return body;
      })
      .then((next) => {
        if (cancelled) return;
        if (next.vendorId === initial.vendorId && next.persistence !== "offline_fixture") setView(next);
      })
      .catch((error: Error) => {
        if (!cancelled) setNotice(error.message);
      });
    return () => {
      cancelled = true;
    };
  }, [initial.vendorId]);

  return (
    <>
      {notice ? <p className="mt-6 text-sm text-destructive">{notice}</p> : null}
      <VendorResearchPanel view={view} onReviewed={setView} />
    </>
  );
}
