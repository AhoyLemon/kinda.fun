<script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  const baseURL = `${window.location.protocol}//${window.location.host}`;
  const currentThing = reactive({
    slug: "",
    name: "",
    slogan: "",
    description: "",
    url: "",
    isMultiplayer: false,
    buttonText: "",
  });

  const ui = reactive({
    currentFilter: "",
    isListRandomized: false,
  });

  const currentFilter = ref("");
  const isListRandomized = ref(false);

  const thingData = {
    megachurch: {
      name: "Megachurch Tycoon (Alpha Release)",
      slug: "megachurch",
      logo: "megachurch.svg",
      slogan: "Turn their faith into your fortune.",
      description: `
        <p>Starting with no money and a crippling drug addiction, Megachurch Tycoon will have you preaching to larger and larger audiences, motivated by the only thing you believe in: <strong>Geting paid.</strong></p>
        <p>NOTE: While in early access state, Megachurch Tycoon is <strong>DESKTOP ONLY</strong>.</p>
      `,
      url: `${baseURL}/megachurch`,
      buttonText: "",
      isMultiplayer: false,
      tags: ["game", "single player", "lies", "early access"],
    },
    invalid: {
      name: "Invalid",
      slug: "invalid",
      logo: "invalid.svg",
      slogan: "A trivia game of unnecessary suffering.",
      description: `
        <p>This is a multiplayer competitive triva game <strong>(best with 3-7 players)</strong> that involves all players taking on one of two roles.</p>
        <p><strong>Employees</strong> are trying to use their wits and trivia knowledge to come up with a password. But the <strong>SysAdmin</strong> is trying to make everyone's life difficult.</p>
      `,
      url: `${baseURL}/invalid`,
      buttonText: "",
      isMultiplayer: true,
      tags: ["game", "multiplayer", "trivia", "guess"],
    },
    cameo: {
      name: "Comparatively Famous",
      slug: "cameo",
      logo: "comparativelyfamous.svg",
      slogan: "The game of relative celebrity value",
      description: `<p>This game will give you a list of celebrities, and then ask you to sort them by their listed value on <strong>Cameo</strong>.</p>`,
      url: `${baseURL}/cameo`,
      tags: ["game", "single player", "celebrities", "trivia"],
    },
    meeting: {
      name: "This Meeting Has Points",
      slug: "meeting",
      logo: "thismeetinghaspoints.svg",
      slogan: "So now you have a reason to actually pay attention.",
      description: `<p>This is a multiplayer game meant to be played while having a meeting about something else. <strong>Gather 2 to 6 people</strong> to slip their cards into conversation, while you try to catch them doing that very thing.</p>`,
      url: `${baseURL}/meeting`,
      tags: ["game", "multiplayer", "guess"],
      buttonText: "Let's huddle up and discuss.",
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
      url: `${baseURL}/guillotine`,
      tags: ["game", "single player", "new content every day"],
      buttonText: "Genearate wealth.",
    },
    sisyphus: {
      name: "Sisyphus Clicker",
      slug: "sisyphus",
      logo: "sisyphusclicker.svg",
      slogan: "Life can be depressing. This game especially so.",
      description: `<p>This is a clicker-style game where you take on the role of sisyphus and push the rock uphill. <strong>You will never succeed.</strong> But at least you can earn achievements?</p>`,
      url: `${baseURL}/sisyphus`,
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
      url: `${baseURL}/pretend`,
      tags: ["game", "single player", "celebrities", "guess"],
    },
    // wrongest: {
    //   name: "The Wrongest Words",
    //   slug: "wrongest",
    //   logo: "thewrongestwords.svg",
    //   slogan: "The game where you defend some very stupid ideas.",
    //   description: `<p>Gather together a group of <strong>5 - 10 players</strong> and get ready to talk nonsense. You'll get a card with an untrue statement on it, and it's your job to convince you're friends your statement is the least wrong.</p>`,
    //   url: `${baseURL}/wrongest`,
    //   isMultiplayer: true,
    //   tags: ["game", "multiplayer", "lies", "party"],
    // },
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
      tags: ["quiz"],
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
    twounltd: {
      name: "formerly known as 2un.ltd",
      slug: "twounltd",
      logo: "2unltd.svg",
      slogan: "Are you ready for this?",
      description: `<p>This little webapp really wants to know: Are you <strong>ready for this</strong>? Because if you are, it will take the appropriate measures. But it will probably need to keep checking in.</p>`,
      url: "https://ready.ahoylemon.xyz",
      tags: ["tool", "party", "sounds"],
      buttonText: "I hope you're ready.",
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
      tags: ["quiz", "celebrities"],
      buttonText: "Take the test.",
    },
    notpoutine: {
      name: "Not Poutine, FYI.",
      slug: "notpoutine",
      logo: "notpoutine.svg",
      slogan: "A global archive of Poutine Crimes",
      description: `<p>Poutine is a dish with 3 rules: It must contain french fries, fresh cheese curds, and brown gravy.</p><p>This is an archive of things that call themselves poutine, but are not poutine.</p>`,
      url: "https://notpoutine.ahoylemon.xyz",
      tags: ["list"],
      buttonText: "Witness crime",
    },
    frankwest: {
      name: "Frank West pronounces emoticons for you",
      slug: "frankwest",
      logo: "frankwest.svg",
      slogan: "For me? Thanks Frank!",
      description: `<p>ᕕ( ᐛ )ᕗ</p>`,
      url: "https://8u.ahoylemon.xyz",
      tags: ["list", "sounds"],
      buttonText: "O_o",
    },
    jerking: {
      name: "Jerking Online",
      slug: "jerking",
      logo: "jerkingonline.svg",
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
      slogan: "You. 👏 Can't. 👏 Make. 👏 Me. 👏 Care. 👏 About. 👏 Hamilton. 👏",
      description: `<p>This extension replaces all instances of "Hamilton" with "the video game DOOM".</p>`,
      url: "https://chromewebstore.google.com/detail/hamilton-%3E-doom/hkedheclgkcdkjabeklkiifpbhlnaknd?hl=en-US&gl=US",
      tags: ["tool"],
      buttonText: "Install now",
    },
    dumbmen: {
      name: "Dumb Men.",
      slug: "dumbmen",
      logo: "dumbmen.svg",
      slogan: "Hallelujah! It's Raining Dumb Men.",
      description: `<p>This joke worked <em>a lot better</em> before browsers disabled autoplaying music...</p>`,
      url: "https://ahoylemon.github.io/dumb.men",
      tags: ["celebrities"],
      buttonText: "See men",
    },
  };

  const resetGameState = () => {
    currentThing.name = "";
    currentThing.slogan = "";
    currentThing.description = "";
    currentThing.url = "";
    currentThing.buttonText = "";
    currentThing.isMultiplayer = false;
  };

  const selectGame = (whichGame) => {
    // Toggle the selected game or clear it if the same game is selected
    currentThing.slug = currentThing.slug === whichGame ? "" : whichGame;

    // blank out the variables.
    // Reset the game state
    resetGameState();

    setTimeout(() => {
      if (currentThing.slug && thingData[currentThing.slug]) {
        setGameData(thingData[currentThing.slug]);
      }
    }, 200);
  };

  const setGameData = (thingData) => {
    currentThing.name = thingData.name ?? "";
    currentThing.slogan = thingData.slogan ?? "";
    currentThing.description = thingData.description ?? "";
    currentThing.url = thingData.url ?? "";
    currentThing.buttonText = thingData.buttonText ?? "";
    currentThing.isMultiplayer = thingData.isMultiplayer ?? false;
  };

  const setFilterTo = (filterText) => {
    if (!filterText || filterText == "all" || filterText === ui.currentFilter) {
      ui.currentFilter = "";
    } else {
      ui.currentFilter = filterText;
    }
  };

  const computedButtonText = computed(() => {
    if (currentThing && currentThing.buttonText) {
      return currentThing.buttonText;
    } else {
      return "Play Now";
    }
  });
  const computedThingsList = computed(() => {
    let theList = Object.values(thingData);
    if (!ui.currentFilter) {
      // If no currentTag is selected, return all things
      theList = Object.values(thingData);
    } else {
      theList = Object.values(thingData).filter((thing) => thing.tags.includes(ui.currentFilter));
    }

    if (ui.isListRandomized) {
      theList = theList.sort(() => Math.random() - 0.5);
    }

    return theList;
  });
  const computedTags = computed(() => {
    const tagCount = {};

    // Loop through each object in thingData
    for (let key in thingData) {
      const thing = thingData[key];
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
  });
  const computedWidth = computed(() => {
    return window.innerHeight;
  });

  onMounted(() => {
    const gameGrid = document.getElementById("GameGrid");
    gameGrid.addEventListener("wheel", (event) => {
      event.preventDefault(); // Prevent the default vertical scroll behavior
      gameGrid.scrollLeft += event.deltaY; // Scroll horizontally instead
    });
  });
</script>
<template lang="pug" src="./Home.pug"></template>
<style lang="scss" src="./Home.scss"></style>
