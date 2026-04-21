import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import BigBtn from '../components/BigBtn';

export default function Checkout() {
  const { cart, subtotalINR, refresh } = useCart();
  const { format, currency } = useCurrency();
  const toast = useToast();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({
    name: '', line1: '', line2: '', city: '', state: '', pincode: '', country: 'IN', phone: '',
  });

  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const shippingINR = subtotalINR >= 2999 ? 0 : 99;
  const totalINR = subtotalINR + shippingINR;

  async function submit(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const { data: order } = await api.post('/orders', { shipping: form, displayCurrency: currency });
      const { data: session } = await api.post('/payments/checkout-session', { orderId: order._id });
      await refresh();
      if (session.mocked) {
        await api.post('/payments/confirm-mock', { orderId: order._id });
        toast.success(`Order #${order.orderNo} placed`);
        nav(`/order/${order._id}?paid=1`);
      } else {
        window.location = session.url;
      }
    } catch (e) {
      const msg = e.response?.data?.error || e.message;
      setErr(msg);
      toast.error(msg);
    } finally { setBusy(false); }
  }

  if (!cart.items?.length) {
    return <div className="max-w-7xl mx-auto px-6 py-20 font-mono text-sm">Your bag is empty.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 grid md:grid-cols-[1fr_420px] gap-6 md:gap-10">
      <form onSubmit={submit} className="space-y-5">
        <h1 className="font-display text-4xl md:text-5xl uppercase">Checkout.</h1>
        <div className="font-mono text-[10px] tracking-wider2 text-muted">SHIPPING ADDRESS</div>
        <Input label="FULL NAME" value={form.name} onChange={up('name')} required />
        <Input label="STREET ADDRESS" value={form.line1} onChange={up('line1')} required />
        <Input label="APARTMENT, SUITE, ETC." value={form.line2} onChange={up('line2')} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="CITY" value={form.city} onChange={up('city')} required />
          <Input label="STATE" value={form.state} onChange={up('state')} required />
          <Input label="PINCODE" value={form.pincode} onChange={up('pincode')} required />
          <Input label="PHONE" value={form.phone} onChange={up('phone')} required />
        </div>

        <div className="font-mono text-[10px] tracking-wider2 text-muted mt-6">PAYMENT</div>
        <div className="border border-ink p-4 text-sm">
          <b>STRIPE CHECKOUT</b> — for this learning build, a mock session confirms instantly.
          Add a real Stripe key in <code>server/.env</code> for live payments.
        </div>

        {err && <div className="font-mono text-xs text-bleed border border-bleed bg-bleed/10 p-3">{err}</div>}
        <BigBtn type="submit" variant="acid" disabled={busy} className="w-full !py-4">
          {busy ? 'PLACING ORDER…' : `PAY ${format(totalINR)} →`}
        </BigBtn>
      </form>

      <aside className="border border-ink p-6 h-fit">
        <div className="font-mono text-[10px] tracking-wider2 text-muted">ORDER SUMMARY</div>
        {cart.items.map(i => (
          <div key={`${i.product?._id}-${i.size}-${i.color}`} className="grid grid-cols-[64px_1fr_auto] gap-3 mt-4">
            <img src={i.product?.images?.[0]} alt="" className="w-16 aspect-[3/4] object-cover border border-ink" />
            <div className="text-sm">
              <div className="font-display uppercase text-xs">{i.product?.name}</div>
              <div className="font-mono text-[10px] text-muted">{i.size} · {i.color}</div>
              <div className="font-mono text-[10px] mt-1">× {i.qty}</div>
            </div>
            <div className="font-display text-sm">{format(i.priceINR * i.qty)}</div>
          </div>
        ))}
        <div className="border-t border-ink mt-5 pt-4 space-y-1 text-sm">
          <Row label="Subtotal" value={format(subtotalINR)} />
          <Row label="Shipping" value={shippingINR === 0 ? 'FREE' : format(shippingINR)} />
        </div>
        <div className="border-t border-ink mt-3 pt-3 flex justify-between font-display text-xl">
          <span>TOTAL</span><span>{format(totalINR)}</span>
        </div>
      </aside>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-wider2 mb-1">{label}</div>
      <input {...rest} className="w-full border border-ink bg-transparent px-3 py-3 outline-none text-sm" />
    </div>
  );
}

const Row = ({ label, value }) => (
  <div className="flex justify-between"><span className="text-muted">{label}</span><span>{value}</span></div>
);
