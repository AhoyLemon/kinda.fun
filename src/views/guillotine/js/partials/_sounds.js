import { Howl, Howler } from "howler";
export const dropSound = new Howl({
  src: ["/audio/guillotine/drop01.mp3"],
  volume: 1,
});

export const lastWords = new Howl({
  src: ["/audio/guillotine/lastwords-2.mp3"],
  volume: 0.5,
  sprite: {
    1: [1173, 615],
    2: [2717, 905],
    3: [4331, 1102],
    4: [5991, 905],
    5: [7465, 999],
    6: [8951, 1254],
    7: [10449, 813],
    8: [11842, 848],
    9: [13270, 964],
    10: [14663, 1138],
    11: [16417, 1149],
    12: [17879, 999],
    13: [19160, 1495],
    14: [21162, 1673],
    15: [23341, 1749],
    16: [25344, 1267],
    17: [26864, 1293],
    Charles: [28542, 1513], // King Charles III
  },
  onend: function () {
    console.log("sound played");
  },
});

// Cheering crowd sounds for top 5 billionaires
export const cheeringSounds = {
  rank1: new Howl({
    src: ["/audio/guillotine/cheer-rank1.mp3"],
    volume: 1.0, // Most exuberant
  }),
  rank2: new Howl({
    src: ["/audio/guillotine/cheer-rank2.mp3"],
    volume: 0.9, // Very enthusiastic
  }),
  rank3: new Howl({
    src: ["/audio/guillotine/cheer-rank3.mp3"],
    volume: 0.8, // Strong cheering
  }),
  rank4: new Howl({
    src: ["/audio/guillotine/cheer-rank4.mp3"],
    volume: 0.7, // Moderate cheering
  }),
  rank5: new Howl({
    src: ["/audio/guillotine/cheer-rank5.mp3"],
    volume: 0.6, // Light cheering
  }),
};
