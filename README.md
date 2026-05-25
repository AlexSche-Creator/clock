# BI.ROSEL Dashboard

Recreation of a corporate BI dashboard mock-up in React + Vite. Three hourglasses (left blue, center orange, right purple) sit on lit pedestals; sand falls continuously through their necks via a `<canvas>` particle system overlaid on the SVG glass.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## What's in here

- `src/App.jsx` — page layout and palette config for the three hourglasses.
- `src/components/Hourglass.jsx` — SVG bulb + neck + scale labels, with a `<canvas>` overlay running a small particle simulation (`requestAnimationFrame`). Particles spawn at the top, funnel through the neck, and despawn at the pile surface so the stream is endless.
- `src/components/StatsCard.jsx` — "ВЫРУЧКА" card with plan/fact values, progress bar.
- `src/components/TopBar.jsx`, `Footer.jsx` — page chrome.
- `src/App.css` — all of the visual styling.
