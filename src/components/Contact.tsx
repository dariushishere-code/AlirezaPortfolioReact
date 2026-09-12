import { memo, useMemo, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { identity, socials } from "../data/content";
import { useClock } from "../lib/hooks";
import { ArrowUpRight, Reveal } from "./ui";
import { GooeyTextReveal } from "./ui/gooey-text-reveal";
import SocialFlipButton, { type SocialItem } from "./ui/social-flip-button";

/* Isolated clock — keeps the per-second re-render out of the parent */
const ClockView = memo(function ClockView() {
  const time = useClock();
  return (
    <div className="flex items-center gap-2.5">
      <span className="anim-pulse-dot h-2 w-2 rounded-full bg-gold-400" />
      <span className="font-display text-xl font-bold text-bone tabular-nums">{time}</span>
    </div>
  );
});

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const social = useMemo(() => {
    const find = (kind: "x" | "linkedin" | "github") =>
      socials.find((s) => s.kind === kind)?.url ?? "#";
    return {
      github: find("github"),
      x: find("x"),
      linkedin: find("linkedin"),
      mail: `mailto:${identity.email}?subject=${encodeURIComponent("Hello — via your portfolio")}`,
    };
  }, []);

  /* C-O-N-T-A-C-T spells itself out; hover flips every tile to its platform icon. */
  const items: SocialItem[] = useMemo(
    () => [
      { letter: "C", icon: <FaGithub />, label: "GitHub", href: social.github },
      { letter: "O", icon: <FaTwitter />, label: "X / Twitter", href: social.x },
      { letter: "N", icon: <FaLinkedin />, label: "LinkedIn", href: social.linkedin },
      { letter: "T", icon: <FaEnvelope />, label: "Email", href: social.mail },
      { letter: "A", icon: <FaGithub />, label: "GitHub", href: social.github },
      { letter: "C", icon: <FaTwitter />, label: "X / Twitter", href: social.x },
      { letter: "T", icon: <FaLinkedin />, label: "LinkedIn", href: social.linkedin },
    ],
    [social]
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-baseline justify-center gap-4 font-mono text-[11px] tracking-[0.25em] text-smoke uppercase">
            <span className="text-gold-400">05</span>
            <span className="h-px w-16 bg-bone/15" aria-hidden />
            <span className="normal-case tracking-[0.2em] text-smoke-deep">連絡 — contact</span>
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <GooeyTextReveal
            mode="scroll"
            duration={1.2}
            stagger={0.09}
            blurAmount={0.35}
            className="mx-auto max-w-4xl"
          >
            <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-bone sm:text-7xl lg:text-8xl">
              Let's build something sharp.
            </h2>
          </GooeyTextReveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl font-mono text-xs leading-relaxed tracking-[0.08em] text-smoke">
              {identity.status} — open to collaborations, remote full-time roles and thoughtful side projects.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <SocialFlipButton items={items} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={social.mail}
                className="inline-flex items-center gap-2 border hairline px-5 py-3 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:border-gold-400/70 hover:text-gold-300"
              >
                <FaEnvelope className="text-sm" />
                {identity.email}
              </a>
              <button
                onClick={copyEmail}
                aria-live="polite"
                className={`border px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  copied
                    ? "border-gold-400 bg-gold-400 text-ink-950"
                    : "hairline text-smoke hover:border-gold-400/70 hover:text-gold-300"
                }`}
              >
                {copied ? "Copied ✦" : "Copy address"}
              </button>
              <a
                href={identity.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border hairline px-5 py-3 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:border-gold-400/70 hover:text-gold-300"
              >
                Resume
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.2em] text-smoke-deep uppercase">
              <ClockView />
              <span aria-hidden className="text-gold-700">
                ✦
              </span>
              <span>{identity.location}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}