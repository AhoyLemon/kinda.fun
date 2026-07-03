// Minimal static server that mimics the relevant Firebase Hosting behavior so
// the harness exercises the same routing the production deploy will:
//   - clean URLs: /cameo -> /cameo/index.html (or /cameo.html)
//   - 301 redirects for legacy /<game>.html -> /<game>
//   - 404.html (real status 404) for unmatched routes
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, posix } from "node:path";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

async function tryFile(p) {
  try {
    const s = await stat(p);
    if (s.isFile()) return p;
  } catch {
    /* miss */
  }
  return null;
}

export function startStaticServer({ root, redirects = [], port = 0 }) {
  const redirectMap = new Map(redirects.map((r) => [r.from, r.to]));

  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    // Contain the request path: fold backslashes (Windows join treats them
    // as separators) and posix-normalize, which clamps any ".." at the root
    // ("/a/../../x" -> "/x") — joined candidates can never escape `root`.
    const pathname = posix.normalize(decodeURIComponent(url.pathname).replaceAll("\\", "/"));

    // 301 redirects (legacy .html)
    if (redirectMap.has(pathname)) {
      res.writeHead(301, { Location: redirectMap.get(pathname) });
      res.end();
      return;
    }

    // Resolve a file for the request, replicating cleanUrls.
    const candidates = [];
    if (pathname === "/") {
      candidates.push(join(root, "index.html"));
    } else if (extname(pathname)) {
      candidates.push(join(root, pathname));
    } else {
      candidates.push(join(root, `${pathname}.html`));
      candidates.push(join(root, pathname, "index.html"));
    }

    let file = null;
    for (const c of candidates) {
      file = await tryFile(c);
      if (file) break;
    }

    if (!file) {
      // Firebase serves 404.html with a 404 status on miss.
      const notFound = await tryFile(join(root, "404.html"));
      if (notFound) {
        const body = await readFile(notFound);
        res.writeHead(404, { "Content-Type": MIME[".html"] });
        res.end(body);
      } else {
        res.writeHead(404, { "Content-Type": MIME[".html"] });
        res.end("Not Found");
      }
      return;
    }

    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(body);
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      const addr = server.address();
      resolve({ server, port: addr.port, url: `http://127.0.0.1:${addr.port}` });
    });
  });
}
