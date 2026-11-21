// ============================================================
//  Black Friday Baratec Solar · 9:16 (1080x1920)
//  Todo lo editable vive acá: colores, textos, tiempos, volúmenes.
// ============================================================
import timeline from "./timeline.json";

export const TIMELINE = timeline;
export const SCENES = timeline.scenes;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Zonas seguras para Reels/TikTok/ML: nada de texto ni logos fuera de este rectángulo */
export const SAFE = { top: 250, bottom: 420, right: 120, left: 90 };

/** Colores de marca indicados por Baratec + amarillo de Mercado Libre como acento de campaña */
export const COLORS = {
  primary: "#0A5AA2",
  primaryHover: "#286090",
  white: "#FFFFFF",
  dark: "#000000",
  darkAlt: "#293240",
  grey: "#888A8D",
  light: "#F4F4F5",
  yellow: "#FFE340", // amarillo de Mercado Libre (acento de la campaña)
};

export const FONT_WEIGHTS = { light: 300, regular: 400, title: 600, bold: 700, black: 900 };

export const TEXTS = {
  intro: {
    black: "BLACK",
    friday: "FRIDAY",
    dates: "Del 25/11 al 3/12",
    store: "En nuestra tienda de Mercado Libre",
  },
  fechas: {
    title: "Nueve días de Black Friday",
    from: { day: "25", month: "NOV" },
    to: { day: "3", month: "DIC" },
    days: 9,
    daysLabel: "días para aprovechar",
    store: "En nuestra tienda de Mercado Libre",
  },
  outro: {
    title: "¡Aprovechá el Black Friday!",
    dates: "25/11 → 3/12",
    cta: "Visitá nuestra tienda",
    sub: "Baratec en Mercado Libre",
    url: "mercadolibre.com.ar/tienda/baratec",
  },
};

export const AUDIO = { music: 0.75, sfxVolumeScale: 1 };
