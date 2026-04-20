import { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000/api' });

export default function App() {
  const [health, setHealth] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api.get('/health')
      .then((r) => setHealth(r.data))
      .catch((e) => setErr(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-bone text-ink font-body">
      {/* top bar */}
      <header className="border-b border-ink">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display text-2xl tracking-tightish">RANSAN®</div>
          <nav className="font-mono text-[11px] tracking-wider2 flex gap-8">
            <a href="#">SHOP</a><a href="#">DROPS</a><a href="#">ABOUT</a><a href="#">CART (0)</a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="font-mono text-[11px] tracking-wider2 text-muted">
          DROP 04 · S/S '26 · MUMBAI
        </div>
        <h1 className="font-display uppercase leading-[0.9] tracking-tightish text-[clamp(72px,12vw,180px)] mt-3">
          NOT FOR<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #0A0A0A' }}>
            EVERYONE.
          </span>
        </h1>

        <div className="h-px bg-ink my-12" />

        {/* stack check */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink border border-ink">
          <Card label="FRONTEND" value="VITE + REACT + TAILWIND" tone="bone" />
          <Card label="BACKEND" value={health ? 'API ONLINE' : err ? 'API OFFLINE' : 'CHECKING…'} tone={health ? 'acid' : err ? 'bleed' : 'bone'} />
          <Card label="CURRENCIES" value={health?.supportedCurrencies?.join(' · ') || '—'} tone="bone" />
        </div>

        {err && (
          <p className="mt-6 font-mono text-xs text-bleed">
            Server unreachable at http://localhost:4000/api/health — is the server running?
          </p>
        )}
      </section>

      <footer className="border-t border-ink">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between font-mono text-[10px] tracking-wider2 text-muted">
          <span>RANSAN® / LEARNING BUILD / V0.1</span>
          <span>N 19°04' · E 72°52' · MUMBAI</span>
        </div>
      </footer>
    </div>
  );
}

function Card({ label, value, tone }) {
  const bg = tone === 'acid' ? 'bg-acid' : tone === 'bleed' ? 'bg-bleed text-bone' : 'bg-bone';
  return (
    <div className={`${bg} p-8`}>
      <div className="font-mono text-[10px] tracking-wider2 text-muted">{label}</div>
      <div className="font-display text-2xl mt-2 uppercase tracking-tightish">{value}</div>
    </div>
  );
}
