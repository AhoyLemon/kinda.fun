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

export function resetRoundVariables() {
  round.phase = "presenting";
  round.activePlayerIndex = -1;
  round.dealerIndex = 0;
  round.playerPresenting = false;
  round.presentationTimer = undefined;
  round.presentationTimeLeft = settings.timeToPresent;
  round.cardsPresented = [];
  round.votesSubmitted = 0;
}

export function resetUIVariables() {
  ui.upVoteIndex = -1;
  ui.downVoteIndex = -1;
  ui.iVoted = false;
}

export function changeFavicon(src) {
  var link = document.createElement("link"),
    oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}
