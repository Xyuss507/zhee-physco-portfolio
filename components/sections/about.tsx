"use client";

import { useEffect, useMemo, useRef } from "react";
import { FlexibleImage } from "@/components/flexible-image";
import { PROFILE, STATS } from "@/lib/data";
import { gsap } from "@/lib/gsap-setup";

export function About() {
  const words = useMemo(() => PROFILE.bio.split(" "), []);
  const textRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !watermarkRef.current) {
      return;
    }
    const tween = gsap.to(textRef.current.querySelectorAll(".about-word"), {
      opacity: 1,
      stagger: 0.015,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    const watermarkTween = gsap.to(watermarkRef.current, {
      y: "-20%",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      watermarkTween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section id="about" className="px-(--padding-page) py-(--padding-section)">
      <div className="section-shell flex items-center gap-4 mb-14">
        <span className="section-kicker">[ 02 - About ]</span>
        <div className="flex-1 h-px bg-black/10" />
      </div>
      <div className="section-shell grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 items-start">
        <div className="relative h-[300px] md:h-[400px] lg:h-[520px] rounded-[4px] border border-black/10 overflow-hidden">
          <FlexibleImage
            basePath={PROFILE.portraitImage}
            alt={`${PROFILE.name} portrait`}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ 
              objectPosition: 'center',
              filter: 'sepia(15%) saturate(0.9) brightness(1.0) contrast(1.02)' 
            }}
          />
        </div>
        <div className="relative">
          {/* Parallax Watermark */}
          <div 
            ref={watermarkRef}
            className="absolute top-0 right-0 pointer-events-none text-black/[0.03] select-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(120px, 15vw, 240px)", fontWeight: 800, lineHeight: 0.8, letterSpacing: "-0.04em", zIndex: -1, transform: 'translateY(15%)' }}
          >
            ZHEE
          </div>

          <div ref={textRef} className="about-text text-[clamp(20px,2.2vw,32px)] leading-[1.35]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="about-word opacity-[0.15] mr-2 inline-block">
                {word}
              </span>
            ))}
          </div>
          <p className="mt-8 text-(--gray-mid) max-w-[68ch] leading-relaxed">{PROFILE.bioEn}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {STATS.map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4vw,60px)" }}>
                  {item.value}
                  {item.suffix}
                </div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-(--gray-mid)">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
