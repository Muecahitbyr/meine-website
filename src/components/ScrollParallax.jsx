import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Wraps children in a scroll-linked vertical parallax — moves from +speed to
 * -speed as the element travels through the viewport. Distinct from Reveal:
 * this runs continuously on scroll rather than once on enter.
 */
export default function ScrollParallax({ children, speed = 20, style, ...props }) {
  const ref = useRef(null);
  const rm = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y: rm ? 0 : y, ...style }} {...props}>
      {children}
    </motion.div>
  );
}
