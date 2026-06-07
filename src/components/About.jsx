import { Box, Paper, Typography, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Reveal from "./Reveal.jsx";
import { useTranslation } from "react-i18next";
import TiltCard from "./TiltCard.jsx";

function GlassCard({ title, subtitle, children }) {
  return (
    <TiltCard
      maxTilt={4}
      lift={3}
      sx={(theme) => ({
        p: 3,
        borderRadius: "12px",
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 200ms ease, transform 200ms ease",
        "&:hover": {
          boxShadow:
            "0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)",
        },
      })}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{title}</Typography>
      {subtitle ? (
        <Typography color="text.secondary" sx={{ mt: 0.75, fontSize: 14 }}>
          {subtitle}
        </Typography>
      ) : null}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </TiltCard>
  );
}

function DashboardMock() {
  const { t } = useTranslation("common");

  const tiles = [
    { key: "users", value: "1.2k" },
    { key: "uptime", value: "99.9%" },
    { key: "rating", value: "4.9★" },
    { key: "projects", value: "12+" },
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
            background: alpha(theme.palette.primary.main, 0.07),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          })}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
            {t("about.deviceMock.primaryCardTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t("about.deviceMock.primaryCardSubtitle")}
          </Typography>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1.5,
          }}
        >
          {tiles.map((tile) => (
            <Paper
              key={tile.key}
              sx={(theme) => ({
                p: 2,
                borderRadius: "8px",
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
              })}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                {t(`about.deviceMock.tiles.${tile.key}`)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600, mt: 0.25 }}
              >
                {tile.value}
              </Typography>
            </Paper>
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

        <Reveal delay={50}>
          <GlassCard
            title={t("about.whatIBuild.title")}
            subtitle={t("about.whatIBuild.subtitle")}
          >
            <Box sx={{ display: "grid", gap: 1 }}>
              {Array.isArray(featureItems)
                ? featureItems.map((item) => (
                    <Typography
                      key={item}
                      color="text.secondary"
                      sx={{ fontSize: 14, lineHeight: 1.6 }}
                    >
                      · {item}
                    </Typography>
                  ))
                : null}
            </Box>
          </GlassCard>
        </Reveal>
      </Box>

      {/* Right column */}
      <Box sx={{ display: "grid", gap: 2 }}>
        <Reveal delay={60}>
          <GlassCard
            title={t("about.uiPreview.title")}
            subtitle={t("about.uiPreview.subtitle")}
          >
            <DashboardMock />
          </GlassCard>
        </Reveal>

        <Reveal delay={60}>
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
