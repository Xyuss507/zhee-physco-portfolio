"use client";

import { useRef, useState } from "react";
import { FlexibleImage } from "@/components/flexible-image";
import { TransitionLink } from "@/components/transition-link";
import { PROJECTS } from "@/lib/data";
import { gsap } from "@/lib/gsap-setup";

export function Work() {
  const [active, setActive] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const changePreview = (index: number | null) => {
    if (index === null || !previewRef.current) {
      return;
    }
    setInteracted(true);
    gsap.fromTo(
      previewRef.current,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.out" },
    );
    setActive(index);
  };

  return (
    <section id="work" className="px-(--padding-page) py-(--padding-section)">
      <div className="section-shell flex items-center gap-4 mb-14">
        <span className="section-kicker">[ 01 - Selected Work ]</span>
        <div className="flex-1 h-px bg-black/10" />
      </div>
      <div className="section-shell grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        <div className="border-t border-black/10">
          {PROJECTS.map((project, i) => (
            <TransitionLink
              key={project.id}
              href={`/work/${project.slug}`}
              preserveScroll
              className="group block border-b border-black/10 py-8 transition-all duration-300"
              onMouseEnter={() => changePreview(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex items-center justify-between">
                <div className="transform transition-transform duration-500 group-hover:translate-x-4">
                  <span className="text-[11px] text-(--gray-mid) tracking-wider">{project.id}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(24px, 3.2vw, 44px)",
                      fontWeight: 500,
                      lineHeight: 1.05,
                      letterSpacing: "-0.01em",
                      transition: "font-style 0.3s",
                      fontStyle: active === i ? "italic" : "normal",
                    }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-4 mt-2 text-[11px] text-(--gray-mid) tracking-wider uppercase">
                    <span>{project.category}</span>
                    <span>- {project.year}</span>
                  </div>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-[11px] tracking-[0.14em] uppercase text-(--gray-mid) flex items-center gap-2 transform -translate-x-4 group-hover:translate-x-0">
                  Open <span className="text-lg leading-none mt-[-2px]">↗</span>
                </span>
              </div>
              <div className="lg:hidden mt-5" style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                overflow: 'hidden',
                backgroundColor: '#e8e2d8',
                borderRadius: '4px',
              }}>
                <FlexibleImage
                  basePath={project.image}
                  alt={`${project.title} cover`}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    filter: 'sepia(8%) saturate(0.95) brightness(0.98) contrast(1.02)',
                  }}
                />
              </div>
            </TransitionLink>
          ))}
        </div>

        <div className="hidden lg:block sticky top-24 self-start ml-[4vw]">
          <div
            ref={previewRef}
            style={{
              clipPath: "inset(0% 0% 100% 0%)",
              width: 'clamp(380px, 38vw, 520px)',
              backgroundColor: '#ece7de',
              border: '1px solid rgba(0,0,0,0.10)',
              borderRadius: '4px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
              padding: '16px',
            }}
          >
            {active !== null ? (
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                overflow: 'hidden',
                backgroundColor: '#e8e2d8',
                borderRadius: '2px',
              }}>
                <FlexibleImage
                  basePath={PROJECTS[active].image}
                  alt={`${PROJECTS[active].title} cover`}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    filter: 'sepia(8%) saturate(0.95) brightness(0.98) contrast(1.02)',
                  }}
                />
              </div>
            ) : interacted ? (
              <div className="flex items-center justify-center" style={{ width: '100%', aspectRatio: '16/10' }}>
                <span style={{ fontSize: "11px", color: "var(--gray-mid)", letterSpacing: "0.1em" }}>MOVE CURSOR TO A PROJECT</span>
              </div>
            ) : (
              <div style={{ width: '100%', aspectRatio: '16/10' }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
