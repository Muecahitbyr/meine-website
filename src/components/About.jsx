import { Box, Paper, Stack, Typography, Chip } from "@mui/material";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
      }}
    >
      {/* LINKE SPALTE: Text + Bild untereinander */}
      <Reveal>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h3" sx={{ fontSize: 20, mb: 1 }}>
            Profil
          </Typography>

          <Typography color="text.secondary">
            Ich bin Programmierer und entwickle iOS-Apps mit Swift & SwiftUI.
            Mir sind klare Strukturen, saubere UI und Wartbarkeit wichtig.
          </Typography>

          {/* 👇 BILD DIREKT UNTER DEM TEXT */}
          <Box
            component="img"
            src="/PB.png"
            alt="Profilbild"
            sx={{
              mt: 2,
              width: "100%",
              maxHeight: 420,
              objectFit: "contain",
              borderRadius: 3,
              border: (t) =>
                `1px solid ${
                  t.palette.mode === "dark"
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.12)"
                }`,
            }}
          />

          {/* Tags */}
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            {["Swift", "SwiftUI", "Xcode", "MVVM", "Async/Await"].map((t) => (
              <Chip key={t} label={t} variant="outlined" />
            ))}
          </Stack>
        </Paper>
      </Reveal>
    </Box>
  );
}
