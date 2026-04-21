import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 font-mono">Loading…</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;

  const nav = [
    ['/admin', 'Dashboard', '▦'],
    ['/admin/orders', 'Orders', '◫'],
    ['/admin/products', 'Products', '◧'],
    ['/admin/customers', 'Customers', '◉'],
  ];

  const link = ({ isActive }) =>
    `flex items-center gap-2 md:gap-3 px-3 py-2 whitespace-nowrap ${isActive ? 'bg-acid text-ink' : 'text-bone hover:bg-white/10'}`;

  return (
    <div className="md:grid md:grid-cols-[240px_1fr] bg-[#f5f5f4] min-h-screen">
      <aside className="bg-ink text-bone p-4 md:p-6 md:sticky md:top-0 md:h-screen">
        <div className="font-display text-xl">RANSAN®</div>
        <div className="font-mono text-[10px] tracking-wider2 text-acid mt-1">/ADMIN</div>
        <nav className="mt-4 md:mt-8 flex md:flex-col gap-1 md:space-y-1 font-mono text-xs tracking-wider overflow-x-auto">
          {nav.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/admin'} className={link}>
              <span>{icon}</span><span className="flex-1">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
