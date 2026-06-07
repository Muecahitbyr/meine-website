import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94];

/**
 * Scroll-reveal wrapper — slides and fades in once when entering the viewport.
 * delay is in milliseconds (matches existing call sites).
 */
export default function Reveal({ children, delay = 0, y = 18 }) {
  const rm = useReducedMotion();

  return (
    <motion.div
      initial={rm ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{
        duration: 0.62,
        ease: EASE,
        delay: rm ? 0 : delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
