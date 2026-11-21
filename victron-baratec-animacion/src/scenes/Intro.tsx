import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, TEXTS } from "../config";
import { Background } from "../components/Background";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 120 } });
  const logo1 = sp(8);
  const logo2 = sp(20);
  const line = interpolate(frame, [26, 44], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const text = sp(30);

  return (
    <AbsoluteFill>
      <Background footer={false} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 54 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 90 }}>
          <Img src={staticFile("logo-baratec.png")} style={{ width: 540, opacity: logo1, transform: `translateY(${(1 - logo1) * 50}px) scale(${0.9 + 0.1 * logo1})` }} />
          <div style={{ width: 4, height: 150, background: COLORS.primary, opacity: logo2, transform: `scaleY(${logo2})` }} />
          <Img src={staticFile("logo-victron.png")} style={{ width: 440, opacity: logo2, transform: `translateY(${(1 - logo2) * 50}px) scale(${0.9 + 0.1 * logo2})` }} />
        </div>
        <div style={{ width: 760, height: 6, background: COLORS.primary, transform: `scaleX(${line})`, transformOrigin: "center" }} />
        <div style={{ textAlign: "center", opacity: text, transform: `translateY(${(1 - text) * 30}px)` }}>
          <div style={{ fontSize: 34, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 8, textTransform: "uppercase", color: COLORS.primary }}>{TEXTS.intro.kicker}</div>
          <div style={{ fontSize: 96, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textDark, lineHeight: 1.1, marginTop: 8 }}>{TEXTS.intro.title}</div>
          <div style={{ fontSize: 44, fontWeight: FONT_WEIGHTS.light, color: COLORS.text }}>{TEXTS.intro.subtitle}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
