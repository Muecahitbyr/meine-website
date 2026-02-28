import { useMemo, useRef, useState } from "react";
import { Button, useMediaQuery } from "@mui/material";

export default function MagneticButton({
  children,
  className = "",
  sx,
  ...props
}) {
  const ref = useRef(null);
  const isFine = useMediaQuery("(pointer: fine)");
  const isDesktop = useMediaQuery("(min-width:900px)");
  const enabled = isFine && isDesktop;

  const [t, setT] = useState({ x: 0, y: 0 });

  const style = useMemo(
    () => ({
      transform: enabled ? `translate3d(${t.x}px, ${t.y}px, 0)` : "none",
      transition: enabled ? "transform 120ms ease" : "none",
      willChange: enabled ? "transform" : "auto",
    }),
    [enabled, t.x, t.y],
  );

  const onMove = (e) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    setT({ x: dx * 8, y: dy * 6 });
  };

  const onLeave = () => {
    if (!enabled) return;
    setT({ x: 0, y: 0 });
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-block" }}
    >
      <Button
        {...props}
        className={`shineBtn ${className}`}
        sx={[{ ...style }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        {children}
      </Button>
    </span>
  );
}
