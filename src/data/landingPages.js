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
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

// Kept in sync with the address shown on the Contact section / Impressum.
export const CONTACT_EMAIL = "bayar-solutions@outlook.de";

/**
 * Copy and structure for the local landing pages. The pages deliberately
 * differ in angle and section mix (the web page has "audience", the app page
 * has "platforms", the AI page has neither) so they don't read as templated
 * doorway pages. Document title, description and schema.org data live in
 * src/seo/routes.js.
 */
export const LANDING_PAGES = {
  web: {
    breadcrumb: "Webseiten Kaufbeuren",
    mailSubject: "Anfrage Unternehmenswebsite",
    hero: {
      overline: "Webseiten",
      title: "Webdesign in Kaufbeuren – professionelle Webseiten für Unternehmen",
      lead: "Sie möchten eine professionelle Website erstellen lassen? Bayar Solutions entwickelt moderne, schnelle und individuelle Webseiten für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu. Von der Planung über das Webdesign bis zur Veröffentlichung erhalten Sie eine Website, die Ihr Unternehmen optimal präsentiert und potenziellen Kunden die Kontaktaufnahme erleichtert.",
      chips: [
        "Individuell entwickelt",
        "Für Smartphone & Desktop",
        "Schnelle Ladezeiten",
        "Technische SEO-Basis",
      ],
      primaryCta: "Projekt anfragen",
      secondaryCta: "Projekte ansehen",
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
      title: "Eigene Projekte",
      text: "Meine bisherigen Projekte sind eigene App-Entwicklungen – vom Rechnungsprogramm bis zur Quiz-App, keine Kundenaufträge. Sie zeigen, wie ich Oberflächen gestalte und Funktionen umsetze. Einen Überblick mit Screenshots finden Sie auf der Startseite.",
      link: "Alle Projekte ansehen",
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
        {
          q: "Kann meine Website auch mit KI-Automatisierung kombiniert werden?",
          a: "Ja. Wiederkehrende Abläufe rund um Ihre Website – etwa automatische Antworten auf Anfragen oder die Weiterverarbeitung von Formulardaten – lassen sich mit individuellen Automatisierungen ergänzen. Mehr dazu finden Sie unter",
          link: { to: "/ki-automatisierung", label: "KI-Automatisierung für Unternehmen" },
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
        "Native Apps für iOS & Android",
        "Web-Anwendungen",
        "Backend & Schnittstellen",
        "Wartung & Weiterentwicklung",
      ],
      primaryCta: "App-Idee besprechen",
      secondaryCta: "Projekte ansehen",
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
      title: "iOS, Android oder Web?",
      subtitle:
        "Die passende Plattform hängt von Ihrer Zielgruppe ab. Ich sage Ihnen ehrlich, was ich empfehle.",
      items: [
        {
          Icon: AppleIcon,
          title: "iOS-App",
          text: "Native Entwicklung mit SwiftUI und Veröffentlichung im App Store – so wie bei den Apps in meinen eigenen Projekten.",
        },
        {
          Icon: AndroidRoundedIcon,
          title: "Android-App",
          text: "Native Android-Entwicklung für Ihre Zielgruppe auf Android-Geräten, inklusive Veröffentlichung im Google Play Store.",
        },
        {
          Icon: LanguageRoundedIcon,
          title: "Web-Anwendung",
          text: "Läuft im Browser auf iPhone, Android und Desktop, ganz ohne Store. Oft die richtige Wahl für interne Tools und Kundenportale.",
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
      title: "Eigene Projekte",
      subtitle: "Drei eigene App-Entwicklungen aus meinem Portfolio – keine Kundenprojekte.",
      link: "Alle Projekte ansehen",
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

  ai: {
    breadcrumb: "KI-Automatisierung Kaufbeuren",
    mailSubject: "Anfrage KI-Automatisierung",
    hero: {
      overline: "KI-Automatisierung",
      title: "KI-Automatisierung für Unternehmen in Kaufbeuren",
      lead: "Wiederkehrende Aufgaben kosten Zeit, die an anderer Stelle fehlt. Ich entwickle individuelle KI-Automatisierungen und Softwarelösungen für Unternehmen und Selbstständige in Kaufbeuren und im Allgäu – von einzelnen automatisierten Abläufen bis zur Anbindung bestehender Systeme.",
      chips: [
        "KI-Automatisierung",
        "Workflow-Automatisierung",
        "Prozessautomatisierung",
        "Kaufbeuren & Allgäu",
      ],
      primaryCta: "Projekt anfragen",
      secondaryCta: "Projekte ansehen",
    },
    why: {
      title: "Anwendungsfälle für KI-Automatisierung",
      subtitle:
        "Mögliche Lösungen für wiederkehrende Aufgaben in Unternehmen – je nach Ausgangslage individuell umsetzbar.",
      items: [
        {
          Icon: MarkEmailReadRoundedIcon,
          title: "E-Mail- und Verwaltungsabläufe",
          text: "Wiederkehrende E-Mail-Antworten, Terminbestätigungen oder interne Verwaltungsschritte lassen sich automatisieren, statt sie manuell zu wiederholen.",
        },
        {
          Icon: DescriptionRoundedIcon,
          title: "Dokumentenverarbeitung & Datenextraktion",
          text: "Rechnungen, Formulare oder PDFs können automatisiert ausgelesen und strukturiert weiterverarbeitet werden.",
        },
        {
          Icon: SyncAltRoundedIcon,
          title: "Datenübertragung zwischen Systemen",
          text: "Daten zwischen Software-Systemen wie CRM, Warenwirtschaft oder Buchhaltung automatisch abgleichen, statt sie manuell zu übertragen.",
        },
        {
          Icon: SmartToyRoundedIcon,
          title: "KI-Assistenten für interne Abläufe",
          text: "Ein KI-Assistent kann interne Anfragen beantworten, Informationen zusammenfassen oder bei wiederkehrenden Aufgaben unterstützen.",
        },
        {
          Icon: SettingsSuggestRoundedIcon,
          title: "Individuelle Prozessautomatisierung",
          text: "Wenn Standardtools nicht passen, entwickle ich eine maßgeschneiderte Automatisierung für Ihren konkreten Geschäftsprozess.",
        },
      ],
    },
    offer: {
      title: "Leistungen rund um KI-Automatisierung",
      subtitle: "Von der ersten Idee bis zur laufenden Automatisierung.",
      items: [
        {
          Icon: AutoAwesomeRoundedIcon,
          title: "Individuelle KI-Integration",
          text: "Einbindung von KI-Funktionen in bestehende Abläufe oder neue Anwendungen – abgestimmt auf Ihren Anwendungsfall.",
        },
        {
          Icon: AccountTreeRoundedIcon,
          title: "Workflow-Automatisierung",
          text: "Mehrstufige Abläufe, die bisher manuell koordiniert werden, als automatisierten Workflow abbilden.",
        },
        {
          Icon: StorageRoundedIcon,
          title: "Backend-Entwicklung",
          text: "Eine zuverlässige technische Grundlage, auf der Automatisierungen stabil und nachvollziehbar laufen.",
        },
        {
          Icon: HubRoundedIcon,
          title: "Schnittstellen",
          text: "Anbindung an bestehende Software über APIs, damit Daten nicht doppelt gepflegt werden müssen.",
        },
      ],
    },
    process: {
      title: "So läuft ein Automatisierungsprojekt ab",
      subtitle: "Transparent und in nachvollziehbaren Schritten.",
      steps: [
        {
          title: "Anforderungen verstehen",
          text: "Wir klären, welcher Ablauf automatisiert werden soll, welche Systeme beteiligt sind und wo aktuell Zeit verloren geht.",
        },
        {
          title: "Lösung planen",
          text: "Ich entwerfe einen passenden technischen Ansatz – realistisch eingeschätzt, was sich automatisieren lässt und was nicht.",
        },
        {
          title: "Entwicklung",
          text: "Die Automatisierung oder KI-Integration entsteht in überschaubaren Schritten, damit früh etwas Funktionierendes sichtbar ist.",
        },
        {
          title: "Testen",
          text: "Vor dem Einsatz wird die Lösung geprüft, damit sie im echten Betrieb zuverlässig funktioniert.",
        },
        {
          title: "Einführung",
          text: "Die Automatisierung geht in Betrieb. Auf Wunsch übernehme ich danach auch Anpassungen und Weiterentwicklung.",
        },
      ],
    },
    local: {
      title: "Kaufbeuren & Allgäu",
      paragraphs: [
        "Bayar Solutions arbeitet als Einzelunternehmen für Unternehmen und Selbstständige aus Kaufbeuren und dem Allgäu. Gerade bei der Automatisierung interner Abläufe hilft es, wenn Anforderungen direkt und ohne Umwege besprochen werden können.",
        "Ich schaue mir Ihren konkreten Ablauf an und schätze ehrlich ein, ob und wie er sich sinnvoll automatisieren lässt – auch wenn das Ergebnis manchmal ist, dass eine einfachere Lösung ausreicht.",
        "Ein erster Kontakt per E-Mail genügt. Auf Wunsch stimmen wir uns auch persönlich ab.",
      ],
      cardTitle: "Direkter Draht",
      cardPoints: [
        "Ansprechpartner von Anfang bis Ende: eine Person",
        "Ehrliche Einschätzung, was automatisierbar ist",
        "Region Kaufbeuren und Allgäu",
      ],
    },
    references: {
      title: "Eigene Projekte",
      text: "Meine bisherigen Projekte zeigen, wie ich Software konzipiere, Daten strukturiere und komplexe Abläufe technisch sauber umsetze – von einer Rechnungs-App mit automatisierten PDF-Exporten bis zum browserbasierten 3D-Raumplaner mit Kollisionserkennung. Diese Erfahrung in Softwareentwicklung und Systemintegration ist die Grundlage für individuelle KI-Automatisierungsprojekte. Einen Überblick mit Screenshots finden Sie auf der Startseite.",
      link: "Alle Projekte ansehen",
      showApps: false,
    },
    faq: {
      title: "Häufige Fragen zur KI-Automatisierung",
      items: [
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
    },
    cta: {
      title: "Lassen Sie uns über Ihre Automatisierung sprechen",
      text: "Beschreiben Sie mir kurz Ihren wiederkehrenden Ablauf – ein paar Sätze per E-Mail genügen. Ich melde mich zeitnah mit einer ehrlichen Einschätzung, ob und wie sich eine Automatisierung lohnt.",
      cross: {
        text: "Benötigen Sie dafür auch eine neue App oder individuelle Software?",
        to: "/app-entwicklung-kaufbeuren",
        label: "Zur App- und Softwareentwicklung in Kaufbeuren",
      },
    },
  },
};
