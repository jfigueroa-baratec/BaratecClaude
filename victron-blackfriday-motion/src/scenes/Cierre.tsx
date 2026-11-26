import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { KineticText } from "../components/KineticText";
import { SunBurst } from "../components/SunBurst";

export const Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 12) => spring({ frame: frame - d, fps, config: { damping, stiffness: 120 } });
  const T = TEXTS.cierre;
  const sun = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const logo = sp(8, 11);
  const title = sp(14);
  const cta = sp(30, 10);
  const url = sp(42);
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, frame - 46) / 5);
  const fade = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  // anillos que se expanden desde el botón (efecto "señal")
  const ring = (off: number) => { const t = ((frame - 34 - off) % 40) / 40; return t < 0 ? 0 : t; };

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Background />
      <SunBurst scale={sun} rot={frame * 0.5} cy={760} opacity={0.28} core={false} />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, display: "flex", justifyContent: "center", alignItems: "center", gap: 36, opacity: logo, transform: `scale(${0.8 + 0.2 * logo})` }}>
        <Logo width={360} />
        <div style={{ width: 3, height: 70, background: COLORS.border }} />
        <div style={{ border: `2px solid ${COLORS.border}`, borderRadius: 10, padding: "12px 20px", background: COLORS.white }}>
          <Img src={staticFile("logo-victron.png")} style={{ width: 200, display: "block" }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 520, textAlign: "center" }}>
        <div style={{ fontSize: 92, lineHeight: 1.05, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>{T.title}</div>
        <KineticText text={T.brand} delay={20} stagger={2} style={{ marginTop: 12, fontSize: 132, lineHeight: 1.05, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, whiteSpace: "nowrap" }} />
      </div>

      {/* botón con ondas */}
      <div style={{ position: "absolute", left: 540 - 400, width: 800, top: 1000, height: 150 }}>
        {[0, 20].map((o) => {
          const t = ring(o);
          return <div key={o} style={{ position: "absolute", inset: 0, borderRadius: 16, border: `6px solid ${COLORS.yellow}`, opacity: (1 - t) * 0.9, transform: `scale(${1 + t * 0.35})` }} />;
        })}
        <div style={{ position: "absolute", inset: 0, background: COLORS.yellow, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.ink, fontSize: 56, fontWeight: FONT_WEIGHTS.bold, whiteSpace: "nowrap", opacity: cta, transform: `scale(${(0.7 + 0.3 * cta) * pulse})` }}>{T.cta} →</div>
      </div>
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1330, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
        {TEXTS.cierre.chips.map((t, i) => {
          const p = sp(50 + i * 5, 12);
          return <div key={t} style={{ background: COLORS.primary, color: COLORS.white, fontSize: 40, fontWeight: FONT_WEIGHTS.bold, padding: "10px 26px", borderRadius: 40, opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>{t}</div>;
        })}
      </div>
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1220, textAlign: "center", fontSize: 42, fontWeight: FONT_WEIGHTS.regular, color: COLORS.grey, opacity: url }}>{T.url}</div>
    </AbsoluteFill>
  );
};
