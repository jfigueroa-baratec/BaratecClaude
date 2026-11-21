import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS } from "../config";

/** Fila de logos: Baratec Solar (inverso) | Victron Energy (sobre chip blanco). Sin deformar. */
export const Logos: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 36 * scale }}>
    <Img src={staticFile("logo-baratec-inverse.png")} style={{ width: 400 * scale }} />
    <div style={{ width: 3, height: 80 * scale, background: "rgba(255,255,255,0.5)" }} />
    <div style={{ background: COLORS.white, borderRadius: 8, padding: `${14 * scale}px ${22 * scale}px` }}>
      <Img src={staticFile("logo-victron.png")} style={{ width: 250 * scale, display: "block" }} />
    </div>
  </div>
);
