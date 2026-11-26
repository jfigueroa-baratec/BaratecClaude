import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";

const ROW = 430; // alto de cada número en el "odómetro"

export const Fechas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = TEXTS.fechas;
  const sp = (d: number, damping = 13) => spring({ frame: frame - d, fps, config: { damping, stiffness: 120 } });
  const kick = sp(2);
  const block = sp(4, 14);
  const roll = interpolate(frame, [6, 32], [0, T.days.length - 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.65, 0, 0.25, 1) });
  const monthIdx = roll >= T.monthChangeAt - 0.15 ? 1 : 0;
  const dates = sp(22);
  const chip = sp(28, 11);
  const rot = frame * 3;

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 12, textTransform: "uppercase", color: COLORS.primary, opacity: kick, transform: `translateY(${(1 - kick) * -30}px)` }}>{T.kicker}</div>

        {/* bloque azul con el odómetro de días */}
        <div style={{ position: "relative", marginTop: 40, height: 650, background: COLORS.primary, borderRadius: 28, overflow: "hidden", opacity: block, transform: `translateY(${(1 - block) * 160}px) scale(${0.9 + 0.1 * block})` }}>
          <svg width={200} height={200} viewBox="-100 -100 200 200" style={{ position: "absolute", right: -30, top: -30, opacity: 0.9 }}>
            <g transform={`rotate(${rot})`}>
              <circle r={36} fill={COLORS.yellow} />
              {Array.from({ length: 10 }).map((_, i) => <line key={i} x1={0} y1={-54} x2={0} y2={-84} stroke={COLORS.yellow} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}
            </g>
          </svg>
          <div style={{ position: "absolute", left: 0, right: 0, top: 36, height: ROW, overflow: "hidden" }}>
            <div style={{ transform: `translateY(${-roll * ROW}px)` }}>
              {T.days.map((d) => (
                <div key={d} style={{ height: ROW, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 400, lineHeight: 1, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white }}>{d}</div>
              ))}
            </div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 36, height: 110, overflow: "hidden" }}>
            <div style={{ transform: `translateY(${-monthIdx * 110}px)`, transition: "none" }}>
              {T.months.map((m) => (
                <div key={m} style={{ height: 110, fontSize: 100, lineHeight: "110px", fontWeight: FONT_WEIGHTS.bold, letterSpacing: 18, color: COLORS.yellow }}>{m}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 44, fontSize: 80, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink, opacity: dates, transform: `translateY(${(1 - dates) * 30}px)` }}>{T.dates}</div>
        <div style={{ display: "inline-block", marginTop: 36, background: COLORS.yellow, color: COLORS.ink, fontSize: 84, lineHeight: 1.08, fontWeight: FONT_WEIGHTS.bold, textTransform: "uppercase", padding: "16px 44px", opacity: chip, transform: `scale(${0.7 + 0.3 * chip})` }}>
          {T.chip.map((l) => <div key={l}>{l}</div>)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
