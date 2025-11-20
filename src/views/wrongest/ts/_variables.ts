import { Howl } from "howler";
import type { GameSettings } from "./_types";

/**
 * Game settings for The Wrongest Words
 * Contains timing and behavior configuration
 */
export const settings: GameSettings = {
  timeToPresent: 30,
};

const audioSrc = "/audio/";

/////////////////////////////////
// Interface Sounds

/**
 * Sound effect played when a player begins their presentation
 */
export const soundBeginTalking = new Howl({
  src: [audioSrc + "time-is-now-585.mp3", audioSrc + "time-is-now-585.ogg"],
  volume: 0.9,
});

/**
 * Sound effect played when a player's presentation time is over
 */
export const soundPresentationOver = new Howl({
  src: [audioSrc + "decay-475.mp3", audioSrc + "decay-475.ogg"],
  volume: 0.9,
});
