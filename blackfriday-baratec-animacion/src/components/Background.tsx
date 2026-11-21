import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../config";

/** Fondo oscuro (#221F20, como el pie de la web) con aros azules finos y franja inferior azul. */
export const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
    <div style={{ position: "absolute", right: -420, top: -300, width: 1100, height: 1100, borderRadius: 550, border: "80px solid rgba(0,101,177,0.28)" }} />
    <div style={{ position: "absolute", left: -380, bottom: -420, width: 1000, height: 1000, borderRadius: 500, border: "70px solid rgba(0,101,177,0.28)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22, background: COLORS.primary }} />
  </AbsoluteFill>
);
