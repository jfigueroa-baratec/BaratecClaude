import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { KineticText } from "../components/KineticText";

/** Etiqueta vectorial "BLACK FRIDAY" que cae y se balancea desde el ojal. */
const Tag: React.FC<{ drop: number; swing: number }> = ({ drop, swing }) => (
  <svg width={410} height={623} viewBox="0 0 500 760" style={{ position: "absolute", left: 540 - 205, top: 395, overflow: "visible", transformOrigin: "50% 14.5%", transform: `translateY(${(1 - drop) * -900}px) rotate(${swing}deg)` }}>
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
  const logo = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 70 } });
  const drop = spring({ frame: frame - 8, fps, config: { damping: 11, stiffness: 55 } });
  const t = Math.max(0, frame - 14) / fps;
  const swing = 9 * Math.exp(-t * 0.7) * Math.cos(t * 4.2);
  const date = spring({ frame: frame - 34, fps, config: { damping: 16, stiffness: 70 } });
  const bar = interpolate(frame, [38, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const store = spring({ frame: frame - 46, fps, config: { damping: 16, stiffness: 70 } });

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, display: "flex", justifyContent: "center", opacity: logo, transform: `translateY(${(1 - logo) * -40}px)` }}><Logo width={400} /></div>
      <Tag drop={drop} swing={swing} />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: 1040, textAlign: "center" }}>
        <KineticText text={TEXTS.apertura.word} delay={20} stagger={3} style={{ fontSize: 176, lineHeight: 1, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink, letterSpacing: 4 }} />
        <div style={{ position: "relative", display: "inline-block", marginTop: 26, opacity: date, transform: `translateY(${(1 - date) * 30}px)` }}>
          <div style={{ position: "absolute", left: -18, right: -18, bottom: 6, height: 40, background: COLORS.yellow, transformOrigin: "left", transform: `scaleX(${bar})` }} />
          <div style={{ position: "relative", fontSize: 88, lineHeight: 1.1, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink }}>{TEXTS.apertura.dates}</div>
        </div>
        <div style={{ marginTop: 16, fontSize: 58, fontWeight: FONT_WEIGHTS.light, color: COLORS.ink, opacity: store, transform: `translateY(${(1 - store) * 24}px)` }}>{TEXTS.apertura.store}</div>
      </div>
    </AbsoluteFill>
  );
};
