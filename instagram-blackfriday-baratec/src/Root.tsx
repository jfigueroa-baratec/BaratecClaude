import { Composition } from "remotion";
import { Video } from "./Video";
import { TIMELINE } from "./config";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="InstagramBlackFriday"
    component={Video}
    durationInFrames={TIMELINE.durationInFrames}
    fps={TIMELINE.fps}
    width={1080}
    height={1920}
  />
);
