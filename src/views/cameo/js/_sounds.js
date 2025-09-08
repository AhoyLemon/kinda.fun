import { Howl, Howler } from "howler";
const audioSrc = "audio/";
export const soundMiss = new Howl({
  src: [audioSrc + "attracted-2-130.mp3", audioSrc + "attracted-2-130.ogg"],
  volume: 0.8,
});

export const soundCorrect = new Howl({
  src: [audioSrc + "accomplished-579.mp3", audioSrc + "accomplished-579.ogg"],
  volume: 0.9,
});

export const soundPerfectValue = new Howl({
  src: [audioSrc + "munchausen-433.mp3", audioSrc + "munchausen-433.ogg"],
  volume: 0.9,
});

export const soundCloseValue = new Howl({
  src: [audioSrc + "gesture-192.mp3", audioSrc + "gesture-192.ogg"],
  volume: 0.8,
});

export const soundBadValue = new Howl({
  src: [audioSrc + "attracted-2-130.mp3", audioSrc + "attracted-2-130.mp3"],
  volume: 0.9,
});

export const soundNewEmail = new Howl({
  src: [audioSrc + "DingDongNewEmail.mp3", audioSrc + "DingDongNewEmail.ogg"],
  volume: 0.9,
});

export const soundUnderBudget = new Howl({
  src: [audioSrc + "accomplished-579.mp3", audioSrc + "accomplished-579.ogg"],
  volume: 0.9,
});

export const soundOverBudget = new Howl({
  src: [
    audioSrc + "chimes-power-down-190.mp3",
    audioSrc + "chimes-power-down-190.ogg",
  ],
  volume: 1,
});

export const soundFutherOverBudget = new Howl({
  src: [audioSrc + "attracted-2-130.mp3", audioSrc + "attracted-2-130.mp3"],
  volume: 0.8,
});

export const soundGameOverMusic = new Howl({
  src: [
    audioSrc + "sour-tennessee-red.mp3",
    audioSrc + "sour-tennessee-red.ogg",
  ],
  volume: 0.9,
});

export const birthdayHowls = [];

for (var i = 1; i < 37; i++) {
  const slug = i < 10 ? `0${i}` : i.toString();
  birthdayHowls.push(
    new Howl({
      src: [`${audioSrc}birthdays/${slug}.mp3`],
      volume: 0.9,
    }),
  );
}
