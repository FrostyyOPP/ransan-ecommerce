import { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    const t = setTimeout(() => {
      api.get('/products', { params: { q } }).then(r => setResults(r.data.items));
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <h1 className="font-display text-6xl uppercase">Search.</h1>
      <input
        autoFocus value={q} onChange={(e) => setQ(e.target.value)}
        placeholder="Try 'tee', 'acid', 'hoodie'…"
        className="w-full border-b-[3px] border-ink bg-transparent py-4 font-display text-3xl uppercase outline-none mt-6"
      />
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
        {results.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
      {q && results.length === 0 && (
        <div className="mt-10 font-mono text-sm text-muted">No results for "{q}".</div>
      )}
    </div>
  );
}
