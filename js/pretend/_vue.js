// Vue.directive('focus', {
//   // When the bound element is inserted into the DOM...
//   inserted: function (el) {
//     // Focus the element
//     el.focus();
//   }
// });

var app = new Vue({
  el: '#app',
  data: {
    sidebarVisible: false,
    bannerVisible: false,
    canCheat: canCheat,
    guess: '',
    phase: 'question',
    debugMode: true,
    celebrities: impersonators,
    met: [],
    headlineText: [],
    answer: 'correct',
    my: {
      round: 0,
      points: 0,
      correctGuesses: 0,
      score: 0,
      previousScore: 0,
      seenCheese: false,
      stepsToCheese: settings.stepsToCheese,
      mood: null,
      previousMood: null,
      warmUp: true,
      dangerZone: false
    },
    current: {
      pic: '',
      name: '',
      url: '',
      variants: '',
      sex: ''
    },
    feedback: {
      headline: '',
      headlineClass: '',
      showAnswerMessage: false,
      answerMessage: '',
      showMoodMessage: false,
      moodMessage: '',
      showCheeseMessage: false,
      cheeseMessage: ''
    },
    specialScreen: {
      show: false,
      type: null,
      pic: '',
      headline: '',
      message: '',
      gameOver: false
    }
  },

  methods: {

    nextRound() {
      let self = this;

      self.checkSpecialScreens();

      if (self.specialScreen.show == false) {
        self.answer = null;
        self.my.round++;
        self.guess = '';
        self.findImpersonator();
        self.generateHeadline();
        self.phase = 'question';
      }

      if (self.my.round == 5) {
        var audio = new Audio('audio/bylemon.mp3');
        audio.play();
        self.bannerVisible = true;
      }
      
    },

    generateHeadline() {
      let self = this;
      let h;
      if (self.my.round == 1) {
        // Round 1
      } else if (self.warmUp) {
        // You're warming up.
        h = randomFrom(minglingHeadlines);
        self.headlineText = [h[0], h[1]];
      } else {
        h = randomFrom(moodHeadlines[self.my.mood]);
        self.headlineText = [h[0], h[1]];
      }

    },

    findImpersonator: function() {
      let self = this;

      // Who are you going to meet?
      let i = randomFrom(self.celebrities);
      //let i = self.celebrities[88];
      self.current.pic = picPath + i.file;
      self.current.name = i.celebrity;
      self.current.url = i.url;
      self.current.variants = i.variants;
      self.current.sex = i.sex;

      // Did you already meet this person?
      if (stringInArray(self.current.name,self.met)) {
        self.findImpersonator();
      } else {
        self.met.push(self.current.name);
      }
      
    },

    checkSpecialScreens() {
      let self = this;
      if (self.my.seenCheese == false && self.my.stepsToCheese < settings.stepsToCheese) {
        self.cheeseScreen('show');
      } else if (self.dangerZone && self.my.previousMood == 'veryBad' && self.answer == 'wrong') {
        self.specialScreen.show = true;
        self.specialScreen.type = "lose";
        self.specialScreen.pic = 'img/pretend/gameover/lose-mobile.jpg';
        self.specialScreen.headline = "You lose!";
        self.specialScreen.message = "Having experienced significant problems assessing the identities of the guests as well as what others at this party would consider socially acceptable, you are told to leave.<br/><br />An hour later, you find yourself at a Taco Bell getting sick on chaulpas, and tell a Larry The Cable Guy impersonator that he's your best friend. That is the saddest moment you've ever had.";
        self.specialScreen.gameOver = true;
        socket.emit('pretendGameOver', {
          gameState:  "lose"
        });
        sendEvent('Game Over', 'Lose', 'Round '+self.my.round);
      } else if (self.my.stepsToCheese < 1) {
        self.specialScreen.show = true;
        self.specialScreen.type = "win";
        self.specialScreen.pic = 'img/pretend/gameover/win-mobile.jpg';
        self.specialScreen.headline = "You win!";
        self.specialScreen.message = "";
        self.specialScreen.gameOver = true;
        socket.emit('pretendGameOver', {
          gameState:  "win"
        });
        sendEvent('Game Over', 'Win', 'Round '+self.my.round);
      }
    },

    checkName() {
      let self = this;
      let correctGuess = false;
      if (self.guess.toLowerCase() == self.current.name.toLowerCase() || self.guess == 'xxxx') {
        // 100% correct
        self.answer = 'correct';
        correctGuess = true;
      } else if (self.current.variants) {
        self.current.variants.forEach(v => {
          if (self.guess.toLowerCase() == v.toLowerCase() ) {
            // Acceptable variant.
            correctGuess = true;
            self.answer = 'close';
          }
        });
      
      }
      
      if (correctGuess == false) {
        let score = similarity(self.current.name,self.guess);
        if (score > 0.71) { 
          // Your spelling was off, but this is close enough.
          self.answer = 'close';
          correctGuess = true;
        } else {
          // NOTE TO LEMON: Allow something here for the wrong answers you suspected.
          self.answer = 'wrong';
        }
      }

      if (self.my.round < 2) {
        socket.emit('pretendGameStart', {
          correctName:  self.current.name
        });
      }

      if (self.answer == 'correct') {
        self.my.points = self.my.points + 1;
        self.my.correctGuesses++;
        socket.emit('pretendCorrectGuess', {
          correctName:  self.current.name
        });
      } else if (self.answer == 'close') {
        self.my.points = self.my.points + 0.7;
        self.my.correctGuesses++;
        socket.emit('pretendCloseGuess', {
          correctName: self.current.name,
          guessedName: self.guess
        });
      } else if (self.answer == 'wrong') {
        self.my.points = self.my.points - 0.85;
        socket.emit('pretendBadGuess', {
          correctName: self.current.name,
          guessedName: self.guess
        });
      }

      sendEvent(self.answer, self.current.name, self.guess);
      self.generateFeedback();
      self.phase = 'answer';
    },

    generateAnswerFeedback() {
      let self = this;
      self.feedback.headlineClass = self.answer;


      // Generate the Answer Feedback
      if (self.answer == "correct") { 
        self.feedback.headline = randomFrom(correctHeadlines); 

        let correctMessages = [
          [
            "The "+bold(self.current.name)+" impersonator ",
              [
                "brings you a drink",
                "shakes your hand a bit too aggressively",
                "introduces " +self.himself +" ",
                "smiles widely ",
                "lets you touch "+self.his+" hair",
                "playfully tweaks your nose",
                "asks if you can link up on Ello",
                "offers you a cigarette",
              ],
                ", and you chat for a bit about ",
                  [ 
                    "the Philadelphia Eagles.",
                    "Trump.",
                    "the United Nations and Palestine.", 
                    "utter nonsense.",
                    "cocktail recipes.",
                    "lawn maintenance.",
                    "penny stocks.",
                    "methods of hypnosis.",
                    "your mutual appreciation for The Beatnuts",
                    "your favorite recurring dreams",
                    "pickled cabbage and the LA Kings",
                    "that river in Ohio that used to catch fire all the time",
                    "crimes"
                  ]
          ],
          [
            capitalize(self.he)+ " introduces you to ",
              [
                "a Jimmy Carr impersonator",
                "this one guy who might be Glenn Danzig",
                "one of those mimes who dresses like a robot",
                "someone who claims to be one of the Daft Punk guys",
                self.his+" neighbor Catherine"
              ],
                ", and the three of you ",
                  [
                    "play a couple rounds of Uno.",
                    "name your favorite episodes of <i>Silicon Valley</i>.",
                    "make utterly baseless guesses about who at the party is sleeping together.",
                    "trade recipes for polenta.",
                    "discuss how well "+self.current.name+" aged.",
                    "brainstorm an ideal <i>Match Game</i> cast.",
                    "discuss your respective skin care routines"
                  ]
          ]
        ];

        self.feedback.answerMessage = workThisArray(correctMessages);

      } else if (self.answer == "close") { 
        self.feedback.headline = randomFrom(closeHeadlines); 

        let closeMessages = [
          [
            capitalize(self.he) + ' is actually a ' +bold(self.current.name)+ ' impersonator,',
              [
                'but '+self.he+' chalks up the mistake to you having a speech impediment, which you now have to pretend for the rest of the night',
                'but '+self.he+' just assumes you&apos;e illiterate. To futher the ruse, you write down "HALO, NISE 2 MEET U :)" on a piece of paper.',
                'but blames the misspelling on your mouthful of Ritz crackers. You continue to make small talk, spitting crumbs in '+self.his+' face.'
              ]
          ],
          [
            "“"+self.guess+", right?” you ask.",
              [ 
                self.he+" looks at you quizzically. “"+bold(self.current.name)+" actually.” “That's what I said. "+self.current.name+".” You confidently reply.",
                "“Did you say "+self.current.name+" or "+self.guess+"?” "+self.he+" asks you. “Which is the right one?” you reply. “What?” "+self.he+" he asks. You then ask if "+self.he+" wants to see a magic trick, but do not perform one.",
                "“You mean "+self.current.name+"” he asks. You tell him that's what you meant."
              ]
          ],
          [
            "“You kinda look like "+self.guess+".” you tell "+self.him+". ",
              [ 
                "“Kind of looking like "+bold(self.current.name)+" is kind of what I do!” he says. You laugh politely.",
                capitalize(self.he) + " thanks you for saying so, and doesn't correct you by pronouncing it "+bold(self.current.name)+"."
              ]
          ],
          [
            "The "+bold(self.current.name)+" impersonator weighs the pros and cons of correcting you, and ultimately ",
              [
                "points over your shoulder and shouts “Is that Beyoncé!?” but your back is to the wall. You see "+self.him+" give a sad look, and finally turn around out of politeness.",
                "realizing life is too short, "+self.he+" mutters “Sure.” and then pushes past you.",
                "sighs, pinches the bridge of "+self.his+" nose, and just kind of stands there. After three minutes, you realize "+self.he+" has fallen asleep.",
                "decides on chewing scenery. “"+self.guess+"!!??” "+self.he+" bellows, and then gives a perfomative sob with "+self.his+" face in the crook of "+self.his+" elbow. Nearby guests politely applaud.",
                "hands you a business card that says “"+self.current.name+". (Not "+self.guess+")” and slinks away.",
                "throws an arm around your shoulders and says “close enough!” As the heartbreak of halitosis sinks in, you realize it might be <i>too</i> close."
              ]

          ]
        ];
        self.feedback.answerMessage = workThisArray(closeMessages);

      } else if (self.answer == "wrong") { 
        self.feedback.headline = randomFrom(wrongHeadlines); 
        let wrongMessages = [
          [
            "The  "+bold(self.current.name)+" impersonator ",
              [ 
                "looks visibly annoyed that",
                "is furious",
                "seems genuinely hurt that",
                "is super bummed",
                "can not believe"
              ],
                " you mistook " +self.him+" for "+self.guess+". ",
                  [ 
                    "You apologize profusely and "+self.he+" seems placated.",
                    "You distract "+self.him+" by asking "+self.his+" workout routine.",
                    "You lift your shirt collar over your face and "+self.he+" goes away.",
                    "You try to change topics, but the only one you can think of is javascript, and nobody <i>ever</i> wants to talk about javascript.",
                    "So "+self.he+" tells you about "+self.his+" time at "+self.current.name+" school and how good "+self.his+" grades were. This goes on for some time."
                  ]
          ],
          [
            "“"+self.guess+"!” you scream, and the "+bold(self.current.name)+" impersonator ",
              [
                "takes a wild punch at your nose, missing by a good foot.",
                "spits directly into your mouth.",
                "breaks down into tears.",
                "loudly calls your citizenship into question.",
                "makes a sound like “GGLLLGGGGRG”, which you find very distressing.",
                "screams “You'll never work in this town again!”",
                "screams “NO!”",
                "says he feels sorry for you."
              ],
                " ",
                  [
                    "That could have gone better.",
                    "You'll have to do better.",
                    "You feel genuine shame.",
                    "You fold your arms and look around the room for a couple minutes.",
                    "You apologize, and "+self.he+" immediately forgives you.",
                    "You apologize, but "+self.he+" doesn't forgive you.",
                    "“Pistols at dawn!” "+capitalize(self.he)+" declares. “And pray you're a better shot than "+self.guess+" was!”"
                  ]
          ],
          [
            capitalize(self.he)+ " stares at you ",
              [
                "and holds your gaze for a full minute.",
                "and stands unblinking.",
                "in a way that's vaguely erotic.",
                "in a piercing gaze you find terrifying.",
                "and aggressively chews a stick of gum.",
                "angrily."
              ],
                " “"+bold(self.current.name)+"!” "+self.he+" screams ",
                [
                  "directly into your face.",
                  "and you excuse yourself to the bathroom to break "+self.his+" line of sight.",
                  "and you weep openly in front of "+self.him+".",
                  "and the whole party turns to look at you.",
                  "and then snaps his teeth at you, like Val Kilmer in Top gun. Perhaps not intimidating, but <i>definitely</i> unsettling"
                ]
          ]
        ];
        self.feedback.answerMessage = workThisArray(wrongMessages);
      }

      self.feedback.showAnswerMessage = true;

    },

    checkPartyMood() {
      let self = this;
      self.my.previousScore = self.my.score;
      self.my.previousMood = self.my.mood;

      self.my.score = (self.my.points / self.my.round).toFixed(2);

      // Generate the Mood Score
      if (self.my.score > 0.69) {
        self.my.mood = "veryGood";
      } else if (self.my.score > 0.39) {
        self.my.mood = "prettyGood";
      } else if (self.my.score > 0.19) {
        self.my.mood = "neutral";
      } else if (self.my.score > -0.19) {
        self.my.mood = "prettyBad";
      } else {
        self.my.mood = "veryBad";
      }

      // Mood Score Feedback
      if (self.my.mood != self.my.previousMood) {
        self.feedback.showMoodMessage = true;
        self.feedback.moodMessage = randomFrom(partyMoods[self.my.mood]);
      } else if (testChance(37)) {
        // a certain liklihood that it will display the general mood of the party, without specifically referencing your status.
        self.feedback.showMoodMessage = true; 
        let f = partyMoods[self.my.mood];
        self.feedback.moodMessage = randomFrom(f.concat(partyMoods.noChange));
      } else {
        self.feedback.showMoodMessage = false;
        self.feedback.moodMessage = null;
      }

    },

    cheeseScreen(t) {
      let self = this;

      if (t == 'hide') {
        self.specialScreen.show = false;
        self.nextRound();
      } else if (t == 'show') {
        self.my.seenCheese = true;
        self.specialScreen.show = true;
        self.specialScreen.type = "cheese";
        self.specialScreen.pic = 'img/pretend/cheeselog/desktop.jpg';

        self.specialScreen.headline = randomFrom(cheeseIntroHeadlines);
        self.specialScreen.message = randomFrom(cheeseIntroMessages);
        self.specialScreen.message += ' [ ' +self.my.stepsToCheese+ ' steps away ]';
      }

    },

    checkTheCheese() {
      let self = this;

      if (self.answer != "wrong") {
        self.my.stepsToCheese--;

        let f = cheeseStatus.any;

        if (self.my.stepsToCheese > (settings.stepsToCheese * 0.66)) {
          // You are far from the cheese
          f.concat(cheeseStatus.far);
        } else if (self.my.stepsToCheese > (settings.stepsToCheese * 0.33)) {
          // You are medium distance from the cheese
          f.concat(cheeseStatus.medium);
        } else {
          // You are close to the cheese
          f.concat(cheeseStatus.close);
        }

        self.feedback.showCheeseMessage = true;
        self.feedback.cheeseMessage = randomFrom(f);

      } else {
        // LEMON: Maybe an infrequent cheese cheeck here? Maybe?
        self.feedback.showCheeseMessage = false;
      }

    },

    toggleDrawer: function() {
      var self = this;
      self.sidebarVisible = !self.sidebarVisible;
      if (self.sidebarVisible) {
        sendEvent('Info Drawer Opened', 'Drawer Open');
      }
    },

    generateFeedback() {
      //this.checkDanger();
      this.generateAnswerFeedback();
      this.checkPartyMood();
      this.checkTheCheese();
    },
    
    visitImpersonatorWebsite() {
      let self = this;
      sendEvent('Impersonator Website', self.current.name, self.current.url);
      window.open(self.current.url, '_blank', 'location=yes,height=600,width=960,scrollbars=yes,status=yes');
    },

    visitIllustratorWebsite() {
      let self = this;
      sendEvent('Illustrator Website', 'Sanguinary Novel', 'https://twitter.com/aberrantwhimsy');
      window.open('https://twitter.com/aberrantwhimsy', '_blank', 'location=yes,height=600,width=960,scrollbars=yes,status=yes');
    }
    
  },

  computed: {
    
    warmUp() {
      if (this.my.round > settings.warmUpRounds) {
        return false;
      } else {
        return true;
      }
    },

    dangerZone() {
      if (this.my.mood == 'veryBad' && !this.warmUp) {
        return true;
      } else {
        return false;
      }
    },

    myScore() {
      return (this.my.points / this.my.round);
    },

    // Pronouns
    his() {
      if (this.current.sex == 'm') { return 'his'; } 
      else if (this.current.sex == 'f') { return 'her'; }
    },

    he() {
      if (this.current.sex == 'm') { return 'he'; } 
      else if (this.current.sex == 'f') { return 'she'; }
    },
    him() {
      if (this.current.sex == 'm') { return 'him'; } 
      else if (this.current.sex == 'f') { return 'her'; }
    },
    himself() {
      if (this.current.sex == 'm') { return 'himself'; } 
      else if (this.current.sex == 'f') { return 'herself'; }
    }
  },

  beforeMount: function() {
    this.nextRound();
  },
  afterMount: function() {
    alert('yeah hi');
  }

});