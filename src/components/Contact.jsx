import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Reveal from "./Reveal.jsx";
import { useTranslation } from "react-i18next";

const EMAIL = "mucahitbayar@outlook.de";

export default function Contact() {
  const { t } = useTranslation("common");

  const SUBJECT = t("contact.emailSubject");
  const BODY = t("contact.emailBody");

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {}
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
      {/* LINKS */}
      <Reveal>
        <Paper
          elevation={0}
          sx={(tt) => ({
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            height: "100%",
            background:
              tt.palette.mode === "dark"
                ? `linear-gradient(180deg, ${alpha("#fff", 0.07)}, ${alpha("#fff", 0.03)})`
                : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.92)})`,
            border: `1px solid ${tt.palette.mode === "dark" ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
            boxShadow:
              tt.palette.mode === "dark"
                ? "0 24px 60px rgba(0,0,0,0.35)"
                : "0 24px 60px rgba(0,0,0,0.10)",
            backdropFilter: "blur(10px)",
          })}
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={(tt) => ({
                width: 42,
                height: 42,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                backgroundColor: alpha(
                  tt.palette.primary.main,
                  tt.palette.mode === "dark" ? 0.16 : 0.1,
                ),
                border: `1px solid ${alpha(tt.palette.primary.main, 0.25)}`,
              })}
            >
              <EmailRoundedIcon />
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                {t("contact.card.title")}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {t("contact.card.subtitle")}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2.2, opacity: 0.25 }} />

          <Typography color="text.secondary">
            {t("contact.card.body")}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              href={mailto}
              startIcon={<EmailRoundedIcon />}
              sx={{ fontWeight: 900 }}
            >
              {t("contact.card.sendEmail")}
            </Button>
            <Button variant="outlined" href="#apps" sx={{ fontWeight: 900 }}>
              {t("contact.card.toApps")}
            </Button>
          </Stack>

          <Paper
            elevation={0}
            sx={(tt) => ({
              mt: 2.2,
              p: 1.6,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              backgroundColor:
                tt.palette.mode === "dark"
                  ? alpha("#fff", 0.05)
                  : alpha("#000", 0.03),
              border: `1px solid ${tt.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)}`,
            })}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 800, letterSpacing: 0.8 }}
              >
                {t("contact.card.emailLabel")}
              </Typography>
              <Typography sx={{ fontFamily: "monospace", fontWeight: 800 }}>
                {EMAIL}
              </Typography>
            </Box>

            <Tooltip title={t("contact.card.copyTooltip")}>
              <IconButton
                onClick={copyEmail}
                aria-label={t("contact.card.copyAria")}
              >
                <ContentCopyRoundedIcon />
              </IconButton>
            </Tooltip>
          </Paper>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1.2 }}
          >
            {t("contact.card.tip")}
          </Typography>
        </Paper>
      </Reveal>

      {/* RECHTS */}
      <Reveal delay={120} y={22}>
        <Paper
          elevation={0}
          sx={(tt) => ({
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            height: "100%",
            display: "grid",
            placeItems: "center",
            background:
              tt.palette.mode === "dark"
                ? `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha("#fff", 0.03)})`
                : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.92)})`,
            border: `1px solid ${tt.palette.mode === "dark" ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
            boxShadow:
              tt.palette.mode === "dark"
                ? "0 24px 60px rgba(0,0,0,0.35)"
                : "0 24px 60px rgba(0,0,0,0.10)",
            backdropFilter: "blur(10px)",
          })}
        >
          <Box sx={{ width: "100%", display: "grid", placeItems: "center" }}>
            <Typography
              sx={{ fontWeight: 900, fontSize: 18, mb: 1 }}
              align="center"
            >
              {t("contact.qr.title")}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mb: 2 }}
              align="center"
            >
              {t("contact.qr.subtitle")}
            </Typography>

            <Box
              component="img"
              src="/QrEmail.jpg"
              alt={t("contact.qr.alt")}
              sx={{
                width: "60%",
                height: "90%",
                objectFit: "contain",
                borderRadius: 2,
                backgroundColor: "#fff",
              }}
            />
          </Box>
        </Paper>
      </Reveal>
    </Box>
  );
}
