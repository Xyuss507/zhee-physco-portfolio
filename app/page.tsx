"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Cursor } from "@/components/cursor";
import { Loader } from "@/components/loader";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Noise } from "@/components/noise";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

export default function Home() {
  const introSeen = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem("introSeen") === "1",
    () => false,
  );
  const [introCompleted, setIntroCompleted] = useState(false);
  const loaded = introSeen || introCompleted;

  useEffect(() => {
    const storedScroll = sessionStorage.getItem("homeScrollY");
    if (storedScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: Number(storedScroll), behavior: "instant" as ScrollBehavior });
      });
      sessionStorage.removeItem("homeScrollY");
    }
  }, []);

  useEffect(() => {
    if (!loaded || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const sections = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { y: 56, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          delay: index * 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loaded]);

  return (
    <main id="main-content" className="relative">
      {!loaded && (
        <Loader
          onComplete={() => {
            sessionStorage.setItem("introSeen", "1");
            setIntroCompleted(true);
          }}
        />
      )}
      <Noise />
      <Cursor />
      <Nav />
      <div data-reveal>
        <Hero loaded={loaded} />
      </div>
      <div data-reveal>
        <Work />
      </div>
      <div data-reveal>
        <Marquee />
      </div>
      <div data-reveal>
        <About />
      </div>
      <div data-reveal>
        <Services />
      </div>
      <div data-reveal>
        <Contact />
      </div>
      <div data-reveal>
        <Footer />
      </div>
    </main>
  );
}
