// ============================================================
//  Victron × Baratec Solar · Black Friday (motion graphics, 9:16 1080x1920)
//  Paleta de esta versión: blanco + azul de marca + negro (sin amarillo).
//  Todo lo editable vive acá: colores, textos, tiempos, volúmenes.
//  Identidad: https://solar.baratec.com/ (Titillium Web, voseo en los llamados a la acción)
// ============================================================
import timeline from "./timeline.json";

export const TIMELINE = timeline;
export const SCENES = timeline.scenes;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Zonas seguras de Instagram: texto y logos dentro de este rectángulo (las bandas decorativas van afuera) */
export const SAFE = { top: 250, bottom: 420, right: 120, left: 90 };

export const COLORS = {
  background: "#FFFFFF",
  ink: "#000000",
  grey: "#888A8D",
  border: "#E4E4E4",
  white: "#FFFFFF",
  blue: "#0B66B2", // azul de marca (círculos de los gráficos, bloques y botón)
};

/** Titillium Web, pesos usados por la web */
export const FONT_WEIGHTS = { light: 300, regular: 400, title: 600, bold: 700 };

export const TEXTS = {
  marquee: "BLACK FRIDAY  |  25/11 → 3/12  |  MERCADO LIBRE  |",
  apertura: { word: "VICTRON", dates: "Del 25/11 al 3/12", store: "en Mercado Libre" },
  tag: { top: "BLACK", bottom: "FRIDAY", dates: "25/11 → 3/12" },
  label: "Victron Energy",
  // Líneas Victron tomadas de solar.baratec.com (Sistemas Off-Grid). Frases cortas basadas en los textos de la web.
  lineas: [
    { title: ["Inversores", "Cargadores"], sub: "Electricidad estable" },
    { title: ["Reguladores", "de carga MPPT"], sub: "Máxima eficiencia" },
    { title: ["Monitores", "de batería"], sub: "Para sistemas off-grid" },
  ],
  cierre: {
    title: "Visitá nuestra tienda",
    brand: "Baratec Solar",
    cta: "Buscanos en Mercado Libre",
    url: "mercadolibre.com.ar/tienda/baratec",
    chips: ["Inversores", "Reguladores MPPT", "Monitores de batería"],
  },
};

export const AUDIO = { music: 0.75, sfxVolumeScale: 1 };
