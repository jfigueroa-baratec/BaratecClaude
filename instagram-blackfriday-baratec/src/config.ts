// ============================================================
//  Black Friday en Mercado Libre · Instagram 9:16 (1080x1920)
//  Tipografía: Titillium Web (la de solar.baratec.com), pesos 300/400/600/700. Fondo blanco. Todo lo editable vive acá: colores, textos, tiempos, volúmenes.
// ============================================================
import timeline from "./timeline.json";

export const TIMELINE = timeline;
export const SCENES = timeline.scenes;

/** Zonas seguras de Instagram (Reels/Historias): nada de texto fuera de este rectángulo */
export const SAFE = { top: 250, bottom: 420, right: 120, left: 90 };

/** Colores de marca de Baratec + amarillo de Mercado Libre como acento de campaña */
export const COLORS = {
  background: "#FFFFFF",
  primary: "#0B66B2", // azul de marca
  ink: "#000000", // negro (texto y etiqueta)
  brandDark: "#201C1D",
  grey: "#888A8D",
  border: "#E4E4E4",
  yellow: "#FFE600", // amarillo de Mercado Libre
  white: "#FFFFFF",
};

export const FONT_WEIGHTS = { light: 300, regular: 400, title: 600, bold: 700, black: 700 };

export const TEXTS = {
  tag: {
    store: "en Mercado Libre",
    dates: "Del 25/11 al 3/12",
  },
  fechas: {
    kicker: "Black Friday",
    from: { day: "25", month: "NOV" },
    to: { day: "3", month: "DIC" },
    chip: ["En productos", "seleccionados"],
    sub: "en Mercado Libre",
  },
  cierre: {
    title: "Visitá nuestra tienda",
    brand: "Baratec Solar",
    cta: "Buscanos en Mercado Libre",
    url: "mercadolibre.com.ar/tienda/baratec",
  },
};

export const AUDIO = { music: 0.75, sfxVolumeScale: 1 };
