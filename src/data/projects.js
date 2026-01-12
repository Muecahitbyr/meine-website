const EXT = "png"; // <-- falls jpg: "jpg"

export const projects = [
  {
    title: "M5NATION ",
    description:
      "Personalisierte iOS-App zur Auswertung und Anzeige von Fahrzeugdaten – übersichtlich, modern und auf den Nutzer zugeschnitten.",
    note: "(Im App Store verfügbar)",
    tags: ["SwiftUI", "Vehicle Data", "UX", "Firebase"],
    screenshots: [
      `/screenshots/M51.${EXT}`,
      `/screenshots/M52.${EXT}`,
      `/screenshots/M53.${EXT}`,
    ],
  },
  {
    title: "Get A Taxi",
    description:
      "iOS-App zum Rufen eines Taxis: Start wird übernommen/gewählt, Ziel eingeben und die Anfrage schnell abschicken.",
    note: "(Bald im App Store)" ,
    tags: ["SwiftUI", "REST", "Async/Await", "Firebase"],
    screenshots: [
      `/screenshots/GetATaxi1.${EXT}`,
      `/screenshots/GetATaxi2.${EXT}`,
      `/screenshots/GetATaxi3.${EXT}`,
    ],
  },
  {
    title: "Guess The Capital City",
    description:
      "Quiz-Spiel: Flagge erkennen und die passende Hauptstadt erraten – mit sauberer Logik und SwiftUI-Animationen.",
    note: "(Bald im App Store)",
    tags: ["SwiftUI", "Game Logic", "Animations"],
    screenshots: [
      `/screenshots/GTCC1.${EXT}`,
      `/screenshots/GTCC2.${EXT}`,
      `/screenshots/GTCC3.${EXT}`,
    ],
  },
];
