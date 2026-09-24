import { useEffect, useMemo, useState, startTransition, lazy, Suspense } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Routes, Route, useLocation } from "react-router-dom";

import { createAppTheme } from "./theme/createAppTheme";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Section from "./components/Sections.jsx";
import Hero from "./components/Hero.jsx";
import RouteSeo from "./components/RouteSeo.jsx";
import { projects } from "./data/projects.js";

// Below-the-fold and route-only components are code-split so their JS isn't
// even downloaded/parsed as part of the critical bundle Hero needs — on a
// throttled connection that's real parse/eval time saved before the page
// can respond to input, on top of the staged-mount ordering below.
const About = lazy(() => import("./components/About.jsx"));
const TechStack = lazy(() => import("./components/TechStack.jsx"));
const Apps = lazy(() => import("./components/Apps.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const Imprint = lazy(() => import("./components/Imprint.jsx"));
const Privacy = lazy(() => import("./components/Privacy.jsx"));

function HomePage() {
  const { t } = useTranslation("common");
  const location = useLocation();

  // The whole page (Hero + every section, each stacked with GlowCards,
  // Reveal/ScrollParallax motion values and IntersectionObservers) used to
  // mount in one React commit. Profiling on a throttled mobile CPU showed
  // that commit blocking the main thread for hundreds of ms — long enough
  // that the first swipe after opening the page barely registers. React can
  // only yield *between* commits, not within one, so a single deferred
  // "mount everything" flag just moves the big block later instead of
  // shrinking it. Mounting one section per frame instead spreads that same
  // work across several small commits the browser can interleave with the
  // user's first scroll input.
  const SECTION_COUNT = 4; // about, tech, apps, contact
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= SECTION_COUNT) return;
    const raf = requestAnimationFrame(() => {
      startTransition(() => setStage((s) => s + 1));
    });
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  // Nav links use client-side routing (RouterLink to="/#id"), which never
  // triggers the browser's native hash-scroll — so we scroll manually
  // whenever the hash changes, whether coming from this page or another.
  // Re-checked as each stage mounts, since the target section may not
  // exist yet on the first pass.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash, stage]);

  return (
    <main>
      <Hero />

      {stage >= 1 && (
        /* About — very light teal wash at the top, fades to white */
        <Section
          id="about"
          title={t("sections.about.title")}
          subtitle={t("sections.about.subtitle")}
          sx={{ background: "linear-gradient(180deg, rgba(29,184,170,0.05) 0%, rgba(247,249,249,0) 100%)" }}
        >
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </Section>
      )}

      {stage >= 2 && (
        /* Tech — subtle cool-blue tint for contrast after the teal about section */
        <Section
          id="tech"
          title={t("sections.tech.title")}
          subtitle={t("sections.tech.subtitle")}
          sx={{ background: "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.03) 100%)" }}
        >
          <Suspense fallback={null}>
            <TechStack />
          </Suspense>
        </Section>
      )}

      {stage >= 3 && (
        /* Apps — slightly off-white with teal tint at bottom */
        <Section
          id="apps"
          title={t("sections.apps.title")}
          subtitle={t("sections.apps.subtitle")}
          sx={{ background: "linear-gradient(180deg, #F4F7F7 0%, rgba(247,249,249,0) 100%)" }}
        >
          <Suspense fallback={null}>
            <Apps projects={projects} />
          </Suspense>
        </Section>
      )}

      {stage >= 4 && (
        /* Contact — stronger teal tint, gives the page a warm close */
        <Section
          id="contact"
          title={t("sections.contact.title")}
          subtitle={t("sections.contact.subtitle")}
          sx={{ background: "linear-gradient(180deg, rgba(29,184,170,0.04) 0%, rgba(29,184,170,0.09) 100%)" }}
        >
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </Section>
      )}
    </main>
  );
}

export default function App() {
  const theme = useMemo(() => createAppTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteSeo />

      <Box className="page">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/impressum"
            element={
              <main>
                <Section id="imprint" title="Impressum" titleAs="h1">
                  <Suspense fallback={null}>
                    <Imprint />
                  </Suspense>
                </Section>
              </main>
            }
          />

          <Route
            path="/datenschutz"
            element={
              <main>
                <Section id="privacy" title="Datenschutzerklärung" titleAs="h1">
                  <Suspense fallback={null}>
                    <Privacy />
                  </Suspense>
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
