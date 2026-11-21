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

/** Paleta de solar.baratec.com (el pie usa #221F20 con logo inverso) */
export const COLORS = {
  primary: "#0065B1",
  primaryHover: "#286090",
  white: "#FFFFFF",
  dark: "#221F20",
  darkAlt: "#293240",
  grey: "#7D7E82",
  light: "#F4F4F5",
};

export const FONT_WEIGHTS = { light: 300, regular: 400, title: 600, bold: 700, black: 900 };

export const TEXTS = {
  intro: {
    black: "BLACK",
    friday: "FRIDAY",
    dates: "Del 25/11 al 3/12",
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
