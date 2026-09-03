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

/**
 * Section wrapper with:
 *   - Framer Motion title + subtitle slide-in (whileInView, once)
 *   - CSS teal underline sweep
 *   - Two parallax ambient blobs (top-right + bottom-left, opposite directions)
 *   - sx prop forwarded to the outer Box for per-section background tints
 */
export default function Section({ id, title, subtitle, children, sx }) {
  const rm = useReducedMotion();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Drive CSS underline animation — replaces IntersectionObserver
  const inView = useInView(titleRef, { once: true, margin: "-80px 0px" });

  // Parallax: blob 1 drifts upward, blob 2 drifts downward (counter-movement)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["6%", "30%"]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id={id}
      sx={[
        { position: "relative", overflow: "hidden" },
        ...(Array.isArray(sx) ? sx : [sx || {}]),
      ]}
    >
      {/* Blob 1 — top-right, teal, drifts upward */}
      {!rm && (
        <motion.div
          aria-hidden="true"
          style={{
            y: blob1Y,
            position: "absolute",
            top: "-28%",
            right: "-16%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(29,184,170,0.09) 0%, transparent 65%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Blob 2 — bottom-left, slightly different tint, drifts downward (counter-parallax) */}
      {!rm && (
        <motion.div
          aria-hidden="true"
          style={{
            y: blob2Y,
            position: "absolute",
            bottom: "-22%",
            left: "-14%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(29,184,170,0.06) 0%, transparent 65%)",
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
                  {/* CSS underline sweeps in via .sectionTitleUnderline.isOn */}
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
