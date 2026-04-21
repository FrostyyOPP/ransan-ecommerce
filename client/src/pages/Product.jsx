import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import BigBtn from '../components/BigBtn';
import ProductCard from '../components/ProductCard';
import SizeGuide from '../components/SizeGuide';
import Reviews from '../components/Reviews';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

export default function Product() {
  const { slug } = useParams();
  const nav = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { format } = useCurrency();
  const [data, setData] = useState(null);
  const [size, setSize] = useState('');
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState('desc');
  const [busy, setBusy] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    setData(null);
    api.get(`/products/${slug}`).then(r => {
      setData(r.data);
      setSize(r.data.product.sizes?.find(s => s !== 'XS') || r.data.product.sizes?.[0] || '');
      setColorIdx(0);
    });
  }, [slug]);

  if (!data) return <div className="max-w-7xl mx-auto p-10 font-mono text-sm">Loading…</div>;
  const { product, related } = data;
  const color = product.colors?.[colorIdx];

  async function onAdd() {
    if (!user) return nav('/auth?next=' + encodeURIComponent(`/product/${slug}`));
    setBusy(true);
    try {
      await addItem(product._id, { size, color: color?.name, qty });
      nav('/cart');
    } finally { setBusy(false); }
  }

  return (
    <>
      <div className="font-mono text-[10px] tracking-wider2 text-muted px-4 md:px-6 py-3 border-b border-ink truncate">
        HOME / SHOP / {product.category?.name?.toUpperCase()} / <b className="text-ink">{product.name.toUpperCase()}</b>
      </div>

      <div className="grid md:grid-cols-[1fr_440px]">
        <div className="md:border-r border-ink">
          <div className="grid grid-cols-2 gap-px bg-ink border-b border-ink">
            {product.images?.slice(0, 4).map((src, i) =>
              <div key={i} className="aspect-square bg-bone-2">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="p-6 md:p-10 bg-bone-2">
            <div className="font-mono text-[10px] tracking-wider2 text-muted">05 / FIT NOTES</div>
            <p className="text-sm md:text-base leading-7 max-w-[640px] mt-3">{product.fitNotes}</p>
          </div>
        </div>

        <aside className="p-6 md:p-9">
          <div className="font-mono text-[10px] tracking-wider2 text-muted">
            RANSAN® / {product.category?.name?.toUpperCase()} / {product._id.slice(-6).toUpperCase()}
          </div>
          <h1 className="font-display text-3xl md:text-5xl uppercase leading-[0.95] mt-2">{product.name}</h1>
          <div className="flex items-center gap-3 mt-4 font-mono text-[11px] tracking-wider">
            <span>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span className="text-muted">{product.rating.toFixed(1)} · {product.reviewsCount} REVIEWS</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3 mt-5">
            <div className="font-display text-3xl md:text-4xl">{format(product.priceINR)}</div>
            {product.compareAtINR && (
              <>
                <div className="font-mono text-xs text-muted line-through">{format(product.compareAtINR)}</div>
                <div className="bg-bleed text-bone font-mono text-[10px] px-2 py-1">
                  -{Math.round((1 - product.priceINR / product.compareAtINR) * 100)}%
                </div>
              </>
            )}
          </div>

          <Divider />
          <Row label="COLOR" value={color?.name?.toUpperCase()} />
          <div className="flex gap-3 mt-2">
            {product.colors?.map((c, i) =>
              <button key={c.name} onClick={() => setColorIdx(i)}
                      className={`w-10 h-10 border border-ink ${colorIdx === i ? 'ring-2 ring-ink ring-offset-2' : ''}`}
                      style={{ background: c.hex }} />
            )}
          </div>

          <Divider />
          <div className="flex justify-between font-mono text-[11px] tracking-wider mb-2">
            <span>SIZE: <b>{size || '—'}</b></span>
            <button type="button" onClick={() => setSizeGuideOpen(true)} className="underline">SIZE GUIDE ↗</button>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {product.sizes?.map(s =>
              <button key={s} onClick={() => setSize(s)}
                      className={`border border-ink py-3 font-display text-[13px] ${size === s ? 'bg-ink text-bone' : ''}`}>
                {s}
              </button>
            )}
          </div>

          <div className="flex gap-2 mt-6">
            <div className="flex border border-ink">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10">−</button>
              <div className="w-12 grid place-items-center border-x border-ink font-display">{qty}</div>
              <button onClick={() => setQty(qty + 1)} className="w-10">+</button>
            </div>
            <BigBtn onClick={onAdd} disabled={busy || !size} className="flex-1 !py-4">
              {busy ? 'ADDING…' : `ADD TO BAG — ${format(product.priceINR * qty)}`}
            </BigBtn>
          </div>

          <div className="border-t border-ink mt-6 pt-4 grid grid-cols-3 gap-1 text-center font-mono text-[10px] tracking-wider">
            <div><b>FREE SHIP</b><br /><span className="text-muted">₹2999+</span></div>
            <div><b>7-DAY</b><br /><span className="text-muted">RETURNS</span></div>
            <div><b>COD</b><br /><span className="text-muted">AVAILABLE</span></div>
          </div>

          {[
            ['desc', 'DESCRIPTION', product.description],
            ['details', 'DETAILS & CARE', product.care],
            ['ship', 'SHIPPING & RETURNS', 'Ships within 24h. Free on orders ₹2999+. 7-day hassle-free returns.'],
          ].map(([k, title, body]) => (
            <div key={k} className="border-t border-ink">
              <button onClick={() => setOpenAcc(openAcc === k ? '' : k)}
                      className="flex justify-between w-full py-3.5 font-display text-xs tracking-wider">
                <span>{title}</span><span>{openAcc === k ? '−' : '+'}</span>
              </button>
              {openAcc === k && <div className="pb-4 text-sm leading-6 text-muted">{body}</div>}
            </div>
          ))}
        </aside>
      </div>

      <Reviews productId={product._id} />

      {related?.length > 0 && (
        <section className="px-4 md:px-6 py-10 md:py-14 border-t border-ink">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-5 md:mb-6">Pair It With.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {related.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}

      <SizeGuide open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}

const Divider = () => <div className="border-t border-ink mt-6 pt-5" />;
const Row = ({ label, value }) => (
  <div className="flex justify-between font-mono text-[11px] tracking-wider">
    <span>{label}</span><b>{value}</b>
  </div>
);
