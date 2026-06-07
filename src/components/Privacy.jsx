import { Box, Typography, Divider } from "@mui/material";

export default function Privacy() {
  return (
    <Box sx={{ display: "grid", gap: 1.5, maxWidth: 860 }}>
      <Typography color="text.secondary" sx={{ fontSize: 15 }}>
        Kurzfassung: Diese Website nutzt keine Cookies oder Tracking-Dienste.
      </Typography>

      <Divider sx={{ my: 0.5 }} />

      <Typography sx={{ fontWeight: 700, fontSize: 15 }}>Verantwortlicher</Typography>
      <Typography sx={{ fontSize: 15, lineHeight: 1.7 }}>
        Mücahit Bayar
        <br />
        87600 Kaufbeuren
        <br />
        E-Mail: mucahitbayar@outlook.de
      </Typography>

      <Typography sx={{ fontWeight: 700, fontSize: 15, mt: 0.5 }}>Hosting</Typography>
      <Typography color="text.secondary" sx={{ fontSize: 15, lineHeight: 1.7 }}>
        Die Website wird bei Vercel gehostet. Dabei werden technisch notwendige
        Server-Logs verarbeitet (z.B. IP-Adresse, Zeitpunkt des Abrufs).
      </Typography>

      <Typography sx={{ fontWeight: 700, fontSize: 15, mt: 0.5 }}>Kontaktaufnahme</Typography>
      <Typography color="text.secondary" sx={{ fontSize: 15, lineHeight: 1.7 }}>
        Wenn Sie per E-Mail Kontakt aufnehmen, werden Ihre Angaben zur
        Bearbeitung der Anfrage gespeichert. Eine Weitergabe an Dritte findet
        nicht statt.
      </Typography>
    </Box>
  );
}
