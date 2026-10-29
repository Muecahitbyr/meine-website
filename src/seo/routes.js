// Single source of truth for per-route SEO data. Imported by
//   - vite-plugins/seoHead.js  → bakes the tags into the static HTML at build
//   - components/RouteSeo.jsx  → keeps them in sync on client-side navigation
// Plain data + pure functions only (no DOM, no React) so Node can import it.

export const ORIGIN = "https://www.bayar-solutions.de";
export const ORG_ID = `${ORIGIN}/#organization`;

// `contentFiles` (repo-relative) are only read by vite-plugins/seoHead.js at
// build time, to compute each route's sitemap <lastmod> from that route's
// actual git history instead of hardcoding or stamping today's date. They
// are plain strings so this stays safe to import from the browser bundle
// (RouteSeo.jsx imports this same module) — no Node APIs in this file.
export const ROUTES = {
  "/": {
    // Title: 52 chars (was 59) — shorter than before despite covering all
    // three core services, so no truncation risk. "KI" rather than the
    // longer "KI-Automatisierung" keeps it compact; the dedicated
    // /ki-automatisierung route below still owns that exact, more specific
    // phrase in its own title, so this doesn't cannibalize it — it's a
    // broader entity-level signal, not a competing exact-match target.
    title: "Bayar Solutions | Webseiten, Apps & KI in Kaufbeuren",
    // Description: 131 chars (was 151, limit ~160) — room freed up by
    // dropping the generic "individuell, schnell und aus einer Hand" tail
    // (unverifiable speed/quality claim, not needed) made space for the
    // third service without stuffing or exceeding the safe length. Kept in
    // sync with the ProfessionalService JSON-LD description in index.html —
    // see that file's comment.
    description:
      "Bayar Solutions entwickelt Webseiten, Apps und KI-Automatisierungen für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu.",
    // Deliberately *not* Header.jsx/Footer.jsx/Sections.jsx/common.json/
    // routes.js — those are shared with every other route (nav wording,
    // the translation file, this very file's own data), so a change to one
    // of them isn't actually a content change specific to the homepage.
    // Only files exclusively rendered on "/" are listed, so a homepage
    // content edit is what moves this date, not a shared-file edit.
    contentFiles: [
      "src/components/Hero.jsx",
      "src/components/About.jsx",
      "src/components/TechStack.jsx",
      "src/components/Apps.jsx",
      "src/components/Contact.jsx",
      "src/data/projects.js",
    ],
  },
  "/webseiten-kaufbeuren": {
    title: "Webdesign Kaufbeuren | Webseiten erstellen – Bayar Solutions",
    description:
      "Professionelles Webdesign in Kaufbeuren: Bayar Solutions erstellt moderne, schnelle Webseiten für Unternehmen und Selbstständige im Allgäu. Jetzt anfragen.",
    service: {
      name: "Webseiten für Unternehmen in Kaufbeuren",
      serviceType: "Webseitenerstellung und Webentwicklung",
      breadcrumb: "Webseiten Kaufbeuren",
    },
    // No contentFiles: its content (src/data/landingPages.js) and the one
    // that renders it (src/pages/LandingPage.jsx) are both shared with
    // /app-entwicklung-kaufbeuren — the two pages' copy live as sibling
    // keys in the same file. A whole-file git log can't tell which page's
    // half actually changed, so it would stamp both with the same date
    // whenever either one is edited — a systematically inaccurate lastmod,
    // which the sitemap omits for this URL instead (see buildSitemap).
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
    // Same reasoning as /webseiten-kaufbeuren above.
  },
  "/ki-automatisierung": {
    title: "KI-Automatisierung Kaufbeuren | Bayar Solutions",
    description:
      "Individuelle KI-Automatisierung für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu: Geschäftsprozesse automatisieren, Workflows verbinden und Zeit sparen.",
    service: {
      name: "KI-Automatisierung für Unternehmen in Kaufbeuren",
      serviceType: "KI-Automatisierung und Prozessautomatisierung",
      breadcrumb: "KI-Automatisierung Kaufbeuren",
    },
    // Same reasoning as /webseiten-kaufbeuren and /app-entwicklung-kaufbeuren
    // above: content lives in src/data/landingPages.js, shared with both of
    // those pages, so no contentFiles here either.
  },
  "/projekte": {
    title: "Projekte & Eigenentwicklungen | Bayar Solutions",
    description:
      "Eigenständig entwickelte Projekte von Bayar Solutions: native iOS-Apps und browserbasierte Webanwendungen wie ein 3D-Raumplaner und eine Arbeitszeiterfassung – mit echten Funktionen und Live-Demo.",
    // Deliberately no `service` field: this page showcases own projects, it
    // doesn't sell a bookable service, so a Service/BreadcrumbList schema
    // here would misrepresent it. The shared ProfessionalService block
    // (index.html) still applies to this page like every other one.
    contentFiles: ["src/pages/Projects.jsx", "src/data/projects.js"],
  },
  "/impressum": {
    title: "Impressum | Bayar Solutions",
    description:
      "Impressum und Anbieterkennzeichnung von Bayar Solutions gemäß § 5 DDG.",
    contentFiles: ["src/components/Imprint.jsx"],
  },
  "/datenschutz": {
    title: "Datenschutzerklärung | Bayar Solutions",
    description:
      "Datenschutzerklärung von Bayar Solutions: Informationen zur Verarbeitung personenbezogener Daten beim Besuch dieser Website.",
    contentFiles: ["src/components/Privacy.jsx"],
  },
};

// Routes listed in public/sitemap.xml. Kept as an explicit subset (not just
// every key in ROUTES) because /impressum and /datenschutz are deliberately
// left out of the sitemap.
export const SITEMAP_ROUTES = [
  "/",
  "/webseiten-kaufbeuren",
  "/app-entwicklung-kaufbeuren",
  "/ki-automatisierung",
  "/projekte",
];

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

export const NOT_FOUND = {
  title: "Seite nicht gefunden | Bayar Solutions",
  description:
    "Diese Seite existiert nicht oder wurde verschoben. Zu Webseiten, App-Entwicklung und Kontakt geht es über die Startseite von Bayar Solutions.",
};

/**
 * The 404 page's own <head> block — deliberately not an entry in ROUTES:
 * it has no canonical (there's no one real URL it's a copy of) and is
 * `noindex`, so it never competes with real pages for ranking, unlike the
 * old setup where every unmatched URL served the homepage's own head block
 * marked `index` with a canonical pointing elsewhere (see the SEO analysis
 * this fixes).
 */
export function renderNotFoundHead() {
  const { title, description } = NOT_FOUND;
  const lines = [
    SEO_START,
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="noindex, follow" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    SEO_END,
  ];
  return lines.join("\n    ");
}
