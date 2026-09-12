/* ============================================================
   ALL PERSONAL CONTENT LIVES HERE — edit freely.
   ============================================================ */

export const identity = {
  name: "Alireza Ebrahimi",
  firstName: "ALIREZA",
  lastName: "EBRAHIMI",
  role: "Front-End Developer",
  tagline: "Building interfaces where type does the talking.",
  taglineRest: "Precision, contrast, and deliberate space.",
  status: "Available for work · 2026",
  email: "iamalirezaebrahimii@gmail.com",
  site: "alirezaebrahimi.tech",
  resumeUrl: "/resume/AlirezaEbrahimi-Resume.pdf",
  location: "Remote · Worldwide",
  katakana: "アリレザ・エブラヒミ",
  katakanaRole: "フロントエンド開発者",
};

export const socials = [
  { label: "X / Twitter", handle: "@alirezaebdev", url: "https://x.com/alirezaebdev", kind: "x" as const },
  {
    label: "LinkedIn",
    handle: "in/alirezaebrahimi-dev",
    url: "https://www.linkedin.com/in/alirezaebrahimi-dev/",
    kind: "linkedin" as const,
  },
  {
    label: "GitHub",
    handle: "dariushishere-code",
    url: "https://github.com/dariushishere-code",
    kind: "github" as const,
  },
];

export const navLinks = [
  { id: "about", num: "01", label: "About", href: "#about" },
  { id: "work", num: "02", label: "Work", href: "#work" },
  { id: "gallery", num: "03", label: "Gallery", href: "/gallery" },
  { id: "resume", num: "04", label: "Resume", href: "#resume" },
  { id: "contact", num: "05", label: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "WebGL",
  "Three.js",
  "Tailwind CSS",
  "Framer Motion",
  "Design Systems",
  "Responsive Design",
  "Web Performance",
];

export const about = {
  headingA: "Making digital",
  headingB: "feel intentional",
  paragraphs: [
    "Dynamic front-end developer with a passion for creating seamless and engaging user experiences. Proficient in HTML, CSS, JavaScript, and modern frameworks like React — I leverage strong problem-solving skills to transform complex design concepts into responsive, interactive web applications.",
    "I believe that continuous learning, strong teamwork, and professional dedication are essential for building successful software products. Lately that means pushing further into WebGL, shader-driven motion and interfaces that feel engineered, not decorated.",
    "Let's build the future together.",
  ],
  stats: [
    { value: 1, pad: "01", label: "Years experience" },
    { value: 2, pad: "02", label: "Shipped projects" },
    { value: 5, pad: "05", label: "Design systems" },
  ],
  focus: ["HTML", "CSS", "JavaScript", "React / Next.js", "Responsive Design", "Performance"],
  nowLine: "Currently exploring — WebGL scenes, creative shaders & motion systems.",
};

/* ---------- projects ---------- */

export type ProjectArt = "aureum" | "portfolio" | "service" | "juniorpath";

export interface Project {
  index: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  art: ProjectArt;
}

export const projects: Project[] = [
  {
    index: "01",
    year: "2025",
    title: "Aureum — Gold Marketplace",
    description:
      "A Next.js + Tailwind CSS storefront concept for a gold marketplace — bars, coins, jewelry, antique pieces — wrapped in a black / gold / ivory theme.",
    tags: ["Next.js", "Tailwind CSS", "Design System"],
    url: "https://github.com/dariushishere-code/Goldmarketplace",
    art: "aureum",
  },
  {
    index: "02",
    year: "2025",
    title: "Portfolio — Alireza Ebrahimi",
    description:
      "This site: a React + Vite portfolio with a particle background, GSAP scroll motion and a photo orbit — typed, fast and deployed by hand on Netlify.",
    tags: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    url: "https://alirezaebrahimi.tech",
    art: "portfolio",
  },
  {
    index: "03",
    year: "2026",
    title: "Service UI",
    description:
      "A pixel-close recreation of a light-themed salon / barbershop Services + Order interface, built with nothing but HTML and CSS.",
    tags: ["HTML", "CSS", "Service Design"],
    url: "https://github.com/dariushishere-code/services-ui",
    art: "service",
  },
  {
    index: "04",
    year: "2026",
    title: "JuniorPath — Career Tracker",
    description:
      "A career-journey web app that maps the road from junior to senior — set milestones, track progress and keep the whole path visible at a glance.",
    tags: ["React", "Vite", "Tailwind CSS", "Netlify"],
    url: "https://juniorpath.netlify.app/",
    art: "juniorpath",
  },
];

/* ---------- gallery ----------
   The gallery lives on its own route at /gallery and renders the
   VengeanceUI CylinderCarousel. Images are served from /public/webp.
---------------------------------- */

export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { src: "/webp/Carpet.webp", alt: "Carpet" },
  { src: "/webp/Dress.webp", alt: "Dress" },
  { src: "/webp/IMG_0250.webp", alt: "IMG_0250" },
  { src: "/webp/IMG_0251.webp", alt: "IMG_0251" },
  { src: "/webp/IMG_0261.webp", alt: "IMG_0261" },
  { src: "/webp/IMG_0262.webp", alt: "IMG_0262" },
  { src: "/webp/IMG_0341.webp", alt: "IMG_0341" },
  { src: "/webp/IMG_0359.webp", alt: "IMG_0359" },
  { src: "/webp/IMG_0371.webp", alt: "IMG_0371" },
  { src: "/webp/IMG_0372.webp", alt: "IMG_0372" },
  { src: "/webp/IMG_0443.webp", alt: "IMG_0443" },
  { src: "/webp/IMG_0593.webp", alt: "IMG_0593" },
  { src: "/webp/IMG_0595.webp", alt: "IMG_0595" },
  { src: "/webp/IMG_0628.webp", alt: "IMG_0628" },
  { src: "/webp/IMG_0630.webp", alt: "IMG_0630" },
  { src: "/webp/IMG_0651.webp", alt: "IMG_0651" },
  { src: "/webp/IMG_0732.webp", alt: "IMG_0732" },
  { src: "/webp/IMG_1145.webp", alt: "IMG_1145" },
  { src: "/webp/IMG_1155.webp", alt: "IMG_1155" },
  { src: "/webp/IMG_1158.webp", alt: "IMG_1158" },
  { src: "/webp/IMG_1185.webp", alt: "IMG_1185" },
  { src: "/webp/IMG_1220.webp", alt: "IMG_1220" },
  { src: "/webp/IMG_1239.webp", alt: "IMG_1239" },
  { src: "/webp/IMG_1251.webp", alt: "IMG_1251" },
  { src: "/webp/IMG_1252.webp", alt: "IMG_1252" },
  { src: "/webp/IMG_1283.webp", alt: "IMG_1283" },
  { src: "/webp/IMG_1289.webp", alt: "IMG_1289" },
  { src: "/webp/IMG_1303.webp", alt: "IMG_1303" },
  { src: "/webp/IMG_1355.webp", alt: "IMG_1355" },
  { src: "/webp/IMG_1359.webp", alt: "IMG_1359" },
  { src: "/webp/IMG_1360.webp", alt: "IMG_1360" },
  { src: "/webp/IMG_1362.webp", alt: "IMG_1362" },
  { src: "/webp/IMG_1366.webp", alt: "IMG_1366" },
  { src: "/webp/IMG_1368.webp", alt: "IMG_1368" },
  { src: "/webp/IMG_1385.webp", alt: "IMG_1385" },
  { src: "/webp/IMG_20190314_202306_052.webp", alt: "IMG_20190314_202306_052" },
  { src: "/webp/IMG_20190319_203904_509.webp", alt: "IMG_20190319_203904_509" },
  { src: "/webp/IMG_20190324_222346_236.webp", alt: "IMG_20190324_222346_236" },
  { src: "/webp/IMG_20190403_114236_896.webp", alt: "IMG_20190403_114236_896" },
  { src: "/webp/IMG_20190403_214415_222.webp", alt: "IMG_20190403_214415_222" },
  { src: "/webp/IMG_20190404_161624_648.webp", alt: "IMG_20190404_161624_648" },
  { src: "/webp/IMG_20190405_151452_422.webp", alt: "IMG_20190405_151452_422" },
  { src: "/webp/IMG_20190407_191509_607.webp", alt: "IMG_20190407_191509_607" },
  { src: "/webp/IMG_20190411_211555_407.webp", alt: "IMG_20190411_211555_407" },
  { src: "/webp/IMG_20190502_183152_164.webp", alt: "IMG_20190502_183152_164" },
  { src: "/webp/IMG_20190506_194147_584.webp", alt: "IMG_20190506_194147_584" },
  { src: "/webp/IMG_20190507_180812_276.webp", alt: "IMG_20190507_180812_276" },
  { src: "/webp/IMG_20190508_200705_960.webp", alt: "IMG_20190508_200705_960" },
  { src: "/webp/IMG_20190530_144145_791.webp", alt: "IMG_20190530_144145_791" },
  { src: "/webp/IMG_20190629_144554_090.webp", alt: "IMG_20190629_144554_090" },
  { src: "/webp/IMG_20190709_214916_402.webp", alt: "IMG_20190709_214916_402" },
  { src: "/webp/IMG_20190710_221048_630.webp", alt: "IMG_20190710_221048_630" },
  { src: "/webp/IMG_20190721_201604_129.webp", alt: "IMG_20190721_201604_129" },
  { src: "/webp/Lady with beautiful eyes.webp", alt: "Lady with beautiful eyes" },
  { src: "/webp/LRM_EXPORT_14700023858339_20190806_214822223.webp", alt: "LRM_EXPORT_14700023858339_20190806_214822223" },
  { src: "/webp/LRM_EXPORT_14937612377363_20190806_215219812.webp", alt: "LRM_EXPORT_14937612377363_20190806_215219812" },
  { src: "/webp/LRM_EXPORT_34914323241126_20190805_213949262.webp", alt: "LRM_EXPORT_34914323241126_20190805_213949262" },
  { src: "/webp/LRM_EXPORT_35143776676976_20190805_214338716.webp", alt: "LRM_EXPORT_35143776676976_20190805_214338716" },
  { src: "/webp/LRM_EXPORT_48673052026106_20190801_230048648.webp", alt: "LRM_EXPORT_48673052026106_20190801_230048648" },
  { src: "/webp/LRM_EXPORT_51001152038083_20190801_233936748.webp", alt: "LRM_EXPORT_51001152038083_20190801_233936748" },
  { src: "/webp/LRM_EXPORT_51265916921836_20190801_234401513.webp", alt: "LRM_EXPORT_51265916921836_20190801_234401513" },
  { src: "/webp/The CHAIR.webp", alt: "The CHAIR" },
];

/* ---------- resume ---------- */

export const resume = {
  intro:
    "Front-end developer focused on the intersection of typography, motion and engineering. I ship accessible, fast interfaces and treat every pixel as a decision.",
  experience: [
    {
      period: "2025 — Present",
      role: "Front-End Developer",
      org: "Freelance · Remote",
      points: [
        "Design and ship responsive marketing sites, storefronts and interactive interfaces end-to-end.",
        "Translate design systems into reusable, documented component libraries with React & Next.js.",
        "Chase performance budgets: static generation, image pipelines and Core Web Vitals in the green.",
      ],
    },
    {
      period: "2024 — 2025",
      role: "UI Engineer",
      org: "Contract projects",
      points: [
        "Built pixel-close interfaces from Figma specs across salon booking, e-commerce and music tooling.",
        "Integrated REST APIs (incl. Spotify Web API) with Node.js / Express backends.",
        "Introduced browser-based admin tooling so non-technical owners can publish without code.",
      ],
    },
  ],
  education: [
    {
      period: "Ongoing",
      title: "Self-directed front-end engineering",
      detail: "React ecosystem, design systems, WebGL & creative code — continuous, project-driven learning.",
    },
  ],
  coreSkills: [
    { name: "HTML / Semantic markup", level: 95 },
    { name: "CSS / Modern layout", level: 92 },
    { name: "JavaScript (ES2023)", level: 88 },
    { name: "React / Next.js", level: 85 },
    { name: "TypeScript", level: 78 },
  ],
  toolbox: [
    "Tailwind CSS",
    "Three.js / WebGL",
    "Framer Motion",
    "Node.js / Express",
    "REST APIs",
    "Git / GitHub",
    "Figma",
    "Netlify",
    "SEO / A11y",
  ],
  languages: [
    { name: "Persian", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};
