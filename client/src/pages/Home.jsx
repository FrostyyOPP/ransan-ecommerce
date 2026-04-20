import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import BigBtn from '../components/BigBtn';
import Ticker from '../components/Ticker';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [cats, setCats] = useState([]);
  const [newIn, setNewIn] = useState([]);

  useEffect(() => {
    api.get('/categories').then(r => setCats(r.data));
    api.get('/products', { params: { sort: 'newest', limit: 4 } }).then(r => setNewIn(r.data.items));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-bone border-b border-ink overflow-hidden">
        <img
          src="https://picsum.photos/seed/ransan-hero/2000/1200"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="font-mono text-[11px] tracking-wider2">DROP 04 · SPRING/SUMMER '26 · LIVE NOW</div>
          <h1 className="font-display uppercase leading-[0.88] tracking-[-0.04em] mt-10"
              style={{ fontSize: 'clamp(80px, 14vw, 220px)' }}>
            NOT FOR<br />
            <span className="text-acid">EVERYONE.</span><br />
            <span style={{ WebkitTextStroke: '1.5px #F2EFE8', color: 'transparent' }}>RANSAN®</span>
          </h1>
          <div className="flex gap-3 mt-12">
            <Link to="/shop"><BigBtn variant="acid">SHOP DROP 04 →</BigBtn></Link>
            <BigBtn className="!bg-transparent !text-bone !border-bone">THE LOOKBOOK</BigBtn>
          </div>
        </div>
        <div className="absolute top-5 right-8 text-right font-mono text-[10px] tracking-wider2">
          N 19°04'34"<br />E 72°52'38"<br />MUMBAI · IN
        </div>
        <div className="absolute bottom-5 right-8 font-mono text-[10px] tracking-wider2">↓ SCROLL / 01 · 12</div>
      </section>

      <Ticker />

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-ink">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="font-mono text-[11px] tracking-wider2 text-muted">01 / CATEGORY</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase mt-2">Shop The Grid.</h2>
          </div>
          <Link to="/shop" className="font-mono text-[11px] tracking-wider2 hover:text-bleed">VIEW ALL →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c, i) => (
            <Link to={`/shop/${c.slug}`} key={c._id} className="relative aspect-[3/4] overflow-hidden border border-ink">
              <img src={c.coverImage} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-5 text-bone">
                <div className="font-mono text-[10px] tracking-wider2">0{i+1}</div>
                <div className="font-display text-4xl uppercase leading-none">{c.name}</div>
                <div className="font-mono text-[10px] tracking-wider2 mt-1">{c.productCount} STYLES →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW IN */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-ink">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="font-mono text-[11px] tracking-wider2 text-muted">02 / NEW IN</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase mt-2">Fresh Off The Rack.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {newIn.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="grid md:grid-cols-2 border-b border-ink">
        <div className="bg-acid p-10 md:p-16 flex flex-col justify-between min-h-[520px]">
          <div className="font-mono text-[11px] tracking-wider2">03 / THE FIT</div>
          <div>
            <h2 className="font-display uppercase leading-[0.9] text-6xl md:text-8xl">Made<br />For The<br />Streets.</h2>
            <p className="max-w-[420px] text-sm leading-7 mt-6">
              Heavyweight cottons. Oversized cuts. Boxy silhouettes.
              Built for the ones who move different.
            </p>
            <Link to="/about" className="inline-block mt-6"><BigBtn>READ THE STORY →</BigBtn></Link>
          </div>
        </div>
        <div className="min-h-[520px] bg-bone-2">
          <img src="https://picsum.photos/seed/ransan-lookbook/1200/900" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* DROP COUNTDOWN */}
      <section className="bg-ink text-bone px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[11px] tracking-wider2 text-acid">04 / NEXT DROP</div>
          <h2 className="font-display uppercase leading-[0.9] tracking-[-0.03em] text-6xl md:text-8xl mt-3">
            DROP 05<br />
            <span className="text-acid">04 : 22 : 17 : 09</span>
          </h2>
          <div className="flex gap-4 items-center mt-10">
            <input
              placeholder="your@email.com"
              className="bg-transparent border-b border-bone text-bone font-mono text-sm px-0 py-2 outline-none min-w-[320px]"
            />
            <BigBtn variant="acid">NOTIFY ME →</BigBtn>
          </div>
        </div>
      </section>
    </>
  );
}
