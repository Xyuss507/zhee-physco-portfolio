import { FlexibleImage } from "@/components/flexible-image";
import { TransitionLink } from "@/components/transition-link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-(--padding-page) py-28">
      <TransitionLink href="/" className="text-[11px] tracking-[0.15em] uppercase text-(--gray-mid)">
        ← Back
      </TransitionLink>
      <section className="mt-10">
        <p className="text-[11px] uppercase tracking-[0.15em] text-(--gray-mid)">
          {project.id} - {project.category} - {project.year}
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-display)", lineHeight: 0.95 }}>{project.title}</h1>
        <p
          className="mt-8"
          style={{
            maxWidth: '520px',
            lineHeight: '1.7',
            color: 'rgba(0,0,0,0.65)',
            fontSize: '15px',
          }}
        >
          {project.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="uppercase"
              style={{
                border: '1px solid rgba(0,0,0,0.2)',
                padding: '4px 12px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#1a1a1a',
                backgroundColor: 'transparent',
                fontFamily: 'monospace',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.08)', margin: '32px 0' }} />
      <div style={{
        width: '100%',
        backgroundColor: '#ece7de',
        borderRadius: '4px',
        padding: 'clamp(16px, 4vw, 40px)',
        marginTop: '48px',
        marginBottom: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '500px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle inner border */}
        <div style={{
          position: 'absolute',
          inset: '16px',
          border: '1px solid rgba(0,0,0,0.10)',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Project image */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          position: 'relative',
          zIndex: 0,
        }}>
          <FlexibleImage
            basePath={project.image}
            alt={`${project.title} showcase`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'sepia(8%) saturate(0.95) brightness(0.98) contrast(1.02)',
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Bottom label */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '28px',
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'rgba(0,0,0,0.35)',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          zIndex: 2,
        }}>
          {project.title} — Preview
        </div>
      </div>
    </main>
  );
}
