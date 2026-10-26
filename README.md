# Mary Magdy Geady — portfolio

A dark, console-style portfolio: a live neural-mesh background, a cinematic hero photo brought to life with layered animation (glowing monitors with code typing in, steam from the mug, twinkling city lights, pointer parallax), glass cards that tilt and light up under the pointer, and a skills toolbox of logo tiles beside a spinning globe orbited by the tools used most.

It also carries a live **tag parser**: a small grammar engine where an equipment-tag format is data, not code. Switch client and the same engine reads a different format.

All motion stops for visitors who prefer reduced motion, and the content stays readable without JavaScript.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # tag grammar unit tests (Node's built-in runner)
npm run typecheck
npm run build      # static export to ./out
```

## Edit the content

Everything a visitor reads is in [`src/content.ts`](src/content.ts): profile, roles, stats, pillars, case studies, projects, skills and experience. Tag formats live in [`src/lib/tagGrammar.ts`](src/lib/tagGrammar.ts); add a grammar object to support a new format.

## Deploy

`npm run build` produces a fully static site in `out/`. On Vercel, import the repo and keep the defaults; it also works on GitHub Pages or Netlify.
