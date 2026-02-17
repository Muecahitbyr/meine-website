// ...existing code...
import { Box, Paper, Typography, Stack, Chip, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Reveal from "./Reveal.jsx";
import ScreenshotGallery from "./ScreenshotGallery.jsx";
import { useTranslation } from "react-i18next";

export default function Apps({ projects, onOpenStore }) {
  const { t } = useTranslation("common");

  const openInAppStore = (url) => {
    if (!url) return;
    if (onOpenStore) {
      onOpenStore(url);
      return;
    }
    try {
      const scheme = url.replace(/^https?:\/\//, "itms-apps://");
      window.location.href = scheme;
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 600);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      {projects.map((p, idx) => {
        const title = p.titleKey ? t(p.titleKey) : p.title;
        const description = p.descriptionKey ? t(p.descriptionKey) : p.description;
        const note = p.noteKey ? t(p.noteKey) : p.note;
        const href = p.storeUrl || p.link;

        return (
          <Reveal key={p.id || p.titleKey || p.title} delay={idx * 90} y={22}>
            <Paper sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h3" sx={{ fontSize: 18 }}>
                  {title}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {description}
                </Typography>

                {note ? (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      color: "primary.main",
                      fontWeight: 700,
                    }}
                  >
                    {note}
                  </Typography>
                ) : null}

                {href ? (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<OpenInNewIcon />}
                      onClick={() => openInAppStore(href)}
                      sx={{ borderRadius: 2, textTransform: "none", py: 1.25 }}
                      aria-label="Im App Store öffnen"
                    >
                      Im App Store öffnen
                    </Button>
                  </Box>
                ) : null}

                <ScreenshotGallery title={title} screenshots={p.screenshots || []} />
              </Box>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  {(p.tags || []).map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Reveal>
        );
      })}
    </Box>
  );
}
// ...existing code...