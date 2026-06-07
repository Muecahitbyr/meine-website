import { useMemo } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";

import { createAppTheme } from "./theme/createAppTheme";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
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
    <main>
      <Section id="home">
        <Hero />
      </Section>

      <Section
        id="about"
        title={t("sections.about.title")}
        subtitle={t("sections.about.subtitle")}
      >
        <About />
      </Section>

      <Section
        id="tech"
        title={t("sections.tech.title")}
        subtitle={t("sections.tech.subtitle")}
      >
        <TechStack />
      </Section>

      <Section
        id="apps"
        title={t("sections.apps.title")}
        subtitle={t("sections.apps.subtitle")}
      >
        <Apps projects={projects} />
      </Section>

      <Section
        id="contact"
        title={t("sections.contact.title")}
        subtitle={t("sections.contact.subtitle")}
      >
        <Contact />
      </Section>
    </main>
  );
}

export default function App() {
  const theme = useMemo(() => createAppTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box className="page">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/impressum"
            element={
              <main>
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
