"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";

const navLinks = [
  { href: "#work", label: "Work", num: "01" },
  { href: "#about", label: "About", num: "02" },
  { href: "#services", label: "Services", num: "03" },
  { href: "#contact", label: "Contact", num: "04" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 80);
      setHidden(currentY > lastY && currentY > 120);
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-9500 transition-all duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"} ${
          scrolled ? "bg-[color-mix(in_srgb,var(--white)_92%,transparent)] border-b border-(--gray-light)" : "bg-transparent"
        }`}
      >
        <nav className="px-(--padding-page) py-4 md:py-5 flex items-center justify-between gap-4">
          <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 800, letterSpacing: "0.06em" }}>
            {PROFILE.nameShort.slice(0, 2)}
          </Link>
          <div className="hidden md:block tracking-[0.08em] uppercase text-[11px]">{PROFILE.name}</div>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.15em]">
                {link.label}
              </a>
            ))}
            <span className="text-[11px] uppercase tracking-[0.15em]">
              {PROFILE.available ? "AVAILABLE" : "UNAVAILABLE"}
            </span>
          </div>
          <button className="md:hidden text-[11px] uppercase tracking-[0.2em] border border-black/20 px-3 py-2" onClick={() => setIsOpen((v) => !v)}>
            Menu
          </button>
        </nav>
      </header>
      <div
        className={`fixed inset-0 z-9600 bg-(--black) text-(--white) transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <div className="h-full flex flex-col justify-center px-(--padding-page) gap-10">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="overflow-hidden">
              <span className="block text-[38px]" style={{ fontFamily: "var(--font-display)" }}>
                {link.num} {link.label}
              </span>
            </a>
          ))}
          <span className="text-[11px] uppercase tracking-[0.15em] text-white/70">{PROFILE.availableText}</span>
        </div>
      </div>
    </>
  );
}
