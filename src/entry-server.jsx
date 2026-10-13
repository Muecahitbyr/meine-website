// Server-only entry point. Used exclusively by vite-plugins/seoHead.js, in a
// short-lived nested Node SSR build, to render each public route's full
// content to static HTML at build time — so crawlers that don't execute
// JavaScript (and search engines before/while they render) see the real
// page, not an empty <div id="root">. Never shipped to the browser:
// src/main.jsx is the actual client entry and does not import this file.
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { StaticRouter } from "react-router-dom";

import "./i18n/config.js";
import App from "./App.jsx";

// Plain, eager imports — never React.lazy() — so the component is already
// a resolved value when rendered, with no <Suspense> boundary needed or
// wanted. App.jsx's `resolvedComponents` prop renders these directly; its
// *default* behaviour (every other route, i.e. ones RESOLVED_BY_PATH below
// doesn't populate for this request) falls back to React.lazy()+Suspense,
// which is fine client-side but would reintroduce the exact problem this
// sidesteps if it ever ran here — see routeComponents.js's top comment for
// the full reasoning, confirmed by bisecting a minimal reproduction:
// react-dom/server's streaming renderer wraps any <Suspense> boundary
// nested below the page's top level in a `<div hidden>` template plus an
// inline JS "reveal" script, regardless of whether its content actually
// suspended, which only un-hides with JavaScript — the opposite of what a
// plain saved-to-a-file HTML string needs. Importing only the module(s)
// the route being rendered actually needs (not all seven, every time) is
// what makes this file's own output route-specific rather than one giant
// shared bundle — mirrored by src/main.jsx awaiting the matching
// ROUTE_MODULE_LOADERS entry before its first hydrateRoot call, so the
// client's first render is built from the same, already-resolved shape.
import About from "./components/About.jsx";
import TechStack from "./components/TechStack.jsx";
import Apps from "./components/Apps.jsx";
import Contact from "./components/Contact.jsx";
import Imprint from "./components/Imprint.jsx";
import Privacy from "./components/Privacy.jsx";
import LandingPage from "./pages/LandingPage.jsx";

const RESOLVED_BY_PATH = {
  "/": { About, TechStack, Apps, Contact },
  "/webseiten-kaufbeuren": { LandingPage },
  "/app-entwicklung-kaufbeuren": { LandingPage },
  "/ki-automatisierung": { LandingPage },
  "/impressum": { Imprint },
  "/datenschutz": { Privacy },
};

/**
 * Renders <App/> for a given path to a complete HTML string.
 */
export function renderAppToString(path) {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={path}>
        <App resolvedComponents={RESOLVED_BY_PATH[path] ?? {}} />
      </StaticRouter>,
      {
        onAllReady() {
          // TextDecoder instead of Buffer.concat so this file needs no
          // Node-specific globals beyond the "node:stream" import itself.
          const decoder = new TextDecoder();
          let html = "";
          const sink = new PassThrough();
          sink.on("data", (chunk) => {
            html += decoder.decode(chunk, { stream: true });
          });
          sink.on("end", () => resolve(html + decoder.decode()));
          sink.on("error", reject);
          pipe(sink);
        },
        onError(err) {
          reject(err);
        },
      },
    );
  });
}
