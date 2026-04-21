import { useEffect, useState } from 'react';
import { api } from '../../api';

const STATUSES = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
const STATUS_COLORS = {
  PAID: 'bg-forest text-bone',
  SHIPPED: 'bg-ink text-bone',
  PENDING: 'bg-bleed text-bone',
  DELIVERED: 'bg-muted text-bone',
  CANCELLED: 'bg-bone-2 text-ink',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [saving, setSaving] = useState(null);

  async function load() {
    const { data } = await api.get('/orders');
    setOrders(data);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id, status) {
    setSaving(id);
    try {
      await api.patch(`/orders/${id}/status`, { status });
      await load();
    } finally { setSaving(null); }
  }

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  return (
    <>
      <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
        <div>
          <div className="font-mono text-[11px] tracking-wider2 text-muted">ADMIN</div>
          <h1 className="font-display text-3xl md:text-5xl uppercase mt-1">Orders.</h1>
        </div>
        <div className="flex gap-1 flex-wrap">
          {['ALL', ...STATUSES].map(s =>
            <button key={s} onClick={() => setFilter(s)}
              className={`font-mono text-[10px] tracking-wider px-3 py-2 border border-ink ${filter === s ? 'bg-ink text-bone' : 'bg-white'}`}>
              {s}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-ink overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-ink bg-[#fafaf5]">
              {['ORDER', 'CUSTOMER', 'DATE', 'ITEMS', 'TOTAL', 'STATUS', ''].map(h =>
                <th key={h} className="text-left p-4 font-mono text-[10px] tracking-wider2 text-muted">{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o._id} className="border-b border-gray-100">
                <td className="p-4 font-mono font-bold">#{o.orderNo}</td>
                <td className="p-4">
                  <div>{o.user?.name}</div>
                  <div className="font-mono text-[10px] text-muted">{o.user?.email}</div>
                </td>
                <td className="p-4 font-mono text-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-4">{o.items.length}</td>
                <td className="p-4 font-display">₹{o.totalINR.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`font-mono text-[10px] tracking-wider px-2 py-1 ${STATUS_COLORS[o.status] || ''}`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    disabled={saving === o._id}
                    value={o.status}
                    onChange={(e) => setStatus(o._id, e.target.value)}
                    className="border border-ink bg-white font-mono text-[10px] tracking-wider px-2 py-1">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="p-8 text-center font-mono text-muted text-sm">No orders in {filter}.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
