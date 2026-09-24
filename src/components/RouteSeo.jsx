import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ORIGIN = "https://www.bayar-solutions.de";
const ORG_ID = `${ORIGIN}/#organization`;

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
  "/webseiten-kaufbeuren": {
    title: "Webseite erstellen in Kaufbeuren | Bayar Solutions",
    description:
      "Bayar Solutions entwickelt moderne, schnelle und individuelle Webseiten für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu.",
    service: {
      name: "Webseiten für Unternehmen in Kaufbeuren",
      serviceType: "Webseitenerstellung und Webentwicklung",
      breadcrumb: "Webseiten Kaufbeuren",
    },
  },
  "/app-entwicklung-kaufbeuren": {
    title: "App-Entwicklung in Kaufbeuren | Bayar Solutions",
    description:
      "Individuelle App-Entwicklung für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu – von der Idee bis zur fertigen Anwendung.",
    service: {
      name: "App-Entwicklung für Unternehmen in Kaufbeuren",
      serviceType: "App-Entwicklung",
      breadcrumb: "App-Entwicklung Kaufbeuren",
    },
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

// Service + breadcrumb data for the landing pages. Only facts that are also
// stated on the page/site — no prices, ratings or reviews.
function buildServiceLd({ url, description, service }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.name,
        serviceType: service.serviceType,
        url,
        description,
        provider: {
          "@type": "ProfessionalService",
          "@id": ORG_ID,
          name: "Bayar Solutions",
          url: `${ORIGIN}/`,
        },
        areaServed: [
          { "@type": "City", name: "Kaufbeuren" },
          { "@type": "AdministrativeArea", name: "Allgäu" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: service.breadcrumb, item: url },
        ],
      },
    ],
  };
}

// The organisation JSON-LD in index.html stays untouched; this route-level
// block is added next to it and removed again on other routes.
function setRouteLd(ld) {
  let el = document.head.querySelector('script[data-route-ld]');
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
    setRouteLd(page?.service ? buildServiceLd({ url, description, service: page.service }) : null);
  }, [pathname]);

  return null;
}
