import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Link as RouterLink } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import GlowCard from "./GlowCard.jsx";
import MagneticButton from "./MagneticButton.jsx";
import ScrollParallax from "./ScrollParallax.jsx";
import { useTranslation } from "react-i18next";

const EMAIL = "bayar-solutions@outlook.de";

export default function Contact() {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);

  const SUBJECT = t("contact.emailSubject");
  const BODY = t("contact.emailBody");
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      {/* Left: email card */}
      <Reveal>
        <GlowCard
          accentColor="#1DB8AA"
          sx={(theme) => ({ background: theme.palette.background.paper })}
        >
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={(tt) => ({
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: alpha(tt.palette.primary.main, 0.12),
                  border: `1px solid ${alpha(tt.palette.primary.main, 0.24)}`,
                  color: "primary.main",
                  flexShrink: 0,
                  boxShadow: (th) =>
                    `0 0 16px ${alpha(th.palette.primary.main, 0.20)}`,
                })}
              >
                <EmailRoundedIcon fontSize="small" />
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
                  {t("contact.card.title")}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("contact.card.subtitle")}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2.5 }} />

            <Typography color="text.secondary" sx={{ fontSize: 15 }}>
              {t("contact.card.body")}
            </Typography>

            {/* CTA buttons wrapped in MagneticButton */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mt: 2.5 }}
            >
              <MagneticButton strength={0.3}>
                <Button
                  variant="contained"
                  href={mailto}
                  startIcon={<EmailRoundedIcon />}
                  sx={{
                    fontWeight: 700,
                    borderRadius: 9999,
                    color: "primary.contrastText",
                  }}
                >
                  {t("contact.card.sendEmail")}
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.3}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/#apps"
                  sx={{
                    fontWeight: 700,
                    borderRadius: 9999,
                    borderColor: "primary.main",
                    color: "primary.main",
                  }}
                >
                  {t("contact.card.toApps")}
                </Button>
              </MagneticButton>
            </Stack>

            {/* Email display + copy */}
            <Box
              sx={(tt) => ({
                mt: 2.5,
                p: 1.75,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                border: `1px solid ${tt.palette.divider}`,
                backgroundColor: alpha(tt.palette.background.default, 0.8),
              })}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 700, letterSpacing: 0.8, display: "block" }}
                >
                  {t("contact.card.emailLabel")}
                </Typography>
                <Typography
                  sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: 14 }}
                >
                  {EMAIL}
                </Typography>
              </Box>

              <Tooltip
                title={copied ? "✓" : t("contact.card.copyTooltip")}
                placement="top"
              >
                <IconButton
                  onClick={copyEmail}
                  aria-label={t("contact.card.copyAria")}
                  size="small"
                  sx={{
                    color: copied ? "success.main" : "text.secondary",
                    transition: "color 200ms ease",
                  }}
                >
                  {copied ? (
                    <CheckRoundedIcon fontSize="small" />
                  ) : (
                    <ContentCopyRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1.5 }}
            >
              {t("contact.card.tip")}
            </Typography>
          </Box>
        </GlowCard>
      </Reveal>

      {/* Right: QR code */}
      <Reveal delay={70}>
        <GlowCard
          accentColor="#1DB8AA"
          sx={(theme) => ({ background: theme.palette.background.paper })}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box sx={{ width: "100%", display: "grid", placeItems: "center" }}>
              <Typography
                sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}
                align="center"
              >
                {t("contact.qr.title")}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ mb: 2.5 }}
                align="center"
              >
                {t("contact.qr.subtitle")}
              </Typography>

              <ScrollParallax speed={14} style={{ width: "65%" }}>
                <Box
                  component="img"
                  src="/QrEmail.jpg"
                  alt={t("contact.qr.alt")}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </ScrollParallax>
            </Box>
          </Box>
        </GlowCard>
      </Reveal>
    </Box>
  );
}
