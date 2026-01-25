import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import Reveal from "./Reveal.jsx";
import ScreenshotGallery from "./ScreenshotGallery.jsx";

export default function Apps({ projects }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      {projects.map((p, idx) => (
        <Reveal key={p.title} delay={idx * 90} y={22}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h3" sx={{ fontSize: 18 }}>
              {p.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {p.description}
            </Typography>

            {p.note && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                {p.note}
              </Typography>
            )}

            <ScreenshotGallery title={p.title} screenshots={p.screenshots || []} />

            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {(p.tags || []).map((t) => (
                <Chip key={t} label={t} size="small" variant="outlined" />
              ))}
            </Stack>
          </Paper>
        </Reveal>
      ))}
    </Box>
  );
}
