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

export default function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={(t) => ({
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        })}
      >
        <Header
          mode={mode}
          onToggleMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
        />

        <Hero />

        <Section
          id="about"
          title="Über mich"
          subtitle="Ich entwickle Apple Apps mit Swift & SwiftUI – clean, schnell, modern."
        >
          <About />
        </Section>

        <Section
          id="apps"
          title="Apps"
          subtitle="halter-Projekte – ersetze sie durch deine echten Apps und ScreenshotsPlatz."
        >
          <Apps projects={projects} />
        </Section>

        <Section
          id="contact"
          title="Kontakt"
          subtitle="Schreib mir direkt per E-Mail."
        >
          <Contact />
        </Section>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
