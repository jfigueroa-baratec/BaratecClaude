import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, TEXTS } from "../config";
import { Background } from "../components/Background";
import { InversorVisual, MpptVisual, MonitorVisual } from "../components/Visuals";

export const ProductScene: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = TEXTS.products[index];
  const sp = (delay: number, damping = 16) => spring({ frame: frame - delay, fps, config: { damping, stiffness: 110 } });
  const card = sp(8, 13);
  const kick = sp(10);
  const title = sp(14);
  const body = sp(22);
  const bar = interpolate(frame, [14, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const Visual = [InversorVisual, MpptVisual, MonitorVisual][index];

  return (
    <AbsoluteFill>
      <Background />
      {/* encabezado como la web: logo a la izquierda */}
      <Img src={staticFile("logo-baratec.png")} style={{ position: "absolute", left: 120, top: 64, width: 280 }} />
      <div style={{ position: "absolute", right: 120, top: 70, fontSize: 30, fontWeight: FONT_WEIGHTS.bold, color: COLORS.grey, letterSpacing: 4 }}>
        {`0${index + 1} / 0${TEXTS.products.length}`}
      </div>

      {/* columna de texto */}
      <div style={{ position: "absolute", left: 120, top: 270, width: 800 }}>
        <div style={{ fontSize: 32, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 6, textTransform: "uppercase", color: COLORS.primary, opacity: kick, transform: `translateX(${(1 - kick) * -40}px)` }}>
          {p.kicker}
        </div>
        <div style={{ width: 150, height: 8, background: COLORS.primary, margin: "18px 0 26px", transform: `scaleX(${bar})`, transformOrigin: "left" }} />
        <div style={{ fontSize: 104, fontWeight: FONT_WEIGHTS.bold, textTransform: "uppercase", lineHeight: 1.02, color: COLORS.textDark, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>
          {p.title}
        </div>
        <div style={{ fontSize: 42, fontWeight: FONT_WEIGHTS.light, lineHeight: 1.3, color: COLORS.text, marginTop: 34, opacity: body, transform: `translateY(${(1 - body) * 30}px)` }}>
          {p.body}
        </div>
      </div>

      {/* tarjeta con el visual */}
      <div
        style={{
          position: "absolute", left: 1000, top: 190, width: 800, height: 690,
          background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 6,
          boxShadow: "0 24px 60px rgba(41,50,64,0.14)",
          opacity: card, transform: `translateX(${(1 - card) * 160}px) scale(${0.94 + 0.06 * card})`,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: COLORS.primary }} />
        <Visual />
      </div>

      <div style={{ position: "absolute", left: 120, bottom: 52, fontSize: 28, fontWeight: FONT_WEIGHTS.regular, color: COLORS.grey }}>{TEXTS.footerUrl}</div>
    </AbsoluteFill>
  );
};
