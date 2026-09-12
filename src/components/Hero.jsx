import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Fine-grain noise, same SVG turbulence technique as globals.css' body::before —
// keeps the cinematic film-grain feel consistent with the rest of the site.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

const EASE = [0.25, 0.46, 0.45, 0.94];

export default function Hero() {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const rm = useReducedMotion();
  // The 3 ambient blobs and the logo float below run as infinite JS-driven
  // framer-motion loops — on desktop that's cheap, but on a phone they keep
  // the main thread busy indefinitely, competing with the very first touch
  // scroll right after the page opens (same class of issue fixed for
  // GlowCard's breathing ring in d68fa2f). Touch devices skip them entirely
  // since nobody's parsing subtle background drift with a thumb over it.
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const skipDecorativeLoops = rm || isCoarsePointer;
  const chips = t("hero.chips", { returnObjects: true });

  // Parallax: card drifts up over first 600px of scroll — Apple-style hero exit
  const { scrollY } = useScroll();
  const cardParallaxY = useTransform(scrollY, [0, 600], [0, -60]);

  // Phone mockup: scroll parallax (above) combines with a subtle mouse-driven
  // tilt on desktop — same "follow the cursor" depth cue as GlowCard's tilt,
  // skipped on touch/reduced-motion where there's no cursor to follow.
  const heroRef = useRef(null);
  const phoneRotateX = useMotionValue(0);
  const phoneRotateY = useMotionValue(0);
  const springRotateX = useSpring(phoneRotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(phoneRotateY, { stiffness: 150, damping: 20 });
  const onHeroMouseMove = (e) => {
    if (skipDecorativeLoops || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    phoneRotateY.set(x * 10);
    phoneRotateX.set(y * -8);
  };
  const onHeroMouseLeave = () => {
    phoneRotateX.set(0);
    phoneRotateY.set(0);
  };

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
      ref={heroRef}
      onMouseMove={onHeroMouseMove}
      onMouseLeave={onHeroMouseLeave}
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "100svh", md: "88vh" },
        display: "flex",
        alignItems: "center",
        background: (theme) => theme.palette.background.default,
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
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Dark overlay + scrim ─────────────────────────────────────── */}
      {/* Bottom scrim fades into the page's own background colour so the
          hero exits into the rest of the (also dark) site seamlessly,
          instead of a hard cut at the section boundary. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: (theme) => ({
            xs: `linear-gradient(180deg, rgba(35,43,53,0.5) 0%, rgba(35,43,53,0.44) 55%, ${theme.palette.background.default} 100%)`,
            md: `linear-gradient(180deg, rgba(35,43,53,0.34) 0%, rgba(35,43,53,0.30) 55%, ${theme.palette.background.default} 100%)`,
          }),
        }}
      />

      {/* ── Film grain — cinematic texture over the video/overlay ───────── */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          opacity: 0.5,
          mixBlendMode: "overlay",
          backgroundImage: GRAIN_URL,
        }}
      />

      {/* ── Ambient gradient blobs ───────────────────────────────────── */}
      {/* Blob 1 — top-left, teal glow */}
      <motion.div
        animate={skipDecorativeLoops ? {} : { x: [0, 45, -20, 0], y: [0, -30, 22, 0] }}
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
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      {/* Blob 2 — bottom-right, lighter teal */}
      <motion.div
        animate={skipDecorativeLoops ? {} : { x: [0, -32, 18, 0], y: [0, 26, -16, 0] }}
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
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      {/* Blob 3 — centre-bottom, indigo/violet for colour variety */}
      <motion.div
        animate={skipDecorativeLoops ? {} : { x: [0, 28, -18, 0], y: [0, -22, 14, 0] }}
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
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 4,
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
            {/* Eyebrow — real location detail, sets tone before the headline */}
            <motion.div {...fadeUp(0)}>
              <Typography
                sx={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                  color: theme.palette.primary.light,
                  mb: 2.25,
                }}
              >
                {t("hero.eyebrow")}
              </Typography>
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

          {/* ── Right column — real project screenshot in a phone mockup ── */}
          {/* Outer handles entrance; inner combines scroll parallax (cardParallaxY)
              with a mouse-driven tilt (phoneRotate*) into one transform. */}
          <motion.div {...fadeUp(0.15)} style={{ width: "100%", perspective: 1000 }}>
            <motion.div
              style={{
                y: rm ? 0 : cardParallaxY,
                rotateX: rm ? 0 : springRotateX,
                rotateY: rm ? 0 : springRotateY,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 220,
                  maxWidth: "62%",
                  aspectRatio: "9 / 19.5",
                  borderRadius: "32px",
                  border: "6px solid #1c2229",
                  background: "#0d1116",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "44%",
                    height: 16,
                    background: "#1c2229",
                    borderRadius: "0 0 12px 12px",
                    zIndex: 2,
                  }}
                />
                <Box
                  component="img"
                  src="/screenshots/DC/DC1.webp"
                  alt="DriveConnect App"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
