// Home / Landing — hi-fi
const HifiHome = () => (
  <div style={{ background: RS.bg, color: RS.ink, fontFamily: RSFonts.body }} data-screen-label="Home">
    <TopNav current="SHOP" />

    {/* HERO */}
    <section style={{
      position: 'relative',
      borderBottom: `1px solid ${RS.ink}`,
      background: RS.ink,
      overflow: 'hidden',
      minHeight: 680,
    }}>
      <ProductImg label="HERO — model in DROP 04 fit" tone="dark" ratio="auto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {/* big type slab */}
      <div style={{ position: 'relative', padding: '80px 32px', color: RS.bg }}>
        <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em' }}>DROP 04 · SPRING/SUMMER '26 · LIVE NOW</div>
        <h1 style={{
          fontFamily: RSFonts.display, fontSize: 'clamp(80px, 14vw, 220px)',
          lineHeight: 0.88, letterSpacing: '-0.04em',
          margin: '40px 0 0', textTransform: 'uppercase',
        }}>
          NOT FOR<br/>
          <span style={{ color: RS.acid }}>EVERYONE.</span><br/>
          <span style={{ WebkitTextStroke: `1.5px ${RS.bg}`, color: 'transparent' }}>RANSAN®</span>
        </h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 60 }}>
          <BigBtn variant="acid">SHOP DROP 04 →</BigBtn>
          <BigBtn style={{ background: 'transparent', color: RS.bg, border: `1px solid ${RS.bg}` }}>THE LOOKBOOK</BigBtn>
        </div>
      </div>
      {/* corner meta */}
      <div style={{ position: 'absolute', top: 20, right: 32, color: RS.bg, fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em', textAlign: 'right' }}>
        N 19°04'34"<br/>E 72°52'38"<br/>MUMBAI · IN
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 32, color: RS.bg, fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em' }}>
        ↓ SCROLL / 01 · 12
      </div>
    </section>

    <Ticker />

    {/* CATEGORIES */}
    <section style={{ padding: '80px 32px', borderBottom: `1px solid ${RS.ink}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.muted }}>01 / CATEGORY</div>
          <h2 style={{ fontFamily: RSFonts.display, fontSize: 64, lineHeight: 1, margin: '8px 0 0', textTransform: 'uppercase' }}>Shop The Grid.</h2>
        </div>
        <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em' }}>VIEW ALL →</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { n: 'TEES', c: 48, t: 'neutral' },
          { n: 'HOODIES', c: 22, t: 'dark' },
          { n: 'PANTS', c: 18, t: 'neutral' },
          { n: 'ACCESS.', c: 31, t: 'acid' },
        ].map((cat, i) => (
          <div key={cat.n} style={{ position: 'relative', cursor: 'pointer' }}>
            <ProductImg label={cat.n} tone={cat.t} ratio="3/4" />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)' }}>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 10, color: '#fff', letterSpacing: '0.2em' }}>0{i+1}</div>
              <div style={{ fontFamily: RSFonts.display, fontSize: 40, color: '#fff', lineHeight: 1 }}>{cat.n}</div>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 10, color: '#fff', letterSpacing: '0.15em', marginTop: 4 }}>{cat.c} STYLES →</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* NEW THIS WEEK */}
    <section style={{ padding: '80px 32px', borderBottom: `1px solid ${RS.ink}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.muted }}>02 / NEW IN</div>
          <h2 style={{ fontFamily: RSFonts.display, fontSize: 64, lineHeight: 1, margin: '8px 0 0', textTransform: 'uppercase' }}>Fresh Off The Rack.</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ border: `1px solid ${RS.ink}`, width: 44, height: 44, display: 'grid', placeItems: 'center' }}>←</div>
          <div style={{ border: `1px solid ${RS.ink}`, width: 44, height: 44, display: 'grid', placeItems: 'center', background: RS.ink, color: RS.bg }}>→</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        <ProductCard name="Oversized Box Tee" price="₹1,999" tag="NEW" tone="dark" />
        <ProductCard name="Heavyweight Hoodie" price="₹3,499" was="₹3,999" tag="SALE" tone="neutral" colors={['#2a2a2a','#d9d6cd','#6b6b68']} />
        <ProductCard name="Cargo Pants 04" price="₹2,899" tag="NEW" tone="neutral" />
        <ProductCard name="Trucker Cap" price="₹899" tone="acid" colors={['#E8F249','#0a0a0a']} />
      </div>
    </section>

    {/* SPLIT FEATURE */}
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${RS.ink}` }}>
      <div style={{ background: RS.acid, padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520 }}>
        <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em' }}>03 / THE FIT</div>
        <div>
          <h2 style={{ fontFamily: RSFonts.display, fontSize: 96, lineHeight: 0.9, margin: 0, textTransform: 'uppercase' }}>Made<br/>For The<br/>Streets.</h2>
          <p style={{ maxWidth: 420, fontSize: 14, lineHeight: 1.6, marginTop: 24 }}>
            Heavyweight cottons. Oversized cuts. Boxy silhouettes.
            Built for the ones who move different.
          </p>
          <BigBtn variant="primary" style={{ marginTop: 24 }}>READ THE STORY →</BigBtn>
        </div>
      </div>
      <ProductImg label="LOOKBOOK EDITORIAL" tone="dark" ratio="auto" style={{ minHeight: 520 }} />
    </section>

    {/* DROP COUNTDOWN */}
    <section style={{ background: RS.ink, color: RS.bg, padding: '80px 32px', borderBottom: `1px solid ${RS.ink}` }}>
      <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.acid }}>04 / NEXT DROP</div>
      <h2 style={{ fontFamily: RSFonts.display, fontSize: 120, lineHeight: 0.9, margin: '12px 0 0', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
        DROP 05<br/>
        <span style={{ color: RS.acid }}>04 : 22 : 17 : 09</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 40, maxWidth: 600 }}>
        {['DAYS','HRS','MIN','SEC'].map(l =>
          <div key={l} style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: '#666' }}>{l}</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 40 }}>
        <input placeholder="your@email.com" style={{
          background: 'transparent', border: 'none', borderBottom: `1px solid ${RS.bg}`,
          color: RS.bg, fontFamily: RSFonts.mono, fontSize: 14, padding: '8px 0', outline: 'none', minWidth: 320,
        }} />
        <BigBtn variant="acid">NOTIFY ME →</BigBtn>
      </div>
    </section>

    <Footer />
  </div>
);

window.HifiHome = HifiHome;
