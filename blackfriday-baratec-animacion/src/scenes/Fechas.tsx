import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";

const Card: React.FC<{ day: string; month: string; p: number }> = ({ day, month, p }) => (
  <div style={{ width: 350, background: COLORS.white, borderRadius: 10, overflow: "hidden", textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 120}px) scale(${0.85 + 0.15 * p})` }}>
    <div style={{ background: COLORS.primary, color: COLORS.white, fontSize: 56, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 8, padding: "14px 0" }}>{month}</div>
    <div style={{ color: COLORS.darkAlt, fontSize: 230, lineHeight: 1.0, fontWeight: FONT_WEIGHTS.black, padding: "10px 0 24px" }}>{day}</div>
  </div>
);

export const Fechas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 13) => spring({ frame: frame - d, fps, config: { damping, stiffness: 130 } });
  const T = TEXTS.fechas;
  const title = sp(8);
  const c1 = sp(16, 11);
  const c2 = sp(44, 11);
  const arrow = interpolate(frame, [30, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nine = sp(100, 10);
  const store = sp(112);

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, bottom: SAFE.bottom, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontSize: 100, lineHeight: 1.05, textWrap: "balance", fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>{T.title}</div>

        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <Card day={T.from.day} month={T.from.month} p={c1} />
            <div style={{ fontSize: 70, color: COLORS.white, fontWeight: FONT_WEIGHTS.bold, opacity: arrow, transform: `scaleX(${arrow})` }}>→</div>
            <Card day={T.to.day} month={T.to.month} p={c2} />
          </div>
          {/* un punto por día, se van encendiendo */}
          <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 56 }}>
            {Array.from({ length: T.days }).map((_, i) => {
              const on = spring({ frame: frame - (48 + i * 3), fps, config: { damping: 9, stiffness: 200 } });
              return <div key={i} style={{ width: 60, height: 60, borderRadius: 30, background: on > 0.05 ? COLORS.primary : "rgba(255,255,255,0.18)", transform: `scale(${0.7 + 0.3 * Math.min(1.25, on)})` }} />;
            })}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 150, lineHeight: 1, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, opacity: nine, transform: `scale(${0.6 + 0.4 * nine})` }}>
            {T.days} <span style={{ fontSize: 64, fontWeight: FONT_WEIGHTS.bold }}>{T.daysLabel}</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 48, fontWeight: FONT_WEIGHTS.light, color: COLORS.white, opacity: store, transform: `translateY(${(1 - store) * 30}px)` }}>{T.store}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
