import { Box, Typography } from "@mui/material";

export default function Privacy() {
  return (
    <Box sx={{ display: "grid", gap: 1.2, maxWidth: 900 }}>
      <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
        Datenschutzerklärung
      </Typography>

      <Typography color="text.secondary">
        Kurzfassung: Diese Website nutzt keine Cookies/Tracking (falls das bei
        dir stimmt).
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Verantwortlicher</Typography>
      <Typography>
        Mücahit Bayar
        <br />
        87600 Kaufbeuren
        <br />
        E-Mail: mucahitbayar@outlook.de
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Hosting</Typography>
      <Typography color="text.secondary">
        Die Website wird bei Vercel gehostet. Dabei werden technisch notwendige
        Server-Logs verarbeitet (z.B. IP-Adresse, Zeitpunkt).
      </Typography>

      <Typography sx={{ fontWeight: 800, mt: 1 }}>Kontaktaufnahme</Typography>
      <Typography color="text.secondary">
        Wenn du per E-Mail Kontakt aufnimmst, werden deine Angaben zur
        Bearbeitung der Anfrage gespeichert.
      </Typography>
    </Box>
  );
}
