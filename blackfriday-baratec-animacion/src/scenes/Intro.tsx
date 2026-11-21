import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logos } from "../components/Logos";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 14) => spring({ frame: frame - d, fps, config: { damping, stiffness: 130 } });
  const logos = sp(4);
  const black = sp(10, 11);
  const friday = sp(22, 11);
  const dates = sp(34, 12);
  const store = sp(40);
  const bar = interpolate(frame, [26, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, bottom: SAFE.bottom, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ opacity: logos, transform: `translateY(${(1 - logos) * -40}px)` }}><Logos scale={0.95} /></div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 250, lineHeight: 0.95, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, letterSpacing: -4, opacity: black, transform: `translateY(${(1 - black) * 140}px) scale(${0.85 + 0.15 * black})` }}>
            {TEXTS.intro.black}
          </div>
          <div style={{ display: "inline-block", marginTop: 14, padding: "0 36px", background: COLORS.primary, fontSize: 250, lineHeight: 1.0, fontWeight: FONT_WEIGHTS.black, color: COLORS.white, letterSpacing: -4, opacity: friday, transform: `translateX(${(1 - friday) * 300}px)` }}>
            {TEXTS.intro.friday}
          </div>
          <div style={{ width: 640, height: 8, background: COLORS.white, margin: "44px auto 40px", transform: `scaleX(${bar})` }} />
          <div style={{ fontSize: 84, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, opacity: dates, transform: `scale(${0.8 + 0.2 * dates})` }}>
            {TEXTS.intro.dates}
          </div>
        </div>

        <div style={{ fontSize: 48, fontWeight: FONT_WEIGHTS.light, color: COLORS.white, opacity: store, transform: `translateY(${(1 - store) * 30}px)`, textAlign: "center" }}>
          {TEXTS.intro.store}
        </div>
      </div>
    </AbsoluteFill>
  );
};
