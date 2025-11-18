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
  volume: 0.8,
});

export const spiceSniffs = new Howl({
  src: [audioSrc + "sniffs.mp3"],
  sprite: {
    tiny: [8756, 1068],
    small: [14960, 700],
    medium: [0, 1070],
    large: [1950, 3070],
    huge: [10100, 5500],
  },
  volume: 0.8,
});
