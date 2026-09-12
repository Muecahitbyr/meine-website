import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import GlowCard from "./GlowCard.jsx";
import Reveal from "./Reveal.jsx";
import { useTranslation } from "react-i18next";

// Each service gets a distinct brand colour — breaks the all-teal monotony
const SERVICE_KEYS = [
  { key: "web",     Icon: LanguageRoundedIcon,      color: "#3B82F6" }, // blue
  { key: "apps",    Icon: PhoneAndroidRoundedIcon,  color: "#1DB8AA" }, // teal (brand)
  { key: "backend", Icon: StorageRoundedIcon,       color: "#8B5CF6" }, // violet
  { key: "hosting", Icon: CloudRoundedIcon,         color: "#F59E0B" }, // amber
];

function ServiceCard({ title, description, Icon, color }) {
  return (
    <GlowCard
      accentColor={color}
      maxTilt={5}
      sx={() => ({
        // Subtle diagonal gradient blends the accent colour into the card
        background: `linear-gradient(135deg, #ffffff 0%, ${color}08 100%)`,
        height: "100%",
      })}
    >
      <Box
        sx={{
          p: { xs: 3, md: 3.5 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {/* Icon box — tinted with the card's accent colour */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              backgroundColor: alpha(color, 0.12),
              border: `1px solid ${alpha(color, 0.24)}`,
              color: color,
              fontSize: 22,
              // Subtle inner glow on the icon box
              boxShadow: `0 0 14px ${alpha(color, 0.18)}`,
            }}
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
      </Box>
    </GlowCard>
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
        {SERVICE_KEYS.map(({ key, Icon, color }, idx) => (
          <Reveal key={key} delay={idx * 60}>
            <ServiceCard
              title={t(`services.${key}.title`)}
              description={t(`services.${key}.description`)}
              Icon={Icon}
              color={color}
            />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}
