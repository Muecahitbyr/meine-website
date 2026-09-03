import { Box, Paper, Typography, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Reveal from "./Reveal.jsx";
import GlowCard from "./GlowCard.jsx";
import ScrollParallax from "./ScrollParallax.jsx";
import { useTranslation } from "react-i18next";

// GlowCard replaces TiltCard+Paper — children own their padding
function GlassCard({ title, subtitle, children, accentColor = "#1DB8AA" }) {
  return (
    <GlowCard
      accentColor={accentColor}
      maxTilt={4}
      sx={(theme) => ({
        background: theme.palette.background.paper,
      })}
    >
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{title}</Typography>
        {subtitle ? (
          <Typography color="text.secondary" sx={{ mt: 0.75, fontSize: 14 }}>
            {subtitle}
          </Typography>
        ) : null}
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </GlowCard>
  );
}

function DashboardMock() {
  const { t } = useTranslation("common");

  const tiles = [
    { key: "users",    value: "1.2k",  color: "#3B82F6" },
    { key: "uptime",   value: "99.9%", color: "#22C55E" },
    { key: "rating",   value: "4.9★",  color: "#F59E0B" },
    { key: "projects", value: "12+",   color: "#1DB8AA" },
  ];

  return (
    <Paper
      sx={(theme) => ({
        borderRadius: "10px",
        p: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        background: alpha(theme.palette.background.default, 0.6),
      })}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 20, letterSpacing: -0.3 }}>
          {t("about.deviceMock.dashboard")}
        </Typography>

        <Paper
          sx={(theme) => ({
            p: 2,
            borderRadius: "8px",
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
          })}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
            {t("about.deviceMock.primaryCardTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t("about.deviceMock.primaryCardSubtitle")}
          </Typography>
        </Paper>

        {/* Stats tiles — each tile gets its own accent colour, staggered in */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1.5,
          }}
        >
          {tiles.map((tile, idx) => (
            <Reveal key={tile.key} delay={idx * 50} y={8}>
              <Paper
                sx={(theme) => ({
                  p: 2,
                  borderRadius: "8px",
                  border: `1px solid ${alpha(tile.color, 0.22)}`,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(tile.color, 0.06)} 100%)`,
                  boxShadow: `0 0 12px ${alpha(tile.color, 0.10)}`,
                })}
              >
                <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                  {t(`about.deviceMock.tiles.${tile.key}`)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mt: 0.25, color: tile.color }}
                >
                  {tile.value}
                </Typography>
              </Paper>
            </Reveal>
          ))}
        </Box>

        <Paper
          sx={(theme) => ({
            p: 2,
            borderRadius: "8px",
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper,
          })}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
            {t("about.deviceMock.cleanUiTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t("about.deviceMock.cleanUiSubtitle")}
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
}

export default function About() {
  const { t } = useTranslation("common");
  const featureItems = t("about.whatIBuild.items", { returnObjects: true });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
        gap: 3,
        alignItems: "start",
      }}
    >
      {/* Left column */}
      <Box sx={{ display: "grid", gap: 2 }}>
        <Reveal>
          <GlassCard
            title={t("about.profileTitle")}
            subtitle={t("about.profileSubtitle")}
          >
            <Typography color="text.secondary" sx={{ fontSize: 15 }}>
              {t("about.profileBody")}
            </Typography>
          </GlassCard>
        </Reveal>

        <Reveal delay={60}>
          <GlassCard
            title={t("about.whatIBuild.title")}
            subtitle={t("about.whatIBuild.subtitle")}
          >
            <Box sx={{ display: "grid", gap: 1 }}>
              {Array.isArray(featureItems)
                ? featureItems.map((item, idx) => (
                    <Reveal key={item} delay={idx * 40} y={8}>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 14, lineHeight: 1.6 }}
                      >
                        · {item}
                      </Typography>
                    </Reveal>
                  ))
                : null}
            </Box>
          </GlassCard>
        </Reveal>
      </Box>

      {/* Right column */}
      <Box sx={{ display: "grid", gap: 2 }}>
        <Reveal delay={80}>
          <GlassCard
            title={t("about.uiPreview.title")}
            subtitle={t("about.uiPreview.subtitle")}
          >
            <ScrollParallax speed={10}>
              <DashboardMock />
            </ScrollParallax>
          </GlassCard>
        </Reveal>

        <Reveal delay={80}>
          <GlassCard
            title={t("about.highlights.title")}
            subtitle={t("about.highlights.subtitle")}
          >
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                  {t("about.highlights.planTitle")}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("about.highlights.planBody")}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                  {t("about.highlights.buildTitle")}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("about.highlights.buildBody")}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                  {t("about.highlights.finishTitle")}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("about.highlights.finishBody")}
                </Typography>
              </Box>
            </Box>
          </GlassCard>
        </Reveal>
      </Box>
    </Box>
  );
}
