const audioSrc = "audio/";

/////////////////////////////////
// Lobby Sounds
export const musicLobby = new Howl({
  src: [
    audioSrc + "invalid/lobby-music.mp3",
    audioSrc + "invalid/lobby-music.ogg",
  ],
  volume: 0.6,
  loop: true,
});

/////////////////////////////////
// Employee Sounds
export const soundOink = new Howl({
  src: [audioSrc + "oink1.mp3"],
  volume: 0.9,
});

export const soundNewRule = new Howl({
  src: [audioSrc + "odqid3.mp3"],
  volume: 0.25,
});

export const soundinvalidStartGuessing = new Howl({
  src: [audioSrc + "0dln84.mp3"],
  volume: 0.6,
});

export const soundBadGuess = new Howl({
  src: [audioSrc + "3ge4hh-2.mp3"],
  volume: 0.55,
});

export const soundCorrectGuess = new Howl({
  src: [audioSrc + "pi392f.mp3"],
  volume: 0.8,
});

export const soundSystemCrash = new Howl({
  src: [audioSrc + "unngxf.mp3"],
  volume: 0.8,
});

/////////////////////////////////
// Final Round Sounds.
export const soundCorrect = new Howl({
  src: [audioSrc + "correct.mp3"],
});

export const soundNo = new Howl({
  src: [audioSrc + "no2.mp3"],
});

export const soundCracked = new Howl({
  src: [audioSrc + "password_cracked.mp3"],
  volume: 1,
});

export const soundYouIdiot = new Howl({
  src: [audioSrc + "you_idiot.mp3"],
  volume: 1,
});

export const soundTooSlow = new Howl({
  src: [audioSrc + "too_slow.mp3"],
  volume: 1,
});

/////////////////////////////////
// Game Over sounds.

export const musicFinalRound = new Howl({
  src: [audioSrc + "invalid/crack-music-with-intro.mp3"],
  volume: 0.72,
  loop: true,
});

export const soundFinalRoundOver = new Howl({
  src: [audioSrc + "invalid/crack-gong.mp3"],
});

export const soundGameOver = new Howl({
  src: [audioSrc + "end-song.mp3"],
});
