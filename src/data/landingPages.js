import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import CarRepairRoundedIcon from "@mui/icons-material/CarRepairRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";

// Kept in sync with the address shown on the Contact section / Impressum.
export const CONTACT_EMAIL = "bayar-solutions@outlook.de";

/**
 * Copy and structure for the local landing pages. The two pages deliberately
 * differ in angle and section mix (the web page has "audience", the app page
 * has "platforms") so they don't read as templated doorway pages.
 * Document title, description and schema.org data live in RouteSeo.jsx.
 */
export const LANDING_PAGES = {
  web: {
    breadcrumb: "Webseiten Kaufbeuren",
    mailSubject: "Anfrage Unternehmenswebsite",
    hero: {
      overline: "Webseiten",
      title: "Webseiten für Unternehmen in Kaufbeuren",
      lead: "Ihre Website ist oft der erste Eindruck, den neue Kunden von Ihrem Betrieb bekommen. Ich entwickle moderne, schnelle und individuelle Webseiten für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu – verständlich aufgebaut, auf dem Smartphone genauso gut bedienbar wie am Rechner und mit einer technischen Basis, die Google gut versteht.",
      chips: [
        "Individuell entwickelt",
        "Für Smartphone & Desktop",
        "Schnelle Ladezeiten",
        "Technische SEO-Basis",
      ],
      primaryCta: "Projekt anfragen",
      secondaryCta: "Referenzen ansehen",
    },
    why: {
      title: "Warum eine professionelle Website für lokale Unternehmen wichtig ist",
      subtitle:
        "Für viele Betriebe entscheidet sich schon vor dem ersten Anruf, ob ein Kunde sich meldet.",
      items: [
        {
          Icon: SearchRoundedIcon,
          title: "Gefunden werden",
          text: "Wer in Kaufbeuren einen Handwerker, eine Werkstatt oder einen Dienstleister sucht, greift zuerst zum Smartphone. Eine Website mit klaren Angaben zu Leistungen, Region und Kontakt sorgt dafür, dass Sie in diesem Moment auffindbar sind.",
        },
        {
          Icon: VerifiedRoundedIcon,
          title: "Vertrauen aufbauen",
          text: "Ein aufgeräumter, moderner Auftritt zeigt, dass Ihr Betrieb sorgfältig arbeitet. Veraltete oder unübersichtliche Seiten können dagegen Interessenten abschrecken, bevor sie Sie überhaupt kennenlernen.",
        },
        {
          Icon: MarkEmailReadRoundedIcon,
          title: "Anfragen erleichtern",
          text: "Ob Anruf, E-Mail oder Kontaktformular: Besucher sollen ohne Umwege den Weg zu Ihnen finden – unterwegs am Smartphone genauso wie am Schreibtisch.",
        },
      ],
    },
    offer: {
      title: "Was ich für Ihre Website umsetze",
      subtitle:
        "Von der einfachen Firmenseite bis zur Website mit besonderen Funktionen.",
      items: [
        {
          Icon: WebRoundedIcon,
          title: "Individuelle Unternehmenswebseiten",
          text: "Kein Baukasten-Look: Aufbau, Design und Inhalte richten sich nach Ihrem Betrieb und Ihren Kunden.",
        },
        {
          Icon: DevicesRoundedIcon,
          title: "Responsive Darstellung",
          text: "Ihre Seite passt sich Smartphone, Tablet und Desktop an und wird auf den gängigen Bildschirmgrößen geprüft.",
        },
        {
          Icon: SpeedRoundedIcon,
          title: "Schnelle Ladezeiten",
          text: "Schlanker Code und optimierte Bilder, damit Besucher nicht auf Ihre Seite warten müssen.",
        },
        {
          Icon: DashboardCustomizeRoundedIcon,
          title: "Moderne Benutzeroberfläche",
          text: "Klare Struktur, gut lesbare Typografie und eine Bedienung, die ohne Erklärung funktioniert.",
        },
        {
          Icon: ContactMailRoundedIcon,
          title: "Kontaktformulare",
          text: "Anfragen erreichen Sie direkt – mit genau den Feldern, die Sie für eine Rückmeldung brauchen.",
        },
        {
          Icon: TravelExploreRoundedIcon,
          title: "Technische SEO-Basis",
          text: "Saubere Seitenstruktur, Meta-Angaben, Sitemap und strukturierte Daten als Grundlage für die Auffindbarkeit bei Google.",
        },
        {
          Icon: BuildCircleRoundedIcon,
          title: "Wartung und Erweiterungen",
          text: "Inhalte ändern, neue Seiten ergänzen, Technik aktuell halten – auf Wunsch auch nach dem Start.",
        },
        {
          Icon: ExtensionRoundedIcon,
          title: "Individuelle Funktionen",
          text: "Anfrage- oder Buchungsstrecken, geschützte Bereiche oder Anbindungen an bestehende Systeme, wenn eine Standardlösung nicht reicht.",
        },
      ],
    },
    audience: {
      title: "Für welche Unternehmen",
      subtitle:
        "Beispiele für Bereiche, in denen eine gute lokale Website besonders viel bewirkt – keine Kundenliste.",
      items: [
        {
          Icon: HandymanRoundedIcon,
          title: "Handwerksbetriebe",
          text: "Leistungen, Einsatzgebiet und Anfrage auf einen Blick.",
        },
        {
          Icon: CarRepairRoundedIcon,
          title: "Werkstätten",
          text: "Leistungsumfang, Erreichbarkeit und Terminanfrage klar dargestellt.",
        },
        {
          Icon: RestaurantRoundedIcon,
          title: "Gastronomie",
          text: "Speisekarte, Standort und Reservierung übersichtlich auf dem Smartphone.",
        },
        {
          Icon: DirectionsCarRoundedIcon,
          title: "Fahrschulen",
          text: "Angebot, Ablauf und Anmeldung verständlich strukturiert.",
        },
        {
          Icon: BusinessCenterRoundedIcon,
          title: "Dienstleister",
          text: "Das eigene Angebot verständlich erklären und Vertrauen aufbauen.",
        },
        {
          Icon: PersonRoundedIcon,
          title: "Selbstständige & Mittelstand",
          text: "Ein Auftritt, der zur Größe und zum Anspruch Ihres Unternehmens passt.",
        },
      ],
    },
    process: {
      title: "So läuft ein Website-Projekt ab",
      subtitle: "Überschaubar und transparent – Sie wissen jederzeit, wo wir stehen.",
      steps: [
        {
          title: "Erstgespräch",
          text: "Wir klären Ziele, Zielgruppe und was Ihre Website leisten soll.",
        },
        {
          title: "Planung",
          text: "Seitenstruktur, Inhalte und Funktionen werden festgelegt, bevor Code entsteht.",
        },
        {
          title: "Design und Entwicklung",
          text: "Ich setze Ihre Website um – im Look Ihres Unternehmens und technisch sauber.",
        },
        {
          title: "Abstimmung",
          text: "Sie prüfen den Stand, geben Feedback, und ich arbeite es ein.",
        },
        {
          title: "Veröffentlichung",
          text: "Die Website geht online – inklusive technischer SEO-Basis.",
        },
        {
          title: "Betreuung",
          text: "Auf Wunsch kümmere ich mich um Änderungen, Updates und Erweiterungen.",
        },
      ],
    },
    local: {
      title: "Kaufbeuren & Allgäu",
      paragraphs: [
        "Bayar Solutions arbeitet für Unternehmen und Selbstständige aus Kaufbeuren und dem Allgäu. Wer lokal Kunden gewinnen will, wird meist konkret gesucht: nach einem Betrieb in der Nähe, mit klaren Angaben zu Leistungen und Erreichbarkeit.",
        "Genau darauf richte ich Struktur und Inhalte Ihrer Website aus – mit eindeutigem Bezug zu Ihrer Region, verständlichen Leistungsbeschreibungen und einem Kontaktweg, der auf jedem Gerät funktioniert.",
        "Die Zusammenarbeit läuft unkompliziert digital, ein erster Kontakt per E-Mail genügt. Auf Wunsch stimmen wir uns auch persönlich ab.",
      ],
      cardTitle: "Einzugsgebiet",
      cardPoints: ["Kaufbeuren", "Allgäu", "Auf Wunsch auch darüber hinaus"],
    },
    references: {
      title: "Referenzen",
      text: "Meine bisherigen veröffentlichten Projekte sind native iOS-Apps – vom Rechnungsprogramm bis zur Quiz-App. Sie zeigen, wie ich Oberflächen gestalte und Funktionen umsetze. Einen Überblick mit Screenshots finden Sie auf der Startseite.",
      link: "Alle Referenzen ansehen",
      showApps: false,
    },
    faq: {
      title: "Häufige Fragen zur Website-Erstellung",
      items: [
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
      ],
    },
    cta: {
      title: "Lassen Sie uns über Ihre Website sprechen",
      text: "Schildern Sie mir kurz Ihr Vorhaben – ein paar Sätze per E-Mail genügen. Ich melde mich zeitnah mit einer ersten Einschätzung.",
      cross: {
        text: "Sie brauchen mehr als eine Website?",
        to: "/app-entwicklung-kaufbeuren",
        label: "Zur App-Entwicklung in Kaufbeuren",
      },
    },
  },

  app: {
    breadcrumb: "App-Entwicklung Kaufbeuren",
    mailSubject: "Anfrage App-Entwicklung",
    hero: {
      overline: "Apps",
      title: "App-Entwicklung für Unternehmen in Kaufbeuren",
      lead: "Eine eigene App kann Abläufe vereinfachen, Kunden enger an Ihr Unternehmen binden oder ein neues Angebot erst möglich machen. Ich entwickle individuelle Apps und Anwendungen für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu – von der ersten Idee bis zur Veröffentlichung.",
      chips: [
        "Native iOS-Apps mit SwiftUI",
        "Web-Anwendungen",
        "Backend & Schnittstellen",
        "Wartung & Weiterentwicklung",
      ],
      primaryCta: "App-Idee besprechen",
      secondaryCta: "Referenzen ansehen",
    },
    why: {
      title: "Wann sich eine eigene App lohnt",
      subtitle:
        "Nicht jedes Unternehmen braucht eine App – aber in diesen Situationen ist sie oft die beste Lösung.",
      items: [
        {
          Icon: SettingsSuggestRoundedIcon,
          title: "Abläufe digitalisieren",
          text: "Aufträge, Rechnungen, Termine oder interne Prozesse, die bisher über Zettel, Excel oder Chatverläufe laufen, lassen sich in einer Anwendung bündeln.",
        },
        {
          Icon: SmartphoneRoundedIcon,
          title: "Kunden direkt erreichen",
          text: "Eine App bringt Ihr Angebot aufs Smartphone Ihrer Kunden – für Buchungen, Bestellungen, Statusinformationen oder ein Kundenkonto.",
        },
        {
          Icon: LightbulbRoundedIcon,
          title: "Eine Idee umsetzen",
          text: "Aus einem Produktkonzept oder Geschäftsmodell wird eine nutzbare Anwendung – Schritt für Schritt und mit einem ersten lauffähigen Stand, an dem sich die Idee prüfen lässt.",
        },
      ],
    },
    offer: {
      title: "Was ich entwickle",
      subtitle:
        "Maßgeschneiderte Software statt Standardlösungen, die nur halb passen.",
      items: [
        {
          Icon: PhoneIphoneRoundedIcon,
          title: "Individuelle Apps",
          text: "Mobile Anwendungen, die genau zu Ihrem Anwendungsfall und Ihre Abläufe passen.",
        },
        {
          Icon: BusinessRoundedIcon,
          title: "Interne Unternehmenslösungen",
          text: "Werkzeuge für Team und Verwaltung: Aufträge, Listen, Auswertungen und Freigaben an einem Ort.",
        },
        {
          Icon: AdminPanelSettingsRoundedIcon,
          title: "Kundenportale",
          text: "Geschützte Bereiche, in denen Kunden Informationen, Dokumente oder Vorgänge einsehen können.",
        },
        {
          Icon: EventAvailableRoundedIcon,
          title: "Buchungs- und Terminlösungen",
          text: "Termine, Reservierungen oder Anfragen digital entgegennehmen und übersichtlich verwalten.",
        },
        {
          Icon: ExtensionRoundedIcon,
          title: "Individuelle Business-Funktionen",
          text: "Berechnungen, Exporte oder Abläufe, die genau Ihre Arbeitsweise abbilden.",
        },
        {
          Icon: HubRoundedIcon,
          title: "Backend und Schnittstellen",
          text: "Daten sauber speichern und – wo eine Schnittstelle verfügbar ist – mit Ihren bestehenden Systemen verbinden.",
        },
        {
          Icon: LanguageRoundedIcon,
          title: "Web-Anwendungen",
          text: "Browserbasierte Software, die ohne Installation auf jedem Gerät läuft.",
        },
        {
          Icon: UpdateRoundedIcon,
          title: "Wartung und Weiterentwicklung",
          text: "Updates, Fehlerbehebung und neue Funktionen nach dem Start – die App bleibt nutzbar und wächst mit.",
        },
      ],
    },
    platforms: {
      title: "iOS, Web oder beides?",
      subtitle:
        "Die passende Plattform hängt von Ihrer Zielgruppe ab. Ich sage Ihnen ehrlich, was ich empfehle.",
      items: [
        {
          Icon: AppleIcon,
          title: "iOS-App",
          text: "Mein Schwerpunkt: native Entwicklung mit SwiftUI und Veröffentlichung im App Store – so wie bei den Apps in meinen Referenzen.",
        },
        {
          Icon: LanguageRoundedIcon,
          title: "Web-Anwendung",
          text: "Läuft im Browser auf iPhone, Android und Desktop, ganz ohne Store. Oft die richtige Wahl für interne Tools und Kundenportale.",
        },
        {
          Icon: AndroidRoundedIcon,
          title: "Android",
          text: "Native Android-Apps sind nicht mein Schwerpunkt. Wenn Ihre Zielgruppe überwiegend Android nutzt, prüfen wir im Erstgespräch, ob eine Web-Anwendung die bessere Lösung ist.",
        },
      ],
    },
    process: {
      title: "Von der Idee zur fertigen Anwendung",
      subtitle: "Ein klarer Ablauf – mit einem lauffähigen Stand, bevor es ins Detail geht.",
      steps: [
        {
          title: "Idee und Anforderungen",
          text: "Wir klären, welches Problem gelöst werden soll, wer die App nutzt und was sie können muss.",
        },
        {
          title: "Konzept und Entwurf",
          text: "Screens, Abläufe und Datenflüsse werden skizziert, bevor Code entsteht.",
        },
        {
          title: "Entwicklung",
          text: "Ich setze die App in überschaubaren Schritten um, sodass Sie früh etwas ausprobieren können.",
        },
        {
          title: "Test und Feedback",
          text: "Wir testen gemeinsam, sammeln Rückmeldungen und schärfen nach.",
        },
        {
          title: "Veröffentlichung",
          text: "Ich begleite die Veröffentlichung – im App Store oder als Web-Anwendung.",
        },
        {
          title: "Betrieb und Ausbau",
          text: "Wartung, Updates und neue Funktionen nach Bedarf.",
        },
      ],
    },
    local: {
      title: "Kaufbeuren & Allgäu",
      paragraphs: [
        "Bayar Solutions arbeitet für Unternehmen und Selbstständige aus Kaufbeuren und dem Allgäu. Bei einem Softwareprojekt zählt vor allem, dass Anforderungen direkt und ohne Umwege ankommen.",
        "Als Einzelunternehmen sprechen Sie mit der Person, die Ihre App später auch entwickelt. Das hält Abstimmungen kurz und Entscheidungen nachvollziehbar.",
        "Ein erster Kontakt per E-Mail genügt. Auf Wunsch stimmen wir uns auch persönlich ab.",
      ],
      cardTitle: "Direkter Draht",
      cardPoints: [
        "Ansprechpartner von Anfang bis Ende: eine Person",
        "Kurze Abstimmungswege",
        "Region Kaufbeuren und Allgäu",
      ],
    },
    references: {
      title: "Referenzen",
      subtitle: "Drei Apps aus meinem Portfolio – im App Store verfügbar.",
      link: "Alle Referenzen ansehen",
      showApps: true,
    },
    faq: {
      title: "Häufige Fragen zur App-Entwicklung",
      items: [
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
          a: "Mein Schwerpunkt sind native iOS-Apps mit SwiftUI. Für Zielgruppen, die überwiegend Android nutzen, ist häufig eine Web-Anwendung sinnvoll, die auf allen Geräten läuft. Was für Ihr Vorhaben passt, klären wir im Erstgespräch.",
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
      ],
    },
    cta: {
      title: "Erzählen Sie mir von Ihrer App-Idee",
      text: "Ein kurzer Überblick per E-Mail genügt: Was soll die App können, und für wen ist sie gedacht? Ich melde mich zeitnah mit einer ersten Einschätzung.",
      cross: {
        text: "Brauchen Sie zunächst eine Unternehmenswebsite?",
        to: "/webseiten-kaufbeuren",
        label: "Zu den Webseiten in Kaufbeuren",
      },
    },
  },
};
