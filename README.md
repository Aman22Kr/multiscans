# MultiScans

A static, multi-page demo recreation of a diagnostic-centre website (reference: https://www.uniscans.org/), rebranded **MultiScans**.
Built with Vite + React + Tailwind CSS 3, React Router (HashRouter), Lucide React and Framer Motion.

**This is a demo.** No backend, no real bookings, callbacks, uploads or payments. Prices, test lists, category tags, blog/career copy and claims are sample content.

## Quick Settings
Edit `src/config.js` (brand, phone, animation speed/intensity, storage prefix) and `tailwind.config.js` (colours, font).
Animation: speed `NORMAL`, intensity `STRONG` (respects `prefers-reduced-motion`).

## Run locally
```bash
npm install        # also creates package-lock.json (commit it)
npm run dev
npm run build && npm run preview
```

## Deploy to GitHub Pages (GitHub Actions only)
```bash
git init && git add . && git commit -m "MultiScans"
git branch -M main
git remote add origin https://github.com/Aman22kr/<repo>.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
Routing uses `HashRouter` and Vite `base: './'`, so refreshes and direct links work under any repo name without rewrites.

## localStorage
Keys are prefixed `multiscans:` (saved items, recently viewed, search history, demo booking drafts/submissions, callback number, home tab). Data lives only in your browser on one device, does not sync, and is not a user account. Don't enter real personal data in demo forms.

## Known limitations
Images are hotlinked from the reference site (with a plain fallback if they fail). Colours/spacing are approximations. Subpages beyond those listed on the home page were not individually inspected.
