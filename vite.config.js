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

  console.table([
    { key: "mode", value: mode },
    { key: "IS_DEV?", value: isDev },
    { key: "IS_PROD?", value: isProd },
  ]);

  // Custom plugin to show localhost guidance after server starts
  const localhostGuidancePlugin = {
    name: "localhost-guidance",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        next();
      });

      const originalListen = server.listen;
      server.listen = function (...args) {
        const result = originalListen.apply(this, args);

        // Show guidance after server is ready
        setTimeout(() => {
          console.log("\n📝 Kinda Fun Development Notes:");
          console.log("❌ http://localhost:5173/ won't work");
          console.log("✅ Use http://localhost:5173/home.html for homepage");
          console.log("✅ Games: /invalid, /meeting, /megachurch, /guillotine, /cameo, /pretend, /sisyphus\n");
        }, 100);

        return result;
      };
    },
  };

  return {
    plugins: [vue(), vueDevTools(), localhostGuidancePlugin],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      __APP_ENV__: env.APP_ENV,
      "process.env.APP_ENV": JSON.stringify(env.APP_ENV),
    },
    css: {
      devSourcemap: true,
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
          404: resolve(__dirname, "src/entries/404.js"),
          megachurch: resolve(__dirname, "src/entries/megachurch.js"),
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
      host: true,
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Only rewrite for root-level slugs (e.g., /cameo, /guillotine, etc.)
          const mpaPages = ["cameo", "guillotine", "invalid", "meeting", "megachurch", "pretend", "sisyphus", "stats", "wrongest", "home", "404"];
          const url = req.url.split("?")[0];
          console.log("Middleware hit for URL:", url);

          // If the URL is exactly "/", rewrite to /home.html
          if (url === "/") {
            req.url = "/home.html";
            console.log("Rewrite / to /home.html");
          } else {
            // If the URL is exactly "/slug", rewrite to "/slug.html"
            const match = url.match(/^\/(\w+)\/?$/);
            if (match && mpaPages.includes(match[1])) {
              req.url = `/${match[1]}.html`;
              console.log(`Rewrite ${url} to ${req.url}`);
            } else {
              // For any unmatched routes that look like pages (not assets), serve the 404 page
              if (!url.includes(".") && url !== "/" && !url.startsWith("/@") && !url.startsWith("/node_modules")) {
                req.url = "/404.html";
                console.log(`Rewrite ${url} to /404.html (404 case)`);
              }
            }
          }
          next();
        });
      },
    },
  };
});
