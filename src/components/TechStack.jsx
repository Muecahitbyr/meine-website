import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TiltCard from "./TiltCard.jsx";
import Reveal from "./Reveal.jsx";

import { SiReact, SiFirebase, SiMongodb, SiDocker } from "react-icons/si";

function ServiceCard({ title, description, Icon }) {
  return (
    <TiltCard
      maxTilt={6}
      lift={4}
      sx={(theme) => ({
        p: { xs: 3, md: 3.5 },
        borderRadius: 6,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha("#fff", 0.025)})`
            : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.96)})`,
        border: `1px solid ${
          theme.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)
        }`,
        backdropFilter: "blur(10px)",
      })}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 4,
            display: "grid",
            placeItems: "center",
            backgroundColor: (theme) =>
              alpha(theme.palette.primary.main, 0.12),
            border: `2px solid ${(theme) => alpha(theme.palette.primary.main, 0.3)}`,
            flexShrink: 0,
            fontSize: 28,
            color: "primary.main",
          }}
        >
          {Icon ? <Icon /> : null}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 900, fontSize: { xs: 18, md: 22 }, lineHeight: 1.2 }}>
            {title}
          </Typography>
        </Box>
      </Box>

      <Typography
        color="text.secondary"
        sx={{
          fontSize: { xs: 15, md: 17 },
          lineHeight: 1.65,
        }}
      >
        {description}
      </Typography>
    </TiltCard>
  );
}

export default function TechStack() {
  const services = [
    {
      title: "Geschäfts-Websites",
      Icon: SiReact,
      description:
        "Websites, die Ihre Kunden finden und konvertieren. Schnell, sicher und benutzerfreundlich.",
    },
    {
      title: "Geschäftsapps",
      Icon: SiFirebase,
      description:
        "Apps für iOS oder Web, die Ihre Prozesse digitalisieren und Ihren Alltag vereinfachen.",
    },
    {
      title: "Backend & APIs",
      Icon: SiMongodb,
      description:
        "Zuverlässige Datenflüsse und Schnittstellen damit Ihre Systeme zusammenarbeiten.",
    },
    {
      title: "Hosting & Betrieb",
      Icon: SiDocker,
      description:
        "Ihre Lösung läuft stabil und sicher. 24/7 verfügbar, schnell und wartbar.",
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          },
          gap: { xs: 2.4, md: 3 },
        }}
      >
        {services.map((item, idx) => (
          <Reveal key={item.title} delay={idx * 60} y={20}>
            <ServiceCard {...item} />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}
