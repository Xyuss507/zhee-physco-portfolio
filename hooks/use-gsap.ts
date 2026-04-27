"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-setup";

export function useGsap<T extends HTMLElement>(
  animation: (element: T) => gsap.core.Tween | gsap.core.Timeline | void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => animation(ref.current as T), ref);
    return () => ctx.revert();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
