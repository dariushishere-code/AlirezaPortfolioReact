# Alireza Ebrahimi — Portfolio

Dark, motion-heavy portfolio for a front-end developer & photographer.

**Stack:** React 18 · Vite 6 · TypeScript · Tailwind CSS v4 · Three.js / react-three-fiber · Framer Motion · React Router

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server → http://localhost:5173 (strict port) |
| `npm run build` | Production build → `/dist` |
| `npm run preview` | Build + serve production build → http://localhost:4173 |
| `npm run typecheck` | Type-check (`tsc --noEmit`) |

> The workspace root has forwarding scripts too — `npm run preview` from the folder above
> works identically.

## Routes

- `/` — Home (Hero, About, Work, Resume, Contact + WebGL scene)
- `/gallery` — Photography archive with the VengeanceUI cylinder carousel

SPA fallback for `/gallery` is handled by `public/_redirects` (and `netlify.toml` for Netlify deploys).

## Structure

```
src/
  App.tsx                        # routes + hash-aware scroll restoration
  components/                    # Nav, Hero, About, Projects, Resume, Contact, Footer, Scene, ui/
  components/ui/cylinder-carousel.tsx  # VengeanceUI "cylinder" carousel
  data/content.ts                # nav links, gallery images, projects, socials
  pages/GalleryPage.tsx          # /gallery route
public/
  webp/                          # gallery images (add yours here, then list in content.ts)
  resume/                        # downloadable resume PDF
```

## Deploy

- **Netlify:** connect the repo — `netlify.toml` runs `npm run build` and publishes `dist`.
- **Manual:** drag & drop the `/dist` folder onto Netlify, or `npx netlify deploy --dir=dist --prod`.
