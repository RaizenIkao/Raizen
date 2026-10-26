# RISHI

RISHI is a local-first demo trading card game experience built with React + TypeScript + Vite.

## Features

- Local mode with browser persistence
- Dashboard, collection, boosters, decks, battles, market, community, rankings, profiles
- Responsive layout for desktop and mobile
- GitHub Pages friendly routing with base path configured for this repository
- Booster probability system with visible weights

## Commands

```bash
npm install
npm run dev
npm run build
npm run test
```

## GitHub Pages

The app is configured with `base: '/Raizen/'` and includes a `public/404.html` fallback for SPA routing.

## Local mode

The app uses `localStorage` for a demo profile and progress. This is not production backend data.

## Supabase setup

Add your public Supabase values in `.env.local` using the example file and enable a real backend later.
