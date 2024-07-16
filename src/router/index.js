import { createRouter, createWebHistory } from "vue-router";
import { useHeadManager } from "@/server/useHeadManager.js";
const { setHeadElements } = useHeadManager();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    {
      path: "/",
      name: "Kinda fun.",
      alias: ["/home", "/start"],
      component: () => import("../views/home/Home.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content:
                "Here's some games and stuff that Lemon made. All of it is kinda fun!",
            },
          },
        ],
      },
    },
    // Cameo
    {
      path: "/cameo",
      name: "Comparatively Famous",
      alias: ["/famous", "/comparatively-famous"],
      component: () => import("../views/cameo/Cameo.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content: "The Game of Celebrity Value",
            },
          },
        ],
      },
    },
    // guillotine
    {
      path: "/guillotine",
      name: "No More Billionaires",
      alias: ["/no-more-billionaires", "/billionaires"],
      component: () => import("../views/guillotine/Guillotine.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content:
                "The game where you generate wealth through the use of a guillotine.",
            },
          },
        ],
      },
    },
    // invalid
    {
      path: "/invalid",
      name: "Invalid",
      component: () => import("../views/invalid/Invalid.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Barlow:wght@300;500&amp;family=Fira+Code:wght@300;600&amp;family=Lora:ital,wght@0,400;0,600;1,400&amp;display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content: "A trivia game of unnecessary suffering.",
            },
          },
        ],
      },
    },
    // meeting
    {
      path: "/meeting",
      name: "Let's Ruin This Meeting!",
      alias: ["/meet", "/slip"],
      component: () => import("../views/meeting/Meeting.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Noto+Sans+Mono:wght@100..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content: "This game doesn't have a name yet",
            },
          },
        ],
      },
    },
    // pretend
    {
      path: "/pretend",
      name: "Pretend World",
      alias: ["/pretend-world", "/impersonators"],
      component: () => import("../views/pretend/Pretend.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Limelight&family=Merriweather:ital,wght@0,400;0,900;1,400&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content: "You are at a party of celebrity impersonators...",
            },
          },
        ],
      },
    },
    // sisyphus
    {
      path: "/sisyphus",
      name: "Sisyphus Clicker",
      alias: ["/sisyphus-clicker"],
      component: () => import("../views/sisyphus/Sisyphus.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content: "Click on Sisyphus to push the rock up the mountain.",
            },
          },
        ],
      },
    },
    // wrongest
    {
      path: "/wrongest",
      name: "The Wrongest Words",
      component: () => import("../views/wrongest/Wrongest.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content: "You're going to defend some very stupid ideas.",
            },
          },
        ],
      },
    },
    // stats
    {
      path: "/stats",
      name: "Kinda fun stats",
      component: () => import("../views/stats/Stats.vue"),
      meta: {
        head: [
          {
            tag: "link",
            attrs: {
              href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap",
              rel: "stylesheet",
            },
          },
          {
            tag: "meta",
            attrs: {
              content: "let's look at some tables!",
            },
          },
        ],
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  const headElements = to.meta.head || [];
  setHeadElements(headElements);
  next();
});

export default router;
