import { game, you } from "./_variables";

import { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import MyToast from "../vue/MyToast.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

interface Socket {
  id: string;
  on(event: string, handler: (...args: unknown[]) => void): void;
  emit(event: string, data?: unknown): void;
}

export const setupSocketHandlers = (socket: Socket): void => {
  socket.on("hostSelected", (hostSocketId) => {
    if (socket.id === hostSocketId) {
      you.isHost = true;
    } else {
      you.isHost = false;
    }
  });

  socket.on("receivePlayerList", (msg) => {
    const message = msg as { from: string; players: unknown[]; isGameStarted: boolean };
    game.players = message.players;
    game.isGameStarted = message.isGameStarted;
  });

  socket.on("sendThePlayerListIfYouAreHost", () => {
    if (you.isHost) {
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        players: game.players,
        isGameStarted: game.isGameStarted,
      });
    }
  });

  socket.on("handleDisconnectIfYouAreHost", (socketID) => {
    if (you.isHost) {
      const playerIndex = (game.players as { socketID: string }[]).findIndex(
        (player) => player.socketID === socketID,
      );
      if (playerIndex !== -1) {
        game.players.splice(playerIndex, 1);
      }
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        players: game.players,
      });
    }
  });

  socket.on("receiveStartGameMessage", (msg) => {
    const message = msg as { from: string; players: unknown[] };
    game.players = message.players;
    game.isGameStarted = true;
  });

  socket.on("receiveEndGameCommand", (msg) => {
    const message = msg as { from: string; players: unknown[]; badGuesses: unknown[] };
    game.players = message.players;
    game.badGuesses = message.badGuesses;
    game.isGameOver = true;
  });
};
