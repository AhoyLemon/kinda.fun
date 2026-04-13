import { Howl } from "howler";
import type { Justice } from "./_types";

// ─── Current Justice Voices ───────────────────────────────────────────────────
// Each justice has three readings: neutral (name only), sad, and happy.
// Justices speak their own name like Pokémon — see featureFlags.usePokevoice.

export const currentJusticeSounds = new Howl({
  src: ["/audio/court/justicesCurrent.mp3"],
  volume: 0.9,
  sprite: {
    roberts: [296, 801],
    robertsSad: [1916, 1167],
    robertsHappy: [3379, 1057],
    thomas: [4986, 679],
    thomasSad: [6026, 778],
    thomasHappy: [7361, 946],
    alito: [9033, 1074],
    alitoSad: [10789, 1178],
    alitoHappy: [12547, 1104],
    sotomayor: [14187, 1445],
    sotomayorSad: [16231, 1405],
    sotomayorHappy: [18135, 1800],
    kagan: [20904, 929],
    kaganSad: [22001, 1039],
    kaganHappy: [23174, 969],
    gorsuch: [24636, 1051],
    gorsuchSad: [26448, 1138],
    gorsuchHappy: [28386, 894],
    kavanaugh: [29675, 894],
    kavanaughSad: [30784, 1225],
    kavanaughHappy: [32090, 1138],
    coneybarrett: [34122, 952],
    coneybarrettSad: [35683, 1318],
    coneybarrettHappy: [37541, 987],
    ketanji: [38899, 1173],
    ketanjiSad: [40867, 1167],
    ketanjiHappy: [42899, 1173],
  },
});

// ─── Kavanaugh Beer Mode ──────────────────────────────────────────────────────
// Real audio clips of Brett Kavanaugh discussing beer under oath.
// Triggered as an easter egg when justice-cocktails is played on Kavanaugh.

export const kavanaughLikesBeer = new Howl({
  src: ["/audio/court/drankBeer.mp3"],
  volume: 0.9,
  sprite: {
    iDrankBeerWithMyFriends: [978, 1719],
    sometimesIHadTooManyBeers: [3317, 1796],
    iLikedBeer: [5173, 986],
    iStillLikeBeer: [6241, 986],
    haveSomeBeers: [8038, 1021],
    oneBeerDrankBeerDrinkBeerDrinkingBeer: [9067, 4226],
    youveProbablyHadBeers: [13310, 1335],
    hangingOutAndHavingSomeBeersWithFriends: [26017, 2399],
  },
});

// ─── Voice Utilities ──────────────────────────────────────────────────────────

const justiceNameToSpriteKey: Record<string, string> = {
  "John Roberts": "roberts",
  "Clarence Thomas": "thomas",
  "Samuel Alito": "alito",
  "Sonia Sotomayor": "sotomayor",
  "Elena Kagan": "kagan",
  "Neil Gorsuch": "gorsuch",
  "Brett Kavanaugh": "kavanaugh",
  "Amy Coney Barrett": "coneybarrett",
  "Ketanji Brown Jackson": "ketanji",
};

/** Play a justice's Pokévoice. Only works for current justices who have a sprite. */
export function playJusticeVoice(justice: Justice, sentiment: "happy" | "sad" | "neutral"): void {
  const baseKey = justiceNameToSpriteKey[justice.name];
  if (!baseKey) return;
  const suffix = sentiment === "happy" ? "Happy" : sentiment === "sad" ? "Sad" : "";
  currentJusticeSounds.play(`${baseKey}${suffix}`);
}

const kavanaughBeerSprites = [
  "iDrankBeerWithMyFriends",
  "sometimesIHadTooManyBeers",
  "iLikedBeer",
  "iStillLikeBeer",
  "haveSomeBeers",
  "oneBeerDrankBeerDrinkBeerDrinkingBeer",
  "youveProbablyHadBeers",
  "hangingOutAndHavingSomeBeersWithFriends",
] as const;

/** Play a random Kavanaugh-on-beer clip. Used when justice-cocktails targets Kavanaugh. */
export function playKavanaughBeer(): void {
  const sprite = kavanaughBeerSprites[Math.floor(Math.random() * kavanaughBeerSprites.length)];
  kavanaughLikesBeer.play(sprite);
}
