// PLP — Product Listing
const HifiPLP = () => {
  const prods = [
    { n: 'Oversized Box Tee', p: '₹1,999', t: 'NEW', tone: 'dark' },
    { n: 'Graphic Tee "404"', p: '₹1,499', tone: 'neutral' },
    { n: 'Heavyweight Tee', p: '₹2,199', was: '₹2,499', t: 'SALE', tone: 'neutral' },
    { n: 'Ribbed Crew', p: '₹1,799', tone: 'acid', colors: ['#E8F249','#0a0a0a'] },
    { n: 'Striped Longline', p: '₹2,099', t: 'NEW', tone: 'dark' },
    { n: 'Boxy Pocket Tee', p: '₹1,899', tone: 'neutral' },
    { n: 'Monogram Tee', p: '₹2,299', tone: 'dark' },
    { n: 'Acid Wash Tee', p: '₹1,999', tone: 'neutral' },
    { n: 'Bleed Red Tee', p: '₹1,699', tone: 'red' },
  ];
  return (
    <div style={{ background: RS.bg, color: RS.ink, fontFamily: RSFonts.body }} data-screen-label="PLP">
      <TopNav current="SHOP" />

      {/* TITLE BLOCK */}
      <section style={{ borderBottom: `1px solid ${RS.ink}`, padding: '36px 32px' }}>
        <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>HOME / SHOP / <b style={{ color: RS.ink }}>TEES</b></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14 }}>
          <h1 style={{ fontFamily: RSFonts.display, fontSize: 96, lineHeight: 0.9, margin: 0, textTransform: 'uppercase' }}>
            TEES<span style={{ color: RS.muted, fontSize: 24, marginLeft: 14 }}>[ 48 ]</span>
          </h1>
          <div style={{ display: 'flex', gap: 12, fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em' }}>
            <span>VIEW:</span>
            <span style={{ borderBottom: `2px solid ${RS.ink}` }}>GRID</span>
            <span style={{ color: RS.muted }}>STACK</span>
            <span style={{ margin: '0 8px', color: RS.muted }}>|</span>
            <span>SORT: NEWEST ▾</span>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        {/* FILTERS */}
        <aside style={{ padding: 28, borderRight: `1px solid ${RS.ink}`, alignSelf: 'start', position: 'sticky', top: 72 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div style={{ fontFamily: RSFonts.display, fontSize: 18, textTransform: 'uppercase' }}>Filters</div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.1em' }}>CLEAR</div>
          </div>

          {[
            { title: 'CATEGORY', render: () => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                {[['Tees', 48, true], ['Hoodies', 22], ['Pants', 18], ['Caps', 14], ['Accessories', 9]].map(([n, c, a]) =>
                  <label key={n} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span><span style={{ display: 'inline-block', width: 14, height: 14, border: `1.5px solid ${RS.ink}`, background: a ? RS.ink : 'transparent', marginRight: 10, verticalAlign: -2 }} />{n}</span>
                    <span style={{ color: RS.muted, fontFamily: RSFonts.mono, fontSize: 11 }}>({c})</span>
                  </label>
                )}
              </div>
            )},
            { title: 'SIZE', render: () => (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {['XS','S','M','L','XL','XXL'].map(s =>
                  <div key={s} style={{
                    border: `1px solid ${RS.ink}`, padding: '10px 0', textAlign: 'center',
                    fontFamily: RSFonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                    background: s === 'M' ? RS.ink : 'transparent', color: s === 'M' ? RS.bg : RS.ink,
                    opacity: s === 'XS' ? 0.4 : 1, textDecoration: s === 'XS' ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}>{s}</div>
                )}
              </div>
            )},
            { title: 'COLOR', render: () => (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                {['#0a0a0a','#fafaf5','#E8F249','#D92D1F','#2a5e8b','#6b6b68','#8B5A3C','#2F7D3E'].map((c, i) =>
                  <div key={c} style={{
                    width: 28, height: 28, background: c,
                    border: `1px solid ${RS.ink}`,
                    outline: i === 0 ? `1.5px solid ${RS.ink}` : 'none', outlineOffset: 2,
                    cursor: 'pointer',
                  }} />
                )}
              </div>
            )},
            { title: 'PRICE ₹', render: () => (
              <div>
                <div style={{ position: 'relative', height: 4, background: '#ddd', marginTop: 10 }}>
                  <div style={{ position: 'absolute', left: '10%', right: '30%', top: 0, bottom: 0, background: RS.ink }} />
                  <div style={{ position: 'absolute', left: '10%', top: -6, width: 16, height: 16, background: RS.bg, border: `2px solid ${RS.ink}`, borderRadius: '50%', transform: 'translateX(-50%)' }} />
                  <div style={{ position: 'absolute', left: '70%', top: -6, width: 16, height: 16, background: RS.bg, border: `2px solid ${RS.ink}`, borderRadius: '50%', transform: 'translateX(-50%)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: RSFonts.mono, fontSize: 11 }}>
                  <span>₹ 499</span><span>₹ 3,499</span>
                </div>
              </div>
            )},
          ].map((f, i) => (
            <div key={f.title} style={{ borderTop: `1px solid ${RS.ink}`, padding: '18px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: RSFonts.display, fontSize: 13, letterSpacing: '0.1em', marginBottom: 14 }}>
                <span>{f.title}</span><span>−</span>
              </div>
              {f.render()}
            </div>
          ))}
        </aside>

        {/* GRID */}
        <main style={{ padding: 28 }}>
          {/* chip row */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 22, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em', color: RS.muted }}>ACTIVE:</span>
            {['Black ×', 'Size M ×', '< ₹2000 ×'].map(c =>
              <div key={c} style={{
                border: `1px solid ${RS.ink}`, background: RS.bg,
                padding: '4px 10px', fontFamily: RSFonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                cursor: 'pointer',
              }}>{c}</div>
            )}
            <span style={{ fontFamily: RSFonts.mono, fontSize: 10, textDecoration: 'underline', marginLeft: 6 }}>CLEAR ALL</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {prods.map((p, i) => (
              <ProductCard key={i} name={p.n} price={p.p} was={p.was} tag={p.t} tone={p.tone} colors={p.colors} />
            ))}
          </div>

          {/* pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 48, fontFamily: RSFonts.mono, fontSize: 12, letterSpacing: '0.1em' }}>
            {['←','1','2','3','···','6','→'].map((p, i) =>
              <div key={i} style={{
                width: 40, height: 40, display: 'grid', placeItems: 'center',
                border: `1px solid ${RS.ink}`,
                background: p === '1' ? RS.ink : 'transparent',
                color: p === '1' ? RS.bg : RS.ink,
                cursor: 'pointer',
              }}>{p}</div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

window.HifiPLP = HifiPLP;
