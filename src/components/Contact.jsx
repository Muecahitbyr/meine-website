import { Box, Button, Paper, Typography, Stack, Divider, IconButton, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import Reveal from "./Reveal.jsx";

const EMAIL = "mucahitbayar@outlook.de";
const SUBJECT = "Kontakt über deine Webseite";
const BODY = "Hi! Ich habe deine Webseite gesehen und würde gerne Kontakt aufnehmen.";

export default function Contact() {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Fallback: nichts tun (Clipboard kann in manchen Browsern blocken)
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
        gap: 3,
        alignItems: "stretch",
      }}
    >
      {/* LINKS: Haupt-Card */}
      <Reveal>
        <Paper
          elevation={0}
          sx={(t) => ({
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            height: "100%",
            background:
              t.palette.mode === "dark"
                ? `linear-gradient(180deg, ${alpha("#fff", 0.07)}, ${alpha("#fff", 0.03)})`
                : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.92)})`,
            border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
            boxShadow:
              t.palette.mode === "dark"
                ? "0 24px 60px rgba(0,0,0,0.35)"
                : "0 24px 60px rgba(0,0,0,0.10)",
            backdropFilter: "blur(10px)",
          })}
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={(t) => ({
                width: 42,
                height: 42,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                backgroundColor: alpha(t.palette.primary.main, t.palette.mode === "dark" ? 0.16 : 0.10),
                border: `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
              })}
            >
              <EmailRoundedIcon />
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 18 }}>Schreib mir</Typography>
              <Typography color="text.secondary" variant="body2">
                Schnell per Mail – oder scanne den QR-Code.
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2.2, opacity: 0.25 }} />

          <Typography color="text.secondary">
            Ich freue mich über Nachrichten zu App-Ideen, Projekten oder Fragen rund um iOS & SwiftUI.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              href={mailto}
              startIcon={<EmailRoundedIcon />}
              sx={{ fontWeight: 900 }}
            >
              E-Mail senden
            </Button>
            <Button
              variant="outlined"
              href="#apps"
              sx={{ fontWeight: 900 }}
            >
              Zu den Apps
            </Button>
          </Stack>

          <Paper
            elevation={0}
            sx={(t) => ({
              mt: 2.2,
              p: 1.6,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              backgroundColor: t.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.03),
              border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.10) : alpha("#000", 0.08)}`,
            })}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: 0.8 }}>
                E-MAIL
              </Typography>
              <Typography sx={{ fontFamily: "monospace", fontWeight: 800 }}>{EMAIL}</Typography>
            </Box>

            <Tooltip title="E-Mail kopieren">
              <IconButton onClick={copyEmail} aria-label="E-Mail kopieren">
                <ContentCopyRoundedIcon />
              </IconButton>
            </Tooltip>
          </Paper>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.2 }}>
            Tipp: Kurze Nachricht + Ziel/Idee reicht völlig – ich melde mich.
          </Typography>
        </Paper>
      </Reveal>

      {/* RECHTS: QR Card */}
      <Reveal delay={120} y={22}>
        <Paper
          elevation={0}
          sx={(t) => ({
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            height: "100%",
            display: "grid",
            placeItems: "center",
            background:
              t.palette.mode === "dark"
                ? `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha("#fff", 0.03)})`
                : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.92)})`,
            border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
            boxShadow:
              t.palette.mode === "dark"
                ? "0 24px 60px rgba(0,0,0,0.35)"
                : "0 24px 60px rgba(0,0,0,0.10)",
            backdropFilter: "blur(10px)",
          })}
        >
          <Box sx={{ width: "100%", display: "grid", placeItems: "center" }}>
            <Typography sx={{ fontWeight: 900, fontSize: 18, mb: 1 }} align="center">
              QR-Code
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }} align="center">
              Scanne für eine Mail an mich.
            </Typography>
           
              <Box
                component="img"
                src="/QrEmail.jpg"
                alt="QR Code E-Mail"
                sx={{
                  width: "60%",
                  height: "90%",
                  objectFit: "contain",
                  borderRadius: 2,
                  backgroundColor: "#fff", // QR bleibt sauber lesbar
                }}
              />
          </Box>
        </Paper>
      </Reveal>
    </Box>
  );
}
