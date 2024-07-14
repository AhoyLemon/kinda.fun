// socketHandlers.js
import { game, you } from "./_variables";

// Toasts
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import MyToast from "../vue/MyToast.vue";
//import LemonToast from "./vue/LemonToast.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

export const setupSocketHandlers = (socket) => {
  socket.on("hostSelected", (hostSocketId) => {
    console.log(`Host selected: ${hostSocketId}`);
    if (socket.id === hostSocketId) {
      you.isHost = true;
      console.log("You are the host!");
    } else {
      you.isHost = false;
      console.log("You are not the host.");
    }
    // Add any additional logic for the host or non-host here
  });

  socket.on("receivePlayerList", (msg) => {
    console.log(`Receiving new player list from  ${msg.from}`);
    // console.table(msg.players);
    game.players = msg.players;
    game.isGameStarted = msg.isGameStarted;
  });

  socket.on("sendThePlayerListIfYouAreHost", (msg) => {
    console.log(`Player List request from  ${msg.from}`);
    if (you.isHost) {
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        from: you.socketID,
        players: game.players,
        isGameStarted: game.isGameStarted,
      });
    }
  });

  socket.on("handleDisconnectIfYouAreHost", (socketID) => {
    console.log("SOMEBODY DISCONNECTED!");
    if (you.isHost) {
      console.log("And I'm the host");
      // Find the index of the player with the matching socketID
      const playerIndex = game.players.findIndex(
        (player) => player.socketID === socketID,
      );
      if (playerIndex !== -1) {
        console.log("I'm removing that player from the player list");
        game.players.splice(playerIndex, 1);
      }
      console.log("And now I'm updating the other players.");
      socket.emit("sendPlayerList", {
        roomCode: game.roomCode,
        from: you.socketID,
        players: game.players,
      });
    }
  });

  socket.on("receiveStartGameMessage", (msg) => {
    console.log(`Receiving new player list from  ${msg.from}`);
    game.players = msg.players;
    game.isGameStarted = true;
  });
};
