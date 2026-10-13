// Route-level code splitting for About, TechStack, Apps, Contact, Imprint,
// Privacy and LandingPage — restored after an earlier pass removed it
// entirely (merging all seven into the main bundle) to fix a hydration
// mismatch. That mismatch is specifically avoided here, not by giving up
// code-splitting, but by never using React.lazy()/<Suspense> for the
// *initial* hydrating render — see src/main.jsx and App.jsx's
// `resolvedComponents` prop for how. This file has two separate exports
// for two separate situations:
//
//   - Lazy*: ordinary React.lazy() components, each wrapped in <Suspense>
//     by App.jsx. Used whenever a route's component wasn't eagerly
//     resolved already — in practice, any route reached via later
//     client-side navigation (there's no SSR output to match against at
//     that point, so an ordinary lazy+Suspense mount is exactly correct
//     and safe, same as this app worked before pre-rendering existed).
//
//   - ROUTE_MODULE_LOADERS: plain dynamic import() calls (not wrapped in
//     React.lazy), keyed by route path. src/main.jsx awaits the current
//     route's entry *before* calling hydrateRoot, so by the time React
//     renders for the first time, the needed component(s) are already
//     plain, resolved values — structurally identical to what
//     src/entry-server.jsx's eager SSR render produced, so hydration has
//     nothing to mismatch on. import() of the same specifier shares the
//     browser's module cache with the Lazy* components above, so this
//     never double-downloads a chunk.
import { lazy } from "react";

export const LazyAbout = lazy(() => import("./components/About.jsx"));
export const LazyTechStack = lazy(() => import("./components/TechStack.jsx"));
export const LazyApps = lazy(() => import("./components/Apps.jsx"));
export const LazyContact = lazy(() => import("./components/Contact.jsx"));
export const LazyImprint = lazy(() => import("./components/Imprint.jsx"));
export const LazyPrivacy = lazy(() => import("./components/Privacy.jsx"));
export const LazyLandingPage = lazy(() => import("./pages/LandingPage.jsx"));

export const ROUTE_MODULE_LOADERS = {
  "/": () =>
    Promise.all([
      import("./components/About.jsx"),
      import("./components/TechStack.jsx"),
      import("./components/Apps.jsx"),
      import("./components/Contact.jsx"),
    ]).then(([about, techStack, apps, contact]) => ({
      About: about.default,
      TechStack: techStack.default,
      Apps: apps.default,
      Contact: contact.default,
    })),
  "/webseiten-kaufbeuren": () =>
    import("./pages/LandingPage.jsx").then((m) => ({ LandingPage: m.default })),
  "/app-entwicklung-kaufbeuren": () =>
    import("./pages/LandingPage.jsx").then((m) => ({ LandingPage: m.default })),
  "/ki-automatisierung": () =>
    import("./pages/LandingPage.jsx").then((m) => ({ LandingPage: m.default })),
  "/impressum": () =>
    import("./components/Imprint.jsx").then((m) => ({ Imprint: m.default })),
  "/datenschutz": () =>
    import("./components/Privacy.jsx").then((m) => ({ Privacy: m.default })),
};
