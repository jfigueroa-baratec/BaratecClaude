import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";

export const TagScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 13) => spring({ frame: frame - d, fps, config: { damping, stiffness: 120 } });
  const logo = sp(2);
  const drop = spring({ frame: frame - 6, fps, config: { damping: 9, stiffness: 90 } });
  const band = sp(32, 12);
  const dates = sp(50);
  const t = Math.max(0, frame - 10) / fps;
  const swing = 9 * Math.exp(-t * 0.9) * Math.cos(t * 5.5); // péndulo amortiguado desde el ojal

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, bottom: SAFE.bottom }}>
        <div style={{ display: "flex", justifyContent: "center", opacity: logo, transform: `translateY(${(1 - logo) * -40}px)` }}><Logo width={420} /></div>

        {/* etiqueta (imagen provista), cae y se balancea desde el ojal */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 130, display: "flex", justifyContent: "center" }}>
          <Img src={staticFile("tag-blackfriday.png")} style={{ height: 780, width: "auto", transformOrigin: "22% 24%", transform: `translateY(${(1 - drop) * -900}px) rotate(${swing}deg)` }} />
        </div>

        {/* franja amarilla: también tapa el borde inferior cortado de la imagen */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 830, display: "flex", justifyContent: "center" }}>
          <div style={{ background: COLORS.yellow, color: COLORS.ink, fontSize: 92, fontWeight: FONT_WEIGHTS.black, textTransform: "uppercase", padding: "14px 40px", whiteSpace: "nowrap", opacity: band, transform: `translateX(${(1 - band) * 500}px)` }}>
            {TEXTS.tag.store}
          </div>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, top: 1010, textAlign: "center", fontSize: 84, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink, opacity: dates, transform: `scale(${0.85 + 0.15 * dates})` }}>
          {TEXTS.tag.dates}
        </div>
      </div>
    </AbsoluteFill>
  );
};
