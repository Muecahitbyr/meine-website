// Cloudflare Worker fuer bayar-solutions.de.
//
// Alles unter /office (und Unterpfade) wird an den echten ProjectOps-
// Ursprungsserver auf dem Hetzner-Server weitergereicht, statt von der
// statischen React-Seite beantwortet zu werden. Alles andere laeuft
// unveraendert ueber den Asset-Handler (siehe wrangler.jsonc "assets" +
// "run_worker_first" - der Worker wird fuer alle anderen Pfade gar nicht
// erst aufgerufen).
//
// SSL-Loesung: Es gibt fuer den Hetzner-Server absichtlich KEIN Zertifikat
// auf die nackte IP - stattdessen einen echten, oeffentlich aufloesbaren
// Hostnamen "ops-origin.bayar-solutions.de", der per A-Record direkt auf
// die Server-IP zeigt und fuer den nginx dort ein echtes Let's-Encrypt-
// Zertifikat hat (server_name ops-origin.bayar-solutions.de). Der Worker
// verbindet sich also ganz normal per Hostname/HTTPS dorthin - kein
// cf.resolveOverride, kein "-k"/Insecure-Modus noetig. (Historischer
// Kontext: dieselbe Origin wurde vorher schon per vercel.json-Rewrites
// genauso angesprochen, bevor die Seite auf Cloudflare Workers migriert
// wurde - siehe Git-Historie.)
const ORIGIN_HOST = "ops-origin.bayar-solutions.de";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/office" || url.pathname.startsWith("/office/")) {
      return proxyToOrigin(request, url);
    }

    // Sollte durch run_worker_first in wrangler.jsonc eigentlich nie
    // erreicht werden - Fallback nur zur Sicherheit, falls sich die
    // Worker-Route je aendert.
    return env.ASSETS.fetch(request);
  },
};

async function proxyToOrigin(request, url) {
  // Der Origin-Server erwartet /api, /health, /ws etc. OHNE das /office-
  // Praefix (dessen nginx hat keine "/office"-Location, siehe
  // deploy/nginx/reverse-proxy.conf im ProjectOps-Repo - nur "/api/",
  // "/health", "/ws" und "/"). Praefix wird deshalb beim Weiterleiten
  // abgeschnitten, genau wie es vorher schon die Vercel-Rewrite-Regel tat
  // ("/office/:path*" -> "https://ops-origin.bayar-solutions.de/:path*",
  // KEIN "/office" im Ziel). Der Besucher sieht in seiner eigenen URL-Leiste
  // weiterhin "/office/...", das betrifft nur die interne Weiterleitung.
  //
  // Echt getestet (nicht nur angenommen): ein Asset-Request mit
  // beibehaltenem Praefix (/office/assets/x.js) bekam vom Origin
  // faelschlich die index.html zurueck (SPA-Fallback-Kollision) statt der
  // echten JS-Datei - erst ohne Praefix kam der richtige Content-Type.
  const strippedPath = url.pathname === "/office" ? "/" : url.pathname.slice("/office".length);
  const targetUrl = new URL(strippedPath + url.search, `https://${ORIGIN_HOST}`);

  // Host-Header MUSS explizit ueberschrieben werden: ohne das wuerde der
  // ORIGINALE Host-Header ("bayar-solutions.de", der Domain, unter der der
  // Besucher tatsaechlich unterwegs ist) unveraendert an den Origin-Server
  // durchgereicht - dessen nginx kennt aber nur den server_name
  // "ops-origin.bayar-solutions.de" und wuerde die Anfrage sonst ablehnen/
  // falsch zuordnen.
  const headers = new Headers(request.headers);
  headers.set("Host", ORIGIN_HOST);
  headers.set("X-Forwarded-Host", url.hostname);
  headers.set("X-Forwarded-Proto", "https");

  const init = {
    method: request.method,
    headers,
    // "manual" statt des Fetch-Standardverhaltens (automatisches Folgen) -
    // eine Weiterleitung vom Origin-Server soll unveraendert beim Browser
    // des Besuchers ankommen (z.B. fuer Login-Redirects), nicht vom Worker
    // selbst aufgeloest werden.
    redirect: "manual",
  };

  // GET/HEAD duerfen in der Fetch-API keinen Body haben.
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  // Funktioniert unveraendert auch fuer WebSocket-Upgrades (ProjectOps
  // nutzt /office/ws fuer Realtime-Updates): fetch() gegen eine
  // Upgrade:-websocket-Anfrage liefert eine Response mit gesetztem
  // .webSocket-Feld zurueck, das beim direkten Durchreichen automatisch an
  // den Browser des Besuchers weitergegeben wird.
  return fetch(targetUrl.toString(), init);
}
