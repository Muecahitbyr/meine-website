import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <Box sx={{ py: 3 }}>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Typography color="text.secondary" variant="body2">
          © {year} – {t("footer.role")}
        </Typography>
      </Container>
    </Box>
  );
}