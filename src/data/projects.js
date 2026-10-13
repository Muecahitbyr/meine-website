const EXT = "webp";

export const projects = [
  {
    id: "driveconnect",
    titleKey: "projects.driveconnect.title",
    descriptionKey: "projects.driveconnect.description",
    noteKey: "projects.driveconnect.note",
    tags: ["SwiftUI", "Firebase", "Vehicle Data", "UX"],
    storeUrl: "", // TODO: add App Store URL
    screenshots: [
      `/screenshots/DC/DC1.${EXT}`,
      `/screenshots/DC/DC2.${EXT}`,
      `/screenshots/DC/DC3.${EXT}`,
      `/screenshots/DC/DC4.${EXT}`,
      `/screenshots/DC/DC5.${EXT}`,
    ],
  },
  {
    id: "rechno",
    titleKey: "projects.rechno.title",
    descriptionKey: "projects.rechno.description",
    noteKey: "projects.rechno.note",
    tags: ["SwiftUI", "Rechnungen", "PDF Export", "Business"],
    storeUrl: "", // TODO: add App Store URL
    screenshots: [
      `/screenshots/Rechno/Rechno1.${EXT}`,
      `/screenshots/Rechno/Rechno2.${EXT}`,
      `/screenshots/Rechno/Rechno3.${EXT}`,
      `/screenshots/Rechno/Rechno4.${EXT}`,
    ],
  },
  {
    id: "tano",
    titleKey: "projects.tano.title",
    descriptionKey: "projects.tano.description",
    noteKey: "projects.tano.note",
    tags: ["SwiftUI", "Mini-Games", "Quiz", "Ranking"],
    storeUrl: "", // TODO: add App Store URL
    screenshots: [
      `/screenshots/Tano/Tano1.${EXT}`,
      `/screenshots/Tano/Tano2.${EXT}`,
      `/screenshots/Tano/Tano3.${EXT}`,
      `/screenshots/Tano/Tano4.${EXT}`,
      `/screenshots/Tano/Tano5.${EXT}`,
    ],
  },
  {
    id: "3draum",
    titleKey: "projects.3draum.title",
    descriptionKey: "projects.3draum.description",
    noteKey: "projects.3draum.note",
    tags: ["React", "TypeScript", "Three.js"],
    link: "https://raumersteller.vercel.app",
    aspectRatio: "8 / 5",
    screenshots: [
      `/screenshots/3DRaum/3DRaum1.${EXT}`,
      `/screenshots/3DRaum/3DRaum2.${EXT}`,
      `/screenshots/3DRaum/3DRaum3.${EXT}`,
    ],
  },
];

// Homepage shows all own projects, including web apps like 3DRaum. The
// /app-entwicklung-kaufbeuren landingpage is iOS-specific — it must keep
// showing only the native apps, not 3DRaum (a browser app).
export const iosApps = projects.filter((p) => p.id !== "3draum");
