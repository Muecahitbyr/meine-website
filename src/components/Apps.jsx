import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { Box, Typography, Chip, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal.jsx";
import ScreenshotGallery from "./ScreenshotGallery.jsx";
import ScrollParallax from "./ScrollParallax.jsx";

// Alternating column depth — the classic staggered-grid parallax look
const COLUMN_SPEEDS = [22, -14, 22];

// Defined outside component — prevents new type on every render
const MotionBox = motion(Box);

// Overdamped spring: critical damping for stiffness 280 is 2√280 ≈ 33.5
// damping: 36 → overdamped → zero bounce
const SPRING = { stiffness: 280, damping: 36, mass: 1 };
const EASE = [0.25, 0.46, 0.45, 0.94];

const SHADOW_REST =
  "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.08)";
const SHADOW_HOVER =
  "0 18px 44px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.09), 0 0 0 1px rgba(29,184,170,0.24)";

function ProjectCard3D({ project, delay }) {
  const { t } = useTranslation("common");
  const rm = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // ── Motion values (0→1 range, 0.5 = center/rest) ────────────────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, SPRING);
  const springY = useSpring(mouseY, SPRING);

  // Tilt: ±10° horizontal, ±8° vertical
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const rotateX = useTransform(springY, [0, 1], [8, -8]);

  // Cursor-following spotlight (MotionValue string → applied via style, not animate)
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(
    280px circle at ${glowX}% ${glowY}%,
    rgba(29,184,170,0.13),
    transparent 65%
  )`;

  // ── Handlers ────────────────────────────────────────────────────
  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mouseX.set(x);
    mouseY.set(y);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const onMouseLeave = () => {
    // Spring back to center → rotations ease to 0
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  const title = project.titleKey ? t(project.titleKey) : project.title || "Projekt";
  const description = project.descriptionKey
    ? t(project.descriptionKey)
    : project.description || "";
  const note = project.noteKey ? t(project.noteKey) : project.note;
  const href = project.storeUrl || project.link;

  return (
    <Reveal delay={delay}>
      {/* Perspective context — kept on a plain Box so it doesn't interfere
          with the Framer Motion transforms on the child */}
      <Box
        sx={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
          height: "100%",
        }}
      >
        {/* 3D tilt layer */}
        <motion.div
          ref={cardRef}
          onMouseMove={rm ? undefined : onMouseMove}
          onMouseEnter={rm ? undefined : () => setIsHovered(true)}
          onMouseLeave={rm ? undefined : onMouseLeave}
          style={{
            rotateX: rm ? 0 : rotateX,
            rotateY: rm ? 0 : rotateY,
            transformStyle: "preserve-3d",
            height: "100%",
            willChange: "transform",
          }}
        >
          {/* Card surface — animated shadow */}
          <MotionBox
            animate={{
              boxShadow: isHovered && !rm ? SHADOW_HOVER : SHADOW_REST,
            }}
            transition={{ boxShadow: { duration: 0.35, ease: EASE } }}
            sx={(theme) => ({
              height: "100%",
              borderRadius: "12px",
              background: theme.palette.background.paper,
              overflow: "hidden",
              position: "relative",
            })}
          >
            {/* Cursor spotlight — MotionValue drives background directly,
                no React re-render on mouse move */}
            {!rm && (
              <MotionBox
                style={{ background: spotlight }}
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  borderRadius: "12px",
                  pointerEvents: "none",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 350ms ease",
                }}
              />
            )}

            {/* Content sits above the spotlight */}
            <Box
              sx={{
                p: 2.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Title + description */}
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: 16, letterSpacing: -0.2 }}
                >
                  {title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.75,
                    fontSize: 13,
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {description}
                </Typography>
              </Box>

              {/* Tags */}
              {project.tags?.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={(theme) => ({
                        height: 22,
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: "6px",
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: "transparent",
                        color: "text.secondary",
                      })}
                    />
                  ))}
                </Box>
              )}

              {/* Screenshot — isHovered triggers image zoom inside */}
              <Box>
                <ScreenshotGallery
                  title={title}
                  screenshots={project.screenshots || []}
                  isHovered={isHovered && !rm}
                />
              </Box>

              <Box sx={{ flex: 1 }} />

              {/* CTA */}
              <Box sx={{ pt: 0.5 }}>
                {href ? (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                    onClick={() =>
                      window.open(href, "_blank", "noopener,noreferrer")
                    }
                    sx={{
                      borderRadius: "8px",
                      py: 1.1,
                      fontWeight: 700,
                      fontSize: 13,
                      color: "primary.contrastText",
                    }}
                  >
                    {t("projectCard.openStore")}
                  </Button>
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 1,
                      borderRadius: "8px",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ fontWeight: 600 }}
                    >
                      {note ?? t("projectCard.open")}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </MotionBox>
        </motion.div>
      </Box>
    </Reveal>
  );
}

export default function Apps({ projects }) {
  return (
    <Box
      sx={{
        maxWidth: 1120,
        mx: "auto",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        alignItems: "stretch",
      }}
    >
      {projects.map((p, idx) => (
        <ScrollParallax key={p.id || p.titleKey} speed={COLUMN_SPEEDS[idx % 3]}>
          <ProjectCard3D project={p} delay={idx * 50} />
        </ScrollParallax>
      ))}
    </Box>
  );
}
