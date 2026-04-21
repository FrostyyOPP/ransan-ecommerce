import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import BigBtn from './BigBtn';

function Stars({ n, size = 14 }) {
  return (
    <span className="font-mono tracking-wide" style={{ fontSize: size }}>
      {'★'.repeat(Math.round(n))}{'☆'.repeat(5 - Math.round(n))}
    </span>
  );
}

export default function Reviews({ productId }) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    const { data } = await api.get(`/reviews/product/${productId}`);
    setData(data);
  }
  useEffect(() => { load(); }, [productId]);

  if (!data) return null;
  const mine = user && data.reviews.find(r => r.user === user.id);

  return (
    <section className="px-4 md:px-6 py-10 md:py-14 border-t border-ink">
      <div className="flex justify-between items-end mb-6 md:mb-8 flex-wrap gap-3">
        <div>
          <div className="font-mono text-[10px] md:text-[11px] tracking-wider2 text-muted">06 / REVIEWS</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mt-2">
            {data.average || '—'} / 5.0
            <span className="text-muted text-sm md:text-base ml-3">{data.count} REVIEWS</span>
          </h2>
        </div>
        {user ? (
          !mine && <BigBtn variant="ghost" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'CANCEL' : 'WRITE A REVIEW'}
          </BigBtn>
        ) : (
          <Link to={`/auth?next=/product`}><BigBtn variant="ghost">LOG IN TO REVIEW</BigBtn></Link>
        )}
      </div>

      {showForm && user && !mine && (
        <ReviewForm productId={productId} onDone={() => { setShowForm(false); load(); }} />
      )}

      {data.count > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {data.reviews.slice(0, 6).map(r => (
            <div key={r._id} className="border border-ink p-5 bg-bone">
              <Stars n={r.rating} />
              {r.title && <div className="font-display text-base md:text-lg uppercase mt-2">{r.title}</div>}
              {r.body && <p className="text-sm leading-6 text-ink/80 mt-2">"{r.body}"</p>}
              <div className="font-mono text-[10px] tracking-wider text-muted mt-4">
                — {r.userName || 'Anon'}<br />
                {(r.boughtSize || r.boughtColor) && `BOUGHT: ${[r.boughtSize, r.boughtColor].filter(Boolean).join(' · ')}`}
              </div>
            </div>
          ))}
        </div>
      )}
      {data.count === 0 && (
        <p className="text-muted font-mono text-sm">No reviews yet. Be the first.</p>
      )}
    </section>
  );
}

function ReviewForm({ productId, onDone }) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr(''); setBusy(true);
    try {
      await api.post('/reviews', { productId, rating, title, body });
      onDone();
    } catch (e) {
      setErr(e.response?.data?.error || e.message);
    } finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="border border-ink p-5 md:p-6 bg-bone-2 mb-6 space-y-4 max-w-2xl">
      <div>
        <div className="font-mono text-[10px] tracking-wider2 mb-2">YOUR RATING</div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(n => (
            <button type="button" key={n} onClick={() => setRating(n)}
              className={`text-3xl leading-none w-10 h-10 ${n <= rating ? 'text-ink' : 'text-ink/20'}`}>★</button>
          ))}
        </div>
      </div>
      <Input label="TITLE" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} />
      <div>
        <div className="font-mono text-[10px] tracking-wider2 mb-1">REVIEW</div>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={1000} rows={4}
          className="w-full border border-ink bg-transparent px-3 py-3 outline-none text-sm resize-none" />
      </div>
      {err && <div className="font-mono text-xs text-bleed">{err}</div>}
      <BigBtn type="submit" disabled={busy}>{busy ? 'POSTING…' : 'POST REVIEW'}</BigBtn>
    </form>
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
