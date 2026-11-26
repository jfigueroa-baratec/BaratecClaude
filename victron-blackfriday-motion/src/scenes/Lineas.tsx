import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS, TIMELINE } from "../config";
import { Background } from "../components/Background";
import { IconInversor, IconMppt, IconMonitor } from "../components/Icons";

const ICONS = [IconInversor, IconMppt, IconMonitor];

const Item: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = TIMELINE.lineaFrames;
  const f = frame - index * L;
  const last = index === TEXTS.lineas.length - 1;
  if (f < -2 || f > L + 2) return null;
  const sp = (d: number, damping = 13) => spring({ frame: f - d, fps, config: { damping, stiffness: 120 } });
  const enter = sp(0, 15);
  const exit = last ? 0 : interpolate(f, [L - 7, L], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => x * x });
  const x = (1 - enter) * 1100 - exit * 1100;
  const circle = sp(2, 11);
  const iconT = interpolate(f, [8, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const title = sp(10);
  const sub = sp(16);
  const Icon = ICONS[index];
  const it = TEXTS.lineas[index];

  return (
    <AbsoluteFill style={{ transform: `translateX(${x}px)` }}>
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 56, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 10, color: COLORS.primary }}>{`0${index + 1}`}<span style={{ color: COLORS.grey, fontWeight: FONT_WEIGHTS.light }}>{` / 0${TEXTS.lineas.length}`}</span></div>
        <div style={{ fontSize: 40, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 8, textTransform: "uppercase", color: COLORS.ink }}>Victron Energy</div>
      </div>

      {/* círculo azul con el pictograma animado */}
      <div style={{ position: "absolute", left: 540 - 330, top: 400, width: 660, height: 660, borderRadius: 330, background: COLORS.primary, transform: `scale(${circle})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: -24, borderRadius: 354, border: `10px solid ${COLORS.yellow}`, opacity: 0.9 }} />
        <div style={{ transform: `scale(${[1.22, 1.1, 1.0][index]})` }}><Icon t={iconT} /></div>
      </div>

      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1130, textAlign: "center" }}>
        <div style={{ fontSize: 104, lineHeight: 1.0, fontWeight: FONT_WEIGHTS.bold, textTransform: "uppercase", color: COLORS.ink, opacity: title, transform: `translateY(${(1 - title) * 60}px)` }}>
          {it.title.map((l) => <div key={l}>{l}</div>)}
        </div>
        <div style={{ display: "inline-block", marginTop: 28, background: COLORS.yellow, color: COLORS.ink, fontSize: 52, fontWeight: FONT_WEIGHTS.bold, padding: "8px 30px", opacity: sub, transform: `translateX(${(1 - sub) * 120}px)` }}>{it.sub}</div>
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
