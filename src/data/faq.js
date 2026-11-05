// FAQ content for the landing pages, keyed by route path (matching
// src/seo/routes.js's ROUTES keys). Split out from landingPages.js so this
// text can also feed FAQPage JSON-LD (src/seo/routes.js, imported by both
// the Node build and the browser bundle) without pulling landingPages.js's
// MUI icon imports into that otherwise-tiny, eagerly-loaded module.
//
// Plain data only (q/a/link strings) — no DOM, no React, no icons — so it's
// safe to import from anywhere.
export const FAQ = {
  "/webseiten-kaufbeuren": [
    {
      q: "Was kostet eine Unternehmenswebsite?",
      a: "Das hängt vom Umfang ab: Anzahl der Seiten, gewünschte Funktionen und ob Texte und Bilder schon vorhanden sind. Deshalb nenne ich keine Pauschalpreise. Nach einem kurzen Erstgespräch erhalten Sie ein individuelles, nachvollziehbares Angebot.",
    },
    {
      q: "Wie lange dauert die Erstellung?",
      a: "Eine überschaubare Unternehmenswebsite lässt sich häufig innerhalb weniger Wochen umsetzen. Entscheidend ist, wie schnell Inhalte und Feedback vorliegen. Einen realistischen Zeitplan nenne ich Ihnen nach dem Erstgespräch.",
    },
    {
      q: "Kann meine vorhandene Website modernisiert werden?",
      a: "Ja. Eine bestehende Website kann überarbeitet oder neu aufgebaut werden – optisch, inhaltlich und technisch. Im Erstgespräch schauen wir gemeinsam, was sich übernehmen lässt und wo ein Neuaufbau sinnvoller ist.",
    },
    {
      q: "Funktioniert die Website auch auf dem Smartphone?",
      a: "Ja. Jede Website wird für Smartphone, Tablet und Desktop entwickelt und auf den gängigen Bildschirmgrößen geprüft. Gerade bei lokalen Suchanfragen kommen die meisten Besucher vom Handy.",
    },
    {
      q: "Übernimmt Bayar Solutions Wartung und Änderungen?",
      a: "Ja, auf Wunsch. Ob Textänderungen, neue Seiten oder technische Updates – Sie können mich auch nach dem Start weiter beauftragen. Umfang und Konditionen besprechen wir vorab.",
    },
    {
      q: "Können individuelle Funktionen umgesetzt werden?",
      a: "Ja. Neben klassischen Unternehmensseiten entwickle ich Lösungen mit besonderen Funktionen, etwa Anfrage- und Buchungsformulare, geschützte Bereiche oder Anbindungen an andere Systeme. Wenn Ihr Vorhaben eher in Richtung einer eigenen Anwendung geht, finden Sie mehr dazu unter",
      link: { to: "/app-entwicklung-kaufbeuren", label: "individuelle App-Entwicklung" },
    },
    {
      q: "Kann meine Website auch mit KI-Automatisierung kombiniert werden?",
      a: "Ja. Wiederkehrende Abläufe rund um Ihre Website – etwa automatische Antworten auf Anfragen oder die Weiterverarbeitung von Formulardaten – lassen sich mit individuellen Automatisierungen ergänzen. Mehr dazu finden Sie unter",
      link: { to: "/ki-automatisierung", label: "KI-Automatisierung für Unternehmen" },
    },
  ],

  "/app-entwicklung-kaufbeuren": [
    {
      q: "Was kostet eine individuelle App?",
      a: "Das hängt stark von Umfang und Funktionen ab, deshalb gibt es bei mir keine Pauschalpreise. Nach einem Erstgespräch, in dem wir Ihre Anforderungen klären, erhalten Sie ein individuelles und nachvollziehbares Angebot.",
    },
    {
      q: "Wie lange dauert die Entwicklung?",
      a: "Von der Idee bis zur ersten nutzbaren Version vergehen je nach Umfang meist mehrere Wochen bis Monate. Sinnvoll ist ein schrittweises Vorgehen: erst ein schlanker, funktionierender Kern, dann Erweiterungen.",
    },
    {
      q: "Entwickeln Sie für iOS oder Android?",
      a: "Beides: Ich entwickle native Apps für iOS und Android sowie Web-Anwendungen, die auf allen Geräten ohne Store laufen. Welche Plattform für Ihr Vorhaben am sinnvollsten ist, klären wir im Erstgespräch.",
    },
    {
      q: "Muss es überhaupt eine App sein?",
      a: "Nicht immer. Manchmal reicht eine gut gebaute Website oder Web-Anwendung. Ich empfehle das, was Ihr Ziel mit dem geringsten Aufwand erreicht. Falls eine Website der bessere erste Schritt ist, finden Sie dazu mehr unter",
      link: { to: "/webseiten-kaufbeuren", label: "professionelle Unternehmenswebsites" },
    },
    {
      q: "Kann die App mit bestehenden Systemen verbunden werden?",
      a: "Häufig ja, über Schnittstellen (APIs). Ob das möglich ist, hängt davon ab, ob Ihr bestehendes System eine Schnittstelle anbietet. Das prüfen wir am Anfang, damit später keine Überraschungen entstehen.",
    },
    {
      q: "Was passiert nach der Veröffentlichung?",
      a: "Software lebt weiter: Betriebssysteme ändern sich, Anforderungen wachsen. Auf Wunsch übernehme ich Wartung, Fehlerbehebung und neue Funktionen. Umfang und Konditionen besprechen wir vorab.",
    },
    {
      q: "Lässt sich eine App mit KI-Automatisierung verbinden?",
      a: "Ja. Abläufe innerhalb oder rund um eine App – etwa Datenverarbeitung, Benachrichtigungen oder die Anbindung an andere Systeme – lassen sich automatisieren. Mehr dazu finden Sie unter",
      link: { to: "/ki-automatisierung", label: "KI-Automatisierung für Unternehmen" },
    },
  ],

  "/ki-automatisierung": [
    {
      q: "Was kann ich mit KI-Automatisierung in meinem Unternehmen automatisieren?",
      a: "Das hängt von Ihren Abläufen ab. Häufig eignen sich wiederkehrende, regelbasierte Aufgaben wie E-Mail-Bearbeitung, Dokumentenverarbeitung oder Datenübertragung zwischen Systemen. Im Erstgespräch schauen wir uns Ihren konkreten Ablauf an.",
    },
    {
      q: "Was kostet eine KI-Automatisierung?",
      a: "Das hängt stark vom Umfang und von der Komplexität des Ablaufs ab, deshalb gibt es keine Pauschalpreise. Nach einem kurzen Erstgespräch erhalten Sie eine individuelle, nachvollziehbare Einschätzung.",
    },
    {
      q: "Ist meine Automatisierung DSGVO-konform?",
      a: "Datenschutz ist bei der Verarbeitung von Unternehmensdaten ein wichtiger Aspekt, den ich bei der technischen Umsetzung berücksichtige. Eine rechtliche Bewertung Ihrer individuellen Situation kann ich als Softwareentwickler jedoch nicht ersetzen – dafür empfiehlt sich im Zweifel zusätzlich eine rechtliche Beratung.",
    },
    {
      q: "Lohnt sich KI-Automatisierung auch für kleine Unternehmen?",
      a: "Das kommt auf den konkreten Ablauf an. Auch bei kleineren Unternehmen kann sich eine Automatisierung lohnen, wenn eine Aufgabe häufig und nach einem klaren Muster wiederkehrt. Ob sich der Aufwand lohnt, lässt sich am besten im Erstgespräch einschätzen.",
    },
    {
      q: "Wie lange dauert die Umsetzung einer Automatisierung?",
      a: "Je nach Umfang reicht das von wenigen Tagen für eine einzelne automatisierte Aufgabe bis zu mehreren Wochen für eine komplexere Integration. Einen realistischen Zeitrahmen nenne ich nach der Anforderungsklärung.",
    },
    {
      q: "Können bestehende Systeme eingebunden werden?",
      a: "Häufig ja, sofern Ihr bestehendes System eine Schnittstelle (API) anbietet oder sich Daten strukturiert exportieren lassen. Das prüfe ich zu Beginn, damit später keine Überraschungen entstehen. Wenn dafür eine neue Anwendung oder ein eigenes Backend sinnvoll ist, übernehme ich auch das – mehr dazu unter",
      link: { to: "/app-entwicklung-kaufbeuren", label: "App- und Softwareentwicklung in Kaufbeuren" },
    },
  ],
};
