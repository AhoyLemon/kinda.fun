import type { GameState, MyState, RoundState, UIState } from "./_types";
import { settings } from "./_variables";

/* eslint-disable no-unused-vars */
interface WrongestHelpersDeps {
  game: GameState;
  my: MyState;
  round: RoundState;
  ui: UIState;
  onPresentationFinished: () => void;
  sendEvent: (...args: [string, string, string]) => void;
}
/* eslint-enable no-unused-vars */

export function useWrongestHelpers({
  game,
  my,
  round,
  ui,
  onPresentationFinished,
  sendEvent,
}: WrongestHelpersDeps) {
  function amIPresenting(): boolean {
    return round.playerPresenting === true && round.activePlayerIndex === my.playerIndex;
  }

  function watchVideo(): void {
    ui.watchingVideo = true;
    sendEvent("The Wrongest Words", "Instruction Video", game.inRoom ? "Pregame Screen" : "Title Screen");
  }

  function closeInstructionVideo(): void {
    if (ui.isClosingVideo) {
      return;
    }

    ui.isClosingVideo = true;
    window.setTimeout(() => {
      ui.watchingVideo = false;
      ui.isClosingVideo = false;
    }, 150);
  }

  function normalizePlayerName(name: string): string {
    let normalizedName = name.trim();

    const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      normalizedName,
    );

    if (!hasEmoji) {
      normalizedName = normalizedName.toUpperCase();
    }

    return normalizedName;
  }

  function startPresentationTimer(): void {
    round.presentationTimeLeft = settings.timeToPresent;
    round.presentationTimer = setInterval(() => {
      round.presentationTimeLeft -= 0.05;
      if (round.presentationTimeLeft <= 0 && amIPresenting()) {
        onPresentationFinished();
      }
    }, 50);
  }

  function resetPresentationTimer(): void {
    clearInterval(round.presentationTimer);
    round.presentationTimer = undefined;
    round.presentationTimeLeft = settings.timeToPresent;
  }

  function cardText(txt: string): string {
    if (game.gameStarted && amIPresenting()) {
      return txt.replace(/\{/g, '<span class="secret-text">').replace(/\}/g, "</span>");
    }

    if (round.phase === "presenting" && round.activePlayerIndex < my.playerIndex) {
      return txt.replace(/\{.*?\}/, "...");
    }

    return txt.replace(/[{}]/g, "");
  }

  function changeFavicon(src: string): void {
    const link = document.createElement("link");
    const oldLink = document.getElementById("dynamic-favicon");

    link.id = "dynamic-favicon";
    link.rel = "shortcut icon";
    link.href = src;

    if (oldLink) {
      document.head.removeChild(oldLink);
    }

    document.head.appendChild(link);
  }

  return {
    watchVideo,
    closeInstructionVideo,
    normalizePlayerName,
    startPresentationTimer,
    resetPresentationTimer,
    cardText,
    changeFavicon,
  };
}
