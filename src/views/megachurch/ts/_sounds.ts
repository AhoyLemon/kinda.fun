import { Howl } from "howler";
const audioSrc = "audio/megachurch/";
export const soundWhoopsYoureDead = new Howl({
  src: [audioSrc + "whoops-youre-dead.mp3"],
  volume: 0.8,
});
