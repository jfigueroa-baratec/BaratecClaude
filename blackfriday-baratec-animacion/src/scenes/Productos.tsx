import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_WEIGHTS, SAFE, TEXTS } from "../config";
import { Background } from "../components/Background";

const CARD_DELAY = [10, 30]; // frames locales de entrada de cada tarjeta (sincronizado con los "pop")

/** Placa con 2 productos apilados. `first` = índice del primer producto en TEXTS.productos.items */
export const Productos: React.FC<{ first: number }> = ({ first }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const P = TEXTS.productos;
  const sp = (d: number, damping = 13) => spring({ frame: frame - d, fps, config: { damping, stiffness: 120 } });
  const head = sp(4);

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top, bottom: SAFE.bottom, display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, height: 80, opacity: head, transform: `translateX(${(1 - head) * -60}px)` }}>
          <div style={{ background: COLORS.yellow, color: COLORS.dark, fontSize: 44, fontWeight: FONT_WEIGHTS.black, textTransform: "uppercase", padding: "6px 24px" }}>{P.badge}</div>
          <div style={{ color: COLORS.white, fontSize: 44, fontWeight: FONT_WEIGHTS.bold, letterSpacing: 4, textTransform: "uppercase" }}>{P.kicker}</div>
        </div>

        {[0, 1].map((k) => {
          const it = P.items[first + k];
          const s = sp(CARD_DELAY[k], 12);
          const price = sp(CARD_DELAY[k] + 8, 10);
          const img = sp(CARD_DELAY[k] + 4, 11);
          return (
            <div key={k} style={{ flex: 1, display: "flex", background: COLORS.white, borderRadius: 12, overflow: "hidden", opacity: s, transform: `translateX(${(1 - s) * 260}px) scale(${0.96 + 0.04 * s})` }}>
              <div style={{ flex: "0 0 360px", background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile(it.img)} style={{ width: 330, height: "auto", transform: `scale(${0.8 + 0.2 * img})`, opacity: img }} />
              </div>
              <div style={{ flex: 1, padding: "28px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: 42, lineHeight: 1.15, fontWeight: FONT_WEIGHTS.bold, color: COLORS.dark }}>{it.name}</div>
                <div style={{ opacity: price, transform: `translateY(${(1 - price) * 24}px)` }}>
                  {it.oldPrice && <div style={{ fontSize: 36, color: COLORS.grey, textDecoration: "line-through", fontWeight: FONT_WEIGHTS.regular }}>{it.oldPrice}</div>}
                  <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: FONT_WEIGHTS.black, color: COLORS.dark, whiteSpace: "nowrap" }}>
                    {it.price} {it.note && <span style={{ fontSize: 34, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary }}>{it.note}</span>}
                  </div>
                  <div style={{ display: "inline-block", marginTop: 12, background: COLORS.yellow, color: COLORS.dark, fontSize: 36, fontWeight: FONT_WEIGHTS.bold, padding: "6px 18px", borderRadius: 6 }}>{P.coupon}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
