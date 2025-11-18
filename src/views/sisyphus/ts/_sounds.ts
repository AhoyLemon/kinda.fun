const audioFolder = "audio/sisyphus";
import { Howl } from "howler";

export const uphillMusic = new Howl({
  src: [`${audioFolder}/uphill4.ogg`, `${audioFolder}/uphill4.mp3`],
  loop: true,
});
export const downhillMusic = new Howl({
  src: [`${audioFolder}/downhill6.ogg`, `${audioFolder}/downhill6.mp3`],
  loop: false,
});

export const cheevoSound = new Howl({
  src: [`${audioFolder}/springy-350.mp3`],
  loop: false,
  volume: 0.5,
});

export const purchaseSound = new Howl({
  src: [`${audioFolder}/juntos-607.mp3`],
  loop: false,
});

export const dignityGot = new Howl({
  src: [`${audioFolder}/dignity-got.mp3`],
  loop: false,
});

export const dignityLost = new Howl({
  src: [`${audioFolder}/dignity-lost.mp3`],
  loop: false,
});
