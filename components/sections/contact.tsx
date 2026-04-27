import { PROFILE, SOCIALS } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="px-(--padding-page) py-(--padding-section)">
      <div className="section-shell" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(46px,7vw,92px)", lineHeight: 0.95, fontWeight: 600 }}>
        <div>Let&apos;s build something</div>
        <div style={{ fontStyle: "italic", color: "var(--gray-mid)" }}>worth remembering.</div>
      </div>

      <div className="section-shell grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 mt-12 md:mt-14">
        <div className="space-y-5">
          <p className="text-[11px] tracking-[0.15em] uppercase text-(--gray-mid)">{PROFILE.location}</p>
          <a href={`mailto:${PROFILE.email}`} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,44px)" }}>
            {PROFILE.email}
          </a>
          <div className="flex flex-wrap gap-4 text-[11px] tracking-[0.15em] uppercase text-(--gray-mid)">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <form className="space-y-9">
          <label className="block border-b border-black/20 pb-2">
            <span className="text-[11px] uppercase tracking-widest text-(--gray-mid)">Name</span>
            <input className="w-full bg-transparent outline-none mt-2 focus:border-black" type="text" />
          </label>
          <label className="block border-b border-black/20 pb-2">
            <span className="text-[11px] uppercase tracking-widest text-(--gray-mid)">Email</span>
            <input className="w-full bg-transparent outline-none mt-2" type="email" />
          </label>
          <label className="block border-b border-black/20 pb-2">
            <span className="text-[11px] uppercase tracking-widest text-(--gray-mid)">Message</span>
            <textarea className="w-full bg-transparent outline-none mt-2 min-h-24 resize-y" />
          </label>
          <button className="border border-black px-6 py-3 uppercase tracking-[0.12em] text-[11px] hover:bg-(--black) hover:text-(--white) transition-colors duration-300">
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}
