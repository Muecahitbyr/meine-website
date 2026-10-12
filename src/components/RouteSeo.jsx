import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ROUTES, NOT_FOUND, buildServiceLd, urlFor } from "../seo/routes.js";

// On a direct page load the HTML already carries this route's tags (baked in
// at build time by vite-plugins/seoHead.js), so the first run below rewrites
// them with identical values. Its job is client-side navigation, where the
// document is not reloaded and the tags have to follow the route.

function setTag(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function removeTag(selector) {
  document.head.querySelector(selector)?.remove();
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
    const known = Boolean(page);
    const { title, description } = page ?? NOT_FOUND;

    document.title = title;
    setTag('meta[name="description"]', "content", description);
    setTag('meta[name="robots"]', "content", known ? "index, follow" : "noindex, follow");
    setTag('meta[property="og:title"]', "content", title);
    setTag('meta[property="og:description"]', "content", description);
    setTag('meta[name="twitter:title"]', "content", title);
    setTag('meta[name="twitter:description"]', "content", description);

    // Unknown paths get no canonical at all (matching the static 404 page
    // — see src/seo/routes.js's NOT_FOUND/renderNotFoundHead) rather than
    // one pointing at the homepage, which used to make every mistyped URL
    // look like a second way to reach "/".
    if (known) {
      const url = urlFor(path);
      setTag('link[rel="canonical"]', "href", url);
      setTag('meta[property="og:url"]', "content", url);
    } else {
      removeTag('link[rel="canonical"]');
      removeTag('meta[property="og:url"]');
    }
    setRouteLd(page?.service ? buildServiceLd(path) : null);
  }, [pathname]);

  return null;
}
