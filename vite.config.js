import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Sitemap from "vite-plugin-sitemap";
import VueRouter from "unplugin-vue-router/vite";
import fs from "fs";
import path from "path";
import { createServer } from "http";

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
      VueRouter(),
      vue(),
      vueDevTools(),
      Sitemap({
        hostname: "https://kinda.fun",
        readable: true,
        dynamicRoutes: ["/cameo", "/guillotine", "/invalid", "/meeting", "/pretend", "/sisyphus", "/wrongest"],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      __APP_ENV__: env.APP_ENV,
      "process.env": env,
    },
    server: {
      configureServer: (server) => {
        const httpServer = createServer(server.middlewares);
        server.httpServer = httpServer;

        httpServer.once("listening", () => {
          server.middlewares.use(async (req, res, next) => {
            const url = req.originalUrl;

            try {
              let templatePath;
              if (url.includes("cameo")) {
                templatePath = path.resolve(__dirname, "cameo.html");
              } else {
                templatePath = path.resolve(__dirname, "index.html");
              }

              let template = fs.readFileSync(templatePath, "utf-8");
              template = await server.transformIndexHtml(url, template);

              const { render } = await server.ssrLoadModule("/src/entry-server.js");
              const appHtml = await render(url);

              // Replace the favicon link dynamically
              if (url.includes("cameo")) {
                template = template.replace(/<link rel="shortcut icon" href="[^"]*"/, '<link rel="shortcut icon" href="/img/famous/favicon.ico"');
              }

              const html = template.replace(`<!--ssr-outlet-->`, appHtml);

              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html");
              res.end(html);
            } catch (e) {
              server.ssrFixStacktrace(e);
              console.error(e);
              res.statusCode = 500;
              res.end(e.message);
            }
          });
        });

        httpServer.listen(5173); // Start the HTTP server on port 5173
      },
    },
  };
});
