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
import Privacy from "./components/Privacy.jsx";

import { projects } from "./data/projects.js";

function HomePage() {
  const { t } = useTranslation("common");

  return (
    <main>
      <Hero />

      {/* About — very light teal wash at the top, fades to white */}
      <Section
        id="about"
        title={t("sections.about.title")}
        subtitle={t("sections.about.subtitle")}
        sx={{ background: "linear-gradient(180deg, rgba(29,184,170,0.05) 0%, rgba(247,249,249,0) 100%)" }}
      >
        <About />
      </Section>

      {/* Tech — subtle cool-blue tint for contrast after the teal about section */}
      <Section
        id="tech"
        title={t("sections.tech.title")}
        subtitle={t("sections.tech.subtitle")}
        sx={{ background: "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.03) 100%)" }}
      >
        <TechStack />
      </Section>

      {/* Apps — slightly off-white with teal tint at bottom */}
      <Section
        id="apps"
        title={t("sections.apps.title")}
        subtitle={t("sections.apps.subtitle")}
        sx={{ background: "linear-gradient(180deg, #F4F7F7 0%, rgba(247,249,249,0) 100%)" }}
      >
        <Apps projects={projects} />
      </Section>

      {/* Contact — stronger teal tint, gives the page a warm close */}
      <Section
        id="contact"
        title={t("sections.contact.title")}
        subtitle={t("sections.contact.subtitle")}
        sx={{ background: "linear-gradient(180deg, rgba(29,184,170,0.04) 0%, rgba(29,184,170,0.09) 100%)" }}
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

          <Route
            path="/datenschutz"
            element={
              <main>
                <Section id="privacy" title="Datenschutz">
                  <Privacy />
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
