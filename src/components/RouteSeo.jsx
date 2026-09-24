import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ORIGIN = "https://www.bayar-solutions.de";

// index.html carries the homepage's SEO tags (what crawlers see before JS
// runs). Snapshot them once at load so the homepage can be restored when
// navigating back to it, without duplicating the copy here.
const read = (selector, attr) =>
  document.head.querySelector(selector)?.getAttribute(attr) ?? "";

const HOME = {
  title: document.title,
  description: read('meta[name="description"]', "content"),
};

const PAGES = {
  "/": HOME,
  "/impressum": {
    title: "Impressum | Bayar Solutions",
    description:
      "Impressum und Anbieterkennzeichnung von Bayar Solutions gemäß § 5 DDG.",
  },
  "/datenschutz": {
    title: "Datenschutzerklärung | Bayar Solutions",
    description:
      "Datenschutzerklärung von Bayar Solutions: Informationen zur Verarbeitung personenbezogener Daten beim Besuch dieser Website.",
  },
};

function setTag(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
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
    const page = PAGES[path];

    // Unknown paths get the SPA fallback (HTTP 200) — keep them out of the
    // index instead of letting them pose as duplicates of the homepage.
    const known = Boolean(page);
    const { title, description } = page ?? HOME;
    const url = known ? `${ORIGIN}${path}` : `${ORIGIN}/`;

    document.title = title;
    setTag('meta[name="description"]', "content", description);
    setTag('meta[name="robots"]', "content", known ? "index, follow" : "noindex, follow");
    setTag('link[rel="canonical"]', "href", url);
    setTag('meta[property="og:url"]', "content", url);
    setTag('meta[property="og:title"]', "content", title);
    setTag('meta[property="og:description"]', "content", description);
    setTag('meta[name="twitter:title"]', "content", title);
    setTag('meta[name="twitter:description"]', "content", description);
  }, [pathname]);

  return null;
}
