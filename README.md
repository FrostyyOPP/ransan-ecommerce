# RanSan — Streetwear Ecommerce (MERN)

Learning-project MERN ecommerce. 9 screens, role-based auth, multi-currency, admin dashboard.

## Stack
- **Frontend:** Vite + React 18 + Tailwind 3 + React Router + Axios
- **Backend:** Express + Mongoose + JWT + bcrypt
- **Database:** MongoDB (local via `brew services`, Atlas in production)
- **Payments:** Stripe (mocked until a key is added)

## Run locally
Prerequisites: Node 20+ (via nvm), MongoDB running.

```bash
# 1. server
cd server
cp .env.example .env
npm install
npm run seed    # seeds 4 categories, 16 products, admin/demo users
npm run dev     # → http://localhost:4000

# 2. client (new terminal)
cd client
cp .env.example .env        # VITE_API_URL defaults to localhost:4000
npm install
npm run dev     # → http://localhost:5173
```

Test accounts (pre-seeded):
- `admin@ransan.com / admin123` — admin (can access `/admin`)
- `demo@ransan.com / demo123` — user

---

## Deploy (free stack: Atlas + Render + Vercel)

All three services have free tiers. Total monthly cost: $0.

### 1. MongoDB Atlas (database)
1. Sign up at https://cloud.mongodb.com
2. Create a **free M0 cluster** (any region — pick one close to you)
3. **Database Access** → Add user (remember the password)
4. **Network Access** → Add IP → `0.0.0.0/0` (allow from anywhere; fine for a learning project)
5. **Connect** → Drivers → copy the connection string, e.g. `mongodb+srv://<user>:<pw>@cluster0.xxxxx.mongodb.net/ransan`
6. Replace `<pw>` with your real password, keep `/ransan` at the end as the DB name

### 2. Render (backend API)
1. Sign up at https://render.com (can use GitHub login)
2. **New +** → **Web Service** → connect this GitHub repo
3. Render detects `render.yaml` — accept the config. Key settings:
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
   - Plan: Free
4. In the service's **Environment** tab, add:
   - `MONGO_URI` = the Atlas connection string from step 1
   - `CLIENT_ORIGIN` = your Vercel URL (set after step 3; wildcard `.vercel.app$` is already in `CLIENT_ORIGIN_REGEX`)
5. Deploy. First build takes ~3 min.
6. **Seed the production DB** — in the Render dashboard → Shell tab, run:
   ```
   npm run seed
   ```
7. Note your API URL: `https://ransan-api.onrender.com` (yours will differ)

> Free-tier note: Render's free web service sleeps after 15 min idle; first request after sleep takes ~30s to wake.

### 3. Vercel (frontend)
1. Sign up at https://vercel.com (use GitHub login)
2. **Add New** → **Project** → import this repo
3. Key settings:
   - **Root Directory:** `client`
   - Framework: Vite (auto-detected)
4. Environment Variables:
   - `VITE_API_URL` = `https://ransan-api.onrender.com/api` (your Render URL + `/api`)
5. Deploy. Vercel gives you a public URL like `https://ransan.vercel.app`

### 4. Lock CORS (optional but recommended)
Once you have your final Vercel URL, go back to Render → Environment and set:
- `CLIENT_ORIGIN` = `https://ransan.vercel.app`

This pins exact origin instead of the wildcard. Redeploy.

---

## Design system
- Fonts: Archivo Black (display), Space Mono (mono/labels), Inter (body)
- Palette: ink `#0A0A0A`, bone `#F2EFE8`, acid `#E8F249`, bleed `#D92D1F`, forest `#2F7D3E`

## Screens
Home · Shop (PLP) · Product (PDP) · Cart · Checkout · Order Success · Auth · Search · About · Admin

## Project structure
```
ransan/
├── server/          Express API + Mongoose models + seed
├── client/          Vite + React + Tailwind frontend
├── design/          Original hi-fi screens and tokens
├── render.yaml      Render deploy config
└── README.md        You are here
```
