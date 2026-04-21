import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-ink bg-ink text-bone mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-3xl tracking-tightish uppercase">Not For<br /><span className="text-acid">Everyone.</span></div>
          <p className="font-mono text-[10px] tracking-wider2 text-muted mt-6">RANSAN® / DROP 04 / S/S '26</p>
        </div>
        <Col title="SHOP" links={[
          ['Tees', '/shop/tees'],
          ['Hoodies', '/shop/hoodies'],
          ['Pants', '/shop/pants'],
          ['Accessories', '/shop/accessories'],
        ]} />
        <Col title="HELP" links={[
          ['Shipping', '/help/shipping'],
          ['Returns', '/help/returns'],
          ['Size Guide', '/help/size-guide'],
          ['Contact', '/help/contact'],
        ]} />
        <Col title="FOLLOW" links={[
          ['Instagram', 'https://instagram.com', true],
          ['TikTok', 'https://tiktok.com', true],
          ['YouTube', 'https://youtube.com', true],
          ['Newsletter', '/#newsletter'],
        ]} />
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:justify-between gap-1 font-mono text-[10px] tracking-wider2 text-muted">
          <span>© RANSAN 2026</span>
          <span>N 19°04' · E 72°52' · MUMBAI</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-wider2 text-muted mb-3">{title}</div>
      <ul className="space-y-2">
        {links.map(([label, to, ext]) =>
          <li key={label}>
            {ext
              ? <a href={to} target="_blank" rel="noreferrer" className="text-sm hover:text-acid">{label}</a>
              : <Link to={to} className="text-sm hover:text-acid">{label}</Link>}
          </li>
        )}
      </ul>
    </div>
  );
}
