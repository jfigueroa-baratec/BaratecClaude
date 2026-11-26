import { Config } from "@remotion/cli/config";

// Calidad máxima de texto: cuadros intermedios en PNG (sin artefactos JPEG) y CRF bajo.
Config.setVideoImageFormat("png");
Config.setCrf(12);
Config.setX264Preset("slow");
Config.setOverwriteOutput(true);

// En entornos sin acceso a remotion.media se puede usar un Chromium local:
//   REMOTION_BROWSER=/opt/pw-browsers/chromium npx remotion still ...
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
  Config.setChromeMode("chrome-for-testing");
}
