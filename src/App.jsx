import { useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import Header from "./components/Header.jsx";
import Section from "./components/Sections.jsx";

import ParallaxBackground from "./components/ParallaxBackground.jsx";

import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import TechStack from "./components/TechStack.jsx";
import Apps from "./components/Apps.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

import { projects } from "./data/projects.js";

export default function App() {
  const { t } = useTranslation("common");
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#0a84ff" },
        },
        shape: { borderRadius: 16 },
      }),
    [mode]
  );

  const toggleMode = () => setMode((p) => (p === "dark" ? "light" : "dark"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ParallaxBackground />

      <Box className="page">
        <Header mode={mode} onToggleMode={toggleMode} />

        <main className="snapMain">
          <Section id="home">
            <Hero />
          </Section>

          <Section
            id="about"
            title={t("about.sectionTitle")}
            subtitle={t("about.sectionSubtitle")}
          >
            <About />
          </Section>

          <Section
            id="tech"
            title={t("techstack.sectionTitle")}
            subtitle={t("techstack.sectionSubtitle")}
          >
            <TechStack />
          </Section>

          <Section
            id="apps"
            title={t("apps.sectionTitle")}
            subtitle={t("apps.sectionSubtitle")}
          >
            <Apps projects={projects} />
          </Section>

          <Section
            id="contact"
            title={t("contact.sectionTitle")}
            subtitle={t("contact.sectionSubtitle")}
          >
            <Contact />
          </Section>

          <Box sx={{ py: 4 }}>
            <Footer />
          </Box>
        </main>
      </Box>
    </ThemeProvider>
  );
}