import type { Domain } from "./schema";
import { domainStatusLabel } from "./domain-evidence";
import { formatDate } from "./format";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Wrap text to lines of at most `max` characters, at word boundaries. */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * A one-page, printable SVG of the domain map. Every tile is the same size; color marks the
 * evidenced domain only. All numbers come from the catalog.
 */
export function domainMapSvg({
  domains,
  claimCounts,
  totalClaims,
  asOf,
}: {
  domains: Domain[];
  claimCounts: Record<string, number>;
  totalClaims: number;
  asOf: string;
}): string {
  const width = 1200;
  const columns = 3;
  const gap = 20;
  const margin = 48;
  const tileWidth = (width - margin * 2 - gap * (columns - 1)) / columns;
  const tileHeight = 132;
  const top = 168;
  const rows = Math.ceil(domains.length / columns);
  const height = top + rows * (tileHeight + gap) + 72;

  const tiles = domains
    .map((domain, index) => {
      const x = margin + (index % columns) * (tileWidth + gap);
      const y = top + Math.floor(index / columns) * (tileHeight + gap);
      const evidenced = domain.depth === "evidenced";
      const count = claimCounts[domain.id] ?? 0;
      const nameLines = wrap(domain.name, 30);
      const name = nameLines
        .map((line, i) => `<tspan x="${x + 20}" dy="${i === 0 ? 0 : 26}">${escape(line)}</tspan>`)
        .join("");
      const detailY = y + 52 + (nameLines.length - 1) * 26 + 28;
      return [
        `<rect x="${x}" y="${y}" width="${tileWidth}" height="${tileHeight}" rx="14" fill="${evidenced ? "#e6f2ec" : "#ffffff"}" stroke="${evidenced ? "#1f5f4a" : "#d9d2c7"}" stroke-width="2"/>`,
        `<text x="${x + 20}" y="${y + 40}" font-size="22" font-weight="700" fill="#1f1b16">${name}</text>`,
        `<text x="${x + 20}" y="${detailY}" font-size="16" fill="#5b544b">${escape(domainStatusLabel(domain.depth))}</text>`,
        `<text x="${x + 20}" y="${detailY + 24}" font-size="16" fill="#5b544b">${count} ${count === 1 ? "claim" : "claims"}${evidenced ? "" : " so far"} · ${domain.categoryIds.length} categories</text>`,
      ].join("");
    })
    .join("\n  ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc" font-family="'Source Sans 3', 'Helvetica Neue', Arial, sans-serif">
  <title id="title">Security Market Map: identity and secrets, mapped with evidence</title>
  <desc id="desc">${domains.length} security domains with their evidence status and claim counts, as of ${escape(formatDate(asOf))}.</desc>
  <rect width="100%" height="100%" fill="#faf7f2"/>
  <text x="${margin}" y="64" font-size="18" font-weight="700" letter-spacing="3" fill="#1f5f4a">SECURITY MARKET MAP</text>
  <text x="${margin}" y="112" font-size="40" font-weight="700" fill="#1f1b16">Identity and secrets, mapped with evidence.</text>
  <text x="${margin}" y="144" font-size="18" fill="#5b544b">${domains.length} domains · ${totalClaims} cited claims · as of ${escape(formatDate(asOf))}</text>
  ${tiles}
  <text x="${margin}" y="${height - 32}" font-size="15" fill="#5b544b">Equal tile size. Not a ranking. Unknown stays Unknown. security-market-map.vercel.app/methodology</text>
</svg>
`;
}
