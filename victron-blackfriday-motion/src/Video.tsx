import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";
import { AUDIO, COLORS, SCENES, TIMELINE } from "./config";
import { Apertura } from "./scenes/Apertura";
import { Fechas } from "./scenes/Fechas";
import { Lineas } from "./scenes/Lineas";
import { Cierre } from "./scenes/Cierre";
import { Wipe } from "./components/Wipe";
import { ProgressBar } from "./components/Background";

export const { fontFamily } = loadFont("normal", { weights: ["300", "400", "600", "700"], subsets: ["latin"] });

const SFX_FILES: Record<string, string> = { whoosh: "audio/sfx_whoosh.wav", pop: "audio/sfx_pop.wav", accent: "audio/sfx_accent.wav" };
const seq = (s: { from: number; to: number }) => ({ from: s.from, durationInFrames: s.to + 1 - s.from });

export const Video: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily }}>
    <Sequence {...seq(SCENES.apertura)}><Apertura /></Sequence>
    <Sequence {...seq(SCENES.fechas)}><Fechas /></Sequence>
    <Sequence {...seq(SCENES.lineas)}><Lineas /></Sequence>
    <Sequence from={SCENES.cierre.from} durationInFrames={TIMELINE.durationInFrames - SCENES.cierre.from}><Cierre /></Sequence>

    {[SCENES.fechas.from, SCENES.lineas.from, SCENES.cierre.from].map((b) => <Wipe key={b} at={b} half={TIMELINE.wipeHalf} />)}
    <ProgressBar />

    <Audio src={staticFile("audio/musica.wav")} volume={AUDIO.music} />
    {TIMELINE.sfx.map((s, i) => (
      <Sequence key={i} from={s.frame}>
        <Audio src={staticFile(SFX_FILES[s.type])} volume={Math.min(1, s.volume * AUDIO.sfxVolumeScale)} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
