import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [busy, setBusy] = useState(null);

  async function load() {
    const { data } = await api.get('/products', { params: { limit: 100, includeInactive: 'true' } });
    setProducts(data.items);
  }
  useEffect(() => { load(); }, []);

  async function toggleActive(p) {
    setBusy(p._id);
    try {
      if (p.isActive) {
        await api.delete(`/products/${p._id}`);  // soft-delete (sets isActive=false)
      } else {
        await api.patch(`/products/${p._id}`, { isActive: true });
      }
      await load();
    } finally { setBusy(null); }
  }

  return (
    <>
      <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
        <div>
          <div className="font-mono text-[11px] tracking-wider2 text-muted">ADMIN</div>
          <h1 className="font-display text-3xl md:text-5xl uppercase mt-1">Products.</h1>
          <p className="text-sm text-muted mt-2">{products.length} active products. Seed adds new ones; creating via UI is wip.</p>
        </div>
      </div>

      <div className="bg-white border border-ink overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-ink bg-[#fafaf5]">
              {['', 'NAME', 'CATEGORY', 'PRICE', 'RATING', 'STOCK', ''].map(h =>
                <th key={h} className="text-left p-3 font-mono text-[10px] tracking-wider2 text-muted">{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const totalStock = p.variants?.reduce((s, v) => s + (v.stock || 0), 0) || 0;
              return (
                <tr key={p._id} className="border-b border-gray-100">
                  <td className="p-3">
                    <img src={p.images?.[0]} alt="" className="w-12 h-16 object-cover border border-ink" />
                  </td>
                  <td className="p-3">
                    <div className="font-display uppercase">{p.name}</div>
                    <div className="font-mono text-[10px] text-muted">{p.slug}</div>
                  </td>
                  <td className="p-3 font-mono text-xs uppercase">{p.category?.name}</td>
                  <td className="p-3 font-display">₹{p.priceINR.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono text-xs">{p.rating?.toFixed(1)} ({p.reviewsCount})</td>
                  <td className="p-3 font-mono text-xs">{totalStock}</td>
                  <td className="p-3">
                    <button disabled={busy === p._id} onClick={() => toggleActive(p)}
                      className={`font-mono text-[10px] tracking-wider px-3 py-2 border border-ink ${p.isActive ? 'bg-white' : 'bg-bleed text-bone'}`}>
                      {busy === p._id ? '…' : p.isActive ? 'DEACTIVATE' : 'REACTIVATE'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
