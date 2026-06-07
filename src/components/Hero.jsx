import { motion, useReducedMotion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Static dark gradient shown when prefers-reduced-motion is on (no video)
const STATIC_BG =
  "linear-gradient(135deg, #0A0E14 0%, #0d2622 55%, #061f1b 100%)";

const EASE = [0.25, 0.46, 0.45, 0.94];

export default function Hero() {
  const { t } = useTranslation("common");
  const prefersReducedMotion = useReducedMotion();
  const chips = t("hero.chips", { returnObjects: true });
  const tiles = t("hero.card.tiles", { returnObjects: true });

  // Spread onto motion.div to get fade-up; empty object = instant render
  const fadeUp = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  const tx = { duration: 0.7, ease: EASE };

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "100svh", md: "88vh" },
        display: "flex",
        alignItems: "center",
        // Static fallback when motion is disabled — no video loaded
        background: prefersReducedMotion ? STATIC_BG : "#0A0E14",
      }}
    >
      {/* ── Background video ──────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          autoPlay
          muted
          loop
          playsInline
          src="/videos/coding.mp4"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      )}

      {/* ── Dark overlay — stronger on mobile for readability ─────── */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: {
            xs: "rgba(10,14,20,0.74)",
            md: "rgba(10,14,20,0.58)",
          },
        }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          py: { xs: 10, md: 14 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          {/* ── Left: headline + CTAs ─────────────────────────────── */}
          <motion.div {...fadeUp} transition={tx} style={{ width: "100%" }}>
            <Box>
              {/* Logo — inverted to white for dark background */}
              <Box
                component="img"
                src="/BayerSolutionsLogo.png"
                alt="BAYAR-SOLUTIONS"
                sx={{
                  height: { xs: 34, md: 42 },
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  mb: 3,
                  filter: "brightness(0) invert(1)",
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 38, sm: 48, md: 64 },
                  lineHeight: 1.02,
                  letterSpacing: -1.5,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.96)",
                }}
              >
                {t("hero.headlinePre")}{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  {t("hero.headlineHighlight")}
                </Box>
                <br />
                {t("hero.headlinePost")}
              </Typography>

              <Typography
                sx={{
                  mt: 2.5,
                  maxWidth: 520,
                  fontSize: { xs: 16, md: 17 },
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.68)",
                }}
              >
                {t("hero.subtitle")}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mt: 3.5 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => scrollTo("contact")}
                  sx={{
                    borderRadius: 9999,
                    px: 3,
                    py: 1.5,
                    fontWeight: 700,
                    color: "primary.contrastText",
                  }}
                >
                  {t("hero.ctaPrimary")}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo("apps")}
                  sx={{
                    borderRadius: 9999,
                    px: 3,
                    py: 1.5,
                    fontWeight: 700,
                    borderColor: "rgba(255,255,255,0.40)",
                    color: "rgba(255,255,255,0.90)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.70)",
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {t("hero.ctaSecondary")}
                </Button>
              </Stack>

              {Array.isArray(chips) && (
                <Stack
                  direction="row"
                  sx={{ mt: 3, flexWrap: "wrap", gap: 1 }}
                >
                  {chips.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      sx={{
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backgroundColor: "rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.68)",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          </motion.div>

          {/* ── Right: floating info card ─────────────────────────── */}
          <motion.div
            {...fadeUp}
            transition={{ ...tx, delay: prefersReducedMotion ? 0 : 0.15 }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={(theme) => ({
                width: "100%",
                maxWidth: 440,
                borderRadius: "20px",
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                gap: 3,
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.38), 0 8px 24px rgba(0,0,0,0.22)",
                // Subtle teal accent on card top edge
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 24,
                  right: 24,
                  height: 2,
                  borderRadius: "0 0 2px 2px",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.3)})`,
                },
                position: "relative",
                overflow: "hidden",
              })}
            >
              <Box>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: 14, lineHeight: 1.65 }}
                >
                  {t("hero.card.description")}
                </Typography>
              </Box>

              {Array.isArray(tiles) && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 1.5,
                  }}
                >
                  {tiles.map((tile) => (
                    <Box
                      key={tile.title}
                      sx={(theme) => ({
                        p: 2,
                        borderRadius: "10px",
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      })}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                        {tile.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 12, mt: 0.25 }}
                      >
                        {tile.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
