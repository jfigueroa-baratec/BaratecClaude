import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

/** Texto letra por letra con rebote suave. */
export const KineticText: React.FC<{ text: string; delay?: number; stagger?: number; style?: React.CSSProperties; rise?: number }> = ({ text, delay = 0, stagger = 3, style, rise = 70 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", justifyContent: "center", whiteSpace: "pre", ...style }}>
      {text.split("").map((ch, i) => {
        const p = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 14, stiffness: 80 } });
        return (
          <span key={i} style={{ display: "inline-block", opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * rise}px) scale(${0.8 + 0.2 * p})` }}>
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </div>
  );
};
