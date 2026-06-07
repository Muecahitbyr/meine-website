import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Box, Container, Typography } from "@mui/material";

const EASE = [0.25, 0.46, 0.45, 0.94];

export default function Section({ id, title, subtitle, children }) {
  const rm = useReducedMotion();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Drive the CSS underline animation — replaces old IntersectionObserver
  const inView = useInView(titleRef, { once: true, margin: "-80px 0px" });

  // Parallax blob: drifts upward as the section scrolls out of view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id={id}
      sx={{ position: "relative" }}
    >
      {/* Decorative ambient blob — extremely subtle teal radial gradient
          with parallax. body overflow-x:hidden clips the right overhang. */}
      {!rm && (
        <motion.div
          aria-hidden="true"
          style={{
            y: blobY,
            position: "absolute",
            top: "-25%",
            right: "-18%",
            width: 580,
            height: 580,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(29,184,170,0.045) 0%, transparent 65%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          py: { xs: 8, md: 12 },
        }}
      >
        {(title || subtitle) && (
          <Box ref={titleRef} sx={{ mb: { xs: 5, md: 6 } }}>
            {title && (
              <motion.div
                initial={rm ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px" }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: 32, md: 44 },
                    letterSpacing: -0.8,
                    fontWeight: 800,
                  }}
                >
                  {/* CSS underline sweeps in via the existing .sectionTitleUnderline class */}
                  <span
                    className={`sectionTitleUnderline ${inView ? "isOn" : ""}`}
                  >
                    {title}
                  </span>
                </Typography>
              </motion.div>
            )}

            {subtitle && (
              <motion.div
                initial={rm ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px" }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: rm ? 0 : 0.1,
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1.5,
                    maxWidth: 600,
                    fontSize: { xs: 15, md: 17 },
                    lineHeight: 1.65,
                  }}
                >
                  {subtitle}
                </Typography>
              </motion.div>
            )}
          </Box>
        )}

        {children}
      </Container>
    </Box>
  );
}
