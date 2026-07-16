import { Box, Typography } from "@mui/material";

export default function Imprint() {
  return (
    <Box sx={{ display: "grid", gap: 1.2, maxWidth: 900 }}>
      <Typography color="text.secondary">Angaben gemäß § 5 DDG</Typography>

      <Typography>
        BAYAR-SOLUTIONS
        <br />
        Inhaber: Mücahit Bayar
        <br />
        c/o POSTFLEX PFX-587-995
        <br />
        Emsdettener Straße 10
        <br />
        48268 Greven
        <br />
        Deutschland
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Kontakt</Typography>
      <Typography>E-Mail: bayar-solutions@outlook.de</Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>
        Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
      </Typography>
      <Typography>
        Mücahit Bayar
        <br />
        c/o POSTFLEX PFX-587-995
        <br />
        Emsdettener Straße 10
        <br />
        48268 Greven
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>
        Verbraucherstreitbeilegung
      </Typography>
      <Typography color="text.secondary">
        Wir sind nicht bereit und nicht verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen (§ 36 VSBG).
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>
        Haftung für Inhalte
      </Typography>
      <Typography color="text.secondary">
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
        die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch
        keine Gewähr übernommen werden. Als Diensteanbieter sind wir gemäß § 7
        Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen
        Gesetzen verantwortlich. Verpflichtungen zur Entfernung oder Sperrung
        der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
        hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
        Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
        Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
        Inhalte umgehend entfernen.
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Haftung für Links</Typography>
      <Typography color="text.secondary">
        Diese Website enthält ggf. Links zu externen Websites Dritter, auf
        deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte
        waren zu diesem Zeitpunkt nicht erkennbar. Bei Bekanntwerden von
        Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Urheberrecht</Typography>
      <Typography color="text.secondary">
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Soweit die Inhalte auf dieser Seite
        nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
        beachtet.
      </Typography>
    </Box>
  );
}
