import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Lightly underdamped — tiny overshoot gives a satisfying snap-back
const SPRING = { stiffness: 220, damping: 22, mass: 1 };

/**
 * Wraps any element and pulls it toward the cursor while hovering.
 * strength controls how many pixels the element moves per pixel of cursor offset.
 * Restore prefers-reduced-motion safety — motion is disabled completely.
 */
export default function MagneticButton({ children, strength = 0.28 }) {
  const rm = useReducedMotion();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const onMouseMove = (e) => {
    if (rm || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: rm ? 0 : springX, y: rm ? 0 : springY, display: "inline-block" }}
      onMouseMove={rm ? undefined : onMouseMove}
      onMouseLeave={rm ? undefined : onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
