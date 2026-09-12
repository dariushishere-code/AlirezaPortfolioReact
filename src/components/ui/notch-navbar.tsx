import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePrefersReducedMotion } from "@/lib/hooks"
import { identity } from "@/data/content"
import { Asterisk } from "../ui"

/* ────────────────────────────────────────────────
   NotchNavbar — curved-centre nav bar
   Props drive content; visual notch is pure CSS/SVG.
──────────────────────────────────────────────── */

export interface NotchNavItem {
  id: string
  num: string
  label: string
  to: string
}

interface NotchNavbarProps {
  leftItems: NotchNavItem[]
  rightItems: NotchNavItem[]
  activeId?: string
  progress?: number
  className?: string
}

/* Individual nav link with active-state highlight */
function NavLinkItem({ item, active }: { item: NotchNavItem; active: boolean }) {
  return (
    <Link
      to={item.to}
      className={cn(
        "group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap",
        active ? "text-gold-300" : "text-bone-dim hover:text-bone"
      )}
    >
      <span className="font-mono text-[10px] text-gold-700">{item.num}</span>
      <span>{item.label}</span>
    </Link>
  )
}

export function NotchNavbar({ leftItems, rightItems, activeId = "", progress = 0, className }: NotchNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduced = usePrefersReducedMotion()
  const { pathname } = useLocation()

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const isActive = (item: NotchNavItem) =>
    item.to.startsWith("/") && !item.to.startsWith("/#") ? pathname === item.to : activeId === item.id

  /* ---- shared SVG line style ---- */
  const lineCls = "text-bone"
  const lineOp = 0.06

  return (
    <>
      <header id="site-nav" className={cn("fixed top-0 inset-x-0 z-50 h-16 flex px-0", className)}>
        {/* Left bar */}
        <div className="flex-1 h-10 bg-ink-950/90 backdrop-blur-sm z-20 relative min-w-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
          </svg>
          <div className="absolute left-0 top-0 h-[2px] bg-gold-400 transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>

        {/* Notch container */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          <div className="w-[50px] h-full relative shrink-0">
            <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
            </svg>
          </div>

          <div className="flex-1 h-full relative min-w-0 -ml-px">
            <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
                <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
              </svg>
            </div>

            <div className="relative w-full h-full flex items-end justify-between pb-2 px-4 md:px-8">
              <nav className="hidden md:flex gap-8 mb-1 shrink-0">
                {leftItems.map((item) => (
                  <NavLinkItem key={item.id} item={item} active={isActive(item)} />
                ))}
              </nav>
              <button className="md:hidden mb-1 p-1 text-bone-dim hover:text-bone transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link to="/" className="flex justify-center shrink-0 mx-2 md:mx-4 mt-1 group" aria-label="Back to top">
                <Asterisk className="h-5 w-5 text-gold-400 transition-transform duration-500 group-hover:rotate-[60deg]" />
              </Link>
              <nav className="hidden md:flex gap-6 items-center shrink-0">
                {rightItems.map((item) => (
                  <NavLinkItem key={item.id} item={item} active={isActive(item)} />
                ))}
                <div className="flex gap-4 pl-4 border-l border-bone/10 shrink-0 items-center">
                  <Link to="/#contact" className="group inline-flex items-center gap-2 border hairline px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:border-gold-400/60 hover:text-gold-300">
                    <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-gold-400" />
                    Open to work
                  </Link>
                </div>
              </nav>
              <div className="md:hidden flex items-center gap-2 mb-1">
                <Link to="/#contact" className="inline-flex items-center gap-1.5 border hairline px-2 py-1 font-mono text-[9px] tracking-[0.15em] text-bone-dim uppercase transition-colors hover:border-gold-400/60 hover:text-gold-300">
                  <span className="anim-pulse-dot h-1 w-1 rounded-full bg-gold-400" />
                  Work
                </Link>
              </div>
            </div>
          </div>

          {/* Right slice */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
            </svg>
          </div>
        </div>

        {/* Right bar */}
        <div className="flex-1 h-10 bg-ink-950/90 backdrop-blur-sm z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={lineOp} strokeWidth={0.5} className={lineCls} />
          </svg>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ink-950/[0.985] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className="font-mono text-[11px] tracking-[0.25em] text-smoke uppercase">Menu — {identity.katakana}</span>
              <button onClick={() => setMobileOpen(false)} className="flex h-10 w-10 items-center justify-center border hairline text-bone" aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {[...leftItems, ...rightItems].map((l, i) => (
                <motion.div key={l.id} initial={reduced ? false : { opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to={l.to} onClick={() => setMobileOpen(false)} className="group flex items-baseline gap-4 border-b hairline py-4">
                    <span className="font-mono text-xs text-gold-400">{l.num}</span>
                    <span className="font-display text-4xl font-bold tracking-tight text-bone transition-colors group-hover:text-gold-300 sm:text-5xl">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="px-8 pb-10 font-mono text-[11px] tracking-[0.2em] text-smoke-deep uppercase">{identity.status} ✦ {identity.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
