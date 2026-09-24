import fs from "node:fs";
import path from "node:path";
import { ROUTES, renderSeoHead, SEO_START, SEO_END } from "../src/seo/routes.js";

const MARKER = "<!-- seo:head -->";
const BLOCK = new RegExp(`${SEO_START}[\\s\\S]*?${SEO_END}`);

/**
 * Bakes route-specific SEO tags into the HTML that is served *before* any
 * JavaScript runs (crawlers, social-media scrapers):
 *   - index.html: the `<!-- seo:head -->` marker becomes the homepage block
 *   - after the build: one copy of dist/index.html per route with that block
 *     swapped for the route's own (dist/<route>.html — Cloudflare's asset
 *     handler serves /<route> from <route>.html without a redirect)
 * The SPA bundle and body are identical in every file.
 */
export default function seoHead() {
  let outDir;
  let isBuild = false;

  return {
    name: "seo-head",
    configResolved(config) {
      isBuild = config.command === "build";
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      if (!html.includes(MARKER)) {
        throw new Error("seo-head: marker <!-- seo:head --> missing in index.html");
      }
      return html.replace(MARKER, () => renderSeoHead("/"));
    },
    closeBundle() {
      if (!isBuild) return;
      const indexPath = path.join(outDir, "index.html");
      const template = fs.readFileSync(indexPath, "utf8");
      if (!BLOCK.test(template)) {
        throw new Error("seo-head: SEO block not found in built index.html");
      }
      for (const route of Object.keys(ROUTES)) {
        if (route === "/") continue;
        const html = template.replace(BLOCK, () => renderSeoHead(route));
        fs.writeFileSync(path.join(outDir, `${route.slice(1)}.html`), html);
      }
    },
  };
}
