import { projects, socials } from "../data/content";
import { ArrowUpRight, Reveal, SectionHeading } from "./ui";
import { AgentBentoGrid, type AgentBentoGridCard } from "./ui/agent-bento-grid";

/* Per-project cover art */

function AureumVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0e0b07] p-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/70">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 font-display text-sm font-bold text-gold-300">
          Au
        </div>
      </div>
      <p className="font-display text-[11px] font-bold tracking-[0.42em] text-gold-300 uppercase">Aureum</p>
      <p className="font-mono text-[8px] tracking-[0.3em] text-gold-700 uppercase">Gold · Marketplace</p>
    </div>
  );
}

function PortfolioVisual() {
  return (
    <div className="flex h-full w-full flex-col bg-[#e6e1d3] p-3">
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-900/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-900/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-900/20" />
      </div>
      <div className="mt-3 h-2 w-3/4 bg-ink-900" />
      <div className="mt-1.5 h-1 w-1/2 bg-ink-900/40" />
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        <div className="h-8 bg-ink-900/85" />
        <div className="h-8 bg-ink-900/25" />
        <div className="h-8 bg-ink-900/55" />
      </div>
      <p className="mt-auto font-mono text-[7px] tracking-[0.3em] text-ink-900/60 uppercase">React · Vite · Netlify</p>
    </div>
  );
}

function ServiceVisual() {
  return (
    <div className="flex h-full w-full flex-col bg-[#eef0f2] p-3">
      <p className="font-display text-[10px] font-bold tracking-[0.3em] text-ink-900 uppercase">Services</p>
      <div className="mt-2 space-y-2">
        {[86, 64, 74].map((w, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="h-1 bg-ink-900/70" style={{ width: `${w}%` }} />
            <span className="font-mono text-[8px] text-ink-900/50">${(i + 1) * 15}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex gap-1.5">
        <span className="bg-ink-900 px-2 py-1 font-mono text-[7px] tracking-[0.2em] text-[#eef0f2] uppercase">Book</span>
        <span className="border border-ink-900/50 px-2 py-1 font-mono text-[7px] tracking-[0.2em] text-ink-900 uppercase">Order</span>
      </div>
    </div>
  );
}

function JuniorPathVisual() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-[#0b1220] p-4">
      {/* nebula */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 28% 28%, rgba(96,165,250,0.28), transparent 70%), radial-gradient(55% 55% at 72% 72%, rgba(228,172,82,0.22), transparent 70%)",
        }}
      />
      {/* winding career path */}
      <svg viewBox="0 0 200 200" className="relative h-full w-full" aria-hidden>
        <path
          d="M14 186 C64 158, 36 116, 92 96 S168 60, 138 18"
          fill="none"
          stroke="rgba(240,198,120,0.6)"
          strokeWidth="2.5"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
        <circle cx="14" cy="186" r="5" fill="#60a5fa" />
        <circle cx="92" cy="96" r="5" fill="#e4ac52" />
        <circle cx="138" cy="18" r="6.5" fill="#f7dda4" />
        <path d="M138 10 l16 -8 -3 19 z" fill="#f7dda4" />
      </svg>
      <p className="relative font-mono text-[8px] tracking-[0.3em] text-sky-300/90 uppercase">JuniorPath · Career tracking</p>
    </div>
  );
}

function MoreVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink-850 p-4">
      <ArrowUpRight className="h-6 w-6 text-smoke-deep" />
      <p className="font-mono text-[9px] tracking-[0.25em] text-smoke-deep uppercase">View more</p>
    </div>
  );
}

const VISUALS: Record<string, React.FC> = {
  aureum: AureumVisual,
  portfolio: PortfolioVisual,
  service: ServiceVisual,
  juniorpath: JuniorPathVisual,
};

export default function Projects() {
  const github = socials.find((s) => s.kind === "github");

  const cards: AgentBentoGridCard[] = [
    ...projects.map((p, i) => {
      const Vis = VISUALS[p.art] ?? PortfolioVisual;
      return {
        title: p.title,
        description: p.description,
        colSpan: i === 3 ? "lg:col-span-2" : "lg:col-span-1",
        height: "h-[260px]",
        visual: (
          <a href={p.url} target="_blank" rel="noreferrer" className="block h-full">
            <Vis />
          </a>
        ),
      };
    }),
    {
      title: "More in the lab",
      description: "Open-source experiments and explorations.",
      colSpan: "lg:col-span-1",
      height: "h-[260px]",
      visual: (
        <a href={github?.url} target="_blank" rel="noreferrer" className="block h-full">
          <MoreVisual />
        </a>
      ),
    },
  ];

  return (
    <section id="work" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          jp="作品 — selected work"
          title={
            <>
              Built &<span className="text-stroke block">shipped</span>
            </>
          }
          note="Storefronts, tooling and pixel-close UI. Each card opens the live project — source lives in the lab."
        />
        <Reveal>
          <AgentBentoGrid items={cards} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[0.22em] text-smoke-deep uppercase">
              04 projects — two live on Netlify
            </p>
            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border hairline px-5 py-3 font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase transition-colors hover:border-gold-400/70 hover:text-gold-300"
              >
                All repositories
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}