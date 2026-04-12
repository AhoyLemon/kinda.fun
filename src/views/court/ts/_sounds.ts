import { Howl, Howler } from "howler";
import { aL, K, T } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

export const currentJusticeSounds = new Howl({
  src: ["/audio/court/justicesCurrent.mp3"],
  volume: 0.9,
  sprite: {
    roberts: [151, 1637],
    robertsSad: [1637, 3379],
    robertsHappy: [3379, 4714],
    thomas: [4714, 6026],
    thomasSad: [6026, 7361],
    thomasHappy: [7361, 9033],
    alito: [9033, 10588],
    alitoSad: [10588, 12295],
    alitoHappy: [12295, 14187],
    sotomayor: [14187, 16068],
    sotomayorSad: [16068, 17903],
    sotomayorHappy: [17903, 19811],
    kagan: [19811, 20956],
    kaganSad: [20956, 22140],
    kaganHappy: [22140, 23580],
    gorsuch: [23580, 25530],
    gorsuchSad: [25530, 27400],
    gorsuchHappy: [27400, 28711],
    kavanaugh: [28711, 30671],
    kavanaughSad: [30671, 32485],
    kavanaughHappy: [32485, 34300],
    coneybarrett: [34300, 35863],
    coneybarrettSad: [35863, 37686],
    coneybarrettHappy: [37686, 39195],
    ketanji: [39195, 41140],
    ketanjiSad: [41140, 43090],
    ketanjiHappy: [43090, 44455],
  },
  onend: function () {
    console.log("sound played");
  },
});

export const drankBeer = new Howl({
  src: ["/audio/court/drankBeer.mp3"],
  volume: 0.9,
  sprite: {
    iDrankBeerWithMyFriends: [758, 2740],
    sometimesIHadTooManyBeers: [3239, 5152],
    iLikedBeer: [5178, 6091],
    iStillLikeBeer: [6241, 7232],
    haveSomeBeers: [8025, 9024],
    oneBeerDrankBeerDrinkBeerDrinkingBeer: [9054, 13215],
    youveProbablyHadBeers: [13159, 14645],
    hangingOutAndHavingSomeBeersWithFriends: [26034, 28438],
  },
});
