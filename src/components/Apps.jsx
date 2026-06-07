import { Box, Typography, Chip, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal.jsx";
import ScreenshotGallery from "./ScreenshotGallery.jsx";
import TiltCard from "./TiltCard.jsx";

export default function Apps({ projects }) {
  const { t } = useTranslation("common");

  const openProject = (url) => {
    if (!url) return;
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
          : p.description || "";
        const note = p.noteKey ? t(p.noteKey) : p.note;
        const href = p.storeUrl || p.link;

        return (
          <Reveal key={p.id || p.titleKey} delay={idx * 50}>
            <TiltCard
              maxTilt={5}
              lift={3}
              sx={(theme) => ({
                height: "100%",
                borderRadius: "12px",
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                transition: "box-shadow 200ms ease, transform 200ms ease",
                "&:hover": {
                  boxShadow:
                    "0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)",
                },
                overflow: "hidden",
              })}
            >
              <Box
                sx={{
                  p: 2.5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {/* Title + description */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: -0.2,
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.75,
                      fontSize: 13,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {description}
                  </Typography>
                </Box>

                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                    {p.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={(theme) => ({
                          height: 22,
                          fontSize: 11,
                          fontWeight: 600,
                          borderRadius: "6px",
                          border: `1px solid ${theme.palette.divider}`,
                          backgroundColor: "transparent",
                          color: "text.secondary",
                        })}
                      />
                    ))}
                  </Box>
                )}

                {/* Screenshot */}
                <Box>
                  <ScreenshotGallery
                    title={title}
                    screenshots={p.screenshots || []}
                  />
                </Box>

                <Box sx={{ flex: 1 }} />

                {/* CTA */}
                <Box sx={{ pt: 0.5 }}>
                  {href ? (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                      onClick={() => openProject(href)}
                      sx={{
                        borderRadius: "8px",
                        py: 1.1,
                        fontWeight: 700,
                        fontSize: 13,
                        color: "primary.contrastText",
                      }}
                    >
                      {t("projectCard.openStore")}
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 1,
                        borderRadius: "8px",
                        border: (theme) =>
                          `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ fontWeight: 600 }}
                      >
                        {note ?? t("projectCard.open")}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </TiltCard>
          </Reveal>
        );
      })}
    </Box>
  );
}
