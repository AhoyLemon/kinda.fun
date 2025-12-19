import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path, { resolve } from "path";
import Table from "cli-table3";
import chalk from "chalk";

export default defineConfig(({ mode }) => {
  console.log(mode);
  const env = loadEnv(mode, process.cwd(), "");

  // Check both .env file and process.env for compatibility with CI
  const isDev = (env.IS_DEV === "true" || env.IS_DEV === true || process.env.IS_DEV === "true" || process.env.IS_DEV === true) ?? false;
  const isProd = (env.IS_PROD === "true" || env.IS_PROD === true || process.env.IS_PROD === "true" || process.env.IS_PROD === true) ?? false;

  // Build information table - will be updated with URL later
  const buildTable = new Table({
    style: {
      border: ["grey"],
      compact: false,
    },
  });

  const styledMode = mode === "development" ? chalk.green("DEV") : mode === "production" ? chalk.blue("PROD") : chalk.yellow(mode);

  buildTable.push([chalk.magenta("This is"), chalk.yellow(`kinda fun.`)]);
  buildTable.push([chalk.magenta("Mode"), `${styledMode}`]);

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // Custom plugin to show homepage URL after server starts
      {
        name: "show-homepage-url",
        configureServer(server) {
          const originalListen = server.listen;
          server.listen = function (...args) {
            const result = originalListen.apply(this, args);

            // Show URL after server is listening
            setTimeout(() => {
              const address = server.httpServer?.address();
              if (address && typeof address === "object") {
                const port = address.port;
                const host = server.config.server.host === true ? "localhost" : server.config.server.host || "localhost";

                // Get the full URL based on mode and configuration
                let baseUrl;
                if (mode === "production") {
                  // In production, use the actual domain
                  baseUrl = env.VITE_APP_URL || process.env.VITE_APP_URL || "https://kinda.fun";
                } else {
                  // In development/preview, use the server configuration
                  const protocol = server.config.server.https ? "https" : "http";
                  baseUrl = `${protocol}://${host}:${port}`;
                }

                const homepageUrl = mode === "development" ? `${baseUrl}/home.html` : baseUrl;

                // Add homepage URL to the existing table with proper styling
                const styledUrl = chalk.underline.cyan(homepageUrl);
                buildTable.push([chalk.magenta("Homepage URL"), `${styledUrl}`]);

                // Display the complete table with URL (don't clear console)
                console.log("\n" + buildTable.toString() + "\n");
              }
            }, 100);

            return result;
          };
        },
      },
    ],
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
          silenceDeprecations: ["import", "global-builtin", "color-functions"],
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
