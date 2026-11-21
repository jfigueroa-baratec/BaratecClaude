import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, TEXTS } from "../config";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (delay: number, damping = 14) => spring({ frame: frame - delay, fps, config: { damping, stiffness: 110 } });
  const logo = sp(10, 11);
  const title = sp(14);
  const sub = sp(22);
  const cta = sp(28, 10);
  const url = sp(36);
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, frame - 45) / 5);
  const fade = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark, opacity: fade }}>
      <div style={{ position: "absolute", right: -260, top: -260, width: 900, height: 900, borderRadius: 450, border: `70px solid rgba(0,101,177,0.35)` }} />
      <div style={{ position: "absolute", left: -200, bottom: -380, width: 800, height: 800, borderRadius: 400, border: `60px solid rgba(0,101,177,0.35)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22, background: COLORS.primary }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 60, opacity: logo, transform: `scale(${0.8 + 0.2 * logo})` }}>
          <Img src={staticFile("logo-baratec-inverse.png")} style={{ width: 520 }} />
          <div style={{ width: 3, height: 90, background: "rgba(255,255,255,0.6)" }} />
          <div style={{ background: COLORS.white, borderRadius: 8, padding: "18px 30px" }}>
            <Img src={staticFile("logo-victron.png")} style={{ width: 380, display: "block" }} />
          </div>
        </div>
        <div style={{ marginTop: 70, fontSize: 112, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, lineHeight: 1.05, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>
          {TEXTS.outro.title}
        </div>
        <div style={{ marginTop: 16, fontSize: 46, fontWeight: FONT_WEIGHTS.light, color: COLORS.white, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)` }}>
          {TEXTS.outro.subtitle}
        </div>
        <div style={{ marginTop: 50, background: COLORS.primary, color: COLORS.white, fontSize: 54, fontWeight: FONT_WEIGHTS.bold, padding: "20px 64px", borderRadius: 6, opacity: cta, transform: `scale(${(0.7 + 0.3 * cta) * pulse})` }}>
          {TEXTS.outro.cta} →
        </div>
        <div style={{ marginTop: 36, fontSize: 48, fontWeight: FONT_WEIGHTS.regular, color: COLORS.white, letterSpacing: 2, opacity: url }}>
          {TEXTS.outro.url}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
