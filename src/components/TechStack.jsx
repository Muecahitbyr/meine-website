import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TiltCard from "./TiltCard.jsx";
import Reveal from "./Reveal.jsx";
import { useTranslation } from "react-i18next";

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

function TechItem({ title, Icon, description }) {
  return (
    <TiltCard
      maxTilt={8}
      lift={6}
      sx={(t) => ({
        p: { xs: 2, md: 2.4 },
        borderRadius: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1.1,
        background:
          t.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha("#fff", 0.055)}, ${alpha(
                "#fff",
                0.025,
              )})`
            : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha(
                "#fff",
                0.96,
              )})`,
        border: `1px solid ${
          t.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.08)
        }`,
        backdropFilter: "blur(10px)",
      })}
    >
      <Box sx={{ display: "flex", alignItems: "stretch", gap: 12 }}>
        <Box
          sx={(t) => ({
            width: 40,
            height: 40,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            backgroundColor:
              t.palette.mode === "dark"
                ? alpha(t.palette.primary.main, 0.16)
                : alpha(t.palette.primary.main, 0.1),
            border: `1px solid ${alpha(t.palette.primary.main, 0.22)}`,
            flexShrink: 0,
          })}
        >
          <Box sx={{ fontSize: 20, lineHeight: 1 }}>
            {Icon ? <Icon /> : null}
          </Box>
        </Box>

        <Typography sx={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.2 }}>
          {title}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: 12.5,
          lineHeight: 1.45,
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
  const { t } = useTranslation("common");

  const tech = [
    { title: "Swift", Icon: SiSwift, descKey: "techItems.swift" },
    { title: "C#", Icon: SiSharp, descKey: "techItems.csharp" },
    {
      title: "JavaScript",
      Icon: SiJavascript,
      descKey: "techItems.javascript",
    },
    {
      title: "TypeScript",
      Icon: SiTypescript,
      descKey: "techItems.typescript",
    },

    { title: "SwiftUI", Icon: FaApple, descKey: "techItems.swiftui" },
    { title: "React", Icon: SiReact, descKey: "techItems.react" },
    { title: "Tailwind", Icon: SiTailwindcss, descKey: "techItems.tailwind" },
    { title: "Node.js", Icon: SiNodedotjs, descKey: "techItems.node" },
    { title: "REST APIs", Icon: TbApi, descKey: "techItems.rest" },

    { title: "Firebase", Icon: SiFirebase, descKey: "techItems.firebase" },
    { title: "MongoDB", Icon: SiMongodb, descKey: "techItems.mongodb" },

    { title: "Docker", Icon: SiDocker, descKey: "techItems.docker" },
    {
      title: "OpenShift",
      Icon: SiRedhatopenshift,
      descKey: "techItems.openshift",
    },
    { title: "Git", Icon: SiGit, descKey: "techItems.git" },

    { title: "Xcode", Icon: FaApple, descKey: "techItems.xcode" },
    { title: "VS Code", Icon: SiCodeium, descKey: "techItems.vscode" },
    {
      title: "Visual Studio",
      Icon: SiCodeium,
      descKey: "techItems.visualstudio",
    },
  ];

  return (
    <Box sx={{ maxWidth: 1040, mx: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 1.6, md: 2 },
        }}
      >
        {tech.map((item, idx) => (
          <Reveal key={item.title} delay={idx * 60} y={18}>
            <TechItem
              title={item.title}
              Icon={item.Icon}
              description={t(item.descKey)}
            />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}
