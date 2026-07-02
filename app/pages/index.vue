<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from "vue";

  // Full per-page <head> migrated from the legacy src/views/home/Page.pug.
  // Fonts (Inter/Lora) and the site-wide favicons live in nuxt.config's global
  // head, so only the home-specific canonical / theme / OpenGraph go here.

  // JSON-LD (WebSite) ported from src/views/home/pug/_schema.pug. dateModified
  // preserves the legacy build-time semantics (was `lastUpdated`, an ISO date
  // stamped at build; here it is stamped when the page is prerendered/rendered).
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Kinda fun.",
    description: "Here's some games and stuff that Lemon made. All of it is kinda fun!",
    keywords: "browser games, free games, indie games, Lemon, kinda fun, web games, party games, comedy games",
    url: "https://kinda.fun",
    image: "https://kinda.fun/img/og-wide.png",
    publisher: {
      "@type": "Person",
      name: "Lemon",
      url: "https://ahoylemon.xyz",
      email: "lemon@ahoylemon.xyz",
      sameAs: [
        "https://github.com/AhoyLemon",
        "https://bsky.app/profile/ahoylemon.xyz",
        "https://mastodon.social/@ahoylemon",
        "https://thefpl.us/meet/lemon",
      ],
    },
    hasPart: [
      { "@type": "VideoGame", name: "Comparatively Famous", url: "https://kinda.fun/cameo" },
      { "@type": "VideoGame", name: "No More Billionaires", url: "https://kinda.fun/guillotine" },
      { "@type": "VideoGame", name: "Invalid", url: "https://kinda.fun/invalid" },
      { "@type": "VideoGame", name: "This Meeting Has Points", url: "https://kinda.fun/meeting" },
      { "@type": "VideoGame", name: "Pretend World", url: "https://kinda.fun/pretend" },
      { "@type": "VideoGame", name: "Sisyphus Clicker", url: "https://kinda.fun/sisyphus" },
    ],
    dateModified: new Date().toISOString(),
  };

  // The site-wide favicons live in nuxt.config's global head. Inter/Lora are
  // only used by this page (home's $serif/$sans-serif), so they load here rather
  // than site-wide.
  useGameHead({
    title: "Kinda fun. | Here's some games and stuff that Lemon made. All of it is kinda fun!",
    ogTitle: "Kinda fun.",
    description: "Here's some games and stuff that Lemon made. All of it is kinda fun!",
    path: "",
    ogImage: "https://kinda.fun/img/og-wide.png",
    themeColor: "#e5e828",
    fonts: ["https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"],
    extraMeta: [{ name: "msvalidate.01", content: "D3327FD7610C2D05D7D605EBCA288944" }],
    jsonLd,
  });

  // SSR-safe: relative base means internal links prerender as clean paths
  // ("/cameo") and resolve correctly once hydrated in the browser.
  const baseURL = "";

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

  const thingData = {
    court: {
      name: "Supreme Court: The Card Game",
      slug: "court",
      logo: "supremecourt.svg",
      slogan: "If justice isn't fair, at least it should be fun!",
      description: `
        <p>In this single-player card game, you take on the role of a lawyer trying to win cases before the Supreme Court. You can choose to be ideologically consistent, or just play to win.</p>
        <p>Manipulate the justices with flattery, bribery, blackmail, or political hegemony, just like in real life!</p>
      `,
      url: `${baseURL}/court`,
      buttonText: "",
      isMultiplayer: false,
      tags: ["game", "single player", "lies", "celebrities", "trivia"],
    },
    megachurch: {
      name: "Megachurch Tycoon (Public Beta Release)",
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
    wrongest: {
      name: "The Wrongest Words",
      slug: "wrongest",
      logo: "thewrongestwords.svg",
      slogan: "The game where you defend some very stupid ideas.",
      description: `<p>Gather together a group of <strong>3 - 10 players</strong> and get ready to talk nonsense. You'll get a card with an untrue statement on it, and it's your job to convince your friends your statement is the least wrong.</p>`,
      url: `${baseURL}/wrongest`,
      isMultiplayer: true,
      tags: ["game", "multiplayer", "lies", "party"],
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
      name: "Jerking.",
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
    currentThing.slug = currentThing.slug === whichGame ? "" : whichGame;
    resetGameState();
    setTimeout(() => {
      if (currentThing.slug && thingData[currentThing.slug]) {
        setGameData(thingData[currentThing.slug]);
      }
    }, 200);
  };

  const setGameData = (data) => {
    currentThing.name = data.name ?? "";
    currentThing.slogan = data.slogan ?? "";
    currentThing.description = data.description ?? "";
    currentThing.url = data.url ?? "";
    currentThing.buttonText = data.buttonText ?? "";
    currentThing.isMultiplayer = data.isMultiplayer ?? false;
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
    }
    return "Play Now";
  });

  const computedThingsList = computed(() => {
    let theList = Object.values(thingData);
    if (ui.currentFilter) {
      theList = Object.values(thingData).filter((thing) => thing.tags.includes(ui.currentFilter));
    }
    if (ui.isListRandomized) {
      theList = theList.sort(() => Math.random() - 0.5);
    }
    return theList;
  });

  const computedTags = computed(() => {
    const tagCount = {};
    for (const key in thingData) {
      const thing = thingData[key];
      if (thing.tags && Array.isArray(thing.tags)) {
        thing.tags.forEach((tag) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    }
    const tagArray = Object.keys(tagCount).map((tag) => ({ text: tag, count: tagCount[tag] }));
    tagArray.sort((a, b) => b.count - a.count);
    return tagArray;
  });

  onMounted(() => {
    const gameGrid = document.getElementById("GameGrid");
    if (!gameGrid) return;
    gameGrid.addEventListener("wheel", (event) => {
      event.preventDefault();
      gameGrid.scrollLeft += event.deltaY;
    });
  });
</script>

<template lang="pug" src="@/views/home/Home.pug"></template>
<style lang="scss" src="@/views/home/Home.scss"></style>
