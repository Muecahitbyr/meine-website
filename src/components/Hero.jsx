import { Box, Button, Container, Stack, Typography, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Reveal from "./Reveal.jsx";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation("common");

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
                {t("hero.overline")}
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
                {t("hero.titleLine1")}{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  {t("hero.highlight")}
                </Box>
                <br />
                {t("hero.titleLine2")}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 720 }}>
                {t("hero.subtitle")}
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={120} y={22}>
            <Box sx={{ display: "grid", justifyItems: "center", gap: 1.5 }}>
              <Box
                component="img"
                src="/PB.png"
                alt={t("hero.portraitAlt")}
                sx={{
                  width: "min(420px, 92%)",
                  height: "auto",
                  borderRadius: 6,
                  objectFit: "cover",
                  boxShadow: (t) =>
                    t.palette.mode === "dark"
                      ? "0 30px 70px rgba(0,0,0,0.55)"
                      : "0 30px 70px rgba(0,0,0,0.18)",
                  border: (t) =>
                    `1px solid ${
                      t.palette.mode === "dark"
                        ? alpha("#fff", 0.12)
                        : alpha("#000", 0.08)
                    }`,
                }}
              />

              <Paper
                elevation={0}
                sx={(t) => ({
                  width: "min(420px, 92%)",
                  borderRadius: 4,
                  px: 2,
                  py: 1.4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  backgroundColor:
                    t.palette.mode === "dark"
                      ? alpha("#fff", 0.06)
                      : alpha("#000", 0.03),
                  border: `1px solid ${
                    t.palette.mode === "dark"
                      ? alpha("#fff", 0.10)
                      : alpha("#000", 0.08)
                  }`,
                })}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      letterSpacing: -0.3,
                      lineHeight: 1.1,
                      fontSize: { xs: 16, sm: 18 },
                    }}
                  >
                    Mücahit Bayar
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.2,
                      color: "text.secondary",
                      fontSize: { xs: 12.5, sm: 13.5 },
                      lineHeight: 1.2,
                    }}
                  >
                    {t("hero.nameRole")}
                  </Typography>
                </Box>

                <Box
                  sx={(t) => ({
                    flexShrink: 0,
                    px: 1.2,
                    py: 0.6,
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 800,
                    color: "text.primary",
                    backgroundColor:
                      t.palette.mode === "dark"
                        ? alpha(t.palette.primary.main, 0.18)
                        : alpha(t.palette.primary.main, 0.12),
                    border: `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
                  })}
                >
                  Full-Stack & iOS 
                </Box>
              </Paper>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
