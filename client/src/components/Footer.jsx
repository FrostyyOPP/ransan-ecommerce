export default function Footer() {
  return (
    <footer className="border-t border-ink bg-ink text-bone mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-3xl tracking-tightish uppercase">Not For<br /><span className="text-acid">Everyone.</span></div>
          <p className="font-mono text-[10px] tracking-wider2 text-muted mt-6">RANSAN® / DROP 04 / S/S '26</p>
        </div>
        <Col title="SHOP" links={['Tees','Hoodies','Pants','Accessories']} />
        <Col title="HELP" links={['Shipping','Returns','Size Guide','Contact']} />
        <Col title="FOLLOW" links={['Instagram','TikTok','YouTube','Newsletter']} />
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between font-mono text-[10px] tracking-wider2 text-muted">
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
        {links.map(l => <li key={l} className="text-sm hover:text-acid cursor-pointer">{l}</li>)}
      </ul>
    </div>
  );
}
