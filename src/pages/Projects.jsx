import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";

import Section from "../components/Sections.jsx";
import Reveal from "../components/Reveal.jsx";
import ScreenshotGallery from "../components/ScreenshotGallery.jsx";
import { LandingHero, ClosingCta } from "./LandingPage.jsx";
import { projects } from "../data/projects.js";

const WASH = {
  teal: "linear-gradient(180deg, rgba(29,184,170,0.05) 0%, rgba(247,249,249,0) 100%)",
  grey: "linear-gradient(180deg, #F4F7F7 0%, rgba(247,249,249,0) 100%)",
  tealStrong:
    "linear-gradient(180deg, rgba(29,184,170,0.04) 0%, rgba(29,184,170,0.09) 100%)",
};

const HERO = {
  overline: "Projekte",
  title: "Meine Projekte und Software-Eigenentwicklungen",
  lead: "Vier eigenständig entwickelte Anwendungen zeigen, wie ich von der ersten Idee bis zur fertigen Software arbeite – als Eigenentwicklungen, nicht als Kundenaufträge. Drei native iOS-Apps und ein browserbasierter 3D-Raumplaner mit echter Live-Demo.",
  chips: ["SwiftUI", "React", "TypeScript", "Firebase", "Three.js"],
  primaryCta: "Projekt anfragen",
  secondaryCta: "Zum Kontakt",
};

// Content grounded in what the apps' own interfaces visibly show (real,
// labelled screens — login, OBD2 setup, invoice form, game grid, etc.), not
// in unverifiable backend behaviour: every bullet describes a screen or
// action the app actually presents, never a claim about the underlying
// logic always succeeding. No invented features, user numbers, ratings or
// release claims. Sample data visible in some screenshots (e.g. example
// invoices, a placeholder leaderboard) is deliberately not cited here as if
// it were real activity. 3DRaum's entries additionally draw on direct,
// hands-on testing of the live demo from an earlier session, not just
// screenshots.
const PROJECT_DETAILS = {
  driveconnect: {
    kind: "iOS-App",
    problem:
      "Wer sein Auto fährt, hat selten eine einfache Möglichkeit, eigene Fahrleistungen wie Beschleunigungszeiten nachzuvollziehen oder sich mit anderen zu vergleichen. DriveConnect verbindet sich dafür direkt mit einem OBD2-Adapter im Fahrzeug und macht Live-Fahrzeugdaten in einer übersichtlichen App nutzbar.",
    features: [
      "Verbindung zu OBD2-Bluetooth-Adaptern (BLE) für Live-Fahrzeugdaten",
      "Messungen für 0–100 km/h, 100–200 km/h und Höchstgeschwindigkeit",
      "Ranglisten zum Vergleich von Beschleunigungszeiten verschiedener Fahrzeuge",
      "Nutzerprofil und Kontoverwaltung",
      "Feedback-Bereich für Rückmeldungen und Feature-Wünsche",
    ],
  },
  rechno: {
    kind: "iOS-App",
    problem:
      "Rechnungen manuell in Word oder Excel zu erstellen kostet Zeit und ist fehleranfällig. Rechno bildet den kompletten Rechnungsprozess für Kleinunternehmer in einer iOS-App ab – von der Kundenverwaltung bis zum Versand.",
    features: [
      "Rechnungen mit Positionen, Mengen, Einzelpreisen und MwSt. erstellen",
      "Verwaltung von Kunden mit Adresse und Kontaktdaten",
      "Status je Rechnung: Entwurf, Versendet, Bezahlt, Storniert",
      "PDF-Erstellung und Versand per E-Mail direkt aus der Rechnung",
      "Übersicht über offene und bezahlte Beträge",
    ],
  },
  tano: {
    kind: "iOS-App",
    problem:
      "Tano ist eine Minispiele-App für kurze Wissens- und Reaktions-Herausforderungen zwischendurch – ohne großen Einstieg, direkt spielbar.",
    features: [
      "Neun Spielmodi, u. a. Hauptstädte, Flaggen, Kontinente, Weltkarte und Guess the Song",
      "„Höher oder Niedriger“ mit mehreren Datenkategorien, z. B. Fußball-Marktwerte, Länderflächen oder Olympia-Goldmedaillen",
      "Ranking-Modus zum Sortieren von Top-10-Listen per Drag-and-drop",
      "Lokaler Mehrspielermodus („Dümmste fliegt“, Multiplayer)",
      "Punktesystem mit zeitabhängiger Wertung bei Guess the Song",
    ],
  },
  "3draum": {
    kind: "Webanwendung",
    problem:
      "Räume zu planen ist oft entweder zu einfach (Papier und Lineal) oder zu komplex (professionelle CAD-Software). 3DRaum setzt dazwischen an: ohne Installation nutzbar, mit echter 2D- und 3D-Darstellung.",
    features: [
      "Raumformen: Rechteck, L-Form oder frei definierbarer Grundriss",
      "Bauelemente wie Türen, Fenster und Durchgänge platzieren",
      "Möbelkatalog mit Objekten wie Sofa, Couchtisch, TV-Board und Regal",
      "Boden- und Wandmaterialien individuell wählen",
      "Wechsel zwischen 2D-Grundriss mit Maßangaben und 3D-Ansicht",
      "Projektverwaltung (Speichern, mehrere Projekte) und Exportfunktion",
    ],
  },
};

function ProjectShowcase({ project, idx }) {
  const { t } = useTranslation("common");
  const details = PROJECT_DETAILS[project.id];
  const title = t(project.titleKey);
  const note = t(project.noteKey);

  return (
    <Reveal delay={idx * 40}>
      <Paper
        sx={(th) => ({
          p: { xs: 3, md: 4 },
          borderRadius: "16px",
          border: `1px solid ${th.palette.divider}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        })}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}
        >
          <Box sx={{ maxWidth: { xs: 220, md: "100%" }, mx: { xs: "auto", md: 0 } }}>
            <ScreenshotGallery
              title={title}
              screenshots={project.screenshots || []}
              aspectRatio={project.aspectRatio}
            />
          </Box>

          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
              <Chip
                label={details.kind}
                size="small"
                sx={(th) => ({
                  height: 24,
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: "6px",
                  backgroundColor: alpha(th.palette.primary.main, 0.1),
                  color: "primary.dark",
                })}
              />
              <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 600 }}>
                {note}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{ mt: 1.5, fontSize: { xs: 22, md: 26 }, letterSpacing: -0.4 }}
            >
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1.5, fontSize: { xs: 14.5, md: 15.5 }, lineHeight: 1.7 }}
            >
              {details.problem}
            </Typography>

            <Typography sx={{ mt: 2.5, fontWeight: 700, fontSize: 14 }}>
              Funktionen
            </Typography>
            <Box
              component="ul"
              sx={{ mt: 1, mb: 0, pl: 2.5, display: "grid", gap: 0.5 }}
            >
              {details.features.map((feature) => (
                <Typography
                  component="li"
                  key={feature}
                  color="text.secondary"
                  sx={{ fontSize: 14, lineHeight: 1.6 }}
                >
                  {feature}
                </Typography>
              ))}
            </Box>

            {project.tags?.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2.5 }}>
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={(th) => ({
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: "6px",
                      border: `1px solid ${th.palette.divider}`,
                      backgroundColor: "transparent",
                      color: "text.secondary",
                    })}
                  />
                ))}
              </Box>
            )}

            {project.link && (
              <Button
                component="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                sx={{
                  mt: 2.5,
                  borderRadius: "8px",
                  py: 1,
                  px: 2.5,
                  fontWeight: 700,
                  fontSize: 13,
                  color: "primary.contrastText",
                }}
              >
                {t("projectCard.openDemo")}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Reveal>
  );
}

export default function Projects({ skipEntranceAnimation = false }) {
  return (
    <main>
      <LandingHero
        hero={HERO}
        breadcrumb="Projekte"
        skipEntranceAnimation={skipEntranceAnimation}
      />

      <Section
        id="proj-list"
        title="Alle Eigenentwicklungen im Detail"
        subtitle="Jedes Projekt entstand ohne Auftraggeber, in eigener Verantwortung von der Idee bis zur fertigen Anwendung."
        sx={{ background: WASH.teal }}
      >
        <Box sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
          {projects.map((project, idx) => (
            <ProjectShowcase key={project.id} project={project} idx={idx} />
          ))}
        </Box>
      </Section>

      <Section id="proj-cta" sx={{ background: WASH.tealStrong }}>
        <ClosingCta
          cta={{
            title: "Etwas Ähnliches für Ihr Unternehmen?",
            text: "Diese Projekte zeigen meine Arbeitsweise – von der Konzeption bis zur technischen Umsetzung. Schildern Sie mir kurz Ihr Vorhaben, ich melde mich mit einer ersten Einschätzung.",
            cross: {
              text: "Auf der Suche nach einer individuellen App oder Software?",
              to: "/app-entwicklung-kaufbeuren",
              label: "Zur App- und Softwareentwicklung in Kaufbeuren",
            },
          }}
          mailSubject="Anfrage nach Ansicht der Projekte"
        />
      </Section>
    </main>
  );
}
