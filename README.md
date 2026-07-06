# TestTeam

Marketing site for TestTeam — a fictional sprint-rollup product. Cross-project
rollups, one-click CSV export, and a weekly email/Slack digest.

## This is a disposable demo sandbox

This repository exists to demo GhostThread. It holds **nothing real** — no real
customers, no real data, no real users. Everything in it is safe to break, and
the whole repo can be deleted and recreated at any time.

## Stack

Vite + React + Tailwind, deployed on Vercel.

```
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

Nothing on the page loads from a CDN, font host, or image host — the font stack
is system fonts and every icon and logo is inline SVG.

## Layout

```
index.html              Vite entry
src/main.jsx            React root
src/App.jsx             page shell, tab state, section layout
src/components/         Nav, Hero, panels, LogoWall, Footer, shared UI
src/rollupCache.js      portfolio rollup aggregate cache + sprint board state
src/exportCsv.js        CSV serialisation and download
src/digest.js           weekly digest scheduling
src/projects.js         demo project table data
src/data.js             marketing copy and static content
```

## Known issues

The open issues in this repository describe real, reproducible bugs that are
present in the deployed site on purpose. Please do not close them by hand.
