import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

/** Texto letra por letra con rebote. */
export const KineticText: React.FC<{ text: string; delay?: number; stagger?: number; style?: React.CSSProperties; rise?: number }> = ({ text, delay = 0, stagger = 2, style, rise = 90 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", justifyContent: "center", whiteSpace: "pre", ...style }}>
      {text.split("").map((ch, i) => {
        const p = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 9, stiffness: 150 } });
        return (
          <span key={i} style={{ display: "inline-block", opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * rise}px) rotate(${(1 - p) * 12}deg) scale(${0.6 + 0.4 * p})` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </div>
  );
};
