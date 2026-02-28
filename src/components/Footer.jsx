import { Box, Container, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <Box sx={{ py: 3 }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography color="text.secondary" variant="body2">
          © {year} – {t("footer.role")}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Typography
            component={RouterLink}
            to="/impressum"
            variant="body2"
            sx={{ color: "text.secondary", textDecoration: "none" }}
          >
            Impressum
          </Typography>

          <Typography
            component={RouterLink}
            to="/datenschutz"
            variant="body2"
            sx={{ color: "text.secondary", textDecoration: "none" }}
          >
            Datenschutz
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
