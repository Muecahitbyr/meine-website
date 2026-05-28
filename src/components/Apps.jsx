import { Box, Typography, Stack, Chip, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal.jsx";
import ScreenshotGallery from "./ScreenshotGallery.jsx";
import TiltCard from "./TiltCard.jsx";

export default function Apps({ projects, onOpenStore }) {
  const { t } = useTranslation("common");
  const openProject = (url) => {
    if (!url) return;

    if (onOpenStore) {
      onOpenStore(url);
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        maxWidth: 1120,
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
        const title = p.titleKey ? t(p.titleKey) : p.title || "Projekt";
        const description = p.descriptionKey
          ? t(p.descriptionKey)
          : p.description ||
            "Individuelle digitale Lösung mit Fokus auf modernes Design, Performance und Nutzerfreundlichkeit.";

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
                    ? `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha("#fff", 0.025)})`
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
              <Box
                sx={{
                  p: 2.3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.3,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 950,
                      fontSize: 17,
                      letterSpacing: -0.3,
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.7,
                      fontSize: 13.2,
                      lineHeight: 1.55,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: 62,
                    }}
                  >
                    {description}
                  </Typography>

                  {note ? (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.9,
                        color: "primary.main",
                        fontWeight: 900,
                      }}
                    >
                      {note}
                    </Typography>
                  ) : null}
                </Box>

                <Box sx={{ mt: 0.2 }}>
                  <ScreenshotGallery
                    title={title}
                    screenshots={p.screenshots || []}
                  />
                </Box>

                <Box sx={{ flex: 1 }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.2,
                    pt: 0.6,
                  }}
                >
                  {href ? (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<OpenInNewIcon />}
                      onClick={() => openProject(href)}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        py: 1.1,
                        fontWeight: 950,
                        color: "#111",
                      }}
                    >
                      Projekt ansehen
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