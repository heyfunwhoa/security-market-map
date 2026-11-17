import { ImageResponse } from "next/og";
import { catalog } from "@/lib/catalog";
import { domainClaimCounts } from "@/lib/domain-evidence";
import { formatDate } from "@/lib/format";

export const alt = "Security Market Map: identity and secrets, mapped with evidence. Eleven security domains with claim counts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Colors match the light theme tokens closely enough for a share card. */
const INK = "#1f1b16";
const MUTED = "#5b544b";
const PAPER = "#faf7f2";
const ACCENT = "#1f5f4a";

export default function Image() {
  const counts = domainClaimCounts(catalog);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: PAPER, color: INK, padding: 64 }}>
        <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: ACCENT, fontWeight: 700 }}>
          Security Market Map
        </div>
        <div style={{ marginTop: 20, fontSize: 64, lineHeight: 1.1, fontWeight: 700, maxWidth: 900 }}>
          Identity and secrets, mapped with evidence.
        </div>
        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
          {catalog.domains.map((domain) => (
            <div
              key={domain.id}
              style={{
                display: "flex",
                flexDirection: "column",
                width: 252,
                padding: "12px 16px",
                borderRadius: 12,
                border: `2px solid ${domain.depth === "evidenced" ? ACCENT : "#d9d2c7"}`,
                background: domain.depth === "evidenced" ? "#e6f2ec" : "#ffffff",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700 }}>{domain.name}</div>
              <div style={{ fontSize: 16, color: MUTED, marginTop: 4 }}>{`${counts[domain.id]} claims`}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontSize: 20, color: MUTED }}>
          {`${catalog.claims.length} cited claims · as of ${formatDate(catalog.asOf)}`}
        </div>
      </div>
    ),
    size,
  );
}
