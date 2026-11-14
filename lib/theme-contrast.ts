/**
 * WCAG 2.x contrast for the design tokens in app/globals.css.
 * oklch → OKLab → linear sRGB (Björn Ottosson's matrices), gamut-clipped, then relative luminance.
 */

export type Tokens = Record<string, string>;

export function parseTokenBlock(css: string, selector: string): Tokens {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`No token block for ${selector}`);
  const body = css.slice(start, css.indexOf("}", start));
  const tokens: Tokens = {};
  for (const match of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) tokens[match[1]] = match[2].trim();
  return tokens;
}

export function oklchToLinearRgb(value: string): [number, number, number] {
  // Accepts authored (`oklch(0.93 0.012 85)`) and minified (`oklch(93% .012 85)`) forms.
  const match = value.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)(%?)\s+([\d.]+)(?:deg)?\s*\)/);
  if (!match) throw new Error(`Not an opaque oklch() colour: ${value}`);
  const l = Number(match[1]) / (match[2] ? 100 : 1);
  const c = match[4] ? (Number(match[3]) / 100) * 0.4 : Number(match[3]);
  const h = Number(match[5]);
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const clip = (v: number) => Math.min(1, Math.max(0, v));
  return [
    clip(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    clip(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    clip(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ];
}

export function relativeLuminance(value: string): number {
  const [r, g, b] = oklchToLinearRgb(value);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(foreground: string, background: string): number {
  const [hi, lo] = [relativeLuminance(foreground), relativeLuminance(background)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Text pairs the UI actually renders, with their WCAG AA minimum. */
export const TEXT_PAIRS: { fg: string; bg: string; min: number; use: string }[] = [
  { fg: "foreground", bg: "background", min: 4.5, use: "body text" },
  { fg: "card-foreground", bg: "card", min: 4.5, use: "card text" },
  { fg: "popover-foreground", bg: "popover", min: 4.5, use: "menus and dialogs" },
  { fg: "muted-foreground", bg: "background", min: 4.5, use: "secondary text on page" },
  { fg: "muted-foreground", bg: "card", min: 4.5, use: "secondary text on cards" },
  { fg: "muted-foreground", bg: "muted", min: 4.5, use: "secondary text on muted fills" },
  { fg: "primary", bg: "background", min: 4.5, use: "links and kickers on page" },
  { fg: "primary", bg: "card", min: 4.5, use: "links on cards" },
  { fg: "primary-foreground", bg: "primary", min: 4.5, use: "primary buttons and selected filters" },
  { fg: "secondary-foreground", bg: "secondary", min: 4.5, use: "secondary buttons" },
  { fg: "accent-foreground", bg: "accent", min: 4.5, use: "accent surfaces" },
  { fg: "foreground", bg: "muted", min: 4.5, use: "active nav item" },
  { fg: "destructive", bg: "background", min: 4.5, use: "error text" },
  { fg: "input", bg: "background", min: 3, use: "form control borders (WCAG 1.4.11)" },
  { fg: "ring", bg: "background", min: 3, use: "focus ring (WCAG 1.4.11)" },
];

