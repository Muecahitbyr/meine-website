import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Section from "../components/Sections.jsx";
import Reveal from "../components/Reveal.jsx";
import GlowCard from "../components/GlowCard.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import Apps from "../components/Apps.jsx";
import { projects } from "../data/projects.js";
import { LANDING_PAGES, CONTACT_EMAIL } from "../data/landingPages.js";

const EASE = [0.25, 0.46, 0.45, 0.94];

const MotionDiv = motion.div;
const MotionNav = motion.nav;
// Same accent rotation as the Leistungen cards on the homepage
const ACCENTS = ["#3B82F6", "#1DB8AA", "#8B5CF6", "#F59E0B"];

const HERO_BG =
  "linear-gradient(135deg, #0A0E14 0%, #0c1628 30%, #0d2622 60%, #0a1420 100%)";

const inlineLinkSx = {
  color: "primary.dark",
  fontWeight: 700,
  textDecorationColor: "rgba(22,158,146,0.4)",
  textUnderlineOffset: 3,
  "&:hover": { textDecorationColor: "currentColor" },
};

/* ── Hero ──────────────────────────────────────────────────────────── */

function LandingHero({ hero, breadcrumb }) {
  const rm = useReducedMotion();
  const fade = (delay = 0) => ({
    initial: rm ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay: rm ? 0 : delay },
  });

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background: HERO_BG,
      }}
    >
      {/* Static ambient glows — no infinite loops, keeps the page light */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "-30%",
          left: "-12%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29,184,170,0.22) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          bottom: "-40%",
          right: "-8%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", py: { xs: 8, md: 11 } }}
      >
        <Box sx={{ maxWidth: 780 }}>
          <MotionNav aria-label="Breadcrumb" {...fade(0)}>
            <Stack
              component="ol"
              direction="row"
              spacing={1}
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                fontSize: 13,
                color: "rgba(255,255,255,0.60)",
                alignItems: "center",
              }}
            >
              <li>
                <Typography
                  component={RouterLink}
                  to="/"
                  sx={{
                    fontSize: 13,
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Startseite
                </Typography>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{breadcrumb}</li>
            </Stack>
          </MotionNav>

          <MotionDiv {...fade(0.05)}>
            <Typography
              variant="overline"
              sx={{
                display: "block",
                mt: 3,
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {hero.overline}
            </Typography>
          </MotionDiv>

          <MotionDiv {...fade(0.12)}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mt: 1,
                fontSize: { xs: 34, sm: 44, md: 56 },
                lineHeight: 1.08,
                letterSpacing: "-1.5px",
                fontWeight: 800,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              {hero.title}
            </Typography>
          </MotionDiv>

          <MotionDiv {...fade(0.2)}>
            <Typography
              sx={{
                mt: 2.5,
                maxWidth: 680,
                fontSize: { xs: 16, md: 17 },
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {hero.lead}
            </Typography>
          </MotionDiv>

          <MotionDiv {...fade(0.28)}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mt: 3.5 }}
            >
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/#contact"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: 9999,
                  px: 3,
                  py: 1.5,
                  fontWeight: 700,
                  color: "primary.contrastText",
                }}
              >
                {hero.primaryCta}
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/#apps"
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
                {hero.secondaryCta}
              </Button>
            </Stack>
          </MotionDiv>

          <MotionDiv {...fade(0.36)}>
            <Stack direction="row" sx={{ mt: 3, flexWrap: "wrap", gap: 1 }}>
              {hero.chips.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  size="small"
                  sx={{
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backgroundColor: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.72)",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
              ))}
            </Stack>
          </MotionDiv>
        </Box>
      </Container>
    </Box>
  );
}

/* ── Icon tile shared by the cards ─────────────────────────────────── */

function IconTile({ Icon: IconComponent, color, size = 48 }) {
  // Capitalised alias so the JSX usage below counts as "used" for this
  // project's lint config (no eslint-plugin-react)
  const Icon = IconComponent;
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: size,
        height: size,
        borderRadius: "10px",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        backgroundColor: alpha(color, 0.12),
        border: `1px solid ${alpha(color, 0.24)}`,
        color,
        fontSize: size * 0.46,
      }}
    >
      <Icon fontSize="inherit" />
    </Box>
  );
}

/* ── Feature cards (animated GlowCard, same look as "Leistungen") ──── */

function FeatureGrid({ items, columns }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: columns },
        gap: { xs: 2, md: 3 },
      }}
    >
      {items.map(({ Icon, title, text }, idx) => {
        const color = ACCENTS[idx % ACCENTS.length];
        return (
          <Reveal key={title} delay={(idx % 4) * 60}>
            <GlowCard
              accentColor={color}
              maxTilt={5}
              sx={{
                background: `linear-gradient(135deg, #ffffff 0%, ${color}08 100%)`,
                height: "100%",
              }}
            >
              <Box
                sx={{
                  p: { xs: 3, md: 3.5 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <IconTile Icon={Icon} color={color} />
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: 17, md: 19 }, lineHeight: 1.25 }}
                >
                  {title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: { xs: 14, md: 15 }, lineHeight: 1.65 }}
                >
                  {text}
                </Typography>
              </Box>
            </GlowCard>
          </Reveal>
        );
      })}
    </Box>
  );
}

/* ── Light-weight cards (no tilt) for audience / platform blocks ───── */

function InfoGrid({ items }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        gap: { xs: 2, md: 3 },
      }}
    >
      {items.map(({ Icon, title, text }, idx) => (
        <Reveal key={title} delay={(idx % 3) * 60}>
          <Paper
            sx={(t) => ({
              p: { xs: 3, md: 3.5 },
              height: "100%",
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
              borderRadius: "12px",
              border: `1px solid ${t.palette.divider}`,
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            })}
          >
            <IconTile Icon={Icon} color={ACCENTS[idx % ACCENTS.length]} size={44} />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h3" sx={{ fontSize: 17, lineHeight: 1.3 }}>
                {title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mt: 0.75, fontSize: 14, lineHeight: 1.6 }}
              >
                {text}
              </Typography>
            </Box>
          </Paper>
        </Reveal>
      ))}
    </Box>
  );
}

/* ── Process ───────────────────────────────────────────────────────── */

function ProcessSteps({ steps }) {
  return (
    <Box
      component="ol"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        gap: { xs: 2, md: 3 },
      }}
    >
      {steps.map((step, idx) => (
        <Box component="li" key={step.title}>
          <Reveal delay={(idx % 3) * 60}>
            <Paper
              sx={(t) => ({
                p: { xs: 3, md: 3.5 },
                height: "100%",
                borderRadius: "12px",
                border: `1px solid ${t.palette.divider}`,
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              })}
            >
              <Box
                aria-hidden="true"
                sx={(t) => ({
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: 15,
                  color: "primary.dark",
                  backgroundColor: alpha(t.palette.primary.main, 0.12),
                  border: `1px solid ${alpha(t.palette.primary.main, 0.28)}`,
                })}
              >
                {idx + 1}
              </Box>
              <Typography variant="h3" sx={{ mt: 2, fontSize: 18, lineHeight: 1.3 }}>
                {step.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mt: 0.75, fontSize: 14, lineHeight: 1.6 }}
              >
                {step.text}
              </Typography>
            </Paper>
          </Reveal>
        </Box>
      ))}
    </Box>
  );
}

/* ── Local block ───────────────────────────────────────────────────── */

function LocalBlock({ local }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.3fr 0.7fr" },
        gap: { xs: 3, md: 5 },
        alignItems: "start",
      }}
    >
      <Reveal>
        <Stack spacing={2}>
          {local.paragraphs.map((p) => (
            <Typography
              key={p}
              color="text.secondary"
              sx={{ fontSize: { xs: 15, md: 16 }, lineHeight: 1.7, maxWidth: 680 }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
      </Reveal>

      <Reveal delay={80}>
        <Paper
          sx={(t) => ({
            p: { xs: 3, md: 3.5 },
            borderRadius: "12px",
            border: `1px solid ${alpha(t.palette.primary.main, 0.28)}`,
            background: `linear-gradient(135deg, #ffffff 0%, ${alpha(t.palette.primary.main, 0.08)} 100%)`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          })}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <IconTile Icon={PlaceRoundedIcon} color="#1DB8AA" size={44} />
            <Typography variant="h3" sx={{ fontSize: 18 }}>
              {local.cardTitle}
            </Typography>
          </Stack>
          <Stack
            component="ul"
            spacing={1.25}
            sx={{ listStyle: "none", m: 0, mt: 2.5, p: 0 }}
          >
            {local.cardPoints.map((point) => (
              <Stack
                component="li"
                key={point}
                direction="row"
                spacing={1.25}
                sx={{ alignItems: "flex-start" }}
              >
                <CheckRoundedIcon
                  sx={{ fontSize: 18, mt: "3px", color: "primary.dark" }}
                />
                <Typography sx={{ fontSize: 14.5, lineHeight: 1.55 }}>
                  {point}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Reveal>
    </Box>
  );
}

/* ── References ────────────────────────────────────────────────────── */

// Compact teaser of the real portfolio apps (no client websites exist to show)
function ReferenceTeaser({ references }) {
  const { t } = useTranslation("common");

  return (
    <Stack spacing={3}>
      <Typography
        color="text.secondary"
        sx={{ fontSize: { xs: 15, md: 16 }, lineHeight: 1.7, maxWidth: 760 }}
      >
        {references.text}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: { xs: 2, md: 3 },
        }}
      >
        {projects.map((project, idx) => {
          const title = t(project.titleKey);
          return (
            <Reveal key={project.id} delay={idx * 60}>
              <Paper
                component={RouterLink}
                to="/#apps"
                sx={(th) => ({
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  p: 2,
                  height: "100%",
                  textDecoration: "none",
                  color: "text.primary",
                  borderRadius: "12px",
                  border: `1px solid ${th.palette.divider}`,
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  transition: "box-shadow 200ms ease, transform 200ms ease",
                  "&:hover": {
                    boxShadow:
                      "0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)",
                    transform: "translateY(-2px)",
                  },
                })}
              >
                <Box
                  component="img"
                  src={project.screenshots[0]}
                  alt={`Screenshot der iOS-App ${title}`}
                  loading="lazy"
                  width={54}
                  height={117}
                  sx={{
                    width: 54,
                    height: "auto",
                    aspectRatio: "9 / 19.5",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="h3" sx={{ fontSize: 16 }}>
                    {title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                      fontSize: 13,
                      lineHeight: 1.55,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t(project.descriptionKey)}
                  </Typography>
                </Box>
              </Paper>
            </Reveal>
          );
        })}
      </Box>

      <Box>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/#apps"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: 9999,
            px: 3,
            py: 1.25,
            fontWeight: 700,
            borderColor: "primary.main",
            color: "primary.main",
          }}
        >
          {references.link}
        </Button>
      </Box>
    </Stack>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────────── */

function Faq({ items }) {
  return (
    <Stack spacing={1.5} sx={{ maxWidth: 860 }}>
      {items.map((item, idx) => (
        <Reveal key={item.q} delay={(idx % 3) * 40}>
          <Accordion
            disableGutters
            square={false}
            slotProps={{ heading: { component: "h3" } }}
            sx={(t) => ({
              border: `1px solid ${t.palette.divider}`,
              borderRadius: "12px !important",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              "&::before": { display: "none" },
              overflow: "hidden",
            })}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon />}
              sx={{ px: { xs: 2.5, md: 3 }, py: 0.5, minHeight: 60 }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 15, md: 16 } }}>
                {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 2.5, md: 3 }, pb: 3, pt: 0 }}>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 15, lineHeight: 1.7 }}
              >
                {item.a}
                {item.link && (
                  <>
                    {" "}
                    <Typography
                      component={RouterLink}
                      to={item.link.to}
                      sx={{ ...inlineLinkSx, fontSize: "inherit" }}
                    >
                      {item.link.label}
                    </Typography>
                    .
                  </>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Reveal>
      ))}
    </Stack>
  );
}

/* ── Closing CTA ───────────────────────────────────────────────────── */

function ClosingCta({ cta, mailSubject }) {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <Reveal>
      <Paper
        sx={(t) => ({
          p: { xs: 3.5, md: 6 },
          textAlign: "center",
          borderRadius: "16px",
          border: `1px solid ${alpha(t.palette.primary.main, 0.3)}`,
          background: `linear-gradient(135deg, #ffffff 0%, ${alpha(t.palette.primary.main, 0.1)} 100%)`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
        })}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: { xs: 26, md: 34 }, lineHeight: 1.15, letterSpacing: -0.8 }}
        >
          {cta.title}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mt: 1.5, mx: "auto", maxWidth: 560, fontSize: { xs: 15, md: 17 }, lineHeight: 1.65 }}
        >
          {cta.text}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mt: 3.5, justifyContent: "center", alignItems: "center" }}
        >
          <MagneticButton strength={0.3}>
            <Button
              variant="contained"
              size="large"
              href={mailto}
              startIcon={<EmailRoundedIcon />}
              sx={{
                borderRadius: 9999,
                px: 3,
                py: 1.5,
                fontWeight: 700,
                color: "primary.contrastText",
              }}
            >
              E-Mail senden
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.3}>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/#contact"
              sx={{
                borderRadius: 9999,
                px: 3,
                py: 1.5,
                fontWeight: 700,
                borderColor: "primary.main",
                color: "primary.main",
              }}
            >
              Weitere Kontaktmöglichkeiten
            </Button>
          </MagneticButton>
        </Stack>

        <Typography
          color="text.secondary"
          sx={{ mt: 3, fontSize: 14 }}
        >
          {cta.cross.text}{" "}
          <Typography
            component={RouterLink}
            to={cta.cross.to}
            sx={{ ...inlineLinkSx, fontSize: "inherit" }}
          >
            {cta.cross.label}
          </Typography>
          {" · "}
          <Typography
            component={RouterLink}
            to="/"
            sx={{ ...inlineLinkSx, fontSize: "inherit" }}
          >
            Zur Startseite
          </Typography>
        </Typography>
      </Paper>
    </Reveal>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

const WASH = {
  teal: "linear-gradient(180deg, rgba(29,184,170,0.05) 0%, rgba(247,249,249,0) 100%)",
  blue: "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.03) 100%)",
  grey: "linear-gradient(180deg, #F4F7F7 0%, rgba(247,249,249,0) 100%)",
  tealStrong:
    "linear-gradient(180deg, rgba(29,184,170,0.04) 0%, rgba(29,184,170,0.09) 100%)",
};

export default function LandingPage({ pageKey }) {
  const page = LANDING_PAGES[pageKey];

  // Client-side navigation keeps the previous scroll position — start at the
  // top. "instant" because globals.css sets scroll-behavior: smooth on <html>.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pageKey]);

  return (
    <main>
      <LandingHero hero={page.hero} breadcrumb={page.breadcrumb} />

      <Section
        id="lp-why"
        title={page.why.title}
        subtitle={page.why.subtitle}
        sx={{ background: WASH.teal }}
      >
        <FeatureGrid items={page.why.items} columns="repeat(3, 1fr)" />
      </Section>

      <Section
        id="lp-offer"
        title={page.offer.title}
        subtitle={page.offer.subtitle}
        sx={{ background: WASH.blue }}
      >
        <FeatureGrid items={page.offer.items} columns="repeat(4, 1fr)" />
      </Section>

      {page.audience && (
        <Section
          id="lp-audience"
          title={page.audience.title}
          subtitle={page.audience.subtitle}
          sx={{ background: WASH.grey }}
        >
          <InfoGrid items={page.audience.items} />
        </Section>
      )}

      {page.platforms && (
        <Section
          id="lp-platforms"
          title={page.platforms.title}
          subtitle={page.platforms.subtitle}
          sx={{ background: WASH.grey }}
        >
          <InfoGrid items={page.platforms.items} />
        </Section>
      )}

      <Section
        id="lp-process"
        title={page.process.title}
        subtitle={page.process.subtitle}
        sx={{ background: WASH.teal }}
      >
        <ProcessSteps steps={page.process.steps} />
      </Section>

      <Section id="lp-local" title={page.local.title} sx={{ background: WASH.blue }}>
        <LocalBlock local={page.local} />
      </Section>

      <Section
        id="lp-references"
        title={page.references.title}
        subtitle={page.references.subtitle}
        sx={{ background: WASH.grey }}
      >
        {page.references.showApps ? (
          <Apps projects={projects} />
        ) : (
          <ReferenceTeaser references={page.references} />
        )}
      </Section>

      <Section id="lp-faq" title={page.faq.title} sx={{ background: WASH.teal }}>
        <Faq items={page.faq.items} />
      </Section>

      <Section id="lp-cta" sx={{ background: WASH.tealStrong }}>
        <ClosingCta cta={page.cta} mailSubject={page.mailSubject} />
      </Section>
    </main>
  );
}
