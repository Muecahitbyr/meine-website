import { Box, Typography, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TiltCard from "./TiltCard.jsx";
import Reveal from "./Reveal.jsx";
import { ScrollParallax } from "./Scrollfx.jsx";

import {
  SiSwift,
  SiSharp,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiFirebase,
  SiMongodb,
  SiDocker,
  SiRedhatopenshift,
  SiGit,
  SiCodeium,
  SiJavascript,
  SiTypescript,
} from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { TbApi } from "react-icons/tb";

function TechItem({ title, Icon, description, category }) {
  return (
    <TiltCard
      maxTilt={8}
      lift={6}
      sx={(theme) => ({
        p: { xs: 2, md: 2.4 },
        borderRadius: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1.2,
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha("#fff", 0.025)})`
            : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.96)})`,
        border: `1px solid ${
          theme.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)
        }`,
        backdropFilter: "blur(10px)",
        overflow: "hidden",
      })}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
        <Box
          sx={(theme) => ({
            width: 42,
            height: 42,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            backgroundColor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.primary.main, 0.16)
                : alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
            flexShrink: 0,
          })}
        >
          <Box sx={{ fontSize: 21, lineHeight: 1, color: "primary.main" }}>
            {Icon ? <Icon /> : null}
          </Box>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 950, fontSize: 15.5 }}>
            {title}
          </Typography>

          <Chip
            label={category}
            size="small"
            sx={{
              mt: 0.6,
              height: 20,
              fontSize: 10.5,
              fontWeight: 800,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.14),
              color: "text.primary",
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: 12.8,
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {description}
      </Typography>
    </TiltCard>
  );
}

export default function TechStack() {
  const tech = [
    {
      title: "B2B-Webseiten",
      Icon: SiReact,
      category: "Web",
      description: "Conversion-optimierte Websites und Kundenportale mit klarer Struktur.",
    },
    {
      title: "Mobile Geschäftsanwendungen",
      Icon: SiSwift,
      category: "App",
      description: "Native iOS Apps, die Prozesse digitalisieren und Nutzer begeistern.",
    },
    {
      title: "Sichere APIs",
      Icon: TbApi,
      category: "Backend",
      description: "Zuverlässige Schnittstellen für Daten, Authentifizierung und Integrationen.",
    },
    {
      title: "Cloud & Hosting",
      Icon: SiFirebase,
      category: "Cloud",
      description: "Skalierbare Backends und Deployments für performante Anwendungen.",
    },
    {
      title: "UI/UX Design",
      Icon: SiTailwindcss,
      category: "Design",
      description: "Klare Benutzerführung, starke Markenwirkung und echte Bedienfreundlichkeit.",
    },
    {
      title: "Wartbare Systeme",
      Icon: SiGit,
      category: "Workflow",
      description: "Sauberer Code, Versionskontrolle und effizientes Projektmanagement.",
    },
    {
      title: "Daten & Integrationen",
      Icon: SiMongodb,
      category: "Daten",
      description: "Flexibler Datenaufbau und zuverlässige Datenflüsse für Ihr System.",
    },
    {
      title: "Release & Betrieb",
      Icon: SiDocker,
      category: "DevOps",
      description: "Automatisierte Auslieferung und stabiler Betrieb für Ihre Lösung.",
    },
  ];

  return (
    <Box sx={{ maxWidth: 1080, mx: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 1.6, md: 2 },
        }}
      >
        {tech.map((item, idx) => (
          <Reveal key={item.title} delay={idx * 45} y={18}>
            <ScrollParallax
              y={16}
              rotate={0.2}
              scaleFrom={0.985}
              opacityFrom={0.92}
            >
              <TechItem {...item} />
            </ScrollParallax>
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}