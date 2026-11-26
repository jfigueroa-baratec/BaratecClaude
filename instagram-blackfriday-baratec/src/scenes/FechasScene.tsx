import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";

const Card: React.FC<{ day: string; month: string; p: number }> = ({ day, month, p }) => (
  <div style={{ width: 350, background: COLORS.white, border: `2px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.12)", opacity: p, transform: `translateY(${(1 - p) * 140}px) scale(${0.85 + 0.15 * p})` }}>
    <div style={{ background: COLORS.primary, color: COLORS.white, fontSize: 56, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 8, padding: "14px 0" }}>{month}</div>
    <div style={{ color: COLORS.ink, fontSize: 230, lineHeight: 1.0, fontWeight: FONT_WEIGHTS.black, padding: "10px 0 24px" }}>{day}</div>
  </div>
);

export const FechasScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 12) => spring({ frame: frame - d, fps, config: { damping, stiffness: 120 } });
  const T = TEXTS.fechas;
  const kick = sp(4);
  const c1 = sp(10, 11);
  const c2 = sp(28, 11);
  const arrow = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chip = sp(50, 11);
  const sub = sp(62);

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, bottom: SAFE.bottom, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: FONT_WEIGHTS.black, letterSpacing: 12, textTransform: "uppercase", color: COLORS.primary, opacity: kick, transform: `translateY(${(1 - kick) * -30}px)` }}>{T.kicker}</div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <Card day={T.from.day} month={T.from.month} p={c1} />
          <div style={{ fontSize: 80, color: COLORS.ink, fontWeight: FONT_WEIGHTS.bold, opacity: arrow, transform: `scaleX(${arrow})` }}>→</div>
          <Card day={T.to.day} month={T.to.month} p={c2} />
        </div>

        <div>
          <div style={{ display: "inline-block", background: COLORS.yellow, color: COLORS.ink, fontSize: 100, lineHeight: 1.08, fontWeight: FONT_WEIGHTS.black, textTransform: "uppercase", padding: "18px 48px", opacity: chip, transform: `scale(${0.7 + 0.3 * chip})` }}>
            {T.chip.map((l) => <div key={l}>{l}</div>)}
          </div>
          <Img src={staticFile("logo-mercadolibre.png")} style={{ marginTop: 30, width: 400, height: "auto", opacity: sub, transform: `translateY(${(1 - sub) * 30}px) scale(${0.85 + 0.15 * sub})` }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
