import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function QuickSearch({ onClose }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    if (!q.trim()) { setResults([]); return; }
    setBusy(true);
    const t = setTimeout(() => {
      api.get('/products', { params: { q, limit: 6 } })
        .then(r => setResults(r.data.items))
        .finally(() => setBusy(false));
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function goFull() {
    onClose();
    nav(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/70" onClick={onClose}>
      <div className="bg-bone border-b border-ink" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex gap-3 items-center">
            <span className="font-mono text-[10px] tracking-wider2 text-muted">SEARCH</span>
            <input
              ref={inputRef}
              value={q} onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goFull()}
              placeholder="Try 'tee', 'hoodie', 'acid'…"
              className="flex-1 bg-transparent border-b border-ink font-display text-xl md:text-3xl uppercase outline-none py-2"
            />
            <button onClick={onClose} className="font-display text-2xl w-9 h-9 border border-ink">×</button>
          </div>
          {busy && <div className="font-mono text-[10px] text-muted mt-3">Searching…</div>}
          {!busy && q && results.length === 0 && (
            <div className="font-mono text-xs text-muted mt-4">No results for "{q}".</div>
          )}
          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
              {results.map(p => (
                <Link to={`/product/${p.slug}`} key={p._id} onClick={onClose}
                  className="flex items-center gap-3 border border-ink p-2 hover:bg-acid">
                  <img src={p.images?.[0]} alt="" className="w-12 h-16 object-cover border border-ink flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display text-xs md:text-sm uppercase truncate">{p.name}</div>
                    <div className="font-mono text-[10px] text-muted">₹{p.priceINR.toLocaleString('en-IN')}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {q && (
            <button onClick={goFull} className="mt-4 font-mono text-[11px] tracking-wider underline">
              SEE ALL RESULTS FOR "{q}" →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
