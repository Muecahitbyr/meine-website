import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ORIGIN, ROUTES, buildServiceLd, urlFor } from "../seo/routes.js";

// On a direct page load the HTML already carries this route's tags (baked in
// at build time by vite-plugins/seoHead.js), so the first run below rewrites
// them with identical values. Its job is client-side navigation, where the
// document is not reloaded and the tags have to follow the route.

function setTag(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// The organisation JSON-LD in index.html stays untouched. Route-level blocks
// carry data-route-ld (also on the prerendered ones) and are replaced/removed
// here as the route changes.
function setRouteLd(ld) {
  let el = document.head.querySelector("script[data-route-ld]");
  if (!ld) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-route-ld", "");
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(ld);
}

/**
 * Keeps title, description, canonical, robots and social tags in sync with
 * the current route. Renders nothing.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "/impressum/" and "/impressum" are the same route for the router
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
    const page = ROUTES[path];

    // Unknown paths get the SPA fallback (HTTP 200) — keep them out of the
    // index instead of letting them pose as duplicates of the homepage.
    const known = Boolean(page);
    const { title, description } = page ?? ROUTES["/"];
    const url = known ? urlFor(path) : `${ORIGIN}/`;

    document.title = title;
    setTag('meta[name="description"]', "content", description);
    setTag('meta[name="robots"]', "content", known ? "index, follow" : "noindex, follow");
    setTag('link[rel="canonical"]', "href", url);
    setTag('meta[property="og:url"]', "content", url);
    setTag('meta[property="og:title"]', "content", title);
    setTag('meta[property="og:description"]', "content", description);
    setTag('meta[name="twitter:title"]', "content", title);
    setTag('meta[name="twitter:description"]', "content", description);
    setRouteLd(page?.service ? buildServiceLd(path) : null);
  }, [pathname]);

  return null;
}
