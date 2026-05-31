import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Reveal from "./Reveal.jsx";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(Math.min(window.scrollY, 360));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const topImageOffset = Math.min(scrollY * 0.2, 100);
  const secondImageOffset = Math.min(scrollY * 0.28, 140);
  const contentOffset = Math.min(scrollY * 0.16, 70);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      id="top"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        py: 0,
        pt: 0,
        pb: { xs: 6, md: 0 },
        mt: { xs: -4, md: -16 },
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(900px 600px at 20% 10%, rgba(217,164,4,0.18), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(255,255,255,0.07), transparent 60%)"
            : "radial-gradient(900px 600px at 20% 10%, rgba(217,164,4,0.2), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(0,0,0,0.05), transparent 60%)",
      })}
    >
      <Container maxWidth="lg" sx={{ mt: 0, pt: 0 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 2, md: 3 },
            mb: { xs: 4, md: 40 },
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/BayerSolutionsLogo.png"
            alt="Bayer Solutions logo"
            sx={{
              width: "100%",
              maxWidth: { xs: 720, md: 1100 },
              maxHeight: { xs: 360, md: 720 },
              objectFit: "contain",
              borderRadius: 6,
              boxShadow: "0 30px 90px rgba(0,0,0,0.12)",
              backgroundColor: "#fff",
              p: { xs: 2, md: 4 },
              transform: `translateY(${topImageOffset}px)`,
              transition: "transform 180ms ease-out",
            }}
          />
          <Box
            component="img"
            src="/PB.png"
            alt="PB logo"
            sx={{
              width: "100%",
              maxWidth: { xs: 720, md: 1100 },
              maxHeight: { xs: 360, md: 720 },
              objectFit: "contain",
              borderRadius: 6,
              boxShadow: "0 30px 90px rgba(0,0,0,0.12)",
              backgroundColor: "#fff",
              p: { xs: 2, md: 4 },
              transform: `translateY(${secondImageOffset}px)`,
              transition: "transform 180ms ease-out",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
            gap: { xs: 5, md: 5 },
            alignItems: "center",
            transform: `translateY(${contentOffset}px)`,
            transition: "transform 180ms ease-out",
          }}
        >
          <Reveal>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                BAYAR-SOLUTIONS
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  mt: 1.5,
                  fontSize: { xs: 38, sm: 48, md: 68 },
                  lineHeight: 1.02,
                  letterSpacing: -1.5,
                }}
              >
                Moderne{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Software
                </Box>
                <br />
                für Unternehmen
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 2.4,
                  maxWidth: 620,
                  fontSize: { xs: 16, md: 19 },
                  lineHeight: 1.7,
                }}
              >
                Ich entwickle digitale Lösungen für Unternehmen, die Kunden
                begeistern, Prozesse vereinfachen und Wachstum fördern.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mt: 3.5 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => scrollTo("contact")}
                  sx={{
                    borderRadius: 999,
                    px: 3,
                    py: 1.3,
                    textTransform: "none",
                    color: "#111",
                  }}
                >
                  Projekt anfragen
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo("apps")}
                  sx={{
                    borderRadius: 999,
                    px: 3,
                    py: 1.3,
                    textTransform: "none",
                    borderColor: "primary.main",
                  }}
                >
                  Referenzen ansehen
                </Button>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 3, flexWrap: "wrap", gap: 1 }}
              >
                {[
                  "Unternehmenswebsites",
                  "Kundenportale",
                  "Mobile Apps",
                ].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    variant="outlined"
                    sx={{
                      borderColor: "primary.main",
                      color: "text.primary",
                      fontWeight: 700,
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Reveal>

          <Reveal delay={120} y={22}>
            <Box sx={{ display: "grid", justifyItems: "center", gap: 1.8 }}>
              <Paper
                elevation={0}
                sx={(theme) => ({
                  width: "100%",
                  maxWidth: 520,
                  minHeight: 430,
                  borderRadius: 8,
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: 3,
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(180deg, ${alpha("#fff", 0.08)}, ${alpha("#fff", 0.025)})`
                      : `linear-gradient(180deg, ${alpha("#fff", 0.98)}, ${alpha("#fff", 0.9)})`,
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? alpha("#fff", 0.12)
                      : alpha("#000", 0.08)
                  }`,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 35px 90px rgba(0,0,0,0.6)"
                      : "0 35px 90px rgba(0,0,0,0.16)",
                  backdropFilter: "blur(16px)",
                })}
              >
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 34, md: 42 },
                      fontWeight: 950,
                      letterSpacing: -1.2,
                      lineHeight: 1,
                    }}
                  >
                    bayar
                    <Box component="span" sx={{ color: "primary.main" }}>
                      solutions
                    </Box>
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1.5, fontSize: 15, lineHeight: 1.7 }}
                  >
                    Einzelunternehmen für digitale Produkte, moderne
                    Benutzeroberflächen und individuelle Softwareentwicklung.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                    gap: 1.6,
                  }}
                >
                  {[
                    ["Web", "B2B-Webseiten & Portale"],
                    ["Mobile", "Native Geschäftsanwendungen"],
                    ["Backend", "APIs & Datenlogik"],
                    ["Cloud", "Deployments & Betrieb"],
                  ].map(([title, text]) => (
                    <Box
                      key={title}
                      sx={(theme) => ({
                        p: 2,
                        borderRadius: 4,
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? alpha("#fff", 0.045)
                            : alpha("#000", 0.035),
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? alpha("#fff", 0.08)
                            : alpha("#000", 0.06)
                        }`,
                      })}
                    >
                      <Typography sx={{ fontWeight: 900, fontSize: 14 }}>
                        {title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}