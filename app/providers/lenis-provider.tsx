"use client";

import Lenis from "@studio-freight/lenis";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

type LenisContextValue = {
  getLenis: () => Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ getLenis: () => null });

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const contextValue = useMemo(
    () => ({
      getLenis: () => lenisRef.current,
    }),
    [],
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={contextValue}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext).getLenis();
