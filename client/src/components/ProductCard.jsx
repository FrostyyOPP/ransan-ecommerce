import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

export default function ProductCard({ product }) {
  const { format } = useCurrency();
  const tag = product.featuredNew ? 'NEW' : product.compareAtINR ? 'SALE' : null;
  return (
    <Link to={`/product/${product.slug}`} className="block group">
      <div className="relative aspect-[3/4] overflow-hidden border border-ink bg-bone-2">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        {tag && (
          <div className={`absolute top-3 left-3 font-mono text-[10px] tracking-wider2 px-2 py-1 ${tag === 'NEW' ? 'bg-acid text-ink' : 'bg-bleed text-bone'}`}>
            {tag}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between">
        <div>
          <div className="font-display text-sm uppercase tracking-tightish">{product.name}</div>
          <div className="font-mono text-[10px] tracking-wider2 text-muted mt-1">
            {product.category?.name?.toUpperCase()}
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-sm">{format(product.priceINR)}</div>
          {product.compareAtINR && (
            <div className="font-mono text-[10px] line-through text-muted">{format(product.compareAtINR)}</div>
          )}
        </div>
      </div>
      <div className="mt-2 flex gap-1">
        {(product.colors || []).slice(0, 5).map((c, i) =>
          <span key={i} className="w-3 h-3 border border-ink" style={{ background: c.hex }} />
        )}
      </div>
    </Link>
  );
}
