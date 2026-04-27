"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap-setup";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();
  const enabled = isClient && !window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (!enabled || !dotRef.current || !circleRef.current) {
      return;
    }

    const dot = dotRef.current;
    const circle = circleRef.current;

    const onMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0, ease: "none" });
      gsap.to(circle, { x: mouseX, y: mouseY, duration: 0.5, ease: "power3.out" });
    };

    const onEnterLink = () => {
      gsap.to(circle, { scale: 3, opacity: 0.15, duration: 0.3, ease: "power2.out" });
    };

    const onLeaveLink = () => {
      gsap.to(circle, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);
    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onEnterLink);
      link.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onEnterLink);
        link.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-9999"
        style={{ transform: "translate(-50%, -50%)", mixBlendMode: "difference" }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white pointer-events-none z-9998"
        style={{ transform: "translate(-50%, -50%)", mixBlendMode: "difference" }}
      />
    </>
  );
}
