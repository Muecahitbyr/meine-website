import { Box, Typography, Divider } from "@mui/material";
import Reveal from "./Reveal.jsx";
import GlowCard from "./GlowCard.jsx";
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
