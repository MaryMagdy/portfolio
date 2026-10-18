# Mary Magdy Geady — portfolio

Personal portfolio, designed as a set of engineering drawing sheets: each section has a frame, zone references and a title block, and red-line markup is used for the one thing that matters on each sheet.

The cover sheet carries a live **tag parser**: a small grammar engine where an equipment-tag format is data, not code. Switch client and the same engine reads a different format.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # tag grammar unit tests (Node's built-in runner)
npm run typecheck
npm run build      # static export to ./out
```

## Edit the content

Everything a visitor reads is in [`src/content.ts`](src/content.ts): profile, notes, projects, experience and skills. Tag formats live in [`src/lib/tagGrammar.ts`](src/lib/tagGrammar.ts); add a grammar object to support a new format.

## Deploy

`npm run build` produces a fully static site in `out/`. On Vercel, import the repo and keep the defaults; it also works on GitHub Pages or Netlify.
