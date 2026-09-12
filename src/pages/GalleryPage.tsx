import { Link } from "react-router-dom";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";
import { galleryImages } from "../data/content";
import { ArrowLeft, Reveal, SectionHeading } from "../components/ui";

/* Deterministic pseudo-starfield — cheap CSS twinkle, seeded per star. */
const STARS = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 1 + (i % 3),
  delay: (i % 8) * 0.4,
  duration: 2.4 + (i % 5),
}));

export default function GalleryPage() {
  /* Sample every second frame so the orbit stays tight, big and light —
     the full archive stays listed in content.ts. */
  const orbit = galleryImages.filter((_, i) => i % 2 === 0);
  // Geo-correct ring radius so neighbouring photos just touch.
  const fitRadius = Math.round((0.5 * 236 + 8) / Math.tan(Math.PI / orbit.length));

  return (
    <section id="gallery" className="relative scroll-mt-24 pt-28 md:pt-32">
      {/* heading */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 border hairline px-4 py-2.5 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase transition-colors hover:border-gold-400/70 hover:text-gold-300"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to home
          </Link>
        </Reveal>

        <div className="mt-10">
          <SectionHeading
            index="03"
            jp="写真 — gallery"
            title={
              <>
                Off-screen<span className="text-stroke block">frames</span>
              </>
            }
            note={`A personal photo archive — ${orbit.length} frames in slow orbit`}
          />
        </div>
      </div>

      {/* orbit — no band, the pages' own background shows through */}
      <div className="relative w-full overflow-hidden py-14 sm:py-20">
        {/* nebula glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 46% at 50% 42%, rgba(110,142,160,0.18), transparent 70%), radial-gradient(42% 40% at 76% 64%, rgba(228,172,82,0.12), transparent 70%)",
          }}
        />
        {/* starfield */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-bone/80"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}
        </div>
        {/* orbit rings */}
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/5" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-bone/10" />

        <CylinderCarousel
          images={orbit}
          cardWidth={236}
          radius={fitRadius}
          perspective="52em"
          animationDuration={42}
          className="relative min-h-[420px] sm:min-h-[540px]"
        />
      </div>

      {/* footer strip */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-3 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] tracking-[0.22em] text-smoke-deep uppercase">
              Every frame from <span className="text-gold-500">/public/webp</span> — list additions in{" "}
              <span className="text-gold-500">src/data/content.ts</span>
            </p>
            <p className="font-mono text-[10px] tracking-[0.22em] text-smoke-deep uppercase">
              Orbit ✦ VengeanceUI
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}