"use client";

import { useEffect, useRef } from "react";
import { PROFILE } from "@/lib/data";
import { gsap } from "@/lib/gsap-setup";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current || !counterWrapRef.current || !nameRef.current || !topRef.current || !botRef.current) {
      onComplete();
      return;
    }

    const counterContainer = counterWrapRef.current;
    const tl = gsap.timeline();

    gsap.set(nameRef.current, { yPercent: 14, opacity: 0.2 });

    tl.to(counterRef.current, {
      innerText: 100,
      duration: 1.8,
      snap: { innerText: 1 },
      ease: "power3.inOut",
    })
      .to(
        nameRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.3",
      )
      .to(
        nameRef.current,
        {
          letterSpacing: "0.02em",
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.1",
      );

    if (counterContainer) {
      tl.to(
        counterContainer,
        {
          opacity: 0,
          duration: 0.3,
        },
        "+=0.4",
      );
    }

    tl
      .to(
        nameRef.current,
        {
          yPercent: -8,
          opacity: 0,
          duration: 0.35,
          ease: "power3.in",
        },
        "+=0.05",
      )
      .to(
        topRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        },
        "+=0.2",
      )
      .to(
        botRef.current,
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
          onComplete,
        },
        "<",
      );
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-10000 pointer-events-none">
      <div ref={topRef} className="absolute top-0 left-0 right-0 h-1/2 bg-(--black) flex items-end justify-between px-[5vw] pb-6">
        <div className="text-white/45 text-[12px] tracking-[0.2em] uppercase mb-4">
          Loading Experience
        </div>
        <div className="text-white/35 text-[12px] tracking-[0.2em] uppercase mb-4">{PROFILE.year}</div>
        <div
          ref={counterWrapRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 text-[clamp(88px,16vw,230px)] leading-none tracking-tight text-white/95"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          <span ref={counterRef}>0</span>
        </div>
      </div>
      <div ref={botRef} className="absolute bottom-0 left-0 right-0 h-1/2 bg-(--black)" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={nameRef}
          style={{
            clipPath: "inset(100% 0% 0% 0%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 8vw, 100px)",
            color: "var(--white)",
            letterSpacing: "0.05em",
            fontStyle: "italic",
            whiteSpace: "nowrap",
          }}
        >
          {PROFILE.name}
        </div>
      </div>
    </div>
  );
}
