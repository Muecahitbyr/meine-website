// Single source of truth for per-route SEO data. Imported by
//   - vite-plugins/seoHead.js  → bakes the tags into the static HTML at build
//   - components/RouteSeo.jsx  → keeps them in sync on client-side navigation
// Plain data + pure functions only (no DOM, no React) so Node can import it.

export const ORIGIN = "https://www.bayar-solutions.de";
export const ORG_ID = `${ORIGIN}/#organization`;

export const ROUTES = {
  "/": {
    title: "Bayar Solutions | Webseiten & App-Entwicklung in Kaufbeuren",
    description:
      "Bayar Solutions entwickelt Webseiten und Apps für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu – individuell, schnell und aus einer Hand.",
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

export const urlFor = (path) => (path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`);

// Service + breadcrumb data for the landing pages. Only facts that are also
// stated on the page/site — no prices, ratings or reviews.
export function buildServiceLd(path) {
  const { description, service } = ROUTES[path];
  const url = urlFor(path);
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

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const SEO_START = "<!-- seo:start -->";
export const SEO_END = "<!-- seo:end -->";

/** The route-dependent part of <head>, as an HTML string. */
export function renderSeoHead(path) {
  const { title, description, service } = ROUTES[path];
  const url = urlFor(path);
  const lines = [
    SEO_START,
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  ];
  if (service) {
    // "<" escaped so the JSON can never terminate the script element
    const json = JSON.stringify(buildServiceLd(path)).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" data-route-ld>${json}</script>`);
  }
  lines.push(SEO_END);
  return lines.join("\n    ");
}
