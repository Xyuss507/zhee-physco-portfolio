import { PROFILE, SKILLS_MARQUEE } from "@/lib/data";

function buildTrack(items: string[]) {
  return [...items, ...items];
}

export function Marquee() {
  const coreTrack = buildTrack([
    PROFILE.name.toUpperCase(),
    PROFILE.role.toUpperCase(),
    "CREATIVE ENGINEERING",
    "SELECTED WORK",
  ]);
  const skillsTrack = buildTrack(SKILLS_MARQUEE.slice(0, 5).map((item) => item.toUpperCase()));

  return (
    <section className="marquee-wrap my-(--padding-section) py-5 md:py-6 bg-[color-mix(in_srgb,var(--white)_85%,var(--gray-light))]">
      <div className="overflow-hidden">
        <div className="marquee-track marquee-track-left text-[clamp(18px,2.1vw,30px)] font-semibold" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
          {coreTrack.map((item, index) => (
            <span key={`${item}-${index}`}>{item} —</span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden mt-2">
        <div className="marquee-track marquee-track-right text-[clamp(12px,1.1vw,15px)] uppercase" style={{ letterSpacing: "0.12em", color: "var(--gray-mid)" }}>
          {skillsTrack.map((item, index) => (
            <span key={`${item}-${index}`}>{item} —</span>
          ))}
        </div>
      </div>
    </section>
  );
}
