"use client";

import { useEffect, useRef } from "react";
import { FlexibleImage } from "@/components/flexible-image";
import { PROFILE } from "@/lib/data";
import { gsap } from "@/lib/gsap-setup";

export function Hero({ loaded }: { loaded: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const nameParts = PROFILE.name.split(" ");
  const firstName = nameParts[0] ?? PROFILE.nameShort;
  const lastName = nameParts.slice(1).join(" ") || PROFILE.nameShort;

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(".hero-line-inner", {
      y: "0%",
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    })
      .to(
        ".hero-badge",
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .to(
        ".hero-footer",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );
  }, [loaded]);

  useEffect(() => {
    if (!cardRef.current || !glowRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const card = cardRef.current;
    const glow = glowRef.current;
    let dragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let cardStartX = 0;
    let cardStartY = 0;
    let pullX = 0;
    let pullY = 0;

    const onMove = (event: MouseEvent) => {
      if (dragging) {
        const nextX = cardStartX + (event.clientX - dragStartX);
        const nextY = cardStartY + (event.clientY - dragStartY);
        pullX = Math.max(-40, Math.min(60, nextX));
        pullY = Math.max(-40, Math.min(30, nextY));
        gsap.to(card, {
          x: pullX,
          y: pullY,
          rotate: pullX * 0.08,
          duration: 0.15,
          ease: "power2.out",
        });
        return;
      }
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 12,
        rotateX: y * -10,
        duration: 0.25,
        ease: "power2.out",
        transformPerspective: 800,
      });
      gsap.to(glow, {
        x: x * 24,
        y: y * 24,
        opacity: 0.8,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      if (!dragging) {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.35, ease: "power3.out" });
        gsap.to(glow, { x: 0, y: 0, opacity: 0.4, duration: 0.35, ease: "power3.out" });
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      cardStartX = pullX;
      cardStartY = pullY;
      card.setPointerCapture(event.pointerId);
      card.style.cursor = "grabbing";
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) {
        return;
      }
      dragging = false;
      card.releasePointerCapture(event.pointerId);
      card.style.cursor = "grab";
      gsap.to(card, {
        x: pullX * 0.55,
        y: pullY * 0.55,
        rotate: pullX * 0.05,
        rotateY: 0,
        rotateX: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(glow, { x: pullX * 0.15, y: pullY * 0.15, duration: 0.4, ease: "power3.out" });
    };

    gsap.to(card, {
      y: -8,
      duration: 2.3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("pointerdown", onPointerDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onPointerUp);
    card.addEventListener("pointercancel", onPointerUp);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("pointerdown", onPointerDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", onPointerUp);
      card.removeEventListener("pointercancel", onPointerUp);
      gsap.killTweensOf(card);
      gsap.killTweensOf(glow);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-(--padding-page) pt-24 pb-8">
      <div className="section-shell hero-badge opacity-0 -translate-x-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-(--black) animate-pulse" />
          <span className="section-kicker">{PROFILE.availableText}</span>
        </div>
        <div className="section-kicker">
          {PROFILE.location} - {PROFILE.year}
        </div>
      </div>

      <div className="section-shell flex-1 flex flex-col justify-center relative">
        {/* Decorative Rotating Badge */}
        <div 
          className="absolute top-0 right-[5%] hidden lg:flex items-center justify-center pointer-events-none opacity-40 mix-blend-multiply" 
          style={{ width: '140px', height: '140px', animation: 'spin 20s linear infinite' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
            <text fontSize="11" letterSpacing="3.5" fill="currentColor" fontWeight="500" className="uppercase">
              <textPath href="#circlePath">
                Creative Engineer • Zhee Physco •
              </textPath>
            </text>
          </svg>
          <div className="absolute text-lg">✦</div>
        </div>

        <div className="overflow-hidden">
          <div className="hero-line-inner translate-y-full" style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-hero)", fontWeight: 600, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            {firstName}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="hero-line-inner hero-name-wrap translate-y-full flex items-baseline gap-[3vw] flex-wrap" style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-hero)", fontWeight: 600, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            <span>{lastName}</span>

            {/* Profile Card */}
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-[4px] w-[clamp(260px,80vw,420px)] h-[clamp(300px,90vw,480px)] inline-flex items-center justify-center border border-black/10 cursor-grab touch-none"
              style={{
                backgroundColor: '#c8bda8',
                boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                isolation: 'isolate',
              }}
            >
              {/* Glow */}
              <div
                ref={glowRef}
                className="absolute -inset-12 pointer-events-none opacity-40 z-10"
                style={{ background: "radial-gradient(circle at center, rgba(245,242,237,0.45) 0%, rgba(245,242,237,0) 55%)" }}
              />

              {/* Photo — desaturated warm */}
              <FlexibleImage
                basePath={PROFILE.heroImage}
                alt={`${PROFILE.name} profile`}
                className="absolute inset-0 z-0"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'sepia(15%) saturate(0.9) brightness(1.0) contrast(1.02)',
                }}
              />

              {/* Bottom label */}
              <div className="absolute inset-x-0 bottom-0 p-3 z-30" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)' }}>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/70">Drag Interaction</div>
                <div className="text-[12px] tracking-[0.12em] text-white/90">{PROFILE.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="hero-line-inner translate-y-full" style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-hero)", fontWeight: 500, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--gray-mid)" }}>
            Developer.
          </div>
        </div>
      </div>

      <div className="section-shell hero-footer hero-footer-stack opacity-0 translate-y-4 flex items-end justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-px h-12 bg-black/20 origin-top" style={{ animation: "scaleY 1.5s ease infinite alternate" }} />
          <span className="section-kicker">Scroll</span>
        </div>
        <div className="text-right">
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px,2vw,24px)", fontWeight: 600 }}>{PROFILE.role}</div>
          <div style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--gray-mid)" }}>{PROFILE.roleAlt}</div>
        </div>
      </div>
    </section>
  );
}