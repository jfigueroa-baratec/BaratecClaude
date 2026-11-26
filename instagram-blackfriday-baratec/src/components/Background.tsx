import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../config";

/** Fondo blanco con grilla de puntos tenue, aros azules muy suaves y franja azul inferior. */
export const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
    <AbsoluteFill style={{ backgroundImage: `radial-gradient(${COLORS.border} 2px, transparent 2px)`, backgroundSize: "54px 54px", opacity: 0.8 }} />
    <div style={{ position: "absolute", right: -420, top: -300, width: 1100, height: 1100, borderRadius: 550, border: "80px solid rgba(10,90,162,0.07)" }} />
    <div style={{ position: "absolute", left: -380, bottom: -420, width: 1000, height: 1000, borderRadius: 500, border: "70px solid rgba(10,90,162,0.07)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22, background: COLORS.primary }} />
  </AbsoluteFill>
);
