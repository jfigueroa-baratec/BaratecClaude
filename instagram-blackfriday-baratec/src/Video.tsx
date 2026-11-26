import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";
import { AUDIO, COLORS, SCENES, TIMELINE } from "./config";
import { TagScene } from "./scenes/TagScene";
import { FechasScene } from "./scenes/FechasScene";
import { CierreScene } from "./scenes/CierreScene";
import { Wipe } from "./components/Wipe";

export const { fontFamily } = loadFont("normal", { weights: ["300", "400", "600", "700"], subsets: ["latin"] });

const SFX_FILES: Record<string, string> = { whoosh: "audio/sfx_whoosh.wav", pop: "audio/sfx_pop.wav", accent: "audio/sfx_accent.wav" };

export const Video: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily }}>
    <Sequence from={SCENES.tag.from} durationInFrames={SCENES.tag.to + 1 - SCENES.tag.from}><TagScene /></Sequence>
    <Sequence from={SCENES.fechas.from} durationInFrames={SCENES.fechas.to + 1 - SCENES.fechas.from}><FechasScene /></Sequence>
    <Sequence from={SCENES.cierre.from} durationInFrames={TIMELINE.durationInFrames - SCENES.cierre.from}><CierreScene /></Sequence>

    {[SCENES.fechas.from, SCENES.cierre.from].map((b) => <Wipe key={b} at={b} half={TIMELINE.wipeHalf} />)}

    <Audio src={staticFile("audio/musica.wav")} volume={AUDIO.music} />
    {TIMELINE.sfx.map((s, i) => (
      <Sequence key={i} from={s.frame}>
        <Audio src={staticFile(SFX_FILES[s.type])} volume={Math.min(1, s.volume * AUDIO.sfxVolumeScale)} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
