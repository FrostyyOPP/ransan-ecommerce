import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  async function refresh() {
    if (!user) { setCart({ items: [] }); return; }
    const { data } = await api.get('/cart');
    setCart(data);
  }
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [user?.id]);

  async function addItem(productId, { size, color, qty = 1 }) {
    const { data } = await api.post('/cart/items', { productId, size, color, qty });
    setCart(data);
  }
  async function updateItem(productId, size, color, qty) {
    const { data } = await api.patch('/cart/items', { productId, size, color, qty });
    setCart(data);
  }
  async function removeItem(productId, size, color) {
    const { data } = await api.delete('/cart/items', { data: { productId, size, color } });
    setCart(data);
  }
  async function clear() {
    await api.delete('/cart');
    setCart({ items: [] });
  }

  const count = cart.items?.reduce((s, i) => s + i.qty, 0) || 0;
  const subtotalINR = cart.items?.reduce((s, i) => s + i.priceINR * i.qty, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, count, subtotalINR, addItem, updateItem, removeItem, clear, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
