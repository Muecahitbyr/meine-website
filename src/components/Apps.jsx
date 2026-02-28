import { Box, Paper, Typography, Stack, Chip, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Reveal from "./Reveal.jsx";
import ScreenshotGallery from "./ScreenshotGallery.jsx";
import { useTranslation } from "react-i18next";
import TiltCard from "./TiltCard.jsx";

export default function Apps({ projects, onOpenStore }) {
  const { t } = useTranslation("common");

  const openInAppStore = (url) => {
    if (!url) return;
    if (onOpenStore) {
      onOpenStore(url);
      return;
    }
    try {
      const scheme = url.replace(/^https?:\/\//, "itms-apps:");
      window.location.href = scheme;
      setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 600);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        alignItems: "stretch",
      }}
    >
      {projects.map((p, idx) => {
        const title = p.titleKey ? t(p.titleKey) : p.title;
        const description = p.descriptionKey
          ? t(p.descriptionKey)
          : p.description;
        const note = p.noteKey ? t(p.noteKey) : p.note;
        const href = p.storeUrl || p.link;

        return (
          <Reveal key={p.id || p.titleKey || p.title} delay={idx * 90} y={18}>
            <TiltCard
              maxTilt={8}
              lift={6}
              sx={(theme) => ({
                height: "100%",
                borderRadius: 4,
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(180deg, ${alpha("#fff", 0.055)}, ${alpha("#fff", 0.025)})`
                    : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.96)})`,
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? alpha("#fff", 0.1)
                    : alpha("#000", 0.08)
                }`,
                backdropFilter: "blur(10px)",
                overflow: "hidden",
              })}
            >
              {/* inner layout */}
              <Box
                sx={{
                  p: 2.2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.2,
                }}
              >
                {/* Header */}
                <Box>
                  <Typography
                    sx={{ fontWeight: 900, fontSize: 16, letterSpacing: -0.2 }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.6,
                      fontSize: 13,
                      lineHeight: 1.45,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: 56,
                    }}
                  >
                    {description}
                  </Typography>

                  {note ? (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.8,
                        color: "primary.main",
                        fontWeight: 800,
                      }}
                    >
                      {note}
                    </Typography>
                  ) : null}
                </Box>

                {/* Screenshot (fixed space) */}
                <Box sx={{ mt: 0.2 }}>
                  <ScreenshotGallery
                    title={title}
                    screenshots={p.screenshots || []}
                  />
                </Box>

                {/* Spacer */}
                <Box sx={{ flex: 1 }} />

                {/* Tags + Button bottom */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.2,
                    pt: 0.6,
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {(p.tags || []).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>

                  {href ? (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<OpenInNewIcon />}
                      onClick={() => openInAppStore(href)}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        py: 1.1,
                        fontWeight: 900,
                      }}
                      aria-label={t("projectCard.openStoreAria")}
                    >
                      {t("projectCard.openStore")}
                    </Button>
                  ) : null}
                </Box>
              </Box>
            </TiltCard>
          </Reveal>
        );
      })}
    </Box>
  );
}
