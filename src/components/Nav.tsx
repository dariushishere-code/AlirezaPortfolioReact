import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navLinks } from "../data/content";
import { NotchNavbar, type NotchNavItem } from "./ui/notch-navbar";

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const toItem = (l: (typeof navLinks)[number]): NotchNavItem => ({
    id: l.id,
    num: l.num,
    label: l.label,
    to: l.href.startsWith("/") ? l.href : `/#${l.id}`,
  });

  /* left: Home-ward anchors · right: closing anchors + CTA */
  const leftItems = navLinks.filter((l) => ["about", "work", "gallery"].includes(l.id)).map(toItem);
  const rightItems = navLinks.filter((l) => ["resume", "contact"].includes(l.id)).map(toItem);

  return <NotchNavbar leftItems={leftItems} rightItems={rightItems} activeId={active} progress={progress} />;
}