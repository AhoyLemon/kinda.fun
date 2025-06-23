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
              // Clean the URL: remove query and hash, and trailing slashes
              const cleanUrl = url.split(/[?#]/)[0].replace(/\/+$/, "");
              if (cleanUrl === "" || cleanUrl === "/" || cleanUrl === "/home" || cleanUrl === "/index") {
                templatePath = path.resolve(__dirname, "home.html");
              } else if (url.includes("cameo")) {
                templatePath = path.resolve(__dirname, "cameo.html");
              } else if (url.includes("guillotine")) {
                templatePath = path.resolve(__dirname, "guillotine.html");
              } else {
                templatePath = path.resolve(__dirname, "index.html");
              }

              let template = fs.readFileSync(templatePath, "utf-8");
              template = await server.transformIndexHtml(url, template);

              const { render } = await server.ssrLoadModule("/src/entry-server.js");
              const { appHtml, headTags } = await render(url);

              // Replace the favicon link dynamically
              if (url.includes("cameo")) {
                template = template.replace(/<link rel="shortcut icon" href="[^"]*"/, '<link rel="shortcut icon" href="/img/famous/favicon.ico"');
              }

              // Determine baseUrl for SSR
              let baseUrl;
              if (url.includes("localhost") || url.includes("127.0.0.1")) {
                baseUrl = "http://localhost:5173";
              } else if (process.env.VITE_BASE_URL) {
                baseUrl = process.env.VITE_BASE_URL.replace(/\/$/, "");
              } else {
                baseUrl = "https://kinda.fun";
              }

              // Generate JSON-LD schema.org script
              const schemaOrgJsonLd = `<script type="application/ld+json">${JSON.stringify(
                {
                  "@context": "http://schema.org",
                  "@type": "VideoGame",
                  name: "Comparatively Famous",
                  url: `${baseUrl}/cameo`,
                  image: `${baseUrl}/img/og-famous.png`,
                  playMode: "SinglePlayer",
                  applicationCategory: "browser game",
                  gamePlatform: "web browser",
                  operatingSystem: "web browser",
                  genre: "comedy",
                  description: "The Game of Celebrity Value",
                  inLanguage: "English",
                  numberOfPlayers: 1,
                  aggregateRating: {
                    ratingValue: 5,
                    ratingCount: 12,
                  },
                  creator: {
                    "@type": "Person",
                    name: "Lemon",
                    url: "https://ahoylemon.xyz",
                    email: "lemon@kinda.fun",
                    sameAs: ["https://thefpl.us/meet/lemon", "https://twitter.com/AhoyLemon", "https://mastodon.social/@ahoylemon"],
                  },
                  offers: {
                    "@type": "Offer",
                    description: "free",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  screenshot: [
                    {
                      "@type": "ImageObject",
                      url: `${baseUrl}/img/famous/screenshots/title-screen.jpg`,
                      width: 1270,
                      height: 760,
                    },
                    {
                      "@type": "ImageObject",
                      url: `${baseUrl}/img/famous/screenshots/sort-three.jpg`,
                      width: 1270,
                      height: 760,
                    },
                    {
                      "@type": "ImageObject",
                      url: `${baseUrl}/img/famous/screenshots/sort-midway.jpg`,
                      width: 1270,
                      height: 760,
                    },
                    {
                      "@type": "ImageObject",
                      url: `${baseUrl}/img/famous/screenshots/valuate.jpg`,
                      width: 1270,
                      height: 760,
                    },
                    {
                      "@type": "ImageObject",
                      url: `${baseUrl}/img/famous/screenshots/final-round.jpg`,
                      width: 1270,
                      height: 760,
                    },
                  ],
                },
                null,
                2,
              )}</script>`;

              // Inject JSON-LD at the placeholder
              template = template.replace("<!--schema-org-jsonld-->", schemaOrgJsonLd);

              let html = template.replace(`<!--head-tags-->`, headTags);
              html = html.replace(`<!--ssr-outlet-->`, appHtml);

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
