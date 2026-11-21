import { Composition } from "remotion";
import { Video } from "./Video";
import { TIMELINE } from "./config";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="VictronBaratec"
    component={Video}
    durationInFrames={TIMELINE.durationInFrames}
    fps={TIMELINE.fps}
    width={1920}
    height={1080}
  />
);
