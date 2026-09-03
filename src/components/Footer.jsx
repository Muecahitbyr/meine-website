import { Box, Container, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import Reveal from "./Reveal.jsx";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <Reveal>
      <Box
        sx={(theme) => ({
          py: 5,
          borderTop: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            © {year} – {t("footer.role")}
          </Typography>

          <Stack direction="row" spacing={2.5}>
            <Typography
              component={RouterLink}
              to="/datenschutz"
              variant="body2"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { color: "text.primary" },
              }}
            >
              Datenschutz
            </Typography>
            <Typography
              component={RouterLink}
              to="/impressum"
              variant="body2"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { color: "text.primary" },
              }}
            >
              Impressum
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Reveal>
  );
}
