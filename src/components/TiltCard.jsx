import { useEffect, useRef, useState } from "react";
import { Paper, useMediaQuery } from "@mui/material";

export default function TiltCard({
  children,
  maxTilt = 10,
  lift = 8,
  sx,
  ...props
}) {
  const ref = useRef(null);

  const isCoarse = useMediaQuery("(pointer: coarse)");
  const isSmall = useMediaQuery("(max-width:900px)");
  const isMedium = useMediaQuery("(max-width:1200px)");

  const disabled = isCoarse || isSmall;
  const effectiveLift = disabled ? 0 : isMedium ? Math.max(0, lift - 3) : lift;

  const [style, setStyle] = useState({
    transform: "perspective(900px) translateZ(0)",
  });

  useEffect(() => {
    if (disabled) {
      setStyle({ transform: "perspective(900px) translateZ(0)" });
    }
  }, [disabled]);

  const onMove = (e) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rx = (py - 0.5) * -2 * maxTilt;
    const ry = (px - 0.5) * 2 * maxTilt;

    setStyle({
      transform: `perspective(900px) translateZ(0) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, ${-effectiveLift}px, 0)`,
    });
  };

  const onLeave = () => {
    if (disabled) return;
    setStyle({ transform: "perspective(900px) translateZ(0)" });
  };

  return (
    <Paper
      ref={ref}
      elevation={0}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      sx={[
        {
          transformOrigin: "center",
          willChange: "transform",
          transform: style.transform,
          transition: disabled ? "none" : "transform 160ms ease",
          backfaceVisibility: "hidden",

          contain: "layout paint",
          isolation: "isolate",
          display: "block",
        },
        typeof sx === "function" ? (t) => sx(t) : sx,
      ]}
      {...props}
    >
      {children}
    </Paper>
  );
}