import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee, { TechMarqueeRow } from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GalleryPage from "./pages/GalleryPage";
import Preloader from "./components/Preloader";
import { CustomCursor, NoiseOverlay } from "./components/Chrome";
import ParticleDrift from "./components/ui/particle-drift";
import { marqueeItems } from "./data/content";

const displayWords = ["Alireza Ebrahimi", "✦", "Front-End Developer", "✦", "WebGL & Motion", "✦", "写真アーカイブ"];

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // wait one frame so the target section is painted after route mount
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo(0, 0);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />

      <Marquee duration={26} className="mt-4">
        <TechMarqueeRow items={marqueeItems} />
      </Marquee>

      <About />
      <Projects />

      {/* big display marquee — the signature divider */}
      <Marquee reverse duration={36}>
        {displayWords.map((w, i) =>
          w === "✦" ? (
            <span key={i} className="px-6 font-display text-3xl text-gold-500 md:text-5xl" aria-hidden>
              ✦
            </span>
          ) : (
            <span
              key={i}
              className={`px-6 font-display text-3xl font-extrabold tracking-tight uppercase md:text-5xl ${
                i % 4 === 0 ? "text-bone" : "text-stroke"
              }`}
            >
              {w}
            </span>
          )
        )}
      </Marquee>

      <Resume />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-bone antialiased">
        {/* full-viewport particle-drift background — the dark Zenith canvas, exactly as designed */}
        <div aria-hidden className="fixed inset-0 -z-10">
          <ParticleDrift
            mode="dark"
            speed={1}
            density={1}
            length={1}
            opacity={0.9}
            className="h-full w-full"
          />
        </div>

        <Preloader />
        <NoiseOverlay />
        <CustomCursor />
        <Nav />
        <ScrollToTop />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}