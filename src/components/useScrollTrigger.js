import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollTrigger(setup, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger));
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
