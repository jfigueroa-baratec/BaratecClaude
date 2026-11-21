import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logos } from "../components/Logos";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 13) => spring({ frame: frame - d, fps, config: { damping, stiffness: 120 } });
  const logos = sp(8, 11);
  const title = sp(12);
  const dates = sp(18, 10);
  const cta = sp(28, 10);
  const url = sp(38);
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, frame - 45) / 5);
  const fade = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, bottom: SAFE.bottom, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center" }}>
        <div style={{ opacity: logos, transform: `scale(${0.8 + 0.2 * logos})` }}><Logos scale={0.95} /></div>

        <div>
          <div style={{ fontSize: 92, lineHeight: 1.08, textWrap: "balance", fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>
            {TEXTS.outro.title}
          </div>
          <div style={{ display: "inline-block", marginTop: 44, padding: "6px 40px", background: COLORS.yellow, fontSize: 124, lineHeight: 1.1, whiteSpace: "nowrap", fontWeight: FONT_WEIGHTS.black, color: COLORS.dark, opacity: dates, transform: `scale(${0.7 + 0.3 * dates})` }}>
            {TEXTS.outro.dates}
          </div>
        </div>

        <div>
          <div style={{ background: COLORS.yellow, color: COLORS.dark, fontSize: 64, fontWeight: FONT_WEIGHTS.bold, padding: "24px 56px", borderRadius: 8, opacity: cta, transform: `scale(${(0.7 + 0.3 * cta) * pulse})` }}>
            {TEXTS.outro.cta} →
          </div>
          <div style={{ marginTop: 28, fontSize: 48, fontWeight: FONT_WEIGHTS.light, color: COLORS.white, opacity: url }}>{TEXTS.outro.sub}</div>
          <div style={{ marginTop: 10, fontSize: 38, fontWeight: FONT_WEIGHTS.regular, color: "rgba(255,255,255,0.65)", opacity: url }}>{TEXTS.outro.url}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
