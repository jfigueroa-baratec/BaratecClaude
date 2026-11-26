import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS, TIMELINE } from "../config";
import { Background } from "../components/Background";
import { IconInversor, IconMppt, IconMonitor } from "../components/Icons";

const ICONS = [IconInversor, IconMppt, IconMonitor];
const ICON_SCALE = [1.2, 1.1, 1.0];

const Item: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = TIMELINE.lineaFrames;
  const f = frame - index * L;
  const last = index === TEXTS.lineas.length - 1;
  if (f < -2 || f > L + 2) return null;
  const sp = (d: number, damping = 16) => spring({ frame: f - d, fps, config: { damping, stiffness: 95 } });
  const enter = sp(0);
  const exit = last ? 0 : interpolate(f, [L - 10, L], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => x * x });
  const x = (1 - enter) * 1100 - exit * 1100;
  const circle = sp(2, 14);
  const iconT = interpolate(f, [6, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const title = sp(8);
  const sub = sp(14);
  const spin = f * 0.5;
  const Icon = ICONS[index];
  const it = TEXTS.lineas[index];

  return (
    <AbsoluteFill style={{ transform: `translateX(${x}px)` }}>
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, textAlign: "center", fontSize: 44, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 12, textTransform: "uppercase", color: COLORS.ink }}>{TEXTS.label}</div>

      <div style={{ position: "absolute", left: 540 - 320, top: 410, width: 640, height: 640, transform: `scale(${circle})` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 320, background: COLORS.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: `scale(${ICON_SCALE[index]})` }}><Icon t={iconT} /></div>
        </div>
        <svg width={700} height={700} viewBox="-350 -350 700 700" style={{ position: "absolute", left: -30, top: -30 }}>
          <circle r={338} fill="none" stroke={COLORS.blue} strokeWidth={3} strokeDasharray="4 22" strokeLinecap="round" transform={`rotate(${spin})`} />
        </svg>
      </div>

      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1110, textAlign: "center" }}>
        <div style={{ fontSize: 104, lineHeight: 1.0, fontWeight: FONT_WEIGHTS.bold, textTransform: "uppercase", color: COLORS.ink, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>
          {it.title.map((l) => <div key={l}>{l}</div>)}
        </div>
        <div style={{ display: "inline-block", marginTop: 30, background: COLORS.blue, color: COLORS.white, fontSize: 54, fontWeight: FONT_WEIGHTS.bold, padding: "8px 30px", opacity: sub, transform: `translateX(${(1 - sub) * 100}px)` }}>{it.sub}</div>
      </div>
    </AbsoluteFill>
  );
};

export const Lineas: React.FC = () => (
  <AbsoluteFill>
    <Background />
    {TEXTS.lineas.map((_, i) => <Item key={i} index={i} />)}
  </AbsoluteFill>
);
