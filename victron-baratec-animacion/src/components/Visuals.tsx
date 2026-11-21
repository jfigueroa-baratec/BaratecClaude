import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT_WEIGHTS } from "../config";

const Float: React.FC<{ children: React.ReactNode; amp?: number }> = ({ children, amp = 6 }) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(frame / 9) * amp}px)` }}>{children}</div>;
};

/** Inversores/Cargadores: foto real de la web (línea MultiPlus), sin deformar. */
export const InversorVisual: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Float>
      <Img src={staticFile("victron-multiplus.jpg")} style={{ width: 700, height: "auto", display: "block" }} />
    </Float>
  </div>
);

const Dots: React.FC<{ x1: number; x2: number; y: number; seed?: number }> = ({ x1, x2, y, seed = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={COLORS.border} strokeWidth={6} strokeLinecap="round" />
      {[0, 1, 2].map((i) => {
        const t = (((frame + seed) / 30 + i / 3) % 1);
        return <circle key={i} cx={x1 + (x2 - x1) * t} cy={y} r={9} fill={COLORS.primary} opacity={Math.sin(Math.PI * t)} />;
      })}
    </>
  );
};

/** MPPT: esquema simple panel → regulador → batería (ilustración propia, no es un equipo real). */
export const MpptVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <svg viewBox="0 0 800 690" width={800} height={690} style={{ position: "absolute", inset: 0 }}>
      <g transform="translate(40,60)">
      {/* sol */}
      <g transform="translate(165,80)">
        <circle r={30} fill={COLORS.primary} />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={0} y1={-46} x2={0} y2={-64} stroke={COLORS.primary} strokeWidth={7} strokeLinecap="round" transform={`rotate(${i * 45 + frame * 1.2})`} opacity={0.5 + 0.5 * glow} />
        ))}
      </g>
      {/* panel solar */}
      <g transform="translate(50,200)">
        <polygon points="30,0 230,0 200,150 0,150" fill={COLORS.textDark} />
        {[1, 2, 3].map((i) => <line key={i} x1={(i * 200) / 4 + 30 - i * 7.5} y1={0} x2={(i * 200) / 4 - i * 7.5} y2={150} stroke={COLORS.white} strokeWidth={2} opacity={0.7} />)}
        {[1, 2].map((i) => <line key={i} x1={30 - i * 15} y1={i * 50} x2={230 - i * 15} y2={i * 50} stroke={COLORS.white} strokeWidth={2} opacity={0.7} />)}
      </g>
      </g>
      <Dots x1={320} x2={400} y={335} />
      {/* regulador */}
      <g transform="translate(400,260)">
        <rect width={150} height={150} rx={12} fill={COLORS.primary} />
        <rect x={12} y={12} width={126} height={126} rx={8} fill="none" stroke={COLORS.white} strokeWidth={2} opacity={0.5} />
        <text x={75} y={90} textAnchor="middle" fontSize={40} fontWeight={FONT_WEIGHTS.bold} fill={COLORS.white} fontFamily="inherit">MPPT</text>
      </g>
      <Dots x1={560} x2={620} y={335} seed={10} />
      {/* batería */}
      <g transform="translate(630,285)">
        <rect width={90} height={100} rx={8} fill="none" stroke={COLORS.textDark} strokeWidth={6} />
        <rect x={25} y={-12} width={40} height={12} fill={COLORS.textDark} />
        {[0, 1, 2].map((i) => <rect key={i} x={14} y={66 - i * 28} width={62} height={20} rx={3} fill={COLORS.primary} opacity={0.35 + 0.65 * (i === 2 ? glow : 1)} />)}
      </g>
      <text x={405} y={560} textAnchor="middle" fontSize={34} fontWeight={FONT_WEIGHTS.regular} fill={COLORS.grey} fontFamily="inherit">Paneles · Regulador de carga · Baterías</text>
    </svg>
  );
};

/** Monitores de batería: ilustración propia (medidor circular + batería), sin valores numéricos. */
export const MonitorVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const fill = Math.min(1, Math.max(0, (frame - 8) / 28)) * 0.78;
  const R = 150, C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 800 690" width={800} height={690} style={{ position: "absolute", inset: 0 }}>
      <g transform="translate(400,300)">
        <circle r={R} fill="none" stroke={COLORS.border} strokeWidth={30} />
        <circle r={R} fill="none" stroke={COLORS.primary} strokeWidth={30} strokeLinecap="round" strokeDasharray={`${C * fill} ${C}`} transform="rotate(-90)" />
        <g transform="translate(-45,-55)">
          <rect width={90} height={100} rx={8} fill="none" stroke={COLORS.textDark} strokeWidth={6} />
          <rect x={25} y={-12} width={40} height={12} fill={COLORS.textDark} />
          {[0, 1, 2].map((i) => <rect key={i} x={14} y={66 - i * 28} width={62} height={20} rx={3} fill={COLORS.primary} opacity={fill * 3 > i ? 1 : 0.15} />)}
        </g>
      </g>
      <text x={400} y={560} textAnchor="middle" fontSize={34} fontWeight={FONT_WEIGHTS.regular} fill={COLORS.grey} fontFamily="inherit">Para sistemas Off-Grid</text>
    </svg>
  );
};
