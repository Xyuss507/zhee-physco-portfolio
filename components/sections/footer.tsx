import { PROFILE, SOCIALS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="px-(--padding-page) pt-(--padding-section) pb-10">
      <div className="section-shell text-center" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px,7vw,112px)", lineHeight: 0.92, fontWeight: 700 }}>
        {PROFILE.name}
      </div>
      <div className="section-shell h-px bg-black/10 my-10" />
      <div className="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-[11px] uppercase tracking-[0.12em]">
        <div>
          {PROFILE.name} © {PROFILE.year}
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="hover:text-(--gray-mid) transition-colors">
              {social.label}
            </a>
          ))}
          {/* Instagram Icon */}
          <a href="https://www.instagram.com/zheephysco_/" target="_blank" rel="noreferrer" className="hover:text-(--gray-mid) transition-colors" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          {/* WhatsApp Icon */}
          <a href="https://wa.me/6285187030525" target="_blank" rel="noreferrer" className="hover:text-(--gray-mid) transition-colors" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
        </div>
        <div>Made with Love in Indonesia</div>
      </div>
    </footer>
  );
}
