import { Howl } from "howler";
import type { Justice } from "./_types";

// ─── Justice Voice Registry ───────────────────────────────────────────────────
//
// Each entry maps a justice name → mood → one or more sprite keys (chosen randomly).
// The sprite key must exist in the Howl instance returned by `justiceHowl()`.
//
// To add a new justice or new clip variants, add an entry here and make sure the
// corresponding Howl file/sprite is defined below. Falls back to silence if the
// sprite isn't found.

type Mood = "happy" | "sad" | "neutral";

interface JusticeVoiceEntry {
  /** Returns the Howl instance containing this justice's sprites. */
  howl: () => Howl;
  clips: Partial<Record<Mood, string[]>>;
}

// Lazy refs so Howl objects are only created once.
let _currentJusticeSounds: Howl | null = null;
function currentJusticeSounds(): Howl {
  if (!_currentJusticeSounds) {
    _currentJusticeSounds = new Howl({
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
  }
  return _currentJusticeSounds;
}

let _historicalJusticeSounds: Howl | null = null;
function historicalJusticeSounds(): Howl {
  if (!_historicalJusticeSounds) {
    _historicalJusticeSounds = new Howl({
      src: ["/audio/court/justicesHistorical.mp3"],
      volume: 0.9,
      sprite: {
        ginsberg: [185, 1332],
        ginsbergHappy: [1517, 1243],
        ginsbergSad: [2760, 1508],
        rehnquist: [4528, 2319],
        rehnquistHappy: [6587, 2169],
        rehnquistSad: [8757, 1966],
        scalia: [10723, 2099],
        scaliaSad: [12787, 1481],
        scaliaHappy: [14286, 1746],
      },
    });
  }
  return _historicalJusticeSounds;
}

let _celebrityJusticeSounds: Howl | null = null;
function celebrityJusticeSounds(): Howl {
  if (!_celebrityJusticeSounds) {
    _celebrityJusticeSounds = new Howl({
      src: ["/audio/court/celebrityJustices.mp3"],
      volume: 0.9,
      sprite: {
        mka: [151, 1950],
        mkaHappy: [2101, 2078],
        mkaSad: [4180, 2043],
        thiel: [6223, 1533],
        thielHappy: [7755, 1672],
        thielSad: [9427, 2090],
        undertaker: [11517, 2113],
        undertakerHappy: [13630, 1997],
        undertakerSad: [15650, 2856],
      },
    });
  }
  return _celebrityJusticeSounds;
}

let _fictionalJusticeSounds: Howl | null = null;
function fictionalJusticeSounds(): Howl {
  if (!_fictionalJusticeSounds) {
    _fictionalJusticeSounds = new Howl({
      src: ["/audio/court/fictionalJustices.mp3"],
      volume: 0.9,
      sprite: {
        mindtaker: [397, 2242],
        mindtakerHappy: [2639, 2216],
        mindtakerSad: [4855, 2165],
        doom: [7160, 1486],
        doomSad: [8646, 1960],
        doomHappy: [10606, 1723],
        lo: [12482, 1950],
        loSad: [14432, 1839],
        loHappy: [16271, 1850],
      },
    });
  }
  return _fictionalJusticeSounds;
}

// Registry — add new justices or variant clips here.
const justiceVoiceRegistry: Record<string, JusticeVoiceEntry> = {
  "John Roberts": {
    howl: currentJusticeSounds,
    clips: { neutral: ["roberts"], sad: ["robertsSad"], happy: ["robertsHappy"] },
  },
  "Clarence Thomas": {
    howl: currentJusticeSounds,
    clips: { neutral: ["thomas"], sad: ["thomasSad"], happy: ["thomasHappy"] },
  },
  "Samuel Alito": {
    howl: currentJusticeSounds,
    clips: { neutral: ["alito"], sad: ["alitoSad"], happy: ["alitoHappy"] },
  },
  "Sonia Sotomayor": {
    howl: currentJusticeSounds,
    clips: { neutral: ["sotomayor"], sad: ["sotomayorSad"], happy: ["sotomayorHappy"] },
  },
  "Elena Kagan": {
    howl: currentJusticeSounds,
    clips: { neutral: ["kagan"], sad: ["kaganSad"], happy: ["kaganHappy"] },
  },
  "Neil Gorsuch": {
    howl: currentJusticeSounds,
    clips: { neutral: ["gorsuch"], sad: ["gorsuchSad"], happy: ["gorsuchHappy"] },
  },
  "Brett Kavanaugh": {
    howl: currentJusticeSounds,
    clips: { neutral: ["kavanaugh"], sad: ["kavanaughSad"], happy: ["kavanaughHappy"] },
  },
  "Amy Coney Barrett": {
    howl: currentJusticeSounds,
    clips: { neutral: ["coneybarrett"], sad: ["coneybarrettSad"], happy: ["coneybarrettHappy"] },
  },
  "Ketanji Brown Jackson": {
    howl: currentJusticeSounds,
    clips: { neutral: ["ketanji"], sad: ["ketanjiSad"], happy: ["ketanjiHappy"] },
  },

  // Historical Justices
  "Ruth Bader Ginsburg": {
    howl: historicalJusticeSounds,
    clips: { neutral: ["ginsberg"], sad: ["ginsbergSad"], happy: ["ginsbergHappy"] },
  },
  "William Rehnquist": {
    howl: historicalJusticeSounds,
    clips: { neutral: ["rehnquist"], sad: ["rehnquistSad"], happy: ["rehnquistHappy"] },
  },
  "Antonin Scalia": {
    howl: historicalJusticeSounds,
    clips: { neutral: ["scalia"], sad: ["scaliaSad"], happy: ["scaliaHappy"] },
  },

  // Celebrity Justices
  "Mary-Kate & Ashley Olsen": {
    howl: celebrityJusticeSounds,
    clips: { neutral: ["mka"], sad: ["mkaSad"], happy: ["mkaHappy"] },
  },
  "Peter Thiel": {
    howl: celebrityJusticeSounds,
    clips: { neutral: ["thiel"], sad: ["thielSad"], happy: ["thielHappy"] },
  },
  "The Undertaker": {
    howl: celebrityJusticeSounds,
    clips: { neutral: ["undertaker"], sad: ["undertakerSad"], happy: ["undertakerHappy"] },
  },

  // Fictional Justices
  "Mentok The Mind Taker": {
    howl: fictionalJusticeSounds,
    clips: { neutral: ["mindtaker"], sad: ["mindtakerSad"], happy: ["mindtakerHappy"] },
  },
  "Judge Doom": {
    howl: fictionalJusticeSounds,
    clips: { neutral: ["doom"], sad: ["doomSad"], happy: ["doomHappy"] },
  },
  "A DVD Boxed Set of Law & Order: SVU": {
    howl: fictionalJusticeSounds,
    clips: { neutral: ["lo"], sad: ["loSad"], happy: ["loHappy"] },
  },
};

// ─── Kavanaugh Beer Mode ──────────────────────────────────────────────────────
// Real audio clips of Brett Kavanaugh discussing beer under oath.
// Triggered as an easter egg when justice-cocktails is played on Kavanaugh.

let _kavanaughLikesBeer: Howl | null = null;
function kavanaughLikesBeer(): Howl {
  if (!_kavanaughLikesBeer) {
    _kavanaughLikesBeer = new Howl({
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
  }
  return _kavanaughLikesBeer;
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

// ─── Voice Utilities ──────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Play a justice's Pokévoice. Picks randomly among variant clips for the mood.
 *  Falls back to neutral if the requested mood has no clips registered.
 *  Silently no-ops if the justice has no entry in the registry. */
export function playJusticeVoice(justice: Justice, sentiment: Mood): void {
  const entry = justiceVoiceRegistry[justice.name];
  if (!entry) return;
  const clips = entry.clips[sentiment] ?? entry.clips.neutral;
  if (!clips?.length) return;
  entry.howl().play(pickRandom(clips));
}

/** Play a random Kavanaugh-on-beer clip. Used when justice-cocktails targets Kavanaugh. */
export function playKavanaughBeer(): void {
  kavanaughLikesBeer().play(pickRandom([...kavanaughBeerSprites]));
}
