import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { createAppTheme } from "./theme/createAppTheme.js";

import Header from "./components/Header.jsx";
import Section from "./components/Sections.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Apps from "./components/Apps.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

import { projects } from "./data/projects.js";
import { useTranslation } from "react-i18next";

export default function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const { t } = useTranslation("common");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Header
          mode={mode}
          onToggleMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
        />

        <Hero />

        <Section
          id="about"
          title={t("sections.about.title")}
          subtitle={t("sections.about.subtitle")}
        >
          <About />
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

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
