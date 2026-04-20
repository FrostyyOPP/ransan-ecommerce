import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function TopNav() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { currency, setCurrency, supported } = useCurrency();
  const nav = useNavigate();

  const link = ({ isActive }) =>
    `font-mono text-[11px] tracking-wider2 ${isActive ? 'underline underline-offset-4' : 'text-ink hover:text-bleed'}`;

  return (
    <header className="border-b border-ink bg-bone sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/"><Logo size={22} /></Link>
        <nav className="flex gap-6 ml-4">
          <NavLink to="/shop" className={link}>SHOP</NavLink>
          <NavLink to="/shop/tees" className={link}>TEES</NavLink>
          <NavLink to="/shop/hoodies" className={link}>HOODIES</NavLink>
          <NavLink to="/shop/pants" className={link}>PANTS</NavLink>
          <NavLink to="/shop/accessories" className={link}>ACCESS.</NavLink>
          <NavLink to="/about" className={link}>ABOUT</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <select
            value={currency} onChange={(e) => setCurrency(e.target.value)}
            className="font-mono text-[11px] tracking-wider2 bg-transparent border border-ink px-2 py-1">
            {supported.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <NavLink to="/search" className={link}>SEARCH</NavLink>
          {user ? (
            <>
              {user.role === 'admin' && <NavLink to="/admin" className={link}>ADMIN</NavLink>}
              <button onClick={() => { logout(); nav('/'); }} className="font-mono text-[11px] tracking-wider2 hover:text-bleed">
                LOGOUT
              </button>
            </>
          ) : (
            <NavLink to="/auth" className={link}>LOG IN</NavLink>
          )}
          <Link to="/cart" className="font-mono text-[11px] tracking-wider2 bg-ink text-bone px-3 py-1">
            CART ({count})
          </Link>
        </div>
      </div>
    </header>
  );
}
