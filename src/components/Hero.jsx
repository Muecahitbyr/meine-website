import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Reveal from "./Reveal.jsx";

export default function Hero() {
  return (
    <Box
      id="top"
      sx={(t) => ({
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: { xs: 8, md: 10 },
        // EIN Hintergrund-Layer -> kein “Farbstreifen”
        background:
          t.palette.mode === "dark"
            ? "radial-gradient(1200px 800px at 20% 10%, rgba(154,230,255,0.14), transparent 55%), radial-gradient(900px 600px at 80% 20%, rgba(255,255,255,0.06), transparent 60%)"
            : "radial-gradient(1200px 800px at 20% 10%, rgba(21,101,192,0.12), transparent 55%), radial-gradient(900px 600px at 80% 20%, rgba(0,0,0,0.04), transparent 60%)",
      })}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            gap: 2.5,
            alignItems: "start",
          }}
        >
          <Reveal>
            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ fontWeight: 800, letterSpacing: 1.2 }}
              >
                iOS / Swift Developer
              </Typography>

              <Typography variant="h1" sx={{ mt: 1, fontSize: { xs: 38, md: 56 }, lineHeight: 1.05 }}>
                Ich entwickle <Box component="span" sx={{ color: "primary.main" }}>Apple Apps</Box>{" "}
                mit moderner UI & sauberem Code.
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 720 }}>
                Swift, SwiftUI, Xcode — Fokus auf klare Architektur, Performance und ein hochwertiges Nutzererlebnis.
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: "wrap" }}>
                <Button variant="contained" href="#apps">Meine Apps</Button>
                <Button variant="outlined" href="#contact">Kontakt</Button>
              </Stack>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
