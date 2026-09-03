import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Richer dark: adds a slight indigo layer for more colour in reduced-motion fallback
const STATIC_BG =
  "linear-gradient(135deg, #0A0E14 0%, #0c1628 30%, #0d2622 60%, #0a1420 100%)";
const EASE = [0.25, 0.46, 0.45, 0.94];

export default function Hero() {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const rm = useReducedMotion();
  const chips = t("hero.chips", { returnObjects: true });
  const tiles = t("hero.card.tiles", { returnObjects: true });

  // Parallax: card drifts up over first 600px of scroll — Apple-style hero exit
  const { scrollY } = useScroll();
  const cardParallaxY = useTransform(scrollY, [0, 600], [0, -60]);

  // Left column recedes faster than the card, and the video breathes in —
  // creates the layered depth you see leaving apple.com's hero as you scroll
  const contentY = useTransform(scrollY, [0, 500], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0.15]);
  const videoScale = useTransform(scrollY, [0, 700], [1, 1.12]);

  // Build flat word list for headline stagger.
  // Each entry: { text, accent, breakAfter }
  const headlineWords = [
    ...t("hero.headlinePre")
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ text: w, accent: false, breakAfter: false })),
    { text: t("hero.headlineHighlight"), accent: true, breakAfter: true },
    ...t("hero.headlinePost")
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ text: w, accent: false, breakAfter: false })),
  ];

  // ── Variants ──────────────────────────────────────────────────────

  const wordContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.065,
        delayChildren: rm ? 0 : 0.2,
      },
    },
  };

  const wordItem = {
    hidden: rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  };

  const ctaContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: rm ? 0 : 0.68,
      },
    },
  };

  const ctaItem = {
    hidden: rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  const chipContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: rm ? 0 : 0.92,
      },
    },
  };

  const chipItem = {
    hidden: rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  // Convenience: simple fade-up with per-call delay
  const fadeUp = (delay = 0) => ({
    initial: rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: EASE, delay: rm ? 0 : delay },
  });

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
        background: rm ? STATIC_BG : "#0A0E14",
      }}
    >
      {/* ── Background video ─────────────────────────────────────────── */}
      {!rm && (
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
            scale: videoScale,
          }}
        />
      )}

      {/* ── Dark overlay ─────────────────────────────────────────────── */}
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

      {/* ── Ambient gradient blobs ───────────────────────────────────── */}
      {/* Blob 1 — top-left, teal glow */}
      <motion.div
        animate={rm ? {} : { x: [0, 45, -20, 0], y: [0, -30, 22, 0] }}
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          position: "absolute",
          top: "-18%",
          left: "-14%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29,184,170,0.22) 0%, transparent 68%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Blob 2 — bottom-right, lighter teal */}
      <motion.div
        animate={rm ? {} : { x: [0, -32, 18, 0], y: [0, 26, -16, 0] }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: 4,
        }}
        style={{
          position: "absolute",
          bottom: "-16%",
          right: "-10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(78,207,195,0.14) 0%, transparent 68%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Blob 3 — centre-bottom, indigo/violet for colour variety */}
      <motion.div
        animate={rm ? {} : { x: [0, 28, -18, 0], y: [0, -22, 14, 0] }}
        transition={{
          duration: 26,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: 9,
        }}
        style={{
          position: "absolute",
          bottom: "5%",
          left: "28%",
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 68%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
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
          {/* ── Left column — recedes on scroll for hero-exit depth ───── */}
          <motion.div style={{ y: rm ? 0 : contentY, opacity: rm ? 1 : contentOpacity }}>
          <Box>
            {/* Logo: entrance then perpetual float */}
            <motion.div {...fadeUp(0)}>
              <motion.div
                animate={rm ? {} : { y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.8,
                }}
                style={{ display: "inline-block" }}
              >
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
              </motion.div>
            </motion.div>

            {/* Headline — word-by-word stagger */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mt: 1.5,
                fontSize: { xs: 38, sm: 48, md: 64 },
                lineHeight: 1.08,
                letterSpacing: "-1.5px",
                fontWeight: 800,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              <motion.span
                variants={wordContainer}
                initial="hidden"
                animate="visible"
                style={{ display: "block" }}
              >
                {headlineWords.flatMap((word, i) => {
                  const el = (
                    <motion.span
                      key={i}
                      variants={wordItem}
                      style={{
                        display: "inline-block",
                        color: word.accent
                          ? theme.palette.primary.main
                          : "inherit",
                        // Glowing text-shadow on the teal accent word
                        textShadow: word.accent
                          ? `0 0 32px ${alpha(theme.palette.primary.main, 0.55)}, 0 0 72px ${alpha(theme.palette.primary.main, 0.22)}`
                          : "none",
                        marginRight: word.breakAfter ? 0 : "0.28em",
                      }}
                    >
                      {word.text}
                    </motion.span>
                  );
                  return word.breakAfter ? [el, <br key={`br-${i}`} />] : [el];
                })}
              </motion.span>
            </Typography>

            {/* Subtitle */}
            <motion.div {...fadeUp(0.4)}>
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
            </motion.div>

            {/* CTA buttons — staggered entrance */}
            <motion.div
              variants={ctaContainer}
              initial="hidden"
              animate="visible"
              style={{ marginTop: "28px" }}
            >
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <motion.div variants={ctaItem}>
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
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {t("hero.ctaPrimary")}
                  </Button>
                </motion.div>

                <motion.div variants={ctaItem}>
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
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.70)",
                        backgroundColor: "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    {t("hero.ctaSecondary")}
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>

            {/* Chips — staggered entrance */}
            {Array.isArray(chips) && (
              <motion.div
                variants={chipContainer}
                initial="hidden"
                animate="visible"
                style={{ marginTop: "24px" }}
              >
                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                  {chips.map((item) => (
                    <motion.span
                      key={item}
                      variants={chipItem}
                      style={{ display: "inline-block" }}
                    >
                      <Chip
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
                    </motion.span>
                  ))}
                </Stack>
              </motion.div>
            )}
          </Box>
          </motion.div>

          {/* ── Right column — entrance + scroll parallax ────────────── */}
          {/* Outer handles entrance; inner handles parallax separately */}
          <motion.div {...fadeUp(0.15)} style={{ width: "100%" }}>
            <motion.div
              style={{
                y: rm ? 0 : cardParallaxY,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper
                sx={(th) => ({
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
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 2,
                    borderRadius: "0 0 2px 2px",
                    background: `linear-gradient(90deg, ${th.palette.primary.main}, ${alpha(th.palette.primary.light, 0.3)})`,
                  },
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
                        sx={(th) => ({
                          p: 2,
                          borderRadius: "10px",
                          border: `1px solid ${th.palette.divider}`,
                          backgroundColor: alpha(th.palette.primary.main, 0.04),
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
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
