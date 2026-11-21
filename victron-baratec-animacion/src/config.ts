// ============================================================
//  TODO lo editable de la animación vive acá: colores, textos,
//  tiempos y volúmenes. Fuente: https://solar.baratec.com/
// ============================================================
import timeline from "./timeline.json";

/** Tiempos (frames a 30 fps). Se comparten con scripts/generate_audio.py */
export const TIMELINE = timeline;
export const SCENES = timeline.scenes;

/** Paleta tomada de main-clean.css de solar.baratec.com */
export const COLORS = {
  primary: "#0065B1", // botones, franja del pie, acentos
  primaryHover: "#286090",
  background: "#FFFFFF",
  backgroundAlt: "#F4F4F5", // .section--alt
  text: "#333333",
  textDark: "#293240",
  dark: "#221F20", // .footer__main (fondo del logo inverso)
  border: "#E4E4E4",
  grey: "#7D7E82",
  white: "#FFFFFF",
};

/** Tipografía de la web: Titillium Web (se carga en Video.tsx con @remotion/google-fonts) */
export const FONT_WEIGHTS = { light: 300, regular: 400, title: 600, bold: 700 };

/** Textos: redactados con el tono de la web (voseo en los llamados a la acción) */
export const TEXTS = {
  intro: {
    kicker: "Distribuidor oficial",
    title: "Victron Energy",
    subtitle: "en Argentina y Uruguay",
  },
  products: [
    {
      kicker: "Victron Energy",
      title: "Inversores / Cargadores",
      body: "Convierte la energía de las baterías en electricidad utilizable, con un suministro estable.",
    },
    {
      kicker: "Victron Energy",
      title: "Reguladores de carga MPPT",
      body: "Optimizan la carga de las baterías con la energía solar captada y maximizan la eficiencia del sistema.",
    },
    {
      kicker: "Victron Energy",
      title: "Monitores de batería",
      body: "Parte de la gama completa de Victron Energy para sistemas off-grid.",
    },
  ],
  outro: {
    title: "Estamos listos para asesorarte",
    subtitle: "Contactate con nosotros",
    cta: "Solicitá cotización",
    url: "solar.baratec.com",
  },
  footerUrl: "solar.baratec.com",
};

/** Volúmenes (0–1) */
export const AUDIO = {
  music: 0.75,
  sfxVolumeScale: 1,
};
