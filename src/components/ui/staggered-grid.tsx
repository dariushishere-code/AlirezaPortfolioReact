import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────
   StaggeredGrid — scroll-animated collage
   Big display text + staggered grid of images/cards.
──────────────────────────────────────────────── */

export interface StaggeredGridItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export interface StaggeredGridProps {
  items?: StaggeredGridItem[];
  centerText?: string;
  images?: string[];
  className?: string;
}

const GRID_HEIGHTS = [
  "h-[150px] md:h-[210px]",
  "h-[190px] md:h-[270px]",
  "h-[160px] md:h-[230px]",
  "h-[210px] md:h-[290px]",
  "h-[140px] md:h-[200px]",
  "h-[180px] md:h-[250px]",
];

export function StaggeredGrid({ items = [], centerText = "LET'S TALK", images = [], className }: StaggeredGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      /* animate the centre text — chars roll up from below */
      if (textRef.current) {
        const chars = textRef.current.querySelectorAll<HTMLElement>(".sc-char");
        gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 92%",
            end: "center center",
            scrub: 1,
          },
        }).from(chars, {
          yPercent: 220,
          autoAlpha: 0,
          stagger: { each: 0.04, from: "center" },
          ease: "sine.out",
        });
      }

      /* stagger the grid — outer columns faster than centre */
      const root = containerRef.current;
      const tiles = root ? root.querySelectorAll<HTMLElement>(".si") : [];
      if (root && tiles.length) {
        gsap.from(tiles, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1.2,
          },
          yPercent: 70,
          autoAlpha: 0,
          stagger: { each: 0.055, from: "center" },
          ease: "sine.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []); // mount-only — layout is fixed-height so no re-trigger needed

  const chars = useMemo(
    () =>
      centerText.split("").map((ch, i) => (
        <span key={i} className="sc-char inline-block" style={{ willChange: "transform" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      )),
    [centerText]
  );

  /* Build mixed grid: gallery images + a centred card group */
  const gridChildren = useMemo(() => {
    const total = 21;
    const groupSlot = 15; // centre-ish, third row
    const out: React.ReactNode[] = [];
    let img = 0;

    for (let i = 0; i < total; i++) {
      if (i === groupSlot && items.length > 0) {
        out.push(
          <div key="group" className="si col-span-2 row-span-2 relative z-10">
            <div className="grid h-full grid-cols-1 gap-1.5 sm:grid-cols-2 md:gap-2">
              {items.map((item, j) => (
                <div
                  key={j}
                  className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border hairline bg-ink-850/90 p-4 backdrop-blur-md transition-colors duration-300 hover:border-gold-400/30 sm:p-5"
                >
                  <span className="font-mono text-[9px] tracking-[0.25em] text-gold-400 uppercase">0{j + 1}</span>
                  <h3 className="font-display text-sm font-bold tracking-tight text-bone md:text-base">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-smoke">{item.description}</p>
                  {item.content ? <div className="mt-auto pt-2">{item.content}</div> : null}
                </div>
              ))}
            </div>
          </div>
        );
        i += 1;
        continue;
      }

      if (images.length > 0) {
        const src = images[img % images.length];
        img += 1;
        out.push(
          <figure
            key={`img-${i}`}
            className={cn("si group relative overflow-hidden rounded-xl border hairline", GRID_HEIGHTS[i % GRID_HEIGHTS.length])}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/10 to-ink-950/50 opacity-70 transition-opacity duration-500 group-hover:opacity-30" />
          </figure>
        );
      }
    }
    return out;
  }, [items, images]);

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      {/* display text */}
      <section className="relative grid w-full place-items-center overflow-hidden py-12 md:py-20">
        <div
          ref={textRef}
          className="font-display font-extrabold uppercase leading-[0.7] tracking-tight text-stroke text-bone text-[clamp(2.5rem,13vw,9.5rem)]"
        >
          {chars}
        </div>
      </section>

      {/* collage grid */}
      <div className="grid w-full grid-cols-3 gap-1.5 md:grid-cols-5 md:gap-2 lg:grid-cols-7">{gridChildren}</div>
    </div>
  );
}

export default StaggeredGrid;