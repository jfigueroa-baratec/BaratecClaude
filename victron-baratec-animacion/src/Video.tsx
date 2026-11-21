import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";
import { AUDIO, COLORS, SCENES, TIMELINE } from "./config";
import { Intro } from "./scenes/Intro";
import { ProductScene } from "./scenes/ProductScene";
import { Outro } from "./scenes/Outro";
import { Wipe } from "./components/Wipe";

export const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const SFX_FILES: Record<string, string> = {
  whoosh: "audio/sfx_whoosh.wav",
  pop: "audio/sfx_pop.wav",
  accent: "audio/sfx_accent.wav",
};

const END = (frame: number) => frame + 1; // la escena sigue 1 frame bajo el telón

export const Video: React.FC = () => {
  const boundaries = [SCENES.inversores.from, SCENES.mppt.from, SCENES.monitores.from, SCENES.cierre.from];
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily }}>
      <Sequence from={SCENES.intro.from} durationInFrames={END(SCENES.intro.to) - SCENES.intro.from}>
        <Intro />
      </Sequence>
      <Sequence from={SCENES.inversores.from} durationInFrames={END(SCENES.inversores.to) - SCENES.inversores.from}>
        <ProductScene index={0} />
      </Sequence>
      <Sequence from={SCENES.mppt.from} durationInFrames={END(SCENES.mppt.to) - SCENES.mppt.from}>
        <ProductScene index={1} />
      </Sequence>
      <Sequence from={SCENES.monitores.from} durationInFrames={END(SCENES.monitores.to) - SCENES.monitores.from}>
        <ProductScene index={2} />
      </Sequence>
      <Sequence from={SCENES.cierre.from} durationInFrames={TIMELINE.durationInFrames - SCENES.cierre.from}>
        <Outro />
      </Sequence>

      {boundaries.map((b) => (
        <Wipe key={b} at={b} half={TIMELINE.wipeHalf} />
      ))}

      {/* Música */}
      <Audio src={staticFile("audio/musica.wav")} volume={AUDIO.music} />
      {/* Efectos sincronizados */}
      {TIMELINE.sfx.map((s, i) => (
        <Sequence key={i} from={s.frame}>
          <Audio src={staticFile(SFX_FILES[s.type])} volume={Math.min(1, s.volume * AUDIO.sfxVolumeScale)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
