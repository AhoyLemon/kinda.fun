import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    {
      path: "/",
      name: "Kinda fun.",
      alias: ["/home", "/start"],
      component: () => import("../views/home/Home.vue"),
    },
    // Cameo
    {
      path: "/cameo",
      name: "Comparatively Famous",
      alias: ["/famous", "/comparatively-famous"],
      component: () => import("../views/cameo/Cameo.vue"),
    },
    // guillotine
    {
      path: "/guillotine",
      name: "No More Billionaires",
      alias: ["/no-more-billionaires", "/billionaires"],
      component: () => import("../views/guillotine/Guillotine.vue"),
    },
    // invalid
    {
      path: "/invalid",
      name: "Invalid",
      component: () => import("../views/invalid/Invalid.vue"),
    },
    // meeting
    {
      path: "/meeting",
      name: "This Meeting Has Points",
      alias: ["/meet", "/slip"],
      component: () => import("../views/meeting/Meeting.vue"),
    },
    // pretend
    {
      path: "/pretend",
      name: "Pretend World",
      alias: ["/pretend-world", "/impersonators"],
      component: () => import("../views/pretend/Pretend.vue"),
    },
    // sisyphus
    {
      path: "/sisyphus",
      name: "Sisyphus Clicker",
      alias: ["/sisyphus-clicker"],
      component: () => import("../views/sisyphus/Sisyphus.vue"),
    },
    // wrongest
    {
      path: "/wrongest",
      name: "The Wrongest Words",
      component: () => import("../views/wrongest/Wrongest.vue"),
    },
    // stats
    {
      path: "/stats",
      name: "Kinda fun stats",
      component: () => import("../views/stats/Stats.vue"),
    },
  ],
});

export default router;
