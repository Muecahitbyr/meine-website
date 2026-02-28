import { Box, Typography } from "@mui/material";

export default function Imprint() {
  return (
    <Box sx={{ display: "grid", gap: 1.2, maxWidth: 900 }}>
      <Typography sx={{ fontWeight: 900, fontSize: 18 }}>Impressum</Typography>

      <Typography color="text.secondary">Angaben gemäß § 5 TMG</Typography>

      <Typography>
        Mücahit Bayar
        <br />
        {/* PLZ + Ort */}87600 Kaufbeuren
        <br />
        Deutschland
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Kontakt</Typography>
      <Typography>E-Mail: mucahitbayar@outlook.de</Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>
        Haftung für Inhalte
      </Typography>
      <Typography color="text.secondary">
        Inhalte wurden mit Sorgfalt erstellt. Für Richtigkeit/Vollständigkeit
        kann keine Gewähr übernommen werden.
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Haftung für Links</Typography>
      <Typography color="text.secondary">
        Trotz sorgfältiger Kontrolle keine Haftung für externe Links.
        Verantwortlich ist der jeweilige Betreiber.
      </Typography>
    </Box>
  );
}
