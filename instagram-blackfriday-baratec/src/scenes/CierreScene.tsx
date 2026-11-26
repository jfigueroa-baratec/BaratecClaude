import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";

export const CierreScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, damping = 13) => spring({ frame: frame - d, fps, config: { damping, stiffness: 120 } });
  const T = TEXTS.cierre;
  const logo = sp(6, 11);
  const title = sp(12);
  const brand = sp(20, 11);
  const badge = sp(34, 12);
  const cta = sp(50, 10);
  const url = sp(62);
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, frame - 70) / 5);
  const fade = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, bottom: SAFE.bottom, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
        <div style={{ opacity: logo, transform: `scale(${0.8 + 0.2 * logo})` }}><Logo width={420} /></div>

        <div>
          <div style={{ fontSize: 96, lineHeight: 1.05, fontWeight: FONT_WEIGHTS.bold, color: COLORS.ink, opacity: title, transform: `translateY(${(1 - title) * 50}px)` }}>{T.title}</div>
          <div style={{ marginTop: 14, fontSize: 124, lineHeight: 1.0, whiteSpace: "nowrap", fontWeight: FONT_WEIGHTS.black, color: COLORS.primary, opacity: brand, transform: `scale(${0.75 + 0.25 * brand})` }}>{T.brand}</div>
        </div>

        {/* banner de la tienda (imagen provista) */}
        <Img src={staticFile("banner-victron.png")} style={{ width: 870, height: "auto", borderRadius: 18, boxShadow: "0 16px 40px rgba(0,0,0,0.14)", border: `2px solid ${COLORS.border}`, opacity: badge, transform: `translateY(${(1 - badge) * 60}px)` }} />

        <div>
          <div style={{ background: COLORS.yellow, color: COLORS.ink, fontSize: 52, whiteSpace: "nowrap", fontWeight: FONT_WEIGHTS.black, padding: "24px 44px", borderRadius: 8, opacity: cta, transform: `scale(${(0.7 + 0.3 * cta) * pulse})` }}>{T.cta} →</div>
          <div style={{ marginTop: 26, fontSize: 40, fontWeight: FONT_WEIGHTS.regular, color: COLORS.grey, opacity: url }}>{T.url}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
