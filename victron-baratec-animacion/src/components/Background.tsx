import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../config";

/** Fondo claro estilo web (.section--alt) con grilla de puntos muy tenue y franja azul al pie. */
export const Background: React.FC<{ footer?: boolean }> = ({ footer = true }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.backgroundAlt }}>
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(${COLORS.border} 2px, transparent 2px)`,
        backgroundSize: "48px 48px",
        opacity: 0.8,
      }}
    />
    {footer && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: COLORS.primary }} />}
  </AbsoluteFill>
);
