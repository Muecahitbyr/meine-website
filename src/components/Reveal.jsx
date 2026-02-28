import { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  scale = 0.985,
  blur = 10,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  const reduceFX = useMediaQuery("(max-width:900px)");

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

  const initialFilter = reduceFX ? "none" : `blur(${blur}px)`;

  return (
    <Box
      ref={ref}
      sx={{
        opacity: show ? 1 : 0,
        transform: show
          ? "translate3d(0,0,0) scale(1)"
          : `translate3d(0,${y}px,0) scale(${scale})`,
        filter: show ? "none" : initialFilter,
        transition:
          "opacity 700ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </Box>
  );
}
