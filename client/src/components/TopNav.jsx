import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import QuickSearch from './QuickSearch';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function TopNav() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { currency, setCurrency, supported } = useCurrency();
  const nav = useNavigate();
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const link = ({ isActive }) =>
    `font-mono text-[11px] tracking-wider2 ${isActive ? 'underline underline-offset-4' : 'text-ink hover:text-bleed'}`;

  return (
    <>
    <header className="border-b border-ink bg-bone sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center gap-4">
        <Link to="/" className="flex-shrink-0"><Logo size={20} /></Link>

        <nav className="hidden lg:flex gap-6 ml-4">
          <NavLink to="/shop" className={link}>SHOP</NavLink>
          <NavLink to="/shop/tees" className={link}>TEES</NavLink>
          <NavLink to="/shop/hoodies" className={link}>HOODIES</NavLink>
          <NavLink to="/shop/pants" className={link}>PANTS</NavLink>
          <NavLink to="/shop/accessories" className={link}>ACCESS.</NavLink>
          <NavLink to="/about" className={link}>ABOUT</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="font-mono text-[11px] tracking-wider2 hover:text-bleed flex items-center gap-1"
            aria-label="search">
            <span>⌕</span><span className="hidden md:inline">SEARCH</span>
          </button>
          <select
            value={currency} onChange={(e) => setCurrency(e.target.value)}
            className="font-mono text-[11px] tracking-wider2 bg-transparent border border-ink px-2 py-1">
            {supported.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {user && user.role === 'admin' && (
            <NavLink to="/admin" className={`${link({ isActive: false })} hidden md:inline`}>ADMIN</NavLink>
          )}
          {user ? (
            <NavLink to="/account" className={`${link({ isActive: false })} hidden md:inline`}>ACCOUNT</NavLink>
          ) : (
            <NavLink to="/auth" className={`${link({ isActive: false })} hidden md:inline`}>LOG IN</NavLink>
          )}
          <Link to="/cart" className="font-mono text-[10px] md:text-[11px] tracking-wider2 bg-ink text-bone px-2 md:px-3 py-1">
            BAG ({count})
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="menu"
            className="lg:hidden w-9 h-9 border border-ink grid place-items-center">
            <span className="font-display text-lg leading-none">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink bg-bone">
          <nav className="flex flex-col">
            {[
              ['/shop', 'SHOP'],
              ['/shop/tees', 'TEES'],
              ['/shop/hoodies', 'HOODIES'],
              ['/shop/pants', 'PANTS'],
              ['/shop/accessories', 'ACCESSORIES'],
              ['/about', 'ABOUT'],
              ...(user ? [['/account', 'ACCOUNT']] : []),
              ...(user?.role === 'admin' ? [['/admin', 'ADMIN']] : []),
            ].map(([to, label]) => (
              <NavLink key={to} to={to}
                className="px-6 py-4 font-display text-xl uppercase border-b border-ink/10 hover:bg-acid">
                {label}
              </NavLink>
            ))}
            <div className="px-6 py-4 border-t border-ink">
              {user ? (
                <button onClick={() => { logout(); nav('/'); }} className="font-mono text-xs tracking-wider2 underline">
                  LOGOUT ({user.email})
                </button>
              ) : (
                <Link to="/auth" className="font-mono text-xs tracking-wider2 underline">LOG IN / SIGN UP</Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
    {searchOpen && <QuickSearch onClose={() => setSearchOpen(false)} />}
    </>
  );
}
