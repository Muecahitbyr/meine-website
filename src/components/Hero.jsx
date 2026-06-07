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
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal.jsx";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  const { t } = useTranslation("common");
  const chips = t("hero.chips", { returnObjects: true });
  const tiles = t("hero.card.tiles", { returnObjects: true });

  return (
    <Box
      id="top"
      sx={{
        display: "flex",
        flexDirection: "column",
        py: { xs: 2, md: 0 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
            py: { xs: 4, md: 10 },
          }}
        >
          {/* Left column: headline + CTAs */}
          <Reveal>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  fontSize: 11,
                }}
              >
                {t("header.brand")}
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  mt: 1.5,
                  fontSize: { xs: 38, sm: 48, md: 64 },
                  lineHeight: 1.02,
                  letterSpacing: -1.5,
                  fontWeight: 800,
                }}
              >
                {t("hero.headlinePre")}{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  {t("hero.headlineHighlight")}
                </Box>
                <br />
                {t("hero.headlinePost")}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 2.5,
                  maxWidth: 520,
                  fontSize: { xs: 16, md: 17 },
                  lineHeight: 1.65,
                }}
              >
                {t("hero.subtitle")}
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
                    borderRadius: 9999,
                    px: 3,
                    py: 1.5,
                    color: "primary.contrastText",
                  }}
                >
                  {t("hero.ctaPrimary")}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo("apps")}
                  sx={{
                    borderRadius: 9999,
                    px: 3,
                    py: 1.5,
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.06),
                    },
                  }}
                >
                  {t("hero.ctaSecondary")}
                </Button>
              </Stack>

              {Array.isArray(chips) && (
                <Stack
                  direction="row"
                  sx={{ mt: 3, flexWrap: "wrap", gap: 1 }}
                >
                  {chips.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      sx={(theme) => ({
                        borderRadius: "6px",
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: "transparent",
                        color: "text.secondary",
                        fontWeight: 600,
                        fontSize: 12,
                      })}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          </Reveal>

          {/* Right column: info card */}
          <Reveal delay={60}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Paper
                sx={(theme) => ({
                  width: "100%",
                  maxWidth: 440,
                  borderRadius: "20px",
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow:
                    "0 16px 48px rgba(0,0,0,0.09), 0 6px 18px rgba(0,0,0,0.04)",
                })}
              >
                <Box>
                  <Box
                    component="img"
                    src="/BayerSolutionsLogo.png"
                    alt="BAYAR-SOLUTIONS"
                    sx={{
                      height: 40,
                      width: "auto",
                      objectFit: "contain",
                      mb: 2,
                      display: "block",
                    }}
                  />
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: 14, lineHeight: 1.65 }}
                  >
                    {t("hero.card.description")}
                  </Typography>
                </Box>

                {Array.isArray(tiles) && (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 1.5,
                    }}
                  >
                    {tiles.map((tile) => (
                      <Box
                        key={tile.title}
                        sx={(theme) => ({
                          p: 2,
                          borderRadius: "10px",
                          border: `1px solid ${theme.palette.divider}`,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.04,
                          ),
                        })}
                      >
                        <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                          {tile.title}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: 12, mt: 0.25 }}
                        >
                          {tile.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
