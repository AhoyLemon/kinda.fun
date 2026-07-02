// Shared per-page <head> builder for kinda.fun pages. Centralizes the
// canonical / OpenGraph / JSON-LD boilerplate that every page otherwise
// repeats, layered on top of the keyed site-wide defaults in nuxt.config's
// app.head. Pages pass only what differs (title, description, image, fonts,
// branded favicons, structured data).

interface HeadLink {
  rel: string;
  href: string;
  // sizes / type / key / color etc. on favicon + font links.
  [key: string]: string;
}

// A <meta> entry, e.g. { name: "description", content: "…" } or
// { property: "og:title", content: "…" }. Kept as a string-indexed record so it
// satisfies unhead's meta typing without per-key friction.
type HeadMeta = Record<string, string>;

interface GameHeadOptions {
  /** Full <title> text. */
  title: string;
  /** og:title (usually the bare game name). */
  ogTitle: string;
  /** Meta description + og:description (same value). */
  description: string;
  /** Site path, e.g. "/court" ("" for home). Drives canonical + og:url. */
  path: string;
  /** Absolute og:image URL. Omit for pages without a share card (e.g. stats). */
  ogImage?: string;
  /** og:image:width — defaults to the standard 1200×630 card. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  /** Structured data, serialized into an application/ld+json script. Optional. */
  jsonLd?: Record<string, unknown>;
  /** Google-font stylesheet hrefs, in order. */
  fonts?: string[];
  /** Extra <link>s: branded favicons, mask-icon, webmanifest, etc. */
  favicons?: HeadLink[];
  /** When set, adds theme-color + msapplication-TileColor. */
  themeColor?: string;
  /** Disable pinch / double-tap zoom (clicker + card games). */
  noZoomViewport?: boolean;
  /** Any extra meta a single page needs (e.g. site verification). */
  extraMeta?: HeadMeta[];
}

export function useGameHead(options: GameHeadOptions) {
  const {
    title,
    ogTitle,
    description,
    path,
    ogImage,
    ogImageWidth = 1200,
    ogImageHeight = 630,
    jsonLd,
    fonts = [],
    favicons = [],
    themeColor,
    noZoomViewport = false,
    extraMeta = [],
  } = options;

  const url = `https://kinda.fun${path}`;

  const meta: HeadMeta[] = [];
  // The no-zoom viewport must override the global one, so it goes first.
  if (noZoomViewport) {
    meta.push({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    });
  }
  meta.push({ name: "description", content: description });
  if (themeColor) {
    meta.push({ name: "theme-color", content: themeColor });
    meta.push({ name: "msapplication-TileColor", content: themeColor });
  }
  meta.push(...extraMeta);
  meta.push(
    { property: "og:title", content: ogTitle },
    { property: "og:type", content: "website" },
    { property: "og:description", content: description },
  );
  if (ogImage) {
    meta.push(
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: String(ogImageWidth) },
      { property: "og:image:height", content: String(ogImageHeight) },
    );
  }
  meta.push(
    { property: "og:url", content: url },
    { property: "og:email", content: "lemon@ahoylemon.xyz" },
  );

  const link: HeadLink[] = [{ rel: "canonical", href: url }];
  for (const href of fonts) link.push({ rel: "stylesheet", href });
  link.push(...favicons);

  useHead({
    title,
    link,
    meta,
    ...(jsonLd ? { script: [{ type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) }] } : {}),
  });
}
