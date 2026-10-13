import { useEffect, useLayoutEffect, useMemo, useState, Suspense } from "react";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Routes, Route, useLocation, Link as RouterLink } from "react-router-dom";

import { createAppTheme } from "./theme/createAppTheme";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Section from "./components/Sections.jsx";
import Hero from "./components/Hero.jsx";
import RouteSeo from "./components/RouteSeo.jsx";
import { projects } from "./data/projects.js";
import {
  LazyAbout,
  LazyTechStack,
  LazyApps,
  LazyContact,
  LazyImprint,
  LazyPrivacy,
  LazyLandingPage,
  LazyProjects,
} from "./routeComponents.js";

// Renders `resolved` (a plain component, already available — either from
// entry-server.jsx's eager SSR imports, or from main.jsx having awaited
// ROUTE_MODULE_LOADERS before the first hydrateRoot call) when given one,
// with no <Suspense> involved at all. Falls back to the ordinary
// React.lazy() version, Suspense-wrapped, otherwise — which only happens
// for a route reached via later client-side navigation, where there's no
// SSR output to structurally match and an ordinary lazy mount is safe. See
// routeComponents.js's top comment for the full reasoning.
function RouteSlot({ resolved, lazy, instanceKey, ...props }) {
  const Resolved = resolved;
  const Lazy = lazy;
  if (Resolved) return <Resolved key={instanceKey} {...props} />;
  return (
    <Suspense fallback={null}>
      <Lazy key={instanceKey} {...props} />
    </Suspense>
  );
}

function HomePage({ skipEntranceAnimation, resolvedComponents }) {
  const { t } = useTranslation("common");
  const location = useLocation();

  // The whole page (Hero + every section, each stacked with GlowCards,
  // Reveal/ScrollParallax motion values and IntersectionObservers) used to
  // mount across several animation frames instead of one React commit,
  // because building that whole subtree from scratch on a throttled mobile
  // CPU blocked the main thread for hundreds of ms right as the user tried
  // to scroll.
  //
  // That staging is gone now that the homepage's HTML is pre-rendered at
  // build time (vite-plugins/seoHead.js + src/entry-server.jsx): the browser
  // paints the full page from the static HTML before any JS has even
  // loaded, so there is nothing left to stage — React's job on mount is
  // hydration (reconciling existing DOM), not construction from nothing,
  // which is the bottleneck the staging worked around. Staging it on top of
  // that would instead make the client's first render not match the
  // pre-rendered markup, which is a hydration mismatch.
  //
  // Nav links use client-side routing (RouterLink to="/#id"), which never
  // triggers the browser's native hash-scroll — so we scroll manually
  // whenever the hash changes, whether coming from this page or another.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <main>
      <Hero skipEntranceAnimation={skipEntranceAnimation} />

      {/* About — very light teal wash at the top, fades to white */}
      <Section
        id="about"
        title={t("sections.about.title")}
        subtitle={t("sections.about.subtitle")}
        sx={{ background: "linear-gradient(180deg, rgba(29,184,170,0.05) 0%, rgba(247,249,249,0) 100%)" }}
      >
        <RouteSlot resolved={resolvedComponents.About} lazy={LazyAbout} />
      </Section>

      {/* Tech — subtle cool-blue tint for contrast after the teal about section */}
      <Section
        id="tech"
        title={t("sections.tech.title")}
        subtitle={t("sections.tech.subtitle")}
        sx={{ background: "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.03) 100%)" }}
      >
        <RouteSlot resolved={resolvedComponents.TechStack} lazy={LazyTechStack} />
      </Section>

      {/* Apps — slightly off-white with teal tint at bottom */}
      <Section
        id="apps"
        title={t("sections.apps.title")}
        subtitle={t("sections.apps.subtitle")}
        sx={{ background: "linear-gradient(180deg, #F4F7F7 0%, rgba(247,249,249,0) 100%)" }}
      >
        {/* DriveConnect, Rechno and Tano are my own apps, not client work —
            said plainly here so the section isn't mistaken for client
            references (it used to be titled/subtitled that way). */}
        <Typography
          color="text.secondary"
          sx={{ mb: { xs: 3, md: 4 }, maxWidth: 760, fontSize: { xs: 14, md: 15 }, lineHeight: 1.65 }}
        >
          {t("sections.apps.ownNote")}{" "}
          <Typography
            component={RouterLink}
            to="/app-entwicklung-kaufbeuren"
            sx={{
              color: "primary.dark",
              fontWeight: 700,
              textDecorationColor: "rgba(22,158,146,0.4)",
              textUnderlineOffset: 3,
              "&:hover": { textDecorationColor: "currentColor" },
            }}
          >
            {t("sections.apps.devLink")}
          </Typography>
          {" · "}
          <Typography
            component={RouterLink}
            to="/projekte"
            sx={{
              color: "primary.dark",
              fontWeight: 700,
              textDecorationColor: "rgba(22,158,146,0.4)",
              textUnderlineOffset: 3,
              "&:hover": { textDecorationColor: "currentColor" },
            }}
          >
            {t("sections.apps.projectsLink")}
          </Typography>
        </Typography>

        <RouteSlot resolved={resolvedComponents.Apps} lazy={LazyApps} projects={projects} />
      </Section>

      {/* Contact — stronger teal tint, gives the page a warm close */}
      <Section
        id="contact"
        title={t("sections.contact.title")}
        subtitle={t("sections.contact.subtitle")}
        sx={{ background: "linear-gradient(180deg, rgba(29,184,170,0.04) 0%, rgba(29,184,170,0.09) 100%)" }}
      >
        <RouteSlot resolved={resolvedComponents.Contact} lazy={LazyContact} />
      </Section>
    </main>
  );
}

// Default: nothing pre-resolved — every RouteSlot above and below falls
// back to its ordinary Lazy+Suspense version. entry-server.jsx and
// main.jsx both pass their own `resolvedComponents` instead, populated
// only with the one current route's component(s) — see routeComponents.js.
const NO_RESOLVED_COMPONENTS = {};

export default function App({ resolvedComponents = NO_RESOLVED_COMPONENTS }) {
  const theme = useMemo(() => createAppTheme(), []);

  // True for this App instance's very first render — on every one of the 5
  // public routes, that first render's HTML was already pre-rendered at
  // build time (vite-plugins/seoHead.js + src/entry-server.jsx) and is
  // already visible before hydration runs. Hero/LandingPage's above-the-fold
  // entrance animation (word stagger, CTA/chip stagger, fade-up) reads this
  // to skip replaying its hidden→visible transition on that first paint —
  // replaying it would mean briefly hiding content the user can already
  // see, which is a flash, not an entrance. The flag flips to false right
  // after that first commit (effect below), so a *later* mount of the same
  // component — e.g. navigating away and back via client-side routing, a
  // genuinely fresh mount with nothing pre-rendered for it — still plays
  // the full animation exactly as before. It starts `true` identically on
  // the server (effects never run during SSR, so it never flips there) and
  // on the client's first hydration pass, so server and client agree on the
  // very first render — no hydration mismatch.
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    // Intentional: the value needs to go true (first render only) → false
    // (every render after) for App's one, long-lived instance, which needs
    // a second render to happen at all — there's no "compute during
    // render" or external-store equivalent for that. Guarded by the `if`,
    // so this never runs more than once and can't cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isFirstRender) setIsFirstRender(false);
  }, [isFirstRender]);

  // Content below the fold (Reveal.jsx, Sections.jsx titles) stays visible
  // by default — see globals.css's ".no-js .motion-reveal" rule and
  // index.html's default "no-js" class on <html>. This only removes that
  // class once React has actually committed its first tree, so the rule
  // keeps content visible for as long as JS hasn't run yet, not just while
  // it's disabled. useLayoutEffect (not useEffect) so it runs before the
  // browser paints the hydrated result — the class is already gone by the
  // time anything is shown, no separate visible toggle.
  useLayoutEffect(() => {
    document.documentElement.classList.remove("no-js");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteSeo />

      <Box className="page">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage skipEntranceAnimation={isFirstRender} resolvedComponents={resolvedComponents} />
            }
          />

          <Route
            path="/webseiten-kaufbeuren"
            element={
              <RouteSlot
                resolved={resolvedComponents.LandingPage}
                lazy={LazyLandingPage}
                instanceKey="web"
                pageKey="web"
                skipEntranceAnimation={isFirstRender}
              />
            }
          />

          <Route
            path="/app-entwicklung-kaufbeuren"
            element={
              <RouteSlot
                resolved={resolvedComponents.LandingPage}
                lazy={LazyLandingPage}
                instanceKey="app"
                pageKey="app"
                skipEntranceAnimation={isFirstRender}
              />
            }
          />

          <Route
            path="/ki-automatisierung"
            element={
              <RouteSlot
                resolved={resolvedComponents.LandingPage}
                lazy={LazyLandingPage}
                instanceKey="ai"
                pageKey="ai"
                skipEntranceAnimation={isFirstRender}
              />
            }
          />

          <Route
            path="/projekte"
            element={
              <RouteSlot
                resolved={resolvedComponents.Projects}
                lazy={LazyProjects}
                skipEntranceAnimation={isFirstRender}
              />
            }
          />

          <Route
            path="/impressum"
            element={
              <main>
                <Section id="imprint" title="Impressum" titleAs="h1" skipEntranceAnimation={isFirstRender}>
                  <RouteSlot resolved={resolvedComponents.Imprint} lazy={LazyImprint} />
                </Section>
              </main>
            }
          />

          <Route
            path="/datenschutz"
            element={
              <main>
                <Section id="privacy" title="Datenschutzerklärung" titleAs="h1" skipEntranceAnimation={isFirstRender}>
                  <RouteSlot resolved={resolvedComponents.Privacy} lazy={LazyPrivacy} />
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
