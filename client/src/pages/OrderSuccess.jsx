import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import { useCurrency } from '../context/CurrencyContext';
import BigBtn from '../components/BigBtn';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { format } = useCurrency();

  useEffect(() => {
    api.get('/orders/mine').then(r => setOrder(r.data.find(o => o._id === id)));
  }, [id]);

  if (!order) return <div className="max-w-7xl mx-auto px-6 py-20 font-mono text-sm">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="font-mono text-[11px] tracking-wider2 text-acid bg-ink inline-block px-3 py-1">PAID</div>
      <h1 className="font-display text-7xl uppercase mt-6 leading-none">
        Order<br />Confirmed.
      </h1>
      <p className="font-mono text-sm mt-6 text-muted">
        Order #{order.orderNo} · {format(order.totalINR)}
      </p>
      <p className="mt-2 text-sm">
        We'll send shipping updates to your email. Ships within 24h from Mumbai.
      </p>
      <div className="mt-10 flex gap-3 justify-center">
        <Link to="/shop"><BigBtn variant="acid">KEEP SHOPPING</BigBtn></Link>
        <Link to="/account"><BigBtn>MY ORDERS</BigBtn></Link>
      </div>
    </div>
  );
}
