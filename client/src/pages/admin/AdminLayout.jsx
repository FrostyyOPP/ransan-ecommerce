import { NavLink, Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const nav = useNavigate();
  if (loading) return <div className="p-10 font-mono">Loading…</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;

  const items = [
    ['/admin', 'Dashboard', '▦'],
    ['/admin/orders', 'Orders', '◫'],
    ['/admin/products', 'Products', '◧'],
    ['/admin/customers', 'Customers', '◉'],
  ];

  const link = ({ isActive }) =>
    `flex items-center gap-2 md:gap-3 px-3 py-2 whitespace-nowrap ${isActive ? 'bg-acid text-ink' : 'text-bone hover:bg-white/10'}`;

  return (
    <div className="md:grid md:grid-cols-[240px_1fr] bg-[#f5f5f4] min-h-screen">
      <aside className="bg-ink text-bone p-4 md:p-6 md:sticky md:top-0 md:h-screen md:flex md:flex-col">
        <Link to="/admin" className="block">
          <div className="font-display text-xl">RANSAN®</div>
          <div className="font-mono text-[10px] tracking-wider2 text-acid mt-1">/ADMIN</div>
        </Link>

        {/* back to storefront — visible on all screen sizes */}
        <Link
          to="/"
          className="mt-3 md:mt-6 inline-flex items-center justify-between gap-2 border border-acid text-acid px-3 py-2 font-mono text-[11px] tracking-wider hover:bg-acid hover:text-ink whitespace-nowrap">
          <span>← VIEW SITE</span><span>↗</span>
        </Link>

        <nav className="mt-3 md:mt-6 flex md:flex-col gap-1 md:space-y-1 font-mono text-xs tracking-wider overflow-x-auto">
          {items.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/admin'} className={link}>
              <span>{icon}</span><span className="flex-1">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* user block pinned to bottom on desktop */}
        <div className="hidden md:block mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-acid text-ink grid place-items-center font-display text-sm rounded-full">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm truncate">{user.name}</div>
              <div className="font-mono text-[10px] text-muted truncate">{user.email}</div>
            </div>
          </div>
          <button
            onClick={() => { logout(); nav('/'); }}
            className="mt-3 w-full font-mono text-[10px] tracking-wider text-muted hover:text-bleed text-left">
            LOGOUT →
          </button>
        </div>
      </aside>
      <main className="p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
