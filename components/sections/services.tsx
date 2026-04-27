"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/data";

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="px-(--padding-page) py-(--padding-section)">
      <div className="section-shell flex items-center gap-4 mb-14">
        <span className="section-kicker">[ 03 - Services ]</span>
        <div className="flex-1 h-px bg-black/10" />
      </div>
      <div className="section-shell border-t border-black/10">
        {SERVICES.map((service, index) => {
          const isOpen = active === index;
          return (
            <article
              key={service.num}
              className="border-b border-black/10 py-6 cursor-pointer"
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="flex items-start gap-4">
                <div className="text-[11px] tracking-[0.15em] text-(--gray-mid) mt-2">{service.num}</div>
                <div className="flex-1">
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 600, fontStyle: isOpen ? "italic" : "normal" }}>{service.title}</h3>
                  <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-[70ch] text-(--gray-mid)">{service.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {service.deliverables.map((item) => (
                          <span key={item} className="px-3 py-1 border border-black/15 text-[11px] uppercase tracking-widest">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Rotating Plus Icon */}
                <div className="mt-3 text-(--gray-mid) transition-transform duration-500" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
