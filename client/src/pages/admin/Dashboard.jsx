import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';

const STATUS_COLORS = {
  PAID: 'bg-forest text-bone',
  SHIPPED: 'bg-ink text-bone',
  PENDING: 'bg-bleed text-bone',
  DELIVERED: 'bg-muted text-bone',
  CANCELLED: 'bg-bone-2 text-ink',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/admin/stats').then(r => setStats(r.data));
    api.get('/orders').then(r => setOrders(r.data));
  }, []);

  return (
    <>
      <div className="flex justify-between items-end mb-5 md:mb-7">
        <div>
          <div className="font-mono text-[11px] tracking-wider2 text-muted">DASHBOARD</div>
          <h1 className="font-display text-3xl md:text-5xl uppercase mt-1">Morning, {user.name.split(' ')[0]}.</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="REVENUE" value={stats ? `₹${(stats.revenueINR / 1000).toFixed(1)}K` : '—'} />
        <Kpi label="PAID ORDERS" value={stats?.paidOrders ?? '—'} />
        <Kpi label="CUSTOMERS" value={stats?.visitors ?? '—'} />
        <Kpi label="ALL ORDERS" value={stats?.orders ?? '—'} />
      </div>

      {stats?.topProducts?.length > 0 && (
        <div className="bg-ink text-bone mt-4 p-6">
          <div className="font-mono text-[10px] tracking-wider2 text-acid">TOP PRODUCTS</div>
          <div className="mt-4">
            {stats.topProducts.map((p, i) => (
              <div key={i} className="grid grid-cols-[24px_1fr_auto] gap-3 py-2 border-b border-dashed border-white/20">
                <span className="font-display text-acid">{i + 1}</span>
                <span className="text-sm">{p.name}</span>
                <span className="font-mono text-xs">{p.sold}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-ink mt-4 overflow-x-auto">
        <div className="flex justify-between p-5 border-b border-ink">
          <div>
            <div className="font-mono text-[10px] tracking-wider2 text-muted">RECENT ORDERS</div>
            <div className="font-display text-xl uppercase mt-1">Needs Attention</div>
          </div>
          <Link to="/admin/orders" className="font-mono text-[11px] tracking-wider underline self-center">VIEW ALL →</Link>
        </div>
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-ink bg-[#fafaf5]">
              {['ORDER', 'CUSTOMER', 'DATE', 'ITEMS', 'TOTAL', 'STATUS'].map(h =>
                <th key={h} className="text-left p-4 font-mono text-[10px] tracking-wider2 text-muted">{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 10).map(o => (
              <tr key={o._id} className="border-b border-gray-100">
                <td className="p-4 font-mono font-bold">#{o.orderNo}</td>
                <td className="p-4">{o.user?.name}</td>
                <td className="p-4 font-mono text-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-4">{o.items.length}</td>
                <td className="p-4 font-display">₹{o.totalINR.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`font-mono text-[10px] tracking-wider px-2 py-1 ${STATUS_COLORS[o.status] || ''}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="bg-white border border-ink p-5">
      <div className="font-mono text-[10px] tracking-wider2 text-muted">{label}</div>
      <div className="font-display text-4xl mt-2">{value}</div>
    </div>
  );
}
