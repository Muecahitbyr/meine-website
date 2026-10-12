import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./styles/globals.css";
import "./i18n/config";
import { ROUTES } from "./seo/routes.js";
import { ROUTE_MODULE_LOADERS } from "./routeComponents.js";

const rootEl = document.getElementById("root");

// Every known public route (src/seo/routes.js) ships pre-rendered HTML for
// its exact path (vite-plugins/seoHead.js + src/entry-server.jsx, at build
// time) — on those, hydrateRoot reuses that markup instead of discarding and
// rebuilding it. Any other path (e.g. a mistyped URL, served with a real
// HTTP 404 by Cloudflare's asset handler — see wrangler.jsonc) has no
// matching pre-rendered body for what React would actually render there, so
// a plain client render replaces it instead of hydrating — avoiding a
// hydration mismatch for that edge case.
const path = location.pathname.length > 1 ? location.pathname.replace(/\/+$/, "") : "/";
const known = Object.prototype.hasOwnProperty.call(ROUTES, path);

// For a known route, also await that route's own component(s) — plain
// dynamic import()s, not React.lazy() — before the first hydrateRoot call,
// so the client's very first render already has them as resolved values,
// matching entry-server.jsx's eager SSR render structurally (no <Suspense>
// boundary on either side for this route). Skipped for an unknown path:
// nothing there is pre-rendered to match anyway, and the ordinary
// createRoot() render below already falls back to each route's normal
// Lazy+Suspense version on demand. See routeComponents.js's top comment.
const resolvedComponents = known ? await (ROUTE_MODULE_LOADERS[path]?.() ?? {}) : {};

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App resolvedComponents={resolvedComponents} />
    </BrowserRouter>
  </React.StrictMode>
);

if (known) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}
