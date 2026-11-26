import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, TIMELINE } from "../config";

/** Fondo blanco con puntos tenues y, abajo, una barra de progreso: un "sol" amarillo recorre los 10 s. */
export const Background: React.FC<{ dots?: boolean }> = ({ dots = true }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
    {dots && <AbsoluteFill style={{ backgroundImage: `radial-gradient(${COLORS.border} 2px, transparent 2px)`, backgroundSize: "54px 54px", opacity: 0.8 }} />}
  </AbsoluteFill>
);

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const p = frame / (TIMELINE.durationInFrames - 1);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22, background: COLORS.primary }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: COLORS.yellow }} />
    </div>
  );
};
