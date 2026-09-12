import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../lib/hooks";
import { KineticTextLoader } from "./ui/kinetic-text-loader";

/* Full-screen intro splash — kinetic "LOADING" wordmark, then slides away. */
export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setDone(true), reduced ? 450 : 2300);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = done ? prev : "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink-950"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
          transition={{ duration: reduced ? 0.2 : 0.7, ease: [0.83, 0, 0.17, 1] }}
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <KineticTextLoader text="LOADING" />

          <div className="mt-12 flex flex-col items-center gap-2 font-mono uppercase">
            <p className="text-[10px] tracking-[0.35em] text-gold-400">
              Alireza Ebrahimi ✦ Portfolio
            </p>
            <p className="text-[9px] tracking-[0.3em] text-smoke-deep">
              Calibrating pixels · loading modules
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}