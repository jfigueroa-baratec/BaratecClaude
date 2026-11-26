import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, TEXTS } from "../config";

/** Fondo blanco con puntos grises muy tenues. */
export const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
    <AbsoluteFill style={{ backgroundImage: `radial-gradient(${COLORS.border} 2px, transparent 2px)`, backgroundSize: "54px 54px", opacity: 0.8 }} />
  </AbsoluteFill>
);

const UNIT = 1400; // ancho de cada repetición del texto

/** Banda de texto que se desplaza despacio (decorativa, fuera de la zona segura). textLength fija el ancho para que el empalme sea exacto. */
const Band: React.FC<{ top: number; bg: string; color: string; dir: 1 | -1; border?: string }> = ({ top, bg, color, dir, border }) => {
  const frame = useCurrentFrame();
  const off = ((frame * 3 * dir) % UNIT + UNIT) % UNIT;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, height: 96, background: bg, overflow: "hidden", borderTop: border ? `5px solid ${border}` : undefined, borderBottom: border ? `5px solid ${border}` : undefined, boxSizing: "border-box" }}>
      <svg width={1080} height={96} style={{ display: "block" }}>
        {[-1, 0, 1, 2].map((i) => (
          <text key={i} x={i * UNIT + off + 40} y={68} fontSize={56} fontWeight={700} fill={color} fontFamily="inherit" textLength={UNIT - 80} lengthAdjust="spacing" style={{ whiteSpace: "pre" }}>{TEXTS.marquee}</text>
        ))}
      </svg>
    </div>
  );
};

/** Bandas superior (negra con texto blanco) e inferior (blanca con texto negro y filetes negros) que acompañan todo el video. */
export const Bands: React.FC = () => (
  <>
    <Band top={96} bg={COLORS.ink} color={COLORS.white} dir={-1} />
    <Band top={1700} bg={COLORS.white} color={COLORS.ink} dir={1} border={COLORS.ink} />
  </>
);
