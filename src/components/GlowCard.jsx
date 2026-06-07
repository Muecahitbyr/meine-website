import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { Box } from "@mui/material";

// Defined at module level — prevents new component type on each render
const MotionBox = motion(Box);

// Overdamped spring — zero bounce (critical damping = 2√260 ≈ 32.5)
const SPRING = { stiffness: 260, damping: 34, mass: 1 };
const EASE = [0.25, 0.46, 0.45, 0.94];

/**
 * Reusable animated card wrapper.
 *
 * Features:
 *   - Framer Motion 3D tilt (mouse-driven, spring-damped)
 *   - Breathing glow ring (pulses opacity 0 → 0.65 → 0 every 3 s)
 *   - Strong hover boxShadow glow
 *   - Cursor-following spotlight (accentColor radial gradient)
 *   - accentColor prop for per-card colour theming
 *   - Everything disabled when prefers-reduced-motion
 *
 * Children own their own padding — GlowCard manages the outer shell only.
 */
export default function GlowCard({
  children,
  accentColor = "#1DB8AA",
  maxTilt = 6,
  sx,
  ...props
}) {
  const rm = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // ── Tilt motion values ──────────────────────────────────────────────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, SPRING);
  const springY = useSpring(mouseY, SPRING);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useTransform(springY, [0, 1], [maxTilt * 0.8, -maxTilt * 0.8]);

  // ── Cursor spotlight ────────────────────────────────────────────────
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  // Template literal creates a MotionValue<string> — updates DOM without React re-render
  const spotlight = useMotionTemplate`radial-gradient(
    260px circle at ${glowX}% ${glowY}%,
    ${accentColor}1e,
    transparent 62%
  )`;

  // ── Event handlers ──────────────────────────────────────────────────
  const onMouseMove = (e) => {
    if (!cardRef.current || rm) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mouseX.set(x);
    mouseY.set(y);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  // ── Breathing glow ring ─────────────────────────────────────────────
  // Ring pulses opacity 0→0.65→0 at rest; hides on hover.
  // Switching from keyframe array [0,0.65,0] to single value 0 (and back)
  // works cleanly in Framer Motion: current opacity value is the transition source.
  const ringAnimation = rm
    ? { animate: { opacity: 0 }, transition: { duration: 0 } }
    : isHovered
      ? { animate: { opacity: 0 }, transition: { duration: 0.2 } }
      : {
          animate: { opacity: [0, 0.65, 0] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <Box sx={{ perspective: "900px", height: "100%" }}>
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
        {/* Card surface — animated hover shadow */}
        <MotionBox
          animate={{
            boxShadow:
              isHovered && !rm
                ? `0 0 0 1px ${accentColor}66, 0 0 40px ${accentColor}28, 0 20px 48px rgba(0,0,0,0.16)`
                : `0 0 0 1px ${accentColor}22, 0 2px 12px rgba(0,0,0,0.06)`,
          }}
          transition={{ boxShadow: { duration: 0.35, ease: EASE } }}
          sx={[
            {
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              height: "100%",
            },
            typeof sx === "function" ? sx : (sx || {}),
          ]}
          {...props}
        >
          {/* Breathing glow ring — position absolute, inset 0 */}
          <motion.div
            {...ringAnimation}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              border: `1px solid ${accentColor}`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Cursor spotlight */}
          {!rm && (
            <MotionBox
              style={{ background: spotlight }}
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                pointerEvents: "none",
                borderRadius: "12px",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 350ms ease",
              }}
            />
          )}

          {/* Content — sits above decorative layers */}
          <Box sx={{ position: "relative", zIndex: 3, height: "100%" }}>
            {children}
          </Box>
        </MotionBox>
      </motion.div>
    </Box>
  );
}
