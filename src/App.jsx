import { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ParallaxBackground from "./components/ParallaxBackground.jsx";

import Section from "./components/Sections.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import TechStack from "./components/TechStack.jsx";
import Apps from "./components/Apps.jsx";
import Contact from "./components/Contact.jsx";

import Imprint from "./components/Imprint.jsx";

import { projects } from "./data/projects.js";

function HomePage() {
  const { t } = useTranslation("common");

  return (
    <main className="snapMain">
      <Section id="home">
        <Hero />
      </Section>

      <Section
        id="about"
        title="Über BAYAR-SOLUTIONS"
        subtitle="Digitale Unternehmenslösungen für Kunden, die wachsen, effizienter arbeiten und stärker am Markt wahrgenommen werden wollen."
      >
        <About />
      </Section>

      <Section
        id="tech"
        title="Leistungen"
        subtitle="Digitale Lösungen für Unternehmen mit Fokus auf Kundennutzen, Geschwindigkeit und Skalierbarkeit."
      >
        <TechStack />
      </Section>

      <Section
        id="apps"
        title="Referenzen & Lösungen"
        subtitle="Ausgewählte Kundenlösungen und digitale Referenzen."
      >
        <Apps projects={projects} />
      </Section>

      <Section
        id="contact"
        title={t("contact.sectionTitle")}
        subtitle="Bereit für dein nächstes digitales Projekt? Lass uns sprechen."
      >
        <Contact />
      </Section>
    </main>
  );
}

export default function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#3dd5c7",
          },
          background: {
            default: "#f0fcfb",
            paper: "#ffffff",
          },
        },
        shape: { borderRadius: 18 },
        typography: {
          fontFamily:
            '"Inter", "SF Pro Display", "Segoe UI", system-ui, sans-serif',
          h1: {
            fontWeight: 900,
          },
          h2: {
            fontWeight: 900,
          },
          button: {
            fontWeight: 800,
          },
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxBackground />

      <Box className="page">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/impressum"
            element={
              <main className="snapMain">
                <Section id="imprint" title="Impressum">
                  <Imprint />
                </Section>
              </main>
            }
          />

        </Routes>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}