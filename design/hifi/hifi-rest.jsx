// Auth, Search, About, Admin — hi-fi
const HifiAuth = () => {
  const [tab, setTab] = React.useState('login');
  return (
    <div style={{ background: RS.bg, minHeight: '100vh', fontFamily: RSFonts.body, display: 'grid', gridTemplateColumns: '1fr 1fr' }} data-screen-label="Auth">
      {/* LEFT BRAND PANEL */}
      <div style={{ background: RS.ink, color: RS.bg, position: 'relative', overflow: 'hidden' }}>
        <ProductImg label="BRAND IMAGERY" tone="dark" ratio="auto" style={{ position: 'absolute', inset: 0, height: '100%' }} />
        <div style={{ position: 'relative', padding: 60, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', boxSizing: 'border-box' }}>
          <Logo color={RS.bg} size={32} />
          <div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.acid }}>MEMBER ACCESS</div>
            <h1 style={{ fontFamily: RSFonts.display, fontSize: 96, lineHeight: 0.9, margin: '16px 0 0', textTransform: 'uppercase' }}>
              JOIN<br/>THE<br/><span style={{ color: RS.acid }}>GANG.</span>
            </h1>
            <p style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.6, marginTop: 24, color: '#ccc' }}>
              Early drops. Member-only sales. Exclusive fits. No spam, ever.
            </p>
          </div>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: '#666' }}>
            RANSAN® · DROP 04 · S/S 26
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div style={{ padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 400, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${RS.ink}`, fontFamily: RSFonts.display, fontSize: 22, textTransform: 'uppercase' }}>
            {[['login','LOG IN'], ['signup','SIGN UP']].map(([k, l]) =>
              <div key={k} onClick={() => setTab(k)} style={{
                flex: 1, padding: '14px 0', textAlign: 'center', cursor: 'pointer',
                borderBottom: tab === k ? `3px solid ${RS.ink}` : 'none',
                marginBottom: -1,
                color: tab === k ? RS.ink : RS.muted,
              }}>{l}</div>
            )}
          </div>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tab === 'signup' && (
              <div>
                <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em', marginBottom: 6 }}>NAME</div>
                <input style={{ width: '100%', border: `1px solid ${RS.ink}`, padding: '14px', background: 'transparent', outline: 'none', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            )}
            <div>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em', marginBottom: 6 }}>EMAIL</div>
              <input style={{ width: '100%', border: `1px solid ${RS.ink}`, padding: '14px', background: 'transparent', outline: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em', marginBottom: 6 }}>
                <span>PASSWORD</span>
                {tab === 'login' && <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>FORGOT?</span>}
              </div>
              <input type="password" style={{ width: '100%', border: `1px solid ${RS.ink}`, padding: '14px', background: 'transparent', outline: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            {tab === 'login' && <label style={{ fontSize: 12, display: 'flex', gap: 8 }}><input type="checkbox" /> Remember me</label>}
            <BigBtn variant="primary" style={{ width: '100%', padding: '18px' }}>{tab === 'login' ? 'LOG IN →' : 'CREATE ACCOUNT →'}</BigBtn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0', fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>
              <div style={{ flex: 1, height: 1, background: RS.ink, opacity: 0.2 }} /> OR <div style={{ flex: 1, height: 1, background: RS.ink, opacity: 0.2 }} />
            </div>
            <BigBtn variant="ghost" style={{ width: '100%', padding: '14px' }}>CONTINUE WITH GOOGLE</BigBtn>
            <BigBtn variant="ghost" style={{ width: '100%', padding: '14px' }}>CONTINUE WITH APPLE</BigBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

const HifiSearch = () => (
  <div style={{ background: RS.bg, color: RS.ink, fontFamily: RSFonts.body }} data-screen-label="Search">
    <TopNav current="" />
    <section style={{ padding: '32px', borderBottom: `1px solid ${RS.ink}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, border: `2px solid ${RS.ink}`, padding: '18px 24px', background: RS.paper }}>
        <span style={{ fontFamily: RSFonts.display, fontSize: 16 }}>🔍</span>
        <input defaultValue="hoodie" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: RSFonts.display, fontSize: 28, letterSpacing: '-0.01em', textTransform: 'uppercase' }} />
        <span style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em', color: RS.muted, cursor: 'pointer' }}>CLEAR ×</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.1em' }}>
        <span>24 RESULTS FOR "HOODIE"</span>
        <span>DID YOU MEAN: <b style={{ textDecoration: 'underline' }}>HOODIES</b>?</span>
      </div>
    </section>

    <div style={{ padding: 32 }}>
      <div style={{ fontFamily: RSFonts.display, fontSize: 14, letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>Narrow By</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {['Hoodies (18)', 'Zip-ups (4)', 'Crewnecks (2)', 'Heavyweight', 'Under ₹3000'].map(c =>
          <div key={c} style={{ border: `1px solid ${RS.ink}`, padding: '8px 14px', fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.05em', cursor: 'pointer' }}>{c}</div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {[
          { n: 'Heavyweight Hoodie', p: '₹3,499', t: 'dark', tag: 'NEW' },
          { n: 'Box Hoodie 04', p: '₹3,299', t: 'neutral' },
          { n: 'Zip-up Acid', p: '₹3,899', t: 'acid', colors: ['#E8F249','#0a0a0a'] },
          { n: 'Cropped Hoodie', p: '₹2,799', t: 'neutral', tag: 'SALE' },
          { n: 'Monogram Hood', p: '₹3,499', t: 'dark' },
          { n: 'Reversible Hood', p: '₹4,199', t: 'red' },
          { n: 'Panel Hoodie', p: '₹3,299', t: 'neutral' },
          { n: 'Pullover 404', p: '₹2,999', t: 'dark' },
        ].map((p, i) => <ProductCard key={i} name={p.n} price={p.p} tone={p.t} tag={p.tag} colors={p.colors} />)}
      </div>
    </div>
    <Footer />
  </div>
);

const HifiAbout = () => (
  <div style={{ background: RS.bg, color: RS.ink, fontFamily: RSFonts.body }} data-screen-label="About">
    <TopNav current="ABOUT" />
    {/* HERO */}
    <section style={{ background: RS.ink, color: RS.bg, padding: '80px 32px', position: 'relative', overflow: 'hidden', minHeight: 560 }}>
      <ProductImg label="FOUNDERS / STUDIO" tone="dark" ratio="auto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35 }} />
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.acid }}>EST. 2024 · MUMBAI</div>
        <h1 style={{ fontFamily: RSFonts.display, fontSize: 'clamp(80px, 14vw, 200px)', lineHeight: 0.85, margin: '20px 0 0', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
          WE'RE<br/>
          <span style={{ color: RS.acid }}>RANSAN</span><span style={{ color: RS.red }}>®</span>
        </h1>
        <p style={{ fontSize: 18, maxWidth: 580, marginTop: 32, lineHeight: 1.5 }}>
          A streetwear label built from the back alleys of Bombay. Heavy fabrics, loud cuts, no apologies.
        </p>
      </div>
    </section>

    {/* MANIFESTO */}
    <section style={{ padding: '100px 32px', borderBottom: `1px solid ${RS.ink}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.muted }}>01 / MANIFESTO</div>
          <h2 style={{ fontFamily: RSFonts.display, fontSize: 64, lineHeight: 0.9, margin: '8px 0 0', textTransform: 'uppercase' }}>Not For<br/>Everyone.</h2>
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.7 }}>
          <p><b>RanSan was built on a simple idea:</b> clothes that don't look like everyone else's. Heavy cottons. Bold silhouettes. Limited drops. No mass production, no fillers, no trends chasing.</p>
          <p style={{ marginTop: 16 }}>We design in Bombay, cut in Tirupur, and ship worldwide. Every piece is numbered. Every drop is finite. When it's gone, it's gone.</p>
          <p style={{ marginTop: 16 }}>If you bleed with us, welcome to the gang. If not — there's a million other brands out there.</p>
        </div>
      </div>
    </section>

    {/* VALUES */}
    <section style={{ padding: '100px 32px', borderBottom: `1px solid ${RS.ink}`, background: RS.bg2 }}>
      <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.muted }}>02 / WHAT WE STAND FOR</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 32 }}>
        {[
          ['✱', 'MADE IN INDIA', 'Every piece is cut, sewn and finished by Indian craftspeople. Fair pay, proper conditions.'],
          ['✱', 'HEAVYWEIGHT', '240–320 GSM fabrics only. None of that tissue-paper, see-through shit.'],
          ['✱', 'LIMITED DROPS', 'Small runs. Numbered pieces. No restocks after a drop sells out.'],
        ].map(([icon, h, b]) => (
          <div key={h}>
            <div style={{ fontFamily: RSFonts.display, fontSize: 96, color: RS.acid, lineHeight: 1 }}>{icon}</div>
            <h3 style={{ fontFamily: RSFonts.display, fontSize: 28, margin: '16px 0 8px', textTransform: 'uppercase' }}>{h}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>{b}</p>
          </div>
        ))}
      </div>
    </section>

    {/* NUMBERS */}
    <section style={{ background: RS.ink, color: RS.bg, padding: '80px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {[['2024','FOUNDED'],['04','DROPS'],['12K','CREW MEMBERS'],['100%','COTTON']].map(([n, l]) =>
          <div key={l} style={{ borderLeft: `1px solid #333`, paddingLeft: 20 }}>
            <div style={{ fontFamily: RSFonts.display, fontSize: 80, lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', marginTop: 6, color: RS.acid }}>{l}</div>
          </div>
        )}
      </div>
    </section>

    <Footer />
  </div>
);

const HifiAdmin = () => (
  <div style={{ background: '#f5f5f4', minHeight: '100vh', fontFamily: RSFonts.body, display: 'grid', gridTemplateColumns: '240px 1fr' }} data-screen-label="Admin">
    {/* SIDEBAR */}
    <aside style={{ background: RS.ink, color: RS.bg, padding: 24, position: 'sticky', top: 0, height: '100vh', boxSizing: 'border-box' }}>
      <Logo color={RS.bg} size={24} />
      <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.acid, marginTop: 4 }}>/ADMIN</div>
      <nav style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          ['▦', 'Dashboard', true],
          ['◫', 'Orders', false, '23'],
          ['◧', 'Products'],
          ['◨', 'Collections'],
          ['◉', 'Customers'],
          ['%', 'Discounts'],
          ['↗', 'Analytics'],
          ['⚙', 'Settings'],
        ].map(([icon, label, active, badge]) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px',
            background: active ? RS.acid : 'transparent',
            color: active ? RS.ink : RS.bg,
            fontFamily: RSFonts.mono, fontSize: 12, letterSpacing: '0.05em',
            cursor: 'pointer', fontWeight: 700,
          }}>
            <span style={{ fontSize: 14 }}>{icon}</span>
            <span style={{ flex: 1 }}>{label}</span>
            {badge && <span style={{ background: RS.red, color: '#fff', padding: '1px 6px', fontSize: 10 }}>{badge}</span>}
          </div>
        ))}
      </nav>
      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, borderTop: '1px solid #333', paddingTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 32, height: 32, background: RS.acid, borderRadius: '50%', display: 'grid', placeItems: 'center', fontFamily: RSFonts.display, color: RS.ink, fontSize: 14 }}>R</div>
        <div style={{ fontSize: 12 }}><b>Ran</b><div style={{ color: '#999', fontSize: 10 }}>admin@ransan.com</div></div>
      </div>
    </aside>

    {/* MAIN */}
    <main style={{ padding: 32, overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.muted }}>DASHBOARD</div>
          <h1 style={{ fontFamily: RSFonts.display, fontSize: 48, lineHeight: 1, margin: '4px 0 0', textTransform: 'uppercase' }}>Morning, Ran.</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ border: `1px solid ${RS.ink}`, padding: '10px 14px', fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.1em', background: '#fff' }}>LAST 30 DAYS ▾</div>
          <BigBtn variant="primary" style={{ padding: '10px 16px', fontSize: 11 }}>+ NEW PRODUCT</BigBtn>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { l: 'REVENUE', v: '₹4.82L', d: '+12.4%', pos: true, chart: [20,28,24,34,32,40,38,46] },
          { l: 'ORDERS', v: '342', d: '+8.1%', pos: true, chart: [10,14,12,18,16,22,20,24] },
          { l: 'VISITORS', v: '14.2K', d: '+24.0%', pos: true, chart: [30,35,40,38,48,52,58,62] },
          { l: 'CONV. RATE', v: '2.41%', d: '-0.3%', pos: false, chart: [18,20,22,19,17,16,15,14] },
        ].map((k) => (
          <div key={k.l} style={{ background: '#fff', border: `1px solid ${RS.ink}`, padding: 20 }}>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>{k.l}</div>
            <div style={{ fontFamily: RSFonts.display, fontSize: 36, margin: '6px 0' }}>{k.v}</div>
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 11, fontWeight: 700, color: k.pos ? RS.green : RS.red }}>
                {k.pos ? '↗' : '↘'} {k.d}
              </div>
              <svg width="80" height="30" viewBox="0 0 80 30">
                <polyline points={k.chart.map((v, i) => `${i * 11},${30 - v * 0.4}`).join(' ')} fill="none" stroke={RS.ink} strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginTop: 14 }}>
        <div style={{ background: '#fff', border: `1px solid ${RS.ink}`, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>REVENUE TREND</div>
              <div style={{ fontFamily: RSFonts.display, fontSize: 28, marginTop: 4 }}>₹4,82,394</div>
            </div>
            <div style={{ display: 'flex', gap: 6, fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.1em' }}>
              {['7D','30D','90D','1Y'].map((p, i) =>
                <div key={p} style={{ border: `1px solid ${RS.ink}`, padding: '4px 10px', background: i === 1 ? RS.ink : 'transparent', color: i === 1 ? RS.bg : RS.ink, cursor: 'pointer' }}>{p}</div>
              )}
            </div>
          </div>
          <svg viewBox="0 0 500 160" style={{ width: '100%', marginTop: 20 }}>
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={RS.acid} stopOpacity="0.5" />
                <stop offset="1" stopColor={RS.acid} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 40, 80, 120, 160].map(y =>
              <line key={y} x1="0" x2="500" y1={y} y2={y} stroke="#eee" />
            )}
            <path d="M0,130 L50,115 L100,120 L150,90 L200,95 L250,70 L300,80 L350,50 L400,65 L450,30 L500,40 L500,160 L0,160 Z" fill="url(#fill)" />
            <polyline points="0,130 50,115 100,120 150,90 200,95 250,70 300,80 350,50 400,65 450,30 500,40" fill="none" stroke={RS.ink} strokeWidth="2" />
            {[[50,115],[150,90],[250,70],[350,50],[450,30]].map(([x,y], i) =>
              <circle key={i} cx={x} cy={y} r="3" fill={RS.ink} />
            )}
          </svg>
        </div>

        <div style={{ background: RS.ink, color: RS.bg, padding: 24 }}>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.acid }}>TOP PRODUCTS</div>
          <div style={{ marginTop: 16 }}>
            {[
              ['Oversized Box Tee', 147, 2],
              ['Heavyweight Hoodie', 98, -1],
              ['Trucker Cap Acid', 76, 4],
              ['Cargo Pants 04', 54, 1],
              ['Graphic Tee "404"', 41, 0],
            ].map(([n, s, d], i) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 10, padding: '10px 0', borderBottom: '1px dashed #444', alignItems: 'center' }}>
                <span style={{ fontFamily: RSFonts.display, fontSize: 16, color: RS.acid, width: 18 }}>{i+1}</span>
                <span style={{ fontSize: 12 }}>{n}</span>
                <span style={{ fontFamily: RSFonts.mono, fontSize: 11 }}>{s}</span>
                <span style={{ fontFamily: RSFonts.mono, fontSize: 10, color: d > 0 ? RS.acid : d < 0 ? RS.red : '#999' }}>{d > 0 ? '↑' : d < 0 ? '↓' : '—'}{Math.abs(d)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div style={{ background: '#fff', border: `1px solid ${RS.ink}`, marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: 20, borderBottom: `1px solid ${RS.ink}` }}>
          <div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>RECENT ORDERS</div>
            <div style={{ fontFamily: RSFonts.display, fontSize: 22, marginTop: 2, textTransform: 'uppercase' }}>Needs Attention</div>
          </div>
          <span style={{ fontFamily: RSFonts.mono, fontSize: 11, textDecoration: 'underline', cursor: 'pointer' }}>VIEW ALL →</span>
        </div>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${RS.ink}`, background: '#fafaf5' }}>
              {['ORDER', 'CUSTOMER', 'DATE', 'ITEMS', 'TOTAL', 'STATUS', ''].map(h =>
                <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em', color: RS.muted }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {[
              ['#RS-10234', 'Rahul Shetty', 'Apr 20, 10:34', 3, 6717, 'PAID', RS.green],
              ['#RS-10233', 'Arjun Mehta', 'Apr 20, 09:12', 1, 1999, 'SHIPPED', RS.ink],
              ['#RS-10232', 'Karan Kapoor', 'Apr 19, 17:48', 2, 4398, 'PENDING', RS.red],
              ['#RS-10231', 'Priya Singh', 'Apr 19, 14:22', 4, 8996, 'DELIVERED', RS.muted],
              ['#RS-10230', 'Dev Patel', 'Apr 19, 11:08', 1, 2899, 'PAID', RS.green],
            ].map(([id, c, d, i, t, s, col]) => (
              <tr key={id} style={{ borderBottom: `1px solid #eee` }}>
                <td style={{ padding: '14px 20px', fontFamily: RSFonts.mono, fontWeight: 700 }}>{id}</td>
                <td style={{ padding: '14px 20px' }}>{c}</td>
                <td style={{ padding: '14px 20px', fontFamily: RSFonts.mono, color: RS.muted }}>{d}</td>
                <td style={{ padding: '14px 20px' }}>{i}</td>
                <td style={{ padding: '14px 20px', fontFamily: RSFonts.display }}>₹{t.toLocaleString('en-IN')}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ background: col, color: col === RS.muted ? RS.bg : '#fff', padding: '3px 10px', fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.1em' }}>{s}</span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </div>
);

window.HifiAuth = HifiAuth;
window.HifiSearch = HifiSearch;
window.HifiAbout = HifiAbout;
window.HifiAdmin = HifiAdmin;
