import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { KineticText } from "../components/KineticText";

export const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 15) => spring({ frame: frame - d, fps, config: { damping, stiffness: 75 } });
  const T = TEXTS.cierre;
  const logo = sp(14);
  const title = sp(20);
  const bar = interpolate(frame, [38, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cta = sp(38, 12);
  const url = sp(52);
  const pulse = 1 + 0.02 * Math.sin(Math.max(0, frame - 60) / 7);
  const fade = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const ring = (off: number) => { const t = ((frame - 46 - off) % 60) / 60; return t < 0 ? 0 : t; };

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, display: "flex", justifyContent: "center", alignItems: "center", gap: 36, opacity: logo, transform: `scale(${0.85 + 0.15 * logo})` }}>
        <Logo width={360} />
        <div style={{ width: 3, height: 70, background: COLORS.border }} />
        <div style={{ border: `2px solid ${COLORS.border}`, borderRadius: 10, padding: "12px 20px", background: COLORS.white }}>
          <Img src={staticFile("logo-victron.png")} style={{ width: 200, display: "block" }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 540, textAlign: "center" }}>
        <div style={{ fontSize: 92, lineHeight: 1.05, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>{T.title}</div>
        <div style={{ position: "relative", display: "inline-block", marginTop: 18 }}>
          <div style={{ position: "absolute", left: -20, right: -20, bottom: 10, height: 54, background: COLORS.yellow, transformOrigin: "left", transform: `scaleX(${bar})` }} />
          <KineticText text={T.brand} delay={28} stagger={3} style={{ position: "relative", fontSize: 132, lineHeight: 1.05, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink, whiteSpace: "nowrap" }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: 540 - 400, width: 800, top: 940, height: 150 }}>
        {[0, 30].map((o) => { const t = ring(o); return <div key={o} style={{ position: "absolute", inset: 0, borderRadius: 16, border: `6px solid ${COLORS.ink}`, opacity: (1 - t) * 0.6, transform: `scale(${1 + t * 0.3})` }} />; })}
        <div style={{ position: "absolute", inset: 0, background: COLORS.yellow, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.ink, fontSize: 56, fontWeight: FONT_WEIGHTS.bold, whiteSpace: "nowrap", opacity: cta, transform: `scale(${(0.8 + 0.2 * cta) * pulse})` }}>{T.cta} →</div>
      </div>
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1150, textAlign: "center", fontSize: 42, fontWeight: FONT_WEIGHTS.regular, color: COLORS.grey, opacity: url }}>{T.url}</div>

      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1270, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
        {T.chips.map((c, i) => { const p = sp(60 + i * 6, 14); return <div key={c} style={{ border: `4px solid ${COLORS.ink}`, color: COLORS.ink, fontSize: 40, fontWeight: FONT_WEIGHTS.bold, padding: "8px 26px", borderRadius: 40, opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>{c}</div>; })}
      </div>
    </AbsoluteFill>
  );
};
