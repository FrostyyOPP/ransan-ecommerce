import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

const SIZES = ['XS','S','M','L','XL','XXL'];
const COLORS = [
  { name: 'Black', hex: '#0A0A0A' },
  { name: 'Bone', hex: '#F2EFE8' },
  { name: 'Acid', hex: '#E8F249' },
  { name: 'Bleed Red', hex: '#D92D1F' },
  { name: 'Forest', hex: '#2F7D3E' },
  { name: 'Muted', hex: '#6B6B68' },
];

export default function Shop() {
  const { slug } = useParams();
  const [sp, setSp] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cats, setCats] = useState([]);
  const [size, setSize] = useState(sp.get('size') || '');
  const [color, setColor] = useState(sp.get('color') || '');
  const [sort, setSort] = useState(sp.get('sort') || 'newest');

  useEffect(() => {
    api.get('/categories').then(r => setCats(r.data));
  }, []);

  useEffect(() => {
    const params = { sort };
    if (slug) params.category = slug;
    if (size) params.size = size;
    if (color) params.color = color;
    api.get('/products', { params }).then(r => {
      setProducts(r.data.items); setTotal(r.data.total);
    });
  }, [slug, size, color, sort]);

  useEffect(() => {
    const q = {}; if (size) q.size = size; if (color) q.color = color; if (sort !== 'newest') q.sort = sort;
    setSp(q, { replace: true });
  }, [size, color, sort, setSp]);

  const currentCat = cats.find(c => c.slug === slug);
  const title = currentCat ? currentCat.name : 'ALL';

  return (
    <>
      <section className="px-6 py-9 border-b border-ink">
        <div className="font-mono text-[10px] tracking-wider2 text-muted">
          HOME / SHOP / <b className="text-ink">{title.toUpperCase()}</b>
        </div>
        <div className="flex justify-between items-end mt-3 flex-wrap gap-4">
          <h1 className="font-display text-7xl md:text-8xl uppercase leading-[0.9]">
            {title.toUpperCase()}<span className="text-muted text-2xl ml-3">[ {total} ]</span>
          </h1>
          <div className="flex gap-3 font-mono text-[11px] tracking-wider2">
            <span>SORT:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent border-b border-ink outline-none">
              <option value="newest">NEWEST</option>
              <option value="price-asc">PRICE ↑</option>
              <option value="price-desc">PRICE ↓</option>
              <option value="rating">RATING</option>
            </select>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-[260px_1fr]">
        <aside className="p-7 border-r border-ink self-start md:sticky md:top-[64px]">
          <div className="flex justify-between items-baseline mb-6">
            <div className="font-display text-lg uppercase">Filters</div>
            <button onClick={() => { setSize(''); setColor(''); }} className="font-mono text-[10px] tracking-wider">CLEAR</button>
          </div>
          <Section title="CATEGORY">
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className={!slug ? 'underline' : ''}>All</Link></li>
              {cats.map(c =>
                <li key={c._id}>
                  <Link to={`/shop/${c.slug}`} className={slug === c.slug ? 'underline' : ''}>
                    {c.name} <span className="text-muted text-xs">({c.productCount})</span>
                  </Link>
                </li>
              )}
            </ul>
          </Section>
          <Section title="SIZE">
            <div className="grid grid-cols-3 gap-1">
              {SIZES.map(s =>
                <button key={s} onClick={() => setSize(size === s ? '' : s)}
                        className={`border border-ink py-2 font-mono text-[11px] tracking-wider ${size === s ? 'bg-ink text-bone' : ''}`}>
                  {s}
                </button>
              )}
            </div>
          </Section>
          <Section title="COLOR">
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map(c =>
                <button key={c.name} onClick={() => setColor(color === c.name ? '' : c.name)}
                        title={c.name}
                        className={`w-7 h-7 border border-ink ${color === c.name ? 'ring-2 ring-ink ring-offset-2' : ''}`}
                        style={{ background: c.hex }} />
              )}
            </div>
          </Section>
        </aside>

        <section className="p-6">
          {products.length === 0 && <div className="font-mono text-sm text-muted">No products match your filters.</div>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <div className="font-mono text-[10px] tracking-wider2 text-muted mb-3">{title}</div>
      {children}
    </div>
  );
}
