# BI.ROSEL Dashboard

Light, premium executive BI dashboard mock-up. Three SVG hourglasses (blue / orange / purple) sit on lit pedestals; sand falls continuously through the neck via a CSS-animated `<line>` with `stroke-dasharray` plus a swarm of `<circle>` grains with staggered `animation-delay` — no Canvas, no WebGL.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · lucide-react.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173/clock/
npm run build    # production bundle in dist/
```

## Layout

- `src/App.tsx` — page shell + decorative background (dot patterns, orbits, soft colour blobs).
- `src/components/Header.tsx` — top bar (logo, nav, period, icons, avatar).
- `src/components/DashboardTitle.tsx` — page heading and subheading.
- `src/components/HourglassScene.tsx` — 3-column grid of `RevenueColumn`s.
- `src/components/RevenueColumn.tsx` — one hourglass + KPI card; scales the featured (centre) column up.
- `src/components/Hourglass.tsx` — the SVG: bulbs, neck, sand pile, top sand mass, animated stream, scale labels, metallic cap with neon rim, 3D pedestal.
- `src/components/KpiCard.tsx` — "ВЫРУЧКА" card with plan/fact and a Framer-Motion animated progress bar.
- `src/components/FooterStatus.tsx` — bottom info bar and refresh button.
- `src/data/segments.ts` — segment definitions, colour palettes, helpers.
- `src/index.css` — Tailwind base + the sand keyframes (`streamDash`, `particleFall`, `sandSurface`, `ringPulse`).

## Common tweaks (see inline `⬇` comments)

| Want to change | File / location |
|---|---|
| Bulb shape | `Hourglass.tsx` — `TOP_BULB` / `BOT_BULB` SVG path constants |
| Stream speed | `index.css` — `streamDash` keyframe duration on `.sand-stream` |
| Grain speed | `index.css` — `particleFall` keyframe duration on `.sand-particle` |
| Sand / neon colours | `data/segments.ts` — `palettes` object |
| Plan / Fact values | `data/segments.ts` — `segments` array |
| Featured-column scale | `RevenueColumn.tsx` — `FEATURED_SCALE` / `SIDE_SCALE` |
| Stream thickness | `Hourglass.tsx` — `strokeWidth` on the three `<line>` elements of the stream |
