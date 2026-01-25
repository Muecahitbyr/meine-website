import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Reveal from "./Reveal.jsx";

export default function Hero() {
  return (
    <Box
      id="top"
      sx={(t) => ({
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: { xs: 7, md: 10 },
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
            gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
            gap: { xs: 5, md: 3 },
            alignItems: "center",
          }}
        >
          {/* LINKS */}
          <Reveal>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "text.secondary",
                  fontWeight: 800,
                  letterSpacing: 1.8,
                }}
              >
                iOS / Swift Developer
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  mt: 1,
                  fontSize: { xs: 36, sm: 42, md: 60 },
                  lineHeight: 1.05,
                  letterSpacing: -1,
                }}
              >
                Ich entwickle{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Apple Apps
                </Box>{" "}
                <br />
                mit moderner UI & sauberem Code.
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 720 }}>
                Swift, SwiftUI, Xcode — Fokus auf klare Architektur, Performance
                und ein hochwertiges Nutzererlebnis.
              </Typography>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mt: 3, flexWrap: "wrap" }}
              >
                <Button variant="contained" href="#apps">
                  Meine Apps
                </Button>
                <Button variant="outlined" href="#contact">
                  Kontakt
                </Button>
              </Stack>
            </Box>
          </Reveal>

          {/* RECHTS */}
          <Reveal delay={120} y={22}>
            <Box
              sx={{
                position: "relative",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                component="img"
                src="/PB.png"
                alt="Portrait"
                sx={{
                  width: "min(420px, 92%)",
                  height: "auto",
                  borderRadius: 6,
                  objectFit: "cover",
                  boxShadow: (t) =>
                    t.palette.mode === "dark"
                      ? "0 30px 70px rgba(0,0,0,0.55)"
                      : "0 30px 70px rgba(0,0,0,0.20)",
                  border: (t) =>
                    `1px solid ${
                      t.palette.mode === "dark"
                        ? alpha("#fff", 0.14)
                        : alpha("#000", 0.08)
                    }`,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "50%", md: "6%" },
                  bottom: { xs: "6%", md: "10%" },
                  transform: { xs: "translateX(-50%)", md: "none" },
                  textAlign: { xs: "center", md: "left" },
                  width: { xs: "100%", md: "auto" },
                  px: { xs: 2, md: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 20, sm: 24, md: 34 },
                    fontWeight: 900,
                    letterSpacing: -0.4,
                  }}
                >
                  Mücahit Bayar
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: { xs: 13, sm: 14, md: 18 },
                    color: "text.secondary",
                  }}
                >
                  App Entwickler
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
