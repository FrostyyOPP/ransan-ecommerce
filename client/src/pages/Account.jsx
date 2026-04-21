import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import BigBtn from '../components/BigBtn';

const STATUS_COLORS = {
  PAID: 'bg-forest text-bone',
  SHIPPED: 'bg-ink text-bone',
  PENDING: 'bg-bleed text-bone',
  DELIVERED: 'bg-muted text-bone',
  CANCELLED: 'bg-bone-2 text-ink',
};

export default function Account() {
  const { user, loading, logout } = useAuth();
  const { format } = useCurrency();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (!user) return;
    api.get('/orders/mine').then(r => setOrders(r.data)).catch(() => setOrders([]));
  }, [user]);

  if (loading) return <div className="p-10 font-mono">Loading…</div>;
  if (!user) return <Navigate to="/auth?next=/account" />;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <div className="font-mono text-[10px] md:text-[11px] tracking-wider2 text-muted">ACCOUNT</div>
          <h1 className="font-display text-4xl md:text-6xl uppercase mt-1">Hello, {user.name.split(' ')[0]}.</h1>
          <div className="font-mono text-xs text-muted mt-2">{user.email} · {user.role.toUpperCase()}</div>
        </div>
        <button onClick={logout} className="font-mono text-[11px] tracking-wider underline">LOGOUT</button>
      </div>

      <section className="mt-10">
        <div className="font-mono text-[10px] md:text-[11px] tracking-wider2 text-muted">YOUR ORDERS</div>
        <h2 className="font-display text-2xl md:text-3xl uppercase mt-1 mb-4">History.</h2>
        {orders === null && <div className="font-mono text-sm">Loading…</div>}
        {orders?.length === 0 && (
          <div className="border border-ink p-8 text-center">
            <p className="text-muted">You haven't placed an order yet.</p>
            <Link to="/shop" className="inline-block mt-4"><BigBtn variant="acid">SHOP DROP 04 →</BigBtn></Link>
          </div>
        )}
        <div className="space-y-3">
          {orders?.map(o => (
            <div key={o._id} className="border border-ink p-4 md:p-5 grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] items-center gap-3 md:gap-5">
              <div>
                <div className="font-display text-lg">#{o.orderNo}</div>
                <div className="font-mono text-[10px] text-muted">{new Date(o.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {o.items.slice(0, 4).map((i, idx) =>
                  <img key={idx} src={i.image} alt="" className="w-12 h-16 object-cover border border-ink flex-shrink-0" />
                )}
                <span className="font-mono text-[10px] text-muted self-center">{o.items.length} item{o.items.length > 1 ? 's' : ''}</span>
              </div>
              <span className={`font-mono text-[10px] tracking-wider px-2 py-1 self-start md:self-auto w-fit ${STATUS_COLORS[o.status] || ''}`}>
                {o.status}
              </span>
              <div className="font-display text-base md:text-lg">{format(o.totalINR)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
