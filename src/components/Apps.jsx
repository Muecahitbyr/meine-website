import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import Reveal from "./Reveal.jsx";
import ScreenshotGallery from "./ScreenshotGallery.jsx";
import { useTranslation } from "react-i18next";

export default function Apps({ projects }) {
  const { t } = useTranslation("common");

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

        return (
          <Reveal key={p.id || p.titleKey || p.title} delay={idx * 90} y={22}>
            <Paper sx={{ p: 2, height: "100%" }}>
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

              <ScreenshotGallery title={title} screenshots={p.screenshots || []} />

              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                {(p.tags || []).map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            </Paper>
          </Reveal>
        );
      })}
    </Box>
  );
}
