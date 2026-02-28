import { useEffect } from "react";

export default function ParallaxBackground() {
  useEffect(() => {
    let raf = 0;

    const setVars = (mx, my, sy) => {
      document.documentElement.style.setProperty("--mx", String(mx));
      document.documentElement.style.setProperty("--my", String(my));
      document.documentElement.style.setProperty("--sy", String(sy));
    };

    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
        const my = (e.clientY / window.innerHeight - 0.5) * 2; // -1..1
        const sy = window.scrollY || 0;
        setVars(mx.toFixed(4), my.toFixed(4), sy.toFixed(0));
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sy = window.scrollY || 0;
        const mx =
          getComputedStyle(document.documentElement).getPropertyValue("--mx") ||
          "0";
        const my =
          getComputedStyle(document.documentElement).getPropertyValue("--my") ||
          "0";
        setVars(mx, my, sy.toFixed(0));
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
