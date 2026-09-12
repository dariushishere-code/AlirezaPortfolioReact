import { motion } from "framer-motion";
import { identity } from "../data/content";
import { usePrefersReducedMotion, useScramble } from "../lib/hooks";
import { ArrowRight } from "./ui";

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const first = useScramble(identity.firstName, true, 250);
  const last = useScramble(identity.lastName, true, 850);

  const fadeUp = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-10 sm:px-8"
    >
      {/* top mono strip */}
      <motion.div
        {...fadeUp(0.1)}
        className="flex w-full max-w-3xl items-center justify-between font-mono text-[11px] tracking-[0.25em] text-smoke uppercase"
      >
        <span>
          <span className="text-gold-400">00</span> · Entering
          <span className="anim-caret ml-2 inline-block h-3 w-[7px] translate-y-[2px] bg-gold-400" />
        </span>
        <span className="hidden sm:inline">{identity.location}</span>
      </motion.div>

      {/* the name — centered */}
      <div className="mt-12 w-full text-center sm:mt-14">
        <motion.p
          {...fadeUp(0.22)}
          className="mb-5 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.3em] text-gold-300 uppercase"
        >
          <span aria-hidden>✦</span>
          {identity.katakanaRole} — {identity.role}
        </motion.p>

        <h1 className="font-display font-extrabold leading-[0.86] tracking-[-0.02em]">
          <span className="block text-[clamp(2.8rem,11vw,9rem)] text-bone">
            {first || "\u00A0"}
          </span>
          <span className="text-stroke-gold block text-[clamp(2.8rem,11vw,9rem)]">
            {last || "\u00A0"}
          </span>
        </h1>

        <motion.div {...fadeUp(1.5)} className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-8">
          <p className="text-center text-base leading-relaxed text-bone-dim sm:text-lg">
            <span className="font-semibold text-bone">{identity.tagline}</span>{" "}
            {identity.taglineRest}
          </p>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-gold-400 px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-300"
            >
              View work
              <ArrowRight className="h-3.5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="link-line font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase hover:text-bone"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* bottom strip */}
      <motion.div {...fadeUp(1.75)} className="mt-16 w-full max-w-3xl sm:mt-14">
        <div className="flex items-center justify-between border-t hairline pt-5">
          <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase">
            <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-gold-400" />
            {identity.status}
          </p>
          <div className="hidden flex-col items-center gap-2 sm:flex" aria-hidden>
            <span className="font-mono text-[9px] tracking-[0.3em] text-smoke-deep uppercase">
              Scroll
            </span>
            <span className="anim-drift block h-8 w-px bg-gradient-to-b from-gold-400 to-transparent" />
          </div>
          <p className="hidden font-mono text-[10px] tracking-[0.22em] text-smoke-deep uppercase md:block">
            React — Next.js — WebGL
          </p>
        </div>
      </motion.div>
    </section>
  );
}
