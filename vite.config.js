import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path, { resolve } from "path";

export default defineConfig(({ mode }) => {
  console.log(mode);
  const env = loadEnv(mode, process.cwd(), "");

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

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // Sitemap temporarily disabled to fix deployment
      // Sitemap({
      //   hostname: "https://kinda.fun",
      //   readable: true,
      //   dynamicRoutes: ["/cameo", "/guillotine", "/invalid", "/meeting", "/pretend", "/sisyphus", "/wrongest"],
      // }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.VITE_FIREBASE_API_KEY": JSON.stringify(env.VITE_FIREBASE_API_KEY),
      "process.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
      "process.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
      "process.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET),
      "process.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      "process.env.VITE_FIREBASE_APP_ID": JSON.stringify(env.VITE_FIREBASE_APP_ID),
      "process.env.VITE_DB": JSON.stringify(env.VITE_DB),
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ["import", "global-builtin", "color-functions", "mixed-decls"],
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          cameo: resolve(__dirname, "src/entries/cameo.js"),
          guillotine: resolve(__dirname, "src/entries/guillotine.js"),
          invalid: resolve(__dirname, "src/entries/invalid.js"),
          meeting: resolve(__dirname, "src/entries/meeting.js"),
          pretend: resolve(__dirname, "src/entries/pretend.js"),
          sisyphus: resolve(__dirname, "src/entries/sisyphus.js"),
          stats: resolve(__dirname, "src/entries/stats.js"),
          wrongest: resolve(__dirname, "src/entries/wrongest.js"),
          home: resolve(__dirname, "src/entries/home.js"),
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name][extname]",
        },
      },
    },
    server: {
      middlewareMode: false,
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Only rewrite for root-level slugs (e.g., /cameo, /guillotine, etc.)
          const mpaPages = ["cameo", "guillotine", "invalid", "meeting", "pretend", "sisyphus", "stats", "wrongest", "home"];
          const url = req.url.split("?")[0];
          // If the URL is exactly "/", rewrite to /home.html
          if (url === "/") {
            req.url = "/home.html";
          } else {
            // If the URL is exactly "/slug", rewrite to "/slug.html"
            const match = url.match(/^\/(\w+)\/?$/);
            if (match && mpaPages.includes(match[1])) {
              req.url = `/${match[1]}.html`;
            }
          }
          next();
        });
      },
    },
  };
});
