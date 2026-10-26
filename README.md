# Mary Magdy Geady — portfolio

A dark, console-style portfolio: a live neural-mesh background, a cinematic hero photo brought to life with layered animation (glowing monitors with code typing in, steam from the mug, twinkling city lights, pointer parallax), glass cards that tilt and light up under the pointer, and a skills toolbox of logo tiles beside a spinning globe orbited by the tools used most.

The repo also keeps a small **tag grammar engine** in `src/lib`, where an equipment-tag format is data, not code, with its own tests.

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

Everything a visitor reads is in [`src/content.ts`](src/content.ts): profile, roles, stats, pillars, projects, skills and experience.

## Contact form

The "Write to me" form delivers messages to marry.magdy92@gmail.com through [Web3Forms](https://web3forms.com), which is free and needs no server:

1. On web3forms.com, enter `marry.magdy92@gmail.com` to get an access key. It arrives by email.
2. Locally: copy `.env.example` to `.env.local`, paste the key after `NEXT_PUBLIC_WEB3FORMS_KEY=`, then restart `npm run dev`.
3. On Vercel: add `NEXT_PUBLIC_WEB3FORMS_KEY` under Project Settings, Environment Variables, then redeploy.

The key is public by design, since it can only deliver to that one inbox. Without a key, the form opens the visitor's own email app instead.

## Deploy

`npm run build` produces a fully static site in `out/`. On Vercel, import the repo and keep the defaults; it also works on GitHub Pages or Netlify.
