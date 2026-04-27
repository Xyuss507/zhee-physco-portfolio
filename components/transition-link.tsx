"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { gsap } from "@/lib/gsap-setup";

type TransitionLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  preserveScroll?: boolean;
};

export function TransitionLink({
  href,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  preserveScroll = false,
}: TransitionLinkProps) {
  const router = useRouter();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }
      if (href.startsWith("#")) {
        return;
      }
      event.preventDefault();

      if (preserveScroll) {
        sessionStorage.setItem("homeScrollY", String(window.scrollY));
      }

      const existing = document.getElementById("page-transition-overlay");
      if (existing) {
        existing.remove();
      }

      const overlay = document.createElement("div");
      overlay.id = "page-transition-overlay";
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.background = "var(--black)";
      overlay.style.zIndex = "10001";
      overlay.style.transform = "translateY(100%)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.color = "var(--white)";
      overlay.style.fontFamily = "var(--font-display)";
      overlay.style.fontSize = "clamp(22px, 3vw, 46px)";
      overlay.style.letterSpacing = "0.08em";
      overlay.textContent = "OPENING PROJECT";
      document.body.appendChild(overlay);

      gsap.to(overlay, {
        y: "0%",
        duration: 0.45,
        ease: "power4.inOut",
        onComplete: () => {
          const currentPath = window.location.pathname;
          router.push(href);
          
          const checkInterval = setInterval(() => {
            if (window.location.pathname !== currentPath || window.location.hash) {
              clearInterval(checkInterval);
              gsap.to(overlay, {
                y: "-100%",
                duration: 0.45,
                ease: "power4.inOut",
                onComplete: () => overlay.remove(),
              });
            }
          }, 50);

          // Fallback if routing fails or takes too long
          setTimeout(() => {
            clearInterval(checkInterval);
            if (document.body.contains(overlay)) {
              gsap.to(overlay, {
                y: "-100%",
                duration: 0.45,
                ease: "power4.inOut",
                onComplete: () => overlay.remove(),
              });
            }
          }, 3000);
        },
      });
    },
    [href, preserveScroll, router],
  );

  return (
    <a href={href} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </a>
  );
}
