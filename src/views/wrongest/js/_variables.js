export const settings = {
  timeToPresent: 30,
};

const audioSrc = "/audio/";

/////////////////////////////////
// Interface Sounds
export const soundBeginTalking = new Howl({
  src: [audioSrc + "time-is-now-585.mp3", audioSrc + "time-is-now-585.ogg"],
  volume: 0.9,
});

export const soundPresentationOver = new Howl({
  src: [audioSrc + "decay-475.mp3", audioSrc + "decay-475.ogg"],
  volume: 0.9,
});
