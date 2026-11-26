import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { KineticText } from "../components/KineticText";
import { SunBurst } from "../components/SunBurst";

/** Etiqueta vectorial "BLACK FRIDAY" que cae y se balancea desde el ojal. */
const Tag: React.FC<{ drop: number; swing: number }> = ({ drop, swing }) => (
  <svg width={500} height={760} viewBox="0 0 500 760" style={{ position: "absolute", left: 540 - 250, top: 420, overflow: "visible", transformOrigin: "250px 110px", transform: `translateY(${(1 - drop) * -1000}px) rotate(${swing}deg)` }}>
    <path d="M250 110 C 240 60, 215 30, 232 -30" fill="none" stroke={COLORS.ink} strokeWidth={5} strokeLinecap="round" />
    <path d="M110 40 L390 40 Q 440 40 440 90 L440 690 Q 440 740 390 740 L110 740 Q 60 740 60 690 L60 90 Q 60 40 110 40 Z" fill={COLORS.ink} />
    <circle cx={250} cy={110} r={34} fill={COLORS.white} />
    <circle cx={250} cy={110} r={34} fill="none" stroke={COLORS.grey} strokeWidth={10} />
    <rect x={110} y={250} width={280} height={6} fill={COLORS.white} />
    <text x={250} y={380} textAnchor="middle" fontSize={112} fontWeight={700} fill={COLORS.white} fontFamily="inherit">{TEXTS.tag.top}</text>
    <text x={250} y={490} textAnchor="middle" fontSize={112} fontWeight={700} fill={COLORS.white} fontFamily="inherit">{TEXTS.tag.bottom}</text>
    <rect x={110} y={530} width={280} height={6} fill={COLORS.white} />
    <text x={250} y={630} textAnchor="middle" fontSize={50} fontWeight={700} fill={COLORS.yellow} fontFamily="inherit">{TEXTS.tag.dates}</text>
  </svg>
);

export const Apertura: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - 2, fps, config: { damping: 13, stiffness: 120 } });
  const sun = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const drop = spring({ frame: frame - 6, fps, config: { damping: 9, stiffness: 90 } });
  const t = Math.max(0, frame - 10) / fps;
  const swing = 10 * Math.exp(-t * 0.9) * Math.cos(t * 5.5);
  const sub = spring({ frame: frame - 34, fps, config: { damping: 13, stiffness: 120 } });

  return (
    <AbsoluteFill>
      <Background />
      <SunBurst scale={sun} rot={frame * 0.6} cy={770} />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, display: "flex", justifyContent: "center", opacity: logo, transform: `translateY(${(1 - logo) * -40}px)` }}><Logo width={400} /></div>
      <Tag drop={drop} swing={swing} />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1190 }}>
        <KineticText text={TEXTS.apertura.word} delay={18} stagger={2} style={{ fontSize: 200, lineHeight: 1, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, letterSpacing: 4 }} />
        <div style={{ textAlign: "center", fontSize: 64, fontWeight: FONT_WEIGHTS.light, color: COLORS.ink, marginTop: 10, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)` }}>{TEXTS.apertura.sub}</div>
      </div>
    </AbsoluteFill>
  );
};
