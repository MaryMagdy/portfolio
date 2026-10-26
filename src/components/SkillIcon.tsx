import { BarChart3, Boxes, Database, FileText, FlaskConical, Gauge, Languages, Layers, Network, Plug, Share2, Sparkles } from "lucide-react";
import type { Skill, GlyphKey } from "@/content";
import { brands } from "@/lib/brands";

const glyphs: Record<GlyphKey, typeof Database> = {
  database: Database,
  chart: BarChart3,
  share: Share2,
  plug: Plug,
  layers: Layers,
  network: Network,
  flask: FlaskConical,
  doc: FileText,
  boxes: Boxes,
  gauge: Gauge,
  sparkles: Sparkles,
  languages: Languages,
};

/** Brand colours that would vanish on the dark background render light instead. */
function visible(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const l = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l < 0.32 ? "#e2e8f0" : hex;
}

export function SkillIcon({ icon, size = 22 }: { icon: Skill["icon"]; size?: number }) {
  if ("brand" in icon) {
    const b = brands[icon.brand];
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill={visible(b.hex)}>
        <path d={b.path} />
      </svg>
    );
  }
  const G = glyphs[icon.glyph];
  return <G size={size} aria-hidden="true" color="#67e8f9" strokeWidth={1.8} />;
}
