const app = new Vue({
  el: "#app",
  data: {
    currentThing: {
      slug: "",
      name: "",
      slogan: "",
      description: "",
      url: "",
      isMultiplayer: false,
      buttonText: "",
    },
    currentFilter: "",
    isListRandomized: false,

    thingData: {
      cameo: {
        name: "Comparatively Famous",
        slug: "cameo",
        logo: "comparativelyfamous.svg",
        slogan: "The game of relative celebrity value",
        description: `<p>This game will give you a list of celebrities, and then ask you to sort them by their listed value on <strong>Cameo</strong>.</p>`,
        url: "https://kinda.fun/cameo",
        tags: ["game", "single player", "celebrities", "trivia"],
      },
      greatsextips: {
        name: "Great Sex Tips!",
        slug: "greatsextips",
        logo: "greatsextips.svg",
        slogan: "The only website that knows what your boyfriend likes.",
        description: `<p>For over a hundred years women's magazines have published counterproductive sex advice. I think the computer can do better.</p>`,
        url: "https://sextips.ahoylemon.xyz",
        tags: ["list", "lies", "tool", "robot"],
        buttonText: "Generate Tips",
      },
      guillotine: {
        name: "No More Billionaires",
        slug: "guillotine",
        logo: "nomorebillionaires.svg",
        slogan: "Generating wealth with a guillotine",
        description: `<p>This is a single player game about funding public schools by executing the world's richest people. A new list of billionaires is generated every day!</p>`,
        url: "https://kinda.fun/guillotine",
        tags: ["game", "single player", "new content every day"],
        buttonText: "Genearate wealth.",
      },
      sisyphus: {
        name: "Sisyphus Clicker",
        slug: "sisyphus",
        logo: "sisyphusclicker.svg",
        slogan: "Life can be depressing. This game especially so.",
        description: `<p>This is a clicker-style game where you take on the role of sisyphus and push the rock uphill. <strong>You will never succeed.</strong> But at least you can earn achievements?</p>`,
        url: "https://kinda.fun/sisyphus",
        buttonText: "Suffer.",
        tags: ["game", "single player", "clicker"],
      },
      damndog: {
        name: "damn dog",
        slug: "damndog",
        logo: "damndog.svg",
        slogan: "The wikiHow  illustration game",
        description: `<p>There's a lot of strange how to guides on wikiHow, and a lot of strange illustrations to go with them. You'll be presented with one of hundreds of hand-curated illustrations, and then it's up to you to figure out what article it was from.</p>`,
        url: "https://damn.dog",
        buttonText: "",
        tags: ["game", "single player", "guess"],
      },
      pretend: {
        name: "Pretend World",
        slug: "pretend",
        logo: "pretendworld.svg",
        slogan: "The game of bad impersonations and good cheese logs",
        description: `<p>You find yourself at a cocktail party populated entirely with celebrity impersonators, and you see the perfect cheese log. To get to it, you must guess who is impersonating whom.</p>`,
        url: "https://kinda.fun/pretend",
        tags: ["game", "single player", "celebrities", "guess"],
      },
      invalid: {
        name: "Invalid",
        slug: "invalid",
        logo: "invalid.svg",
        slogan: "A trivia game of unnecessary suffering.",
        description: `<p>This is a multiplayer competitive triva game <strong>(best with 4-8 players)</strong> where all players are working at the same company, and all they want to do is create a password. The SysAdmin's job is to make their life difficult.</p>`,
        url: "https://kinda.fun/invalid",
        buttonText: "",
        isMultiplayer: true,
        tags: ["game", "multiplayer", "trivia", "guess"],
      },
      wrongest: {
        name: "The Wrongest Words",
        slug: "wrongest",
        logo: "thewrongestwords.svg",
        slogan: "The game where you defend some very stupid ideas.",
        description: `<p>Gather together a group of <strong>5 - 10 players</strong> and get ready to talk nonsense. You'll get a card with an untrue statement on it, and it's your job to convince you're friends your statement is the least wrong.</p>`,
        url: "https://kinda.fun/wrongest",
        isMultiplayer: true,
        tags: ["game", "multiplayer", "lies", "party"],
      },

      idiotswin: {
        name: "Idiots win.",
        slug: "idiotswin",
        logo: "idiotswin.svg",
        slogan: "The search game where you guess like an idiot.",
        description: `<p>Each round of idiots win will start with a preselected query, such as "how can I", and send that to Google for autocomplete suggestions. You then have to guess which is the #1 result.</p>`,
        url: "https://idiots.win",
        buttonText: "",
        tags: ["game", "single player", "guess"],
      },
      party: {
        name: "PARTYPARTYPARTYPARTY.PARTY",
        slug: "party",
        logo: "partypartypartypartyparty.svg",
        slogan: "This is a button that helps you party.",
        description: `<p>PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY PARTY.</p>`,
        url: "https://partypartypartyparty.party",
        buttonText: "PARTY",
        tags: ["a button", "tool", "party", "sounds"],
      },
      sane: {
        name: "SANE SCIENCE",
        slug: "sane",
        logo: "sanescience.svg",
        slogan: "This mental health exam is gaslighting you.",
        description: `<p><strong>Want a sticker that certifies you as sane?</strong> Sure you do. Well then, all you have to do is answer a series of questions that have been intentionally designed to make you question your sanity.</p>`,
        url: "https://sane.science",
        buttonText: "Take the test.",
        tags: ["test"],
      },
      verifiablewin: {
        name: "Verifiable Win",
        slug: "verifiablewin",
        logo: "verifiablewin.svg",
        slogan: "All the proof you need to insist that you're right",
        description: `<p>Are you in an argument with someone and you need some kind of chart to prove that you're right, but you don't actually want to do any research whatsoever? Use this tool to create a chart proving whatever you like.</p>`,
        url: "https://ahoylemon.github.io/verifiable.win",
        tags: ["tool", "chart"],
        buttonText: "Generate a chart",
      },
      ready: {
        name: "Are you ready for this?",
        slug: "ready",
        logo: "ready.svg",
        slogan: "formerly 2un.ltd",
        description: `<p>This little webapp really wants to know: <strong>Are you ready for this</strong>? Because if you are, it will take the appropriate measures. But it will probably need to keep checking in.</p>`,
        url: "https://ready.ahoylemon.xyz",
        tags: ["tool", "party", "sounds"],
        buttonText: "Check your readiness",
      },
      bg2cool: {
        name: "BG2COOL",
        slug: "bg2cool",
        logo: "bg2cool.svg",
        slogan: "THAT'S ENOUGH FUCKING MINIMALISM.",
        description: `<p>If you're tired of writing the same CSS properties over and over again, maybe it's time to try something tacky. You select the options, and BG2COOL will give you the CSS.</p>`,
        url: "https://ahoylemon.github.io/BG2COOL/",
        tags: ["tool", "web development"],
        buttonText: "Make something cool.",
      },
      nicki: {
        name: "Is this Nicki Minaj?",
        slug: "nicki",
        logo: "isthisnickiminaj.svg",
        slogan: "A true test of intelligence",
        description: `<p>There's a lot of people, places, and things in the world. Can <strong>you</strong> tell which of those things are Nicki Minaj?</p>`,
        url: "https://isthisnickiminaj.com",
        tags: ["test", "celebrities"],
        buttonText: "Take the test.",
      },
      notpoutine: {
        name: "That's Not Poutine.",
        slug: "notpoutine",
        logo: "notpoutine.svg",
        slogan: "A global archive of Poutine Crimes",
        description: `<p>Poutine is a dish with 3 rules: It must contain french fries, fresh cheese curds, and brown gravy.</p><p>This is an archive of things that call themselves poutine, but are not poutine.</p>`,
        url: "https://notpoutine.ahoylemon.xyz",
        tags: ["list"],
        buttonText: "Witness crimes!",
      },
      frankwest: {
        name: "Frank West pronounces emoticons for you",
        slug: "frankwest",
        logo: "frankwest.svg",
        slogan: "For me? Thanks Frank!",
        description: `<p>ᕕ( ᐛ )ᕗ</p>`,
        url: "https://ahoylemon.github.io/frankwest",
        tags: ["list", "sounds"],
        buttonText: "O_o",
      },
      jerking: {
        name: "Jerking",
        slug: "jerking",
        logo: "jerking.svg",
        slogan: "New parody porn titles every day",
        description: `<p>Using an incredibly long list of (made up) parody porn titles written over the years, this site provides the top 20 box office every day, really just as an excuse to giggle over the titles themselves.</p>`,
        url: "https://jerking.ahoylemon.xyz",
        tags: ["list", "new content every day"],
        buttonText: "Start gigglin",
      },
      hamiltondoom: {
        name: "Hamilton -> DOOM",
        slug: "hamiltondoom",
        logo: "hamiltondoom.svg",
        slogan:
          "You. 👏 Can't. 👏 Make. 👏 Me. 👏 Care. 👏 About. 👏 Hamilton. 👏",
        description: `<p>This extension replaces all instances of "Hamilton" with "the video game DOOM".</p>`,
        url: "https://chromewebstore.google.com/detail/hamilton-%3E-doom/hkedheclgkcdkjabeklkiifpbhlnaknd?hl=en-US&gl=US",
        tags: ["tool"],
        buttonText: "Install now",
      },
      dumbmen: {
        name: "dumb.men",
        slug: "dumbmen",
        logo: "dumbmen.svg",
        slogan: "Hallelujah! It's Raining Dumb Men.",
        description: `<p>This joke worked <em>a lot better</em> before browsers disabled autoplaying music...</p>`,
        url: "https://ahoylemon.github.io/dumb.men",
        tags: ["celebrities"],
        buttonText: "See men",
      },
      rickrossdaily: {
        name: "Rick Ross Daily",
        slug: "rickrossdaily",
        logo: "rickrossdaily.svg",
        slogan: "Surely he can't be hustling every day...",
        description: `<p>A Mastodon bot to execute a very simple joke: Hey, what's Rick Ross doing today? Is it hustling?</p>`,
        url: "https://botsin.space/@rickross",
        tags: ["celebrities", "list"],
        buttonText: "Hustlin?",
      },
    },
  },

  methods: {
    resetGameState() {
      const self = this;
      self.currentThing.name = "";
      self.currentThing.slogan = "";
      self.currentThing.description = "";
      self.currentThing.url = "";
      self.currentThing.buttonText = "";
      self.currentThing.isMultiplayer = false;
    },
    selectGame(whichGame) {
      const self = this;

      // Toggle the selected game or clear it if the same game is selected
      self.currentThing.slug =
        self.currentThing.slug === whichGame ? "" : whichGame;

      // blank out the variables.
      // Reset the game state
      self.resetGameState();

      setTimeout(() => {
        if (self.currentThing.slug && self.thingData[self.currentThing.slug]) {
          self.setGameData(self.thingData[self.currentThing.slug]);
        }
      }, 200);
    },

    setGameData(thingData) {
      const self = this;
      self.currentThing.name = thingData.name ?? "";
      self.currentThing.slogan = thingData.slogan ?? "";
      self.currentThing.description = thingData.description ?? "";
      self.currentThing.url = thingData.url ?? "";
      self.currentThing.buttonText = thingData.buttonText ?? "";
      self.currentThing.isMultiplayer = thingData.isMultiplayer ?? false;
    },

    setFilterTo(filterText) {
      const self = this;
      if (
        !filterText ||
        filterText == "all" ||
        filterText === self.currentFilter
      ) {
        self.currentFilter = "";
      } else {
        self.currentFilter = filterText;
      }
    },
  },

  computed: {
    computedButtonText() {
      const self = this;
      if (self.currentThing && self.currentThing.buttonText) {
        return self.currentThing.buttonText;
      } else {
        return "Play Now";
      }
    },
    computedThingsList() {
      const self = this;

      let theList;
      if (!self.currentFilter) {
        // If no currentTag is selected, return all things
        theList = Object.values(self.thingData);
      } else {
        theList = Object.values(self.thingData).filter((thing) =>
          thing.tags.includes(self.currentFilter),
        );
      }

      if (self.isListRandomized) {
        theList = theList.sort(() => Math.random() - 0.5);
      }

      return theList;
    },
    computedTags() {
      const self = this;
      const tagCount = {};

      // Loop through each object in thingData
      for (let key in self.thingData) {
        const thing = self.thingData[key];
        if (thing.tags && Array.isArray(thing.tags)) {
          thing.tags.forEach((tag) => {
            if (tagCount[tag]) {
              tagCount[tag]++;
            } else {
              tagCount[tag] = 1;
            }
          });
        }
      }

      // Convert the tagCount object to an array of { text, usage } objects
      const tagArray = Object.keys(tagCount).map((tag) => ({
        text: tag,
        count: tagCount[tag],
      }));

      // Sort the array by usage in descending order
      tagArray.sort((a, b) => b.count - a.count);

      return tagArray;
    },
    computedWidth() {
      return window.innerHeight;
    },
  },

  mounted: function () {
    const gameGrid = document.getElementById("GameGrid");
    gameGrid.addEventListener("wheel", (event) => {
      event.preventDefault(); // Prevent the default vertical scroll behavior
      gameGrid.scrollLeft += event.deltaY; // Scroll horizontally instead
    });
  },
});
