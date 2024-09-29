import { fileURLToPath, URL } from "node:url";
// import vitePluginSocketIO from "vite-plugin-socket-io";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Sitemap from "vite-plugin-sitemap";
// import { socketEvents } from "./src/server/socketEvents.js";
import VueRouter from "unplugin-vue-router/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode);
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  // const isDev = (env.IS_DEV === "true" || env.IS_PROD === true) ?? false;
  const isDev = (env.IS_DEV === "true" || env.IS_DEV === true) ?? false;
  const isProd = (env.IS_PROD === "true" || env.IS_PROD === true) ?? false;

  let currentDatabase;
  if (env.VITE_DEV_DB === env.VITE_DB) {
    currentDatabase = "VITE_DEV_DB";
  } else if (env.VITE_LIVE_DB === env.VITE_DB) {
    currentDatabase = "VITE_DEV_DB";
  } else {
    currentDatabase = "??? UNKNOWN ????";
  }

  console.table([
    { key: "mode", value: mode },
    { key: "IS_DEV?", value: isDev },
    { key: "IS_PROD?", value: isProd },
  ]);

  // console.log("DEV: " + env.VITE_SOME_KEY);

  return {
    plugins: [
      VueRouter({
        /* options */
      }),
      vue(),
      vueDevTools(),
      // vitePluginSocketIO({ socketEvents }),
      Sitemap({
        hostname: "https://kinda.fun",
        readable: true,
        dynamicRoutes: [
          "/cameo",
          "/guillotine",
          "/invalid",
          "/meeting",
          "/pretend",
          "/sisyphus",
          "/wrongest",
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      // Define the environment variables here
      __APP_ENV__: env.APP_ENV,
      "process.env": env, // This makes sure all env variables are available under process.env
    },
  };
});
