import { Box, Button, Paper, Typography } from "@mui/material";
import Reveal from "./Reveal.jsx";

const EMAIL = "mucahitbayar@outlook.de";
const SUBJECT = "Kontakt über deine Webseite";
const BODY = "Hi! Ich habe deine Webseite gesehen und würde gerne Kontakt aufnehmen.";

export default function Contact() {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    SUBJECT
  )}&body=${encodeURIComponent(BODY)}`;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
      }}
    >
      <Reveal>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h3" sx={{ fontSize: 20 }}>
            Schreib mir
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Button klicken → dein Mailprogramm öffnet sich automatisch.
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button variant="contained" href={mailto}>E-Mail senden</Button>
            <Button variant="outlined" href="#apps">Zu den Apps</Button>
          </Box>

          <Typography color="text.secondary" sx={{ mt: 1.5 }}>
            E-Mail: <Box component="span" sx={{ fontFamily: "monospace" }}>{EMAIL}</Box>
          </Typography>
        </Paper>
      </Reveal>

 <Reveal delay={120} y={22}>
  <Paper
    elevation={0}
    sx={{
      p: 2,
      display: "inline-flex",
      justifyContent: "center",
      borderRadius: 4,
      backgroundColor: (t) =>
        t.palette.mode === "dark"
          ? "rgba(255,255,255,0.04)"
          : "rgba(0,0,0,0.03)",
      backdropFilter: "blur(8px)",
    }}
  >
    <Box
      component="img"
      src="/QrEmail.jpg"
      alt="QR Code E-Mail"
      sx={{
        width: 200,
        height: "auto",
        borderRadius: 2,
      }}
    />
  </Paper>
</Reveal>


    </Box>
  );
}
