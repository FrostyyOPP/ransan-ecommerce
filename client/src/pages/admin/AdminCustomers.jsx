import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminCustomers() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    api.get('/users').then(r => setUsers(r.data));
  }, []);

  const filtered = users.filter(u =>
    !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
        <div>
          <div className="font-mono text-[11px] tracking-wider2 text-muted">ADMIN</div>
          <h1 className="font-display text-3xl md:text-5xl uppercase mt-1">Customers.</h1>
          <p className="text-sm text-muted mt-2">{users.length} total users.</p>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email…"
          className="border border-ink bg-white px-3 py-2 text-sm w-full md:w-64 outline-none" />
      </div>

      <div className="bg-white border border-ink overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-ink bg-[#fafaf5]">
              {['NAME', 'EMAIL', 'ROLE', 'JOINED', 'ORDERS', 'SPENT'].map(h =>
                <th key={h} className="text-left p-4 font-mono text-[10px] tracking-wider2 text-muted">{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u._id} className="border-b border-gray-100">
                <td className="p-4 font-display">{u.name}</td>
                <td className="p-4 font-mono text-xs">{u.email}</td>
                <td className="p-4">
                  <span className={`font-mono text-[10px] tracking-wider px-2 py-1 ${u.role === 'admin' ? 'bg-acid text-ink' : 'bg-bone-2'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 font-mono text-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-mono">{u.orderCount}</td>
                <td className="p-4 font-display">₹{u.totalSpent.toLocaleString('en-IN')}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center font-mono text-muted text-sm">No customers match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
