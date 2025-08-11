<script setup>
  import { reactive, computed, onMounted } from "vue";
  import { begin, sDefaults, rDefaults } from "./js/_variables";
  import { sendEvent, randomFrom, randomNumber, findKeyInArray, removeFromArrayByKey, percentOf, addCommas } from "@/shared/js/_functions.js";
  import { keepPushingMessages, rockFellMessages, retreatMessages } from "./js/_messages";
  import { storeItems } from "./js/_store";

  // Firebase & VueFire Stuff
  import { doc, increment, serverTimestamp, updateDoc, runTransaction } from "firebase/firestore";
  import { useFirestore, useCollection, useDocument } from "vuefire";
  const db = useFirestore();
  const statsRef = doc(db, `stats/sisyphus`);

  // Sounds
  import { Howl, Howler } from "howler";
  import { uphillMusic, downhillMusic, cheevoSound, purchaseSound, dignityGot, dignityLost } from "./js/_sounds";

  // Toasts
  import Toast, { POSITION } from "vue-toastification";
  // import "vue-toastification/dist/index.css";
  import MyToast from "./vue/MyToast.vue";
  import LemonToast from "./vue/LemonToast.vue";
  import { useToast } from "vue-toastification";
  const toast = useToast();

  const ui = reactive({
    gameName: "sisyphus",
    phase: "begin",
    message: "Click Sisyphus to push the rock uphill.",
    score: 0,
    totalScore: 0,
    secondsPlayed: 0,
    totalClicks: 0,
    visibleDrawer: null,
    drawerOpenedCount: 0,
    outsideLinksClicked: [],
    isSidebarVisible: false,
    s: sDefaults,
    r: rDefaults,
    fg: {
      transform: 0,
    },
    bg: {
      transform: 0,
    },
    store: [...storeItems],
    inventory: [],
    cheevos: [],
    cheevoReminders: 0,

    // Audio stuff
    isMusicPlaying: false,
    uphillMusicTimer: undefined,

    // Dignity...
    boughtDignity: false,
  });

  const self = undefined;

  ///////////////////////////////
  // Functions

  const sisyphusClick = () => {
    let f = ui.s.pushForce;
    let r = ui.s.retreatSpeed;
    let bT;

    document.getElementById("Sisyphus").blur();

    // This handles the click IMMEDIATELY after you bought Dignity.
    if (ui.boughtDignity) {
      ui.boughtDignity = false;
      ui.inventory = [];
      getCheevo("Dignity Retaken!", "I was thinking that would make you stop clicking, but apparently not. Have five points I guess.", 5);
      dignityLost.play();
      ui.store.push({
        id: 7,
        name: "Dignity",
        price: 60000,
        scoreToReveal: 1,
        desc: "I've taken your dignity back. Are you going to buy it again now?",
      });
    }

    // You can't move Sisyphus while the rock is falling...
    if (ui.r.falling) {
      return false;
    }

    ui.totalClicks++;

    // Actions taken on specific clicks
    switch (ui.totalClicks) {
      case 1:
        logFirstClick();
        break;
      case 212:
        const byLemonJingle = new Audio("audio/bylemon.mp3");
        byLemonJingle.volume = 0.6;
        byLemonJingle.play();
        toast(
          {
            component: LemonToast,
          },
          {
            toastClassName: "site-by-lemon",
            icon: false,
            timeout: 0,
            showCloseButtonOnHover: false,
            closeButtonClassName: "close-toast",
          },
        );
        break;

      // These are all cheevos
      case 437:
        getCheevo(
          "437 Clicks",
          "You've clicked on Sisyphus 437 times. And while that may seem like a meaningless number, have you considered that any other number is equally meaningless?",
          25,
        );
        break;
      case 1400:
        getCheevo("-100 Points", "I think you have too many points. You've just lost a hundred of them.", -100);
        break;
      case 1000:
        getCheevo("4 Digits of Clicks", "You've now clicked on Sisyphus 1,000 times. That might be too many times.", 25);
        break;

      case 10000:
        getCheevo("10,000 Clicks", "That's a whole lot of clicks!", 25);
        break;
    }

    // Measure clicks in the browser tab title
    if (ui.totalClicks > 125) {
      document.title = `[${ui.totalClicks.toLocaleString()}] Sisyphus Clicked`;
    }

    // Are you going up or down?
    if (ui.s.retreating == false) {
      //////////////////////////////////////////////////////////////
      // You are pushing the rock uphill
      if (ui.phase != "begin" && ui.phase != "pushing") {
        switchMessage("pushing");
      }
      ui.score++;
      ui.totalScore++;
      ui.s.bottom += f;
      ui.s.left += f;
      ui.r.bottom += f;
      ui.r.left += f;

      // Music check
      if (ui.uphillMusicTimer) {
        clearTimeout(ui.uphillMusicTimer);
      }
      ui.uphillMusicTimer = setTimeout(function () {
        uphillMusic.pause();
        ui.isMusicPlaying = false;
      }, 780);

      if (!ui.isMusicPlaying) {
        uphillMusic.play();
        ui.isMusicPlaying = true;
      }

      //background transform
      bT = ui.s.pushForce * 0.75;
      ui.bg.transform -= bT;

      if (ui.r.left >= ui.r.peak) {
        // The rock just fell back downhill
        ui.r.bottom = begin.r.bottom;
        ui.r.left = begin.r.left;
        ui.r.falling = true;
        ui.s.retreating = true;
        switchMessage("falling");
        ui.r.rollbacks++;

        uphillMusic.pause();
        downhillMusic.play();
        setTimeout(function () {
          downhillMusic.stop();
          ui.isMusicPlaying = false;
          ui.r.falling = false;
        }, 2000);

        sendEvent("Rollback", ui.r.rollbacks + " time(s)");
        logRollback();

        // Rollback Cheevos
        switch (ui.r.rollbacks) {
          case 3:
            getCheevo("The Anti-Turkey", "Three gutterballs! Clearly you should keep bowling.", 10);
            break;
          case 7:
            getCheevo("Still Failing!", "It's rolled back 7 times now, but don't let that stop you.", 15);
            break;
          case 13:
            getCheevo("13 Rollbacks", "Hey, I know the rock has rolled back down the hill 13 times. Next time tho....", 15);
            break;
          case 25:
            getCheevo("25 Rollbacks", "You're enjoying this, aren't you?", 10);
            break;
        }
      }

      /////////////////////////////
      // 🏆 Pushing rock cheevos
      switch (ui.totalScore) {
        case 100:
          getCheevo("Making Progress", "You have pushed the rock uphill 100 times. Congratulations!", 6);
          break;
        case 300:
          getCheevo(
            "300 Pushes",
            "You know how video game achievements like to do quotes of movies? Like maybe some achievement is about someone named Akbar and then the achievment is called like “It's A Trap!” or something? Anyway, you've clicked the rock 300 times. I don't think there's anything I can add to that.",
            3,
          );
          break;
        case 414:
          getCheevo("Keep Pushing That Rock!", "To help motivate you, I'm subtracting 40 points from your score.", 40);
      }
    } else if (ui.s.retreating == true) {
      //////////////////////////////////////////////////////////////
      // You are running back downhill

      ui.s.bottom -= r;
      ui.s.left -= r;

      //forground transform
      bT = ui.s.retreatSpeed * 0.75;
      ui.bg.transform += bT;

      if (ui.phase != "retreat") {
        switchMessage("retreat");
        ui.r.peak = randomNumber(55, 75);
      }
      if (ui.s.bottom <= begin.s.bottom || ui.s.left <= begin.s.left) {
        //////////////////////////////////////////////////////////////
        // The ball is rolling back downhill.
        ui.s.retreating = false;
        ui.s.bottom = begin.s.bottom;
        ui.s.left = begin.s.left;
        ui.fg.transform = 0;
        ui.bg.transform = 0;
      }
    }
  };

  const switchMessage = (m) => {
    ui.phase = m;
    if (m == "falling") {
      ui.message = randomFrom(rockFellMessages);
    } else if (m == "retreat") {
      ui.message = randomFrom(retreatMessages);
    } else if (m == "pushing") {
      ui.message = randomFrom(keepPushingMessages);
    }
  };

  const getCheevo = (title, text, points) => {
    if (!title) {
      title = null;
    }
    if (!text) {
      text = null;
    }
    let t;
    if (points) {
      t = "<strong>" + points + "💀</strong> " + text;
    } else {
      t = text;
    }

    if (title && text) {
      sendEvent("cheevo", title, text);
    } else if (title && points) {
      sendEvent("cheevo", title, points);
    } else if (text && points) {
      sendEvent("cheevo", text, points);
    } else if (text) {
      sendEvent("cheevo", text);
    } else if (title) {
      sendEvent("cheevo", title);
    }

    cheevoSound.play();

    toast(
      {
        component: MyToast,
        props: {
          title: title,
          points: points,
          message: text,
          customClass: "cheevo-toast-text",
        },
      },
      {
        position: POSITION.BOTTOM_LEFT,
        toastClassName: "cheevo-toast",
        icon: "trophy",
        timeout: 8000,
      },
    );

    ui.cheevos.push({ title: title, text: text, points: points });

    // give cheevos based on cheevos!
    if (ui.cheevos == 2) {
      setTimeout(function () {
        getCheevo("And Here Is A Third!", "You've had two achivements, so here is a third achievement for getting those.", 12);
      }, 1500);
    } else if (ui.cheevos == 7) {
      setTimeout(function () {
        getCheevo("You Cannot Have 7", "7 is considered a lucky number, so now you have 8 achievements.", 3);
      }, 1500);
    }

    // Log this Cheevo in the database.
    logCheevo({ name: title, points: points });
  };

  const remindMeOfMyCheevos = () => {
    ui.cheevos.forEach((cheevo, i) => {
      setTimeout(() => {
        toast(
          {
            component: MyToast,
            props: {
              title: cheevo.title,
              points: cheevo.points,
              message: cheevo.text,
              customClass: "cheevo-toast-text",
            },
          },
          {
            position: POSITION.BOTTOM_LEFT,
            toastClassName: "cheevo-toast",
            icon: "trophy",
            timeout: 4000,
          },
        );
      }, i * 720); // 400ms delay between each toast
    });
  };

  const toggleSidebar = () => {
    ui.isSidebarVisible = !ui.isSidebarVisible;
    if (ui.isSidebarVisible) {
      // award cheevo if you don't have it already.
      const alreadyEarned = ui.cheevos.some((c) => c.title === "Drawer Opener");
      if (!alreadyEarned) {
        getCheevo("Drawer Opener", "What does that question mark mean? Well now you know!", 8);
      }
      ui.drawerOpenedCount++;
      if (ui.drawerOpenedCount == 5) {
        getCheevo("Habitual Drawer Opener", "How many times are you gonna click on that question mark?", 10);
      } else if (ui.drawerOpenedCount == 9) {
        getCheevo("Obsessive Drawer Opener", "Okay! You definitely know what happens when you click that question mark.", 13);
      } else if (ui.drawerOpenedCount == 12) {
        getCheevo("Problematic Drawer Opener", "Stop clicking that question mark.", 1);
      } else if (ui.drawerOpenedCount == 15) {
        getCheevo("Bad Listening Drawer Opener", "God damn it, stop it.", -15);
      } else if (ui.drawerOpenedCount == 18) {
        getCheevo("Massochistic Drawer Opener", "Okay fine, I'll take more points away from you", -10);
      } else if (ui.drawerOpenedCount == 23) {
        getCheevo("Ceaseless Drawer Opener", "Were you expecting more achievements? Because this isn't one.", 0);
      }
    }
  };

  const toggleDrawer = (d) => {
    if (d == ui.visibleDrawer) {
      ui.visibleDrawer = null;
    } else {
      ui.visibleDrawer = d;
    }
  };

  const openOutsideLink = (linkTitle, linkUrl) => {
    alert(linkTitle);
    setTimeout(() => {
      window.open(linkUrl, "_blank");
    }, 220);
    if (linkTitle == "Lemon") {
      const alreadyEarned = ui.cheevos.some((c) => c.title === "Lemon Clicker");
      if (!alreadyEarned) {
        setTimeout(() => {
          getCheevo("Lemon Clicker", "Welcome back! How did you enjoy Lemon's website?", 18);
        }, 9600);
      }
    }
  };

  const buyItem = (i, item) => {
    if (ui.score >= item.price) {
      ui.score -= item.price;

      let s = findKeyInArray(ui.store, "id", item.id);
      let n = ui.store[s];
      n.showDesc = false;

      ui.inventory.push(n);

      removeFromArrayByKey(ui.store, "id", item.id);

      buyItemEffect(item.id);

      purchaseSound.play();

      sendEvent("item purchase", item.name, item.price);
      logPurchase(item);

      if (ui.inventory.length == 1) {
        getCheevo("Shopping In Hades!", "First item purchased.", 10);
      }

      // Cheevos for specific purchased items....
      switch (item.id) {
        case 5:
          getCheevo("Worth It!", "That was some very expensive peach tea.", 2);
          break;
        case 19:
          getCheevo("Self Bondage", "I wonder if this game gets easier if you're in chains?", 9);
          break;
        case 20:
          getCheevo("How Refreshing!", "Mmmmm, that's some effervescent water!", 4);
          break;

        case 7:
          let currentScore = ui.computedGamerScore;
          let negativeScore = 0 - currentScore;
          ui.cheevos = [];
          ui.score = 0;
          ui.inventory = [];
          ui.store = [...storeItems];
          ui.inventory = [
            {
              id: 7,
              name: "Dignity",
              price: 60000,
              scoreToReveal: 600,
              desc: "You've played this game for far too long. I'm taking your diginity and you can buy it back.",
            },
          ];
          dignityGot.play();
          ui.getCheevo(
            "Dignity Restored!",
            "You've finally reclaimed your dignity. However, it was at the expense of any points that you've earned so far. So I guess, if you want those points back, you should probably keep pushing the boulder.",
            negativeScore,
          );
          removeFromArrayByKey(ui.store, "id", 7);
          ui.boughtDignity = true;
          break;
      }
    }
  };

  const buyItemEffect = (id) => {
    switch (id) {
      case 1:
        //---- Fresh Kicks
        ui.s.pushForce = ui.s.pushForce * 1.01;
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.3;
        break;
      case 2:
        //---- small pickaxe
        ui.r.height = ui.r.height * 0.85;
        ui.r.width = ui.r.width * 0.85;
        ui.s.pushForce = ui.s.pushForce * 1.5;
        break;
      case 3:
        //---- gum
        ui.r.height = ui.r.height * 1.15;
        ui.r.width = ui.r.width * 1.15;
        ui.s.pushForce = ui.s.pushForce * 0.5;
        break;
      case 4:
        //---- analgesic
        ui.s.pushForce = ui.s.pushForce * 1.35;
        break;
      case 5:
        //---- peach tea
        ui.s.pushForce = ui.s.pushForce * 0.85;
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.4;
        break;
      case 6:
        //---- heelies
        ui.s.pushForce = ui.s.pushForce * 0.85;
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.4;
        break;
      case 7:
        //---- dignity
        // These effects are handled elsewhere.
        break;
      case 8:
        //---- a phone call from your mom
        ui.s.height = ui.s.height * 0.77;
        ui.s.width = ui.s.width * 0.77;
        ui.r.marginLeft = ui.r.marginLeft * 1.8;
        break;
      case 9:
      //---- boner pills
      // does nothing
      case 10:
        //---- jock jams
        ui.s.pushForce = ui.s.pushForce * 1.05;
        break;
      case 11:
        //---- hades fashion
        ui.s.pushForce = ui.s.pushForce * 0.6;
        break;
      case 12:
        //---- a new, heavier boulder
        ui.r.height = ui.r.height * 2;
        ui.r.width = ui.r.width * 2;
        ui.r.marginLeft = ui.r.marginLeft * 2.7;
        ui.s.pushForce = ui.s.pushForce * 0.3;
        break;
      case 13:
        //---- spite
        ui.s.pushForce = ui.s.pushForce * 1.05;
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.05;
        break;
      case 14:
        //---- crampons
        ui.s.pushForce = ui.s.pushForce * 1.4;
        ui.s.retreatSpeed = ui.s.retreatSpeed * 0.6;
        break;
      case 15:
        //----mountain goat blood
        ui.s.pushForce = ui.s.pushForce * 0.6;
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.4;
        break;
      case 16:
        //---- yogurt pouch
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.07;
        break;
      case 17:
        //---- knee braces
        // does nothing
        break;
      case 18:
        //---- moral support
        ui.r.height = ui.r.height * 1.2;
        ui.r.width = ui.r.width * 1.2;
        ui.r.marginLeft = ui.r.marginLeft * 1.4;
        ui.s.pushForce = ui.s.pushForce * 0.83;
        break;
      case 19:
        //---- thanatos' chains
        ui.s.pushForce = ui.s.pushForce * 0.4;
        break;
      case 20:
        //---- lemon water
        ui.s.pushForce = ui.s.pushForce * 1.07;
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.07;
        break;
      case 22:
        //---- little league trophy
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.13;
        break;
      case 23:
        //---- sand paper
        ui.r.height = ui.r.height * 0.8;
        ui.r.width = ui.r.width * 0.8;
        ui.r.marginLeft = ui.r.marginLeft * 0.9;
        ui.s.pushForce = ui.s.pushForce * 1.4;
        break;
      case 24:
        //---- stickers (scented)
        ui.s.pushForce = ui.s.pushForce * 0.8;
        break;
      case 25:
        //---- stickers (puffy)
        ui.r.height = ui.r.height * 1.15;
        ui.r.width = ui.r.width * 1.15;
        ui.r.marginLeft = ui.r.marginLeft * 1.21;
        ui.s.pushForce = ui.s.pushForce * 1.18;
        break;
      case 27:
        //---- firecrackers
        ui.r.height = ui.r.height * 0.8;
        ui.r.width = ui.r.width * 0.8;
        ui.r.marginLeft = ui.r.marginLeft * 0.9;
        ui.s.pushForce = ui.s.pushForce * 1.18;
        break;
      case 28:
        //---- bedazzler
        ui.r.height = ui.r.height * 1.27;
        ui.r.width = ui.r.width * 1.27;
        ui.r.marginLeft = ui.r.marginLeft * 1.36;
        ui.s.pushForce = ui.s.pushForce * 0.78;
        break;
      case 29:
        //---- espresso
        ui.s.retreatSpeed = ui.s.retreatSpeed * 1.38;
        break;
    }
  };

  const toggleInventoryItemDescription = (item) => {
    item.showDesc = !item.showDesc;
  };

  ////////////////////////////////
  // Firebase functions
  const logFirstClick = async () => {
    await updateDoc(statsRef, {
      firstClick: increment(1),
      lastGameStarted: serverTimestamp(),
    });
  };

  const logRollback = async () => {
    await updateDoc(statsRef, {
      rollbackCount: increment(1),
    });
  };

  const logCheevo = async (cheevo) => {
    const cheevoName = cheevo.name;
    const cheevoRef = doc(db, `stats/sisyphus/cheevos/${cheevoName}`);
    await runTransaction(db, async (transaction) => {
      const cheevoDoc = await transaction.get(cheevoRef);
      const now = new Date().toISOString();
      if (!cheevoDoc.exists()) {
        transaction.set(cheevoRef, {
          name: cheevoName,
          pointValue: cheevo.points,
          earnedCount: 1,
          lastEarned: serverTimestamp(),
        });
      } else {
        transaction.update(cheevoRef, {
          earnedCount: increment(1),
          lastEarned: serverTimestamp(),
        });
      }
    });
  };

  const logPurchase = async (purchase) => {
    const purchaseName = purchase.name;
    const purchaseRef = doc(db, `stats/sisyphus/purchases/${purchaseName}`);
    await runTransaction(db, async (transaction) => {
      const purchaseDoc = await transaction.get(purchaseRef);
      if (!purchaseDoc.exists()) {
        transaction.set(purchaseRef, {
          name: purchaseName,
          price: purchase.price,
          timesBought: 1,
          lastPurchased: serverTimestamp(),
        });
      } else {
        transaction.update(purchaseRef, {
          timesBought: increment(1),
          lastPurchased: serverTimestamp(),
        });
      }
    });
  };

  ///////////////////////////////
  // Computeds
  const rockLeft = computed(() => {
    return `calc(${ui.s.width}% + ${ui.r.left}%)`;
  });
  const rockHeight = computed(() => {
    return `${ui.r.height}%`;
  });
  const rockWidth = computed(() => {
    return `${ui.r.width}%`;
  });
  const rockMarginLeft = computed(() => {
    return `${ui.r.marginLeft}%`;
  });
  const foregroundTransform = computed(() => {
    return `translateX(${ui.fg.transform}%)`;
  });
  const backgroundTransform = computed(() => {
    return `translateX(${ui.bg.transform}%)`;
  });

  const computedGamerScore = computed(() => {
    let gamerScore = 0;
    ui.cheevos.forEach(function (item) {
      if (item && item.points > 0) {
        gamerScore += item.points;
      }
    });
    return gamerScore;
  });
  const availableUpgrades = computed(() => {
    let a = [];
    ui.store.forEach(function (item, i) {
      if (ui.totalScore >= item.scoreToReveal) {
        a.push(item);
      }
    });
    return a;
  });

  onMounted(() => {
    // nothing!
  });
</script>
<template lang="pug" src="./Sisyphus.pug"></template>
<style lang="scss" src="./Sisyphus.scss"></style>
