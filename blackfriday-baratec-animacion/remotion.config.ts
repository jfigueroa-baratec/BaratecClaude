import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// En entornos sin acceso a remotion.media se puede usar un Chromium local:
//   REMOTION_BROWSER=/opt/pw-browsers/chromium npx remotion still ...
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
  Config.setChromeMode("chrome-for-testing");
}
