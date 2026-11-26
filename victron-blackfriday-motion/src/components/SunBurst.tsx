import React from "react";
import { COLORS } from "../config";

/** Sol amarillo con rayos que gira detrás de la etiqueta. */
export const SunBurst: React.FC<{ scale: number; rot: number; cy: number; opacity?: number; core?: boolean }> = ({ scale, rot, cy, opacity = 0.35, core = true }) => {
  const N = 16, R = 760;
  return (
    <svg width={1500} height={1500} viewBox="-750 -750 1500 1500" style={{ position: "absolute", left: 540 - 750, top: cy - 750, transform: `scale(${scale}) rotate(${rot}deg)` }}>
      {Array.from({ length: N }).map((_, i) => {
        const a0 = (i * 2 * Math.PI) / N, a1 = a0 + Math.PI / N;
        return <polygon key={i} points={`0,0 ${R * Math.cos(a0)},${R * Math.sin(a0)} ${R * Math.cos(a1)},${R * Math.sin(a1)}`} fill={COLORS.yellow} opacity={opacity} />;
      })}
      {core && <circle r={300} fill={COLORS.yellow} />}
    </svg>
  );
};

