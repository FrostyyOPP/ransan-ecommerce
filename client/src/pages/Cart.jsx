import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import BigBtn from '../components/BigBtn';

export default function Cart() {
  const { user } = useAuth();
  const { cart, subtotalINR, updateItem, removeItem } = useCart();
  const { format } = useCurrency();
  const nav = useNavigate();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-6xl uppercase">Your Bag</h1>
        <p className="mt-4 text-muted">Log in to view your cart.</p>
        <Link to="/auth" className="inline-block mt-6"><BigBtn variant="acid">LOG IN →</BigBtn></Link>
      </div>
    );
  }

  if (!cart.items?.length) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-7xl uppercase">Bag<br />Is Empty.</h1>
        <Link to="/shop" className="inline-block mt-8"><BigBtn variant="acid">SHOP DROP 04 →</BigBtn></Link>
      </div>
    );
  }

  const shippingINR = subtotalINR >= 2999 ? 0 : 99;
  const totalINR = subtotalINR + shippingINR;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display text-6xl uppercase">Your Bag <span className="text-muted text-2xl">[ {cart.items.length} ]</span></h1>
      <div className="grid md:grid-cols-[1fr_380px] gap-10 mt-10">
        <div className="divide-y divide-ink border-y border-ink">
          {cart.items.map((i) => (
            <div key={`${i.product?._id}-${i.size}-${i.color}`} className="grid grid-cols-[120px_1fr_auto] gap-5 py-5">
              <img src={i.product?.images?.[0]} alt="" className="w-full aspect-[3/4] object-cover border border-ink" />
              <div>
                <div className="font-display text-xl uppercase">{i.product?.name}</div>
                <div className="font-mono text-[11px] tracking-wider text-muted mt-1">
                  SIZE {i.size} · {i.color?.toUpperCase()}
                </div>
                <div className="font-display mt-4">{format(i.priceINR)}</div>
                <div className="flex gap-2 mt-3">
                  <div className="flex border border-ink">
                    <button onClick={() => updateItem(i.product._id, i.size, i.color, Math.max(1, i.qty - 1))} className="w-8">−</button>
                    <div className="w-8 grid place-items-center border-x border-ink">{i.qty}</div>
                    <button onClick={() => updateItem(i.product._id, i.size, i.color, i.qty + 1)} className="w-8">+</button>
                  </div>
                  <button onClick={() => removeItem(i.product._id, i.size, i.color)}
                          className="font-mono text-[11px] tracking-wider underline ml-3">
                    REMOVE
                  </button>
                </div>
              </div>
              <div className="font-display text-lg text-right">{format(i.priceINR * i.qty)}</div>
            </div>
          ))}
        </div>

        <aside className="border border-ink p-6 h-fit sticky top-20">
          <div className="font-mono text-[10px] tracking-wider2 text-muted">ORDER SUMMARY</div>
          <Row label="Subtotal" value={format(subtotalINR)} />
          <Row label="Shipping" value={shippingINR === 0 ? 'FREE' : format(shippingINR)} />
          <div className="border-t border-ink mt-4 pt-4 flex justify-between font-display text-2xl">
            <span>TOTAL</span><span>{format(totalINR)}</span>
          </div>
          <BigBtn onClick={() => nav('/checkout')} variant="acid" className="w-full !py-4 mt-6">
            CHECKOUT →
          </BigBtn>
          {subtotalINR < 2999 && (
            <p className="font-mono text-[10px] tracking-wider text-muted mt-3">
              Add {format(2999 - subtotalINR)} more for free shipping.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

const Row = ({ label, value }) => (
  <div className="flex justify-between text-sm mt-3">
    <span className="text-muted">{label}</span><span>{value}</span>
  </div>
);
