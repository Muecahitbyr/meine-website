import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import {
  ROUTES,
  SITEMAP_ROUTES,
  renderSeoHead,
  renderNotFoundHead,
  NOT_FOUND,
  SEO_START,
  SEO_END,
} from "../src/seo/routes.js";

const MARKER = "<!-- seo:head -->";
const BLOCK = new RegExp(`${SEO_START}[\\s\\S]*?${SEO_END}`);
const ROOT_DIV = '<div id="root"></div>';

// Sits *outside* <div id="root">, so it's what a visitor without JavaScript
// actually sees (a plain static message, not just an empty page waiting for
// a script that never runs) and persists untouched once JavaScript does
// load: main.jsx deliberately doesn't hydrate this page (see its comment),
// it does a plain client render into #root instead — which replaces only
// #root's own contents with the normal Header/Footer shell, leaving this
// block alone. Minimal inline styling (no external CSS dependency) in the
// site's actual palette (theme/createAppTheme.js).
const NOT_FOUND_BODY = `<div style="min-height:60vh;display:flex;align-items:center;justify-content:center;padding:64px 24px;text-align:center;font-family:'Inter',system-ui,-apple-system,sans-serif;background:#F7F9F9;color:#0C1117">
      <div>
        <p style="margin:0 0 8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-size:12px;color:#1DB8AA">404</p>
        <h1 style="margin:0 0 12px;font-size:32px;font-weight:800;letter-spacing:-0.8px">${NOT_FOUND.title.split(" | ")[0]}</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#4B5563;max-width:480px">${NOT_FOUND.description}</p>
        <a href="/" style="display:inline-block;border-radius:9999px;padding:12px 24px;background:#1DB8AA;color:#0C1117;font-weight:700;font-size:14px;text-decoration:none">Zur Startseite</a>
      </div>
    </div>`;

/**
 * Renders every route's actual body HTML at build time, via a short-lived
 * nested Vite SSR build of src/entry-server.jsx (not the already-built
 * client bundle — that one is browser-oriented; a fresh Node-targeted build
 * is what makes `import()`-ing it and calling its render function work).
 * configFile: false + only the react() plugin avoids recursing into this
 * same seoHead() plugin.
 */
async function renderAllRoutes(root) {
  const ssrOutDir = path.resolve(root, ".vite-ssr-tmp");

  await viteBuild({
    configFile: false,
    root,
    logLevel: "warn",
    plugins: [react()],
    build: {
      ssr: "src/entry-server.jsx",
      outDir: ssrOutDir,
      emptyOutDir: true,
      minify: false,
      rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
    },
  });

  try {
    const mod = await import(
      path.join(ssrOutDir, "entry-server.mjs") + `?t=${Date.now()}` // bust Node's ESM cache across builds in watch mode
    );
    const out = {};
    for (const route of Object.keys(ROUTES)) {
      out[route] = await mod.renderAppToString(route);
    }
    return out;
  } finally {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }
}

/** Git commit date (YYYY-MM-DD) of the last commit touching any of `files`. */
function lastCommitDate(root, files) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cd", "--date=short", "--", ...files],
      { cwd: root, encoding: "utf8" },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

/** Existing <loc>→<lastmod> pairs, used as a fallback when git has no answer. */
function parseExistingSitemap(root) {
  const map = {};
  try {
    const xml = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
    for (const m of xml.matchAll(/<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/g)) {
      map[m[1]] = m[2];
    }
  } catch {
    // no existing sitemap to fall back to — fine, callers handle null
  }
  return map;
}

function buildSitemap(root) {
  const existing = parseExistingSitemap(root);
  const urls = SITEMAP_ROUTES.map((route) => {
    const loc = route === "/" ? "https://www.bayar-solutions.de/" : `https://www.bayar-solutions.de${route}`;
    const { contentFiles } = ROUTES[route];
    // No contentFiles at all means this route has no file that's genuinely
    // *exclusive* to it (e.g. the two landing pages' copy both live in the
    // same src/data/landingPages.js — editing one would wrongly stamp both
    // with a fresh date under a naive whole-file git log). Per instruction:
    // omitting <lastmod> for that URL is correct here, not a fallback to
    // today's date or to a stale previous value that's no more trustworthy.
    const lastmod = contentFiles?.length
      ? (lastCommitDate(root, contentFiles) ?? existing[loc] ?? null)
      : null;
    return { loc, lastmod };
  });
  const body = urls
    .map(({ loc, lastmod }) =>
      [
        "  <url>",
        `    <loc>${loc}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/**
 * Bakes each route's real, already-rendered content into the HTML that is
 * served *before* any JavaScript runs (crawlers, social-media scrapers, and
 * search engines before/while they render):
 *   - the <!-- seo:head --> marker becomes that route's title/description/
 *     canonical/OG/Twitter/JSON-LD block (unchanged from before)
 *   - the empty <div id="root"></div> becomes that route's full server-
 *     rendered markup (new), so H1/headings/body text/internal links are
 *     present without JavaScript
 *   - index.html: the homepage ("/")
 *   - after the build: one copy per other route (dist/<route>.html —
 *     Cloudflare's asset handler serves /<route> from <route>.html without
 *     a redirect)
 * src/main.jsx hydrates this markup instead of discarding and rebuilding it.
 * sitemap.xml's <lastmod> is also regenerated here from each route's actual
 * git history (see lastCommitDate), not from today's build date.
 */
export default function seoHead() {
  let root;
  let outDir;
  let isBuild = false;

  return {
    name: "seo-head",
    configResolved(config) {
      isBuild = config.command === "build";
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      if (!html.includes(MARKER)) {
        throw new Error("seo-head: marker <!-- seo:head --> missing in index.html");
      }
      return html.replace(MARKER, () => renderSeoHead("/"));
    },
    async closeBundle() {
      if (!isBuild) return;

      const indexPath = path.join(outDir, "index.html");
      const template = fs.readFileSync(indexPath, "utf8");
      if (!BLOCK.test(template)) {
        throw new Error("seo-head: SEO block not found in built index.html");
      }
      if (!template.includes(ROOT_DIV)) {
        throw new Error(`seo-head: expected exactly "${ROOT_DIV}" in built index.html`);
      }

      const bodies = await renderAllRoutes(root);

      for (const route of Object.keys(ROUTES)) {
        const html = template
          .replace(BLOCK, () => renderSeoHead(route))
          .replace(ROOT_DIV, () => `<div id="root">${bodies[route]}</div>`);
        const file = route === "/" ? indexPath : path.join(outDir, `${route.slice(1)}.html`);
        fs.writeFileSync(file, html);
      }

      // Served by Cloudflare's asset handler (not_found_handling: "404-page"
      // in wrangler.jsonc) with a real HTTP 404 for any path that isn't one
      // of the routes above or a real static file — see that file's comment
      // for what this replaces and why.
      const notFoundHtml = template
        .replace(BLOCK, renderNotFoundHead)
        .replace(ROOT_DIV, () => `${NOT_FOUND_BODY}\n    <div id="root"></div>`);
      fs.writeFileSync(path.join(outDir, "404.html"), notFoundHtml);

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap(root));
    },
  };
}
