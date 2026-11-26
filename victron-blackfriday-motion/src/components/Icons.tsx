import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../config";

const W = COLORS.white;
const Y = COLORS.yellow;
const B = COLORS.primary;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Puntos de energía que viajan por una línea horizontal. */
const Flow: React.FC<{ x1: number; x2: number; y: number; seed?: number; color?: string }> = ({ x1, x2, y, seed = 0, color = Y }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={W} strokeOpacity={0.35} strokeWidth={6} strokeLinecap="round" />
      {[0, 1, 2].map((i) => {
        const t = ((frame + seed) / 24 + i / 3) % 1;
        return <circle key={i} cx={x1 + (x2 - x1) * t} cy={y} r={9} fill={color} opacity={Math.sin(Math.PI * t)} />;
      })}
    </g>
  );
};

const Battery: React.FC<{ x: number; y: number; level: number }> = ({ x, y, level }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={0} y={0} width={90} height={140} rx={14} fill="none" stroke={W} strokeWidth={8} />
    <rect x={28} y={-14} width={34} height={14} rx={3} fill={W} />
    {[0, 1, 2].map((i) => <rect key={i} x={16} y={96 - i * 38} width={58} height={26} rx={5} fill={Y} opacity={level * 3 > i ? 1 : 0.15} />)}
  </g>
);

/** Inversores / Cargadores: batería → equipo → onda senoidal. */
export const IconInversor: React.FC<{ t: number }> = ({ t }) => {
  const frame = useCurrentFrame();
  const draw = clamp01(t);
  const blink = (i: number) => 0.35 + 0.65 * Math.max(0, Math.sin(frame / 4 - i));
  return (
    <svg viewBox="0 0 560 420" width={560} height={420}>
      <Battery x={30} y={140} level={0.35 + 0.65 * Math.abs(Math.sin(frame / 18))} />
      <Flow x1={135} x2={205} y={215} />
      <g transform="translate(205,105)">
        <rect width={150} height={220} rx={18} fill={W} />
        <path d="M30 95 q 22 -50 45 0 t 45 0" fill="none" stroke={B} strokeWidth={10} strokeLinecap="round" />
        {[0, 1, 2].map((i) => <circle key={i} cx={40 + i * 35} cy={170} r={10} fill={B} opacity={blink(i)} />)}
      </g>
      <Flow x1={360} x2={420} y={215} seed={8} />
      <path d="M0 0 q 18 -70 36 0 t 36 0 t 36 0" fill="none" stroke={Y} strokeWidth={10} strokeLinecap="round" strokeDasharray={360} strokeDashoffset={360 * (1 - draw)} transform="translate(432,215)" />
    </svg>
  );
};

/** Reguladores MPPT: sol → panel → regulador → batería. */
export const IconMppt: React.FC<{ t: number }> = ({ t }) => {
  const frame = useCurrentFrame();
  const level = clamp01(t) * 0.95;
  return (
    <svg viewBox="0 0 560 420" width={560} height={420}>
      <g transform="translate(-8,58)">
        <g transform="translate(95,60)">
          <circle r={30} fill={Y} />
          {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={0} y1={-46} x2={0} y2={-64} stroke={Y} strokeWidth={8} strokeLinecap="round" transform={`rotate(${i * 45 + frame * 1.5})`} />)}
        </g>
        <g transform="translate(30,170)">
          <polygon points="40,0 190,0 150,130 0,130" fill={W} />
          {[0.25, 0.5, 0.75].map((f) => <line key={f} x1={40 + 150 * f} y1={0} x2={150 * f} y2={130} stroke={B} strokeWidth={3} />)}
          {[1 / 3, 2 / 3].map((g) => <line key={g} x1={40 - 40 * g} y1={130 * g} x2={190 - 40 * g} y2={130 * g} stroke={B} strokeWidth={3} />)}
        </g>
        <Flow x1={225} x2={280} y={235} />
        <g transform="translate(280,160)">
          <rect width={125} height={150} rx={16} fill={W} />
          <text x={62} y={92} textAnchor="middle" fontSize={38} fontWeight={700} fill={B} fontFamily="inherit">MPPT</text>
        </g>
        <Flow x1={410} x2={440} y={235} seed={8} />
        <Battery x={445} y={165} level={level} />
      </g>
    </svg>
  );
};

/** Monitores de batería: medidor circular + batería + gráfico que se dibuja. */
export const IconMonitor: React.FC<{ t: number }> = ({ t }) => {
  const frame = useCurrentFrame();
  const R = 105, C = 2 * Math.PI * R;
  const fill = clamp01(t) * 0.78;
  const pts = "50,385 130,350 200,372 280,318 350,345 430,290 510,305";
  return (
    <svg viewBox="0 0 560 420" width={560} height={420}>
      <g transform="translate(280,150)">
        <circle r={R} fill="none" stroke={W} strokeOpacity={0.3} strokeWidth={24} />
        <circle r={R} fill="none" stroke={Y} strokeWidth={24} strokeLinecap="round" strokeDasharray={`${C * fill} ${C}`} transform="rotate(-90)" />
        <g transform="translate(-34,-48) scale(0.75)">
          <rect width={90} height={140} rx={14} fill="none" stroke={W} strokeWidth={8} />
          <rect x={28} y={-14} width={34} height={14} rx={3} fill={W} />
          {[0, 1, 2].map((i) => <rect key={i} x={16} y={96 - i * 38} width={58} height={26} rx={5} fill={Y} opacity={fill * 3.8 > i ? 1 : 0.15} />)}
        </g>
      </g>
      <polyline points={pts} fill="none" stroke={W} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={600} strokeDashoffset={600 * (1 - clamp01(t * 1.1))} />
      <circle cx={510} cy={305} r={11} fill={Y} opacity={clamp01((t - 0.9) * 10) * (0.6 + 0.4 * Math.sin(frame / 4))} />
    </svg>
  );
};
