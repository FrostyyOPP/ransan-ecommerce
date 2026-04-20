# RanSan — Streetwear Ecommerce (MERN learning project)

Local-dev-only sample project. Built on MongoDB + Express + React + Node.

## Structure
- `server/` — Express API, Mongoose models, JWT auth, Stripe
- `client/` — React + Vite + Tailwind frontend
- `design/` — wireframes, hi-fi screens, design tokens (source of truth)
- `docs/` — architecture notes, API contracts

## Run locally
```
# server
cd server && npm install && npm run dev

# client (separate terminal)
cd client && npm install && npm run dev
```

Services that must be running: MongoDB, Redis (both via `brew services`).

## Design system
- Fonts: Archivo Black (display), Space Mono (mono/labels), Inter (body)
- Palette: ink `#0A0A0A`, bone `#F2EFE8`, acid `#E8F249`, bleed `#D92D1F`, green `#2F7D3E`

## Screens (9)
Home · Shop (PLP) · Product (PDP) · Cart · Checkout · Auth · Search · About · Admin
