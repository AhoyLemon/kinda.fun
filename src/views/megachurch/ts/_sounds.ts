import { Howl } from "howler";
const audioSrc = "audio/megachurch/";
export const soundWhoopsYoureDead = new Howl({
  src: [audioSrc + "whoops-youre-dead.mp3"],
  volume: 0.8,
});
export const soundInPrison = new Howl({
  src: [audioSrc + "in-prison.mp3"],
  volume: 0.8,
});
export const soundDonationStreet = new Howl({
  src: [audioSrc + "chin-up-554.mp3", audioSrc + "chin-up-554.ogg"],
  volume: 1,
});
