import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

export default function Reveal({ children, delay = 0, y = 12 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : `translateY(${y}px)`,
        transition:
          "opacity 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </Box>
  );
}
