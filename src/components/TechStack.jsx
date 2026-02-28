import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TiltCard from "./TiltCard.jsx";
import Reveal from "./Reveal.jsx";

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
            ? `linear-gradient(180deg, ${alpha("#fff", 0.055)}, ${alpha("#fff", 0.025)})`
            : `linear-gradient(180deg, ${alpha("#fff", 1)}, ${alpha("#fff", 0.96)})`,
        border: `1px solid ${t.palette.mode === "dark" ? alpha("#fff", 0.10) : alpha("#000", 0.08)}`,
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
                : alpha(t.palette.primary.main, 0.10),
            border: `1px solid ${alpha(t.palette.primary.main, 0.22)}`,
            flexShrink: 0,
          })}
        >
          <Box sx={{ fontSize: 20, lineHeight: 1 }}>{Icon ? <Icon /> : null}</Box>
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

const tech = [
  { title: "Swift", Icon: SiSwift, description: "Native iOS development with modern concurrency and clean architecture." },
  { title: "C#", Icon: SiSharp, description: "Backend & application development with strong typing and OOP principles." },
  { title: "JavaScript", Icon: SiJavascript, description: "Frontend and backend development with modern ES6+ features." },
  { title: "TypeScript", Icon: SiTypescript, description: "Superset of JavaScript adding static types for safer code." },

  { title: "SwiftUI", Icon: FaApple, description: "Declarative UI framework for modern Apple interfaces." },
  { title: "React", Icon: SiReact, description: "Component-based frontend for scalable web applications." },
  { title: "Tailwind", Icon: SiTailwindcss, description: "Utility-first CSS for fast, consistent UI design." },
  { title: "Node.js", Icon: SiNodedotjs, description: "JavaScript runtime for scalable backend services." },
  { title: "REST APIs", Icon: TbApi, description: "Designing and integrating structured API communication." },

  { title: "Firebase", Icon: SiFirebase, description: "Auth, Firestore and cloud-based app infrastructure." },
  { title: "MongoDB", Icon: SiMongodb, description: "NoSQL database for flexible, scalable data storage." },

  { title: "Docker", Icon: SiDocker, description: "Containerization for reproducible environments and deployment." },
  { title: "OpenShift", Icon: SiRedhatopenshift, description: "Enterprise Kubernetes platform for scalable deployments." },
  { title: "Git", Icon: SiGit, description: "Version control and collaborative workflows." },

  { title: "Xcode", Icon: FaApple, description: "Apple IDE for building and testing native iOS apps." },
  { title: "VS Code", Icon: SiCodeium, description: "Lightweight editor for modern web development." },
  { title: "Visual Studio", Icon: SiCodeium, description: "IDE for C# and enterprise application development." },
];

export default function TechStack() {
  return (
    <Box
      sx={{
        maxWidth: 1040,
        mx: "auto",
      }}
    >
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
            <TechItem title={item.title} Icon={item.Icon} description={item.description} />
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}