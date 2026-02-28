import { Box, Paper, Stack, Typography, Chip, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Reveal from "./Reveal.jsx";
import { useTranslation } from "react-i18next";
import TiltCard from "./TiltCard.jsx";

function Stat({ label, value }) {
  return (
    <TiltCard
      maxTilt={8}
      lift={5}
      sx={(t) => ({
        p: 2,
        borderRadius: 4,
        background: t.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.03),
        border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)}`,
      })}
    >
      <Typography sx={{ fontWeight: 900, fontSize: 22, textAlign: { xs: "center", md: "left" } }}>
        {value}
      </Typography>
      <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5, textAlign: { xs: "center", md: "left" } }}>
        {label}
      </Typography>
    </TiltCard>
  );
}

function GlassCard({ title, subtitle, children }) {
  return (
    <TiltCard
      maxTilt={10}
      lift={6}
      sx={(t) => ({
        p: 3,
        borderRadius: 4,
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
      <Typography sx={{ fontWeight: 900, fontSize: 18 }}>{title}</Typography>
      {subtitle ? (
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          {subtitle}
        </Typography>
      ) : null}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </TiltCard>
  );
}

function DeviceMock() {
  const { t } = useTranslation("common");

  const tiles = [
    { key: "speed", value: "120 km/h" },
    { key: "range", value: "410 km" },
    { key: "temp", value: "92°C" },
    { key: "battery", value: "86%" },
  ];

  return (
    <Paper
      elevation={0}
      sx={(tt) => ({
        borderRadius: 2,
        p: 2.5,
        border: `1px solid ${tt.palette.mode === "dark" ? alpha("#fff", 0.12) : alpha("#000", 0.08)}`,
        background: tt.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
        overflow: "hidden",
      })}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1.3 }}>
        <Typography sx={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.4 }}>
          {t("about.deviceMock.dashboard")}
        </Typography>

        <Paper
          elevation={0}
          sx={(tt) => ({
            p: 2,
            borderRadius: 4,
            background: alpha(tt.palette.primary.main, tt.palette.mode === "dark" ? 0.12 : 0.08),
            border: `1px solid ${alpha(tt.palette.primary.main, 0.25)}`,
          })}
        >
          <Typography sx={{ fontWeight: 900 }}>{t("about.deviceMock.vehicleDataTitle")}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t("about.deviceMock.vehicleDataSubtitle")}
          </Typography>
        </Paper>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.3 }}>
          {tiles.map((tile) => (
            <Paper
              key={tile.key}
              elevation={0}
              sx={(tt) => ({
                p: 2,
                borderRadius: 4,
                background: tt.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
                border: `1px solid ${tt.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)}`,
              })}
            >
              <Typography sx={{ fontWeight: 900 }}>
                {t(`about.deviceMock.tiles.${tile.key}`)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tile.value}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Paper
          elevation={0}
          sx={(tt) => ({
            p: 2,
            borderRadius: 4,
            background: tt.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.02),
            border: `1px solid ${tt.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)}`,
          })}
        >
          <Typography sx={{ fontWeight: 900 }}>{t("about.deviceMock.cleanUiTitle")}</Typography>
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
      {/* LINKS */}
      <Box sx={{ display: "grid", gap: 2 }}>
        <Reveal>
          <GlassCard
            title={t("about.profileTitle")}
            subtitle={t("about.profileSubtitle")}
          >
            <Typography color="text.secondary">
              {t("about.profileBody")}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {["Swift", "SwiftUI", "Xcode", "MVVM", "Async/Await", "REST APIs"].map((chip) => (
                <Chip key={chip} label={chip} variant="outlined" />
              ))}
            </Stack>
          </GlassCard>
        </Reveal>

        <Reveal delay={80} y={22}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Stat label={t("about.stats.focusLabel")} value={t("about.stats.focusValue")} />
            <Stat label={t("about.stats.styleLabel")} value={t("about.stats.styleValue")} />
          </Box>
        </Reveal>

        <Reveal delay={140} y={22}>
          <GlassCard
            title={t("about.whatIBuild.title")}
            subtitle={t("about.whatIBuild.subtitle")}
          >
            <Box sx={{ display: "grid", gap: 1.2 }}>
              {Array.isArray(featureItems)
                ? featureItems.map((item) => (
                    <Typography key={item} color="text.secondary">
                      • {item}
                    </Typography>
                  ))
                : null}
            </Box>
          </GlassCard>
        </Reveal>
      </Box>

      {/* RECHTS */}
      <Box sx={{ display: "grid", gap: 2 }}>
        <Reveal delay={120} y={22}>
          <GlassCard
            title={t("about.uiPreview.title")}
            subtitle={t("about.uiPreview.subtitle")}
          >
            <DeviceMock />
          </GlassCard>
        </Reveal>

        <Reveal delay={200} y={22}>
          <GlassCard title={t("about.highlights.title")} subtitle={t("about.highlights.subtitle")}>
            <Box sx={{ display: "grid", gap: 1.3 }}>
              <Box>
                <Typography sx={{ fontWeight: 900 }}>{t("about.highlights.planTitle")}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("about.highlights.planBody")}
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.25 }} />

              <Box>
                <Typography sx={{ fontWeight: 900 }}>{t("about.highlights.buildTitle")}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("about.highlights.buildBody")}
                </Typography>
              </Box>

              <Divider sx={{ opacity: 0.25 }} />

              <Box>
                <Typography sx={{ fontWeight: 900 }}>{t("about.highlights.finishTitle")}</Typography>
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
