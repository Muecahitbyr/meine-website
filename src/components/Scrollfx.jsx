import { useEffect, useRef } from "react";

/**
 * Scroll Progress Hook (0 → 1)
 */
function useScrollProgress() {
  const ref = useRef(null);
  const progress = useRef(0);

  useEffect(() => {
    let raf;

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh;
      const end = -rect.height;

      const value = (start - rect.top) / (start - end);
      progress.current = Math.min(1, Math.max(0, value));

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { ref, progress };
}

/**
 * Parallax / Micro Scroll Motion Wrapper
 */
export function ScrollParallax({
  children,
  y = 40,
  rotate = 0,
  scaleFrom = 0.98,
  opacityFrom = 0.8,
}) {
  const { ref, progress } = useScrollProgress();

  return (
    <div
      ref={ref}
      style={{
        willChange: "transform, opacity",
        transform: `translateY(${(1 - progress.current) * y}px)
                    rotate(${(1 - progress.current) * rotate}deg)
                    scale(${scaleFrom + progress.current * (1 - scaleFrom)})`,
        opacity: opacityFrom + progress.current * (1 - opacityFrom),
      }}
    >
      {children}
    </div>
  );
}
