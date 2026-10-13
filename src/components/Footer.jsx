import { Box, Container, Typography, Stack, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
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

        <Stack
          direction="row"
          useFlexGap
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 2.5,
            rowGap: 1,
          }}
        >
          <Typography
            component={RouterLink}
            to="/#apps"
            variant="body2"
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "text.primary" },
            }}
          >
            {t("footer.appsLink")}
          </Typography>
          <Typography
            component={RouterLink}
            to="/webseiten-kaufbeuren"
            variant="body2"
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "text.primary" },
            }}
          >
            {t("footer.webLink")}
          </Typography>
          <Typography
            component={RouterLink}
            to="/app-entwicklung-kaufbeuren"
            variant="body2"
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "text.primary" },
            }}
          >
            {t("footer.appLink")}
          </Typography>
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
          <IconButton
            component="a"
            href="https://www.instagram.com/bayarsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("footer.instagramAria")}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
            }}
          >
            <InstagramIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
