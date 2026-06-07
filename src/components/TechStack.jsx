import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import TiltCard from "./TiltCard.jsx";
import Reveal from "./Reveal.jsx";
import { useTranslation } from "react-i18next";

const SERVICE_KEYS = [
  { key: "web", Icon: LanguageRoundedIcon },
  { key: "apps", Icon: PhoneAndroidRoundedIcon },
  { key: "backend", Icon: StorageRoundedIcon },
  { key: "hosting", Icon: CloudRoundedIcon },
];

function ServiceCard({ title, description, Icon }) {
  return (
    <TiltCard
      maxTilt={4}
      lift={3}
      sx={(theme) => ({
        p: { xs: 3, md: 3.5 },
        borderRadius: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 200ms ease, transform 200ms ease",
        "&:hover": {
          boxShadow:
            "0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)",
        },
      })}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={(theme) => ({
            width: 48,
            height: 48,
            borderRadius: "10px",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            backgroundColor: alpha(theme.palette.primary.main, 0.10),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.20)}`,
            color: "primary.main",
            fontSize: 22,
          })}
        >
          {Icon ? <Icon fontSize="inherit" /> : null}
        </Box>

        <Box sx={{ minWidth: 0, pt: 0.5 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 17, md: 19 },
              lineHeight: 1.25,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <Typography
        color="text.secondary"
        sx={{ fontSize: { xs: 14, md: 15 }, lineHeight: 1.65 }}
      >
        {description}
      </Typography>
    </TiltCard>
  );
}

export default function TechStack() {
  const { t } = useTranslation("common");

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: { xs: 2, md: 3 },
        }}
      >
        {SERVICE_KEYS.map(({ key, Icon }, idx) => (
          <Reveal key={key} delay={idx * 50}>
            <ServiceCard
              title={t(`services.${key}.title`)}
              description={t(`services.${key}.description`)}
              Icon={Icon}
            />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}
