import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../config";

/** Telón azul que cruza la pantalla: cubre en [at-half, at] y destapa en [at, at+half]. */
export const Wipe: React.FC<{ at: number; half: number }> = ({ at, half }) => {
  const frame = useCurrentFrame();
  if (frame < at - half || frame > at + half) return null;
  const x = frame <= at
    ? interpolate(frame, [at - half, at], [-125, 0], { easing: Easing.bezier(0.5, 0, 0.3, 1) })
    : interpolate(frame, [at, at + half], [0, 125], { easing: Easing.bezier(0.7, 0, 0.5, 1) });
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: -50, bottom: -50, left: "-12%", width: "124%", transform: `translateX(${x}%) skewX(-12deg)`, background: COLORS.primary }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 24, background: COLORS.white }} />
      </div>
    </AbsoluteFill>
  );
};
