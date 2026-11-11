// Client website projects, shown both on the homepage (tagged "Kundenprojekt"
// so they're not mistaken for the own-app entries in src/data/projects.js)
// and in detail on /projekte. Plain data only, same style as projects.js:
// facts are drawn directly from each live site, not invented.
export const clientProjects = [
  {
    id: "snackpoint",
    title: "SnackPoint Kaufbeuren",
    description:
      "Website für einen Kiosk in Kaufbeuren mit Hermes PaketShop und Lotto-Annahmestelle: Leistungen, Standort, Öffnungszeiten, Kontakt und eine Wunschliste für Produktwünsche.",
    badge: "Kundenprojekt",
    link: "https://snackpointkf.de",
    // Renders a live iframe preview instead of a screenshot gallery — see
    // Apps.jsx's ProjectCard3D. Works because snackpointkf.de's CSP
    // explicitly allows framing from bayar-solutions.de (frame-ancestors).
    embedPreview: true,
  },
];
