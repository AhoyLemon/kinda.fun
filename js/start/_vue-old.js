var app = new Vue({
  el: '#app',
  data: {
    roomCode: "",
    gameChoice: ""
  },

  methods: {


    setActiveGame(toWhat) {
      const self = this;
      if (self.gameChoice && toWhat === self.gameChoice) {
        self.gameChoice = ""
      } else {
        self.gameChoice = toWhat;
      }
    },

    createRoom() {
      const self = this;

      function makeID(digits) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      
        for (let i = 0; i < digits; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

      self.roomCode = makeID(4);

      // Create a room with the randomly generated code.
      socket.emit('createRoom', self.roomCode);

      // Set your local variables.
      self.isRoomHost = true;
      self.inRoom = true;
      const url = new URL(window.location + "" + self.gameChoice + "?create");
      location.assign(url);
      
    },

    joinRoom() {
      const self = this;
      const url = new URL(window.location + "" + self.gameChoice + "?join");
      location.assign(url);
    },

    startSinglePlayerGame() {
      const self = this;

      if (self.gameChoice === "damndog") {
        location.assign("https://damn.dog");
      } else if (self.gameChoice === "idiots") {
        location.assign("https://idiots.win");
      } else if (self.gameChoice === "party") {
        location.assign("https://partypartypartyparty.party");
      } else {
        const url = new URL(window.location + "" + self.gameChoice);
        location.assign(url);
      }
    }
  },

  computed: {

  },

  mounted: function() {

  }

});