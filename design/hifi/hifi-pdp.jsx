// PDP — Product Detail
const HifiPDP = () => {
  const [size, setSize] = React.useState('M');
  const [color, setColor] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [openAcc, setOpenAcc] = React.useState('desc');
  const colors = [
    { name: 'BLACK', hex: '#0a0a0a' },
    { name: 'BONE', hex: '#F2EFE8' },
    { name: 'ACID', hex: '#E8F249' },
    { name: 'BLEED RED', hex: '#D92D1F' },
  ];
  return (
    <div style={{ background: RS.bg, color: RS.ink, fontFamily: RSFonts.body }} data-screen-label="PDP">
      <TopNav current="SHOP" />

      <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted, padding: '12px 32px', borderBottom: `1px solid ${RS.ink}` }}>
        HOME / SHOP / TEES / <b style={{ color: RS.ink }}>OVERSIZED BOX TEE · BLACK</b>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px' }}>
        {/* GALLERY */}
        <div style={{ borderRight: `1px solid ${RS.ink}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: RS.ink, borderBottom: `1px solid ${RS.ink}` }}>
            <ProductImg label="01 · FRONT" tone="dark" ratio="1/1" />
            <ProductImg label="02 · BACK" tone="dark" ratio="1/1" />
            <ProductImg label="03 · DETAIL" tone="dark" ratio="1/1" />
            <ProductImg label="04 · ON-MODEL" tone="neutral" ratio="1/1" />
          </div>
          <div style={{ padding: 40, background: RS.bg2 }}>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>05 / FIT NOTES</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 640, marginTop: 12 }}>
              Oversized boxy cut — runs one size larger than standard. 280 GSM heavyweight cotton, pre-shrunk and garment-washed for a worn-in hand-feel. Model is 6'0" wearing M.
            </p>
          </div>
        </div>

        {/* INFO */}
        <aside style={{ padding: 36, position: 'sticky', top: 72, alignSelf: 'start', background: RS.bg }}>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>RANSAN® / DROP 04 / TEE-014</div>
          <h1 style={{ fontFamily: RSFonts.display, fontSize: 44, lineHeight: 0.95, margin: '10px 0 0', textTransform: 'uppercase' }}>Oversized<br/>Box Tee</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.1em' }}>
            <span>★★★★☆</span>
            <span style={{ color: RS.muted }}>4.6 · 234 REVIEWS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 20 }}>
            <div style={{ fontFamily: RSFonts.display, fontSize: 40 }}>₹1,999</div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 12, color: RS.muted, textDecoration: 'line-through' }}>₹2,499</div>
            <div style={{ background: RS.red, color: '#fff', fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.1em', padding: '3px 8px', fontWeight: 700 }}>-20%</div>
          </div>

          {/* COLOR */}
          <div style={{ marginTop: 28, borderTop: `1px solid ${RS.ink}`, paddingTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em', marginBottom: 10 }}>
              <span>COLOR</span><b>{colors[color].name}</b>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {colors.map((c, i) =>
                <div key={c.name} onClick={() => setColor(i)} style={{
                  width: 38, height: 38, background: c.hex,
                  border: `1px solid ${RS.ink}`,
                  outline: color === i ? `2px solid ${RS.ink}` : 'none', outlineOffset: 3,
                  cursor: 'pointer',
                }} />
              )}
            </div>
          </div>

          {/* SIZE */}
          <div style={{ marginTop: 24, borderTop: `1px solid ${RS.ink}`, paddingTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em', marginBottom: 10 }}>
              <span>SIZE: <b>{size}</b></span>
              <span style={{ textDecoration: 'underline' }}>SIZE GUIDE ↗</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
              {['XS','S','M','L','XL','XXL'].map(s =>
                <div key={s} onClick={() => s !== 'XS' && setSize(s)} style={{
                  border: `1px solid ${RS.ink}`, padding: '14px 0', textAlign: 'center',
                  fontFamily: RSFonts.display, fontSize: 13, letterSpacing: '0.05em',
                  background: size === s ? RS.ink : 'transparent', color: size === s ? RS.bg : RS.ink,
                  opacity: s === 'XS' ? 0.4 : 1, textDecoration: s === 'XS' ? 'line-through' : 'none',
                  cursor: s === 'XS' ? 'not-allowed' : 'pointer',
                }}>{s}</div>
              )}
            </div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 10, color: RS.red, marginTop: 8, letterSpacing: '0.1em' }}>
              ⚠ ONLY 3 LEFT IN {size}
            </div>
          </div>

          {/* QTY + CART */}
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <div style={{ display: 'flex', border: `1px solid ${RS.ink}` }}>
              <div onClick={() => setQty(Math.max(1, qty-1))} style={{ width: 40, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>−</div>
              <div style={{ width: 46, display: 'grid', placeItems: 'center', borderLeft: `1px solid ${RS.ink}`, borderRight: `1px solid ${RS.ink}`, fontFamily: RSFonts.display }}>{qty}</div>
              <div onClick={() => setQty(qty+1)} style={{ width: 40, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>+</div>
            </div>
            <BigBtn variant="primary" style={{ flex: 1, padding: '14px 20px' }}>ADD TO BAG — ₹{1999 * qty}</BigBtn>
            <div style={{ width: 52, border: `1px solid ${RS.ink}`, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>♡</div>
          </div>

          {/* TRUST ROW */}
          <div style={{ borderTop: `1px solid ${RS.ink}`, marginTop: 24, padding: '16px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, textAlign: 'center' }}>
            {[['FREE SHIP','₹2999+'],['7-DAY','RETURNS'],['COD','AVAILABLE']].map(([a,b]) =>
              <div key={a} style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.1em' }}>
                <b>{a}</b><br/><span style={{ color: RS.muted }}>{b}</span>
              </div>
            )}
          </div>

          {/* ACCORDION */}
          {[
            ['desc', 'DESCRIPTION', 'Boxy oversized silhouette cut from 280 GSM heavyweight cotton. Drop shoulders, ribbed collar, RanSan woven label at hem. Screen-printed back graphic.'],
            ['details', 'DETAILS & CARE', 'Machine wash cold. Tumble dry low. Do not bleach. Iron on reverse.'],
            ['ship', 'SHIPPING & RETURNS', 'Ships within 24h. Free on orders ₹2999+. 7-day hassle-free returns.'],
          ].map(([k, t, body]) => (
            <div key={k} style={{ borderTop: `1px solid ${RS.ink}` }}>
              <div onClick={() => setOpenAcc(openAcc === k ? '' : k)} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', cursor: 'pointer', fontFamily: RSFonts.display, fontSize: 12, letterSpacing: '0.1em' }}>
                <span>{t}</span><span>{openAcc === k ? '−' : '+'}</span>
              </div>
              {openAcc === k && <div style={{ fontSize: 13, lineHeight: 1.6, paddingBottom: 16, color: RS.muted }}>{body}</div>}
            </div>
          ))}
        </aside>
      </div>

      {/* REVIEWS */}
      <section style={{ padding: '60px 32px', borderTop: `1px solid ${RS.ink}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.muted }}>06 / REVIEWS</div>
            <h2 style={{ fontFamily: RSFonts.display, fontSize: 56, lineHeight: 1, margin: '8px 0 0', textTransform: 'uppercase' }}>4.6 / 5.0<span style={{ fontSize: 18, color: RS.muted, marginLeft: 14 }}>234 reviews</span></h2>
          </div>
          <BigBtn variant="ghost">WRITE A REVIEW</BigBtn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { r: 5, t: 'Heavyweight and boxy', b: 'Exactly what I wanted. Fabric feels premium, no shrinkage after wash. Fit runs a bit oversized — true to description.', n: 'Rahul · Mumbai', s: 'M · Black' },
            { r: 5, t: 'Best tee I own', b: 'Bought 3 colors after the first one. The drop shoulder sits perfectly. Worth every rupee.', n: 'Arjun · Bangalore', s: 'L · Bone' },
            { r: 4, t: 'Nice fit, shipping delayed', b: 'Love the tee but shipping took a week. Once arrived, quality is top. Will buy again.', n: 'Karan · Delhi', s: 'M · Acid' },
          ].map((r, i) => (
            <div key={i} style={{ border: `1px solid ${RS.ink}`, padding: 24, background: RS.bg }}>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 11 }}>{'★'.repeat(r.r)}{'☆'.repeat(5-r.r)}</div>
              <div style={{ fontFamily: RSFonts.display, fontSize: 18, margin: '8px 0', textTransform: 'uppercase' }}>{r.t}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#333' }}>"{r.b}"</p>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.1em', color: RS.muted, marginTop: 16 }}>— {r.n}<br/>BOUGHT: {r.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section style={{ padding: '60px 32px', borderTop: `1px solid ${RS.ink}` }}>
        <h2 style={{ fontFamily: RSFonts.display, fontSize: 56, lineHeight: 1, margin: '0 0 24px', textTransform: 'uppercase' }}>Pair It With.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          <ProductCard name="Cargo Pants 04" price="₹2,899" tag="NEW" tone="neutral" />
          <ProductCard name="Trucker Cap" price="₹899" tone="acid" colors={['#E8F249','#0a0a0a']} />
          <ProductCard name="Canvas Tote" price="₹699" tone="neutral" />
          <ProductCard name="Chunky Socks 2-pk" price="₹499" tone="dark" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.HifiPDP = HifiPDP;
